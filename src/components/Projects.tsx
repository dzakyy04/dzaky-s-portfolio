import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@phosphor-icons/react";
import { DecryptedText } from './react-bits/DecryptedText';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Project Alpha",
    category: "Fullstack Architecture",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2976&auto=format&fit=crop"
  },
  {
    title: "Project Beta",
    category: "Real-time Systems",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2970&auto=format&fit=crop"
  },
  {
    title: "Project Gamma",
    category: "WebGL Experience",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=3000&auto=format&fit=crop"
  },
  {
    title: "More Missions",
    category: "View Archive",
    image: null
  }
];

export function Projects() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrap.current || !track.current) return;
    
    const ctx = gsap.context(() => {
      // Calculate how far the track needs to move based on its total width minus the viewport width
      const distance = track.current!.scrollWidth - window.innerWidth;
      
      gsap.to(track.current, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, wrap);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={wrap} className="relative overflow-hidden bg-transparent text-white border-t border-zinc-800/30">
      <div className="absolute top-12 left-6 md:left-12 lg:left-24 z-20 mix-blend-difference pointer-events-none flex flex-col gap-4">
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase">
          Featured <br/>
          <span className="text-neon">Projects</span>
        </h2>
        <div className="w-12 h-1 bg-neon" />
        <div className="mt-4">
          <DecryptedText 
            text="// HASIL KARYA DAN EKSPLORASI"
            speed={50}
            className="text-white font-mono text-sm tracking-widest uppercase"
          />
        </div>
      </div>

      <div ref={track} className="flex h-[100dvh] items-center pt-24 px-6 md:px-12 lg:px-24 gap-12 lg:gap-24 w-max">
        {projects.map((p, i) => (
          <div key={i} className="relative group flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] aspect-[4/3] bg-zinc-900 border border-zinc-800 overflow-hidden">
            {p.image ? (
              <>
                <div 
                  className="absolute inset-0 bg-cover bg-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${p.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 group-hover:bg-zinc-800 transition-colors duration-500">
                <span className="text-zinc-600 font-mono text-sm tracking-widest uppercase">Explore Archive</span>
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
              <div>
                <p className="text-neon font-mono text-xs uppercase tracking-widest mb-2">{p.category}</p>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">{p.title}</h3>
              </div>
              <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center bg-black/50 backdrop-blur-md group-hover:bg-neon group-hover:text-black group-hover:border-neon transition-colors duration-300">
                <ArrowUpRight size={24} weight="bold" />
              </div>
            </div>
            
            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20 group-hover:border-neon transition-colors" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20 group-hover:border-neon transition-colors" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20 group-hover:border-neon transition-colors" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20 group-hover:border-neon transition-colors" />
          </div>
        ))}
      </div>
    </section>
  );
}
