import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User, Phone, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const BookTherapy = () => {
  const [selectedTherapy, setSelectedTherapy] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const { toast } = useToast();

  const therapies = [
    {
      id: "abhyanga",
      name: "Abhyanga Massage",
      duration: "60 minutes",
      price: "₹2,500",
      description: "Full body oil massage for stress relief and rejuvenation",
      benefits: ["Stress Relief", "Better Sleep", "Improved Circulation"]
    },
    {
      id: "shirodhara",
      name: "Shirodhara",
      duration: "45 minutes",
      price: "₹3,500",
      description: "Continuous oil pouring on forehead for mental clarity",
      benefits: ["Mental Clarity", "Anxiety Relief", "Deep Relaxation"]
    },
    {
      id: "basti",
      name: "Basti Therapy",
      duration: "90 minutes",
      price: "₹4,500",
      description: "Medicated enema therapy for detoxification",
      benefits: ["Detoxification", "Joint Pain Relief", "Digestive Health"]
    },
    {
      id: "pizhichil",
      name: "Pizhichil",
      duration: "75 minutes",
      price: "₹5,000",
      description: "Royal treatment with warm oil massage and pouring",
      benefits: ["Muscle Relaxation", "Pain Relief", "Skin Nourishment"]
    }
  ];

  const practitioners = [
    { id: 1, name: "Dr. Priya Sharma", specialization: "Panchakarma Expert", rating: 4.9, experience: "15 years" },
    { id: 2, name: "Dr. Raj Patel", specialization: "Pain Management", rating: 4.8, experience: "12 years" },
    { id: 3, name: "Dr. Meera Singh", specialization: "Stress & Anxiety", rating: 4.9, experience: "18 years" }
  ];

  const timeSlots = [
    "9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM"
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Booking Confirmed! 🎉",
      description: "Your therapy session has been scheduled. You'll receive a confirmation SMS shortly.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Book Your <span className="bg-[var(--gradient-primary)] bg-clip-text text-black">Therapy Session</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose from our authentic Panchakarma therapies and experienced practitioners
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Therapy Selection */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>Select Therapy</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {therapies.map((therapy) => (
                  <div
                    key={therapy.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedTherapy === therapy.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedTherapy(therapy.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-foreground">{therapy.name}</h3>
                        <p className="text-sm text-muted-foreground">{therapy.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {therapy.benefits.map((benefit, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary text-lg">{therapy.price}</div>
                        <div className="text-sm text-muted-foreground">{therapy.duration}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Date & Time Selection */}
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Select Date & Time</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label>Available Time Slots</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary & Form */}
          <div className="space-y-6">
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedTherapy && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Therapy:</span>
                      <span className="font-medium">
                        {therapies.find(t => t.id === selectedTherapy)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">
                        {therapies.find(t => t.id === selectedTherapy)?.duration}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-bold text-primary">
                        {therapies.find(t => t.id === selectedTherapy)?.price}
                      </span>
                    </div>
                  </div>
                )}
                {selectedDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">{selectedDate}</span>
                  </div>
                )}
                {selectedTime && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="wellness-card">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBooking} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your full name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Special Requirements</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special requirements or health conditions we should know about..."
                      rows={3}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full hero-button"
                    disabled={!selectedTherapy || !selectedDate || !selectedTime}
                  >
                    Confirm Booking
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTherapy;
