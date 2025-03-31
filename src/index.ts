import express from 'express';
import cors from 'cors';
import { generatePrediction } from './functions/generatePrediction';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Эндпоинт для генерации предсказания
app.post('/api/generate-prediction', async (req, res) => {
  try {
    const prediction = await generatePrediction();
    res.json({ prediction });
  } catch (error) {
    console.error('Error generating prediction:', error);
    res.status(500).json({ error: 'Failed to generate prediction' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 