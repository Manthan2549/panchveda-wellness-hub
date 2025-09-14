import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, Leaf, Calendar, ShoppingCart } from "lucide-react";
import arogyaMitraAvatar from "@/assets/arogyamitra-avatar.png";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
}

const ArogyaMitra = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Namaste! 🙏 I'm ArogyaMitra, your personal Ayurveda wellness guide. How can I help you on your healing journey today?",
      isBot: true,
      timestamp: new Date(),
      suggestions: ["I have neck pain", "Feeling stressed", "Digestion issues", "Need energy boost"]
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickSuggestions = [
    "Stress relief therapy",
    "Joint pain treatment", 
    "Better sleep",
    "Digestive health",
    "Energy boost",
    "Skin problems"
  ];

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateAyurvedaResponse(text);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponse.text,
        isBot: true,
        timestamp: new Date(),
        suggestions: botResponse.suggestions
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAyurvedaResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    if (input.includes("stress") || input.includes("anxiety")) {
      return {
        text: "🌿 For stress relief, I recommend Shirodhara therapy combined with Abhyanga massage. Consider our Brahmi and Ashwagandha supplements. Practicing daily pranayama will also help balance your nervous system.",
        suggestions: ["Book Shirodhara therapy", "View stress-relief products", "Learn breathing exercises"]
      };
    } else if (input.includes("pain") || input.includes("joint")) {
      return {
        text: "🌱 For pain management, Panchakarma's Basti therapy is highly effective. Our turmeric-based oils and Guggulu supplements can provide natural relief. Would you like to explore these options?",
        suggestions: ["Book Basti therapy", "View pain-relief oils", "Consult Ayurveda doctor"]
      };
    } else if (input.includes("digest") || input.includes("stomach")) {
      return {
        text: "🍃 Digestive health is crucial in Ayurveda. I suggest Virechana therapy and incorporating Triphala in your routine. Our digestive teas and Agni-boosting herbs can help restore balance.",
        suggestions: ["Book digestive therapy", "Shop digestive products", "Get diet consultation"]
      };
    } else if (input.includes("energy") || input.includes("tired")) {
      return {
        text: "⚡ Low energy often indicates Ojas depletion. Try our Rasayana therapies, Chyawanprash, and energy-boosting herb combinations. Regular Abhyanga massage will also revitalize you.",
        suggestions: ["Book energy therapy", "View energy supplements", "Schedule wellness consultation"]
      };
    } 
  };

  return (
    <section className="py-16 wellness-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 smooth-enter">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 rounded-full text-sm font-medium text-accent-foreground mb-4">
            <Bot className="w-4 h-4" />
            <span>AI-Powered Wellness Assistant</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Meet Your Wellness Companion
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ArogyaMitra 🌱 provides personalized Ayurveda guidance, therapy recommendations, 
            and wellness tips based on your unique health profile.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="wellness-card">
            <CardHeader className="bg-[var(--gradient-secondary)] rounded-t-xl">
              <CardTitle className="flex items-center space-x-3">
                <img 
                  src={arogyaMitraAvatar} 
                  alt="ArogyaMitra AI Assistant"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <span className="text-lg font-semibold">ArogyaMitra</span>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Online</span>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-6">
              {/* Chat Messages */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-xs md:max-w-md p-3 rounded-xl ${
                      message.isBot 
                        ? 'bg-secondary text-secondary-foreground' 
                        : 'bg-[var(--gradient-primary)] text-primary-foreground'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      {message.suggestions && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {message.suggestions.map((suggestion, index) => (
                            <Badge 
                              key={index}
                              variant="outline"
                              className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                              onClick={() => handleSendMessage(suggestion)}
                            >
                              {suggestion}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-secondary text-secondary-foreground p-3 rounded-xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Suggestions */}
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">Quick suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickSuggestions.map((suggestion, index) => (
                    <Badge 
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => handleSendMessage(suggestion)}
                    >
                      <Leaf className="w-3 h-3 mr-1" />
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask about your health concerns..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                  className="flex-1"
                />
                <Button 
                  onClick={() => handleSendMessage(inputMessage)}
                  disabled={!inputMessage.trim() || isTyping}
                  className="hero-button"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Therapy
                </Button>
                <Button variant="outline" size="sm">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Shop Products
                </Button>
                <Button variant="outline" size="sm">
                  <Bot className="w-4 h-4 mr-2" />
                  Take Wellness Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ArogyaMitra;
