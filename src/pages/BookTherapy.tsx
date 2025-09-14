import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import Navbar from "../components/Navbar";
import { useToast } from "../hooks/use-toast";
import { useNavigate } from "react-router-dom";

const BookTherapy = () => {
  const [selectedTherapy, setSelectedTherapy] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const { toast } = useToast();
  const navigate = useNavigate();

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

  const timeSlots = ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM"];

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast({
      title: "Booking Confirmed 🎉",
      description: `Your therapy is booked for ${selectedDate} at ${selectedTime}.`
    });

    // reset fields
    setSelectedTherapy("");
    setSelectedDate("");
    setSelectedTime("");
    setName("");
    setPhone("");
    setEmail("");
    setNotes("");

    // redirect home
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Book Your <span className="text-primary">Therapy Session</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose from our authentic Panchakarma therapies and experienced practitioners
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Therapy Selection */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Select Therapy
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
                        <h3 className="font-semibold">{therapy.name}</h3>
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Select Date & Time
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
                    min={new Date().toISOString().split("T")[0]}
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
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedTherapy && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Therapy:</span>
                      <span className="font-medium">
                        {therapies.find((t) => t.id === selectedTherapy)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">
                        {therapies.find((t) => t.id === selectedTherapy)?.duration}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-bold text-primary">
                        {therapies.find((t) => t.id === selectedTherapy)?.price}
                      </span>
                    </div>
                  </>
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

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">Special Requirements</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special requirements..."
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
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
