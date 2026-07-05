import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { DecryptedText } from './react-bits/DecryptedText';
import Lanyard from './react-bits/Lanyard';

const historyData = [
  {
    institution: "RSUP Dr. Mohammad Hoesin",
    degree: "Programmer",
    year: "Okt 2025 — Sekarang",
    description: "Bertanggung jawab dalam mengembangkan dan memelihara sistem perangkat lunak untuk mendukung efisiensi operasional layanan kesehatan di rumah sakit. Berfokus pada keandalan dan optimalisasi aplikasi."
  },
  {
    institution: "Universitas Sriwijaya",
    degree: "Teknik Informatika",
    year: "2021 — 2025",
    description: "Di sinilah pijakan pertama saya dalam dunia teknologi benar-benar diuji. Tidak sekadar menghafal teori, saya belajar bagaimana menerjemahkan logika kompleks menjadi solusi nyata. Dari dasar ilmu komputer hingga merancang arsitektur sistem yang lebih terstruktur."
  },
  {
    institution: "Bangkit Academy",
    degree: "Cloud Computing Learning Path",
    year: "2023",
    description: "Sebuah lompatan besar. Terpilih dalam program intensif dari Google, GoTo, dan Traveloka ini memaksa saya keluar dari zona nyaman. Di sini saya belajar membangun infrastruktur cloud yang tangguh, scalable, dan siap menghadapi kerasnya standar industri."
  }
];

function EducationCard({ item, index }: { item: typeof historyData[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Scrubbable Animation tied to this specific card's position
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 25%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [250, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.75, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -3 : 3, 0]);
  const filter = useTransform(scrollYProgress, [0, 1], ['blur(15px)', 'blur(0px)']);

  return (
    <motion.div 
      ref={ref}
      style={{ 
        opacity, 
        y, 
        scale, 
        rotateX,
        rotateZ,
        filter,
        transformPerspective: 1200
      }}
      className="p-8 md:p-12 border border-zinc-800 bg-[#050505]/90 backdrop-blur-md rounded-lg hover:border-neon/50 transition-colors relative group"
    >
      <div className="font-mono text-neon text-sm mb-4 font-bold tracking-widest">{item.year}</div>
      <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-zinc-100">{item.institution}</h3>
      <h4 className="text-lg text-zinc-400 font-medium mb-6">{item.degree}</h4>
      <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-mono">
        {item.description}
      </p>
      
      {/* Decorative Corner Brackets */}
      <div className="absolute -top-[1px] -left-[1px] w-6 h-6 border-t-2 border-l-2 border-neon/0 group-hover:border-neon/50 transition-colors rounded-tl-lg" />
      <div className="absolute -bottom-[1px] -right-[1px] w-6 h-6 border-b-2 border-r-2 border-neon/0 group-hover:border-neon/50 transition-colors rounded-br-lg" />
      
      {/* Node Decor */}
      <div className="absolute top-8 right-8 text-zinc-800 font-mono text-sm font-bold opacity-30 group-hover:opacity-100 transition-opacity">
        0{index + 1}
      </div>
    </motion.div>
  );
}

export function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="journey" className="relative w-full bg-transparent text-white px-6 md:px-12 lg:px-24 py-32 border-t border-zinc-800/30 backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Left: Sticky Title */}
        <div className="lg:w-1/3">
          <div className="sticky top-32 flex flex-col gap-4">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
              Journey & <br/>
              <span className="text-neon">Experience</span>
            </h2>
            <div className="w-12 h-1 bg-neon" />
            <div className="mt-4">
              <DecryptedText 
                text="// RIWAYAT PENDIDIKAN & PEKERJAAN"
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
        <div className="lg:w-2/3 flex flex-col gap-[20vh] pb-[15vh] mt-24 lg:mt-0" ref={containerRef}>
          <div className="space-y-[15vh]">
            {historyData.map((item, index) => (
              <EducationCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
