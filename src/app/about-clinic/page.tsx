import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import RegionalSEOBlock from "@/components/RegionalSEOBlock";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: { absolute: "About Clinic | Trinetra Medicals Visakhapatnam" },
  description: "Facility overview, consultation hours, and medical amenities at Trinetra Medicals, Muralinagar — clinic of Dr. Sai Sekhar Pyla.",
};

async function getAboutClinicContent() {
  return `
    <h2>About Our Clinic &ndash; <strong style="color: #0d7a66;">Trinetra Medicals</strong></h2>
    <p><strong style="color: #0d7a66; font-size: 1.05em;">Trinetra Medicals</strong> is a trusted healthcare facility in <strong>Muralinagar, Visakhapatnam</strong>, led by <strong style="color: #0d7a66;">Dr. Sai Sekhar Pyla (Dr. P. Sai Sekhar)</strong> with <strong>12 years of medical experience</strong>. We specialize in <strong>comprehensive medical care</strong> with a focus on preventive, diagnostic, and therapeutic treatments.</p>
    <p>Conveniently located <strong>beside Abhiruchi Sweets, Ramalayam Street, Muralinagar</strong>, <strong style="color: #0d7a66;">Trinetra Medicals</strong> is equipped with modern medical facilities for accurate diagnoses and effective treatment plans.</p>
    <h3>Clinic Timings</h3>
    <ul>
      <li><strong style="color: #0d7a66;">Trinetra Medicals (Muralinagar)</strong> &ndash; 6:00 PM to 9:00 PM (Monday &ndash; Saturday)</li>
    </ul>
    <p>For consultations, call: <strong style="color: #0d7a66;">6300793688</strong>.</p>
  `;
}

function cleanAndSanitizeContent(html: string): string {
  if (!html) return "";
  
  return html
    .replace(/10\s*(&nbsp;)?\s*years/gi, "12 years")
    .replace(/<strong>([^<]*CARE Hospital[^<]*)<\/strong>/gi, "$1")
    .replace(/<li><strong>CARE Hospital[^<]*<\/li>/gi, "")
    .replace(/Trinetra\s*Medicals/gi, '<strong style="color: #0d7a66;">Trinetra Medicals</strong>');
}

export default async function AboutClinicPage() {
  const content = await getAboutClinicContent();
  const cleanedContent = cleanAndSanitizeContent(content);

  return (
    <div className="about-page-wrapper">
      {/* Main Content */}
      <div className="container main-content-container scroll-reveal">
        <div className="clinic-grid">
          <div className="clinic-details-content">
            {/* Header Title Block - Aligned at top line with sidebar */}
            <div className="clinic-header-block" style={{ marginBottom: "15px" }}>
              <span className="badge-pill">CLINIC PROFILE</span>
              <h1 className="page-title" style={{ marginTop: "8px", marginBottom: "8px", fontSize: "clamp(2.2rem, 4vw, 3rem)", fontWeight: 800 }}>
                <strong style={{ color: "var(--primary)" }}>Trinetra Medicals</strong>
              </h1>
              <p className="page-subtitle" style={{ fontSize: "1.05rem", color: "var(--neutral-muted)", margin: 0 }}>
                Primary Care Clinic led by <strong style={{ color: "var(--primary)" }}>Dr. Sai Sekhar P</strong> (<strong>Best Physician in Visakhapatnam / Vizag</strong> · <strong>MD General Medicine | Diabetologist | Infectious Disease Specialist</strong>) at <strong>Trinetra Medicals, Muralinagar, Visakhapatnam</strong>
              </p>
            </div>

            <div 
              className="rich-text-content"
              dangerouslySetInnerHTML={{ __html: cleanedContent }}
            />
            
            {/* Gallery images inside about clinic page */}
            <div className="clinic-gallery">
              <h3 className="gallery-title">Clinic Gallery</h3>
              <div className="gallery-grid">
                <div className="gallery-img-wrapper">
                  <Image
                    src="/images/one.webp"
                    alt="Clinic Consultation Room"
                    width={280}
                    height={200}
                    className="gallery-img"
                  />
                </div>
                <div className="gallery-img-wrapper">
                  <Image
                    src="/images/three.webp"
                    alt="Clinic Diagnostic Equipment"
                    width={280}
                    height={200}
                    className="gallery-img"
                  />
                </div>
                <div className="gallery-img-wrapper">
                  <Image
                    src="/images/four.webp"
                    alt="Clinic Pharmacy & Reception"
                    width={280}
                    height={200}
                    className="gallery-img"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="clinic-sidebar">
            <div className="sidebar-card timings-card">
              <h3>Timings & Consultation</h3>
              <div className="sidebar-timing-item">
                <span className="timing-loc">Trinetra Medicals</span>
                <span className="timing-desc">Muralinagar, Visakhapatnam</span>
                <span className="timing-time">6:00 PM – 9:00 PM</span>
                <span className="timing-days">Monday – Saturday</span>
              </div>
              <p className="clinic-note" style={{ fontSize: "0.82rem", marginTop: "12px", color: "var(--neutral-muted)", borderTop: "1px solid var(--neutral-border)", paddingTop: "8px" }}>
                * For appointments and consultations, call: <a href="tel:6300793688" style={{ color: "var(--primary)", fontWeight: 600 }}>6300793688</a>.
              </p>
            </div>

            <div className="sidebar-card contact-card">
              <h3>Quick Contact</h3>
              <ul className="sidebar-contacts">
                <li>
                  <i className="fas fa-phone-alt"></i>
                  <a href="tel:+916300793688">+91 63007 93688</a>
                </li>
                <li>
                  <i className="fab fa-whatsapp"></i>
                  <a href="https://wa.me/916300793688" target="_blank" rel="noopener noreferrer">WhatsApp Chat</a>
                </li>
                <li>
                  <i className="fas fa-envelope"></i>
                  <a href="mailto:info@drsaisekharphysician.com">info@drsaisekharphysician.com</a>
                </li>
              </ul>
            </div>
            
            <div className="sidebar-form-wrapper">
              <ContactForm />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "40px" }}>
          <RegionalSEOBlock useCardOnly={true} />
        </div>
      </div>

      
    </div>
  );
}
