import React from 'react';
import { useScrollFade } from '../../hooks/useScrollFade';
import PageHeading from './PageHeading';

interface TypewriterAction {
  type: 'typeString' | 'pauseFor' | 'deleteChars';
  value: string | number;
}

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  typewriterActions?: TypewriterAction[];
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({
  id,
  title,
  subtitle,
  typewriterActions,
  loading = false,
  loadingText = "Loading...",
  children,
  className = ""
}) => {
  const scrollFade = useScrollFade();

  if (loading) {
    return (
      <section 
        id={id}
        ref={scrollFade.ref}
        className="snap-start min-h-screen flex flex-col pt-20"
        style={scrollFade.style}
      >
        <div className="container mx-auto px-4 sm:px-6 flex flex-col flex-1 py-4 sm:py-6 min-h-0">
          <PageHeading
            title={title}
            subtitle={subtitle}
            typewriterActions={typewriterActions}
            isVisible={scrollFade.isVisible}
            className="flex-shrink-0"
          />
          <div className="flex-1 flex justify-center items-center min-h-0">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-primary"></div>
            <p className="text-theme-secondary text-lg ml-4">{loadingText}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id={id}
      ref={scrollFade.ref}
      className={`snap-start min-h-screen flex flex-col pt-20 ${className}`}
      style={scrollFade.style}
    >
      <div className="container mx-auto px-4 sm:px-6 flex flex-col flex-1 py-4 sm:py-6 min-h-0">
        <PageHeading
          title={title}
          subtitle={subtitle}
          typewriterActions={typewriterActions}
          isVisible={scrollFade.isVisible}
          className="flex-shrink-0"
        />
        
        <div className="flex-1 min-h-0">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;