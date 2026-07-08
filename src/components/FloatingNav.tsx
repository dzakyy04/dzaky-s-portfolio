import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { X } from '@phosphor-icons/react';
import ShinyText from './react-bits/ShinyText';

export function FloatingNav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show the floating navbar after scrolling past 80% of the viewport height
    const threshold = typeof window !== 'undefined' ? window.innerHeight * 0.8 : 800;
    if (latest > threshold) {
      setHidden(false);
    } else {
      setHidden(true);
      // Auto close mobile menu if scrolling all the way back to the top
      if (latest < threshold && isMenuOpen) {
        setIsMenuOpen(false);
      }
    }
  });

  return (
    <>
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
        <div className="w-full max-w-[1440px] flex justify-between items-center px-4 md:px-8 py-4">
          
          <div className="flex items-center gap-3">
            <img src="/img/logo.png" alt="Dzaky's Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-[0_0_10px_rgba(0,255,65,0.5)]" />
            <span className="font-bold text-lg md:text-xl tracking-wide uppercase text-white">
              <ShinyText text="Dzaky's Portfolio" speed={3} />
            </span>
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
            <button 
              className="md:hidden w-10 h-10 border border-zinc-700 flex flex-col justify-center items-center gap-1.5 hover:border-neon transition-colors bg-transparent relative z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className={`w-4 h-[1px] bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`w-4 h-[1px] bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-4 h-[1px] bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>

        </div>
      </motion.header>

      {/* Mobile Menu Overlay for Floating Nav */}
      <AnimatePresence>
        {isMenuOpen && !hidden && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[#050505]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {/* Close Button inside Overlay */}
            <button 
              className="absolute top-4 right-4 md:right-8 w-10 h-10 border border-zinc-700 flex justify-center items-center text-white hover:border-neon hover:text-neon transition-colors bg-transparent"
              onClick={() => setIsMenuOpen(false)}
            >
              <X weight="bold" className="w-5 h-5" />
            </button>

            <nav className="flex flex-col items-center gap-8 font-mono text-lg uppercase tracking-widest text-zinc-400">
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-neon transition-colors">About</a>
              <a href="#journey" onClick={() => setIsMenuOpen(false)} className="hover:text-neon transition-colors">Journey</a>
              <a href="#skills" onClick={() => setIsMenuOpen(false)} className="hover:text-neon transition-colors">Skills</a>
              <a href="#projects" onClick={() => setIsMenuOpen(false)} className="hover:text-neon transition-colors">Projects</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="px-6 py-2 border border-zinc-700 text-white hover:border-neon hover:text-neon transition-colors mt-4">
                Contact
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
