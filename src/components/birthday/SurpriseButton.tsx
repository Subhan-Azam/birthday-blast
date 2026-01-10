import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface SurpriseButtonProps {
  onSurprise: () => void;
}

const SurpriseButton = ({ onSurprise }: SurpriseButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (!buttonRef.current) return;

    // Entrance animation
    gsap.fromTo(
      buttonRef.current,
      {
        y: 50,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 2.5,
        ease: 'back.out(1.7)',
      }
    );

    // Attention-grabbing pulse
    gsap.to(buttonRef.current, {
      scale: 1.05,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 3.5,
    });
  }, []);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);

    // Stop the pulse animation
    gsap.killTweensOf(buttonRef.current);

    // Click animation
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        // Explode animation
        gsap.to(buttonRef.current, {
          scale: 1.2,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
        onSurprise();
      },
    });
  };

  if (clicked) {
    return null;
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className="btn-surprise px-8 py-4 md:px-12 md:py-5 rounded-full text-xl md:text-2xl font-fredoka font-bold text-secondary-foreground opacity-0 cursor-pointer border-none outline-none focus:ring-4 focus:ring-secondary/50"
    >
      Click for Surprise 🎁
    </button>
  );
};

export default SurpriseButton;
