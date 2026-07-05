import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { DecryptedText } from './react-bits/DecryptedText';

const historyData = [
  {
    institution: "RSUP Dr. Mohammad Hoesin",
    degree: "Programmer",
    year: "Oct 2025 — Present",
    description: "Spearheaded critical digital transformations by engineering robust in-house platforms that eliminated third-party dependencies and optimized hospital workflows. Developed automated scheduling systems and integrated advanced biometric authentication to drastically streamline outpatient operations, ensuring strict compliance with national healthcare standards."
  },
  {
    institution: "Sriwijaya University",
    degree: "Bachelor of Informatics",
    year: "Aug 2021 — Aug 2025",
    description: "Graduated with exceptional academic standing. Deeply immersed in core technical foundations spanning software engineering, database architecture, and distributed systems. Beyond academic theory, this is where I mastered the art of translating complex logic into tangible, object-oriented solutions and designing highly scalable architectures."
  },
  {
    institution: "Bangkit Academy",
    degree: "Cloud Computing Learning Path",
    year: "Aug 2023 — Jan 2024",
    description: "Graduated with distinction as a top-performing cohort member. Recognized for outstanding engagement across technical, soft skills, and professional disciplines. Mastered the architecture and deployment of resilient, highly-scalable cloud infrastructures engineered to handle rigorous, real-world industry demands."
  }
];

function EducationCard({ item, index }: { item: typeof historyData[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Simple entrance animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 50%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <div 
      className="sticky"
      style={{ 
        top: `calc(15vh + ${index * 1.5}rem)`, 
        marginBottom: '40vh',
        zIndex: index
      }}
    >
      <motion.div 
        ref={ref}
        style={{ opacity, scale }}
        className="p-6 md:p-12 border border-zinc-800 bg-[#050505] backdrop-blur-xl rounded-xl shadow-[0_-15px_30px_-10px_rgba(0,0,0,0.9)] group hover:border-neon/50 transition-colors relative"
      >
        <div className="font-mono text-neon text-sm mb-4 font-bold tracking-widest">{item.year}</div>
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-zinc-100">{item.institution}</h3>
        <h4 className="text-lg text-zinc-400 font-medium mb-6">{item.degree}</h4>
        <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-mono">
          {item.description}
        </p>
        
        {/* Decorative Corner Brackets */}
        <div className="absolute -top-[1px] -left-[1px] w-6 h-6 border-t-2 border-l-2 border-neon/0 group-hover:border-neon/50 transition-colors rounded-tl-xl" />
        <div className="absolute -bottom-[1px] -right-[1px] w-6 h-6 border-b-2 border-r-2 border-neon/0 group-hover:border-neon/50 transition-colors rounded-br-xl" />
        
        {/* Node Decor */}
        <div className="absolute top-8 right-8 text-zinc-800 font-mono text-sm font-bold opacity-30 group-hover:opacity-100 transition-opacity">
          0{index + 1}
        </div>
      </motion.div>
    </div>
  );
}

export function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="journey" className="relative w-full bg-transparent text-white px-4 md:px-12 lg:px-24 py-16 md:py-32 border-t border-zinc-800/30 backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-24">
        
        {/* Left: Sticky Title */}
        <div className="lg:w-1/3">
          <div className="relative lg:sticky lg:top-32 flex flex-col items-center text-center lg:items-start lg:text-left gap-4">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mb-6">
              Journey & <br/>
              <span className="text-neon">Experience</span>
            </h2>
            <div className="w-12 h-1 bg-neon" />
            <div className="mt-4">
              <DecryptedText 
                text="// EDUCATION & CAREER HISTORY"
                speed={50}
                className="text-zinc-400 font-mono text-sm tracking-widest"
              />
            </div>
            
            {/* Lanyard Component */}
            {/* <div className="mt-8 h-[300px] lg:h-[400px] w-full relative rounded-xl overflow-hidden cursor-grab active:cursor-grabbing">
              <Lanyard fov={12} lanyardWidth={3} />
            </div> */}
          </div>
        </div>

        {/* Right: Scrolling Stack */}
        <div className="lg:w-2/3 relative pb-[10vh] mt-16 lg:mt-0" ref={containerRef}>
          {historyData.map((item, index) => (
            <EducationCard key={index} item={item} index={index} />
          ))}
        </div>
        
      </div>
    </section>
  );
}
