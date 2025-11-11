import * as XLSX from "xlsx";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, companyName, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Step 1: Create Excel workbook in memory
    const data = [
      {
        Name: name,
        Email: email,
        Company: companyName || "N/A",
        Message: message,
        Date: new Date().toLocaleString(),
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "FormData");

    // Generate Excel buffer (instead of saving file)
    const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    // ✅ Step 2: Configure email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.COMPANY_EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Step 3: Send email with Excel attachment to company
    await transporter.sendMail({
      from: process.env.COMPANY_EMAIL,
      to: process.env.COMPANY_EMAIL,
      subject: `📩 New Inquiry from ${name}`,
      text: `
New message received from website contact form:

Name: ${name}
Email: ${email}
Company: ${companyName || "N/A"}

Message:
${message}
      `,
      attachments: [
        {
          filename: "form_data.xlsx",
          content: excelBuffer,
          contentType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      ],
    });

    // ✅ Step 4: Send confirmation email to user
    await transporter.sendMail({
      from: process.env.COMPANY_EMAIL,
      to: email,
      subject: "We received your message!",
      text: `Hi ${name},\n\nThank you for reaching out to RBased Pvt Ltd. We’ll get back to you shortly.\n\n— RBased Team`,
    });

    return NextResponse.json({
      success: true,
      message: "Email (with Excel attachment) sent successfully!",
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Something went wrong!" },
      { status: 500 }
    );
  }
}
