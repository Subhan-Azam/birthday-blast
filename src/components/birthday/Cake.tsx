import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Cake = () => {
  const cakeRef = useRef<HTMLDivElement>(null);
  const flamesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!cakeRef.current) return;

    // Entrance animation
    gsap.fromTo(
      cakeRef.current,
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 1.5,
        ease: 'back.out(1.7)',
      }
    );

    // Candle flame flicker animation
    flamesRef.current.forEach((flame, index) => {
      if (!flame) return;
      
      gsap.to(flame, {
        scaleY: gsap.utils.random(0.8, 1.2),
        scaleX: gsap.utils.random(0.9, 1.1),
        opacity: gsap.utils.random(0.7, 1),
        duration: gsap.utils.random(0.1, 0.3),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.05,
      });
    });
  }, []);

  return (
    <div ref={cakeRef} className="relative opacity-0">
      <svg
        width="200"
        height="220"
        viewBox="0 0 200 220"
        className="drop-shadow-2xl"
      >
        {/* Candles */}
        {[50, 100, 150].map((x, i) => (
          <g key={i}>
            {/* Candle body */}
            <rect
              x={x - 6}
              y={50}
              width={12}
              height={40}
              rx="2"
              fill="hsl(45 100% 60%)"
            />
            {/* Candle stripes */}
            <rect
              x={x - 6}
              y={55}
              width={12}
              height={4}
              fill="hsl(330 85% 60%)"
            />
            <rect
              x={x - 6}
              y={65}
              width={12}
              height={4}
              fill="hsl(330 85% 60%)"
            />
            <rect
              x={x - 6}
              y={75}
              width={12}
              height={4}
              fill="hsl(330 85% 60%)"
            />
          </g>
        ))}

        {/* Cake top layer - frosting */}
        <ellipse cx="100" cy="95" rx="85" ry="15" fill="hsl(330 85% 70%)" />
        
        {/* Cake top layer - body */}
        <rect x="15" y="95" width="170" height="35" fill="hsl(25 60% 55%)" />
        <ellipse cx="100" cy="130" rx="85" ry="12" fill="hsl(25 60% 50%)" />
        
        {/* Frosting drips */}
        {[30, 60, 90, 120, 150, 170].map((x, i) => (
          <ellipse
            key={i}
            cx={x}
            cy={95 + (i % 2 === 0 ? 15 : 20)}
            rx="8"
            ry={i % 2 === 0 ? 12 : 18}
            fill="hsl(330 85% 75%)"
          />
        ))}

        {/* Middle layer frosting */}
        <ellipse cx="100" cy="135" rx="90" ry="12" fill="hsl(180 70% 60%)" />
        
        {/* Middle layer body */}
        <rect x="10" y="135" width="180" height="35" fill="hsl(25 55% 50%)" />
        <ellipse cx="100" cy="170" rx="90" ry="12" fill="hsl(25 55% 45%)" />

        {/* Bottom layer frosting */}
        <ellipse cx="100" cy="175" rx="95" ry="12" fill="hsl(45 100% 70%)" />
        
        {/* Bottom layer body */}
        <rect x="5" y="175" width="190" height="35" fill="hsl(25 50% 45%)" />
        <ellipse cx="100" cy="210" rx="95" ry="10" fill="hsl(25 50% 40%)" />

        {/* Decorations on bottom layer */}
        {[25, 55, 85, 115, 145, 175].map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy={195}
            r="5"
            fill={i % 2 === 0 ? 'hsl(330 85% 60%)' : 'hsl(180 70% 50%)'}
          />
        ))}
      </svg>

      {/* Flames (separate divs for better animation control) */}
      <div className="absolute top-0 left-0 w-full">
        {[50, 100, 150].map((x, i) => (
          <div
            key={i}
            ref={(el) => { flamesRef.current[i] = el; }}
            className="absolute candle-flame"
            style={{
              left: `calc(${(x / 200) * 100}% - 8px)`,
              top: '25px',
            }}
          >
            {/* Outer flame */}
            <div
              className="w-4 h-6 rounded-full"
              style={{
                background: 'radial-gradient(ellipse at bottom, hsl(45 100% 60%) 0%, hsl(25 100% 55%) 40%, transparent 70%)',
              }}
            />
            {/* Inner flame */}
            <div
              className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-3 rounded-full"
              style={{
                background: 'radial-gradient(ellipse at bottom, hsl(45 100% 90%) 0%, hsl(45 100% 70%) 60%, transparent 100%)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cake;
