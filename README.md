# Lucky Cookie - Telegram Mini App

Приложение для получения предсказаний через Telegram Mini App с использованием AI.

## Функциональность

- Интеграция с Telegram Mini App
- Генерация предсказаний через Hugging Face API
- Анимированное печенье с предсказаниями
- Адаптивный дизайн

## Требования

- Node.js 16+
- npm или yarn
- Telegram Bot Token
- Hugging Face API Key

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/your-username/lucky-cookie.git
cd lucky-cookie
```

2. Установите зависимости:
```bash
# Установка зависимостей сервера
npm install

# Установка зависимостей клиента
cd client
npm install
```

3. Создайте файл `.env` в корневой директории:
```env
PORT=3000
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
HUGGINGFACE_API_KEY=your_huggingface_api_key
```

4. Создайте файл `.env` в директории client:
```env
PORT=3001
HOST=localhost
BROWSER=none
REACT_APP_API_URL=https://your-timeweb-domain.com
```

## Разработка

1. Запуск сервера:
```bash
npm start
```

2. Запуск клиента:
```bash
cd client
npm start
```

## Деплой на TimeWeb

1. Создайте новый проект на TimeWeb
2. Подключите GitHub репозиторий
3. Настройте переменные окружения в панели управления TimeWeb:
   - `TELEGRAM_BOT_TOKEN`
   - `HUGGINGFACE_API_KEY`
   - `PORT=3000`
   - `NODE_ENV=production`

4. Настройки деплоя:
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Node.js версия: 16.x

5. Домен: Укажите ваш домен в настройках проекта

## Структура проекта

```
lucky-cookie/
├── client/                 # React приложение
│   ├── src/
│   │   ├── components/    # React компоненты
│   │   ├── data/         # Данные и API
│   │   └── styles/       # CSS модули
│   └── public/           # Статические файлы
├── server.js             # Express сервер
├── timeweb.config.js     # Конфигурация для TimeWeb
└── package.json         # Зависимости проекта
```

## Лицензия

MIT 

# Lucky Cookie Telegram Bot

Telegram бот для генерации предсказаний с использованием AI модели FRED-T5-1.7B от Hugging Face.

## Возможности

- Генерация креативных предсказаний
- Интеграция с Telegram Web App
- Безопасная валидация данных от Telegram
- Поддержка платежей (заготовка)

## Технологии

- Node.js
- Express.js
- Telegram Bot API
- Hugging Face API
- node-fetch

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
```env
HUGGING_FACE_API_KEY=your_api_key
TELEGRAM_BOT_TOKEN=your_bot_token
PORT=3000
```

4. Запустите приложение:
```bash
npm start
```

## Разработка

Для запуска в режиме разработки с автоматической перезагрузкой:
```bash
npm run dev
```

## API Endpoints

### POST /api/generate-prediction
Генерирует новое предсказание.

### POST /api/process-payment
Обрабатывает платеж (заготовка).

## Безопасность

- Все запросы от Telegram проверяются на подлинность
- API ключи хранятся в переменных окружения
- Используется CORS для защиты от несанкционированных запросов

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