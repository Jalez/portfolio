import React, { useState, useEffect } from 'react';
import { NavLink } from '../types';
import { NAV_LINKS } from '../data';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const { theme, toggleTheme } = useTheme();

  // Update underline position when active section changes
  useEffect(() => {
    const updateUnderlinePosition = () => {
      const activeIndex = NAV_LINKS.findIndex(link => link.href.substring(1) === activeSection);
      const navContainer = document.querySelector('[data-nav-container]');
      const activeLink = navContainer?.children[activeIndex + 1] as HTMLElement; // +1 because first child is the underline
      
      if (activeLink && navContainer) {
        const containerRect = navContainer.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        
        setUnderlineStyle({
          left: linkRect.left - containerRect.left,
          width: linkRect.width
        });
      }
    };

    // Small delay to ensure DOM is ready
    setTimeout(updateUnderlinePosition, 50);
  }, [activeSection]);

  useEffect(() => {
    const scrollContainer = document.querySelector('.h-screen.overflow-y-scroll') as HTMLElement;
    
    const handleScroll = () => {
      const scrollY = scrollContainer?.scrollTop || window.scrollY;
      
      // Check which section is currently in view
      const sections = ['hero', 'skills', 'projects', 'testimonial-form', 'testimonials', 'contact'];
      const headerHeight = 80;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop - headerHeight - 100;
          if (scrollY >= sectionTop) {
            if (activeSection !== sections[i]) {
              setActiveSection(sections[i]);
              const newHash = `#${sections[i]}`;
              if (window.location.hash !== newHash) {
                window.history.replaceState(null, '', newHash);
              }
            }
            break;
          }
        }
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [activeSection]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault(); // Prevent default anchor behavior
    
    const targetId = href.substring(1); // Remove the # symbol
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Get the scroll container (the main app div)
      const scrollContainer = document.querySelector('.h-screen.overflow-y-scroll') as HTMLElement;
      
      if (scrollContainer) {
        // Calculate offset to account for fixed header
        const headerHeight = 80;
        const offsetTop = targetElement.offsetTop - headerHeight;
        
        // Scroll the container instead of the window
        scrollContainer.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      } else {
        // Fallback to window scrolling if container not found
        const headerHeight = 80;
        const offsetTop = targetElement.offsetTop - headerHeight;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
      
      // Update active section and URL hash
      setActiveSection(targetId);
      window.history.pushState(null, '', href);
    }
    
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent py-5">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="text-3xl font-bold text-theme-primary hover:text-gray-300 transition-colors">
          Jaakko Rajala
        </a>
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-6 relative" data-nav-container>
            {/* Moving underline that follows the active tab */}
            <div 
              className="absolute bottom-0 h-0.5 bg-theme-primary transition-all duration-300 ease-out rounded-full"
              style={{
                left: `${underlineStyle.left}px`,
                width: `${underlineStyle.width}px`,
                opacity: underlineStyle.width > 0 ? 1 : 0,
                backgroundColor: 'var(--text-primary)'
              }}
            />
            {NAV_LINKS.map((link: NavLink, index: number) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a 
                  key={`${link.href}-${index}`}
                  href={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-theme-secondary hover:text-theme-primary transition-colors font-medium text-lg relative px-3 py-2 ${
                    isActive ? 'text-theme-primary' : ''
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-theme-secondary/20 transition-colors duration-300 text-theme-primary"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              // Sun icon for light mode
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            ) : (
              // Moon icon for dark mode
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            )}
          </button>

          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu} 
              className="text-theme-primary focus:outline-none p-2 rounded-md hover:bg-white/20 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-card/95 backdrop-blur-sm shadow-lg py-4">
          <nav className="flex flex-col items-center space-y-5">
            {NAV_LINKS.map((link: NavLink, index: number) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a 
                  key={`${link.href}-${index}`}
                  href={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-theme-secondary hover:text-theme-primary transition-colors font-medium text-xl ${
                    isActive ? 'text-theme-primary' : ''
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
