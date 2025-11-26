'use client';

import React from 'react';

interface TestimonialTabsProps {
  activeTab: 'view' | 'submit';
  onTabChange: (tab: 'view' | 'submit') => void;
}

const TestimonialTabs: React.FC<TestimonialTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex space-x-8">
        <button
          onClick={() => onTabChange('view')}
          className={`font-medium transition-colors ${
            activeTab === 'view'
              ? 'text-theme-primary'
              : 'text-theme-secondary hover:text-theme-primary'
          }`}
        >
          View Testimonials
        </button>
        <button
          onClick={() => onTabChange('submit')}
          className={`font-medium transition-colors ${
            activeTab === 'submit'
              ? 'text-theme-primary'
              : 'text-theme-secondary hover:text-theme-primary'
          }`}
        >
          Share Experience
        </button>
      </div>
    </div>
  );
};

export default TestimonialTabs; 