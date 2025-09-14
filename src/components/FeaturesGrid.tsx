import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Bell, 
  BarChart3, 
  MessageSquare, 
  Bot, 
  ShoppingCart, 
  BookOpen, 
  Users, 
  Globe, 
  Award,
  Heart,
  Smartphone
} from "lucide-react";

const FeaturesGrid = () => {
  const features = [
    {
      icon: Calendar,
      title: "Smart Therapy Scheduling",
      description: "AI-powered calendar for booking Panchakarma sessions with automatic practitioner matching",
      badge: "Core",
      color: "text-primary"
    },
    {
      icon: Bell,
      title: "Intelligent Notifications",
      description: "Pre/post-therapy alerts, medication reminders, and wellness tips via SMS, email & in-app",
      badge: "Essential",
      color: "text-accent"
    },
    {
      icon: BarChart3,
      title: "Progress Visualization",
      description: "Interactive charts tracking recovery milestones, session completion, and health improvements",
      badge: "Analytics",
      color: "text-success"
    },
    {
      icon: MessageSquare,
      title: "Patient Feedback Loop",
      description: "Continuous symptom logging and improvement tracking visible to practitioners in real-time",
      badge: "Communication",
      color: "text-primary"
    },
    {
      icon: Bot,
      title: "ArogyaMitra AI Assistant",
      description: "24/7 Ayurveda chatbot for therapy guidance, product recommendations, and wellness tips",
      badge: "AI-Powered",
      color: "text-accent"
    },
    {
      icon: ShoppingCart,
      title: "Ayurveda Store",
      description: "Curated herbal medicines, oils, supplements, and wellness products with secure checkout",
      badge: "E-commerce",
      color: "text-warning"
    },
    {
      icon: BookOpen,
      title: "Knowledge Hub",
      description: "Comprehensive library of Ayurveda articles, lifestyle guides, and educational videos",
      badge: "Education",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Practitioner Dashboard",
      description: "Complete patient management, quality tracking, and treatment planning tools",
      badge: "Professional",
      color: "text-success"
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Seamless experience in English, Hindi, and Punjabi with cultural context awareness",
      badge: "Accessibility",
      color: "text-accent"
    },
    {
      icon: Award,
      title: "Wellness Gamification",
      description: "Earn points for therapy attendance, unlock achievements, and get store discounts",
      badge: "Engagement",
      color: "text-warning"
    },
    {
      icon: Heart,
      title: "Adaptive Health Assessment",
      description: "Dynamic questionnaire that personalizes therapy recommendations based on responses",
      badge: "Personalization",
      color: "text-primary"
    },
    {
      icon: Smartphone,
      title: "Wearables Integration",
      description: "Connect fitness trackers to monitor vitals before and after therapy sessions",
      badge: "IoT",
      color: "text-success"
    }
  ];

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "Core": return "default";
      case "AI-Powered": return "secondary";
      case "Essential": return "outline";
      default: return "secondary";
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 smooth-enter">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comprehensive <span className="bg-[var(--gradient-primary)] bg-clip-text text-transparent">Healthcare Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the complete digital transformation of traditional Ayurveda practice with 
            our cutting-edge platform designed for modern healthcare needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="wellness-card group hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg bg-secondary ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <Badge variant={getBadgeVariant(feature.badge)} className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-[var(--gradient-primary)] rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Patient-Centered Care</h3>
            <p className="text-muted-foreground">
              Every feature designed with patient comfort, cultural sensitivity, and healing outcomes in mind.
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-[var(--gradient-accent)] rounded-full flex items-center justify-center mx-auto">
              <Bot className="w-8 h-8 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">AI-Enhanced Wisdom</h3>
            <p className="text-muted-foreground">
              Ancient Ayurveda knowledge powered by modern AI for personalized treatment recommendations.
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-[var(--gradient-secondary)] rounded-full flex items-center justify-center mx-auto">
              <Globe className="w-8 h-8 text-secondary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Global Accessibility</h3>
            <p className="text-muted-foreground">
              Breaking language barriers to make authentic Ayurveda accessible worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;