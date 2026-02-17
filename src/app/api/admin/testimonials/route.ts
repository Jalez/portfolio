import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database';
import { AuthService } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Authorization header required' }, { status: 401 });
  }

  const token = authHeader.replace('Bearer ', '');
  const payload = AuthService.verifyToken(token);

  if (!payload || !payload.is_admin) {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
  }

  try {
    const testimonials = await DatabaseService.getAllTestimonials();
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Admin testimonials API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Authorization header required' }, { status: 401 });
  }

  const token = authHeader.replace('Bearer ', '');
  const payload = AuthService.verifyToken(token);

  if (!payload || !payload.is_admin) {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Testimonial ID required' }, { status: 400 });
    }

    await DatabaseService.approveTestimonial(parseInt(id));
    return NextResponse.json({ message: 'Testimonial approved' });
  } catch (error) {
    console.error('Admin testimonials API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Authorization header required' }, { status: 401 });
  }

  const token = authHeader.replace('Bearer ', '');
  const payload = AuthService.verifyToken(token);

  if (!payload || !payload.is_admin) {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Testimonial ID required' }, { status: 400 });
    }

    await DatabaseService.deleteTestimonial(parseInt(id));
    return NextResponse.json({ message: 'Testimonial deleted' });
  } catch (error) {
    console.error('Admin testimonials API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Authorization header required' }, { status: 401 });
  }

  const token = authHeader.replace('Bearer ', '');
  const payload = AuthService.verifyToken(token);

  if (!payload || !payload.is_admin) {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
  }

  try {
    const { id, imageUrl } = await request.json();

    if (!id || Number.isNaN(Number(id))) {
      return NextResponse.json({ error: 'Valid testimonial ID is required' }, { status: 400 });
    }

    if (imageUrl !== null && typeof imageUrl !== 'string') {
      return NextResponse.json({ error: 'imageUrl must be a string or null' }, { status: 400 });
    }

    if (typeof imageUrl === 'string' && imageUrl.trim().length === 0) {
      return NextResponse.json({ error: 'imageUrl cannot be empty' }, { status: 400 });
    }

    await DatabaseService.updateTestimonialImage(Number(id), imageUrl ? imageUrl.trim() : null);
    return NextResponse.json({ message: 'Testimonial image updated' });
  } catch (error) {
    console.error('Admin testimonials API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
