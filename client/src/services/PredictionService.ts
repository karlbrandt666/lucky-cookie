import { Prediction } from '../types';

export class PredictionService {
  private static readonly API_URL = process.env.REACT_APP_API_URL || 'https://functions.yandexcloud.net/d4e...'; // Замените на ваш URL после деплоя

  static initialize() {
    // Инициализация не требуется
  }

  static async generatePrediction(): Promise<Prediction> {
    try {
      const response = await fetch(`${this.API_URL}/generate-prediction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка при генерации предсказания');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка генерации предсказания:', error);
      return {
        text: 'Сегодня будет хороший день!',
        date: new Date().toISOString(),
        source: 'paid'
      };
    }
  }

  static async moderatePrediction(text: string): Promise<boolean> {
    // Модерация теперь происходит на сервере
    return true;
  }
} 