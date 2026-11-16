import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public Pages
import HomePage from './pages/HomePage';
import ProgramsPage from './pages/ProgramsPage';
import ProgramDetailPage from './pages/ProgramDetailPage';
import WorkshopDetailPage from './pages/WorkshopDetailPage';
import IndustryVisitsPage from './pages/IndustryVisitsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Participant Pages & Layout
import ParticipantLayout from './components/participant/ParticipantLayout';
import DashboardOverview from './pages/participant/DashboardOverview';
import MyPrograms from './pages/participant/MyPrograms';
import MyWorkshops from './pages/participant/MyWorkshops';
import MyVisitRequests from './pages/participant/MyVisitRequests';
import NotificationsPage from './pages/participant/NotificationsPage';
import ProfilePage from './pages/participant/ProfilePage';

// Admin Pages & Layout
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPrograms from './pages/admin/AdminPrograms';
import AdminWorkshops from './pages/admin/AdminWorkshops';
import AdminRegistrations from './pages/admin/AdminRegistrations';
import AdminParticipants from './pages/admin/AdminParticipants';
import AdminVisitRequests from './pages/admin/AdminVisitRequests';
import AdminContactMessages from './pages/admin/AdminContactMessages';
import AdminSettings from './pages/admin/AdminSettings';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/programs/:slug" element={<ProgramDetailPage />} />
          <Route
            path="/programs/:programSlug/workshops/:workshopSlug"
            element={<WorkshopDetailPage />}
          />
          <Route path="/industry-visits" element={<IndustryVisitsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Participant Portal (Protected) */}
          <Route
            path="/participant"
            element={
              <ProtectedRoute>
                <ParticipantLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardOverview />} />
            <Route path="programs" element={<MyPrograms />} />
            <Route path="workshops" element={<MyWorkshops />} />
            <Route path="visits" element={<MyVisitRequests />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Admin Operations Intelligence Portal (Protected, Admin Only) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="programs" element={<AdminPrograms />} />
            <Route path="workshops" element={<AdminWorkshops />} />
            <Route path="registrations" element={<AdminRegistrations />} />
            <Route path="participants" element={<AdminParticipants />} />
            <Route path="visits" element={<AdminVisitRequests />} />
            <Route path="contact-messages" element={<AdminContactMessages />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

