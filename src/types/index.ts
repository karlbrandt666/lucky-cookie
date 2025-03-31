// Типы для WebApp
declare module '@twa-dev/sdk' {
  interface WebApp {
    initData: string;
    sendData(data: string): Promise<string>;
  }
}

// Типы для предсказаний
export interface Prediction {
  text: string;
  date: string;
  source: 'paid' | 'free' | 'referral';
}

// Типы для платежей
export interface PaymentResult {
  success: boolean;
  error?: string;
  transactionId?: string;
}

export interface WebAppResult {
  success: boolean;
  transaction_id?: string;
  error?: string;
} 