import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Calendar, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"; // ✅ fixed import path

// Question type
interface Question {
  id: number;
  question: string;
  options: string[];
  icon?: string; // emojis are strings
}

// Result type
interface QuestionnaireResult {
  therapies: string[];
  products: string[];
  urgency: string;
  description: string;
}

const HealthQuestionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [result, setResult] = useState<QuestionnaireResult | null>(null);
  const { toast } = useToast();

  // Questions flow
  const getQuestionsFlow = (): Question[] => {
    const baseQuestions: Question[] = [
      {
        id: 1,
        question: "What is your main health concern?",
        options: ["Stress & Anxiety", "Physical Pain", "Digestive Issues", "Skin Problems", "Low Energy", "Sleep Issues"],
        icon: "🤔",
      },
    ];

    const mainConcern = answers[1];

    if (mainConcern === "Stress & Anxiety") {
      return baseQuestions.concat([
        {
          id: 2,
          question: "How often do you feel anxious or overwhelmed?",
          options: ["Daily", "Few times a week", "Occasionally", "Rarely"],
          icon: "😰",
        },
        {
          id: 3,
          question: "What triggers your stress the most?",
          options: ["Work pressure", "Family issues", "Financial concerns", "Health worries", "Social situations"],
          icon: "⚡",
        },
        {
          id: 4,
          question: "How does stress affect your daily life?",
          options: ["Sleep problems", "Eating changes", "Irritability", "Physical symptoms", "All of the above"],
          icon: "😴",
        },
        {
          id: 5,
          question: "Have you tried any stress management techniques?",
          options: ["Meditation", "Yoga", "Exercise", "Medication", "Nothing yet"],
          icon: "🧘",
        },
        {
          id: 6,
          question: "What type of relief are you seeking?",
          options: ["Immediate calming", "Long-term therapy plan", "Natural supplements", "Lifestyle guidance"],
          icon: "🎯",
        },
      ]);
    } else if (mainConcern === "Physical Pain") {
      return baseQuestions.concat([
        {
          id: 2,
          question: "Where is your pain located?",
          options: ["Back & Spine", "Neck & Shoulders", "Joints (knees/hips)", "Headaches", "Multiple areas"],
          icon: "🎯",
        },
        {
          id: 3,
          question: "How long have you had this pain?",
          options: ["Less than a week", "Few weeks", "Few months", "More than a year"],
          icon: "⏰",
        },
        {
          id: 4,
          question: "What makes the pain worse?",
          options: ["Physical activity", "Sitting too long", "Weather changes", "Stress", "Morning stiffness"],
          icon: "📈",
        },
        {
          id: 5,
          question: "Rate your pain intensity (1-10)",
          options: ["1-3 (Mild)", "4-6 (Moderate)", "7-8 (Severe)", "9-10 (Extreme)"],
          icon: "🌡️",
        },
        {
          id: 6,
          question: "What type of treatment do you prefer?",
          options: ["Immediate pain relief", "Therapeutic massage", "Herbal treatments", "Complete therapy plan"],
          icon: "💊",
        },
      ]);
    } else if (mainConcern === "Digestive Issues") {
      return baseQuestions.concat([
        {
          id: 2,
          question: "What digestive problems do you experience?",
          options: ["Constipation", "Acidity/Heartburn", "Bloating", "Irregular bowel", "Loss of appetite"],
          icon: "🍽️",
        },
        {
          id: 3,
          question: "When do these issues occur most?",
          options: ["After meals", "Morning", "Evening", "When stressed", "Randomly"],
          icon: "⏰",
        },
        {
          id: 4,
          question: "How is your current diet?",
          options: ["Very irregular", "Mostly healthy", "Lots of processed food", "Vegetarian/Vegan", "Mixed diet"],
          icon: "🥗",
        },
        {
          id: 5,
          question: "Do you experience any other symptoms?",
          options: ["Fatigue after eating", "Skin issues", "Mood changes", "Weight fluctuation", "None"],
          icon: "🔄",
        },
        {
          id: 6,
          question: "What would help you most?",
          options: ["Dietary guidance", "Digestive supplements", "Detox therapy", "Complete gut healing plan"],
          icon: "🌱",
        },
      ]);
    } else {
      return baseQuestions.concat([
        {
          id: 2,
          question: "How long have you been experiencing this issue?",
          options: ["Less than a month", "1-3 months", "3-6 months", "More than 6 months"],
          icon: "📅",
        },
        {
          id: 3,
          question: "How does this affect your daily activities?",
          options: ["Mildly", "Moderately", "Significantly", "Severely"],
          icon: "📊",
        },
        {
          id: 4,
          question: "Have you tried any treatments before?",
          options: ["Modern medicine", "Home remedies", "Ayurveda", "Other alternatives", "Nothing yet"],
          icon: "💊",
        },
        {
          id: 5,
          question: "What's your primary goal?",
          options: ["Quick relief", "Long-term healing", "Prevention", "Overall wellness"],
          icon: "🎯",
        },
        {
          id: 6,
          question: "How do you prefer to manage your health?",
          options: ["Natural remedies", "Professional therapy", "Self-care products", "Comprehensive plan"],
          icon: "🌿",
        },
      ]);
    }
  };

  const questions = getQuestionsFlow();

  // handle answers
  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [questions[currentQuestion].id]: answer }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      generateResult();
    }
  };

  // result logic
  const generateResult = () => {
    const mainConcern = answers[1];
    let finalResult: QuestionnaireResult;

    if (mainConcern === "Stress & Anxiety") {
      finalResult = {
        therapies: ["Shirodhara Therapy", "Abhyanga Massage", "Pranayama Sessions"],
        products: ["Ashwagandha Capsules", "Brahmi Oil", "Stress Relief Tea"],
        urgency: "Recommended within 1-2 weeks",
        description: "Based on your responses, we recommend stress-relief therapies combined with natural supplements for holistic healing.",
      };
    } else if (mainConcern === "Physical Pain") {
      finalResult = {
        therapies: ["Basti Therapy", "Pizhichil", "Kati Basti"],
        products: ["Pain Relief Oil", "Turmeric Supplements", "Joint Care Capsules"],
        urgency: "Start treatment within 1 week",
        description: "Your pain patterns suggest Panchakarma therapies focused on joint and muscle healing would be most beneficial.",
      };
    } else if (mainConcern === "Digestive Issues") {
      finalResult = {
        therapies: ["Virechana", "Basti Therapy", "Dietary Consultation"],
        products: ["Triphala Powder", "Digestive Tea", "Gut Health Kit"],
        urgency: "Begin within 2-3 days",
        description: "Your digestive concerns indicate the need for detoxification therapies and gut-healing supplements.",
      };
    } else {
      finalResult = {
        therapies: ["General Panchakarma", "Consultation", "Wellness Assessment"],
        products: ["Multi-herb Supplement", "General Wellness Kit", "Ayurveda Tea"],
        urgency: "Schedule within 1 week",
        description: "Based on your health profile, we recommend a comprehensive wellness approach with personalized therapies.",
      };
    }

    setResult(finalResult);
    setIsComplete(true);

    toast({
      title: "Assessment Complete! 🎉",
      description: "Your personalized wellness plan is ready.",
    });
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const skipQuestionnaire = () => {
    toast({
      title: "Questionnaire Skipped",
      description: "You can always take it later from your dashboard.",
    });
  };

  // Completed screen
  if (isComplete && result) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="wellness-card">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 bg-[var(--gradient-primary)] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl text-foreground">Your Personalized Wellness Plan</CardTitle>
            <p className="text-muted-foreground">{result.description}</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Therapies */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Recommended Therapies</h3>
              <div className="grid gap-2">
                {result.therapies.map((therapy, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <span className="font-medium">{therapy}</span>
                    <Badge variant="outline">Recommended</Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Products */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Suggested Products</h3>
              <div className="grid gap-2">
                {result.products.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <span className="font-medium">{product}</span>
                    <Badge variant="secondary">Available</Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Urgency */}
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <h4 className="font-semibold text-accent mb-2">Timeline</h4>
              <p className="text-accent-foreground">{result.urgency}</p>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button className="hero-button" asChild>
                <Link to="/book">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Therapy
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/store">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  View Products
                </Link>
              </Button>
            </div>

            <Button
              variant="ghost"
              className="w-full"
              onClick={() => {
                setIsComplete(false);
                setCurrentQuestion(0);
                setAnswers({});
                setResult(null);
              }}
            >
              Retake Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Questions screen
  return (
    <div className="max-w-xl mx-auto p-6">
      <Card className="wellness-card">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Health Assessment</h2>
            <Button variant="ghost" size="sm" onClick={skipQuestionnaire}>
              Skip for now
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
            </div>
            <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-4xl mb-4">{questions[currentQuestion].icon}</div>
            <h3 className="text-lg font-medium text-foreground">{questions[currentQuestion].question}</h3>
          </div>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full p-4 h-auto text-left justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </Button>
            ))}
          </div>

          {currentQuestion > 0 && (
            <div className="flex justify-between">
              <Button variant="ghost" onClick={goBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthQuestionnaire;
