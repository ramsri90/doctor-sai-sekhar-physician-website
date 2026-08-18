import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import RegionalSEOBlock from "@/components/RegionalSEOBlock";

export const metadata: Metadata = {
  title: { absolute: "Contact Clinic | Dr. Sai Sekhar Visakhapatnam" },
  description: "Contact information, clinic directions, and consultation booking for Dr. Sai Sekhar Pyla at Trinetra Medicals, Visakhapatnam.",
};

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Dr. Sai Sekhar P - Best Physician in Visakhapatnam / Vizag",
    "url": "https://www.drsaisekharphysician.com/contact",
    "mainEntity": {
      "@type": "MedicalClinic",
      "name": "Trinetra Medicals - Dr. Sai Sekhar Clinic",
      "telephone": "+91 63007 93688",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Beside Abhiruchi Sweets, Ramalayam Street, Muralinagar",
        "addressLocality": "Visakhapatnam",
        "addressRegion": "Andhra Pradesh",
        "postalCode": "530007",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 17.7458262,
        "longitude": 83.1835354
      }
    }
  };

  return (
    <div className="contact-page-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      {/* Header Banner */}
      <div className="page-header bg-gradient-mesh">
        <div className="container">
          <span className="badge">Get in Touch</span>
          <h1 className="page-title">Contact Dr. Sai Sekhar P</h1>
          <p className="page-subtitle">Schedule an appointment with the <strong>Best Physician in Visakhapatnam / Vizag</strong> at <strong>Trinetra Medicals, Muralinagar</strong>.</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container scroll-reveal">
        <div className="contact-grid">
          {/* Left panel - Info & Map */}
          <div className="contact-info-panel" style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            {/* Quick Contact Cards */}
            <div className="contact-cards">
              <div className="card contact-card">
                <div className="contact-icon-circle">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className="card-details">
                  <h3>Phone Support</h3>
                  <p><a href="tel:+916300793688">+91 63007 93688</a></p>
                  <span className="subtext">Call for timing confirmations</span>
                </div>
              </div>

              <div className="card contact-card">
                <div className="contact-icon-circle whatsapp-circle">
                  <i className="fab fa-whatsapp"></i>
                </div>
                <div className="card-details">
                  <h3>WhatsApp Inquiry</h3>
                  <p><a href="https://wa.me/916300793688" target="_blank" rel="noopener noreferrer">+91 63007 93688</a></p>
                  <span className="subtext">Quick chat for appointments</span>
                </div>
              </div>

              <div className="card contact-card">
                <div className="contact-icon-circle">
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
                  <h4><i className="fas fa-clinic-medical"></i> <strong style={{ color: "var(--primary)" }}>Trinetra Medicals</strong></h4>
                  <p className="loc-address">Kodanda Ramalayam St, Muralinagar, Visakhapatnam</p>
                  <span className="loc-hours">6:00 PM – 9:00 PM</span>
                  <span className="loc-days">Monday – Saturday</span>
                </div>
                <div className="timing-location-box">
                  <h4><i className="fas fa-user-md"></i> Practitioner Details</h4>
                  <p className="loc-address" style={{ fontWeight: "bold", fontSize: "1.05rem" }}><strong style={{ color: "var(--primary)" }}>Dr. Sai Sekhar Pyla</strong></p>
                  <span className="loc-hours">12+ Years Experience</span>
                  <span className="loc-days">MD General Medicine</span>
                </div>
              </div>
            </div>

            {/* Regional Care Coverage (Left Column) */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <RegionalSEOBlock useCardOnly={true} />
            </div>
          </div>

          {/* Right panel - Form & Map */}
          <div className="contact-form-panel" style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "24px" }}>
            <ContactForm />

            {/* Clinic Location Map (Right Column below Send a Message form) */}
            <div className="card map-card" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h3>Clinic Location Map</h3>
                <div className="map-iframe-wrapper">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60799.59690698831!2d83.18353544863278!3d17.745826199999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a395d0384a06819%3A0x45ef7110571ff582!2sDr%20SAI%20SEKHAR%20P!5e0!3m2!1sen!2sin!4v1786558233514!5m2!1sen!2sin"
                    width="100%"
                    height="230"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps Location - Dr. Sai Sekhar P Clinic"
                  ></iframe>
                </div>
              </div>
              <a
                href="https://maps.app.goo.gl/RwBcYF5CqF1yoigb9"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary directions-btn"
                style={{ marginTop: "16px" }}
              >
                <i className="fas fa-directions"></i> Get Directions on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}
