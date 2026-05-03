import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CompanyInfo from '@/models/CompanyInfo';

export async function GET() {
  try {
    await dbConnect();
    const company = await CompanyInfo.findOne({}).lean();
    return NextResponse.json(company);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch company info' }, { status: 500 });
  }
}
