import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Store from "./pages/Store";
// import Home from "./pages/Home";
import Features from "./pages/Features";
import BookTherapy from "./pages/BookTherapy";
import KnowledgeHub from "./pages/KnowledgeHub";
import Chat from "./pages/Chat";
import Navbar from "./components/Navbar";
import HealthQuestionnaire from "@/pages/HealthQuestionnaire";
import NotFound from "./pages/NotFound";
// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";

// export default App;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/features" element={<Features />} />
          <Route path="/book" element={<BookTherapy />} />
          <Route path="/progress" element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
        <Route path="/book-therapy" element={<BookTherapy />} />
{/*           <Route path="/book-therapy" element={<BookTherapy />} /> */}
          <Route path="/store" element={<Store />} />
          <Route path="/knowledge" element={<KnowledgeHub />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/questionnaire" element={<HealthQuestionnaire />} />
{/*         <Route path="/" element={<Features />} /> */}
{/*         <Route path="/features" element={<Features />} /> */}
         <Route path="/health-questionnaire" element={<HealthQuestionnaire />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
