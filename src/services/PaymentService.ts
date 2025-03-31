import WebApp from '@twa-dev/sdk';
import { PaymentResult } from '../types';

export class PaymentService {
  private static readonly PRICE_IN_STARS = 5;
  private static readonly API_URL = process.env.REACT_APP_API_URL || 'https://functions.yandexcloud.net/d4e...'; // Замените на ваш URL

  static async processPayment(): Promise<PaymentResult> {
    try {
      // Проверяем инициализацию WebApp
      if (!WebApp.initData) {
        throw new Error('WebApp не инициализирован');
      }

      // Создаем параметры для платежа
      const paymentParams = {
        initData: WebApp.initData,
        amount: this.PRICE_IN_STARS
      };

      // Отправляем запрос на обработку платежа
      const response = await fetch(`${this.API_URL}/process-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentParams)
      });

      if (!response.ok) {
        throw new Error('Ошибка при обработке платежа');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Неизвестная ошибка'
      };
    }
  }

  static validatePayment(initData: string): boolean {
    // Валидация теперь происходит на сервере
    return true;
  }
} 