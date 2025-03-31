import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CookieProps {
  onBreak: () => void;
}

const Cookie: React.FC<CookieProps> = ({ onBreak }) => {
  const [isBreaking, setIsBreaking] = useState(false);
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);

  const handleDragEnd = (event: any, info: any) => {
    if (Math.abs(info.offset.x) > 100) {
      setIsBreaking(true);
      setDragDirection(info.offset.x > 0 ? 'right' : 'left');
      onBreak();
    }
  };

  return (
    <motion.div
      className="cookie-container"
      initial={{ scale: 1 }}
      animate={{ scale: isBreaking ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
    >
      <motion.div
        className="cookie"
        initial={{ rotate: 0 }}
        animate={{ 
          rotate: isBreaking ? (dragDirection === 'right' ? 45 : -45) : 0,
          x: isBreaking ? (dragDirection === 'right' ? 200 : -200) : 0
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="cookie-texture">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="cookie-crack"
              initial={{ scale: 0 }}
              animate={{ 
                scale: isBreaking ? 1 : 0,
                opacity: isBreaking ? 1 : 0
              }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Cookie; 