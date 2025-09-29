import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Clock,
  Star,
  Phone,
  Video,
  FileText,
  Award
} from "lucide-react";
import Navbar from "@/components/Navbar";

const PractitionerDashboard = () => {
  const [totalPatients] = useState(45);
  const [monthlyRevenue] = useState(12500);
  const [todayAppointments] = useState(6);
  const [completedSessions] = useState(28);

  const upcomingAppointments = [
    {
      id: 1,
      patient: "Priya Sharma",
      time: "10:00 AM",
      therapy: "Abhyanga Massage",
      type: "in-person",
      status: "confirmed",
    },
    {
      id: 2,
      patient: "Rajesh Kumar",
      time: "11:30 AM", 
      therapy: "Panchakarma Consultation",
      type: "virtual",
      status: "confirmed",
    },
    {
      id: 3,
      patient: "Meera Patel",
      time: "2:00 PM",
      therapy: "Shirodhara",
      type: "in-person", 
      status: "pending",
    },
    {
      id: 4,
      patient: "Amit Singh",
      time: "3:30 PM",
      therapy: "Ayurvedic Consultation",
      type: "virtual",
      status: "confirmed",
    },
  ];

  const recentPatients = [
    { 
      name: "Kavya Reddy", 
      lastVisit: "Yesterday", 
      condition: "Stress Management",
      improvement: 85,
      status: "improving"
    },
    { 
      name: "Rohit Mehta", 
      lastVisit: "2 days ago", 
      condition: "Digestive Issues",
      improvement: 70,
      status: "stable"
    },
    { 
      name: "Sneha Gupta", 
      lastVisit: "3 days ago", 
      condition: "Sleep Disorders",
      improvement: 90,
      status: "excellent"
    },
  ];

  const monthlyStats = [
    { metric: "New Patients", value: 8, change: "+15%", positive: true },
    { metric: "Session Completion", value: "96%", change: "+5%", positive: true },
    { metric: "Patient Satisfaction", value: "4.8/5", change: "+0.2", positive: true },
    { metric: "Revenue Growth", value: "18%", change: "+3%", positive: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome, Dr. Ayush Patel 🩺
          </h1>
          <p className="text-muted-foreground">
            Your practice overview for today. You have {todayAppointments} appointments scheduled.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="wellness-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{totalPatients}</div>
              <p className="text-xs text-muted-foreground">+8 new this month</p>
            </CardContent>
          </Card>

          <Card className="wellness-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">₹{monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>

          <Card className="wellness-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Sessions</CardTitle>
              <Clock className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{todayAppointments}</div>
              <p className="text-xs text-muted-foreground">2 completed, 4 upcoming</p>
            </CardContent>
          </Card>

          <Card className="wellness-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <Star className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">96%</div>
              <p className="text-xs text-muted-foreground">Patient satisfaction</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="appointments">Today's Schedule</TabsTrigger>
            <TabsTrigger value="patients">Recent Patients</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="profile">Practice Profile</TabsTrigger>
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-4">
            <div className="grid gap-4">
              {upcomingAppointments.map((appt) => (
                <Card key={appt.id} className="wellness-card">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{appt.patient}</CardTitle>
                        <p className="text-sm text-muted-foreground">{appt.therapy}</p>
                      </div>
                      <Badge variant={appt.status === "confirmed" ? "default" : "secondary"}>
                        {appt.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          {appt.time}
                        </span>
                        <span className="flex items-center text-sm">
                          {appt.type === "virtual" ? (
                            <Video className="w-4 h-4 mr-1" />
                          ) : (
                            <Users className="w-4 h-4 mr-1" />
                          )}
                          {appt.type}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="w-4 h-4" />
                        </Button>
                        {appt.type === "virtual" && (
                          <Button size="sm" className="hero-button">
                            <Video className="w-4 h-4 mr-1" />
                            Join
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Patients Tab */}
          <TabsContent value="patients" className="space-y-4">
            {recentPatients.map((patient, index) => (
              <Card key={index} className="wellness-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{patient.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{patient.condition}</p>
                    </div>
                    <Badge 
                      variant={
                        patient.status === "excellent" ? "default" :
                        patient.status === "improving" ? "secondary" : "outline"
                      }
                    >
                      {patient.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Last Visit: {patient.lastVisit}</span>
                      <span>Improvement: {patient.improvement}%</span>
                    </div>
                    <Progress value={patient.improvement} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {monthlyStats.map((stat, index) => (
                <Card key={index} className="wellness-card">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.metric}</CardTitle>
                    <TrendingUp className={`h-4 w-4 ${stat.positive ? 'text-success' : 'text-destructive'}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className={`text-xs ${stat.positive ? 'text-success' : 'text-destructive'}`}>
                      {stat.change} from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-primary" />
                  <span>Practice Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Specializations</h4>
                    <div className="space-y-1">
                      <Badge variant="outline">Panchakarma Therapy</Badge>
                      <Badge variant="outline">Ayurvedic Medicine</Badge>
                      <Badge variant="outline">Stress Management</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Experience</h4>
                    <p className="text-sm text-muted-foreground">12 years in Ayurvedic practice</p>
                    <p className="text-sm text-muted-foreground">500+ successful treatments</p>
                  </div>
                </div>
                <div className="pt-4">
                  <Button className="hero-button">
                    Edit Practice Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PractitionerDashboard;