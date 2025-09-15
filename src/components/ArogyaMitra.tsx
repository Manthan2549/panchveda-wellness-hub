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
    
    // Stress and Mental Health
    if (input.includes("stress") || input.includes("anxiety") || input.includes("mental") || input.includes("worry")) {
      return {
        text: "🌿 For stress and anxiety, Ayurveda recommends balancing Vata dosha. Shirodhara (oil pouring therapy) combined with Abhyanga massage can provide deep relaxation. Herbs like Brahmi, Ashwagandha, and Jatamansi are excellent for calming the nervous system. Daily pranayama (breathing exercises) and meditation will help restore mental equilibrium.",
        suggestions: ["Book Shirodhara therapy", "View stress-relief products", "Learn Pranayama techniques", "Ashwagandha supplements"]
      };
    }
    
    // Pain and Joint Issues
    else if (input.includes("pain") || input.includes("joint") || input.includes("arthritis") || input.includes("back") || input.includes("neck")) {
      return {
        text: "🌱 For pain management, Ayurveda addresses the root cause through Panchakarma therapies. Basti (medicated enemas) and Abhyanga with warm herbal oils like Mahanarayana or Sahacharadi are highly effective. Supplements containing Guggulu, Shallaki (Boswellia), and turmeric provide natural anti-inflammatory relief. The combination of internal medicines and external therapies gives lasting results.",
        suggestions: ["Book Basti therapy", "Pain-relief oil massage", "Herbal supplements", "Consult Ayurveda doctor"]
      };
    }
    
    // Digestive Issues
    else if (input.includes("digest") || input.includes("stomach") || input.includes("acidity") || input.includes("constipation") || input.includes("bloating")) {
      return {
        text: "🍃 Digestive health (Agni) is the cornerstone of Ayurveda. For digestive issues, Virechana (therapeutic purgation) cleanses accumulated toxins. Daily use of Triphala balances all three doshas and improves digestion. Digestive spices like ginger, cumin, and fennel kindle digestive fire. Proper meal timing and eating habits are equally important for gut health.",
        suggestions: ["Book Virechana therapy", "Triphala supplements", "Digestive spice tea", "Diet consultation"]
      };
    }
    
    // Energy and Fatigue
    else if (input.includes("energy") || input.includes("tired") || input.includes("fatigue") || input.includes("weakness")) {
      return {
        text: "⚡ Low energy indicates depleted Ojas (vital essence). Rasayana (rejuvenation) therapies like Chyawanprash, Amalaki, and Shatavari restore vitality. Regular Abhyanga massage improves circulation and energy flow. Proper sleep, balanced nutrition, and gentle exercise like yoga help rebuild energy reserves naturally.",
        suggestions: ["Rasayana therapy", "Chyawanprash supplements", "Energy-boosting massage", "Yoga consultation"]
      };
    }
    
    // Skin Problems
    else if (input.includes("skin") || input.includes("acne") || input.includes("eczema") || input.includes("rash") || input.includes("pigmentation")) {
      return {
        text: "✨ Skin issues often reflect internal imbalances, particularly Pitta dosha. Blood purification through herbs like Neem, Manjistha, and Sariva helps clear toxins. External applications of medicated oils and face packs provide relief. A Pitta-pacifying diet avoiding spicy, oily foods is essential for lasting skin health.",
        suggestions: ["Blood purification therapy", "Herbal face packs", "Neem supplements", "Skin consultation"]
      };
    }
    
    // Sleep Issues
    else if (input.includes("sleep") || input.includes("insomnia") || input.includes("rest")) {
      return {
        text: "🌙 Sleep disorders indicate Vata imbalance. Shiropichu (oil pooling on head) and gentle head massage with Brahmi oil promote natural sleep. Herbs like Tagara, Jatamansi, and warm milk with nutmeg before bed help induce restful sleep. Establishing a calming evening routine is crucial.",
        suggestions: ["Sleep therapy treatment", "Brahmi oil massage", "Herbal sleep aids", "Sleep hygiene consultation"]
      };
    }
    
    // Weight Management
    else if (input.includes("weight") || input.includes("obesity") || input.includes("fat") || input.includes("metabolism")) {
      return {
        text: "⚖️ Weight management in Ayurveda focuses on balancing metabolism (Agni) and reducing Kapha dosha. Udwartana (herbal powder massage) and specific Panchakarma therapies help. Herbs like Triphala, Guggulu, and Vrikshamla support healthy weight. A Kapha-reducing diet with regular exercise is essential.",
        suggestions: ["Udwartana therapy", "Weight management herbs", "Metabolism consultation", "Kapha diet plan"]
      };
    }
    
    // General Ayurveda Questions
    else if (input.includes("ayurveda") || input.includes("dosha") || input.includes("constitution") || input.includes("prakriti")) {
      return {
        text: "🕉️ Ayurveda is the science of life focusing on prevention and holistic healing. Your unique constitution (Prakriti) determines your optimal diet, lifestyle, and treatments. The three doshas - Vata (movement), Pitta (transformation), and Kapha (structure) - govern all body functions. Understanding your constitution helps achieve perfect health balance.",
        suggestions: ["Prakriti consultation", "Dosha assessment", "Lifestyle guidance", "Ayurveda education"]
      };
    }
    
    // Therapy Information
    else if (input.includes("therapy") || input.includes("treatment") || input.includes("panchakarma")) {
      return {
        text: "🏥 Panchakarma is Ayurveda's premier detoxification and rejuvenation therapy consisting of five main procedures: Vamana (emesis), Virechana (purgation), Basti (enemas), Nasya (nasal therapy), and Raktamokshana (bloodletting). These therapies remove deep-seated toxins and restore natural balance. The treatment is customized based on individual constitution and health conditions.",
        suggestions: ["Panchakarma consultation", "Therapy packages", "Treatment planning", "Book assessment"]
      };
    }
    
    // Default Response
    else {
      return {
        text: "🙏 Thank you for reaching out! As your Ayurveda wellness guide, I can help with stress management, pain relief, digestive health, energy enhancement, skin care, sleep issues, and overall wellness. Ayurveda offers personalized solutions based on your unique constitution and current health status. What specific area would you like to explore?",
        suggestions: ["Take health assessment", "Book consultation", "View therapies", "Explore products", "Learn about doshas"]
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
