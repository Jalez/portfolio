import { VercelRequest, VercelResponse } from '@vercel/node';
import { DatabaseService } from '../../lib/database.js';
import { AuthService } from '../../lib/auth.js';

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

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header required' });
  }

  const token = authHeader.replace('Bearer ', '');
  const payload = AuthService.verifyToken(token);
  
  if (!payload || !payload.is_admin) {
    return res.status(403).json({ error: 'Admin access required' });
  }

  try {
    switch (req.method) {
      case 'GET':
        // Get all testimonials (admin only)
        const testimonials = await DatabaseService.getAllTestimonials();
        res.status(200).json(testimonials);
        break;

      case 'PUT':
        // Approve testimonial (admin only)
        const { id } = req.query;
        if (!id || typeof id !== 'string') {
          return res.status(400).json({ error: 'Testimonial ID required' });
        }
        
        await DatabaseService.approveTestimonial(parseInt(id));
        res.status(200).json({ message: 'Testimonial approved' });
        break;

      case 'DELETE':
        // Delete testimonial (admin only)
        const { id: deleteId } = req.query;
        if (!deleteId || typeof deleteId !== 'string') {
          return res.status(400).json({ error: 'Testimonial ID required' });
        }
        
        await DatabaseService.deleteTestimonial(parseInt(deleteId));
        res.status(200).json({ message: 'Testimonial deleted' });
        break;

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Admin testimonials API error:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
}