import { useState, useEffect } from 'react';
import { Testimonial } from '../../../types';
import { TestimonialAPI } from '../../../api/testimonials/index';
import { DatabaseTestimonial } from '../../../lib/database';
import { MOCK_TESTIMONIALS } from '../../../data';

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await TestimonialAPI.getApprovedTestimonials();
      
      if (!Array.isArray(data)) {
        console.error('API returned non-array data:', data);
        setError('Invalid data format received from server');
        setTestimonials([]);
        return;
      }
      
      const transformedTestimonials: Testimonial[] = data.map((testimonial: DatabaseTestimonial) => ({
        id: testimonial.id,
        quote: testimonial.quote,
        author: testimonial.name,
        title: testimonial.title,
        company: testimonial.company,
        imageUrl: testimonial.image_url || testimonial.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=000000&color=fff&size=100`,
        user_id: testimonial.user_id,
        is_approved: testimonial.is_approved,
        created_at: testimonial.created_at,
        updated_at: testimonial.updated_at,
      }));
      // If no testimonials from API, use mock data in development
      if (transformedTestimonials.length === 0 && process.env.NODE_ENV === 'development') {
        console.log('No testimonials from API, using mock data for development');
        setTestimonials(MOCK_TESTIMONIALS);
      } else {
        setTestimonials(transformedTestimonials);
      }
    } catch (err) {
      console.error('Failed to fetch testimonials:', err);
      setError('Failed to load testimonials');
      // Use mock data in development when API fails
      if (process.env.NODE_ENV === 'development') {
        console.log('API failed, using mock data for development');
        setTestimonials(MOCK_TESTIMONIALS);
      } else {
        setTestimonials([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return {
    testimonials,
    loading,
    error,
    refetch: fetchTestimonials
  };
}; 