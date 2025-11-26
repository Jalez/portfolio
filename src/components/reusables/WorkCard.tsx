'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Work } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import { sendThemeToIframe } from '../../lib/iframeThemeListener';
import WorkCardOverlay from './WorkCardOverlay';

interface WorkCardProps {
  work: Work;
}

const WorkCard: React.FC<WorkCardProps> = ({ work }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDescriptionClosed, setIsDescriptionClosed] = useState(false);
  const { theme } = useTheme();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Function to get correct URL (localhost for portfolio when developing)
  const getIframeUrl = (baseUrl: string) => {
    // Handle portfolio URL specially - use localhost when developing
    if (baseUrl === 'https://jaakkorajala.vercel.app/' && window.location.hostname === 'localhost') {
      return 'http://localhost:5173/';
    }
    return baseUrl;
  };

  // Send theme change messages to iframe when theme changes
  useEffect(() => {
    if (iframeRef.current) {
      sendThemeToIframe(iframeRef.current, theme);
    }
  }, [theme]);

  return (
    <div className="group">
      {/* Title */}
      <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold mb-3 sm:mb-4 text-theme-primary group-hover:text-theme-primary transition-colors leading-tight text-center">
        {work.title}
      </h3>

      {/* Iframe Container */}
      <div
        className="relative w-full h-96 sm:h-[28rem] lg:h-[32rem] xl:h-[36rem] rounded-lg overflow-hidden border-2 border-theme-border bg-theme-card shadow-lg transition-all duration-300 hover:shadow-xl"
        onMouseEnter={() => !isDescriptionClosed && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Iframe */}
        <iframe
          ref={iframeRef}
          src={getIframeUrl(work.url)}
          title={work.title}
          className={`w-full h-full border-0 transition-all duration-300 ${isHovered ? 'filter blur-sm' : ''}`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
        />

        {/* Overlay on hover */}
        {isHovered && (
          <WorkCardOverlay
            work={work}
            onClose={() => {
              setIsHovered(false);
              setIsDescriptionClosed(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default WorkCard;
