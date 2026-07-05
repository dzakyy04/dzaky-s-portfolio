import { motion } from 'motion/react';
import React from 'react';

interface FuzzyOverlayProps {
  className?: string;
}

export const FuzzyOverlay: React.FC<FuzzyOverlayProps> = ({ className = '' }) => {
  return (
    <motion.div
      className={`pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.04] mix-blend-difference ${className}`}
      initial={{ transform: 'translateX(-10%) translateY(-10%)' }}
      animate={{
        transform: [
          'translateX(-10%) translateY(-10%)',
          'translateX(10%) translateY(10%)',
          'translateX(-10%) translateY(10%)',
          'translateX(10%) translateY(-10%)',
          'translateX(-10%) translateY(-10%)',
        ],
      }}
      transition={{
        repeat: Infinity,
        duration: 0.2,
        ease: 'linear',
      }}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }}
    />
  );
};

export default FuzzyOverlay;
