import React, { useState, useEffect, useRef } from 'react';
import { Work } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import { sendThemeToIframe } from '../../lib/iframeThemeListener';

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
          <div className="absolute inset-0 flex items-center justify-center p-6 transition-opacity duration-300">
            {/* Close button */}
            <button
              onClick={() => {
                setIsHovered(false);
                setIsDescriptionClosed(true);
              }}
              className="absolute top-4 right-4 text-theme-primary hover:text-theme-secondary transition-colors duration-200 z-10"
              aria-label="Close description"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center max-w-lg bg-theme-secondary bg-opacity-95 rounded-lg p-6 shadow-lg border border-theme-border">
              <p className="text-theme-primary text-sm sm:text-base lg:text-lg leading-relaxed">
                {work.description}
              </p>
              <div className="mt-6">
                <a
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-theme-primary text-theme-background rounded-lg hover:bg-theme-secondary transition-colors duration-200 text-sm sm:text-base font-semibold shadow-lg"
                >
                  Visit Work
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkCard;
