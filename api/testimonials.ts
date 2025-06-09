import { VercelRequest, VercelResponse } from '@vercel/node';
import { DatabaseService } from '../lib/database';
import { AuthService } from '../lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    switch (req.method) {
      case 'GET':
        // Get approved testimonials (public)
        const testimonials = await DatabaseService.getApprovedTestimonials();
        res.status(200).json(testimonials);
        break;

      case 'POST':
        // Create new testimonial (authenticated)
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          return res.status(401).json({ error: 'Authorization header required' });
        }

        const token = authHeader.replace('Bearer ', '');
        const payload = AuthService.verifyToken(token);
        if (!payload) {
          return res.status(401).json({ error: 'Invalid authentication token' });
        }

        const { quote, title, company } = req.body;
        if (!quote || !quote.trim()) {
          return res.status(400).json({ error: 'Quote is required' });
        }

        const testimonial = await DatabaseService.createTestimonial({
          user_id: payload.userId,
          quote: quote.trim(),
          title: title?.trim() || null,
          company: company?.trim() || null,
        });

        res.status(201).json(testimonial);
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Testimonials API error:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
}