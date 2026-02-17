import axios from 'axios';
import { DatabaseTestimonial } from '@/lib/database';

export interface TestimonialRequest {
  name: string;
  quote: string;
  title?: string;
  company?: string;
  imageUrl?: string;
}

const API_BASE_URL = '';

export class TestimonialAPI {
  static async uploadTestimonialImage(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${API_BASE_URL}/api/testimonials/upload`, formData);
      return response.data.url;
    } catch (error) {
      console.error('Error uploading testimonial image:', error);
      throw new Error('Failed to upload image');
    }
  }

  // Get all approved testimonials (public endpoint)
  static async getApprovedTestimonials(): Promise<DatabaseTestimonial[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/testimonials`);
      
      // Ensure we always return an array
      const data = response.data;
      if (!Array.isArray(data)) {
        console.warn('API returned non-array data, returning empty array');
        return [];
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching approved testimonials:', error);
      // Return empty array instead of throwing error to prevent UI crash
      return [];
    }
  }

  // Create a new testimonial (no authentication required)
  static async createTestimonial(testimonialData: TestimonialRequest): Promise<DatabaseTestimonial> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/testimonials`,
        testimonialData,
        {
          headers: {
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
      
      // Ensure we always return an array
      const data = response.data;
      if (!Array.isArray(data)) {
        console.warn('Admin API returned non-array data, returning empty array');
        return [];
      }
      
      return data;
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

  // Update testimonial image (admin only)
  static async updateTestimonialImage(
    testimonialId: number,
    imageUrl: string | null,
    authToken: string
  ): Promise<void> {
    try {
      await axios.patch(
        `${API_BASE_URL}/api/admin/testimonials`,
        { id: testimonialId, imageUrl },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Error updating testimonial image:', error);
      throw new Error('Failed to update testimonial image');
    }
  }
}
