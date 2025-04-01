import React from 'react';
import { motion } from 'framer-motion';
import styles from './FortuneCookie.module.css';

interface FortuneCookieProps {
  isOpen: boolean;
  fortune: string;
  onClick: () => void;
}

export const FortuneCookie: React.FC<FortuneCookieProps> = ({ isOpen, fortune, onClick }) => {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.cookie}
        animate={{
          rotateY: isOpen ? 180 : 0,
          scale: isOpen ? 1.2 : 1,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut"
        }}
        onClick={onClick}
      >
        <div className={styles.cookieFront}>
          <div className={styles.cookieText}>?</div>
        </div>
        <div className={styles.cookieBack}>
          <div className={styles.fortune}>{fortune}</div>
        </div>
      </motion.div>
    </div>
  );
}; 