import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Bot, 
  ShoppingCart, 
  BarChart3, 
  Heart,
  Clock,
  User,
  Stethoscope,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface TherapySession {
  id: string;
  therapy_type: string;
  scheduled_date: string;
  scheduled_time: string;
  status: string;
  practitioner_name?: string;
}

interface WellnessActivity {
  time: string;
  activity: string;
  completed: boolean;
}

const PatientDashboard = () => {
  const [upcomingTherapies, setUpcomingTherapies] = useState<TherapySession[]>([]);
  const [wellnessActivities, setWellnessActivities] = useState<WellnessActivity[]>([
    { time: '06:00', activity: 'Morning Meditation (20 mins)', completed: true },
    { time: '07:00', activity: 'Drink warm water with lemon', completed: true },
    { time: '08:00', activity: 'Abhyanga (Self-massage)', completed: false },
    { time: '12:00', activity: 'Mindful lunch break', completed: false },
    { time: '18:00', activity: 'Evening pranayama', completed: false },
    { time: '21:00', activity: 'Herbal tea & sleep prep', completed: false },
  ]);
  const [progressStats, setProgressStats] = useState({
    therapies_completed: 8,
    total_therapies: 12,
    wellness_streak: 5,
    emotional_health: 78
  });

  useEffect(() => {
    fetchUpcomingTherapies();
  }, []);

  const fetchUpcomingTherapies = async () => {
    try {
      const { data, error } = await supabase
        .from('therapy_sessions')
        .select(`
          id,
          therapy_type,
          scheduled_date,
          scheduled_time,
          status,
          practitioner_id
        `)
        .eq('patient_id', (await supabase.auth.getUser()).data.user?.id)
        .gte('scheduled_date', new Date().toISOString().split('T')[0])
        .order('scheduled_date', { ascending: true })
        .limit(3);

      if (error) throw error;
      
      const formattedData = data?.map(session => ({
        ...session,
        practitioner_name: 'Dr. Practitioner' // Simplified for now
      })) || [];
      
      setUpcomingTherapies(formattedData);
    } catch (error) {
      console.error('Error fetching therapies:', error);
    }
  };

  const toggleActivity = (index: number) => {
    setWellnessActivities(prev => 
      prev.map((activity, i) => 
        i === index ? { ...activity, completed: !activity.completed } : activity
      )
    );
  };

  const completedActivities = wellnessActivities.filter(a => a.completed).length;
  const activityProgress = (completedActivities / wellnessActivities.length) * 100;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back! 🙏</h1>
            <p className="text-muted-foreground">Your wellness journey continues today</p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link to="/book-therapy">
                <Calendar className="w-4 h-4 mr-2" />
                Book Therapy
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/chat">
                <Bot className="w-4 h-4 mr-2" />
                ArogyaMitra
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="wellness-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Stethoscope className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Therapies Progress</p>
                  <p className="text-2xl font-bold">{progressStats.therapies_completed}/{progressStats.total_therapies}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="wellness-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Wellness Streak</p>
                  <p className="text-2xl font-bold">{progressStats.wellness_streak} days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="wellness-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Heart className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Emotional Health</p>
                  <p className="text-2xl font-bold">{progressStats.emotional_health}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="wellness-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Clock className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Today's Progress</p>
                  <p className="text-2xl font-bold">{Math.round(activityProgress)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="schedule" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="schedule">Daily Schedule</TabsTrigger>
            <TabsTrigger value="therapies">Upcoming Therapies</TabsTrigger>
            <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
            <TabsTrigger value="store">Ayurveda Store</TabsTrigger>
          </TabsList>

          {/* Daily Wellness Schedule */}
          <TabsContent value="schedule">
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Today's Wellness Schedule</span>
                  <Badge variant="secondary">{completedActivities}/{wellnessActivities.length} completed</Badge>
                </CardTitle>
                <Progress value={activityProgress} className="w-full" />
              </CardHeader>
              <CardContent className="space-y-3">
                {wellnessActivities.map((activity, index) => (
                  <div 
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                      activity.completed ? 'bg-success/5 border-success/20' : 'bg-muted/30'
                    }`}
                  >
                    <div className="text-sm font-mono text-muted-foreground min-w-[60px]">
                      {activity.time}
                    </div>
                    <div className="flex-1">
                      <span className={activity.completed ? 'line-through text-muted-foreground' : ''}>
                        {activity.activity}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant={activity.completed ? "default" : "outline"}
                      onClick={() => toggleActivity(index)}
                    >
                      {activity.completed ? 'Completed' : 'Mark Done'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upcoming Therapies */}
          <TabsContent value="therapies">
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>Upcoming Therapy Sessions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingTherapies.length > 0 ? (
                  upcomingTherapies.map((therapy) => (
                    <div key={therapy.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{therapy.therapy_type}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(therapy.scheduled_date).toLocaleDateString()} at {therapy.scheduled_time}
                        </p>
                        {therapy.practitioner_name && (
                          <p className="text-sm text-muted-foreground">
                            with Dr. {therapy.practitioner_name}
                          </p>
                        )}
                      </div>
                      <Badge variant="outline">{therapy.status}</Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No upcoming therapies</p>
                    <Button className="mt-4" asChild>
                      <Link to="/book-therapy">Book Your First Therapy</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tracking */}
          <TabsContent value="progress">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="wellness-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <span>Treatment Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Panchakarma Sessions</span>
                        <span>{progressStats.therapies_completed}/{progressStats.total_therapies}</span>
                      </div>
                      <Progress value={(progressStats.therapies_completed / progressStats.total_therapies) * 100} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Emotional Well-being</span>
                        <span>{progressStats.emotional_health}%</span>
                      </div>
                      <Progress value={progressStats.emotional_health} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Daily Activities</span>
                        <span>{Math.round(activityProgress)}%</span>
                      </div>
                      <Progress value={activityProgress} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="wellness-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-accent" />
                    <span>Emotional Tracking</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <p className="text-muted-foreground mb-4">Track your emotional journey</p>
                    <Button variant="outline" asChild>
                      <Link to="/chat">Chat with ArogyaMitra</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Ayurveda Store */}
          <TabsContent value="store">
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  <span>Recommended Products</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Discover personalized Ayurveda products for your wellness journey
                  </p>
                  <Button asChild>
                    <Link to="/store">Explore Store</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="wellness-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" size="lg" className="h-20 flex flex-col space-y-2" asChild>
                <Link to="/chat">
                  <Bot className="w-6 h-6" />
                  <span>Chat with ArogyaMitra</span>
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="h-20 flex flex-col space-y-2" asChild>
                <Link to="/knowledge">
                  <BookOpen className="w-6 h-6" />
                  <span>Knowledge Hub</span>
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="h-20 flex flex-col space-y-2" asChild>
                <Link to="/store">
                  <ShoppingCart className="w-6 h-6" />
                  <span>Ayurveda Store</span>
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="h-20 flex flex-col space-y-2" asChild>
                <Link to="/book-therapy">
                  <Calendar className="w-6 h-6" />
                  <span>Book Therapy</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;