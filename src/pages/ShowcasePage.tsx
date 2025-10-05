import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const showcaseItems = [
  {
    title: "The Cosmic Journey",
    genre: "Sci-Fi Adventure",
    year: 2024,
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=450&fit=crop",
  },
  {
    title: "Midnight Chronicles",
    genre: "Mystery Thriller",
    year: 2024,
    rating: "4.6",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=450&fit=crop",
  },
  {
    title: "Hearts Collide",
    genre: "Romantic Drama",
    year: 2023,
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=800&h=450&fit=crop",
  },
  {
    title: "Shadow Realm",
    genre: "Dark Fantasy",
    year: 2024,
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=450&fit=crop",
  },
  {
    title: "Velocity",
    genre: "Action Thriller",
    year: 2023,
    rating: "4.5",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=450&fit=crop",
  },
  {
    title: "The Last Laugh",
    genre: "Comedy",
    year: 2024,
    rating: "4.4",
    image: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=800&h=450&fit=crop",
  },
];

export const ShowcasePage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          
          <h1 className="font-heading text-2xl font-black"
            style={{
              background: "var(--gradient-accent)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            MOVIEQUE
          </h1>
        </div>
      </header>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="mb-4 text-center font-heading text-5xl font-black md:text-7xl animate-pop-in"
            style={{
              background: "var(--gradient-accent)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Complete Showcase
          </h2>
          
          <p className="mb-12 text-center text-xl text-muted-foreground animate-fade-in-up">
            Browse our entire collection of premium content
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {showcaseItems.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 animate-fade-in-up"
                style={{
                  background: "var(--gradient-card)",
                  boxShadow: "var(--shadow-card)",
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{ filter: "sepia(0.2) brightness(0.7)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold">
                    ⭐ {item.rating}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="mb-2 font-heading text-2xl font-bold">{item.title}</h3>
                  <p className="text-primary mb-1">{item.genre}</p>
                  <p className="text-sm text-muted-foreground">{item.year}</p>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at center, hsl(199 89% 48% / 0.2), transparent 70%)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ShowcasePage;
