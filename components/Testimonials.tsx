import React, { useState, useEffect } from 'react';
import { Testimonial } from '../types';
import { TestimonialAPI } from '../api/testimonials/index';
import { DatabaseTestimonial } from '../lib/database';
import Carousel from './Carousel';
import Card from './Card';
import { useScrollFade } from '../hooks/useScrollFade';

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <Card variant="centered" padding="lg">
    {testimonial.imageUrl && (
      <img 
        src={testimonial.imageUrl} 
        alt={testimonial.author} 
        className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-theme shadow-md object-cover"
      />
    )}
    <p className="text-theme-secondary italic text-lg mb-6 leading-relaxed flex-grow">"{testimonial.quote}"</p>
    <div className="mt-auto">
      <h4 className="text-xl font-semibold text-theme-primary">{testimonial.author}</h4>
      <p className="text-theme-secondary">{testimonial.title}{testimonial.company && `, ${testimonial.company}`}</p>
    </div>
  </Card>
);

const Testimonials: React.FC = () => {
  const scrollFade = useScrollFade();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError(''); // Clear previous errors
      const data = await TestimonialAPI.getApprovedTestimonials();
      // Transform database testimonials to match the Testimonial interface
      const transformedTestimonials: Testimonial[] = data.map((testimonial: DatabaseTestimonial) => ({
        id: testimonial.id,
        quote: testimonial.quote,
        author: testimonial.name, // Use the name field directly from testimonial
        title: testimonial.title,
        company: testimonial.company,
        imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=6366f1&color=fff&size=100`, // Generate avatar from name
        user_id: testimonial.user_id,
        is_approved: testimonial.is_approved,
        created_at: testimonial.created_at,
        updated_at: testimonial.updated_at,
      }));
      setTestimonials(transformedTestimonials);
    } catch (err) {
      console.error('Failed to fetch testimonials:', err);
      setError('Failed to load testimonials');
      setTestimonials([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const testimonialCards = testimonials.map((testimonial, index) => (
    <div key={testimonial.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
      <TestimonialCard testimonial={testimonial} />
    </div>
  ));

  return (
    <section 
      id="testimonials" 
      ref={scrollFade.ref}
      className="snap-start min-h-screen flex flex-col pt-20"
      style={scrollFade.style}
    >
      <div className="container mx-auto px-6 flex flex-col flex-1 py-4 sm:py-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6 text-theme-primary flex-shrink-0">What Others Say</h2>
        
        {/* Loading State */}
        {loading && (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-theme"></div>
          </div>
        )}

        {/* Testimonials Carousel - only show if we have testimonials */}
        {!loading && testimonials.length > 0 && (
          <div className="flex-1 p-6">
            <Carousel>{testimonialCards}</Carousel>
          </div>
        )}

        {/* No testimonials state - shown for both empty and error states */}
        {!loading && testimonials.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
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
        )}
      </div>
    </section>
  );
};

export default Testimonials;
