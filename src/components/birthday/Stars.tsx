import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Stars = () => {
  const starsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    starsRef.current.forEach((star, index) => {
      if (!star) return;

      // Twinkling animation
      gsap.to(star, {
        opacity: gsap.utils.random(0.3, 1),
        scale: gsap.utils.random(0.8, 1.2),
        duration: gsap.utils.random(1, 3),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.1,
      });
    });
  }, []);

  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${gsap.utils.random(0, 100)}%`,
    top: `${gsap.utils.random(0, 100)}%`,
    size: gsap.utils.random(2, 6),
    color: i % 3 === 0 ? 'hsl(45 100% 80%)' : 'hsl(0 0% 100%)',
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map((star, index) => (
        <div
          key={star.id}
          ref={(el) => { starsRef.current[index] = el; }}
          className="absolute rounded-full"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            backgroundColor: star.color,
            boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
          }}
        />
      ))}
    </div>
  );
};

export default Stars;
