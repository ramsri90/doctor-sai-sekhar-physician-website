"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    message: "",
    rating: 5
  });

  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value
    }));
  };

  const handleStarClick = (ratingValue: number) => {
    setFormData((prev) => ({ ...prev, rating: ratingValue }));
  };

  const handleSubmit = async (e: React.FormEvent, isWhatsAppDirect: boolean = false) => {
    e.preventDefault();
    if (!formData.fullname || !formData.mobile || !formData.message) {
      setStatus({ type: "error", message: "Please fill in all required fields (Name, Mobile, Message)." });
      return;
    }

    setStatus({ type: "loading", message: "Processing your request..." });

    // Format pre-filled WhatsApp message
    const waMessage = `Hello Dr. Sai Sekhar Pyla Clinic,

I would like to book a consultation / inquiry.

📋 *Patient Details:*
• *Name:* ${formData.fullname}
• *Phone:* ${formData.mobile}
${formData.email ? `• *Email:* ${formData.email}\n` : ''}• *Rating:* ${'★'.repeat(formData.rating)} (${formData.rating}/5)

💬 *Query / Symptoms:*
"${formData.message}"

Sent via website: drsaisekharphysician.com`;

    const whatsappUrl = `https://wa.me/916300793688?text=${encodeURIComponent(waMessage)}`;

    try {
      // 1. Submit to API route (saves to Google Sheets webhook if configured)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      // 2. Open WhatsApp pre-filled chat in a new tab
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");

      if (response.ok && result.status) {
        setStatus({
          type: "success",
          message: "Thank you! Your inquiry has been saved and WhatsApp has been launched to chat directly with Dr. Sai Sekhar's clinic."
        });
        setFormData({
          fullname: "",
          email: "",
          mobile: "",
          message: "",
          rating: 5
        });
      } else {
        setStatus({
          type: "success",
          message: "WhatsApp has been opened with your pre-filled inquiry. You can send it directly to the clinic!"
        });
      }
    } catch (error) {
      console.error("Form submit error:", error);
      // Fallback: open WhatsApp directly even if API offline
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setStatus({
        type: "success",
        message: "WhatsApp has been opened with your pre-filled message."
      });
    }
  };

  return (
    <div className="contact-form-container">
      <h2 className="form-title">Send a Message</h2>
      <p className="form-subtitle">For appointments, questions, or patient inquiries, please fill out the form below to connect instantly via WhatsApp & Google Sheets.</p>
      
      {status.type === "success" ? (
        <div className="alert alert-success">
          <i className="fas fa-check-circle"></i>
          <div>
            <h4>Submission Successful</h4>
            <p>{status.message}</p>
            <button
              onClick={() => setStatus({ type: "idle", message: "" })}
              className="btn btn-pill-outline"
              style={{ marginTop: "12px", padding: "6px 16px", fontSize: "0.85rem" }}
            >
              Send Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={(e) => handleSubmit(e, false)} className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullname">Full Name <span className="required">*</span></label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                autoComplete="name"
                value={formData.fullname}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="mobile">Mobile Number <span className="required">*</span></label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                autoComplete="tel"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address (Optional)</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>How would you rate your experience? (Optional)</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => handleStarClick(star)}
                  className={`star-btn ${star <= formData.rating ? "active" : ""}`}
                  aria-label={`Rate ${star} Stars`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message / Query <span className="required">*</span></label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Please describe your health symptoms, required medical services, or appointment preference..."
              required
              rows={5}
              className="form-control"
            ></textarea>
          </div>

          {status.type === "error" && (
            <div className="alert alert-error">
              <i className="fas fa-exclamation-triangle"></i>
              <span>{status.message}</span>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
            <button
              type="submit"
              disabled={status.type === "loading"}
              className="btn btn-pill-primary submit-btn"
              style={{ width: "100%", justifyContent: "center", paddingTop: "14px", paddingBottom: "14px", fontSize: "1rem", backgroundColor: "#25D366", borderColor: "#25D366" }}
            >
              {status.type === "loading" ? (
                <>
                  <span className="spinner"></span> Processing...
                </>
              ) : (
                <>
                  <i className="fab fa-whatsapp" style={{ fontSize: "1.2rem", marginRight: "8px" }}></i>
                  Book & Send via WhatsApp
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
