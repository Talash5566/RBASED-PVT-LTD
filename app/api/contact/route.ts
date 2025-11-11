import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, companyName, message } = body;

    if (!email || !message || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    //  Find user in DB
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: 'User not found with this email' }, { status: 404 });
    }

    // Save message in DB
    const newMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        companyName,
        message,
        user: { connect: { id: user.id } },
      },
    });

    // Send email notification to company
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.COMPANY_EMAIL, 
        pass: process.env.EMAIL_PASS,   
      },
    });

    const mailOptions = {
      from: process.env.COMPANY_EMAIL,
      to: process.env.COMPANY_EMAIL, // receiver 
      subject: `📩 New Contact Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Company: ${companyName || 'N/A'}

Message:
${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    //  Send confirmation to the sender (user)
    await transporter.sendMail({
      from: process.env.COMPANY_EMAIL,
      to: email,
      subject: 'We received your message!',
      text: `Hi ${name},\n\nThank you for reaching out to RBased Pvt Ltd. Our team will contact you soon.\n\n— RBased Team`,
    });

    return NextResponse.json({ success: true, message: newMessage }, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Server error while sending message' }, { status: 500 });
  }
}
