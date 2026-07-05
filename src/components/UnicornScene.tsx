import { useEffect, useRef, useState } from 'react';

// Declare UnicornStudio in the global window object to prevent TypeScript errors
declare global {
  interface Window {
    UnicornStudio: any;
  }
}

export function UnicornScene({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Handle scaling so the WebGL engine always thinks it's 1440x900 (prevents cropping/zooming)
  useEffect(() => {
    const updateScale = () => {
      if (wrapperRef.current) {
        setScale(wrapperRef.current.clientWidth / 1440);
      }
    };
    
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.getElementById('unicorn-studio-script');

    const initScene = () => {
      if (window.UnicornStudio && containerRef.current) {
        window.UnicornStudio.addScene({
          elementId: 'us-hero-embed',
          filePath: '/project_clean.json',
        });
      }
    };

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'unicorn-studio-script';
      script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.2.6/dist/unicornStudio.umd.js';
      script.async = true;
      script.onload = () => {
        initScene();
      };
      document.body.appendChild(script);
    } else {
      initScene();
    }

    return () => {};
  }, []);

  return (
    <div ref={wrapperRef} className={`pointer-events-auto relative overflow-hidden ${className}`}>
      <div 
        style={{ 
          width: '1440px', 
          height: '900px', 
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        <div 
          id="us-hero-embed" 
          ref={containerRef}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}
