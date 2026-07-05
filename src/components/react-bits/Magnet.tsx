import { useState, useEffect, useRef, type ReactNode } from 'react';
import { motion, useSpring } from 'motion/react';

interface MagnetProps {
    children: ReactNode;
    padding?: number;
    disabled?: boolean;
    magnetStrength?: number;
    className?: string;
}

export const Magnet = ({
    children,
    padding = 100,
    disabled = false,
    magnetStrength = 2,
    className = "",
}: MagnetProps) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const magnetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (disabled) {
            setPosition({ x: 0, y: 0 });
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (!magnetRef.current) return;
            const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
            
            const centerX = left + width / 2;
            const centerY = top + height / 2;
            
            const distX = e.clientX - centerX;
            const distY = e.clientY - centerY;
            
            const absoluteDistanceX = Math.abs(distX);
            const absoluteDistanceY = Math.abs(distY);

            // Trigger when cursor enters padding boundary
            if (absoluteDistanceX < (width / 2 + padding) && absoluteDistanceY < (height / 2 + padding)) {
                setPosition({
                    x: distX / magnetStrength,
                    y: distY / magnetStrength
                });
            } else {
                setPosition({ x: 0, y: 0 });
            }
        };

        const handleMouseLeave = () => {
            setPosition({ x: 0, y: 0 });
        };

        window.addEventListener("mousemove", handleMouseMove);
        // We also want to reset when window loses focus or mouse leaves window
        document.addEventListener("mouseleave", handleMouseLeave);
        
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [padding, disabled, magnetStrength]);

    // Use highly responsive springs for that authentic UI feel
    const springX = useSpring(position.x, { stiffness: 150, damping: 15, mass: 0.1 });
    const springY = useSpring(position.y, { stiffness: 150, damping: 15, mass: 0.1 });

    useEffect(() => {
        springX.set(position.x);
        springY.set(position.y);
    }, [position, springX, springY]);

    return (
        <motion.div
            ref={magnetRef}
            className={className}
            style={{ x: springX, y: springY }}
        >
            {children}
        </motion.div>
    );
};
