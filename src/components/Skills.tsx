import { LogoLoop } from './react-bits/LogoLoop';
import { DecryptedText } from './react-bits/DecryptedText';
import { useState, useRef, useEffect } from 'react';
import { useScroll, useVelocity, useSpring, useMotionValueEvent } from 'motion/react';
import { Database, Lightning } from '@phosphor-icons/react';

const techStack = [
  { name: "PHP", icon: "php", url: "https://www.php.net/docs.php" },
  { name: "JavaScript", icon: "javascript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "Python", icon: "python", url: "https://docs.python.org/3/" },
  { name: "Go", icon: "go", url: "https://go.dev/doc/" },
  
  { name: "Laravel", icon: "laravel", url: "https://laravel.com/docs" },
  { name: "CodeIgniter", icon: "codeigniter", url: "https://codeigniter.com/user_guide/" },
  { name: "Express", icon: "express", url: "https://expressjs.com/" },
  { name: "React", icon: "react", url: "https://react.dev/" },
  { name: "Oracle APEX", icon: "oracle", url: "https://apex.oracle.com/" },
  { name: "Flask", icon: "flask", url: "https://flask.palletsprojects.com/" },
  { name: "Fiber", icon: "fiber", url: "https://docs.gofiber.io/" },
  { name: "Bootstrap", icon: "bootstrap", url: "https://getbootstrap.com/docs/" },
  { name: "Tailwind", icon: "tailwindcss", url: "https://tailwindcss.com/docs" },
  
  { name: "MySQL", icon: "mysql", url: "https://dev.mysql.com/doc/" },
  { name: "Oracle DB", icon: "oracle", url: "https://docs.oracle.com/en/database/" },
  { name: "Firebase", icon: "firebase", url: "https://firebase.google.com/docs" },
  
  { name: "Git", icon: "git", url: "https://git-scm.com/doc" },
  { name: "GitHub", icon: "github", url: "https://docs.github.com/" },
  { name: "Postman", icon: "postman", url: "https://learning.postman.com/docs/" },
  { name: "DBeaver", icon: "dbeaver", url: "https://dbeaver.com/docs/" },
  { name: "Bash", icon: "gnubash", url: "https://www.gnu.org/software/bash/manual/" },
  { name: "Google Cloud", icon: "googlecloud", url: "https://cloud.google.com/docs" }
];

// Split into two arrays for two separate loops going in opposite directions
const half = Math.ceil(techStack.length / 2);
const firstHalf = techStack.slice(0, half);
const secondHalf = techStack.slice(half);

function SkillCard({ skill }: { skill: typeof techStack[0] }) {
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsActive(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isActive]);
  
  return (
    <div 
      ref={cardRef}
      onClick={() => setIsActive(!isActive)}
      onDoubleClick={() => window.open(skill.url, '_blank')}
      className={`flex items-center gap-4 justify-center px-8 h-[80px] bg-[#050505]/80 backdrop-blur-sm border rounded-xl transition-all duration-300 cursor-pointer group/card ${
        isActive 
          ? 'border-neon/80 text-neon bg-neon/10 shadow-[0_0_30px_rgba(0,255,65,0.15)] scale-110 z-10' 
          : 'border-zinc-800/80 hover:border-neon/80 hover:text-neon hover:bg-neon/10 hover:shadow-[0_0_30px_rgba(0,255,65,0.15)] hover:scale-110 hover:z-10'
      }`}
      title={`Click to highlight. Double click to open ${skill.name} docs`}
    >
      {skill.icon === 'oracle' ? (
        <Database weight="fill" className={`w-8 h-8 shrink-0 transition-colors duration-300 ${isActive ? 'text-neon' : 'text-zinc-400 group-hover/card:text-neon'}`} />
      ) : skill.icon === 'fiber' ? (
        <Lightning weight="fill" className={`w-8 h-8 shrink-0 transition-colors duration-300 ${isActive ? 'text-neon' : 'text-zinc-400 group-hover/card:text-neon'}`} />
      ) : (
        <div 
          className={`w-8 h-8 shrink-0 transition-colors duration-300 ${isActive ? 'bg-neon' : 'bg-zinc-400 group-hover/card:bg-neon'}`}
          style={{
            WebkitMaskImage: `url(https://cdn.simpleicons.org/${skill.icon})`,
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskImage: `url(https://cdn.simpleicons.org/${skill.icon})`,
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
          }}
        />
      )}
      <span className={`font-mono text-sm tracking-widest uppercase font-bold whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-white' : 'text-zinc-300 group-hover/card:text-white'}`}>
        {skill.name}
      </span>
    </div>
  );
}

const createNodes = (skills: typeof techStack) => 
  skills.map(skill => ({
    title: skill.name,
    node: <SkillCard skill={skill} />
  }));

const logos1 = createNodes(firstHalf);
const logos2 = createNodes(secondHalf);

export function Skills() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  
  const [scrollDir, setScrollDir] = useState(1);
  const [velocityOffset, setVelocityOffset] = useState(0);

  useMotionValueEvent(smoothVelocity, "change", (latest) => {
    // Change base direction if scrolling fast enough
    if (latest < -20) {
      setScrollDir(-1);
    } else if (latest > 20) {
      setScrollDir(1);
    }
    // Amplify the speed during scroll
    setVelocityOffset(latest / 5);
  });

  return (
    <section id="skills" className="relative w-full bg-transparent text-white px-4 md:px-12 lg:px-24 py-16 md:py-32 border-t border-zinc-800/30 backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        <div className="flex flex-col items-center text-center gap-4">
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mb-6">
            Skills & <span className="text-neon">Tools</span>
          </h2>
          <div className="w-12 h-1 bg-neon" />
          <div className="mt-4">
            <DecryptedText 
              text="// THE TOOLS I USE TO BUILD THINGS"
              speed={50}
              className="text-zinc-400 font-mono text-sm tracking-widest uppercase"
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-6 md:gap-8 relative overflow-hidden -mx-4 px-4 md:-mx-12 md:px-12 lg:-mx-24 lg:px-24">
           {/* Fade Out Gradients for edges */}
           <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
           <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

           <LogoLoop 
             logos={logos1}
             speed={(50 * scrollDir) + (velocityOffset * 0.5)}
             direction="left"
             pauseOnHover={true}
             logoHeight={80}
             gap={32}
             className="py-2"
           />
           
           <LogoLoop 
             logos={logos2}
             speed={(40 * scrollDir) + (velocityOffset * 0.5)}
             direction="right"
             pauseOnHover={true}
             logoHeight={80}
             gap={32}
             className="py-2"
           />
        </div>

      </div>
    </section>
  );
}
