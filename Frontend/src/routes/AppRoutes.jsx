import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../pages/MainLayout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import ProfilePage from '../pages/ProfilePage';
import BookRidePage from '../pages/BookRidePage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AllRidesPage from '../pages/AllRidesPage';
import RideRequest from '../pages/RideRequest';
import OnboardRequests from '../pages/admin/OnboardRequestsPage.jsx';
import RequestDriver from '../pages/RequestDriver.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Wrap main pages in MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="book-ride" element={<BookRidePage />} />
        <Route path="all-rides" element={<AllRidesPage />} />
        <Route path="ride-request" element={<RideRequest />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="manage-request" element={<OnboardRequests />} />
        <Route path="request-driver" element={<RequestDriver />} />
      </Route>

      {/* Admin Dashboard with separate layout */}


      {/* Catch-all route for undefined pages */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
