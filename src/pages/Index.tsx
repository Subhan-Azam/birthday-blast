import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import {
  Balloons,
  Cake,
  Confetti,
  Stars,
  BirthdayHero,
  SurpriseButton,
  SurpriseMessage,
} from "@/components/birthday";
import type { ConfettiRef } from "@/components/birthday";

const BIRTHDAY_CONFIG = {
  name: "Subhan",
  message:
    "Wishing you a day filled with love, laughter, and all your favorite things! May this year bring you endless joy, exciting adventures, and dreams come true. You deserve all the happiness in the world! 🌟",
};

const Index = () => {
  const confettiRef = useRef<ConfettiRef>(null);
  const [showSurprise, setShowSurprise] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);

  // Background gradient animation
  useEffect(() => {
    if (!bgRef.current) return;

    gsap.to(bgRef.current, {
      backgroundPosition: "100% 100%",
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  const handleSurprise = () => {
    // Trigger confetti burst
    confettiRef.current?.burst();

    // Show surprise message after a short delay
    setTimeout(() => {
      setShowSurprise(true);
    }, 500);
  };

  return (
    <div
      ref={bgRef}
      className="birthday-bg min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden"
      style={{
        backgroundSize: "200% 200%",
        backgroundPosition: "0% 0%",
      }}
    >
      {/* Background elements */}
      <Stars />
      <Balloons />
      <Confetti ref={confettiRef} />

      {/* Main content */}
      <main className="relative z-20 flex flex-col items-center gap-8 md:gap-12">
        {/* Hero text */}
        <BirthdayHero name={BIRTHDAY_CONFIG.name} />

        {/* Cake */}
        <Cake />

        {/* Surprise button or message */}
        <div className="min-h-[200px] flex items-center justify-center">
          {!showSurprise ? (
            <SurpriseButton onSurprise={handleSurprise} />
          ) : (
            <SurpriseMessage
              message={BIRTHDAY_CONFIG.message}
              show={showSurprise}
            />
          )}
        </div>
      </main>

      {/* Footer credit */}
      <footer
        className="absolute bottom-4 text-center text-muted-foreground text-sm font-poppins"
        style={{
          textShadow:
            "0 1px 3px hsl(0 0% 0% / 0.8), 0 0 10px hsl(330 85% 60% / 0.3)",
          color: "hsl(0 0% 85%)",
        }}
      >
        Made with 💖 for {BIRTHDAY_CONFIG.name}
      </footer>
    </div>
  );
};

export default Index;
