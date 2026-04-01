'use client';

import React from 'react';
import { Testimonial } from '../../../types';
import { Card, CardContent } from '@/components/ui/card';
import { useTransparentBackgroundDetection } from '../../../hooks/useTransparentBackgroundDetection';

const getRingColor = (title?: string): string => {
  if (!title) return 'var(--border-color)';
  const t = title.toLowerCase();
  if (t.includes('cto') || t.includes('co-founder') || t.includes('founder')) return '#a78bfa';
  if (t.includes('engineer') || t.includes('developer')) return '#60a5fa';
  if (t.includes('manager')) return '#34d399';
  if (t.includes('director')) return '#f472b6';
  return '#9ca3af';
};

const fallbackAvatar = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=000000&color=fff&size=200`;

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index = 0 }) => {
  const imageUrl = testimonial.imageUrl || fallbackAvatar(testimonial.author);
  const isTransparent = useTransparentBackgroundDetection(imageUrl);
  const ringColor = getRingColor(testimonial.title);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).src = fallbackAvatar(testimonial.author);
  };

  return (
    <div
      className="testimonial-card animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Card className="h-96 sm:h-[28rem] lg:h-[32rem] xl:h-[36rem] overflow-visible">
        <CardContent className="p-4 sm:p-6 h-full">
          <div className="flex flex-col h-full">
            {/* Avatar dome */}
            <div className="flex justify-center mb-4 pt-2">
              <div
                className={`relative isolate ${isTransparent ? 'avatar-pop' : ''}`}
                style={{ width: '8rem', height: '5.5rem' }}
              >
                {isTransparent ? (
                  <>
                    {/* Dome shell — ring only */}
                    <div
                      className="avatar-effect w-full h-full"
                      style={{ '--ring-color': ringColor } as React.CSSProperties}
                    />
                    {/* Portrait behind shell — pops on hover */}
                    <div className="avatar-effect-portrait">
                      <img
                        src={imageUrl}
                        alt={testimonial.author}
                        onError={handleImgError}
                      />
                    </div>
                  </>
                ) : (
                  /* Static dome crop for opaque images */
                  <div
                    className="avatar-static w-full h-full"
                    style={{ '--ring-color': ringColor } as React.CSSProperties}
                  >
                    <img
                      src={imageUrl}
                      alt={testimonial.author}
                      className="w-full h-full object-cover object-top"
                      onError={handleImgError}
                    />
                  </div>
                )}
              </div>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default TestimonialCard;
