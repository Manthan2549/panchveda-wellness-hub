import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MessageCircle, ShoppingBag, TrendingUp, Heart, Brain } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const PatientDashboard = () => {
  // Dummy data for patient dashboard
  const upcomingAppointments = [
    {
      id: 1,
      practitioner: "Dr. Acharya Sharma",
      therapy: "Abhyanga",
      date: "Tomorrow",
      time: "10:00 AM",
      status: "confirmed"
    },
    {
      id: 2,
      practitioner: "Dr. Priya Nair",
      therapy: "Shirodhara",
      date: "Next Week",
      time: "2:30 PM",
      status: "pending"
    }
  ];

  const todaySchedule = [
    { time: "7:00 AM", activity: "Morning Meditation", completed: true },
    { time: "8:00 AM", activity: "Herbal Tea (Tulsi)", completed: true },
    { time: "12:00 PM", activity: "Pranayama (15 mins)", completed: false },
    { time: "6:00 PM", activity: "Evening Walk", completed: false },
    { time: "9:00 PM", activity: "Oil Massage", completed: false }
  ];

  const progressMetrics = [
    { label: "Stress Level", value: 25, target: 20, trend: "down" },
    { label: "Sleep Quality", value: 85, target: 90, trend: "up" },
    { label: "Energy Level", value: 75, target: 80, trend: "up" },
    { label: "Overall Wellness", value: 70, target: 85, trend: "stable" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-emerald-800">Welcome, Priya</h1>
            <p className="text-emerald-600 mt-1">Your wellness journey continues today</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat with ArogyaMitra
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-800">2</div>
              <p className="text-xs text-emerald-600">Next: Tomorrow 10 AM</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">60%</div>
              <p className="text-xs text-blue-600">3 of 5 activities completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wellness Score</CardTitle>
              <Heart className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-800">7.8</div>
              <p className="text-xs text-red-600">+0.5 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mood Today</CardTitle>
              <Brain className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">Good</div>
              <p className="text-xs text-purple-600">Track your emotions</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Wellness Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="text-emerald-800">Today's Wellness Schedule</CardTitle>
              <CardDescription>AI-generated daily wellness activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {todaySchedule.map((item, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${item.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${item.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <div>
                      <div className="font-medium text-gray-900">{item.activity}</div>
                      <div className="text-sm text-gray-600">{item.time}</div>
                    </div>
                  </div>
                  {!item.completed && (
                    <Button size="sm" variant="outline">Mark Done</Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-emerald-800">Upcoming Therapy Sessions</CardTitle>
              <CardDescription>Your scheduled appointments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="p-4 border rounded-lg bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-900">{appointment.practitioner}</div>
                    <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                      {appointment.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>{appointment.therapy}</div>
                    <div>{appointment.date} at {appointment.time}</div>
                  </div>
                  <Button size="sm" className="mt-2 bg-emerald-600 hover:bg-emerald-700">
                    View Details
                  </Button>
                </div>
              ))}
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Calendar className="w-4 h-4 mr-2" />
                Book New Session
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Progress Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="text-emerald-800">Progress Tracking</CardTitle>
            <CardDescription>Your wellness metrics over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {progressMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-900">{metric.label}</span>
                    <span className="text-gray-600">{metric.value}%</span>
                  </div>
                  <Progress value={metric.value} className="h-2" />
                  <div className="text-xs text-gray-500">
                    Target: {metric.target}% • {metric.trend === 'up' ? '↗️' : metric.trend === 'down' ? '↘️' : '→'} {metric.trend}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">ArogyaMitra Chat</h3>
              <p className="text-sm text-gray-600">Get emotional support and guidance</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <ShoppingBag className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Ayurveda Store</h3>
              <p className="text-sm text-gray-600">Browse wellness products</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <Brain className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Mood Tracker</h3>
              <p className="text-sm text-gray-600">Log your daily emotions</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;