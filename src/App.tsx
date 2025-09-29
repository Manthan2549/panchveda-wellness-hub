// App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Store from "./pages/Store";
import Features from "./pages/Features";
import BookTherapy from "./pages/BookTherapy";
import KnowledgeHub from "./pages/KnowledgeHub";
import Chat from "./pages/Chat";
import Signup from "./pages/Signup";
import PatientDashboard from "./pages/PatientDashboard";
import PractitionerDashboard from "./pages/PractitionerDashboard";
import AuthWrapper from "./components/AuthWrapper";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* ✅ Toast notifications */}
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <AuthWrapper>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected Routes */}
            <Route path="/patient-dashboard" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PatientDashboard />
              </ProtectedRoute>
            } />
            <Route path="/practitioner-dashboard" element={
              <ProtectedRoute allowedRoles={['practitioner']}>
                <PractitionerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/book" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <BookTherapy />
              </ProtectedRoute>
            } />
            <Route path="/store" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <Store />
              </ProtectedRoute>
            } />
            <Route path="/chat" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <Chat />
              </ProtectedRoute>
            } />
            
            {/* Legacy routes - redirect to dashboard */}
            <Route path="/dashboard" element={<PatientDashboard />} />
            <Route path="/features" element={<Features />} />
            <Route path="/knowledge" element={<KnowledgeHub />} />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthWrapper>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
