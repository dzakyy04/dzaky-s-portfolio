import { ArrowRight, EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { DecryptedText } from './react-bits/DecryptedText';

export function Contact() {
  return (
    <footer id="contact" className="relative bg-transparent text-white overflow-hidden border-t border-zinc-800/30 pt-32 pb-16 px-6 md:px-12 lg:px-24">
      
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neon/10 via-transparent to-transparent opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col items-center justify-center mb-24">
          
          {/* Contact Text */}
          <div className="w-full max-w-3xl flex flex-col items-center text-center">
            <div className="mb-6">
              <DecryptedText 
                text="// TRANSMISI"
                speed={50}
                className="font-mono text-neon text-sm uppercase tracking-[0.3em]"
              />
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-12">
              Mulai <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600">Kolaborasi</span>
            </h2>
            
            <form className="w-full flex flex-col gap-6 text-left mt-4" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 flex flex-col gap-2">
                  <label htmlFor="name" className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Nama</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="Dewa Sheva"
                    className="w-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-md px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-colors"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label htmlFor="email" className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="hello@example.com"
                    className="w-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-md px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-colors"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Pesan</label>
                <textarea 
                  id="message" 
                  rows={4}
                  placeholder="Ceritakan tentang ide proyek Anda..."
                  className="w-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-md px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-colors resize-none"
                />
              </div>

              <div className="mt-4 flex justify-center w-full">
                <button type="submit" className="group w-full md:w-auto relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-black/50 backdrop-blur-md border-2 border-neon text-neon font-bold uppercase tracking-widest overflow-hidden transition-all hover:bg-neon hover:text-black">
                  <span className="relative z-10 flex items-center gap-3">
                    Kirim Pesan
                    <ArrowRight weight="bold" className="group-hover:translate-x-2 transition-transform" />
                  </span>
                </button>
              </div>
            </form>
          </div>
          
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-zinc-800 pt-8">
          <div className="flex items-center gap-6">
            <a href="#" className="text-zinc-500 hover:text-neon transition-colors">
              <GithubLogo size={24} />
            </a>
            <a href="#" className="text-zinc-500 hover:text-neon transition-colors">
              <LinkedinLogo size={24} />
            </a>
            <a href="#" className="text-zinc-500 hover:text-neon transition-colors">
              <EnvelopeSimple size={24} />
            </a>
          </div>
          
          <div className="font-mono text-xs text-zinc-600 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Dewa Sheva Dzaky. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
