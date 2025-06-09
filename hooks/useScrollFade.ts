import { useEffect, useState, useRef } from 'react';

interface UseScrollFadeOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useScrollFade = (options: UseScrollFadeOptions = {}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);
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