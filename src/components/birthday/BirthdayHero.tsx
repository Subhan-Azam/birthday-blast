import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface BirthdayHeroProps {
  name: string;
}

const BirthdayHero = ({ name }: BirthdayHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const happyRef = useRef<HTMLSpanElement>(null);
  const birthdayRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const emojiRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'back.out(1.7)' } });

    // Initial states
    gsap.set([happyRef.current, birthdayRef.current, nameRef.current, emojiRef.current], {
      opacity: 0,
      y: 50,
      scale: 0.5,
    });

    // Animated entrance sequence
    tl.to(happyRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      delay: 0.3,
    })
      .to(
        birthdayRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
        },
        '-=0.4'
      )
      .to(
        emojiRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
        },
        '-=0.3'
      )
      .to(
        nameRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'elastic.out(1, 0.3)',
        },
        '-=0.2'
      );

    // Continuous floating animation for emoji
    gsap.to(emojiRef.current, {
      y: -10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 2,
    });

    // Subtle glow pulse on name
    gsap.to(nameRef.current, {
      textShadow: '0 0 40px hsl(45 100% 60% / 0.8), 0 0 80px hsl(45 100% 60% / 0.4)',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 2,
    });
  }, []);

  return (
    <div ref={containerRef} className="text-center space-y-2">
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
        <span
          ref={happyRef}
          className="text-4xl md:text-6xl lg:text-7xl font-fredoka font-bold text-gradient-hero glow-text opacity-0"
        >
          Happy
        </span>
        <span
          ref={birthdayRef}
          className="text-4xl md:text-6xl lg:text-7xl font-fredoka font-bold text-gradient-hero glow-text opacity-0"
        >
          Birthday
        </span>
        <span
          ref={emojiRef}
          className="text-4xl md:text-6xl lg:text-7xl opacity-0"
          role="img"
          aria-label="cake"
        >
          🎂
        </span>
      </div>
      <h2
        ref={nameRef}
        className="text-5xl md:text-7xl lg:text-8xl font-fredoka font-bold text-secondary opacity-0"
        style={{
          textShadow: '0 0 20px hsl(45 100% 60% / 0.6)',
        }}
      >
        {name}!
      </h2>
    </div>
  );
};

export default BirthdayHero;
