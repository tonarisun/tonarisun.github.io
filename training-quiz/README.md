# training-quiz

Локальный запуск и запуск по сети для браузера.

## Требования

- Node.js 18+

## Запуск локально (только на этом компьютере)

```bash
cd training-quiz
npm run start
```

Открой:

- `http://127.0.0.1:8080`

## Запуск по локальной сети (LAN)

```bash
cd training-quiz
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
