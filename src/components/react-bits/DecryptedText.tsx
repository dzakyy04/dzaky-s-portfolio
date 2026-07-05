import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  className?: string;
  delay?: number;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()';

export const DecryptedText = ({ text, speed = 50, className = '', delay = 0 }: DecryptedTextProps) => {
  const [displayText, setDisplayText] = useState(text.replace(/./g, ' '));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (!isInView) return;
    
    let timeout: ReturnType<typeof setTimeout>;
    
    // Initial delay
    timeout = setTimeout(() => {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayText((current) => 
          current
            .split('')
            .map((letter, index) => {
              if (index < iteration) return text[index];
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );
        
        if (iteration >= text.length) {
          clearInterval(interval);
        }
        
        iteration += 1 / 3; // takes 3 frames per letter to reveal
      }, speed);
      
      return () => clearInterval(interval);
    }, delay * 1000);
    
    return () => clearTimeout(timeout);
  }, [text, speed, isInView, delay]);

  return (
    <motion.span 
      ref={ref} 
      className={`inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3, delay }}
    >
      {displayText}
    </motion.span>
  );
};
