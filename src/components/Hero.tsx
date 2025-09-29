import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Shield, Heart } from "lucide-react";
import heroImage from "@/assets/hero-wellness.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden lotus-pattern">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 smooth-enter">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-secondary rounded-full text-sm font-medium text-secondary-foreground">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>Blending Traditional Healing with Modern Technology</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                <span className="bg-[var(--gradient-primary)] bg-clip-text text-black">
                  Panchakarma Management Software
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Experience the future of Ayurveda healthcare with AI-powered therapy management, 
                personalized wellness tracking, and seamless patient care.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="hero-button" size="lg" asChild>
                <Link to="/health-questionnaire">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <Link to="/features">
                  Explore Features
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-success" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-accent" />
                <span>5000+ Happy Patients</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>AI-Powered Wellness</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden ayurveda-glow">
              <img
                src={heroImage}
                alt="Ayurveda Panchakarma Healthcare Platform"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-[var(--gradient-primary)] opacity-20"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -right-4 wellness-card p-4 pulse-wellness">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-sm font-medium">Live Monitoring</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 wellness-card p-4 pulse-wellness">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">AI Wellness Coach</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 wellness-gradient"></div>
    </section>
  );
};

export default Hero;
