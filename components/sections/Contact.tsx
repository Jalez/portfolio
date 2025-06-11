import React from 'react';
import Card from '../Card';
import { useScrollFade } from '../../hooks/useScrollFade';

// Simple SVG Icons for social media (can be moved to constants.tsx if preferred for central management)
const MailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const LinkedInIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.75c0-1.4-.975-2.5-2.25-2.5S11.5 12.85 11.5 14.25V19h-3v-9h2.9v1.35C12.1 10.455 13.225 9.5 14.75 9.5 17.375 9.5 19 11.415 19 14.25z"></path>
  </svg>
);

const GitHubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
  </svg>
);


const Contact: React.FC = () => {
  const scrollFade = useScrollFade();

  return (
    <section 
      id="contact" 
      ref={scrollFade.ref}
      className="snap-start min-h-screen flex flex-col pt-20"
      style={scrollFade.style}
    >
      <div className="container mx-auto px-6 flex flex-col flex-1 py-4 sm:py-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6 text-theme-primary flex-shrink-0">Get In Touch</h2>
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-2xl w-full">
            <Card variant="centered" padding="lg" hoverScale={false} animatedBorder={false} className="animate-fade-in-up">
              <p className="text-xl text-theme-secondary mb-8 leading-relaxed">
                Always open to discuss new projects, exchange ideas and amazing opportunities. Feel free to reach out!
              </p>
              
              <div className="space-y-6 mb-10">
                <a 
                  href="mailto:jaakko.rajala@tuni.fi"
                  className="inline-flex items-center justify-center space-x-3 text-lg text-theme-primary hover:text-theme-secondary transition-colors duration-300 group"
                >
                  <MailIcon className="w-7 h-7 text-theme-primary group-hover:scale-110 transition-transform" />
                  <span className="border-b border-transparent group-hover:border-theme-primary transition-colors">jaakko.rajala@tuni.fi</span>
                </a>
              </div>

              <div className="flex justify-center space-x-6">
                <a 
                  href="https://www.linkedin.com/in/jaakko-rajala-b531b8208/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-theme-secondary hover:text-theme-primary transition-all duration-300 transform hover:scale-110"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedInIcon className="w-10 h-10" />
                </a>
                <a 
                  href="https://github.com/Jalez" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-theme-secondary hover:text-theme-primary transition-all duration-300 transform hover:scale-110"
                  aria-label="GitHub Profile"
                >
                  <GitHubIcon className="w-10 h-10" />
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
