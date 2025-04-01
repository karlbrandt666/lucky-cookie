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

  console.log('=== Модули успешно загружены ===');

  const app = express();
  const port = process.env.PORT || 3000;

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Конфигурация
  const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/ai-forever/FRED-T5-1.7B';
  const API_KEY = process.env.HUGGING_FACE_API_KEY;
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

  // Проверка необходимых переменных окружения
  if (!API_KEY) {
    console.error('[CONFIG] HUGGING_FACE_API_KEY не установлен');
    // Не завершаем процесс, продолжаем работу
  }

  if (!TELEGRAM_BOT_TOKEN) {
    console.error('[CONFIG] TELEGRAM_BOT_TOKEN не установлен');
    // Не завершаем процесс, продолжаем работу
  }

  // Валидация initData
  function validateInitData(initData) {
    try {
      const params = new URLSearchParams(initData);
      const hash = params.get('hash');
      params.delete('hash');

      // Сортируем параметры по алфавиту
      const sortedParams = Array.from(params.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');

      // Создаем секретную строку
      const secret = createHash('sha256')
        .update(TELEGRAM_BOT_TOKEN || '')
        .digest();

      // Создаем хеш из параметров
      const calculatedHash = createHash('sha256')
        .update(sortedParams)
        .update(secret)
        .digest('hex');

      return calculatedHash === hash;
    } catch (error) {
      console.error('Ошибка валидации initData:', error);
      return false;
    }
  }

  // Генерация предсказания
  async function generatePrediction() {
    try {
      const prompt = `Сгенерируй креативное предсказание для печенья (1 предложение).
Тема: юмор, жизненные советы, абсурдные ситуации.
Примеры:
- 'Завтра ты встретишь человека в костюме жирафа. Скажи ему «Привет, Миша!».
- 'Не ешь суп в темноте. Это опасно для твоих штанов.'
Избегай негатива и банальностей.`;

      const response = await fetch(HUGGING_FACE_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_length: 100,
            temperature: 0.7,
            top_p: 0.9
          }
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка при запросе к Hugging Face');
      }

      const data = await response.json();
      return data[0].generated_text.trim();
    } catch (error) {
      console.error('Ошибка генерации предсказания:', error);
      return 'Сегодня будет хороший день!';
    }
  }

  // API endpoints
  app.post('/api/generate-prediction', async (req, res) => {
    try {
      const predictionText = await generatePrediction();
      res.json({
        text: predictionText,
        date: new Date().toISOString(),
        source: 'paid'
      });
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при генерации предсказания' });
    }
  });

  app.post('/api/process-payment', async (req, res) => {
    try {
      const { initData, amount } = req.body;

      if (!validateInitData(initData)) {
        return res.status(400).json({ error: 'Неверные данные инициализации' });
      }

      // Здесь должна быть интеграция с платежной системой
      // В данном примере мы просто возвращаем успешный результат
      res.json({
        success: true,
        transactionId: `test_${Date.now()}`
      });
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при обработке платежа' });
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