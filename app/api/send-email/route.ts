// app/api/send-email/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const response = await fetch(process.env.GOOGLE_APPS_SCRIPT_CONTACT!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        secret: process.env.FORM_SECRET,
      }),
      
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error" });
  }
}
