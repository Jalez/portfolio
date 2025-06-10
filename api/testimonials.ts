import { VercelRequest, VercelResponse } from '@vercel/node';
import { DatabaseService } from '../lib/database.js';

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
        // Create new testimonial (no authentication required)
        const { name, quote, title, company } = req.body;
        
        // Validate required fields
        if (!name || !name.trim()) {
          return res.status(400).json({ error: 'Name is required' });
        }
        if (!quote || !quote.trim()) {
          return res.status(400).json({ error: 'Quote is required' });
        }

        // Create testimonial without user_id (anonymous submission)
        const testimonial = await DatabaseService.createTestimonial({
          user_id: null, // No user association needed
          name: name.trim(),
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