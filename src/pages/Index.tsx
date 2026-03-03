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
  Countdown,
} from "@/components/birthday";
import type { ConfettiRef } from "@/components/birthday";

const BIRTHDAY_CONFIG = {
  name: "Fatii jan",
  message:
    "Wishing you a day filled with love, laughter, and all your favorite things! May this year bring you endless joy, exciting adventures, and dreams come true. You deserve all the happiness in the world! 🌟",
};

const TARGET_DATE = new Date("2026-03-05T00:00:00");

const Index = () => {
  const confettiRef = useRef<ConfettiRef>(null);
  const [showSurprise, setShowSurprise] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  // Check if target date is already passed
  const [isTimeUp, setIsTimeUp] = useState(() => new Date() >= TARGET_DATE);

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

  // Main content entrance animation after countdown completes
  useEffect(() => {
    if (isTimeUp && mainRef.current) {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power3.out" },
      );
    }
  }, [isTimeUp]);

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
      {isTimeUp && <Balloons />}
      <Confetti ref={confettiRef} />

      {/* Birthday Girl Picture */}
      {isTimeUp && (
        <div
          className="relative z-30 mb-8 sm:mb-12 mt-4 animate-fade-in"
          style={{ animationDuration: "1.5s" }}
        >
          <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full shadow-[0_0_40px_rgba(236,72,153,0.6)] border-4 border-pink-300/80 overflow-hidden relative group transform hover:scale-105 hover:shadow-[0_0_60px_rgba(236,72,153,0.8)] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
            <img
              src="/images/fatima.jpg"
              alt="Fatima"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          </div>
        </div>
      )}

      {!isTimeUp ? (
        <Countdown
          targetDate={TARGET_DATE}
          onComplete={() => setIsTimeUp(true)}
        />
      ) : (
        <main
          ref={mainRef}
          className="relative z-20 flex flex-col items-center gap-8 md:gap-12 opacity-0"
        >
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
      )}

      {/* Footer credit */}
      <footer
        className="absolute bottom-4 text-center text-muted-foreground text-sm font-poppins z-30"
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
