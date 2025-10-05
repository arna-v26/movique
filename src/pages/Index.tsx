import { HeroSection } from "@/components/HeroSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { StatisticsSection } from "@/components/StatisticsSection";
import { ShowcaseSection } from "@/components/ShowcaseSection";
import { CustomersSection } from "@/components/CustomersSection";
import { AccessibilityControls } from "@/components/AccessibilityControls";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <TestimonialsSection />
      <ShowcaseSection />
      <StatisticsSection />
      <CustomersSection />
      <AccessibilityControls />
    </div>
  );
};

export default Index;
