import { motion } from 'motion/react';
import { UnicornScene } from './UnicornScene';
import SplitText from './react-bits/SplitText';
import { BlurText } from './react-bits/BlurText';
import { DecryptedText } from './react-bits/DecryptedText';
import { Magnet } from './react-bits/Magnet';

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-transparent font-sans flex flex-col items-center">
      
      {/* Background grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      
      {/* Subtle radial glow in the center */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Decorative Arch behind the head */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] border-t border-neon/20 rounded-t-[300px] pointer-events-none z-0" />

      {/* Navbar */}
      <header className="w-full max-w-[1440px] flex justify-between items-center px-8 py-6 z-30 relative">
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
      </header>

      {/* Main Headline */}
      <div className="w-full flex flex-col items-center text-center mt-6 mb-4 z-20 px-4">
        <div className="text-4xl md:text-6xl lg:text-[5rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600 leading-none mb-4 flex flex-wrap justify-center gap-x-4">
          <BlurText 
            text="HELLO, I'M DEWA SHEVA DZAKY"
            delay={0.1}
          />
        </div>
        <DecryptedText 
          text="A FULLSTACK DEVELOPER"
          speed={50}
          delay={0.8}
          className="text-lg md:text-2xl lg:text-3xl font-mono tracking-[0.2em] md:tracking-[0.4em] text-neon uppercase"
        />
      </div>

      {/* Center Portrait Container - Fixed aspect ratio to prevent stretching */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[1050px] aspect-[1440/900] z-10 pointer-events-auto flex items-end justify-center">
        <UnicornScene className="w-full h-full origin-bottom" />
        {/* Gradient fade at the bottom to blend chest into background */}
        <div className="absolute bottom-10 left-0 w-full h-40 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-20" />
      </div>

      {/* Floating HUD Cards */}
      <div className="relative w-full max-w-[1440px] flex-1 pointer-events-none z-20">
        
        {/* Left Card */}
        <Magnet padding={50} magnetStrength={20} className="absolute left-4 md:left-12 lg:left-24 top-[15vh] z-30 pointer-events-auto">
          <motion.div 
            className="w-[300px] p-6 border border-zinc-800 bg-[#050505]/60 backdrop-blur-md rounded-lg cursor-default"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-neon shadow-[0_0_10px_rgba(0,255,65,0.8)]" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-100">Fullstack<br/>Developer</h3>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed font-mono">
              Berbekal 1 tahun pengalaman, saya fokus membangun arsitektur web yang skalabel. Mulai dari backend yang kokoh hingga frontend interaktif dengan standar tinggi.
            </p>
            {/* Decorative corner brackets */}
            <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t border-l border-neon/50 rounded-tl-lg" />
            <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b border-r border-neon/50 rounded-br-lg" />
          </motion.div>
        </Magnet>

        {/* Right Card */}
        <Magnet padding={50} magnetStrength={20} className="absolute right-4 md:right-12 lg:right-24 top-[30vh] z-30 pointer-events-auto">
          <motion.div 
            className="w-[300px] p-6 border border-zinc-800 bg-[#050505]/60 backdrop-blur-md rounded-lg cursor-default"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-neon shadow-[0_0_10px_rgba(0,255,65,0.8)]" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-100">Problem<br/>Solver</h3>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed font-mono">
              Saya membangun aplikasi untuk memecahkan masalah nyata. Mengubah alur kerja yang rumit menjadi sistem yang efisien, otomatis, dan benar-benar mempermudah pekerjaan.
            </p>
            {/* Decorative corner brackets */}
            <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t border-l border-neon/50 rounded-tl-lg" />
            <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b border-r border-neon/50 rounded-br-lg" />
          </motion.div>
        </Magnet>

        {/* Action Buttons (over chest) */}
        <motion.div 
          className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 flex items-center gap-4 pointer-events-auto z-30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <button className="px-8 py-3 bg-black/50 backdrop-blur-md border border-zinc-700 text-white font-bold uppercase tracking-widest text-xs hover:border-neon transition-colors rounded-sm">
            Hubungi Saya
          </button>
          <button className="px-8 py-3 bg-neon text-black font-bold uppercase tracking-widest text-xs hover:bg-neon-hover transition-colors rounded-sm shadow-[0_0_20px_rgba(0,255,65,0.3)]">
            Download CV
          </button>
        </motion.div>

      </div>
    </section>
  );
}



