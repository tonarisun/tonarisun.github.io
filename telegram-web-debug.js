// ДЕБАГ СКРИПТ ДЛЯ ВЕБ-ТЕЛЕГРАМ
// Вставьте этот код в консоль https://web.telegram.org

console.log('🔍 === TELEGRAM WEB DEBUG ===');
console.log('📱 Текущий URL:', window.location.href);
console.log('🌐 Hostname:', window.location.hostname);
console.log('📦 Telegram объект:', window.Telegram);
console.log('🤖 WebApp объект:', window.Telegram?.WebApp);
console.log('👤 Пользователь:', window.Telegram?.WebApp?.initDataUnsafe?.user);
console.log('📤 sendData метод:', typeof window.Telegram?.WebApp?.sendData);
console.log('🔒 close метод:', typeof window.Telegram?.WebApp?.close);

// Проверка доступности API
if (window.Telegram?.WebApp) {
    console.log('✅ Telegram WebApp доступен');

    // Тестовые функции
    window.testWebApp = {
        sendTestData: function() {
            const testData = JSON.stringify({
                action: 'test_from_web_telegram',
                timestamp: Date.now(),
                user_agent: navigator.userAgent
            });
            console.log('📤 Отправка тестовых данных:', testData);
            window.Telegram.WebApp.sendData(testData);
        },

        closeApp: function() {
            console.log('🔒 Закрытие приложения...');
            window.Telegram.WebApp.close();
        },

        showUserInfo: function() {
            const user = window.Telegram.WebApp.initDataUnsafe?.user;
            console.log('👤 Информация о пользователе:', user);
            alert('Пользователь: ' + (user ? user.first_name : 'Не найден'));
        }
    };

    console.log('🛠️ Доступные команды:');
    console.log('   testWebApp.sendTestData() - отправить тестовые данные');
    console.log('   testWebApp.closeApp() - закрыть приложение');
    console.log('   testWebApp.showUserInfo() - показать информацию о пользователе');

} else {
    console.log('❌ Telegram WebApp НЕДОСТУПЕН');
    console.log('💡 Убедитесь, что находитесь в WebApp бота, а не в обычном чате');

    // Попытка найти Telegram API в других местах
    console.log('🔍 Поиск Telegram API в window...');
    for (let key in window) {
        if (key.toLowerCase().includes('telegram')) {
            console.log('📍 Найден ключ:', key, '=', window[key]);
        }
    }
}

// Проверка сети
async function testServerConnection() {
    try {
        console.log('🌐 Проверка соединения с сервером...');
        const response = await fetch('https://web-production-8d8bb.up.railway.app', { method: 'HEAD' });
        console.log('✅ Сервер отвечает:', response.status);
        return true;
    } catch (error) {
        console.log('❌ Сервер недоступен:', error.message);
        return false;
    }
}

testServerConnection();

console.log('🎯 Теперь протестируйте приложение и смотрите логи!');