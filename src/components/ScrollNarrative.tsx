import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function ScrollNarrative() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'] 
  });

  const narrativeText = "MORE THAN JUST CODE. CRAFTING DIGITAL SOLUTIONS. LET'S GET TO KNOW ME.";
  const words = narrativeText.split(" ");

  return (
    <section 
      id="about"
      ref={containerRef}
      className="relative h-[150dvh] md:h-[200dvh] lg:h-[250dvh] w-full bg-transparent px-4 md:px-12 lg:px-24"
    >
      <div className="sticky top-0 h-[100dvh] flex flex-col items-center justify-center">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center text-center gap-x-2 gap-y-1 sm:gap-x-4 sm:gap-y-2 lg:gap-x-6 lg:gap-y-4">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            
            const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
            const color = useTransform(
              scrollYProgress, 
              [start, end], 
              ['rgba(255,255,255,0.15)', i >= words.length - 5 ? '#00ff41' : '#ffffff'] // LET'S GET TO KNOW ME in neon
            );

            return (
              <motion.span 
                key={i}
                style={{ opacity, color }}
                className="text-[2.25rem] sm:text-4xl md:text-6xl lg:text-[5.5rem] font-black uppercase tracking-tighter leading-none"
              >
                {word}
              </motion.span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

