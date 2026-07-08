import { useState } from 'react';
import { ArrowRight, EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { DecryptedText } from './react-bits/DecryptedText';

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "e15bce79-e210-4e06-9365-a06f7824a789");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus('idle'), 5000); // Reset status after 5s
      } else {
        console.error("Error submitting form", data);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };
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
                text="// TRANSMISSION INITIATED"
                speed={50}
                className="font-mono text-neon text-sm uppercase tracking-[0.3em]"
              />
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-12">
              Let's Build <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600">Together</span>
            </h2>
            
            <form className="w-full flex flex-col gap-6 text-left mt-4" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 flex flex-col gap-2">
                  <label htmlFor="name" className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-md px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-colors"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label htmlFor="email" className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    required
                    placeholder="youremail@gmail.com"
                    className="w-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-md px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-colors"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about your project idea..."
                  className="w-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-md px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-colors resize-none"
                />
              </div>

              <div className="mt-4 flex flex-col items-center w-full gap-4">
                {status === 'success' && <p className="text-neon text-sm font-mono uppercase tracking-widest">Message sent successfully!</p>}
                {status === 'error' && <p className="text-red-500 text-sm font-mono uppercase tracking-widest">Failed to send. Please try again.</p>}
                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="group w-full md:w-auto relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-black/50 backdrop-blur-md border-2 border-neon text-neon font-bold uppercase tracking-widest overflow-hidden transition-all hover:bg-neon hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {status === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
                    {status !== 'submitting' && <ArrowRight weight="bold" className="group-hover:translate-x-2 transition-transform" />}
                  </span>
                </button>
              </div>
            </form>
          </div>
          
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-zinc-800 pt-8">
          <div className="flex items-center gap-6">
            <a href="https://github.com/dzakyy04" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-neon transition-colors">
              <GithubLogo size={24} />
            </a>
            <a href="https://www.linkedin.com/in/dewa-sheva-dzaky/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-neon transition-colors">
              <LinkedinLogo size={24} />
            </a>
            <a href="mailto:dewashevadzaky04@gmail.com" className="text-zinc-500 hover:text-neon transition-colors">
              <EnvelopeSimple size={24} />
            </a>
          </div>
          
          <div className="font-mono text-xs text-zinc-600 uppercase tracking-widest text-center md:text-left">
            &copy; {new Date().getFullYear()} Dewa Sheva Dzaky. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
