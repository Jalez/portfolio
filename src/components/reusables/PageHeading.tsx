'use client';

import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore
import Typewriter from 'typewriter-effect/dist/core';

interface TypewriterAction {
  type: 'typeString' | 'pauseFor' | 'deleteChars';
  value: string | number;
}

interface PageHeadingProps {
  title: string;
  subtitle?: string;
  typewriterActions?: TypewriterAction[];
  isVisible: boolean;
  className?: string;
}

const PageHeading: React.FC<PageHeadingProps> = ({ 
  title, 
  subtitle, 
  typewriterActions = [], 
  isVisible, 
  className = "" 
}) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [hasTyped, setHasTyped] = useState(false);

  useEffect(() => {
    // Start typewriter when component becomes visible for the first time
    if (isVisible && !hasTyped && headingRef.current) {
      setHasTyped(true);
      
      // First typewriter for heading
      const headingTypewriter = new Typewriter(headingRef.current, {
        loop: false,
        delay: 80,
        deleteSpeed: 30,
      });

      headingTypewriter
        .typeString(title)
        .callFunction(() => {
          // Hide cursor from heading after completion
          if (headingRef.current) {
            const headingElement = headingRef.current;
            const cursor = headingElement.querySelector('.Typewriter__cursor');
            if (cursor) {
              (cursor as HTMLElement).style.display = 'none';
            }
          }
          
          // Start subtitle typewriter if subtitle exists
          if (subtitle && subtitleRef.current) {
            setTimeout(() => {
              const subtitleTypewriter = new Typewriter(subtitleRef.current, {
                loop: false,
                delay: 60,
                deleteSpeed: 30,
              });

              let typewriterChain = subtitleTypewriter;

              // If no custom actions provided, just type the subtitle
              if (typewriterActions.length === 0) {
                typewriterChain = typewriterChain.typeString(subtitle);
              } else {
                // Apply custom typewriter actions
                typewriterActions.forEach((action) => {
                  switch (action.type) {
                    case 'typeString':
                      typewriterChain = typewriterChain.typeString(action.value as string);
                      break;
                    case 'pauseFor':
                      typewriterChain = typewriterChain.pauseFor(action.value as number);
                      break;
                    case 'deleteChars':
                      typewriterChain = typewriterChain.deleteChars(action.value as number);
                      break;
                  }
                });
              }

              typewriterChain
                .callFunction(() => {
                  // Hide cursor from subtitle after completion
                  if (subtitleRef.current) {
                    const subtitleElement = subtitleRef.current;
                    const cursor = subtitleElement.querySelector('.Typewriter__cursor');
                    if (cursor) {
                      (cursor as HTMLElement).style.display = 'none';
                    }
                  }
                })
                .start();
            }, 500); // Brief pause before starting subtitle
          }
        })
        .start();
    }
  }, [isVisible, hasTyped, title, subtitle, typewriterActions]);

  return (
    <div className={`text-center mb-6 sm:mb-4 flex-shrink-0 ${className}`}>
      <h2 
        ref={headingRef}
        className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-theme-primary mb-3 min-h-[1.2em]"
      />
      {subtitle && (
        <p 
          ref={subtitleRef}
          className="text-base sm:text-lg lg:text-xl text-theme-secondary max-w-3xl mx-auto min-h-[2.5em] leading-relaxed"
        />
      )}
    </div>
  );
};

export default PageHeading;