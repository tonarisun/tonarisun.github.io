// Отладочный скрипт для Telegram WebApp
// Вставьте этот код в консоль браузера в Telegram WebApp

console.log('🔍 Telegram WebApp Debug Info:');
console.log('Telegram available:', !!(window as any).Telegram);
console.log('WebApp available:', !!(window as any).Telegram?.WebApp);
console.log('User data:', (window as any).Telegram?.WebApp?.initDataUnsafe?.user);
console.log('sendData available:', typeof (window as any).Telegram?.WebApp?.sendData);
console.log('close available:', typeof (window as any).Telegram?.WebApp?.close);

// Тестовая функция для отправки данных
window.testTelegramSend = function(data) {
    const telegramData = typeof data === 'string' ? data : JSON.stringify(data);
    console.log('📤 Sending via Telegram sendData:', telegramData);

    if ((window as any).Telegram?.WebApp?.sendData) {
        (window as any).Telegram.WebApp.sendData(telegramData);
        console.log('✅ Data sent via Telegram');
    } else {
        console.error('❌ Telegram sendData not available');
    }
};

// Тестовая функция для закрытия
window.testTelegramClose = function() {
    console.log('🔒 Attempting to close Telegram WebApp');

    if ((window as any).Telegram?.WebApp?.close) {
        (window as any).Telegram.WebApp.close();
        console.log('✅ WebApp closed');
    } else {
        console.error('❌ Telegram close not available');
    }
};

console.log('💡 Available test functions:');
console.log('  testTelegramSend({action: "test"}) - отправить тестовые данные');
console.log('  testTelegramClose() - закрыть приложение');

// Пример использования:
// testTelegramSend({
//   service_type: "bot_development_order",
//   action: "order_bot_development",
//   quiz_result: { bot_type: "LINEAR", title: "Test Bot" }
// });