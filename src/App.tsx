import React, { useState, useCallback } from 'react';
import { FortuneCookie } from './components/FortuneCookie/FortuneCookie';
import { getRandomFortune } from './data/fortunes';
import styles from './App.module.css';

const App: React.FC = () => {
  const [fortune, setFortune] = useState(getRandomFortune());
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleNewFortune = useCallback(() => {
    setFortune(getRandomFortune());
    setIsOpen(false);
  }, []);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Печенье с предсказанием</h1>
      </header>
      <main className={styles.main}>
        <FortuneCookie
          fortune={fortune}
          onOpen={handleOpen}
          isOpen={isOpen}
        />
        {isOpen && (
          <button
            className={styles.button}
            onClick={handleNewFortune}
            aria-label="Получить новое предсказание"
          >
            Новое предсказание
          </button>
        )}
      </main>
      <footer className={styles.footer}>
        <p>Нажмите на печенье, чтобы узнать предсказание</p>
      </footer>
    </div>
  );
};

export default App; 