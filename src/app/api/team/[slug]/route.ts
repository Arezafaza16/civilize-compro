import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;
    const member = await TeamMember.findOne({ slug }).lean();
    if (!member) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch team member' }, { status: 500 });
  }
}
