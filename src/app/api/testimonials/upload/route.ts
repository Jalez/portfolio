import { NextRequest, NextResponse } from 'next/server';

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

const sanitizeFileName = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

export async function POST(request: NextRequest) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: 'Vercel Blob is not configured (missing BLOB_READ_WRITE_TOKEN)' },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Image file is required' }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload JPG, PNG, WEBP, or GIF.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({ error: 'Image is too large. Max size is 5MB.' }, { status: 400 });
    }

    const timestamp = Date.now();
    const safeName = sanitizeFileName(file.name || `testimonial-${timestamp}`);
    const pathname = `testimonials/${timestamp}-${safeName}`;
    const uploadResponse = await fetch(`https://blob.vercel-storage.com/${pathname}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'x-content-type': file.type,
        'x-add-random-suffix': '1',
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      const text = await uploadResponse.text();
      console.error('Blob upload failed:', text);
      return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }

    const uploadedBlob = await uploadResponse.json();
    return NextResponse.json({ url: uploadedBlob.url });
  } catch (error) {
    console.error('Testimonial image upload API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
