import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './components/layout/Homepage.jsx';
import RegisterForm from './components/auth/RegisterForm.jsx';
import LoginForm from './components/auth/LoginForm.jsx';
import OTPVerification from './components/auth/OTPVerification';
import Dashboard from './components/dashboard/Dashboard';
import PaymentForm from './components/payment/PaymentForm.jsx';
import TransactionList from './components/dashboard/TransactionList';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/verify-otp" element={<OTPVerification />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/payment" 
            element={
              <ProtectedRoute>
                <PaymentForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transactions" 
            element={
              <ProtectedRoute>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                  <h1 className="text-2xl font-semibold text-gray-900 mb-6">Transaction History</h1>
                  <TransactionList />
                </div>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;