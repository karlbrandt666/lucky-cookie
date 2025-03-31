console.log('Начало загрузки приложения...');

try {
  const express = require('express');
  const cors = require('cors');
  const { createHash } = require('crypto');
  const fetch = require('node-fetch');
  require('dotenv').config();

  console.log('Модули успешно загружены');
  console.log('Переменные окружения:', {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    HUGGING_FACE_API_KEY: process.env.HUGGING_FACE_API_KEY ? 'Установлен' : 'Не установлен',
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN ? 'Установлен' : 'Не установлен'
  });

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
    throw new Error('HUGGING_FACE_API_KEY не установлен');
  }

  if (!TELEGRAM_BOT_TOKEN) {
    throw new Error('TELEGRAM_BOT_TOKEN не установлен');
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
  console.log(`Попытка запуска сервера на порту ${port}...`);
  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Сервер успешно запущен на порту ${port}`);
    console.log('Приложение готово к работе');
  }).on('error', (err) => {
    console.error('Ошибка при запуске сервера:', err);
    if (err.code === 'EADDRINUSE') {
      console.error(`Ошибка: Порт ${port} уже используется`);
      process.exit(1);
    } else {
      console.error('Неизвестная ошибка при запуске сервера:', err);
    }
  });

  // Обработка завершения работы
  process.on('SIGTERM', () => {
    console.log('Получен сигнал SIGTERM. Завершение работы...');
    server.close(() => {
      console.log('Сервер остановлен');
      process.exit(0);
    });
  });

  // Обработка необработанных исключений
  process.on('uncaughtException', (err) => {
    console.error('Необработанное исключение:', err);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Необработанное отклонение промиса:', reason);
    process.exit(1);
  });
} catch (error) {
  console.error('Критическая ошибка при запуске приложения:', error);
  process.exit(1);
} 