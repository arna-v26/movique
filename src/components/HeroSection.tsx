import { useEffect, useState } from "react";
import heroBackground from "@/assets/hero-background.jpg";

export const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroBackground})`,
          transform: `translateY(${scrollY * 0.5}px)`,
          willChange: "transform",
        }}
      >
        <div className="absolute inset-0" style={{ background: "var(--gradient-overlay)" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1
          className="mb-6 text-7xl font-black tracking-tight md:text-9xl animate-fade-in-up"
          style={{
            background: "var(--gradient-accent)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        >
          STREAMFLIX
        </h1>
        
        <p
          className="text-xl font-light tracking-wide text-foreground/90 md:text-3xl animate-fade-in-up"
          style={{
            animationDelay: "0.2s",
            opacity: 0,
            animation: "fade-in-up 0.6s ease-out 0.2s forwards",
            transform: `translateY(${scrollY * 0.15}px)`,
          }}
        >
          Where Stories Come Alive
        </p>

        <div
          className="mt-12 h-1 w-32 rounded-full animate-pulse-glow"
          style={{ background: "var(--gradient-accent)" }}
        />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="flex flex-col items-center gap-2 text-foreground/60">
          <span className="text-sm tracking-wider">SCROLL</span>
          <div className="h-8 w-[2px] bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>
    </section>
  );
};
