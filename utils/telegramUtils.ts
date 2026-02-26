// Telegram WebApp utilities

export const sendSignalToAdmin = async (data: any, apiUrl?: string): Promise<void> => {
  console.log('🚀 sendSignalToAdmin called with data:', data);
  console.log('🔍 Current location:', window.location.href);
  console.log('📱 Telegram WebApp object:', (window as any).Telegram?.WebApp);

  const user = (window as any).Telegram?.WebApp?.initDataUnsafe?.user;
  const payload = {
    username: user ? user.username : "no username",
    first_name: user ? user.first_name : "no name",
    user_id: user ? user.id : "no id",
    ...data
  };

  const getTelegramWebApp = (): any => {
    const directWebApp = (window as any).Telegram?.WebApp;
    if (directWebApp) {
      return directWebApp;
    }

    // Some environments expose Telegram WebApp only on parent window.
    if (window.parent && window.parent !== window) {
      try {
        const parentWebApp = (window.parent as any).Telegram?.WebApp;
        if (parentWebApp) {
          console.log('📱 Using Telegram WebApp from parent window');
          return parentWebApp;
        }
      } catch (parentAccessError) {
        console.warn('⚠️ Cannot access parent Telegram WebApp:', parentAccessError);
      }
    }

    return undefined;
  };

  const closeTelegramWebApp = (): void => {
    const webApp = getTelegramWebApp();

    const closeViaProxy = (): boolean => {
      const webviewProxy = (window as any).TelegramWebviewProxy;
      if (!webviewProxy || typeof webviewProxy.postEvent !== "function") {
        return false;
      }
      try {
        webviewProxy.postEvent('web_app_close');
        console.log('✅ Close signal sent via TelegramWebviewProxy');
        return true;
      } catch (proxyError) {
        console.warn('⚠️ Failed to close via TelegramWebviewProxy:', proxyError);
        return false;
      }
    };

    if (!webApp || typeof webApp.close !== "function") {
      console.warn('⚠️ Telegram WebApp is unavailable, cannot close app');
      if (closeViaProxy()) {
        return;
      }
      try {
        window.close();
        console.log('✅ window.close() called as fallback');
      } catch (windowCloseError) {
        console.warn('⚠️ window.close() fallback failed:', windowCloseError);
      }
      return;
    }

    try {
      if (typeof webApp.disableClosingConfirmation === "function") {
        webApp.disableClosingConfirmation();
      }
    } catch (confirmationError) {
      console.warn('⚠️ Failed to disable closing confirmation:', confirmationError);
    }

    const tryClose = () => {
      try {
        webApp.close();
        return true;
      } catch (closeError) {
        console.error('❌ Failed to close WebApp:', closeError);
        return false;
      }
    };

    console.log('🔒 Attempting to close Telegram WebApp');
    const closed = tryClose();

    // Some Telegram clients ignore the first close call while UI transitions complete.
    setTimeout(() => {
      if (!closed) {
        tryClose();
        return;
      }
      try {
        webApp.close();
      } catch (closeError) {
        console.error('❌ Failed to close WebApp on second attempt:', closeError);
      }
    }, 250);
  };

  try {
    console.log('📱 Telegram WebApp available:', !!(window as any).Telegram?.WebApp);
    console.log('👤 User data:', user);
    console.log('📦 Payload to send:', payload);

    // Simple environment detection
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const targetApiUrl = apiUrl || (isDevelopment ? '/api/webhook' : 'https://web-production-8d8bb.up.railway.app/api/signal');

    console.log('🌍 Environment:', isDevelopment ? 'development' : 'production');
    console.log('🔗 API URL:', targetApiUrl);

    // Simple fetch request
    console.log('📡 Making request to:', targetApiUrl);
    const response = await fetch(targetApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    console.log('📡 Response status:', response.status);

    console.log(`📡 Response received: ${response.status} ${response.statusText}`);

    if (response.ok) {
      console.log("✅ Signal sent successfully");
      const responseData = await response.text();
      console.log('📄 Response body:', responseData);
    } else {
      console.error("❌ Failed to send signal:", response.status);
      const errorText = await response.text();
      console.error('❌ Error response:', errorText);

      // Try alternative method for Telegram
      if ((window as any).Telegram?.WebApp?.sendData) {
        console.log('🔄 Falling back to Telegram sendData');
        (window as any).Telegram.WebApp.sendData(JSON.stringify(payload));
        return;
      }

    }

    closeTelegramWebApp();
  } catch (error) {
    console.error('💥 Network error sending signal:', error);
    console.error('🔍 Error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });

    // Try alternative methods for Telegram
    if ((window as any).Telegram?.WebApp?.sendData) {
      console.log('🔄 Network failed, using Telegram sendData as fallback');
      try {
        (window as any).Telegram.WebApp.sendData(JSON.stringify(payload));
        console.log('✅ Fallback successful');
        setTimeout(() => (window as any).Telegram.WebApp.close(), 200);
        return;
      } catch (fallbackError) {
        console.error('❌ Fallback also failed:', fallbackError);
      }
    }

    // Try to close anyway in case of error
    if ((window as any).Telegram?.WebApp) {
      console.log('🔒 Attempting to close WebApp after error');
      closeTelegramWebApp();
    }
  }
};

// Initialize the global function for backward compatibility
export const initTelegramUtils = (): void => {
  if (typeof window !== 'undefined') {
    (window as any).sendSignalToAdmin = sendSignalToAdmin;
  }
};

// Type declarations for Telegram WebApp
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        sendData: (data: string) => void;
        initDataUnsafe?: {
          user?: {
            first_name?: string;
          };
        };
        disableClosingConfirmation?: () => void;
        close: () => void;
      };
    };
    TelegramWebviewProxy?: {
      postEvent: (eventType: string, eventData?: string) => void;
    };
    sendSignalToAdmin: (data: any, apiUrl?: string) => Promise<void>;
  }
}