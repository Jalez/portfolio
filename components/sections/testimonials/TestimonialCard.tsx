import React from 'react';
import { Testimonial } from '../../../types';
import Card from '../../reusables/Card';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index = 0 }) => (
  <div className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
    <Card className="h-96 sm:h-[28rem] lg:h-[32rem] xl:h-[36rem]">
      <div className="flex flex-col h-full">
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          {testimonial.imageUrl ? (
            <img 
              src={testimonial.imageUrl} 
              alt={testimonial.author} 
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-theme shadow-md object-cover"
              onError={(e) => {
                // Fallback to generated avatar if image fails to load
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.author)}&background=6366f1&color=fff&size=100`;
              }}
            />
          ) : (
            <img 
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.author)}&background=6366f1&color=fff&size=100`}
              alt={testimonial.author} 
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-theme shadow-md object-cover"
            />
          )}
        </div>
        
        {/* Quote */}
        <div className="flex-grow mb-4 overflow-y-auto">
          <p className="text-theme-secondary italic text-sm sm:text-base lg:text-lg leading-relaxed">
            "{testimonial.quote}"
          </p>
        </div>
        
        {/* Author Info */}
        <div className="mt-auto pt-4 border-t border-theme-border">
          <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold text-theme-primary mb-1">
            {testimonial.author}
          </h4>
          <p className="text-sm sm:text-base lg:text-lg text-theme-secondary">
            {testimonial.title}{testimonial.company && `, ${testimonial.company}`}
          </p>
        </div>
      </div>
    </Card>
  </div>
);

export default TestimonialCard; 