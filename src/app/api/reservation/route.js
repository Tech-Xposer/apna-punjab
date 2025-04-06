import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: process.env.NEXT_PUBLIC_NODEMAILER_HOST,
  port: 465, // or 587
  secure: true,
  auth: {
    user: process.env.NEXT_PUBLIC_NODEMAILER_USERNAME,
    pass: process.env.NEXT_PUBLIC_NODEMAILER_PASSWORD,
  },
});
export async function POST(request) {
  try {
    const { name, email, phone, people, time, date } = await request.json();
    if (!name || !email || !phone || !people || !time || !date)
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );

    const response = await sendEmail(name, email, phone, people, time, date);
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error sending email", error: error.message },
      { status: 500 }
    );
  }
}

const sendEmail = async (name, email, phone, people, time, date) => {
  console.log("Sending email to:", email); // Log the recipient's email
  try {
    const mail = await transporter.sendMail({
      from: `"Reservation - Apna Punjab" <${process.env.NEXT_PUBLIC_NODEMAILER_USERNAME}>`, // Use the actual email as the sender
      to: `${process.env.NEXT_PUBLIC_NODEMAILER_RECIPIENT}, ${email},${process.env.NEXT_PUBLIC_NODEMAILER_ADMIN}`,
      subject: `Reservation from ${name}`,
      html: `
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff8e1; padding: 30px; font-family: Arial, sans-serif;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <tr>
          <td style="background-color: #ffa000; padding: 20px; text-align: center;">
            <h2 style="margin: 0; color: #ffffff; font-size: 24px;">🍽️ Table Reservation Request</h2>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px;">
            <p style="font-size: 16px; color: #333;">You have received a new reservation with the following details:</p>
            
            <table cellpadding="0" cellspacing="0" width="100%" style="margin-top: 20px;">
              <tr>
                <td style="padding: 8px 0;"><strong>Name:</strong></td>
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Email:</strong></td>
                <td style="padding: 8px 0;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Total People:</strong></td>
                <td style="padding: 8px 0;">${people}</td>
              </tr>
               <tr>
                <td style="padding: 8px 0;"><strong>Reservation Date:</strong></td>
                <td style="padding: 8px 0;">${date}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Reservation Time:</strong></td>
                <td style="padding: 8px 0;">${time}</td>
              </tr>
            </table>

            <p style="margin-top: 30px; font-size: 14px; color: #555;">
              Please confirm the reservation and prepare the table accordingly.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background-color: #ffe082; padding: 15px; text-align: center; font-size: 13px; color: #666;">
            This is an automated email from your restaurant reservation system.
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>

      `,
    });
    console.log("Email sent:", mail);
    return mail; // Return mail info on success
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
