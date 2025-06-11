import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import { Analytics } from "@vercel/analytics/react";
import Footer from './components/Footer';
import LoginPage from './components/routes/Login';
import AdminDashboard from './components/routes/Admin';
import Sections from './components/sections';

const App: React.FC = () => {
  // Handle initial scroll position on mount
  React.useEffect(() => {
    const scrollToHashSection = () => {
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.substring(1);
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
          const scrollContainer = document.querySelector('.h-screen.overflow-y-scroll') as HTMLElement;
          if (scrollContainer) {
            const headerHeight = 80;
            const offsetTop = targetElement.offsetTop - headerHeight;
            // Use setTimeout to ensure DOM is fully rendered
            setTimeout(() => {
              scrollContainer.scrollTo({
                top: offsetTop,
                behavior: 'instant' // Use instant for initial load to prevent flash
              });
            }, 50);
          }
        }
      }
    };

    // Run after component mounts and DOM is ready
    scrollToHashSection();
  }, []);

  return (
    <>
      <Analytics />
    <ThemeProvider>
      <AuthProvider>
        <Router
      
        >
          <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-theme-background">
            <Routes>
              <Route path="/" element={
                <>
                  <Header />
                  <Sections />
                  <Footer />
                </>
              } />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={ <AdminDashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
    </>
  );
};

export default App;
