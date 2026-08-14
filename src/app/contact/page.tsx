import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Dr. Sai Sekhar P | Clinic Timings Visakhapatnam",
  description: "Get directions, contact numbers, and schedule appointments with Dr. Sai Sekhar P at Trinetra Medicals (Muralinagar), Visakhapatnam.",
};

export default function ContactPage() {
  return (
    <div className="contact-page-wrapper">
      {/* Header Banner */}
      <div className="page-header bg-gradient-mesh">
        <div className="container">
          <span className="badge">Get in Touch</span>
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">Schedule an appointment or reach out for clinical inquiries.</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container scroll-reveal">
        <div className="contact-grid">
          {/* Left panel - Info & Map */}
          <div className="contact-info-panel">
            {/* Quick Contact Cards */}
            <div className="contact-cards">
              <div className="card contact-card">
                <div className="contact-card-icon">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className="card-details">
                  <h3>Phone Support</h3>
                  <p><a href="tel:+916300793688">+91 63007 93688</a></p>
                  <span className="subtext">Call for timing confirmations</span>
                </div>
              </div>

              <div className="card contact-card">
                <div className="contact-card-icon whatsapp-icon">
                  <i className="fab fa-whatsapp"></i>
                </div>
                <div className="card-details">
                  <h3>WhatsApp Inquiry</h3>
                  <p><a href="https://wa.me/916300793688" target="_blank" rel="noopener noreferrer">+91 63007 93688</a></p>
                  <span className="subtext">Quick chat for appointments</span>
                </div>
              </div>

              <div className="card contact-card">
                <div className="contact-card-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="card-details">
                  <h3>Email Address</h3>
                  <p><a href="mailto:info@drsaisekharphysician.com">info@drsaisekharphysician.com</a></p>
                  <span className="subtext">Replies within 24 hours</span>
                </div>
              </div>
            </div>

            {/* Timings */}
            <div className="card timings-card">
              <h3>Consultation Locations & Hours</h3>
              <div className="timing-grid">
                <div className="timing-location-box">
                  <h4><i className="fas fa-clinic-medical"></i> Trinetra Medicals</h4>
                  <p className="loc-address">Kodanda Ramalayam St, Muralinagar, Visakhapatnam</p>
                  <span className="loc-hours">6:00 PM – 9:00 PM</span>
                  <span className="loc-days">Monday – Saturday</span>
                </div>
                <div className="timing-location-box">
                  <h4><i className="fas fa-certificate"></i> Practitioner Details</h4>
                  <p className="loc-address" style={{ fontWeight: "bold" }}>Dr. Sai Sekhar P</p>
                  <span className="loc-hours">12+ Years Experience</span>
                  <span className="loc-days">MD General Medicine</span>
                </div>
              </div>
            </div>

            {/* Location Map */}
            <div className="card map-card">
              <h3>Clinic Location Map</h3>
              <div className="map-iframe-wrapper">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60799.59690698831!2d83.18353544863278!3d17.745826199999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a395d0384a06819%3A0x45ef7110571ff582!2sDr%20SAI%20SEKHAR%20P!5e0!3m2!1sen!2sin!4v1786558233514!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Location - Dr. Sai Sekhar P Clinic"
                ></iframe>
              </div>
              <a
                href="https://maps.app.goo.gl/RwBcYF5CqF1yoigb9"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary directions-btn"
              >
                <i className="fas fa-directions"></i> Get Directions on Google Maps
              </a>
            </div>
          </div>

          {/* Right panel - Form */}
          <div className="contact-form-panel">
            <ContactForm />
          </div>
        </div>
      </div>

      
    </div>
  );
}
