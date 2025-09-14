import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const BookTherapy = () => {
  const [therapy, setTherapy] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: "Booking Confirmed 🎉",
      description: `Your therapy (${therapy}) has been booked for ${date} at ${time}.`,
    });

    // 🧹 reset form fields
    setTherapy("");
    setDate("");
    setTime("");
    setName("");
    setEmail("");

    // ✅ redirect to homepage after 1.5s
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Card className="w-full max-w-md wellness-card">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Book a Therapy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBooking} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="therapy">Therapy</Label>
                <Input
                  id="therapy"
                  placeholder="Enter therapy name"
                  value={therapy}
                  onChange={(e) => setTherapy(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full hero-button"
                disabled={!therapy || !date || !time || !name || !email}
              >
                Confirm Booking
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookTherapy;
