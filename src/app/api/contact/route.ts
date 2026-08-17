import { NextResponse } from "next/server";

// Security headers to prevent sniffing and framing
const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains"
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate and strictly type required fields to strings to prevent injection or prototype pollution
    const fullname = typeof body.fullname === 'string' ? body.fullname.trim() : '';
    const mobile = typeof body.mobile === 'string' ? body.mobile.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!fullname || !mobile || !message) {
      return NextResponse.json(
        { status: false, message: "Missing required fields (fullname, mobile, message)." },
        { status: 400, headers: securityHeaders }
      );
    }

    // Forward sanitized data to the CMS API endpoint
    const response = await fetch("https://admin.drsaisekharphysician.com/api/client/contact-submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ fullname, mobile, message })
    });

    const data = await response.json().catch(() => null);

    if (response.ok && data) {
      return NextResponse.json({
        status: true,
        message: data.message || "Message submitted successfully!"
      }, { headers: securityHeaders });
    } else {
      console.error("CMS API submit error:", data);
      return NextResponse.json(
        {
          status: false,
          message: data?.message || "Error submitting message to clinic API. Please try again later."
        },
        { status: response.status || 500, headers: securityHeaders }
      );
    }
  } catch (error: unknown) {
    console.error("API proxy error:", error);
    return NextResponse.json(
      { status: false, message: "An unexpected error occurred during submission." },
      { status: 500, headers: securityHeaders }
    );
  }
}
