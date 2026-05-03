import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ContactSubmission from '@/models/ContactSubmission';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const { name, email, phone, subject, message } = body;

    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }

    const submission = await ContactSubmission.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    return NextResponse.json(
      { success: true, message: 'Pesan berhasil dikirim', data: submission },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal mengirim pesan' },
      { status: 500 }
    );
  }
}
