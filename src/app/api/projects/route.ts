import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');

    const filter: Record<string, unknown> = {};
    if (featured === 'true') filter.featured = true;
    if (category && category !== 'Semua') filter.category = category;

    const projects = await Project.find(filter).sort({ year: -1 }).lean();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
