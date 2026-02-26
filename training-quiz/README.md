# training-quiz

Локальный запуск и запуск по сети для браузера.

## Требования

- Node.js 18+
- Установленные зависимости (`npm install` в папке `training-quiz`)

## Запуск локально (только на этом компьютере)

```bash
cd training-quiz
npm install
npm run start:local
```

Открой:

- `http://127.0.0.1:8080`

## Запуск по локальной сети (LAN)

```bash
cd training-quiz
npm install
npm run start:network
```

Открой на другом устройстве в той же сети:

- `http://<IP_вашего_компьютера>:8080`

Чтобы узнать IP на macOS:

```bash
ipconfig getifaddr en0
```

Если `en0` пустой, проверь:

```bash
ipconfig getifaddr en1
```

## Деплой на Railway

- Укажи `Root Directory`: `training-quiz` (если деплоишь из этого монорепозитория)
- `Build Command`: `npm install`
- `Start Command`: `npm start`
- `PORT` в Railway добавлять не нужно: платформа передаст его автоматически

После деплоя открой публичный URL сервиса и пройди квиз до кнопки `УЗНАТЬ РЕЗУЛЬТАТ`, чтобы проверить отправку `fetch` в `SIGNAL_API_URL`.

Перед запуском сервер автоматически собирает `dist/telegram-utils.bundle.js` из общего файла `../utils/telegramUtils.ts`.
