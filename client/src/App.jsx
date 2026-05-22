import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Pages
import Login from './pages/Login';
<<<<<<< HEAD
import Dashboard from './pages/Dashboard.jsx';
=======
import Dashboard from './pages/Dashboard';
>>>>>>> 1d48f48e2e39823c8e88aae47a8e413e700c9488
import Customers from './pages/Customers';
import Activities from './pages/Activities';
import Opportunities from './pages/Opportunities';
import Leads from './pages/Leads';
import Campaigns from './pages/Campaigns';

<<<<<<< HEAD
import {
  SalesRepDashboard,
  SalesManagerDashboard,
  AccountManagerDashboard,
  MarketingDashboard,
  ProductManagerDashboard,
  ExecutiveDashboard,
} from './pages/dashboard/index.js';


=======
>>>>>>> 1d48f48e2e39823c8e88aae47a8e413e700c9488
const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <div className="flex flex-col h-screen bg-gray-50">
              <Navbar />
              <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-auto">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
<<<<<<< HEAD
                    <Route path="/dashboard/sales-rep" element={<SalesRepDashboard />} />
                    <Route path="/dashboard/sales-manager" element={<SalesManagerDashboard />} />
                    <Route path="/dashboard/account-manager" element={<AccountManagerDashboard />} />
                    <Route path="/dashboard/marketing" element={<MarketingDashboard />} />
                    <Route path="/dashboard/product" element={<ProductManagerDashboard />} />
                    <Route path="/dashboard/executive" element={<ExecutiveDashboard />} />
=======
>>>>>>> 1d48f48e2e39823c8e88aae47a8e413e700c9488
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/activities" element={<Activities />} />
                    <Route path="/opportunities" element={<Opportunities />} />
                    <Route path="/leads" element={<Leads />} />
                    <Route path="/campaigns" element={<Campaigns />} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </main>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
