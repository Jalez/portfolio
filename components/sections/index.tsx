
import Skills from './Skills';
import Projects from './Projects';
import TestimonialSubmission from './TestimonialSubmission';
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
      <Projects />
      <TestimonialSubmission />
      <Testimonials />
      <Contact />
    </>
  );
};

export default Sections;
