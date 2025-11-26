'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sections from '@/components/sections';
import { useEffect } from 'react';

export default function Home() {
  // Handle initial scroll position on mount
  useEffect(() => {
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
                behavior: 'instant' as ScrollBehavior
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
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-theme-background">
      <Header />
      <Sections />
      <Footer />
    </div>
  );
}
