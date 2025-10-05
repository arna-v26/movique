import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const criticsReviews = [
  {
    quote: "A revolutionary platform that redefines streaming entertainment.",
    author: "The Hollywood Reporter",
    rating: "★★★★★",
  },
  {
    quote: "Exceptional content curation with unparalleled streaming quality.",
    author: "Variety Magazine",
    rating: "★★★★★",
  },
  {
    quote: "The future of entertainment is here, and it's spectacular.",
    author: "Entertainment Weekly",
    rating: "★★★★★",
  },
];

const celebrityReviews = [
  {
    quote: "This is how I watch everything now. Absolutely game-changing!",
    author: "Emma Stone",
    rating: "★★★★★",
  },
  {
    quote: "The best streaming experience I've ever had. Highly recommend!",
    author: "Ryan Reynolds",
    rating: "★★★★★",
  },
  {
    quote: "Amazing selection and incredible quality. My go-to platform.",
    author: "Zendaya",
    rating: "★★★★★",
  },
];

export const TestimonialsSection = () => {
  const [activeTab, setActiveTab] = useState<"critics" | "celebrities">("critics");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const reviews = activeTab === "critics" ? criticsReviews : celebrityReviews;

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
    setCurrentIndex(0);
  }, [activeTab]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <h2
          className={`mb-12 text-center text-5xl font-black tracking-tight md:text-6xl ${
            isVisible ? "animate-pop-in" : "opacity-0"
          }`}
          style={{
            background: "var(--gradient-accent)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          What They're Saying
        </h2>

        {/* Tab Switcher */}
        <div className="mb-12 flex justify-center gap-4">
          <Button
            onClick={() => setActiveTab("critics")}
            className={`px-8 py-6 text-lg font-semibold transition-all ${
              activeTab === "critics"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
            style={{
              boxShadow: activeTab === "critics" ? "var(--shadow-glow)" : "none",
            }}
          >
            Critics
          </Button>
          <Button
            onClick={() => setActiveTab("celebrities")}
            className={`px-8 py-6 text-lg font-semibold transition-all ${
              activeTab === "celebrities"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
            style={{
              boxShadow: activeTab === "celebrities" ? "var(--shadow-glow)" : "none",
            }}
          >
            Celebrities
          </Button>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            className="overflow-hidden rounded-2xl p-12 text-center"
            style={{
              background: "var(--gradient-card)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="animate-fade-in-up" key={`${activeTab}-${currentIndex}`}>
              <div className="mb-4 text-4xl">{reviews[currentIndex].rating}</div>
              <blockquote className="mb-6 text-2xl font-light italic leading-relaxed text-foreground/90 md:text-3xl">
                "{reviews[currentIndex].quote}"
              </blockquote>
              <cite className="text-xl font-semibold not-italic text-primary">
                — {reviews[currentIndex].author}
              </cite>
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            onClick={handlePrevious}
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full border-primary/50 bg-background/20 backdrop-blur-sm hover:bg-primary/20"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            onClick={handleNext}
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full border-primary/50 bg-background/20 backdrop-blur-sm hover:bg-primary/20"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Indicators */}
          <div className="mt-8 flex justify-center gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
