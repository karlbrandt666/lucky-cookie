declare module '@twa-dev/sdk' {
  interface WebApp {
    initData: string;
    sendData(data: string): Promise<string>;
  }
}

export interface Prediction {
  text: string;
  date: string;
  source: 'free' | 'paid';
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
} 