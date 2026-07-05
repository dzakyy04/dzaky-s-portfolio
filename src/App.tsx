import { Hero } from './components/Hero'
import { ScrollNarrative } from './components/ScrollNarrative'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Education } from './components/Education'
import { Contact } from './components/Contact'
import { FuzzyOverlay } from './components/react-bits/FuzzyOverlay'
import Aurora from './components/react-bits/Aurora'
import { ClickSpark } from './components/react-bits/ClickSpark'
import { FloatingNav } from './components/FloatingNav'

function App() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-neon selection:text-black relative">
      <FloatingNav />
      <ClickSpark />
      {/* Aurora Background - Fixed behind everything, made extremely subtle */}
      <div className="fixed inset-0 z-0 opacity-30">
        <Aurora 
          colorStops={['#000000', '#002208', '#000000']} 
          blend={0.8} 
          amplitude={0.3} 
          speed={0.1} 
        />
      </div>

      {/* Persistent Film Grain across the entire site */}
      <div className="fixed inset-0 z-10 pointer-events-none opacity-50">
        <FuzzyOverlay />
      </div>
      
      {/* Content wrapper with relative z-index so it sits above backgrounds */}
      <div className="relative z-20">
        <Hero />
        <ScrollNarrative />
        <Education />
        <Skills />
        <Projects />

        <Contact />
      </div>
    </main>
  )
}

export default App
