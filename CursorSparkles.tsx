import React, { useEffect, useRef } from 'react';

const CursorSparkles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Theme colors: Teal, Indigo, Amber, White
    const colors = ['#14b8a6', '#6366f1', '#f59e0b', '#ffffff', '#2dd4bf'];

    const createStar = (x: number, y: number) => {
      const star = document.createElement('div');
      
      // Randomize size between 8px and 20px
      const size = Math.random() * 12 + 8;
      
      // Random color
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.position = 'absolute';
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      star.style.backgroundColor = color;
      star.style.borderRadius = '50%'; // Fallback
      
      // 4-point star "glitter" shape
      star.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
      
      star.style.pointerEvents = 'none';
      
      // Random rotation start
      const startRotation = Math.random() * 360;
      star.style.transform = `translate(-50%, -50%) rotate(${startRotation}deg)`;

      container.appendChild(star);

      // Animate using Web Animations API
      const animation = star.animate([
        { 
          transform: `translate(-50%, -50%) rotate(${startRotation}deg) scale(0.5)`, 
          opacity: 1 
        },
        { 
          transform: `translate(-50%, ${100 + Math.random() * 50}px) rotate(${startRotation + 180}deg) scale(0)`, 
          opacity: 0 
        }
      ], {
        duration: 800 + Math.random() * 400, // 800ms - 1200ms
        easing: 'cubic-bezier(0, .9, .57, 1)',
      });

      animation.onfinish = () => {
        if (container.contains(star)) {
            container.removeChild(star);
        }
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      // Throttle: Max 1 star every 30ms to keep performance high
      if (now - lastTimeRef.current > 30) {
        createStar(e.clientX, e.clientY);
        lastTimeRef.current = now;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-[100] overflow-hidden" 
      aria-hidden="true"
    />
  );
};

export default CursorSparkles;