import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Film } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TriangleLoader } from "./TriangleLoader";

const showcaseItems = [
  {
    title: "The Cosmic Journey",
    genre: "Sci-Fi Adventure",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=450&fit=crop",
  },
  {
    title: "Midnight Chronicles",
    genre: "Mystery Thriller",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=450&fit=crop",
  },
  {
    title: "Hearts Collide",
    genre: "Romantic Drama",
    image: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=800&h=450&fit=crop",
  },
];

export const ShowcaseSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleViewAll = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/showcase");
      setIsLoading(false);
    }, 3500);
  };

  if (isLoading) {
    return <TriangleLoader />;
  }

  const currentItem = showcaseItems[currentIndex];

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <h2
          className={`mb-4 text-center font-heading text-5xl font-black md:text-6xl ${
            isVisible ? "animate-pop-in" : "opacity-0"
          }`}
          style={{
            background: "var(--gradient-accent)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Featured Showcase
        </h2>

        <p className={`mb-12 text-center text-muted-foreground text-lg ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
          Discover our handpicked collection of cinematic masterpieces
        </p>

        <div
          className={`relative overflow-hidden rounded-2xl ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{
            background: "var(--gradient-card)",
            boxShadow: "var(--shadow-card)",
            animationDelay: "0.4s",
          }}
        >
          {/* Slideshow */}
          <div className="relative h-[500px] overflow-hidden">
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
              style={{ filter: "sepia(0.3) brightness(0.7)" }}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0" style={{ background: "var(--gradient-overlay)" }} />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <Film className="mb-4 h-16 w-16 text-primary animate-pulse" />
              <h3 className="mb-2 font-heading text-4xl font-black md:text-5xl text-foreground">
                {currentItem.title}
              </h3>
              <p className="mb-8 text-xl text-primary/90">{currentItem.genre}</p>
              
              <Button
                onClick={handleViewAll}
                size="lg"
                className="bg-primary hover:bg-primary/90"
                style={{ boxShadow: "var(--shadow-glow)" }}
              >
                View All Titles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {showcaseItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-primary" : "w-2 bg-primary/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
