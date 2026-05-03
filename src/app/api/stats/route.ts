import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Stat from '@/models/Stat';

export async function GET() {
  try {
    await dbConnect();
    const stats = await Stat.find({}).lean();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
