// Telegram WebApp utilities

export const sendSignalToAdmin = async (data: any): Promise<void> => {
  console.log('🚀 sendSignalToAdmin called with data:', data);
  console.log('🔍 Current location:', window.location.href);
  console.log('📱 Telegram WebApp object:', (window as any).Telegram?.WebApp);

  try {
    const user = (window as any).Telegram?.WebApp?.initDataUnsafe?.user;
    const payload = {
      user_name: user ? user.first_name : "Anonymous",
      ...data
    };

    console.log('📱 Telegram WebApp available:', !!(window as any).Telegram?.WebApp);
    console.log('👤 User data:', user);
    console.log('📦 Payload to send:', payload);

    // Simple environment detection
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const apiUrl = isDevelopment ? '/api/webhook' : 'https://web-production-8d8bb.up.railway.app/api/signal';
    const initData = (window as any).Telegram?.WebApp?.initData;

    console.log('🌍 Environment:', isDevelopment ? 'development' : 'production');
    console.log('🔗 API URL:', apiUrl);

    // Simple fetch request
    console.log('📡 Making request to:', apiUrl);
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `tma ${initData}`
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

      alert("Не удалось отправить сигнал");
    }

    // Always try to close the app after sending the signal
    if ((window as any).Telegram?.WebApp) {
      console.log('🔒 Attempting to close Telegram WebApp');
      setTimeout(() => {
        try {
          (window as any).Telegram.WebApp.close();
          console.log('✅ Telegram WebApp closed successfully');
        } catch (closeError) {
          console.error('❌ Failed to close WebApp:', closeError);
          alert("Приложение не удалось закрыть автоматически");
        }
      }, 200);
    } else {
      console.warn('⚠️ Telegram WebApp not available, showing success message');
      alert("Данные отправлены! Приложение можно закрыть.");
    }
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

    alert("Ошибка при отправке сигнала. Попробуйте еще раз.");

    // Try to close anyway in case of error
    if ((window as any).Telegram?.WebApp) {
      console.log('🔒 Attempting to close WebApp after error');
      setTimeout(() => {
        try {
          (window as any).Telegram.WebApp.close();
          console.log('✅ WebApp closed after error');
        } catch (closeError) {
          console.error('❌ Failed to close after error:', closeError);
        }
      }, 500);
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
        close: () => void;
      };
    };
    sendSignalToAdmin: (data: any) => Promise<void>;
  }
}