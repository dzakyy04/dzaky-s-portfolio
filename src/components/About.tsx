import { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import { DecryptedText } from './react-bits/DecryptedText';

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
  
  return (
    <section className="relative w-full bg-transparent text-white px-6 md:px-12 lg:px-24 py-32 border-t border-zinc-800/30 backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Left: Sticky Title */}
        <div className="lg:w-1/3">
          <div className="sticky top-32 flex flex-col gap-4">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
              Prinsip <br/>
              <span className="text-neon">Kerja</span>
            </h2>
            <div className="w-12 h-1 bg-neon" />
            <div className="mt-4">
              <DecryptedText 
                text="// CARA SAYA BEKERJA"
                speed={50}
                className="text-zinc-400 font-mono text-sm tracking-widest"
              />
            </div>
          </div>
        </div>

        {/* Right: Scrolling Stack */}
        <div className="lg:w-2/3 flex flex-col gap-24 lg:gap-[30vh] pb-12 lg:pb-[20vh] mt-24 lg:mt-0" ref={containerRef}>
          {manifestos.map((item, index) => (
            <Card key={index} index={index} title={item.title} body={item.body} />
          ))}
        </div>
        
      </div>
    </section>
  );
}

function Card({ title, body, index }: { title: string, body: string, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "start 20%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const color = useTransform(scrollYProgress, [0, 1], ["#52525b", "#d4d4d8"]); // zinc-600 to zinc-300

  return (
    <motion.div 
      ref={ref}
      style={{ opacity, y }}
      className="flex flex-col gap-6"
    >
      <motion.h3 
        style={{ color: useTransform(scrollYProgress, [0, 1], ["#3f3f46", "#f4f4f5"]) }}
        className="text-3xl md:text-4xl font-bold font-mono tracking-tighter"
      >
        {title}
      </motion.h3>
      <motion.div 
        style={{ color }}
        className="text-xl md:text-3xl font-light leading-relaxed max-w-2xl"
      >
        {body}
      </motion.div>
    </motion.div>
  );
}
