// Тестовый скрипт для проверки sendSignalToAdmin через консоль браузера
// Откройте приложение в браузере и выполните этот код в консоли

// 1. Настройка мока Telegram WebApp (если не в Telegram среде)
if (!window.Telegram) {
    window.Telegram = {
        WebApp: {
            initDataUnsafe: {
                user: {
                    first_name: "Тестовый",
                    last_name: "Пользователь",
                    id: 123456789
                }
            },
            close: function() {
                console.log("✅ Telegram WebApp закрыт (мок)");
                alert("Приложение закрыто!");
            },
            sendData: function(data) {
                console.log("📤 Telegram sendData вызван с данными:", data);
            }
        }
    };
    console.log("🎭 Мок Telegram WebApp активирован");
}

// 2. Импорт функции sendSignalToAdmin (симуляция загрузки утилиты)
window.sendSignalToAdmin = async function(data) {
    console.log("🚀 sendSignalToAdmin вызван с данными:", data);

    const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
    const payload = {
        user_name: user ? user.first_name : "Anonymous",
        ...data
    };

    console.log("📦 Финальный payload:", payload);

    try {
        console.log("🌐 Отправка запроса на сервер...");
        // Use proxy URL for local development
        const apiUrl = window.location.hostname === 'localhost'
            ? 'http://localhost:3000/api'
            : 'https://web-production-8d8bb.up.railway.app';
        console.log("📍 API URL:", apiUrl);
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        console.log(`📡 Ответ сервера: ${response.status} ${response.statusText}`);

        if (response.ok) {
            console.log("✅ Сигнал отправлен успешно");
            if (window.Telegram?.WebApp) {
                console.log("🔒 Закрытие приложения...");
                setTimeout(() => {
                    window.Telegram.WebApp.close();
                }, 100);
            }
        } else {
            console.error("❌ Ошибка отправки сигнала:", response.status);
            alert("Не удалось отправить сигнал");
        }
    } catch (error) {
        console.error("💥 Ошибка при отправке:", error);
        alert("Ошибка при отправке сигнала");

        // Пытаемся закрыть при ошибке
        if (window.Telegram?.WebApp) {
            setTimeout(() => {
                window.Telegram.WebApp.close();
            }, 100);
        }
    }
};

console.log("✅ sendSignalToAdmin готов к тестированию!");
console.log("💡 Примеры использования:");
console.log("   await sendSignalToAdmin({action: 'test', data: 'hello'})");
console.log("   await sendSignalToAdmin({service_type: 'bot_development_order', action: 'order_bot_development', quiz_result: {bot_type: 'LINEAR', title: 'Test Bot'}})");

// Экспорт для удобства
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { sendSignalToAdmin: window.sendSignalToAdmin };
}