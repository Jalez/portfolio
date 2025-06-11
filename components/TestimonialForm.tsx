import React, { useState } from 'react';
import { TestimonialAPI } from '../api/testimonials/index';

interface TestimonialFormProps {
  onSubmit?: () => void;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    quote: '',
    title: '',
    company: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Please provide your name');
      return;
    }

    if (!formData.quote.trim()) {
      setError('Please provide a testimonial quote');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await TestimonialAPI.createTestimonial(formData);
      setSuccess(true);
      setFormData({ name: '', quote: '', title: '', company: '' });
      onSubmit?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit testimonial');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-theme-card rounded-lg shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-theme-primary mb-2">Thank You!</h3>
          <p className="text-theme-secondary mb-4">
            Your testimonial has been submitted and is pending approval. It will appear on the site once reviewed.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg"
          >
            Submit Another Testimonial
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-theme-card rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-theme-primary mb-4">Share Your Experience</h3>
      <p className="text-theme-secondary mb-6">
        Share your experience working with me. All testimonials are reviewed before being published.
      </p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-theme-primary mb-2">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g., John Smith"
            className="w-full px-3 py-2 border border-theme-border rounded-md bg-theme-background text-theme-primary placeholder-theme-secondary focus:outline-none focus:ring-2 focus:ring-theme"
          />
        </div>

        <div>
          <label htmlFor="quote" className="block text-sm font-medium text-theme-primary mb-2">
            Your Testimonial <span className="text-red-500">*</span>
          </label>
          <textarea
            id="quote"
            name="quote"
            value={formData.quote}
            onChange={handleChange}
            rows={4}
            required
            placeholder="Share your experience working with me..."
            className="w-full px-3 py-2 border border-theme-border rounded-md bg-theme-background text-theme-primary placeholder-theme-secondary focus:outline-none focus:ring-2 focus:ring-theme resize-vertical"
          />
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-theme-primary mb-2">
            Your Title/Position
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Senior Developer, Project Manager"
            className="w-full px-3 py-2 border border-theme-border rounded-md bg-theme-background text-theme-primary placeholder-theme-secondary focus:outline-none focus:ring-2 focus:ring-theme"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-theme-primary mb-2">
            Company/Organization
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g., Tech Solutions Inc."
            className="w-full px-3 py-2 border border-theme-border rounded-md bg-theme-background text-theme-primary placeholder-theme-secondary focus:outline-none focus:ring-2 focus:ring-theme"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
        >
          {loading ? 'Submitting...' : 'Submit Testimonial'}
        </button>
      </form>
    </div>
  );
};

export default TestimonialForm;