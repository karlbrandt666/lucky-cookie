# Lucky Cookie Telegram Bot

Telegram бот для генерации предсказаний в стиле печенья с предсказаниями.

## Функциональность

- Генерация случайных предсказаний
- Интеграция с Telegram
- Модерация контента
- Система подписок

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/your-username/lucky-cookie.git
cd lucky-cookie
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env` и добавьте необходимые переменные окружения:
```
TELEGRAM_BOT_TOKEN=your_bot_token_here
```

4. Запустите приложение:
```bash
npm run dev
```

## Развертывание

Проект настроен для развертывания на TimeWeb Cloud Apps. Для деплоя:

1. Создайте новое приложение в TimeWeb Cloud Apps
2. Подключите GitHub репозиторий
3. Настройте переменные окружения в панели управления TimeWeb
4. Запустите деплой

## Структура проекта

```
lucky-cookie/
├── src/
│   ├── functions/
│   │   └── generatePrediction.ts
│   ├── services/
│   │   └── PaymentService.ts
│   └── index.ts
├── package.json
├── tsconfig.json
├── timeweb.json
└── README.md
```

## Лицензия

MIT 

# Telegram Fortune Cookie Mini App

Мини-приложение для Telegram, где пользователи могут получать предсказания в виде печенья с предсказаниями.

## Функциональность

- Покупка предсказаний за Telegram Stars
- Каждое 5-е предсказание бесплатно
- Обмен предсказаний на участие в розыгрышах
- Реферальная система
- Уведомления
- Статистика
- Возможность делиться предсказаниями

## Технологии

- React + TypeScript
- Framer Motion (анимации)
- Firebase (Firestore, Functions)
- OpenAI API (GPT-4)
- Telegram Bot API
- Telegram Stars API

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/yourusername/telegram-fortune-cookie.git
cd telegram-fortune-cookie
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env` на основе `.env.example` и заполните необходимые переменные окружения:
```bash
cp .env.example .env
```

4. Запустите приложение в режиме разработки:
```bash
npm start
```

## Развертывание

1. Соберите приложение:
```bash
npm run build
```

2. Разверните на Firebase:
```bash
firebase deploy
```

## Структура проекта

```
src/
  ├── components/     # React компоненты
  ├── services/      # Сервисы для работы с API
  ├── styles/        # CSS стили
  ├── config/        # Конфигурация Firebase
  └── App.tsx        # Основной компонент приложения
```

## Лицензия

MIT 

# Lucky Cookie Server

Серверная часть приложения Lucky Cookie для TimeWeb.

## Установка

1. Клонируйте репозиторий
2. Установите зависимости:
```bash
npm install
```
3. Создайте файл `.env` на основе `.env.example` и заполните необходимые переменные окружения:
- `PORT` - порт сервера (по умолчанию 3000)
- `FOLDER_ID` - ID папки в Yandex.Cloud
- `YANDEX_API_KEY` - API ключ Yandex.Cloud
- `TELEGRAM_BOT_TOKEN` - токен Telegram бота

## Развертывание на TimeWeb

1. Создайте новый проект на TimeWeb
2. Выберите Node.js в качестве технологии
3. Укажите версию Node.js 16 или выше
4. Загрузите файлы проекта
5. В настройках проекта укажите:
   - Точка входа: `server.js`
   - Команда запуска: `npm start`
6. Добавьте переменные окружения в настройках проекта
7. Запустите проект

## Разработка

Для локальной разработки используйте:
```bash
npm run dev
```

## API Endpoints

### POST /api/generate-prediction
Генерирует новое предсказание.

### POST /api/process-payment
Обрабатывает платеж. 