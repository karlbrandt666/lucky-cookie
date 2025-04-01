console.log('=== Начало загрузки приложения ===');
console.log('Текущая директория:', process.cwd());
console.log('Версия Node.js:', process.version);
console.log('Архитектура:', process.arch);
console.log('Платформа:', process.platform);
console.log('Пользователь:', process.env.USER || process.env.USERNAME);
console.log('ID пользователя:', process.getuid ? process.getuid() : 'N/A');
console.log('ID группы:', process.getgid ? process.getgid() : 'N/A');

// Проверка прав на запись
const fs = require('fs');
try {
  fs.accessSync('.', fs.constants.W_OK);
  console.log('[SYSTEM] Есть права на запись в текущую директорию');
} catch (err) {
  console.error('[SYSTEM] Нет прав на запись в текущую директорию:', err);
}

// Проверка переменных окружения
const requiredEnvVars = ['HUGGING_FACE_API_KEY', 'TELEGRAM_BOT_TOKEN'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('[CONFIG] Отсутствуют обязательные переменные окружения:', missingEnvVars.join(', '));
  // Не завершаем процесс, продолжаем работу
}

console.log('[CONFIG] Переменные окружения:', {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  HUGGING_FACE_API_KEY: process.env.HUGGING_FACE_API_KEY ? 'Установлен' : 'Не установлен',
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN ? 'Установлен' : 'Не установлен'
});

try {
  console.log('[SYSTEM] Загрузка модулей...');
  const express = require('express');
  console.log('[SYSTEM] express загружен');
  const cors = require('cors');
  console.log('[SYSTEM] cors загружен');
  const { createHash } = require('crypto');
  console.log('[SYSTEM] crypto загружен');
  const fetch = require('node-fetch');
  console.log('[SYSTEM] node-fetch загружен');
  require('dotenv').config();
  console.log('[SYSTEM] dotenv загружен');
  const { Telegraf } = require('telegraf');
  console.log('[SYSTEM] telegraf загружен');
  const axios = require('axios');
  console.log('[SYSTEM] axios загружен');

  console.log('=== Модули успешно загружены ===');

  const app = express();
  const port = process.env.PORT || 3000;

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Инициализация бота
  const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

  // Функция для генерации предсказания через Hugging Face API
  async function generateFortune() {
    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/facebook/opt-350m',
        {
          inputs: 'Generate a short, positive fortune cookie message in Russian:',
          parameters: {
            max_length: 100,
            temperature: 0.7,
            top_p: 0.9,
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data[0].generated_text;
    } catch (error) {
      console.error('Error generating fortune:', error);
      return 'Сегодня будет удачный день!';
    }
  }

  // Обработка команды /start
  bot.command('start', async (ctx) => {
    const fortune = await generateFortune();
    await ctx.reply(`Привет! Я бот с предсказаниями. Вот твое предсказание на сегодня:\n\n${fortune}`);
  });

  // Запуск бота
  bot.launch();

  // API endpoint для получения предсказания
  app.get('/api/fortune', async (req, res) => {
    try {
      const fortune = await generateFortune();
      res.json({ fortune });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Запуск сервера
  console.log(`[SERVER] Попытка запуска сервера на порту ${port}...`);
  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`[SERVER] Сервер успешно запущен на порту ${port}`);
    console.log(`[SERVER] Приложение готово к работе`);
    console.log(`[SERVER] Слушаю на http://0.0.0.0:${port}`);
  }).on('error', (err) => {
    console.error('[SERVER] Ошибка при запуске сервера:', err);
    if (err.code === 'EADDRINUSE') {
      console.error(`[SERVER] Ошибка: Порт ${port} уже используется`);
      process.exit(1);
    } else {
      console.error('[SERVER] Неизвестная ошибка при запуске сервера:', err);
      // Не завершаем процесс, пробуем использовать другой порт
      const newPort = port + 1;
      console.log(`[SERVER] Попытка использовать порт ${newPort}...`);
      server.listen(newPort, '0.0.0.0');
    }
  });

  // Проверка состояния сервера
  server.on('listening', () => {
    const address = server.address();
    console.log(`[SERVER] Сервер слушает на ${address.address}:${address.port}`);
  });

  // Обработка завершения работы
  process.on('SIGTERM', () => {
    console.log('[SERVER] Получен сигнал SIGTERM. Завершение работы...');
    server.close(() => {
      console.log('[SERVER] Сервер остановлен');
      process.exit(0);
    });
  });

  // Обработка необработанных ошибок
  process.on('uncaughtException', (error) => {
    console.error('[CRITICAL] Необработанная ошибка:', error);
    console.error('[CRITICAL] Стек вызовов:', error.stack);
    // Не завершаем процесс, даем серверу шанс восстановиться
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('[ERROR] Необработанное отклонение промиса:', reason);
    console.error('[ERROR] Стек вызовов:', reason.stack);
    // Не завершаем процесс, даем серверу шанс восстановиться
  });

  // Добавляем обработчик для проверки состояния сервера
  setInterval(() => {
    if (server.listening) {
      console.log(`[HEALTH] Сервер работает на порту ${port}`);
    } else {
      console.log('[HEALTH] Сервер не слушает порт');
    }
  }, 5000);

} catch (error) {
  console.error('[CRITICAL] Критическая ошибка при запуске приложения:', error);
  console.error('[CRITICAL] Стек вызовов:', error.stack);
  // Не завершаем процесс сразу, даем шанс на восстановление
  setTimeout(() => {
    console.log('[CRITICAL] Попытка перезапуска приложения...');
    process.exit(1);
  }, 5000);
} 