// Telegram WebApp utilities
export const sendSignalToAdmin = async (data: any): Promise<void> => {
  const user = (window as any).Telegram?.WebApp?.initDataUnsafe?.user;

  const payload = {
    user_name: user ? user.first_name : "Anonymous",
    ...data
  };

  try {
    console.log('Sending signal to admin:', payload);

    // Use proxy in development, direct URL in production
    const apiUrl = import.meta.env.DEV
      ? '/api'
      : 'https://web-production-8d8bb.up.railway.app';

    console.log('Using API URL:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    console.log('Response status:', response.status);

    if (response.ok) {
      console.log('Signal sent successfully');
    } else {
      console.error('Failed to send signal:', response.status);
      alert("Не удалось отправить сигнал");
    }

    // Always try to close the app after sending the signal
    if ((window as any).Telegram?.WebApp) {
      console.log('Closing Telegram WebApp');
      setTimeout(() => {
        (window as any).Telegram.WebApp.close();
      }, 100); // Small delay to ensure data is processed
    } else {
      console.warn('Telegram WebApp not available, showing success message');
      alert("Данные отправлены! Приложение можно закрыть.");
    }
  } catch (error) {
    console.error('Error sending signal:', error);
    alert("Ошибка при отправке сигнала");

    // Try to close anyway in case of error
    if ((window as any).Telegram?.WebApp) {
      console.log('Closing Telegram WebApp after error');
      (window as any).Telegram.WebApp.close();
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