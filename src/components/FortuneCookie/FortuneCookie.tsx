import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fortune } from '../../data/fortunes';
import styles from './FortuneCookie.module.css';

interface FortuneCookieProps {
  fortune: Fortune;
  onOpen: () => void;
  isOpen: boolean;
}

export const FortuneCookie: React.FC<FortuneCookieProps> = ({ fortune, onOpen, isOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.cookie}
        onClick={handleClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{
          rotate: isOpen ? 180 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        <div className={styles.cookieFront}>
          <div className={styles.cookieTexture} />
        </div>
        <div className={styles.cookieBack}>
          <div className={styles.fortune}>
            <p>{fortune.text}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}; 