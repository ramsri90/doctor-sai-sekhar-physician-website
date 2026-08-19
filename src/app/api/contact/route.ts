import { NextResponse } from "next/server";

// Security headers
const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains"
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Sanitize and validate inputs
    const fullname = typeof body.fullname === 'string' ? body.fullname.trim() : '';
    const mobile = typeof body.mobile === 'string' ? body.mobile.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const rating = typeof body.rating === 'number' ? body.rating : 5;

    if (!fullname || !mobile || !message) {
      return NextResponse.json(
        { status: false, message: "Missing required fields (fullname, mobile, message)." },
        { status: 400, headers: securityHeaders }
      );
    }

    const payload = {
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      fullname,
      mobile,
      email: email || "N/A",
      message,
      rating
    };

    // Forward to Google Sheets Webhook URL if configured in environment variables
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } catch (webhookErr) {
        console.error("Google Sheets webhook dispatch failed:", webhookErr);
      }
    }

    return NextResponse.json({
      status: true,
      message: "Thank you! Your appointment request / message has been submitted successfully to Dr. Sai Sekhar Clinic."
    }, { headers: securityHeaders });
  } catch (error: unknown) {
    console.error("API contact error:", error);
    return NextResponse.json(
      { status: false, message: "An unexpected error occurred during submission." },
      { status: 500, headers: securityHeaders }
    );
  }
}
