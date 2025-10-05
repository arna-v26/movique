import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Play, Shield, Globe, Smartphone, Tv, Gamepad2, Users, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const features = [
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Stream content in 15+ languages with seamless switching",
    video: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop",
  },
  {
    icon: Shield,
    title: "Parental Controls",
    description: "Safe viewing experience with customizable content filters",
    video: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop",
  },
  {
    icon: Smartphone,
    title: "Multi-Device Streaming",
    description: "Watch on any device - phone, tablet, TV, or console",
    video: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop",
  },
  {
    icon: Users,
    title: "Profile Management",
    description: "Create up to 5 profiles with personalized recommendations",
    video: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
  },
  {
    icon: Sparkles,
    title: "AI Recommendations",
    description: "Smart suggestions based on your viewing habits",
    video: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
  },
  {
    icon: Play,
    title: "Offline Downloads",
    description: "Download and watch anywhere without internet",
    video: "https://images.unsplash.com/photo-1618192391394-a71213d4568f?w=400&h=300&fit=crop",
  },
];

const plans = [
  {
    name: "Basic",
    price: { USD: 9.99, EUR: 8.99, GBP: 7.99, INR: 799, JPY: 1099 },
    features: [
      "HD Streaming",
      "1 Device",
      "Limited Ads",
      "15+ Languages",
    ],
  },
  {
    name: "Standard",
    price: { USD: 14.99, EUR: 13.99, GBP: 11.99, INR: 1199, JPY: 1699 },
    features: [
      "Full HD Streaming",
      "2 Devices",
      "Ad-Free",
      "15+ Languages",
      "Offline Downloads",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: { USD: 19.99, EUR: 18.99, GBP: 15.99, INR: 1599, JPY: 2199 },
    features: [
      "4K Ultra HD",
      "4 Devices",
      "Ad-Free",
      "15+ Languages",
      "Offline Downloads",
      "Priority Support",
    ],
  },
];

const stats = [
  { value: "99.9%", label: "Uptime Guarantee" },
  { value: "4.8/5", label: "User Rating" },
  { value: "1200+", label: "Shows Available" },
  { value: "15+", label: "Languages" },
];

export const ServicesPage = () => {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState<"USD" | "EUR" | "GBP" | "INR" | "JPY">("USD");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
    JPY: "¥",
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <main ref={sectionRef} className="min-h-screen bg-background">
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

      {/* Hero Stats */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className={`mb-4 text-center font-heading text-5xl font-black md:text-7xl ${isVisible ? "animate-pop-in" : "opacity-0"}`}
            style={{
              background: "var(--gradient-accent)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Services & Features
          </h2>
          
          <p className={`mb-12 text-center text-xl text-muted-foreground max-w-3xl mx-auto ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            Experience entertainment like never before with cutting-edge features and seamless streaming
          </p>

          {/* Animated Stats */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.4s" }}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl"
                style={{
                  background: "var(--gradient-card)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div className="text-4xl md:text-5xl font-heading font-black text-primary mb-2 animate-pulse">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-7xl">
          <h3 className="mb-12 text-center font-heading text-4xl font-black">
            Platform Features
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105"
                style={{
                  background: "var(--gradient-card)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                {/* Background Video/Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={feature.video}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{ filter: "sepia(0.2) brightness(0.7)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <feature.icon className="mb-4 h-12 w-12 text-primary" />
                  <h4 className="mb-2 font-heading text-2xl font-bold">{feature.title}</h4>
                  <p className="text-muted-foreground">{feature.description}</p>
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

      {/* Platform Support */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h3 className="mb-12 text-center font-heading text-4xl font-black">
            Stream Anywhere
          </h3>

          <div className="flex flex-wrap justify-center gap-8">
            {[
              { icon: Smartphone, name: "Mobile" },
              { icon: Tv, name: "Smart TV" },
              { icon: Gamepad2, name: "Game Console" },
              { icon: Globe, name: "Web Browser" },
            ].map((platform, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 p-6 rounded-xl hover:scale-110 transition-transform"
                style={{ background: "var(--gradient-card)" }}
              >
                <platform.icon className="h-16 w-16 text-primary" />
                <span className="font-semibold">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-7xl">
          <h3 className="mb-4 text-center font-heading text-4xl font-black">
            Choose Your Plan
          </h3>

          <div className="mb-8 flex justify-center">
            <Select value={currency} onValueChange={(value: any) => setCurrency(value)}>
              <SelectTrigger className="w-48 bg-card border-primary/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">🇺🇸 USD ($)</SelectItem>
                <SelectItem value="EUR">🇪🇺 EUR (€)</SelectItem>
                <SelectItem value="GBP">🇬🇧 GBP (£)</SelectItem>
                <SelectItem value="INR">🇮🇳 INR (₹)</SelectItem>
                <SelectItem value="JPY">🇯🇵 JPY (¥)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                  plan.popular ? "ring-2 ring-primary" : ""
                }`}
                style={{
                  background: plan.popular ? "var(--gradient-accent)" : "var(--gradient-card)",
                  boxShadow: plan.popular ? "var(--shadow-glow)" : "var(--shadow-card)",
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}

                <h4 className="mb-2 font-heading text-3xl font-black">{plan.name}</h4>
                <div className="mb-6">
                  <span className="text-5xl font-heading font-black">
                    {currencySymbols[currency]}{plan.price[currency]}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>

                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-background text-foreground hover:bg-background/90"
                      : "bg-primary hover:bg-primary/90"
                  }`}
                  size="lg"
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
