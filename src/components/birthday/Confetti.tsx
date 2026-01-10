import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import gsap from 'gsap';

const CONFETTI_COLORS = [
  'hsl(330 85% 60%)',   // pink
  'hsl(45 100% 60%)',   // gold
  'hsl(180 70% 50%)',   // cyan
  'hsl(280 60% 50%)',   // purple
  'hsl(25 100% 55%)',   // orange
  'hsl(140 70% 50%)',   // green
  'hsl(0 0% 100%)',     // white
];

export interface ConfettiRef {
  burst: () => void;
}

const Confetti = forwardRef<ConfettiRef>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const confettiRefs = useRef<(HTMLDivElement | null)[]>([]);

  useImperativeHandle(ref, () => ({
    burst: () => {
      if (!containerRef.current) return;

      confettiRefs.current.forEach((confetti, index) => {
        if (!confetti) return;

        const isLeft = index % 2 === 0;
        const startX = window.innerWidth / 2;
        const startY = window.innerHeight / 2;

        // Reset position to center
        gsap.set(confetti, {
          x: startX,
          y: startY,
          opacity: 1,
          scale: 1,
          rotation: 0,
        });

        // Burst animation
        gsap.to(confetti, {
          x: startX + gsap.utils.random(isLeft ? -400 : 100, isLeft ? -100 : 400),
          y: startY + gsap.utils.random(-300, 300),
          rotation: gsap.utils.random(-720, 720),
          scale: gsap.utils.random(0.5, 1.5),
          duration: gsap.utils.random(0.8, 1.5),
          ease: 'power2.out',
        });

        // Fall and fade
        gsap.to(confetti, {
          y: window.innerHeight + 100,
          opacity: 0,
          duration: gsap.utils.random(2, 4),
          delay: gsap.utils.random(0.5, 1),
          ease: 'power1.in',
        });
      });
    },
  }));

  // Create confetti pieces
  const confettiPieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    size: gsap.utils.random(8, 16),
    shape: i % 3, // 0: square, 1: circle, 2: rectangle
  }));

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece, index) => (
        <div
          key={piece.id}
          ref={(el) => { confettiRefs.current[index] = el; }}
          className="absolute opacity-0"
          style={{
            width: piece.shape === 2 ? piece.size * 2 : piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: piece.shape === 1 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
});

Confetti.displayName = 'Confetti';

export default Confetti;
