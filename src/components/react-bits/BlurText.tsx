import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';

interface BlurTextProps {
  text: string;
  delay?: number; // in seconds
  className?: string;
}

export const BlurText = ({ text, delay = 0, className = '' }: BlurTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [elements, setElements] = useState<React.JSX.Element[]>([]);

  useEffect(() => {
    const words = text.split(' ');
    const htmlElements = words.map((word, i) => (
      <motion.span
        key={i}
        initial={{ filter: 'blur(10px)', opacity: 0, y: 10 }}
        animate={isInView ? { filter: 'blur(0px)', opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: delay + i * 0.1 }}
        style={{ display: 'inline-block', marginRight: '0.3em' }}
      >
        {word}
      </motion.span>
    ));
    setElements(htmlElements);
  }, [text, isInView, delay]);

  return (
    <span ref={ref} className={className}>
      {elements}
    </span>
  );
};
