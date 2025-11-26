'use client';

import Skills from './Skills';
import Works from './Works';
import Projects from './Projects';
import Testimonials from './Testimonials';
import Contact from './Contact';
// @ts-ignore
import Typewriter from 'typewriter-effect/dist/core';
import Hero from './Hero';

const Sections: React.FC = () => {


  return (
    <>
      <Hero/>
      <Skills />
      <Works />
      <Projects />
      <Testimonials />
      <Contact />
    </>
  );
};

export default Sections;
