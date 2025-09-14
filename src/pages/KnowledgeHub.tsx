import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Play, 
  Download, 
  Star, 
  Clock, 
  User,
  Heart,
  Brain,
  Leaf,
  Sun
} from "lucide-react";
import Navbar from "@/components/Navbar";

const KnowledgeHub = () => {
  const articles = [
    {
      id: 1,
      title: "Understanding Panchakarma: Complete Guide",
      category: "Fundamentals",
      author: "Dr. Priya Sharma",
      readTime: "12 min read",
      rating: 4.9,
      image: "📚",
      excerpt: "Dive deep into the five actions of Panchakarma and how they cleanse and rejuvenate your body and mind."
    },
    {
      id: 2,
      title: "Daily Ayurveda Routines for Modern Life",
      category: "Lifestyle",
      author: "Dr. Raj Patel",
      readTime: "8 min read",
      rating: 4.7,
      image: "🌅",
      excerpt: "Simple yet powerful Ayurvedic practices you can incorporate into your busy modern lifestyle."
    },
    {
      id: 3,
      title: "Herbs for Stress and Anxiety Relief",
      category: "Herbal Medicine",
      author: "Dr. Meera Singh",
      readTime: "10 min read",
      rating: 4.8,
      image: "🌿",
      excerpt: "Discover time-tested herbs like Ashwagandha and Brahmi for natural stress management."
    }
  ];

  const videos = [
    {
      id: 1,
      title: "Abhyanga Self-Massage Technique",
      duration: "15:30",
      views: "45.2K",
      thumbnail: "🎥",
      level: "Beginner"
    },
    {
      id: 2,
      title: "Breathing Exercises for Stress Relief",
      duration: "12:45",
      views: "32.1K",
      thumbnail: "🧘",
      level: "All Levels"
    },
    {
      id: 3,
      title: "Ayurvedic Cooking Basics",
      duration: "20:15",
      views: "28.5K",
      thumbnail: "🍲",
      level: "Beginner"
    }
  ];

  const guides = [
    {
      id: 1,
      title: "Seasonal Wellness Guide",
      description: "Adapt your health routine according to different seasons",
      pages: 24,
      downloads: "12.3K",
      icon: Sun
    },
    {
      id: 2,
      title: "Ayurvedic Nutrition Manual",
      description: "Complete guide to eating according to your dosha",
      pages: 36,
      downloads: "8.7K",
      icon: Leaf
    },
    {
      id: 3,
      title: "Stress Management Toolkit",
      description: "Practical tools and techniques for daily stress relief",
      pages: 18,
      downloads: "15.2K",
      icon: Brain
    }
  ];

  const faqs = [
    {
      question: "How often should I undergo Panchakarma?",
      answer: "For optimal health maintenance, Panchakarma is typically recommended twice a year during seasonal transitions. However, therapeutic Panchakarma may be needed more frequently depending on your health condition."
    },
    {
      question: "Can I do Panchakarma while working?",
      answer: "While mild Panchakarma treatments can be done alongside work, intensive detox programs require rest. We offer weekend packages and modified schedules for working professionals."
    },
    {
      question: "Are there any side effects of Ayurvedic treatments?",
      answer: "When performed by qualified practitioners, Ayurvedic treatments are generally safe. You may experience mild detox symptoms initially, which are normal and indicate the body's healing process."
    },
    {
      question: "How do I know which therapy is right for me?",
      answer: "Our AI assistant ArogyaMitra can provide initial guidance, but we recommend consulting with our certified practitioners for a comprehensive assessment based on your constitution and health goals."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="bg-[var(--gradient-primary)] bg-clip-text text-transparent">
              Knowledge Hub
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expand your understanding of Ayurveda with expert articles, video tutorials, 
            and comprehensive guides for holistic wellness.
          </p>
        </div>

        <Tabs defaultValue="articles" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Card key={article.id} className="wellness-card group hover:scale-105 transition-transform duration-300">
                  <CardHeader className="pb-4">
                    <div className="text-4xl mb-2">{article.image}</div>
                    <Badge variant="secondary" className="w-fit text-xs">
                      {article.category}
                    </Badge>
                    <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-accent fill-current" />
                        <span className="text-sm font-medium">{article.rating}</span>
                      </div>
                      <Button size="sm" className="hero-button">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Read Article
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Card key={video.id} className="wellness-card group hover:scale-105 transition-transform duration-300">
                  <CardHeader className="pb-4">
                    <div className="text-4xl mb-2">{video.thumbnail}</div>
                    <Badge variant="outline" className="w-fit text-xs">
                      {video.level}
                    </Badge>
                    <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {video.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{video.duration}</span>
                      </div>
                      <span>{video.views} views</span>
                    </div>
                    <Button className="w-full hero-button">
                      <Play className="w-4 h-4 mr-2" />
                      Watch Video
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guides" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide) => (
                <Card key={guide.id} className="wellness-card group hover:scale-105 transition-transform duration-300">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-[var(--gradient-primary)] rounded-lg flex items-center justify-center mb-4">
                      <guide.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {guide.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {guide.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{guide.pages} pages</span>
                      <span>{guide.downloads} downloads</span>
                    </div>
                    <Button className="w-full hero-button">
                      <Download className="w-4 h-4 mr-2" />
                      Download Guide
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="faqs" className="space-y-6">
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="wellness-card">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="wellness-card text-center">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Still have questions?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Our AI assistant ArogyaMitra is here to help with personalized answers.
                  </p>
                  <Button className="hero-button">
                    <Heart className="w-4 h-4 mr-2" />
                    Ask ArogyaMitra
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default KnowledgeHub;