interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export default function ShinyText({ 
  text, 
  disabled = false, 
  speed = 3, 
  className = '' 
}: ShinyTextProps) {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`inline-block text-transparent bg-clip-text ${
        disabled ? '' : 'animate-shine'
      } ${className}`}
      style={{
        backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 1) 40%, #00ff41 50%, rgba(255, 255, 255, 1) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animationDuration: animationDuration,
      }}
    >
      {text}
    </div>
  );
}
