import { useState, useEffect } from "react";
import gsap from "gsap";

interface CountdownProps {
  targetDate: Date;
  onComplete: () => void;
}

const Countdown = ({ targetDate, onComplete }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +targetDate - +new Date();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    // Animate entrance
    gsap.fromTo(
      ".countdown-container",
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.7)" }
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      // Simple pop animation on seconds
      gsap.fromTo(
        ".sec-number",
        { title: "popping", scale: 1.2, color: "hsl(330, 80%, 70%)" },
        { scale: 1, color: "white", duration: 0.5, clearProps: "all" }
      );

      if (
        remaining.days === 0 &&
        remaining.hours === 0 &&
        remaining.minutes === 0 &&
        remaining.seconds === 0
      ) {
        clearInterval(timer);
        
        // Final transition out animation before calling onComplete
        gsap.to(".countdown-container", {
          opacity: 0,
          scale: 1.1,
          duration: 1,
          ease: "power2.inOut",
          onComplete: onComplete,
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  return (
    <div className="countdown-container relative z-30 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="glass-panel p-8 md:p-12 rounded-3xl max-w-2xl w-full text-center border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] bg-white/10 backdrop-blur-md">
        <h1 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-2 drop-shadow-md">
          Almost Time...
        </h1>
        <p className="text-white/80 text-lg md:text-xl mb-10 font-medium">
          Something special is waiting for you!
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds, isSec: true },
          ].map((item, index) => (
            <div key={item.label} className="flex flex-col items-center mt-2">
              <div 
                className={`w-20 h-24 md:w-24 md:h-28 rounded-2xl flex items-center justify-center bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg mb-3 ${item.isSec ? 'sec-number' : ''}`}
              >
                <span className="text-4xl md:text-5xl font-bold text-white tracking-wider">
                  {item.value.toString().padStart(2, "0")}
                </span>
              </div>
              <span className="text-sm md:text-base text-white/90 font-semibold tracking-widest uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Countdown;
