import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Telegram bot
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN || '', { polling: true });

// Routes
app.post('/api/generate-prediction', async (req, res) => {
  try {
    // Здесь будет логика генерации предсказания
    const prediction = "Вас ждет удачный день!";
    res.json({ text: prediction });
  } catch (error) {
    console.error('Error generating prediction:', error);
    res.status(500).json({ error: 'Failed to generate prediction' });
  }
});

app.post('/api/process-payment', async (req, res) => {
  try {
    const { initData, amount } = req.body;
    // Здесь будет логика обработки платежа
    res.json({ success: true, transactionId: 'test-transaction' });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Failed to process payment' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 