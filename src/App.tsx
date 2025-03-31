import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cookie from './components/Cookie';
import { PaymentService } from './services/PaymentService';
import { PredictionService } from './services/PredictionService';
import { Prediction } from './types';
import './styles/Cookie.css';

const App: React.FC = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [currentPrediction, setCurrentPrediction] = useState<Prediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    PredictionService.initialize();
  }, []);

  const handleCookieBreak = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Обработка платежа
      const paymentResult = await PaymentService.processPayment();
      
      if (!paymentResult.success) {
        throw new Error(paymentResult.error || 'Ошибка при обработке платежа');
      }

      // Генерация предсказания
      const prediction = await PredictionService.generatePrediction();
      
      // Модерация предсказания
      const isSafe = await PredictionService.moderatePrediction(prediction.text);
      
      if (!isSafe) {
        throw new Error('Предсказание не прошло модерацию');
      }

      setCurrentPrediction(prediction);
      setPredictions(prev => [...prev, prediction]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Магическое Печенье</h1>
        <p>Ваша коллекция: {predictions.length}</p>
      </header>

      <main className="app-main">
        <Cookie onBreak={handleCookieBreak} />
        
        <div className="prediction-container">
          {currentPrediction && (
            <motion.div
              className="prediction-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              key="prediction"
            >
              <h2>Ваше предсказание:</h2>
              <p>{currentPrediction.text}</p>
            </motion.div>
          )}
        </div>

        {error && (
          <motion.div
            className="error-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        {isLoading && (
          <div className="loading">
            Загрузка...
          </div>
        )}
      </main>
    </div>
  );
};

export default App; 