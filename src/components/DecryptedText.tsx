import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const CHARS = '!<>-_\\\\/[]{}—=+*^?#________';

export function DecryptedText({ text, speed = 50, delay = 0, className = '' }: { text: string, speed?: number, delay?: number, className?: string }) {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    timeout = setTimeout(() => {
      setIsAnimating(true);
      let iterations = 0;
      const interval = setInterval(() => {
        setDisplayText((prev) =>
          text
            .split('')
            .map((letter, index) => {
              if (index < iterations) return text[index];
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );

        if (iterations >= text.length) {
          clearInterval(interval);
          setIsAnimating(false);
        }

        iterations += 1 / 3;
      }, speed);
      
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return (
    <motion.span 
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      {displayText || text.replace(/./g, '_')}
    </motion.span>
  );
}
