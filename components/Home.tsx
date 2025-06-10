import React from 'react';
import { ABOUT_DESCRIPTION } from '../constants';
import Card from './Card';
import { useScrollFade } from '../hooks/useScrollFade';
import Skills from './Skills';
import Projects from './Projects';
import TestimonialSubmission from './TestimonialSubmission';
import Testimonials from './Testimonials';
import Contact from './Contact';

const Home: React.FC = () => {
  const scrollFade = useScrollFade();

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
            {/* Hero heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 sm:mb-6 text-theme-secondary leading-tight text-center">
              Call me Jaakko
            </h1>
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
                  <p className="text-lg text-theme-primary leading-relaxed">
                    {ABOUT_DESCRIPTION}
                  </p>
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
