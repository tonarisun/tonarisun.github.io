// ПРОСТОЙ ДЕБАГ - ВВЕДИТЕ ВРУЧНУЮ
console.log('=== SIMPLE DEBUG ===');
console.log('URL:', window.location.href);
console.log('Telegram:', !!window.Telegram);
console.log('WebApp:', !!window.Telegram?.WebApp);

if (window.Telegram?.WebApp) {
    console.log('SUCCESS: WebApp available');
    console.log('User:', window.Telegram.WebApp.initDataUnsafe?.user?.first_name);
    console.log('sendData:', typeof window.Telegram.WebApp.sendData);
    console.log('close:', typeof window.Telegram.WebApp.close);
} else {
    console.log('FAIL: WebApp not available');
}