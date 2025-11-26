import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database';
import { EmailService } from '@/lib/email';

export async function GET() {
  try {
    const testimonials = await DatabaseService.getApprovedTestimonials();
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Testimonials API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, quote, title, company, imageUrl } = await request.json();

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!quote || !quote.trim()) {
      return NextResponse.json({ error: 'Quote is required' }, { status: 400 });
    }

    // Create testimonial without user_id (anonymous submission)
    const testimonial = await DatabaseService.createTestimonial({
      user_id: null,
      name: name.trim(),
      quote: quote.trim(),
      title: title?.trim() || null,
      company: company?.trim() || null,
      imageUrl: imageUrl || null,
    });

    // Send notification email to admin
    try {
      await EmailService.sendTestimonialNotification({
        name: name.trim(),
        quote: quote.trim(),
        title: title?.trim(),
        company: company?.trim(),
        imageUrl: imageUrl,
      });
    } catch (error) {
      console.error('Failed to send testimonial notification:', error);
      // Don't fail the testimonial submission if notification fails
    }

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error('Testimonials API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
