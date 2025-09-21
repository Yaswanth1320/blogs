import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if required environment variables are set
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return NextResponse.json(
        {
          error:
            "Email service not configured. Please check environment variables.",
        },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Test the connection
    try {
      await transporter.verify();
    } catch (verifyError) {
      return NextResponse.json(
        {
          error:
            "Email service connection failed. Please check your email configuration.",
        },
        { status: 500 }
      );
    }

    // Email to yourself (notification)
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `New Contact Form Message: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22c55e; border-bottom: 2px solid #22c55e; padding-bottom: 10px;">
            New Contact Form Message
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border-left: 4px solid #22c55e; margin: 20px 0;">
            <h3>Message:</h3>
            <p style="line-height: 1.6;">${message.replace(/\n/g, "<br>")}</p>
          </div>
          
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            This message was sent from your blog contact form.
          </p>
        </div>
      `,
    };

    // Send notification email
    const info = await transporter.sendMail(mailOptions);

    // Send auto-reply (optional, don't fail if this fails)
    try {
      const autoReplyOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: "Thanks for reaching out!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #22c55e; border-bottom: 2px solid #22c55e; padding-bottom: 10px;">
              Thank you for your message!
            </h2>
            
            <p>Hi ${name},</p>
            
            <p>Thank you for reaching out through my blog. I've received your message about "${subject}" and will get back to you as soon as possible.</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Your message:</strong></p>
              <p style="line-height: 1.6;">${message.replace(/\n/g, "<br>")}</p>
            </div>
            
            <p>Best regards,<br>
            Your Blog Team</p>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              This is an automated response. Please don't reply to this email.
            </p>
          </div>
        `,
      };

      await transporter.sendMail(autoReplyOptions);
    } catch (autoReplyError) {}

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    // More detailed error response
    let errorMessage = "Failed to send email";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      {
        error: "Failed to send email",
        details: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
