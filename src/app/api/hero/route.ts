import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import HeroSlide from '@/models/HeroSlide';

export async function GET() {
  try {
    await dbConnect();
    const slides = await HeroSlide.find({}).sort({ order: 1 }).lean();
    return NextResponse.json(slides);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch hero slides' }, { status: 500 });
  }
}
