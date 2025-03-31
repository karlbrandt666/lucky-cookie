import React, { useState } from 'react';
import WebApp from '@twa-dev/sdk';
import './App.css';
import { PaymentService } from './services/PaymentService.ts';

function App() {
  const [prediction, setPrediction] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleGetPrediction = async () => {
    try {
      setLoading(true);
      setError('');

      const result = await PaymentService.processPayment();
      if (!result.success) {
        throw new Error(result.error || 'Ошибка при обработке платежа');
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/generate-prediction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Ошибка при получении предсказания');
      }

      const data = await response.json();
      setPrediction(data.text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lucky Cookie</h1>
        <p>Получи своё предсказание!</p>
      </header>
      <main className="App-main">
        {error && <div className="error-message">{error}</div>}
        {prediction && (
          <div className="prediction-container">
            <p className="prediction-text">{prediction}</p>
          </div>
        )}
        <button 
          className="get-prediction-button"
          onClick={handleGetPrediction}
          disabled={loading}
        >
          {loading ? 'Загрузка...' : 'Получить предсказание'}
        </button>
      </main>
    </div>
  );
}

export default App; 