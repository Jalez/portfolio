import React, { useEffect, useRef } from 'react';
import { ABOUT_DESCRIPTION } from '../constants';
import Card from './Card';
import { useScrollFade } from '../hooks/useScrollFade';
import Skills from './Skills';
import Projects from './Projects';
import TestimonialSubmission from './TestimonialSubmission';
import Testimonials from './Testimonials';
import Contact from './Contact';
// @ts-ignore
import Typewriter from 'typewriter-effect/dist/core';

const Home: React.FC = () => {
  const scrollFade = useScrollFade();
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
                .typeString(" I build things that matter, solve real problems, and maybe break a few things along the way")
                .pauseFor(1500)
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
    <>
      {/* Hero Section */}
      <section 
        id="hero"
        className="snap-start min-h-screen flex flex-col pt-20"
        ref={scrollFade.ref}
        style={scrollFade.style}
      >
        <div className="container mx-auto px-6 flex flex-col flex-1 py-4 sm:py-6 justify-center">
          <div className="max-w-4xl mx-auto">
            {/* Hero heading with typewriter effect */}
            <h1 
              ref={typewriterRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 sm:mb-6 text-theme-secondary leading-tight text-center min-h-[1.2em]"
            />
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Profile Image */}
              <div className="text-center lg:text-left">
                <div className="relative inline-block">
                  <img 
                    src="/profilepic.png" 
                    alt="Jaakko Rajala" 
                    className="w-64 h-64 sm:w-80 sm:h-80 rounded-full mx-auto lg:mx-0 shadow-2xl border-4 border-theme object-cover"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent to-white/10"></div>
                </div>
              </div>

              {/* About Content */}
              <div className="space-y-4">
                <div className="bg-theme-secondary p-6 rounded-xl shadow-xl border border-theme">
                  <p 
                    ref={aboutTypewriterRef}
                    className="text-lg text-theme-primary leading-relaxed min-h-[4em]"
                  />
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Card variant="centered" padding="sm" hoverScale={false} animatedBorder={false}>
                    <div className="text-2xl font-bold text-theme-primary">4+</div>
                    <div className="text-sm text-theme-secondary">Years Experience</div>
                  </Card>
                  <Card variant="centered" padding="sm" hoverScale={false} animatedBorder={false}>
                    <div className="text-2xl font-bold text-theme-primary">10+</div>
                    <div className="text-sm text-theme-secondary">Projects Completed</div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <Skills />

      {/* Projects Section */}
      <Projects />

      {/* Testimonial Submission Section */}
      <TestimonialSubmission />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Contact Section */}
      <Contact />
    </>
  );
};

export default Home;
