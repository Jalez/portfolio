import { sql } from '@vercel/postgres';

export interface User {
  id: number;
  email: string;
  name: string;
  image_url?: string;
  provider: 'admin'; // Only admin users now
  provider_id?: string;
  password_hash?: string; // For admin users with password authentication
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface DatabaseTestimonial {
  id: number;
  user_id?: number | null; // Made optional for anonymous submissions
  name: string; // Name of person giving testimonial
  quote: string;
  title?: string;
  company?: string;
  image_url?: string; // Direct image URL for anonymous testimonials
  is_approved: boolean;
  created_at: string;
  updated_at: string;
  // Joined user data (only for admin-submitted testimonials)
  author?: string;
  imageUrl?: string; // Alias for image_url
}

export class DatabaseService {
  // User operations (only for admin users now)
  static async createUser(userData: {
    email: string;
    name: string;
    image_url?: string;
    provider: string;
    provider_id?: string;
  }): Promise<User> {
    const result = await sql`
      INSERT INTO users (email, name, image_url, provider, provider_id)
      VALUES (${userData.email}, ${userData.name}, ${userData.image_url || null}, ${userData.provider}, ${userData.provider_id || null})
      RETURNING *
    `;
    return result.rows[0] as User;
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const result = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;
    return result.rows[0] as User || null;
  }

  static async getUserByProvider(provider: string, providerId: string): Promise<User | null> {
    const result = await sql`
      SELECT * FROM users WHERE provider = ${provider} AND provider_id = ${providerId}
    `;
    return result.rows[0] as User || null;
  }

  // Testimonial operations - updated for anonymous submissions
  static async createTestimonial(testimonialData: {
    user_id?: number | null;
    name: string;
    quote: string;
    title?: string;
    company?: string;
    imageUrl?: string;
  }): Promise<DatabaseTestimonial> {
    const result = await sql`
      INSERT INTO testimonials (user_id, name, quote, title, company, image_url)
      VALUES (${testimonialData.user_id || null}, ${testimonialData.name}, ${testimonialData.quote}, ${testimonialData.title || null}, ${testimonialData.company || null}, ${testimonialData.imageUrl || null})
      RETURNING *
    `;
    return result.rows[0] as DatabaseTestimonial;
  }

  static async getApprovedTestimonials(): Promise<DatabaseTestimonial[]> {
    const result = await sql`
      SELECT 
        t.*,
        u.name as author,
        u.image_url as imageUrl
      FROM testimonials t
      LEFT JOIN users u ON t.user_id = u.id
      WHERE t.is_approved = true
      ORDER BY t.created_at DESC
    `;
    return result.rows as DatabaseTestimonial[];
  }

  static async getAllTestimonials(): Promise<DatabaseTestimonial[]> {
    const result = await sql`
      SELECT 
        t.*,
        u.name as author,
        u.image_url as imageUrl
      FROM testimonials t
      LEFT JOIN users u ON t.user_id = u.id
      ORDER BY t.created_at DESC
    `;
    return result.rows as DatabaseTestimonial[];
  }

  static async approveTestimonial(id: number): Promise<void> {
    await sql`
      UPDATE testimonials 
      SET is_approved = true, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
    `;
  }

  static async deleteTestimonial(id: number): Promise<void> {
    await sql`
      DELETE FROM testimonials WHERE id = ${id}
    `;
  }

  static async getUserTestimonials(userId: number): Promise<DatabaseTestimonial[]> {
    const result = await sql`
      SELECT 
        t.*,
        u.name as author,
        u.image_url as imageUrl
      FROM testimonials t
      LEFT JOIN users u ON t.user_id = u.id
      WHERE t.user_id = ${userId}
      ORDER BY t.created_at DESC
    `;
    return result.rows as DatabaseTestimonial[];
  }

  // Update user password
  static async updateUserPassword(userId: number, passwordHash: string): Promise<void> {
    await sql`
      UPDATE users 
      SET password_hash = ${passwordHash}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${userId}
    `;
  }
}