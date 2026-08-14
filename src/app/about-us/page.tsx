import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "About Dr. Sai Sekhar P Clinic | Consultant Physician in Visakhapatnam",
  description: "Learn about Dr. Sai Sekhar P's clinic, his mission to provide expert primary care, diabetes treatment, and preventative health services in Visakhapatnam.",
};

async function getAboutUsContent() {
  try {
    const res = await fetch("https://admin.drsaisekharphysician.com/api/client/get-dynamic-page-list", { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch");
    const json = await res.json();
    const page = json.data.find((p: { slug: string, content: string }) => p.slug === "about-us");
    let content = page ? page.content : "";
    content = content.replace(/<h2>.*?<\/h2>/i, "");
    content = content.replace(/<strong>([^<]*CARE Hospital[^<]*)<\/strong>/gi, "$1");
    content = content.replace(/<b>([^<]*CARE Hospital[^<]*)<\/b>/gi, "$1");
    return content;
  } catch (err) {
    console.error("Error fetching about-us content:", err);
    return `
      <h2>About Us</h2>
      <p>Welcome to <strong>Dr. Sai Sekhar P&apos;s</strong> official website, your trusted destination for expert medical care. With over <strong>12 years of experience</strong>, Dr. Sai Sekhar P is a renowned Consultant Physician specializing in General Medicine, Diabetology, and Infectious Diseases.</p>
      <p>Our clinic is dedicated to providing <strong>comprehensive healthcare</strong>, ranging from preventive medicine to the management of chronic diseases like <strong>diabetes, hypertension, and infectious diseases</strong>. We strive to offer patient-centric care with a focus on early diagnosis and effective treatment. We are committed to providing the <strong>best physician services in Visakhapatnam / Vizag</strong>.</p>
      <p>Visit us at Trinetra Medicals, Muralinagar, Visakhapatnam.</p>
    `;
  }
}

export default async function AboutUsPage() {
  const content = await getAboutUsContent();

  return (
    <div className="about-page-wrapper">
      {/* Main Content */}
      <div className="container main-content-container scroll-reveal" style={{ marginTop: "40px" }}>
        <div className="about-grid">
          <div className="about-text-content">
            <div style={{ marginBottom: "2rem" }}>
              <span className="badge">Learn More</span>
              <h1 className="page-title" style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>About Us</h1>
              <p className="page-subtitle" style={{ margin: 0, color: "var(--neutral-muted)" }}>Dedicated to delivering professional and patient-centered healthcare</p>
            </div>
            
            <div 
              className="rich-text-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            
            <div className="highlights-list-card" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
              <h3>Why Choose Dr. Sai Sekhar?</h3>
              <ul className="perks-list">
                <li>
                  <i className="fas fa-check-circle perk-icon"></i>
                  <div>
                    <strong>Attentive Listening:</strong> Every symptom is heard carefully before any diagnosis is advised.
                  </div>
                </li>
                <li>
                  <i className="fas fa-check-circle perk-icon"></i>
                  <div>
                    <strong>Detailed Explanations:</strong> Clear details on diagnoses, therapy choices, and prevention.
                  </div>
                </li>
                <li>
                  <i className="fas fa-check-circle perk-icon"></i>
                  <div>
                    <strong>Critical Care Experience:</strong> Strong background handling acute and critical medical cases in ICU.
                  </div>
                </li>
                <li>
                  <i className="fas fa-check-circle perk-icon"></i>
                  <div>
                    <strong>Diagnostic Accuracy:</strong> Prompt detection of lifestyle and infectious diseases.
                  </div>
                </li>
              </ul>
            </div>
            
          </div>

          <div className="about-media-content">
            <div className="image-card">
              <Image
                src="/images/three.webp"
                alt="Dr. Sai Sekhar Clinic Care"
                width={500}
                height={350}
                className="about-side-img"
                sizes="(max-width: 991px) 100vw, 500px"
              />
            </div>
            
            <div className="cta-block" style={{ marginTop: "2rem" }}>
              <h3>Need to Consult Dr. Sai Sekhar P?</h3>
              <p>Schedule an appointment at Trinetra Medicals today.</p>
              <div className="cta-buttons">
                <Link href="/contact" className="btn btn-primary">
                  Book an Appointment
                </Link>
                <Link href="/services" className="btn btn-secondary">
                  Browse Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}
