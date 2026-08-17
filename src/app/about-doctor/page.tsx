import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "About Dr. Sai Sekhar P | MD General Medicine | Diabetologist | Infectious Disease Specialist",
  description: "Read about Dr. Sai Sekhar P's medical qualifications, 12 years of experience as a Consultant Physician, and specializations in diabetes and infectious diseases.",
};

async function getAboutDoctorContent() {
  try {
    const res = await fetch("https://admin.drsaisekharphysician.com/api/client/get-dynamic-page-list", {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(300)
    });
    if (!res.ok) throw new Error("Failed to fetch");
    const json = await res.json();
    const page = json.data?.find((p: { slug: string, content: string }) => p.slug === "about-doctor");
    return page ? page.content : "";
  } catch (err) {
    console.error("Error fetching about-doctor content:", err);
    return `
      <h2>About Dr. Sai Sekhar Pyla</h2>
      <p><strong>Dr. Sai Sekhar Pyla</strong>, MBBS, MD (General Medicine), is a highly experienced physician with a passion for providing top-quality medical care. With <strong>12 years of expertise</strong>, he specializes in the management of critical care, lifestyle diseases, and preventive healthcare. He is the best physician in Visakhapatnam with great knowledge.</p>
      <p>Currently serving as a Consultant Physician at CARE Hospital, Visakhapatnam, and primarily at <strong style="color: #0d7a66;">Trinetra Medicals</strong>, Dr. Sai Sekhar Pyla is known for his patient-centered approach and commitment to medical excellence. His expertise includes:</p>
      <h3>Core Clinical Areas</h3>
      <ul>
        <li><strong>Diabetes Management</strong></li>
        <li><strong>Hypertension & Lipidology</strong></li>
        <li><strong>Infectious Diseases</strong></li>
        <li><strong>Asthma & COPD</strong></li>
        <li><strong>Critical Care & ICU</strong></li>
        <li><strong>Preventive Checkups</strong></li>
      </ul>
      <p>For appointments and consultations, call: <strong style="color: #0d7a66; font-size: 1.1em;">6300793688</strong>.</p>
    `;
  }
}

function cleanAndSanitizeContent(html: string): string {
  if (!html) return "";
  
  return html
    // 1. Remove image tags from raw dynamic HTML
    .replace(/<p><img[^>]*><\/p>/gi, "")
    .replace(/<img[^>]*>/gi, "")
    
    // 2. Fix 10 years / 10&nbsp;years -> 12 years
    .replace(/10\s*(&nbsp;)?\s*years/gi, "12 years")
    
    // 3. Un-highlight CARE Hospital (remove <strong> tag surrounding CARE Hospital)
    .replace(/<strong>([^<]*CARE Hospital[^<]*)<\/strong>/gi, "$1")
    
    // 4. Update sentence 2 with primarily at Trinetra Medicals
    .replace(/Currently serving as a Consultant Physician at CARE Hospital, Visakhapatnam.*known for/gi, 'Currently serving as a Consultant Physician at CARE Hospital, Visakhapatnam, and primarily at <strong style="color: #0d7a66;">Trinetra Medicals</strong>, Dr. Sai Sekhar Pyla is known for')
    
    // 5. Highlight Trinetra Medicals cleanly
    .replace(/Trinetra\s*Medicals/gi, '<strong style="color: #0d7a66;">Trinetra Medicals</strong>');
}

export default async function AboutDoctorPage() {
  const content = await getAboutDoctorContent();
  const cleanedContent = cleanAndSanitizeContent(content);

  return (
    <div className="about-page-wrapper">
      {/* Header Banner */}
      <div className="page-header bg-gradient-mesh">
        <div className="container">
          <span className="badge">Physician Profile</span>
          <h1 className="page-title">Dr. Sai Sekhar P</h1>
          <p className="page-subtitle">MD General Medicine | Diabetologist | Infectious Disease Specialist | Trinetra Medicals, Muralinagar, Visakhapatnam</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container main-content-container scroll-reveal">
        <div className="doctor-grid-about">
          <div className="doctor-image-container">
            <div className="doctor-image-card">
              <Image
                src="/images/two.webp"
                alt="Dr. Sai Sekhar P - Best Physician in Visakhapatnam"
                width={400}
                height={500}
                className="doctor-profile-img"
                sizes="(max-width: 991px) 100vw, 400px"
              />
            </div>
            
            <div className="qualifications-card">
              <h3>Qualifications & Experience</h3>
              <ul className="qual-list">
                <li>
                  <i className="fas fa-user-md qual-icon"></i>
                  <div>
                    <strong style={{ color: "var(--primary)", fontSize: "1.05rem" }}>Dr. Sai Sekhar P</strong>
                    <p style={{ marginTop: "2px", fontWeight: "bold", color: "var(--neutral-dark)" }}>
                      Best Physician in Visakhapatnam / Vizag
                    </p>
                  </div>
                </li>
                <li>
                  <i className="fas fa-graduation-cap qual-icon"></i>
                  <div>
                    <strong>MD General Medicine | Diabetologist</strong>
                    <p>Infectious Disease Specialist · JJM Medical College</p>
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
                  <i className="fas fa-award qual-icon"></i>
                  <div>
                    <strong style={{ color: "var(--primary)" }}>12 Years Clinical Experience</strong>
                    <p>Specialist in Critical Care, Lifestyle Diseases & Diabetology</p>
                  </div>
                </li>
                <li>
                  <i className="fas fa-clinic-medical qual-icon"></i>
                  <div>
                    <strong style={{ color: "var(--primary)" }}>Trinetra Medicals</strong>
                    <p>Muralinagar, Visakhapatnam (6:00 PM – 9:00 PM)</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="doctor-details-content">
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
