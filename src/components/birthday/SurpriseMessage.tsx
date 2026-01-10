import { useEffect, useRef } from "react";
import gsap from "gsap";

interface SurpriseMessageProps {
  message: string;
  show: boolean;
}

const SurpriseMessage = ({ message, show }: SurpriseMessageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const heartsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!show || !containerRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "back.out(1.7)" } });

    // Set initial states
    gsap.set(containerRef.current, { opacity: 0, y: 50 });
    gsap.set(messageRef.current, { opacity: 0, scale: 0.8 });
    gsap.set(heartsRef.current, { opacity: 0, scale: 0, y: 20 });

    // Animate in
    tl.to(containerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
    })
      .to(
        messageRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.3"
      )
      .to(
        heartsRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.5"
      );

    // Floating hearts animation
    heartsRef.current.forEach((heart, index) => {
      if (!heart) return;
      gsap.to(heart, {
        y: gsap.utils.random(-10, -20),
        rotation: gsap.utils.random(-15, 15),
        duration: gsap.utils.random(1.5, 2.5),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2,
      });
    });
  }, [show]);

  if (!show) return null;

  const emojis = ["🎉", "🎊", "🥳", "💖", "✨"];

  return (
    <div ref={containerRef} className="text-center space-y-6 opacity-0">
      <div className="flex justify-center gap-4">
        {emojis.map((emoji, index) => (
          <span
            key={index}
            ref={(el) => {
              heartsRef.current[index] = el;
            }}
            className="text-3xl md:text-5xl opacity-0"
            role="img"
          >
            {emoji}
          </span>
        ))}
      </div>
      <div className="bg-white/5 bg-gradient-to-br from-hsl(280_60%_20%_/_0.8) to-hsl(320_50%_25%_/_0.9) backdrop-blur-md rounded-3xl p-6 md:p-8 border border-hsl(330_85%_60%_/_0.3) shadow-2xl">
        <p
          ref={messageRef}
          className="text-lg md:text-2xl lg:text-3xl font-poppins text-foreground leading-relaxed max-w-3xl mx-auto opacity-0"
          style={{
            textShadow:
              "0 2px 4px hsl(0 0% 0% / 0.8), 0 0 20px hsl(330 85% 60% / 0.4)",
            lineHeight: "1.6",
          }}
        >
          {message}
        </p>
      </div>
      <div className="flex justify-center gap-4">
        {["🎈", "🎁", "🎂", "🍰", "🎀"].map((emoji, index) => (
          <span
            key={index}
            ref={(el) => {
              heartsRef.current[emojis.length + index] = el;
            }}
            className="text-3xl md:text-5xl opacity-0"
            role="img"
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SurpriseMessage;
