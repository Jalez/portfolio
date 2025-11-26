'use client';

import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollFade } from '../../hooks/useScrollFade';
import GradientBackground from '../reusables/GradientBackground';

// @ts-ignore
import Typewriter from 'typewriter-effect/dist/core';

const Hero: React.FC = () => {
  const scrollFade = useScrollFade(); // Remove initiallyVisible: true to let it auto-detect based on URL hash
  const typewriterRef = useRef<HTMLHeadingElement>(null);
  const aboutTypewriterRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (typewriterRef.current) {
      const typewriter = new Typewriter(typewriterRef.current, {
        loop: false,
        delay: 75,
        deleteSpeed: 50,
      });

      typewriter
        .typeString('Call me Jaakko')
        .callFunction(() => {
          // Hide cursor from heading after completion
          if (typewriterRef.current) {
            const headingElement = typewriterRef.current;
            const cursor = headingElement.querySelector('.Typewriter__cursor');
            if (cursor) {
              (cursor as HTMLElement).style.display = 'none';
            }
          }
          
          // Start the about description typewriter after heading is done
          setTimeout(() => {
            if (aboutTypewriterRef.current) {
              const aboutTypewriter = new Typewriter(aboutTypewriterRef.current, {
                loop: false,
                delay: 50,
                deleteSpeed: 30,
              });

              aboutTypewriter
                .typeString("Full-stack developer who loves turning wild ideas into clean, working code.")
                .pauseFor(800)
                .typeString(" I build things that matter, solve real problems, and <strong>maybe</strong> break a few things along the way")
                .pauseFor(1500)
                //new line
                .typeString("<br>")
                .typeString(" (in a good way, I promise!).")
                .callFunction(() => {
                  // Hide cursor from about description after completion
                  if (aboutTypewriterRef.current) {
                    const aboutElement = aboutTypewriterRef.current;
                    const cursor = aboutElement.querySelector('.Typewriter__cursor');
                    if (cursor) {
                      (cursor as HTMLElement).style.display = 'none';
                    }
                  }
                })
                .start();
            }
          }, 800);
        })
        .start();
    }
  }, []);

  return (
    <section 
      id="hero"
      className="snap-start min-h-screen flex flex-col pt-20"
      ref={scrollFade.ref}
      style={scrollFade.style}
    >
      <div className="container mx-auto px-4 sm:px-6 flex flex-col flex-1 justify-center">
          <div className="flex flex-col items-center justify-center space-y-8">
            {/* Profile Image */}
            <div className="flex justify-center">
              <GradientBackground 
                variant="profile" 
                size="lg" 
                className="relative border-none"
                style={{
                  backgroundImage: 'url(/whiteprofilepic_cropped.png)',
                  backgroundSize: '93%',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
            </div>

            {/* About Content */}
            <div className="space-y-4 w-full max-w-[640px]">
                
                 <h1 
            ref={typewriterRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 sm:mb-6 text-theme-secondary leading-tight text-center min-h-[1.2em]"
          />
                  <p 
                  ref={aboutTypewriterRef}
                  className="text-lg text-theme-primary leading-relaxed min-h-[4em] text-center"
                />
             
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <Card className="text-center">
                  <CardContent className="p-3 sm:p-4">
                    <div className="text-2xl font-bold text-theme-primary">4+</div>
                    <div className="text-sm text-theme-secondary">Years Experience</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-3 sm:p-4">
                    <div className="text-2xl font-bold text-theme-primary">10+</div>
                    <div className="text-sm text-theme-secondary">Projects Completed</div>
                  </CardContent>
                </Card>
              </div>
                </div>
            
          </div>
      </div>
    </section>
  );
};

export default Hero;
