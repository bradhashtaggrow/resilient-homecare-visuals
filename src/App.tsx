import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import ErrorBoundary from "@/components/ErrorBoundary";
import SafeComponent from "@/components/SafeComponent";
import Index from "@/pages/Index";
import About from "@/pages/About";
import CareAtHome from "@/pages/CareAtHome";
import Clinicians from "@/pages/Clinicians";
import Patients from "@/pages/Patients";
import Contact from "@/pages/Contact";
import RequestDemo from "@/pages/RequestDemo";
import Admin from "@/pages/Admin";
import Login from "@/pages/Login";
import News from "@/pages/News";
import NotFound from "@/pages/NotFound";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const AppContent = () => {
  console.log('AppContent rendering');
  
  return (
    <Routes>
      <Route path="/" element={
        <SafeComponent>
          <Index />
        </SafeComponent>
      } />
      <Route path="/about" element={
        <SafeComponent>
          <About />
        </SafeComponent>
      } />
      <Route path="/care-at-home" element={
        <SafeComponent>
          <CareAtHome />
        </SafeComponent>
      } />
      <Route path="/clinicians" element={
        <SafeComponent>
          <Clinicians />
        </SafeComponent>
      } />
      <Route path="/patients" element={
        <SafeComponent>
          <Patients />
        </SafeComponent>
      } />
      <Route path="/contact" element={
        <SafeComponent>
          <Contact />
        </SafeComponent>
      } />
      <Route path="/request-demo" element={
        <SafeComponent>
          <RequestDemo />
        </SafeComponent>
      } />
      <Route path="/news" element={
        <SafeComponent>
          <News />
        </SafeComponent>
      } />
      <Route path="/login" element={
        <SafeComponent>
          <Login />
        </SafeComponent>
      } />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <SafeComponent>
              <Admin />
            </SafeComponent>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={
        <SafeComponent>
          <NotFound />
        </SafeComponent>
      } />
    </Routes>
  );
};

const App = () => {
  console.log('App rendering');
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;