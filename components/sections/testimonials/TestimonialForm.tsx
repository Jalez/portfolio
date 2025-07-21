import React, { useState } from 'react';
import { TestimonialAPI } from '../../../api/testimonials/index';

interface FormData {
  name: string;
  quote: string;
  title: string;
  company: string;
  imageUrl?: string;
}

const TestimonialForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    quote: '',
    title: '',
    company: '',
    imageUrl: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const CHAR_LIMIT = 300;
  const charCount = formData.quote.length;

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

    if (charCount > CHAR_LIMIT) {
      setError(`Testimonial is too long. Please keep it under ${CHAR_LIMIT} characters.`);
      return;
    }

    setLoading(true);
    setError('');

    try {
      await TestimonialAPI.createTestimonial(formData);
      setSuccess(true);
      setFormData({ name: '', quote: '', title: '', company: '', imageUrl: '' });
      setImagePreview(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit testimonial');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Update image preview when imageUrl changes
    if (name === 'imageUrl' && value) {
      setImagePreview(value);
    } else if (name === 'imageUrl' && !value) {
      setImagePreview(null);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, imageUrl: '' }));
  };

  const resetForm = () => {
    setSuccess(false);
    setError('');
    setFormData({ name: '', quote: '', title: '', company: '', imageUrl: '' });
    setImagePreview(null);
  };

  if (success) {
    return (
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
          <button
            onClick={resetForm}
            className="bg-theme text-white px-8 py-3 rounded-lg hover:bg-theme-hover transition-colors font-semibold"
          >
            Submit Another Testimonial
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-0">
      <div className="max-w-2xl w-full">
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
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="quote" className="block text-sm font-medium text-theme-primary">
                Your Testimonial <span className="text-red-500">*</span>
              </label>
              <span className={`text-xs ${charCount > CHAR_LIMIT ? 'text-red-500' : 'text-theme-secondary'}`}>
                {charCount}/{CHAR_LIMIT} characters
              </span>
            </div>
            <textarea
              id="quote"
              name="quote"
              value={formData.quote}
              onChange={handleChange}
              rows={5}
              required
              placeholder="Share your experience working with me..."
              className={`w-full px-4 py-3 border rounded-md bg-theme-background text-theme-primary placeholder-theme-secondary focus:outline-none focus:ring-2 focus:ring-theme resize-vertical ${
                charCount > CHAR_LIMIT ? 'border-red-500' : 'border-theme-border'
              }`}
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

        {/* Profile Picture URL Section */}
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-theme-primary mb-2">
            Profile Picture URL (Optional)
          </label>
          <div className="space-y-4">
            {/* Image Preview */}
            {imagePreview && (
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-16 h-16 rounded-full object-cover border-2 border-theme-border"
                    onError={() => setImagePreview(null)}
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-theme-secondary">
                    Image preview
                  </p>
                </div>
              </div>
            )}
            
            {/* URL Input */}
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/your-photo.jpg"
              className="w-full px-4 py-3 border border-theme-border rounded-md bg-theme-background text-theme-primary placeholder-theme-secondary focus:outline-none focus:ring-2 focus:ring-theme"
            />
            <p className="text-xs text-theme-secondary">
              Provide a direct link to your profile picture (e.g., LinkedIn, GitHub, or any image hosting service)
            </p>
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
      </div>
    </div>
  );
};

export default TestimonialForm; 