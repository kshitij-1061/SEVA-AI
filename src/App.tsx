import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SevaAIProvider } from "./context/SevaAIContext";
import { ReportProvider } from "./context/ReportContext";
import { VisionProvider } from "./context/VisionContext";
import { ServiceProvider } from "./context/ServiceContext";
import { MapProvider } from "./context/MapContext";
import { DemoBanner } from "./components/DemoBanner";
import { DemoRoleSwitcher } from "./components/DemoRoleSwitcher";
import { Navbar } from "./components/Navbar";
import { AuthModal } from "./components/AuthModal";
import { ToastNotification } from "./components/ToastNotification";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Footer } from "./components/Footer";

// Pages
import { LandingPage } from "./pages/LandingPage";
import { SevaAIPage } from "./pages/SevaAIPage";
import { ReportIssuePage } from "./pages/ReportIssuePage";
import { ReportDetailsPage } from "./pages/ReportDetailsPage";
import { ImageAnalyzerPage } from "./pages/ImageAnalyzerPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ServiceDetailsPage } from "./pages/ServiceDetailsPage";
import { MyReportsPage } from "./pages/MyReportsPage";
import { CivicMapPage } from "./pages/CivicMapPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { DeptDashboardPage } from "./pages/DeptDashboardPage";
import { ImpactAnalyticsPage } from "./pages/ImpactAnalyticsPage";

export const AppContent: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "register">("login");

  const handleOpenAuth = (mode: "login" | "register" = "login") => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white font-sans">
      {/* Top Hackathon Notices & Quick Role Switcher */}
      <DemoBanner />
      <DemoRoleSwitcher />

      {/* Main Navigation */}
      <Navbar onOpenAuth={handleOpenAuth} />

      {/* App Body Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage onOpenAuth={handleOpenAuth} />} />
          <Route path="/ai" element={<SevaAIPage />} />
          <Route path="/report-issue" element={<ReportIssuePage />} />
          <Route path="/report" element={<ReportIssuePage />} />
          <Route path="/report/:reportId" element={<ReportDetailsPage />} />
          <Route path="/vision" element={<ImageAnalyzerPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetailsPage />} />
          <Route path="/map" element={<CivicMapPage />} />

          {/* Citizen Protected Routes */}
          <Route
            path="/my-reports"
            element={
              <ProtectedRoute allowedRoles={["citizen", "admin", "department"]}>
                <MyReportsPage />
              </ProtectedRoute>
            }
          />

          {/* User Profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/impact"
            element={
              <ProtectedRoute allowedRoles={["citizen", "admin", "department"]}>
                <ImpactAnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/analytics" element={<Navigate to="/impact" replace />} />

          {/* Department Officer Protected Routes */}
          <Route
            path="/department"
            element={
              <ProtectedRoute allowedRoles={["department", "admin"]}>
                <DeptDashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Auth Modal & Toast Feeds */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <SevaAIProvider>
        <ReportProvider>
          <VisionProvider>
            <ServiceProvider>
              <MapProvider>
                <BrowserRouter>
                  <AppContent />
                </BrowserRouter>
              </MapProvider>
            </ServiceProvider>
          </VisionProvider>
        </ReportProvider>
      </SevaAIProvider>
    </AuthProvider>
  );
}
