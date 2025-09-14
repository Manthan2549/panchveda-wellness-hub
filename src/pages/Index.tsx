import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturesGrid from "@/components/FeaturesGrid";
import ArogyaMitra from "@/components/ArogyaMitra";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeaturesGrid />
      <ArogyaMitra />
    </div>
  );
};

export default Index;
