import React, { useState, useCallback } from 'react';
import { FortuneCookie } from './components/FortuneCookie/FortuneCookie';
import { getRandomFortune } from './data/fortunes';
import styles from './App.module.css';

function App() {
  const [fortune, setFortune] = useState(getRandomFortune());
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
      setFortune(getRandomFortune());
    } else {
      setIsOpen(true);
    }
  }, [isOpen]);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Печенье с предсказанием</h1>
      </header>
      <main className={styles.main}>
        <FortuneCookie 
          isOpen={isOpen} 
          fortune={fortune} 
          onClick={handleClick}
        />
        <button className={styles.button} onClick={handleClick}>
          {isOpen ? 'Получить новое предсказание' : 'Открыть печенье'}
        </button>
      </main>
      <footer className={styles.footer}>
        <p>Нажмите на печенье или кнопку, чтобы открыть его</p>
      </footer>
    </div>
  );
}

export default App;
