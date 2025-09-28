import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Calendar, 
  Users, 
  AlertTriangle, 
  TrendingUp,
  Clock,
  Heart,
  Send,
  Filter,
  Search,
  BarChart3,
  User
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  last_session?: string;
  emotional_status?: 'positive' | 'neutral' | 'negative';
  recent_emotions?: string[];
}

interface TherapySession {
  id: string;
  patient_name: string;
  therapy_type: string;
  scheduled_date: string;
  scheduled_time: string;
  status: string;
  patient_id: string;
}

interface SentimentAlert {
  patient_id: string;
  patient_name: string;
  negative_count: number;
  last_negative_date: string;
}

const PractitionerDashboard = () => {
  const [upcomingSessions, setUpcomingSessions] = useState<TherapySession[]>([]);
  const [patientsNeedingAttention, setPatientsNeedingAttention] = useState<Patient[]>([]);
  const [sentimentAlerts, setSentimentAlerts] = useState<SentimentAlert[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [guidanceMessage, setGuidanceMessage] = useState({
    title: '',
    content: ''
  });
  const [stats, setStats] = useState({
    total_patients: 0,
    todays_sessions: 0,
    pending_alerts: 0,
    positive_trends: 0
  });
  
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      // Fetch upcoming sessions
      const { data: sessions } = await supabase
        .from('therapy_sessions')
        .select(`
          id,
          therapy_type,
          scheduled_date,
          scheduled_time,
          status,
          patient_id
        `)
        .eq('practitioner_id', user.data.user.id)
        .gte('scheduled_date', new Date().toISOString().split('T')[0])
        .order('scheduled_date', { ascending: true })
        .limit(5);

      const formattedSessions = sessions?.map(session => ({
        ...session,
        patient_name: 'Patient Name' // Simplified for now
      })) || [];

      setUpcomingSessions(formattedSessions);

      // Fetch sentiment alerts (patients with repeated negative emotions)
      const { data: emotionalLogs } = await supabase
        .from('emotional_logs')
        .select(`
          user_id,
          emotion,
          logged_at
        `)
        .in('emotion', ['sad', 'anxious', 'frustrated', 'angry', 'depressed'])
        .gte('logged_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
        .order('logged_at', { ascending: false });

      // Group by patient and count negative emotions
      const patientEmotions = emotionalLogs?.reduce((acc, log) => {
        const patientId = log.user_id;
        if (!acc[patientId]) {
          acc[patientId] = {
            patient_id: patientId,
            patient_name: 'Patient Name', // Simplified for now
            negative_count: 0,
            last_negative_date: log.logged_at
          };
        }
        acc[patientId].negative_count += 1;
        return acc;
      }, {} as Record<string, SentimentAlert>) || {};

      const alerts = Object.values(patientEmotions)
        .filter(alert => alert.negative_count >= 3)
        .sort((a, b) => b.negative_count - a.negative_count);

      setSentimentAlerts(alerts);

      // Update stats
      setStats({
        total_patients: new Set(sessions?.map(s => s.patient_id) || []).size,
        todays_sessions: formattedSessions.filter(s => 
          s.scheduled_date === new Date().toISOString().split('T')[0]
        ).length,
        pending_alerts: alerts.length,
        positive_trends: Math.max(0, 5 - alerts.length) // Mock positive trends
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const sendGuidance = async () => {
    if (!selectedPatient || !guidanceMessage.title || !guidanceMessage.content) {
      toast({
        title: "Error",
        description: "Please select a patient and fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      const { error } = await supabase
        .from('practitioner_guidance')
        .insert({
          practitioner_id: user.data.user.id,
          patient_id: selectedPatient,
          title: guidanceMessage.title,
          content: guidanceMessage.content
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Guidance sent to patient successfully."
      });

      setGuidanceMessage({ title: '', content: '' });
      setSelectedPatient('');
    } catch (error) {
      console.error('Error sending guidance:', error);
      toast({
        title: "Error",
        description: "Failed to send guidance. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Practitioner Dashboard</h1>
            <p className="text-muted-foreground">Monitor and guide your patients' wellness journey</p>
          </div>
          <Button>
            <Calendar className="w-4 h-4 mr-2" />
            View Calendar
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="wellness-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                  <p className="text-2xl font-bold">{stats.total_patients}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="wellness-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Today's Sessions</p>
                  <p className="text-2xl font-bold">{stats.todays_sessions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="wellness-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sentiment Alerts</p>
                  <p className="text-2xl font-bold">{stats.pending_alerts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="wellness-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Positive Trends</p>
                  <p className="text-2xl font-bold">{stats.positive_trends}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sessions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sessions">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="alerts">Sentiment Alerts</TabsTrigger>
            <TabsTrigger value="trends">Emotional Trends</TabsTrigger>
            <TabsTrigger value="guidance">Send Guidance</TabsTrigger>
          </TabsList>

          {/* Upcoming Sessions */}
          <TabsContent value="sessions">
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>Upcoming Patient Sessions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingSessions.length > 0 ? (
                  upcomingSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{session.patient_name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {session.therapy_type} • {new Date(session.scheduled_date).toLocaleDateString()} at {session.scheduled_time}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{session.status}</Badge>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No upcoming sessions today</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sentiment Alerts */}
          <TabsContent value="alerts">
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  <span>Patients Needing Attention</span>
                  <Badge variant="secondary">{sentimentAlerts.length} alerts</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sentimentAlerts.length > 0 ? (
                  sentimentAlerts.map((alert) => (
                    <div key={alert.patient_id} className="flex items-center justify-between p-4 border border-warning/20 bg-warning/5 rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{alert.patient_name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {alert.negative_count} negative emotions in the last 7 days
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last: {new Date(alert.last_negative_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="destructive">{alert.negative_count} alerts</Badge>
                        <Button size="sm" onClick={() => setSelectedPatient(alert.patient_id)}>
                          Send Guidance
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Heart className="w-12 h-12 text-success mx-auto mb-4" />
                    <p className="text-muted-foreground">All patients are doing well emotionally! 🎉</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emotional Trends */}
          <TabsContent value="trends">
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span>Emotional Trends Graph</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Emotional trends visualization will be displayed here
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Track patient emotional journeys from negative to positive states
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Send Guidance */}
          <TabsContent value="guidance">
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Send className="w-5 h-5 text-primary" />
                  <span>Send Custom Guidance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="patient-select">Select Patient</Label>
                  <select
                    id="patient-select"
                    className="w-full p-2 border rounded-md bg-background"
                    value={selectedPatient}
                    onChange={(e) => setSelectedPatient(e.target.value)}
                  >
                    <option value="">Choose a patient...</option>
                    {sentimentAlerts.map((alert) => (
                      <option key={alert.patient_id} value={alert.patient_id}>
                        {alert.patient_name} ({alert.negative_count} alerts)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guidance-title">Guidance Title</Label>
                  <Input
                    id="guidance-title"
                    placeholder="e.g., Breathing Exercise for Anxiety"
                    value={guidanceMessage.title}
                    onChange={(e) => setGuidanceMessage(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guidance-content">Guidance Content</Label>
                  <Textarea
                    id="guidance-content"
                    placeholder="Provide personalized guidance, tips, or recommendations for the patient..."
                    rows={5}
                    value={guidanceMessage.content}
                    onChange={(e) => setGuidanceMessage(prev => ({ ...prev, content: e.target.value }))}
                  />
                </div>

                <Button onClick={sendGuidance} className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Send Guidance to Patient
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PractitionerDashboard;