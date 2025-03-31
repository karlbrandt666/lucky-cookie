import { Context } from '@yandex-cloud/functions-framework';
import { createHash } from 'crypto';

interface PaymentRequest {
  initData: string;
  amount: number;
}

export const handler = async (ctx: Context) => {
  try {
    const request = ctx.request.body as PaymentRequest;
    const { initData, amount } = request;

    // Проверяем валидность initData
    if (!validateInitData(initData)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Неверные данные инициализации' })
      };
    }

    // Здесь должна быть интеграция с платежной системой
    // В данном примере мы просто возвращаем успешный результат
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        transactionId: `test_${Date.now()}`
      })
    };
  } catch (error) {
    console.error('Ошибка обработки платежа:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Ошибка при обработке платежа' })
    };
  }
};

function validateInitData(initData: string): boolean {
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
      .update(process.env.TELEGRAM_BOT_TOKEN || '')
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