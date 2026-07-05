import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Wave {
  id: number;
  x: number;
  y: number;
}

export const ClickSpark = () => {
  const [waves, setWaves] = useState<Wave[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't trigger if they are selecting text, only on discrete clicks
      const newWave = { id: Date.now(), x: e.clientX, y: e.clientY };
      setWaves(prev => [...prev, newWave]);
      
      // Cleanup after animation completes
      setTimeout(() => {
        setWaves(prev => prev.filter(w => w.id !== newWave.id));
      }, 800);
    };

    window.addEventListener('click', handleClick, true);
    return () => window.removeEventListener('click', handleClick, true);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {waves.map(wave => (
          <div 
            key={wave.id} 
            className="absolute"
            style={{ left: wave.x, top: wave.y }}
          >
            {/* Inner fast ring */}
            <motion.div
              className="absolute rounded-full border border-neon"
              style={{
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 15px rgba(0, 255, 65, 0.6), inset 0 0 10px rgba(0, 255, 65, 0.4)'
              }}
              initial={{ width: 5, height: 5, opacity: 1, borderWidth: 2 }}
              animate={{ width: 60, height: 60, opacity: 0, borderWidth: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            {/* Outer slow shockwave */}
            <motion.div
              className="absolute rounded-full border border-neon"
              style={{
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ width: 10, height: 10, opacity: 0.8, borderWidth: 3 }}
              animate={{ width: 120, height: 120, opacity: 0, borderWidth: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
            {/* Center target dot */}
            <motion.div
              className="absolute rounded-full bg-neon"
              style={{
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 10px rgba(0, 255, 65, 1)'
              }}
              initial={{ width: 4, height: 4, opacity: 1 }}
              animate={{ width: 0, height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};
