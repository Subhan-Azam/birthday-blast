import { useEffect, useRef } from "react";
import gsap from "gsap";

// Balloon colors using our design system colors
const BALLOON_COLORS = [
  "hsl(330 85% 60%)", // pink
  "hsl(45 100% 60%)", // gold
  "hsl(180 70% 50%)", // cyan
  "hsl(280 60% 50%)", // purple
  "hsl(25 100% 55%)", // orange
  "hsl(140 70% 50%)", // green
];

interface BalloonProps {
  color: string;
  size: number;
  left: string;
  delay: number;
}

const Balloon = ({ color, size, left, delay }: BalloonProps) => {
  const balloonRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!balloonRef.current) return;

    // Initial state - below viewport, scattered
    gsap.set(balloonRef.current, {
      y: window.innerHeight + gsap.utils.random(100, 500),
      opacity: 0,
      rotation: gsap.utils.random(-15, 15),
    });

    // Float completely up off the screen and repeat
    gsap.to(balloonRef.current, {
      y: -500, // Float completely off the top of the screen
      opacity: 1,
      duration: gsap.utils.random(12, 22), // Slower, more natural floating speed
      delay: delay,
      ease: "none",
      repeat: -1, // Keep floating up from the bottom forever
    });

    // Continuous floating horizontal wobble
    gsap.to(balloonRef.current, {
      x: gsap.utils.random(-40, 40),
      rotation: gsap.utils.random(-15, 15),
      duration: gsap.utils.random(3, 5),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: delay,
    });
  }, [delay]);

  return (
    <svg
      ref={balloonRef}
      className="absolute balloon"
      style={{ left, bottom: 0 }}
      width={size}
      height={size * 1.4}
      viewBox="0 0 100 140"
    >
      {/* Balloon body */}
      <ellipse cx="50" cy="45" rx="40" ry="45" fill={color} />
      {/* Balloon highlight */}
      <ellipse cx="35" cy="30" rx="12" ry="15" fill="white" opacity="0.3" />
      {/* Balloon knot */}
      <polygon points="45,88 55,88 50,95" fill={color} />
      {/* String */}
      <path
        d="M50 95 Q45 115, 50 135 Q55 120, 50 140"
        stroke={color}
        strokeWidth="2"
        fill="none"
        opacity="0.7"
      />
    </svg>
  );
};

const Balloons = () => {
  // Generate balloon data
  const balloons = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    color: BALLOON_COLORS[i % BALLOON_COLORS.length],
    size: gsap.utils.random(40, 80),
    left: `${gsap.utils.random(-5, 105)}%`,
    delay: 0, // No delay - start immediately
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-5 balloons-background">
      {balloons.map((balloon) => (
        <Balloon key={balloon.id} {...balloon} />
      ))}
    </div>
  );
};

export default Balloons;
