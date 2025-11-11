import * as XLSX from "xlsx";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      eventType,
      date,
      dietaryRequirements,
      accommodationNeeded,
      transportationNeeded,
      specialRequests,
    } = formData;

    // Validate required fields
    if (!firstName || !lastName || !email || !eventType) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    //  Create Excel file in memory
    const data = [
      {
        "First Name": firstName,
        "Last Name": lastName,
        Email: email,
        "Phone Number": phoneNumber,
        "Event Type": eventType,
        Date: date ? new Date(date).toLocaleDateString() : "N/A",
        "Audience Size": dietaryRequirements,
        "Accommodation Provided": accommodationNeeded ? "Yes" : "No",
        "Transportation Provided": transportationNeeded ? "Yes" : "No",
        "Special Requests": specialRequests || "None",
        "Submitted At": new Date().toLocaleString(),
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "EventRegistration");
    const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    //  Setup email transporter (Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.COMPANY_EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Step 3: Send to company
    await transporter.sendMail({
      from: process.env.COMPANY_EMAIL,
      to: process.env.COMPANY_EMAIL, // Your company inbox
      subject: `📩 New Event Registration from ${firstName} ${lastName}`,
      text: `
New event registration received:

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phoneNumber}
Event Type: ${eventType}
Date: ${date ? new Date(date).toLocaleDateString() : "N/A"}
Audience Size: ${dietaryRequirements}
Accommodation: ${accommodationNeeded ? "Yes" : "No"}
Transportation: ${transportationNeeded ? "Yes" : "No"}
Special Requests: ${specialRequests || "None"}

Submitted on: ${new Date().toLocaleString()}
      `,
      attachments: [
        {
          filename: "event_registration.xlsx",
          content: excelBuffer,
          contentType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      ],
    });

    //  Send confirmation email to user
    await transporter.sendMail({
      from: process.env.COMPANY_EMAIL,
      to: email,
      subject: " Event Registration Confirmation",
      text: `Hi ${firstName},

Thank you for registering for our ${eventType.toLowerCase()}! 
We’ve received your details and will get back to you soon.

— RBased Pvt Ltd Team`,
    });

    return NextResponse.json({
      success: true,
      message: "Event registration successful — emails sent!",
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Email send error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Something went wrong!" },
      { status: 500 }
    );
  }
}
