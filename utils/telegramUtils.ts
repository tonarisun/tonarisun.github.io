// Telegram WebApp utilities
export const sendSignalToAdmin = async (data: any): Promise<void> => {
  const user = (window as any).Telegram?.WebApp?.initDataUnsafe?.user;

  const payload = {
    user_name: user ? user.first_name : "Anonymous",
    ...data
  };

  try {
    const response = await fetch('https://web-production-8d8bb.up.railway.app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('Signal sent successfully');
      if ((window as any).Telegram?.WebApp) {
        (window as any).Telegram.WebApp.close();
      }
    } else {
      console.error('Failed to send signal:', response.status);
      alert("Не удалось отправить сигнал");
    }
  } catch (error) {
    console.error('Error sending signal:', error);
    alert("Ошибка при отправке сигнала");
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