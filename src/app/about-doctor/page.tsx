import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "About Dr. Sai Sekhar P | MD General Medicine | Diabetologist | Infectious Disease Specialist",
  description: "Read about Dr. Sai Sekhar P's medical qualifications, 12 years of experience as a Consultant Physician, and specializations in diabetes and infectious diseases.",
};

async function getAboutDoctorContent() {
  // Override the API completely as it is serving outdated content
  return `
    <h2>About Dr. Sai Sekhar Pyla</h2>
    <p><strong>Dr. Sai Sekhar Pyla</strong>, MBBS, MD (General Medicine), is a highly experienced physician with a passion for providing top-quality medical care. With <strong>12 years of expertise</strong>, he specializes in the management of <strong>critical care, lifestyle diseases, and preventive healthcare</strong>. He is the best physician in Visakhapatnam with great knowledge.</p>
    <p>Currently serving as a <strong>Consultant Physician at CARE Hospital, Visakhapatnam</strong>, Dr. Sai Sekhar Pyla is known for his patient-centered approach and commitment to medical excellence. His expertise includes:</p>
  `;
}

export default async function AboutDoctorPage() {
  const content = await getAboutDoctorContent();

  // Strip image tag from database content if we are rendering a custom local optimized image instead to prevent duplicates
  // The database content starts with '<p><img src="..." ... /></p>'
  const cleanedContent = content.replace(/<p><img[^>]*><\/p>/i, "").replace(/<img[^>]*>/i, "");

  return (
    <div className="about-page-wrapper">
      {/* Main Content */}
      <div className="container main-content-container scroll-reveal" style={{ marginTop: "40px" }}>
        <div className="doctor-grid-about">
          <div className="doctor-image-container">
            <div className="doctor-image-card">
              <Image
                src="/images/two.webp"
                alt="Dr. Sai Sekhar P"
                width={400}
                height={500}
                className="doctor-profile-img"
                sizes="(max-width: 991px) 100vw, 400px"
              />
            </div>
            
            <div className="qualifications-card">
              <h3>Qualifications</h3>
              <ul className="qual-list">
                <li>
                  <i className="fas fa-graduation-cap qual-icon"></i>
                  <div>
                    <strong>MD (General Medicine)</strong>
                    <p>JJM Medical College, Davanagere</p>
                  </div>
                </li>
                <li>
                  <i className="fas fa-graduation-cap qual-icon"></i>
                  <div>
                    <strong>MBBS</strong>
                    <p>Narayana Medical College</p>
                  </div>
                </li>
                <li>
                  <i className="fas fa-certificate qual-icon"></i>
                  <div>
                    <strong>Registrations & Affiliations</strong>
                    <p>Andhra Pradesh Medical Council</p>
                    <p>Indian Medical Association (IMA)</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="doctor-details-content">
            <div style={{ marginBottom: "2rem" }}>
              <span className="badge">Physician Profile</span>
              <h1 className="page-title" style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>Dr. Sai Sekhar Pyla</h1>
              <p className="page-subtitle" style={{ margin: 0, color: "var(--neutral-muted)" }}>MBBS, MD (General Medicine) | Consultant Physician, CARE Hospital</p>
            </div>

            <div 
              className="rich-text-content"
              dangerouslySetInnerHTML={{ __html: cleanedContent }}
            />

            <div className="specialties-grid">
              <h3 className="specialties-title">Core Clinical Areas</h3>
              <div className="spec-items">
                <div className="spec-item">
                  <i className="fas fa-tint spec-icon"></i>
                  <span>Diabetes Management</span>
                </div>
                <div className="spec-item">
                  <i className="fas fa-heartbeat spec-icon"></i>
                  <span>Hypertension & Lipidology</span>
                </div>
                <div className="spec-item">
                  <i className="fas fa-shield-virus spec-icon"></i>
                  <span>Infectious Diseases</span>
                </div>
                <div className="spec-item">
                  <i className="fas fa-lungs spec-icon"></i>
                  <span>Asthma & COPD</span>
                </div>
                <div className="spec-item">
                  <i className="fas fa-procedures spec-icon"></i>
                  <span>Critical Care & ICU</span>
                </div>
                <div className="spec-item">
                  <i className="fas fa-user-shield spec-icon"></i>
                  <span>Preventive Checkups</span>
                </div>
              </div>
            </div>
            
            <div className="cta-block">
              <h3>Book a Consultation</h3>
              <p>Consult Dr. Sai Sekhar P at Trinetra Medicals, Muralinagar (evening timings: 6:00 PM – 9:00 PM).</p>
              <div className="cta-buttons">
                <Link href="/contact" className="btn btn-primary">
                  Book an Appointment
                </Link>
                <Link href="tel:+916300793688" className="btn btn-secondary">
                  <i className="fas fa-phone-alt"></i> Call Clinic
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}
