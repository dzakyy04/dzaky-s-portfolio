import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';

export function FloatingNav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show the floating navbar after scrolling past 80% of the viewport height
    const threshold = typeof window !== 'undefined' ? window.innerHeight * 0.8 : 800;
    if (latest > threshold) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  });

  return (
    <motion.header 
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 }
      }}
      initial="hidden"
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 flex justify-center bg-[#050505]/90 backdrop-blur-md border-b border-zinc-800/80"
    >
      <div className="w-full max-w-[1440px] flex justify-between items-center px-8 py-4">
        
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl tracking-wide uppercase text-white">Dewa Dzaky</span>
          <div className="w-2 h-2 bg-neon rounded-full" />
        </div>
        
        <nav className="hidden md:flex items-center gap-12 font-mono text-xs uppercase tracking-widest text-zinc-400">
          <a href="#about" className="hover:text-neon transition-colors">About</a>
          <a href="#journey" className="hover:text-neon transition-colors">Journey</a>
          <a href="#skills" className="hover:text-neon transition-colors">Skills</a>
          <a href="#projects" className="hover:text-neon transition-colors">Projects</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <a href="#contact" className="hidden md:flex items-center justify-center px-6 py-2 border border-zinc-700 text-xs font-mono uppercase tracking-widest text-white hover:border-neon hover:text-neon transition-colors">
            Contact
          </a>
          <button className="md:hidden w-10 h-10 border border-zinc-700 flex flex-col justify-center items-center gap-1.5 hover:border-neon transition-colors bg-transparent">
            <span className="w-4 h-[1px] bg-white" />
            <span className="w-4 h-[1px] bg-white" />
            <span className="w-4 h-[1px] bg-white" />
          </button>
        </div>

      </div>
    </motion.header>
  );
}
