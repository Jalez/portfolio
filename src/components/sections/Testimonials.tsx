'use client';

import React, { useState } from 'react';
import Section from '../reusables/Section';
import { 
  TestimonialList, 
  TestimonialForm, 
  TestimonialTabs, 
  useTestimonials 
} from './testimonials/index';

const Testimonials: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'view' | 'submit'>('view');
  const { testimonials, loading, error } = useTestimonials();

  const renderTabContent = () => {
    if (activeTab === 'view') {
      return <TestimonialList testimonials={testimonials} loading={loading} error={error} />;
    }
    return <TestimonialForm />;
  };

  return (
    <Section
      id="testimonials"
      title="What Others Say"
    >
      <TestimonialTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {renderTabContent()}
    </Section>
  );
};

export default Testimonials;
