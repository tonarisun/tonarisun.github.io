var MiniAppUtils = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // ../utils/miniAppUtils.ts
  var miniAppUtils_exports = {};
  __export(miniAppUtils_exports, {
    closeMiniApp: () => closeMiniApp,
    getMiniAppPlatform: () => getMiniAppPlatform,
    initMiniApp: () => initMiniApp,
    initMiniAppUtils: () => initMiniAppUtils,
    sendSignalToAdmin: () => sendSignalToAdmin
  });
  var hasVkInit = false;
  var vkBridgeLoadPromise = null;
  async function getVkBridge() {
    if (window.vkBridge) return window.vkBridge;
    if (!vkBridgeLoadPromise) {
      vkBridgeLoadPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js";
        script.async = true;
        script.onload = () => {
          if (window.vkBridge) {
            resolve(window.vkBridge);
            return;
          }
          reject(new Error("VK Bridge script loaded but vkBridge is missing"));
        };
        script.onerror = () => reject(new Error("VK Bridge script load failed"));
        document.head.appendChild(script);
      });
    }
    return vkBridgeLoadPromise;
  }
  function getTelegramWebApp() {
    const directWebApp = window.Telegram?.WebApp;
    if (directWebApp) return directWebApp;
    if (!window.parent || window.parent === window) return void 0;
    try {
      const parentWebApp = window.parent.Telegram?.WebApp;
      if (parentWebApp) return parentWebApp;
    } catch (error) {
      console.warn("Cannot access parent Telegram WebApp", error);
    }
    return void 0;
  }
  function hasVkLaunchParams() {
    const searchParams = new URLSearchParams(window.location.search);
    return [
      "vk_platform",
      "vk_app_id",
      "vk_user_id",
      "sign"
    ].some((key) => searchParams.has(key));
  }
  function hasTelegramHints() {
    const searchParams = new URLSearchParams(window.location.search);
    const hasTelegramQueryParams = [
      "tgWebAppData",
      "tgWebAppVersion",
      "tgWebAppPlatform",
      "tgWebAppThemeParams"
    ].some((key) => searchParams.has(key));
    if (hasTelegramQueryParams) return true;
    return Boolean(window.TelegramWebviewProxy);
  }
  function getMiniAppPlatform() {
    if (getTelegramWebApp() || hasTelegramHints()) return "telegram";
    if (hasVkLaunchParams()) return "vk";
    return "web";
  }
  async function initVkMiniApp() {
    if (hasVkInit) return;
    const bridgeApi = await getVkBridge();
    await bridgeApi.send("VKWebAppInit");
    hasVkInit = true;
  }
  function initTelegramMiniApp() {
    const webApp = getTelegramWebApp();
    if (!webApp || typeof webApp.ready !== "function") return;
    try {
      webApp.ready();
    } catch (error) {
      console.warn("Telegram WebApp ready() failed", error);
    }
  }
  async function initMiniApp() {
    const platform = getMiniAppPlatform();
    if (platform === "telegram" || getTelegramWebApp()) {
      initTelegramMiniApp();
      return;
    }
    if (platform === "vk") {
      try {
        await initVkMiniApp();
      } catch (error) {
        console.warn("VK WebApp init failed", error);
      }
    }
  }
  function closeTelegramMiniApp() {
    const webApp = getTelegramWebApp();
    const closeViaProxy = () => {
      const webviewProxy = window.TelegramWebviewProxy;
      if (!webviewProxy || typeof webviewProxy.postEvent !== "function") return false;
      try {
        webviewProxy.postEvent("web_app_close");
        return true;
      } catch (error) {
        console.warn("TelegramWebviewProxy close failed", error);
        return false;
      }
    };
    if (!webApp || typeof webApp.close !== "function") {
      if (closeViaProxy()) return;
      try {
        window.close();
      } catch (error) {
        console.warn("window.close fallback failed", error);
      }
      return;
    }
    try {
      if (typeof webApp.disableClosingConfirmation === "function")
        webApp.disableClosingConfirmation();
    } catch (error) {
      console.warn("disableClosingConfirmation failed", error);
    }
    const tryClose = () => {
      try {
        webApp.close();
        return true;
      } catch (error) {
        console.warn("Telegram close failed", error);
        return false;
      }
    };
    const hasClosed = tryClose();
    setTimeout(() => {
      if (hasClosed) {
        tryClose();
        return;
      }
      if (!closeViaProxy())
        try {
          window.close();
        } catch (error) {
          console.warn("window.close fallback failed", error);
        }
    }, 250);
  }
  async function closeVkMiniApp() {
    const bridgeApi = await getVkBridge();
    try {
      await bridgeApi.send("VKWebAppClose");
    } catch (error) {
      console.warn("VK close failed", error);
    }
  }
  async function closeMiniApp() {
    if (getTelegramWebApp() || hasTelegramHints()) {
      closeTelegramMiniApp();
      return;
    }
    const platform = getMiniAppPlatform();
    if (platform === "vk") {
      await closeVkMiniApp();
      return;
    }
    try {
      window.close();
    } catch (error) {
      console.warn("window.close failed in web mode", error);
    }
  }
  function getTelegramUser() {
    const user = getTelegramWebApp()?.initDataUnsafe?.user;
    return {
      username: user?.username || "no username",
      first_name: user?.first_name || "no name",
      user_id: user?.id || "no id"
    };
  }
  async function getVkUser() {
    const bridgeApi = await getVkBridge();
    try {
      await initVkMiniApp();
      const user = await bridgeApi.send("VKWebAppGetUserInfo");
      return {
        username: user?.screen_name || user?.id || "no username",
        first_name: user?.first_name || "no name",
        user_id: user?.id || "no id"
      };
    } catch (error) {
      console.warn("VK get user failed", error);
      return {
        username: "no username",
        first_name: "no name",
        user_id: "no id"
      };
    }
  }
  async function getUserProfile() {
    const platform = getMiniAppPlatform();
    if (platform === "telegram") return getTelegramUser();
    if (platform === "vk") return getVkUser();
    return {
      username: "web user",
      first_name: "web",
      user_id: "web"
    };
  }
  function getTargetApiUrl(apiUrl) {
    const isDevelopment = [
      "localhost",
      "127.0.0.1"
    ].includes(window.location.hostname);
    if (apiUrl) return apiUrl;
    return isDevelopment ? "/api/webhook" : "https://web-production-8d8bb.up.railway.app/api/signal";
  }
  function fallbackTelegramSendData(payload) {
    const webApp = getTelegramWebApp();
    if (!webApp || typeof webApp.sendData !== "function") return false;
    try {
      webApp.sendData(JSON.stringify(payload));
      setTimeout(() => closeTelegramMiniApp(), 200);
      return true;
    } catch (error) {
      console.warn("Telegram sendData fallback failed", error);
      return false;
    }
  }
  async function sendSignalToAdmin(data, apiUrl) {
    await initMiniApp();
    const platform = getMiniAppPlatform();
    const canUseTelegramFallback = Boolean(getTelegramWebApp()?.sendData);
    const userProfile = await getUserProfile();
    const payload = {
      platform,
      ...userProfile,
      ...data
    };
    const targetApiUrl = getTargetApiUrl(apiUrl);
    try {
      const response = await fetch(targetApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        if (canUseTelegramFallback && fallbackTelegramSendData(payload)) return;
        const errorText = await response.text();
        throw new Error("Signal API request failed: " + response.status + " " + errorText);
      }
      await closeMiniApp();
    } catch (error) {
      if (canUseTelegramFallback && fallbackTelegramSendData(payload)) return;
      throw error;
    }
  }
  function initMiniAppUtils() {
    if (typeof window === "undefined") return;
    window.sendSignalToAdmin = sendSignalToAdmin;
    window.MiniAppUtils = {
      initMiniApp,
      initMiniAppUtils,
      getMiniAppPlatform,
      sendSignalToAdmin,
      closeMiniApp
    };
  }
  return __toCommonJS(miniAppUtils_exports);
})();
