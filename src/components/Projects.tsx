import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { DecryptedText } from './react-bits/DecryptedText';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "RSMH Web Profile",
    category: "Healthcare Frontend",
    image: "/img/projects/project1-rsmh-profile.webp",
    description: "Rebuilt the hospital profile website frontend per Ministry of Health standardization guidelines, ensuring national regulatory compliance and visual consistency.",
    link: "https://rsmh.co.id/"
  },
  {
    title: "Siapicon",
    category: "Attendance System",
    image: "/img/projects/project2-siapicon.webp",
    description: "A geofencing-based attendance application to easily track field personnel presence and daily activities.",
    link: "https://github.com/dzakyy04/siapicon"
  },
  {
    title: "Citizen Clustering",
    category: "Data Clustering",
    image: "/img/projects/project3-citizen-clustering.webp",
    description: "An application to group village residents using the K-Means algorithm, making it easier to distribute social aid accurately.",
    link: "https://github.com/dzakyy04/pengelompokkan-warga-kmeans"
  },
  {
    title: "E-Surat Desa",
    category: "Public Service",
    image: "/img/projects/project4-pengajuan-surat-online.webp",
    description: "A centralized online portal for village residents to easily request official letters, simplifying administrative procedures and digitizing local governance.",
    link: "https://github.com/dzakyy04/Pengajuan-Surat-Online"
  },
  {
    title: "Jawabin",
    category: "AI & NLP",
    image: "/img/projects/project5-jawabin.webp",
    description: "An extractive question-answering platform powered by a fine-tuned IndoBERT model to provide precise answers from Indonesian text.",
    link: "https://github.com/dzakyy04/jawabin"
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
      
      const scrollTween = gsap.to(track.current, {
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

      // Highlight cards when they reach the focal point of the screen
      const cards = gsap.utils.toArray('.project-card');
      cards.forEach((card: any) => {
        ScrollTrigger.create({
          trigger: card,
          containerAnimation: scrollTween,
          start: "left 40%",
          end: "right 40%",
          toggleClass: "is-active",
        });
      });

    }, wrap);
    
    return () => ctx.revert();
  }, []);

  const scrollNext = () => {
    window.scrollBy({ top: window.innerWidth * 0.5, behavior: 'smooth' });
  };

  const scrollPrev = () => {
    window.scrollBy({ top: -(window.innerWidth * 0.5), behavior: 'smooth' });
  };

  return (
    <section id="projects" ref={wrap} className="relative overflow-hidden bg-transparent text-white border-t border-zinc-800/30">
      <div className="absolute top-12 left-0 w-full flex flex-col items-center text-center md:items-start md:text-left md:left-12 lg:left-24 px-4 md:px-0 z-20 mix-blend-difference pointer-events-none gap-4">
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase">
          Featured <br/>
          <span className="text-neon">Projects</span>
        </h2>
        <div className="w-12 h-1 bg-neon" />
        <div className="mt-4">
          <DecryptedText 
            text="// SELECT WORKS & EXPLORATIONS"
            speed={50}
            className="text-white font-mono text-sm tracking-widest uppercase"
          />
        </div>
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 md:bottom-12 md:left-auto md:translate-x-0 md:right-12 lg:right-24 z-50 flex gap-4 pointer-events-auto">
        <button onClick={scrollPrev} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-zinc-700 bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-neon hover:text-black hover:border-neon transition-colors">
          <ArrowLeft size={20} weight="bold" />
        </button>
        <button onClick={scrollNext} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-zinc-700 bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-neon hover:text-black hover:border-neon transition-colors">
          <ArrowRight size={20} weight="bold" />
        </button>
      </div>

      <div ref={track} className="flex h-[100dvh] items-center pt-32 md:pt-24 px-4 md:px-12 lg:px-24 gap-8 md:gap-12 lg:gap-24 w-max">
        {projects.map((p, i) => (
          <a key={i} href={p.link} target="_blank" rel="noopener noreferrer" className="project-card block cursor-pointer relative group flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] aspect-video bg-zinc-900 border border-zinc-800 overflow-hidden">
            {p.image ? (
              <>
                <div 
                  className="absolute inset-0 bg-cover bg-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-[.is-active]:grayscale-0 group-[.is-active]:opacity-100 transition-all duration-700 group-hover:scale-105 group-[.is-active]:scale-105"
                  style={{ backgroundImage: `url(${p.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 group-[.is-active]:opacity-60 transition-opacity duration-500" />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 group-hover:bg-zinc-800 group-[.is-active]:bg-zinc-800 transition-colors duration-500">
                <span className="text-zinc-600 font-mono text-sm tracking-widest uppercase">Explore Archive</span>
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 p-4 md:p-8 w-full flex justify-between items-end z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
              <div className="flex-1 transform translate-y-4 group-hover:translate-y-0 group-[.is-active]:translate-y-0 transition-transform duration-500 ease-out">
                <p className="text-neon font-mono text-[10px] md:text-xs uppercase tracking-widest mb-1">{p.category}</p>
                <h3 className="text-xl md:text-5xl font-bold tracking-tighter text-white pr-2 md:pr-4 leading-tight">{p.title}</h3>
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-[.is-active]:grid-rows-[1fr] transition-all duration-500 ease-out">
                  <div className="overflow-hidden">
                    <p className="text-zinc-300 text-[10px] md:text-sm font-mono mt-2 md:mt-3 opacity-0 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-opacity duration-500 delay-100 pr-2 md:pr-4 line-clamp-2 md:line-clamp-none">
                      {p.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-8 h-8 md:w-12 md:h-12 shrink-0 rounded-full border border-zinc-700 flex items-center justify-center bg-black/50 backdrop-blur-md group-hover:bg-neon group-hover:text-black group-hover:border-neon group-[.is-active]:bg-neon group-[.is-active]:text-black group-[.is-active]:border-neon transition-colors duration-300 transform translate-y-4 group-hover:translate-y-0 group-[.is-active]:translate-y-0">
                <ArrowUpRight className="w-4 h-4 md:w-6 md:h-6" weight="bold" />
              </div>
            </div>
            
            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20 group-hover:border-neon group-[.is-active]:border-neon transition-colors" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20 group-hover:border-neon group-[.is-active]:border-neon transition-colors" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20 group-hover:border-neon group-[.is-active]:border-neon transition-colors" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20 group-hover:border-neon group-[.is-active]:border-neon transition-colors" />
          </a>
        ))}
        {/* Spacer to allow the last card to reach the focal point (35% from left) */}
        <div className="w-[5vw] md:w-[20vw] lg:w-[40vw] shrink-0" />
      </div>
    </section>
  );
}
