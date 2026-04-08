interface GenericPayload {
  [key: string]: unknown
}

interface UserProfile {
  username: string
  first_name: string
  user_id: string | number
}

type MiniAppPlatform = "telegram" | "vk" | "web"

let hasVkInit = false
let vkBridgeLoadPromise: Promise<any> | null = null
async function getVkBridge(): Promise<any> {
  if ((window as any).vkBridge) return (window as any).vkBridge

  if (!vkBridgeLoadPromise) {
    vkBridgeLoadPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script")
      script.src = "https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js"
      script.async = true
      script.onload = () => {
        if ((window as any).vkBridge) {
          resolve((window as any).vkBridge)
          return
        }
        reject(new Error("VK Bridge script loaded but vkBridge is missing"))
      }
      script.onerror = () => reject(new Error("VK Bridge script load failed"))
      document.head.appendChild(script)
    })
  }

  return vkBridgeLoadPromise
}


function getTelegramWebApp(): any {
  const directWebApp = (window as any).Telegram?.WebApp
  if (directWebApp) return directWebApp

  if (!window.parent || window.parent === window) return undefined

  try {
    const parentWebApp = (window.parent as any).Telegram?.WebApp
    if (parentWebApp) return parentWebApp
  } catch (error) {
    console.warn("Cannot access parent Telegram WebApp", error)
  }

  return undefined
}

function hasVkLaunchParams(): boolean {
  const searchParams = new URLSearchParams(window.location.search)
  return [
    "vk_platform",
    "vk_app_id",
    "vk_user_id",
    "sign"
  ].some((key) => searchParams.has(key))
}

export function getMiniAppPlatform(): MiniAppPlatform {
  if (getTelegramWebApp()) return "telegram"
  if (hasVkLaunchParams()) return "vk"
  return "web"
}

async function initVkMiniApp(): Promise<void> {
  if (hasVkInit) return

  const bridgeApi = await getVkBridge()
  await bridgeApi.send("VKWebAppInit")
  hasVkInit = true
}

function initTelegramMiniApp(): void {
  const webApp = getTelegramWebApp()
  if (!webApp || typeof webApp.ready !== "function") return

  try {
    webApp.ready()
  } catch (error) {
    console.warn("Telegram WebApp ready() failed", error)
  }
}

export async function initMiniApp(): Promise<void> {
  const platform = getMiniAppPlatform()
  if (platform === "telegram") {
    initTelegramMiniApp()
    return
  }

  if (platform === "vk") {
    try {
      await initVkMiniApp()
    } catch (error) {
      console.warn("VK WebApp init failed", error)
    }
  }
}

function closeTelegramMiniApp(): void {
  const webApp = getTelegramWebApp()

  const closeViaProxy = (): boolean => {
    const webviewProxy = (window as any).TelegramWebviewProxy
    if (!webviewProxy || typeof webviewProxy.postEvent !== "function") return false

    try {
      webviewProxy.postEvent("web_app_close")
      return true
    } catch (error) {
      console.warn("TelegramWebviewProxy close failed", error)
      return false
    }
  }

  if (!webApp || typeof webApp.close !== "function") {
    if (closeViaProxy()) return

    try {
      window.close()
    } catch (error) {
      console.warn("window.close fallback failed", error)
    }
    return
  }

  try {
    if (typeof webApp.disableClosingConfirmation === "function")
      webApp.disableClosingConfirmation()
  } catch (error) {
    console.warn("disableClosingConfirmation failed", error)
  }

  const tryClose = (): boolean => {
    try {
      webApp.close()
      return true
    } catch (error) {
      console.warn("Telegram close failed", error)
      return false
    }
  }

  const hasClosed = tryClose()
  setTimeout(() => {
    if (hasClosed) {
      tryClose()
      return
    }
    if (!closeViaProxy())
      try {
        window.close()
      } catch (error) {
        console.warn("window.close fallback failed", error)
      }
  }, 250)
}

async function closeVkMiniApp(): Promise<void> {
  const bridgeApi = await getVkBridge()

  try {
    await bridgeApi.send("VKWebAppClose")
  } catch (error) {
    console.warn("VK close failed", error)
  }
}

export async function closeMiniApp(): Promise<void> {
  const platform = getMiniAppPlatform()
  if (platform === "telegram") {
    closeTelegramMiniApp()
    return
  }

  if (platform === "vk") {
    await closeVkMiniApp()
    return
  }

  try {
    window.close()
  } catch (error) {
    console.warn("window.close failed in web mode", error)
  }
}

function getTelegramUser(): UserProfile {
  const user = getTelegramWebApp()?.initDataUnsafe?.user
  return {
    username: user?.username || "no username",
    first_name: user?.first_name || "no name",
    user_id: user?.id || "no id"
  }
}

async function getVkUser(): Promise<UserProfile> {
  const bridgeApi = await getVkBridge()

  try {
    await initVkMiniApp()
    const user = await bridgeApi.send("VKWebAppGetUserInfo")
    return {
      username: user?.screen_name || user?.id || "no username",
      first_name: user?.first_name || "no name",
      user_id: user?.id || "no id"
    }
  } catch (error) {
    console.warn("VK get user failed", error)
    return {
      username: "no username",
      first_name: "no name",
      user_id: "no id"
    }
  }
}

async function getUserProfile(): Promise<UserProfile> {
  const platform = getMiniAppPlatform()
  if (platform === "telegram") return getTelegramUser()
  if (platform === "vk") return getVkUser()
  return {
    username: "web user",
    first_name: "web",
    user_id: "web"
  }
}

function getTargetApiUrl(apiUrl?: string): string {
  const isDevelopment = [
    "localhost",
    "127.0.0.1"
  ].includes(window.location.hostname)
  if (apiUrl) return apiUrl
  return isDevelopment
    ? "/api/webhook"
    : "https://web-production-8d8bb.up.railway.app/api/signal"
}

function fallbackTelegramSendData(payload: GenericPayload): boolean {
  const webApp = getTelegramWebApp()
  if (!webApp || typeof webApp.sendData !== "function") return false

  try {
    webApp.sendData(JSON.stringify(payload))
    setTimeout(() => closeTelegramMiniApp(), 200)
    return true
  } catch (error) {
    console.warn("Telegram sendData fallback failed", error)
    return false
  }
}

export async function sendSignalToAdmin(data: GenericPayload, apiUrl?: string): Promise<void> {
  await initMiniApp()

  const platform = getMiniAppPlatform()
  const userProfile = await getUserProfile()
  const payload = {
    platform,
    ...userProfile,
    ...data
  }

  const targetApiUrl = getTargetApiUrl(apiUrl)

  try {
    const response = await fetch(targetApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      if (platform === "telegram" && fallbackTelegramSendData(payload)) return

      const errorText = await response.text()
      throw new Error("Signal API request failed: " + response.status + " " + errorText)
    }

    await closeMiniApp()
  } catch (error) {
    if (platform === "telegram" && fallbackTelegramSendData(payload)) return
    throw error
  }
}

export function initMiniAppUtils(): void {
  if (typeof window === "undefined") return

  ;(window as any).sendSignalToAdmin = sendSignalToAdmin
  ;(window as any).MiniAppUtils = {
    initMiniApp,
    initMiniAppUtils,
    getMiniAppPlatform,
    sendSignalToAdmin,
    closeMiniApp
  }
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready?: () => void
        close?: () => void
        sendData?: (data: string) => void
        disableClosingConfirmation?: () => void
        initDataUnsafe?: {
          user?: {
            id?: number
            username?: string
            first_name?: string
          }
        }
      }
    }
    TelegramWebviewProxy?: {
      postEvent: (eventType: string, eventData?: string) => void
    }
    vkBridge?: {
      send: (method: string, params?: Record<string, unknown>) => Promise<any>
    }
    sendSignalToAdmin?: (data: GenericPayload, apiUrl?: string) => Promise<void>
    MiniAppUtils?: {
      initMiniApp: () => Promise<void>
      initMiniAppUtils: () => void
      getMiniAppPlatform: () => MiniAppPlatform
      sendSignalToAdmin: (data: GenericPayload, apiUrl?: string) => Promise<void>
      closeMiniApp: () => Promise<void>
    }
    TelegramUtils?: {
      initTelegramUtils: () => void
      sendSignalToAdmin: (data: GenericPayload, apiUrl?: string) => Promise<void>
    }
  }
}
