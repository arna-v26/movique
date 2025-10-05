import { useEffect, useRef, useState } from "react";

const customers = [
  { name: "Paramount", logo: "P" },
  { name: "Warner Bros", logo: "WB" },
  { name: "Universal", logo: "U" },
  { name: "Sony Pictures", logo: "SP" },
  { name: "20th Century", logo: "20C" },
  { name: "Lionsgate", logo: "LG" },
  { name: "MGM", logo: "MGM" },
  { name: "A24", logo: "A24" },
  { name: "Netflix", logo: "N" },
  { name: "HBO Max", logo: "HBO" },
  { name: "Disney+", logo: "D+" },
  { name: "Hulu", logo: "H" },
];

export const CustomersSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-card/30">
      <div className="container mx-auto max-w-7xl">
        <h2
          className={`mb-4 text-center font-heading text-4xl font-black md:text-5xl ${
            isVisible ? "animate-pop-in" : "opacity-0"
          }`}
          style={{
            background: "var(--gradient-accent)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Trusted Content Partners
        </h2>
        
        <p className={`mb-12 text-center text-muted-foreground ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
          Streaming premium content from the world's leading studios and networks
        </p>

        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.4s" }}
        >
          {customers.map((customer, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center justify-center p-8 rounded-xl bg-background/50 border border-border/50 transition-all duration-300 hover:border-primary/50 hover:bg-card/50"
              style={{
                animationDelay: `${0.4 + index * 0.1}s`,
              }}
            >
              {/* Logo */}
              <div className="mb-3 text-5xl font-heading font-black text-foreground/80 group-hover:text-primary transition-colors filter grayscale group-hover:grayscale-0">
                {customer.logo}
              </div>
              
              {/* Name */}
              <div className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">
                {customer.name}
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background: "radial-gradient(circle at center, hsl(199 89% 48% / 0.1), transparent 70%)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
