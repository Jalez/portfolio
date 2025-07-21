import React from 'react';
import { Testimonial } from '../../../types';
import Carousel from '../../reusables/Carousel';
import TestimonialCard from './TestimonialCard';

interface TestimonialListProps {
  testimonials: Testimonial[];
  loading: boolean;
  error: string;
}

const TestimonialList: React.FC<TestimonialListProps> = ({ testimonials, loading, error }) => {
  if (loading) {
    return <div className="text-center py-8">Loading testimonials...</div>;
  }

  if (testimonials.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-0">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-theme-card rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-theme-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.013 8.013 0 01-7-4c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-theme-primary mb-2">No testimonials to display currently</h3>
          <p className="text-theme-secondary">
            {error ? "We're having trouble loading testimonials right now. Please try again later." : 
            "Check back later for testimonials from clients and collaborators."}
          </p>
        </div>
      </div>
    );
  }

  const testimonialCards = testimonials.map((testimonial, index) => (
    <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
  ));

  return (
    <div className="p-6">
      <Carousel>{testimonialCards}</Carousel>
    </div>
  );
};

export default TestimonialList; 