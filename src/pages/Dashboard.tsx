import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  TrendingUp, 
  Award, 
  Bell, 
  Activity, 
  Heart, 
  Clock,
  Star,
  Target,
  Zap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom"; // ✅ import navigate

const Dashboard = () => {
  const [wellnessPoints, setWellnessPoints] = useState(1250);
  const [completedSessions, setCompletedSessions] = useState(8);
  const [totalSessions, setTotalSessions] = useState(12);

  const navigate = useNavigate(); // ✅ initialize navigate

  const upcomingAppointments = [
    {
      id: 1,
      therapy: "Abhyanga Massage",
      date: "Tomorrow",
      time: "10:00 AM",
      practitioner: "Dr. Sharma",
      status: "confirmed"
    },
    {
      id: 2,
      therapy: "Shirodhara",
      date: "Dec 20",
      time: "2:00 PM", 
      practitioner: "Dr. Patel",
      status: "pending"
    }
  ];

  const recentProgress = [
    { metric: "Stress Level", current: 3, previous: 7, improvement: true },
    { metric: "Energy Level", current: 8, previous: 5, improvement: true },
    { metric: "Sleep Quality", current: 7, previous: 6, improvement: true },
    { metric: "Digestive Health", current: 8, previous: 4, improvement: true }
  ];

  const achievements = [
    { name: "First Therapy", icon: Star, earned: true },
    { name: "Wellness Warrior", icon: Award, earned: true },
    { name: "Consistency Champion", icon: Target, earned: false },
    { name: "Health Guru", icon: Zap, earned: false }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, Prakhar! 🙏
          </h1>
          <p className="text-muted-foreground">
            Your wellness journey is progressing beautifully. Here's your health overview.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="wellness-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wellness Points</CardTitle>
              <Award className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{wellnessPoints}</div>
              <p className="text-xs text-muted-foreground">
                +180 from last session
              </p>
            </CardContent>
          </Card>

          <Card className="wellness-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Session Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {completedSessions}/{totalSessions}
              </div>
              <Progress value={(completedSessions / totalSessions) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="wellness-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">12 days</div>
              <p className="text-xs text-muted-foreground">
                Keep it up!
              </p>
            </CardContent>
          </Card>

          <Card className="wellness-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Health</CardTitle>
              <Heart className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">Excellent</div>
              <p className="text-xs text-muted-foreground">
                87% improvement
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card className="wellness-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* ✅ Redirect to BookTherapy */}
                  <Button className="w-full hero-button" onClick={() => navigate("/book-therapy")}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Book New Therapy Session
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Bell className="w-4 h-4 mr-2" />
                    View Notifications
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Activity className="w-4 h-4 mr-2" />
                    Log Today's Symptoms
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Progress */}
              <Card className="wellness-card">
                <CardHeader>
                  <CardTitle>Recent Health Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentProgress.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{item.metric}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{item.current}/10</span>
                        {item.improvement && (
                          <Badge variant="secondary" className="text-xs">
                            ↗ +{item.current - item.previous}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {<Tabs defaultValue="overview" className="space-y-6">
  <TabsList className="grid w-full grid-cols-4">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="appointments">Appointments</TabsTrigger>
    <TabsTrigger value="progress">Progress</TabsTrigger>
    <TabsTrigger value="achievements">Achievements</TabsTrigger>
  </TabsList>

  {/* ✅ Overview Tab */}
  <TabsContent value="overview" className="space-y-6">
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Quick Actions */}
      <Card className="wellness-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full hero-button" onClick={() => navigate("/book-therapy")}>
            <Calendar className="w-4 h-4 mr-2" />
            Book New Therapy Session
          </Button>
          <Button variant="outline" className="w-full">
            <Bell className="w-4 h-4 mr-2" />
            View Notifications
          </Button>
          <Button variant="outline" className="w-full">
            <Activity className="w-4 h-4 mr-2" />
            Log Today's Symptoms
          </Button>
        </CardContent>
      </Card>

      {/* Recent Progress */}
      <Card className="wellness-card">
        <CardHeader>
          <CardTitle>Recent Health Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentProgress.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{item.metric}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{item.current}/10</span>
                {item.improvement && (
                  <Badge variant="secondary" className="text-xs">
                    ↗ +{item.current - item.previous}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  </TabsContent>

  {/* ✅ Appointments Tab */}
  <TabsContent value="appointments" className="space-y-4">
    {upcomingAppointments.map((appt) => (
      <Card key={appt.id} className="wellness-card">
        <CardHeader>
          <CardTitle>{appt.therapy}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Date: {appt.date}</p>
          <p>Time: {appt.time}</p>
          <p>Practitioner: {appt.practitioner}</p>
          <p>Status: 
            <Badge className="ml-2">{appt.status}</Badge>
          </p>
        </CardContent>
      </Card>
    ))}
  </TabsContent>

  {/* ✅ Progress Tab */}
  <TabsContent value="progress" className="space-y-4">
    {recentProgress.map((item, index) => (
      <Card key={index} className="wellness-card">
        <CardHeader>
          <CardTitle>{item.metric}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Previous: {item.previous}/10</p>
          <p>Current: {item.current}/10</p>
          <p>
            {item.improvement ? "Improved 👍" : "Needs Attention 👀"}
          </p>
        </CardContent>
      </Card>
    ))}
  </TabsContent>

  {/* ✅ Achievements Tab */}
  <TabsContent value="achievements" className="grid md:grid-cols-2 gap-4">
    {achievements.map((ach, index) => (
      <Card key={index} className="wellness-card flex items-center space-x-4 p-4">
        <ach.icon className={`w-6 h-6 ${ach.earned ? "text-accent" : "text-muted-foreground"}`} />
        <span className={`${ach.earned ? "font-bold" : "text-muted-foreground"}`}>
          {ach.name}
        </span>
      </Card>
    ))}
  </TabsContent>
</Tabs>
}
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
