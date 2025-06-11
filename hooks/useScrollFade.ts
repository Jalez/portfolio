import { useEffect, useState, useRef } from 'react';

interface UseScrollFadeOptions {
  threshold?: number;
  rootMargin?: string;
  initiallyVisible?: boolean; // Add option to control initial visibility
}

export const useScrollFade = (options: UseScrollFadeOptions = {}) => {
  // Check if we should be initially visible based on URL hash
  const getInitialVisibility = () => {
    if (options.initiallyVisible !== undefined) {
      return options.initiallyVisible;
    }
    // If there's a hash in the URL and it's not pointing to hero, start hidden
    const hash = window.location.hash;
    if (hash && hash !== '#hero' && hash !== '#') {
      return false;
    }
    // Default to visible for hero section or no hash
    return true;
  };

  // Start with appropriate initial state based on whether this is expected to be initially visible
  const [isVisible, setIsVisible] = useState(getInitialVisibility());
  const [opacity, setOpacity] = useState(getInitialVisibility() ? 1 : 0);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;
          
          // Calculate opacity with faster fade - more aggressive curve
          // Square the ratio to make it fade faster as it leaves viewport
          const newOpacity = Math.max(0, Math.min(1, ratio * ratio * 10));
          
          setIsVisible(entry.isIntersecting);
          setOpacity(newOpacity);
        });
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100), // Create thresholds from 0 to 1 in 0.01 increments
        rootMargin: options.rootMargin || '-10% 0px -10% 0px', // Start fading earlier
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options.rootMargin]);

  return {
    ref: elementRef,
    isVisible,
    opacity,
    style: {
      opacity,
      transition: 'opacity 0.15s ease-out', // Faster transition
    },
  };
};