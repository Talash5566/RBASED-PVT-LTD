import * as XLSX from "xlsx";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    const {
      vehicles_assets,
      industry,
      interests,
      contact_method,
      first_name,
      last_name,
      phone_number,
      email,
      company_name,
      message,
    } = formData;

    // ✅ Step 1: Validate basic fields
    if (!first_name || !last_name || !email || !company_name) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    // ✅ Step 2: Create Excel in memory
    const data = [
      {
        "First Name": first_name,
        "Last Name": last_name,
        Email: email,
        "Phone Number": phone_number,
        Company: company_name,
        Industry: industry,
        "Interested Services": interests,
        "Contact Method": contact_method,
        "Message": message || "N/A",
        "Submitted At": new Date().toLocaleString(),
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Submission");
    const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    // ✅ Step 3: Setup email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.COMPANY_EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Step 4: Send to company with Excel
    await transporter.sendMail({
      from: process.env.COMPANY_EMAIL,
      to: process.env.COMPANY_EMAIL,
      subject: `📩 New Multi-Step Form Submission from ${first_name} ${last_name}`,
      text: `
New inquiry received via website:

Name: ${first_name} ${last_name}
Email: ${email}
Phone: ${phone_number}
Company: ${company_name}
Industry: ${industry}
Services: ${interests}
Preferred Contact: ${contact_method}
Message: ${message || "N/A"}
      `,
      attachments: [
        {
          filename: "form_submission.xlsx",
          content: excelBuffer,
          contentType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      ],
    });

    // ✅ Step 5: Send confirmation to user
    await transporter.sendMail({
      from: process.env.COMPANY_EMAIL,
      to: email,
      subject: "✅ We received your submission!",
      text: `Hi ${first_name},\n\nThank you for contacting RBased Pvt Ltd. We’ve received your form submission and will get back to you soon.\n\n— RBased Team`,
    });

    return NextResponse.json({
      success: true,
      message: "Form submitted and emails sent successfully!",
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Email error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Something went wrong!" },
      { status: 500 }
    );
  }
}
