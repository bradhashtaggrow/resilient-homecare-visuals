
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";

import ProtectedRoute from "@/components/ProtectedRoute";
import PageGuard from "@/components/PageGuard";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import RequestDemo from "./pages/RequestDemo";
import NotFound from "./pages/NotFound";
import CareAtHome from "./pages/CareAtHome";
import HealthSystems from "./pages/HealthSystems";
import Clinicians from "./pages/Clinicians";
import Patients from "./pages/Patients";
import News from "./pages/News";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import HIPAACompliance from "./pages/HIPAACompliance";
import DataSecurity from "./pages/DataSecurity";

const queryClient = new QueryClient();

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<PageGuard><Index /></PageGuard>} />
      <Route path="/login" element={<Login />} />
      <Route path="/request-demo" element={<RequestDemo />} />
      <Route path="/care-at-home" element={<PageGuard><CareAtHome /></PageGuard>} />
      <Route path="/health-systems" element={<PageGuard><HealthSystems /></PageGuard>} />
      <Route path="/clinicians" element={<PageGuard><Clinicians /></PageGuard>} />
      <Route path="/patients" element={<PageGuard><Patients /></PageGuard>} />
      <Route path="/news" element={<PageGuard><News /></PageGuard>} />
      <Route path="/about" element={<PageGuard><About /></PageGuard>} />
      <Route path="/contact" element={<PageGuard><Contact /></PageGuard>} />
      <Route path="/privacy-policy" element={<PageGuard><PrivacyPolicy /></PageGuard>} />
      <Route path="/terms-of-service" element={<PageGuard><TermsOfService /></PageGuard>} />
      <Route path="/hipaa-compliance" element={<PageGuard><HIPAACompliance /></PageGuard>} />
      <Route path="/data-security" element={<PageGuard><DataSecurity /></PageGuard>} />
      <Route path="/admin" element={
        <ProtectedRoute requireAdmin={true}>
          <Admin />
        </ProtectedRoute>
      } />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const App = () => (
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
);

export default App;
