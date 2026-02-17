// 🚀 БЫСТРЫЙ ТЕСТ TELEGRAM WEBAPP
// Вставьте этот код в консоль Telegram WebApp

console.log('🔍 === TELEGRAM WEBAPP DIAGNOSTICS ===');
console.log('📱 Telegram available:', !!(window as any).Telegram);
console.log('🤖 WebApp available:', !!(window as any).Telegram?.WebApp);
console.log('👤 User:', (window as any).Telegram?.WebApp?.initDataUnsafe?.user?.first_name || 'N/A');
console.log('📤 sendData method:', typeof (window as any).Telegram?.WebApp?.sendData);
console.log('🔒 close method:', typeof (window as any).Telegram?.WebApp?.close);
console.log('🌐 Current URL:', window.location.href);

// Тестовая функция
window.quickTest = async function() {
    console.log('🧪 Запуск быстрого теста...');

    try {
        const response = await fetch('https://web-production-8d8bb.up.railway.app', {
            method: 'HEAD'
        });
        console.log('✅ Сервер доступен:', response.status);
    } catch (error) {
        console.log('❌ Сервер недоступен:', error.message);
    }

    // Тест Telegram sendData
    if ((window as any).Telegram?.WebApp?.sendData) {
        console.log('📤 Тестирование sendData...');
        (window as any).Telegram.WebApp.sendData(JSON.stringify({
            test: true,
            timestamp: Date.now()
        }));
        console.log('✅ sendData выполнен');
    } else {
        console.log('❌ sendData недоступен');
    }
};

console.log('💡 Доступные команды:');
console.log('   quickTest() - запустить полный тест');
console.log('   testTelegramSend({data}) - отправить данные');
console.log('   testTelegramClose() - закрыть приложение');

console.log('🎯 Готово! Теперь пройдите квиз и нажмите кнопку.');