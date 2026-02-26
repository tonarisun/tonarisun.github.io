var TelegramUtils = (() => {
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

  // ../utils/telegramUtils.ts
  var telegramUtils_exports = {};
  __export(telegramUtils_exports, {
    initTelegramUtils: () => initTelegramUtils,
    sendSignalToAdmin: () => sendSignalToAdmin
  });
  var sendSignalToAdmin = async (data, apiUrl) => {
    console.log("\u{1F680} sendSignalToAdmin called with data:", data);
    console.log("\u{1F50D} Current location:", window.location.href);
    console.log("\u{1F4F1} Telegram WebApp object:", window.Telegram?.WebApp);
    const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
    const payload = {
      username: user ? user.username : "no username",
      first_name: user ? user.first_name : "no name",
      user_id: user ? user.id : "no id",
      ...data
    };
    try {
      console.log("\u{1F4F1} Telegram WebApp available:", !!window.Telegram?.WebApp);
      console.log("\u{1F464} User data:", user);
      console.log("\u{1F4E6} Payload to send:", payload);
      const isDevelopment = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      const targetApiUrl = apiUrl || (isDevelopment ? "/api/webhook" : "https://web-production-8d8bb.up.railway.app/api/signal");
      console.log("\u{1F30D} Environment:", isDevelopment ? "development" : "production");
      console.log("\u{1F517} API URL:", targetApiUrl);
      console.log("\u{1F4E1} Making request to:", targetApiUrl);
      const response = await fetch(targetApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      console.log("\u{1F4E1} Response status:", response.status);
      console.log(`\u{1F4E1} Response received: ${response.status} ${response.statusText}`);
      if (response.ok) {
        console.log("\u2705 Signal sent successfully");
        const responseData = await response.text();
        console.log("\u{1F4C4} Response body:", responseData);
      } else {
        console.error("\u274C Failed to send signal:", response.status);
        const errorText = await response.text();
        console.error("\u274C Error response:", errorText);
        if (window.Telegram?.WebApp?.sendData) {
          console.log("\u{1F504} Falling back to Telegram sendData");
          window.Telegram.WebApp.sendData(JSON.stringify(payload));
          return;
        }
        alert("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0441\u0438\u0433\u043D\u0430\u043B");
      }
      if (window.Telegram?.WebApp) {
        console.log("\u{1F512} Attempting to close Telegram WebApp");
        setTimeout(() => {
          try {
            window.Telegram.WebApp.close();
            console.log("\u2705 Telegram WebApp closed successfully");
          } catch (closeError) {
            console.error("\u274C Failed to close WebApp:", closeError);
            alert("\u041F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u043A\u0440\u044B\u0442\u044C \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438");
          }
        }, 200);
      } else {
        console.warn("\u26A0\uFE0F Telegram WebApp not available, showing success message");
        alert("\u0414\u0430\u043D\u043D\u044B\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u044B! \u041F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043C\u043E\u0436\u043D\u043E \u0437\u0430\u043A\u0440\u044B\u0442\u044C.");
      }
    } catch (error) {
      console.error("\u{1F4A5} Network error sending signal:", error);
      console.error("\u{1F50D} Error details:", {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
      if (window.Telegram?.WebApp?.sendData) {
        console.log("\u{1F504} Network failed, using Telegram sendData as fallback");
        try {
          window.Telegram.WebApp.sendData(JSON.stringify(payload));
          console.log("\u2705 Fallback successful");
          setTimeout(() => window.Telegram.WebApp.close(), 200);
          return;
        } catch (fallbackError) {
          console.error("\u274C Fallback also failed:", fallbackError);
        }
      }
      alert("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0435 \u0441\u0438\u0433\u043D\u0430\u043B\u0430. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437.");
      if (window.Telegram?.WebApp) {
        console.log("\u{1F512} Attempting to close WebApp after error");
        setTimeout(() => {
          try {
            window.Telegram.WebApp.close();
            console.log("\u2705 WebApp closed after error");
          } catch (closeError) {
            console.error("\u274C Failed to close after error:", closeError);
          }
        }, 500);
      }
    }
  };
  var initTelegramUtils = () => {
    if (typeof window !== "undefined") {
      window.sendSignalToAdmin = sendSignalToAdmin;
    }
  };
  return __toCommonJS(telegramUtils_exports);
})();
