import React, { useState } from 'react';
import { TestimonialAPI } from '../../api/testimonials/index';
import Section from '../reusables/Section';

const TestimonialSubmission: React.FC = () => {
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

  const resetForm = () => {
    setSuccess(false);
    setError('');
    setFormData({ name: '', quote: '', title: '', company: '' });
  };

  return (
    <Section
      id="testimonial-form"
      title="Share Your Experience"
      subtitle="Have you worked with me on a project? I'd love to hear about your experience!"
    >
      <div className="flex justify-center items-center min-h-0">
        <div className="max-w-2xl w-full">
          {success ? (
            <div className="p-8 bg-theme-card rounded-lg shadow-lg">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-theme-primary mb-4">Thank You!</h3>
                <p className="text-theme-secondary mb-6 text-lg">
                  Your testimonial has been submitted successfully and is now pending review. 
                  It will appear in the testimonials section once approved.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={resetForm}
                    className="bg-theme text-white px-8 py-3 rounded-lg hover:bg-theme-hover transition-colors font-semibold"
                  >
                    Submit Another Testimonial
                  </button>
                  <p className="text-sm text-theme-secondary">
                    Or scroll down to view existing testimonials
                  </p>
                </div>
              </div>
            </div>
          ) : (
<> 

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-1">
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
                    className="w-full px-4 py-3 border border-theme-border rounded-md bg-theme-background text-theme-primary placeholder-theme-secondary focus:outline-none focus:ring-2 focus:ring-theme"
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
                    rows={5}
                    required
                    placeholder="Share your experience working with me..."
                    className="w-full px-4 py-3 border border-theme-border rounded-md bg-theme-background text-theme-primary placeholder-theme-secondary focus:outline-none focus:ring-2 focus:ring-theme resize-vertical"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
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
                      placeholder="e.g., Senior Developer"
                      className="w-full px-4 py-3 border border-theme-border rounded-md bg-theme-background text-theme-primary placeholder-theme-secondary focus:outline-none focus:ring-2 focus:ring-theme"
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
                      className="w-full px-4 py-3 border border-theme-border rounded-md bg-theme-background text-theme-primary placeholder-theme-secondary focus:outline-none focus:ring-2 focus:ring-theme"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-theme text-theme-primary py-4 px-6 rounded-lg hover:bg-theme-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme disabled:opacity-50 transition-colors font-semibold text-lg"
                >
                  {loading ? 'Submitting...' : 'Submit Testimonial'}
                </button>

                <p className="text-sm text-theme-secondary text-center">
                  All testimonials are reviewed before being published
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </Section>
  );
};

export default TestimonialSubmission;