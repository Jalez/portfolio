import React, { useState, useEffect } from 'react';
import { Testimonial } from '../../types';
import { TestimonialAPI } from '../../api/testimonials/index';
import { DatabaseTestimonial } from '../../lib/database';
import Carousel from '../reusables/Carousel';
import Card from '../reusables/Card';
import Section from '../reusables/Section';

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
      
      // Validate that data is an array before calling map
      if (!Array.isArray(data)) {
        console.error('API returned non-array data:', data);
        setError('Invalid data format received from server');
        setTestimonials([]);
        return;
      }
      
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

  if (loading) {
    return (
      <Section
        id="testimonials"
        title="What Others Say"
        loading={true}
        loadingText="Loading testimonials..."
      >
        <div />
      </Section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <Section
        id="testimonials"
        title="What Others Say"
      >
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
      </Section>
    );
  }

  return (
    <Section
      id="testimonials"
      title="What Others Say"
    >
      <div className="p-6">
        <Carousel>{testimonialCards}</Carousel>
      </div>
    </Section>
  );
};

export default Testimonials;
