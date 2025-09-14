import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FeaturesGrid from "@/components/FeaturesGrid";
import Navbar from "@/components/Navbar";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Features = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16 smooth-enter">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 rounded-full text-sm font-medium text-accent-foreground mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Complete Feature Overview</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="bg-[var(--gradient-primary)] bg-clip-text text-black">
              Powerful Features
            </span>
            <br />
            for Modern Ayurveda
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how Panchveda transforms traditional Panchakarma practice with 
            cutting-edge technology, AI assistance, and comprehensive patient care tools.
          </p>
        </div>

        {/* Features Grid */}
        <FeaturesGrid />

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="wellness-card max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">
                Ready to Transform Your Practice?
              </CardTitle>
              <p className="text-muted-foreground">
                Join thousands of practitioners and patients experiencing the future of Ayurveda healthcare.
              </p>
            </CardHeader>
{/*             <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="hero-button" size="lg" asChild>
                  <Link to="/signup">
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/login">
                    Sign In
                  </Link>
                </Button>
              </div>
            </CardContent> */}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Features;
