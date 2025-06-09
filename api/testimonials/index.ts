import axios from 'axios';
import { DatabaseTestimonial } from '../../lib/database';

export interface TestimonialRequest {
  quote: string;
  title?: string;
  company?: string;
}

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-vercel-app.vercel.app' 
  : 'http://localhost:5173';

export class TestimonialAPI {
  // Get all approved testimonials (public endpoint)
  static async getApprovedTestimonials(): Promise<DatabaseTestimonial[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/testimonials`);
      return response.data;
    } catch (error) {
      console.error('Error fetching approved testimonials:', error);
      throw new Error('Failed to fetch testimonials');
    }
  }

  // Create a new testimonial (authenticated users only)
  static async createTestimonial(testimonialData: TestimonialRequest, authToken: string): Promise<DatabaseTestimonial> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/testimonials`,
        testimonialData,
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating testimonial:', error);
      throw new Error('Failed to create testimonial');
    }
  }

  // Get all testimonials (admin only)
  static async getAllTestimonials(authToken: string): Promise<DatabaseTestimonial[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/testimonials`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching all testimonials:', error);
      throw new Error('Failed to fetch testimonials');
    }
  }

  // Approve a testimonial (admin only)
  static async approveTestimonial(testimonialId: number, authToken: string): Promise<void> {
    try {
      await axios.put(
        `${API_BASE_URL}/api/admin/testimonials?id=${testimonialId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        }
      );
    } catch (error) {
      console.error('Error approving testimonial:', error);
      throw new Error('Failed to approve testimonial');
    }
  }

  // Delete a testimonial (admin only)
  static async deleteTestimonial(testimonialId: number, authToken: string): Promise<void> {
    try {
      await axios.delete(
        `${API_BASE_URL}/api/admin/testimonials?id=${testimonialId}`,
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        }
      );
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      throw new Error('Failed to delete testimonial');
    }
  }

  // Get user's own testimonials
  static async getUserTestimonials(authToken: string): Promise<DatabaseTestimonial[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/testimonials/user`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user testimonials:', error);
      throw new Error('Failed to fetch user testimonials');
    }
  }
}