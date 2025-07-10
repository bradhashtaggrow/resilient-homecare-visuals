
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAdvancedAnalytics } from "@/hooks/useAdvancedAnalytics";
import ProtectedRoute from "@/components/ProtectedRoute";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import RequestDemo from "./pages/RequestDemo";
import NotFound from "./pages/NotFound";
import CareAtHome from "./pages/CareAtHome";
import Clinicians from "./pages/Clinicians";
import Patients from "./pages/Patients";
import News from "./pages/News";
import About from "./pages/About";
import Contact from "./pages/Contact";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        console.warn('Query failed:', error);
        return failureCount < 2; // Reduce retries
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function AppContent() {
  // Initialize advanced analytics tracking with error boundary
  try {
    useAdvancedAnalytics();
  } catch (error) {
    console.error('Analytics initialization failed:', error);
  }

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/request-demo" element={<RequestDemo />} />
        <Route path="/care-at-home" element={<CareAtHome />} />
        <Route path="/clinicians" element={<Clinicians />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={
          <ErrorBoundary fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Admin Dashboard Error</h2>
                <p className="text-gray-600 mb-4">The admin dashboard encountered an error.</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Reload Page
                </button>
              </div>
            </div>
          }>
            <ProtectedRoute requireAdmin={true}>
              <Admin />
            </ProtectedRoute>
          </ErrorBoundary>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}

const App = () => (
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

export default App;
