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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullname || !formData.mobile || !formData.message) {
      setStatus({ type: "error", message: "Please fill in all required fields (Name, Mobile, Message)." });
      return;
    }

    setStatus({ type: "loading", message: "Submitting your message..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.status) {
        setStatus({
          type: "success",
          message: result.message || "Thank you! Your inquiry has been submitted successfully."
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
          type: "error",
          message: result.message || "Failed to submit. Please try again later."
        });
      }
    } catch (error) {
      console.error("Form submit error:", error);
      setStatus({
        type: "error",
        message: "An error occurred while sending your request. Please check your network connection."
      });
    }
  };

  return (
    <div className="contact-form-container">
      <h3 className="form-title">Send a Message</h3>
      <p className="form-subtitle">For appointments, questions, or patient inquiries, please fill out the form below. We will get back to you shortly.</p>
      
      {status.type === "success" ? (
        <div className="alert alert-success">
          <i className="fas fa-check-circle"></i>
          <div>
            <h4>Submission Successful</h4>
            <p>{status.message}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form contact-form-styled">
          <div className="form-row-grid">
            <div className="floating-input-group">
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label htmlFor="fullname">Full Name *</label>
            </div>
            
            <div className="floating-input-group">
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label htmlFor="mobile">Mobile Number *</label>
            </div>
          </div>

          <div className="floating-input-group">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
            />
            <label htmlFor="email">Email Address (Optional)</label>
          </div>

          <div className="form-group" style={{ marginBottom: "25px" }}>
            <label style={{ fontSize: "0.9rem", color: "var(--neutral-muted)" }}>How would you rate your experience? (Optional)</label>
            <div className="star-rating" style={{ marginTop: "10px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => handleStarClick(star)}
                  className={`star-btn ${star <= formData.rating ? "active" : ""}`}
                  aria-label={`Rate ${star} Stars`}
                  style={{ background: "none", border: "none", fontSize: "1.8rem", cursor: "pointer", color: star <= formData.rating ? "#fbbf24" : "#e5e7eb", transition: "color 0.2s" }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="floating-input-group">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder=" "
              required
              rows={4}
            ></textarea>
            <label htmlFor="message">Your Message / Query *</label>
          </div>

          {status.type === "error" && (
            <div className="alert alert-error">
              <i className="fas fa-exclamation-triangle"></i>
              <span>{status.message}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status.type === "loading"}
            className="btn btn-primary btn-gradient btn-gradient-submit"
          >
            {status.type === "loading" ? (
              <>
                <span className="spinner"></span> Sending...
              </>
            ) : (
              <>Submit Inquiry <i className="fas fa-paper-plane"></i></>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
