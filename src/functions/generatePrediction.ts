import fetch from 'node-fetch';

const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/facebook/opt-350m';
const API_KEY = process.env.HUGGING_FACE_API_KEY;

export async function generatePrediction(): Promise<string> {
  try {
    const prompt = `Generate a funny and absurd fortune cookie prediction. The prediction should be short (2-3 sentences), humorous, and not contain inappropriate content.`;

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
          top_p: 0.9,
          return_full_text: false
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    const prediction = data[0].generated_text;

    // Проверка на неприемлемый контент
    const moderationResponse = await fetch('https://api-inference.huggingface.co/models/unitary/multilingual-toxic-xlm-roberta', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prediction
      })
    });

    if (!moderationResponse.ok) {
      throw new Error('Moderation check failed');
    }

    const moderationData = await moderationResponse.json();
    if (moderationData[0].label === 'toxic') {
      return 'Сегодня печенье молчит. Попробуйте позже!';
    }

    return prediction;
  } catch (error) {
    console.error('Error generating prediction:', error);
    return 'Сегодня печенье молчит. Попробуйте позже!';
  }
} 