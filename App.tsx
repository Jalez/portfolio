import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Home from './components/Home';

import Footer from './components/Footer';
import LoginPage from './components/Login';
import AdminDashboard from './components/AdminDashboard';



// Admin Route component
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // This will be handled by the AdminDashboard component itself
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-theme-background">
            <Routes>
              <Route path="/" element={
                <>
                  <Header />
                  <Home />
                  <Footer />
                </>
              } />
              <Route path="/login" element={<LoginPage />} />
              <Route 
                path="/admin" 
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } 
              />
              {/* Catch all route - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
