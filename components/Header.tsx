import React, { useState, useEffect } from 'react';
import { NavLink } from '../types';
import { NAV_LINKS } from '../data';
import { useTheme } from '../contexts/ThemeContext';

// Icon components for mobile navigation
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);

const SkillsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
  </svg>
);

const ProjectsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
  </svg>
);

const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.935-2.186 2.25 2.25 0 0 0-3.935 2.186Z" />
  </svg>
);

const TestimonialsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
  </svg>
);

const ContactIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
);

// Map navigation sections to their corresponding icons
const getNavIcon = (href: string) => {
  const section = href.substring(1); // Remove the # symbol
  switch (section) {
    case 'hero':
      return <HomeIcon />;
    case 'skills':
      return <SkillsIcon />;
    case 'projects':
      return <ProjectsIcon />;
    case 'testimonial-form':
      return <ShareIcon />;
    case 'testimonials':
      return <TestimonialsIcon />;
    case 'contact':
      return <ContactIcon />;
    default:
      return <HomeIcon />;
  }
};

const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const [mobileUnderlineStyle, setMobileUnderlineStyle] = useState({ left: 0, width: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Update underline position when active section changes
  useEffect(() => {
    const updateUnderlinePosition = () => {
      const activeIndex = NAV_LINKS.findIndex(link => link.href.substring(1) === activeSection);
      
      // Desktop underline
      const navContainer = document.querySelector('[data-nav-container]');
      const activeLink = navContainer?.children[activeIndex + 1] as HTMLElement; // +1 because first child is the underline
      
      if (activeLink && navContainer && !isMobile) {
        const containerRect = navContainer.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        
        setUnderlineStyle({
          left: linkRect.left - containerRect.left,
          width: linkRect.width
        });
      }

      // Mobile underline
      const mobileNavContainer = document.querySelector('[data-mobile-nav-container]');
      const mobileActiveLink = mobileNavContainer?.children[activeIndex + 1] as HTMLElement; // +1 because first child is the underline
      
      if (mobileActiveLink && mobileNavContainer && isMobile) {
        const containerRect = mobileNavContainer.getBoundingClientRect();
        const linkRect = mobileActiveLink.getBoundingClientRect();
        
        setMobileUnderlineStyle({
          left: linkRect.left - containerRect.left,
          width: linkRect.width
        });
      }
    };

    // Small delay to ensure DOM is ready
    setTimeout(updateUnderlinePosition, 50);
  }, [activeSection, isMobile]);

  // Handle viewport changes - only trigger when crossing the breakpoint
  useEffect(() => {
    const checkViewport = () => {
      const newIsMobile = window.innerWidth < 768; // md breakpoint
      if (newIsMobile !== isMobile) {
        setIsMobile(newIsMobile);
        // Reset the underline styles when switching viewports
        if (newIsMobile) {
          setUnderlineStyle({ left: 0, width: 0 });
        } else {
          setMobileUnderlineStyle({ left: 0, width: 0 });
        }
      }
    };

    // Set initial state
    checkViewport();

    // Use a debounced resize handler to avoid excessive calls
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkViewport, 150);
    };

    window.addEventListener('resize', debouncedResize);
    
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [isMobile]);

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
  };


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-theme-primary">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center space-x-4">
          <nav className="hidden md:flex items-center space-x-6 relative" data-nav-container>
            {/* Moving underline that follows the active tab */}
            <div 
              className="absolute bottom-0 h-0.5 transition-all duration-300 ease-out rounded-full"
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
    
          {/* Mobile Navigation with Icons */}
          <div className="md:hidden flex items-center space-x-1 relative" data-mobile-nav-container>
            {/* Moving underline for mobile icons */}
            <div 
              className="absolute bottom-0 h-0.5 transition-all duration-300 ease-out rounded-full"
              style={{
                left: `${mobileUnderlineStyle.left}px`,
                width: `${mobileUnderlineStyle.width}px`,
                opacity: mobileUnderlineStyle.width > 0 ? 1 : 0,
                backgroundColor: 'var(--text-primary)'
              }}
            />
            {NAV_LINKS.map((link: NavLink, index: number) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a 
                  key={`mobile-${link.href}-${index}`}
                  href={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`p-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'text-theme-primary bg-theme-secondary/20' 
                      : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-secondary/10'
                  }`}
                  aria-label={link.label}
                  title={link.label}
                >
                  {getNavIcon(link.href)}
                </a>
              );
            })}
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-theme-secondary/20 transition-colors duration-300 text-theme-primary"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
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

        </div>
      </div>
    </header>
  );
};

export default Header;
