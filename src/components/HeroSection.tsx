import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/movieque-hero.jpg";
import { TriangleLoader } from "./TriangleLoader";

export const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleServicesClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/services");
      setIsLoading(false);
    }, 3500);
  };

  if (isLoading) {
    return <TriangleLoader />;
  }

  return (
    <section className="relative h-screen overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${scrollY * 0.5}px)`,
          filter: "sepia(0.2) brightness(0.7)",
        }}
      />
      
      <div className="absolute inset-0 z-10" style={{ background: "var(--gradient-overlay)" }} />
      <div className="absolute inset-0 z-10 bg-sepia-overlay mix-blend-multiply" />

      <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="animate-pop-in">
          <h1 className="mb-6 font-heading text-7xl font-black tracking-tight md:text-9xl"
            style={{
              background: "var(--gradient-accent)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 80px hsl(199 89% 48% / 0.5)",
            }}
          >
            MOVIEQUE
          </h1>
          
          <p className="mb-8 text-2xl font-light tracking-[0.2em] text-foreground/90 md:text-3xl">
            Stream. Binge. Repeat.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={handleServicesClick}
              size="lg"
              className="group relative overflow-hidden bg-primary text-lg font-semibold hover:bg-primary/90"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              <Sparkles className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
              Explore Features
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 text-lg font-semibold hover:bg-primary/10"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Trailer
            </Button>
          </div>
        </div>

        <div className="absolute bottom-10 animate-bounce">
          <div className="h-12 w-6 rounded-full border-2 border-primary/50 p-2">
            <div className="h-2 w-2 rounded-full bg-primary mx-auto animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};
