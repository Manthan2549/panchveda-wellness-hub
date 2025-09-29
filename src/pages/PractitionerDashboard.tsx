import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, TrendingDown, TrendingUp, AlertTriangle, Users, MessageCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const PractitionerDashboard = () => {
  // Dummy data for practitioner dashboard
  const upcomingAppointments = [
    {
      id: 1,
      patientName: "Priya Sharma",
      time: "10:00 AM",
      date: "Today",
      therapy: "Abhyanga",
      status: "confirmed"
    },
    {
      id: 2,
      patientName: "Rajesh Kumar",
      time: "2:30 PM",
      date: "Today",
      therapy: "Shirodhara",
      status: "pending"
    },
    {
      id: 3,
      patientName: "Anita Verma",
      time: "11:00 AM",
      date: "Tomorrow",
      therapy: "Panchakarma",
      status: "confirmed"
    }
  ];

  const patientsNeedingAttention = [
    {
      id: 1,
      name: "Vikram Singh",
      lastSession: "2 days ago",
      concern: "Reported increased anxiety",
      severity: "high"
    },
    {
      id: 2,
      name: "Meera Patel",
      lastSession: "1 week ago",
      concern: "Missed last appointment",
      severity: "medium"
    },
    {
      id: 3,
      name: "Arjun Nair",
      lastSession: "3 days ago",
      concern: "Treatment not showing progress",
      severity: "high"
    }
  ];

  const emotionalTrends = [
    { name: "Priya Sharma", trend: "positive", improvement: 85 },
    { name: "Rajesh Kumar", trend: "stable", improvement: 60 },
    { name: "Anita Verma", trend: "positive", improvement: 90 },
    { name: "Vikram Singh", trend: "negative", improvement: 30 },
  ];

  const sentimentAlerts = [
    {
      patient: "Vikram Singh",
      emotion: "Stress, Anxiety",
      frequency: "Daily (5 days)",
      lastLogged: "2 hours ago"
    },
    {
      patient: "Deepak Raj",
      emotion: "Sadness, Fatigue",
      frequency: "Daily (3 days)",
      lastLogged: "1 day ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-emerald-800">Practitioner Dashboard</h1>
            <p className="text-emerald-600 mt-1">Welcome back, Dr. Acharya</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <MessageCircle className="w-4 h-4 mr-2" />
            Send Guidance
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-800">8</div>
              <p className="text-xs text-emerald-600">2 pending confirmation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">24</div>
              <p className="text-xs text-blue-600">3 need attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Positive Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">18</div>
              <p className="text-xs text-green-600">75% improvement rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-800">2</div>
              <p className="text-xs text-red-600">Require immediate attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-emerald-800">
                <Clock className="w-5 h-5 mr-2" />
                Upcoming Appointments
              </CardTitle>
              <CardDescription>Today's and tomorrow's scheduled sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg bg-white">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{appointment.patientName}</div>
                    <div className="text-sm text-gray-600">
                      {appointment.therapy} • {appointment.date} at {appointment.time}
                    </div>
                  </div>
                  <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                    {appointment.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Patients Needing Attention */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-red-800">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Patients Needing Attention
              </CardTitle>
              <CardDescription>Patients with concerns or requiring follow-up</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {patientsNeedingAttention.map((patient) => (
                <div key={patient.id} className="p-3 border rounded-lg bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-900">{patient.name}</div>
                    <Badge variant={patient.severity === 'high' ? 'destructive' : 'secondary'}>
                      {patient.severity}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>{patient.concern}</div>
                    <div className="text-xs mt-1">Last session: {patient.lastSession}</div>
                  </div>
                  <Button size="sm" className="mt-2 bg-emerald-600 hover:bg-emerald-700">
                    Send Guidance
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sentiment Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-orange-800">
                <TrendingDown className="w-5 h-5 mr-2" />
                Sentiment Alerts
              </CardTitle>
              <CardDescription>Patients with repeated negative emotions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {sentimentAlerts.map((alert, index) => (
                <div key={index} className="p-3 border rounded-lg bg-orange-50">
                  <div className="font-medium text-gray-900">{alert.patient}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    <div><strong>Emotions:</strong> {alert.emotion}</div>
                    <div><strong>Frequency:</strong> {alert.frequency}</div>
                    <div><strong>Last logged:</strong> {alert.lastLogged}</div>
                  </div>
                  <Button size="sm" variant="outline" className="mt-2">
                    View Details
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Emotional Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-800">
                <TrendingUp className="w-5 h-5 mr-2" />
                Emotional Progress Trends
              </CardTitle>
              <CardDescription>Patient emotional well-being improvements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {emotionalTrends.map((patient, index) => (
                <div key={index} className="p-3 border rounded-lg bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-900">{patient.name}</div>
                    <div className="flex items-center">
                      {patient.trend === 'positive' && <TrendingUp className="w-4 h-4 text-green-600" />}
                      {patient.trend === 'negative' && <TrendingDown className="w-4 h-4 text-red-600" />}
                      {patient.trend === 'stable' && <div className="w-4 h-4 bg-yellow-400 rounded-full" />}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    Improvement: {patient.improvement}%
                  </div>
                  <Progress value={patient.improvement} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PractitionerDashboard;