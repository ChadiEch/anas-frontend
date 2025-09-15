import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProjectEditor from "./pages/ProjectEditor";
import AboutEditor from "./pages/AboutEditor";
import TechEditor from "./pages/TechEditor";
import HomepageEditor from "./pages/HomepageEditor";
import ContactEditor from "./pages/ContactEditor";
import ContactSubmissions from "./pages/ContactSubmissions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/homepage" element={<HomepageEditor />} />
            <Route path="/dashboard/projects" element={<ProjectEditor />} />
            <Route path="/dashboard/about" element={<AboutEditor />} />
            <Route path="/dashboard/technologies" element={<TechEditor />} />
            <Route path="/dashboard/contact" element={<ContactEditor />} />
            <Route path="/dashboard/contact/submissions" element={<ContactSubmissions />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;