import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DecryptedText } from './react-bits/DecryptedText';

gsap.registerPlugin(ScrollTrigger);

const manifestos = [
  {
    title: "01. FOKUS PADA SOLUSI",
    body: "Bagi saya, teknologi adalah alat bantu. Tujuan utamanya adalah menciptakan aplikasi yang benar-benar bermanfaat dan mempermudah penggunanya."
  },
  {
    title: "02. SELALU BELAJAR",
    body: "Dunia programming bergerak sangat cepat. Saya antusias mengeksplorasi teknologi baru dan terus memperbaiki cara saya menulis kode setiap harinya."
  },
  {
    title: "03. SIMPEL & EFEKTIF",
    body: "Saya percaya pada kode yang mudah dibaca dan sistem yang tidak over-engineered. Solusi terbaik biasanya adalah solusi yang paling sederhana."
  }
];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. GSAP Pinning for the Left Title
      if (window.innerWidth >= 1024) { // Only pin on desktop to prevent mobile issues
        ScrollTrigger.create({
          trigger: leftColRef.current,
          start: "top 20%",
          endTrigger: containerRef.current,
          end: "bottom 80%",
          pin: true,
          pinSpacing: false,
        });
      }

      // 2. Advanced GSAP Card Stacking Physics
      const cards = gsap.utils.toArray('.manifesto-card') as HTMLElement[];
      cards.forEach((card, i) => {
        // Initial fade-in when card enters viewport
        gsap.fromTo(card, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 60%",
              scrub: true,
            }
          }
        );

        // Scale down and dim when the NEXT card approaches
        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.3,
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top 80%",
              end: "top 30%",
              scrub: 1, // smooth scrub
            }
          });
        }
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-transparent text-white px-6 md:px-12 lg:px-24 py-32 md:py-48 border-t border-zinc-800/30 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
        
        {/* Left: GSAP Pinned Title */}
        <div className="lg:w-1/3" ref={leftColRef}>
          <div className="flex flex-col gap-6">
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              Prinsip <br/>
              <span className="text-neon">Kerja</span>
            </h2>
            <div className="w-12 h-1 bg-neon" />
            <div className="mt-4">
              <DecryptedText 
                text="// CARA SAYA BEKERJA"
                speed={30}
                className="text-zinc-400 font-mono text-xs md:text-sm tracking-widest"
              />
            </div>
          </div>
        </div>

        {/* Right: Scrolling Stack */}
        <div className="lg:w-2/3 flex flex-col gap-24 lg:gap-[40vh] pb-[10vh] lg:pb-[20vh] mt-16 lg:mt-0 relative">
          {manifestos.map((item, index) => (
            <div 
              key={index} 
              className="manifesto-card sticky top-[20vh] md:top-[30vh] flex flex-col gap-8 bg-[#0a0a0a] border border-zinc-800 p-8 md:p-12 rounded-2xl shadow-[0_-20px_40px_rgba(0,0,0,0.8)] origin-top will-change-transform"
              style={{ zIndex: index }}
            >
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-neon shadow-[0_0_10px_rgba(0,255,65,0.8)]" />
                <h3 className="text-3xl md:text-4xl font-bold font-mono tracking-tighter text-zinc-100 uppercase">
                  {item.title}
                </h3>
              </div>
              <p className="text-xl md:text-3xl font-light leading-relaxed max-w-2xl text-zinc-400">
                {item.body}
              </p>
              {/* Corner Details */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-neon/30" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-neon/30" />
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
