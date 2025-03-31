import WebApp from '@twa-dev/sdk';

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

export class PaymentService {
  private static readonly PRICE_IN_STARS = 5;
  private static readonly API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

  static async processPayment(): Promise<PaymentResult> {
    try {
      if (!WebApp.initData) {
        throw new Error('WebApp не инициализирован');
      }

      const response = await fetch(`${this.API_URL}/api/process-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          initData: WebApp.initData,
          amount: this.PRICE_IN_STARS
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка при обработке платежа');
      }

      const result = await response.json();
      return {
        success: result.success,
        transactionId: result.transactionId
      };
    } catch (error) {
      console.error('Ошибка при обработке платежа:', error);
      return {
        success: false,
        error: 'Ошибка при обработке платежа'
      };
    }
  }

  static validatePayment(): boolean {
    // Валидация теперь происходит на сервере
    return true;
  }
} 