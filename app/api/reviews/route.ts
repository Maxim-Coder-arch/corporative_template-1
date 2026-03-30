import { NextResponse } from 'next/server';
import { ReviewModel } from '@/lib/models/review';

export async function POST(req: Request) {
  try {
    const { name, rating, text } = await req.json();

    if (!name || !rating || !text) {
      return NextResponse.json(
        { error: 'Name, rating and text are required' },
        { status: 400 }
      );
    }

    await ReviewModel.create({ name, rating, text });

    return NextResponse.json({ success: true, message: 'Отзыв отправлен на модерацию!' });
  } catch (error) {
    console.error('Review error:', error);
    return NextResponse.json(
      { error: 'Failed to submit review' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const reviews = await ReviewModel.getApproved();
    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}