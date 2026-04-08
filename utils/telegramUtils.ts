import {
  initMiniAppUtils,
  sendSignalToAdmin as sendMiniAppSignalToAdmin
} from "./miniAppUtils"

export async function sendSignalToAdmin(data: any, apiUrl?: string): Promise<void> {
  return sendMiniAppSignalToAdmin(data, apiUrl)
}

export function initTelegramUtils(): void {
  initMiniAppUtils()

  if (typeof window === "undefined") return

  window.TelegramUtils = {
    initTelegramUtils,
    sendSignalToAdmin
  }
}