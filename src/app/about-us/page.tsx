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
    const res = await fetch("https://admin.drsaisekharphysician.com/api/client/get-dynamic-page-list", {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(300)
    });
    if (!res.ok) throw new Error("Failed to fetch");
    const json = await res.json();
    const page = json.data?.find((p: { slug: string, content: string }) => p.slug === "about-us");
    return page ? page.content : "";
  } catch (err) {
    return "";
  }
}

function cleanAndSanitizeContent(html: string): string {
  return `
    <p className="about-p">Welcome to <strong>Dr. Sai Sekhar Pyla&apos;s</strong> official website, your trusted destination for expert medical care. With over <strong>12 years of experience</strong>, Dr. Sai Sekhar Pyla is a renowned Consultant Physician specializing in General Medicine, Diabetology, and Infectious Diseases.</p>
    <p className="about-p">Our clinic is dedicated to providing <strong>comprehensive healthcare</strong>, ranging from preventive medicine to the management of chronic diseases like <strong>diabetes, hypertension, and infectious diseases</strong>. We strive to offer patient-centric care with a focus on early diagnosis and effective treatment. We are committed to providing the <strong>best physician services in Visakhapatnam / Vizag</strong>.</p>
    <p className="about-p-highlight">Visit us at <strong style="color: var(--primary);">Trinetra Medicals</strong>, Muralinagar, Visakhapatnam for personalized consultation and dedicated chronic condition management.</p>
  `;
}

export default async function AboutUsPage() {
  const content = await getAboutUsContent();
  const cleanedContent = cleanAndSanitizeContent(content);

  return (
    <div className="about-page-wrapper">
      <div className="container">
        
        {/* SECTION 1: Top 2-Column Row (About Us Text on Left + Doctor Image on Right) */}
        <div className="about-top-grid">
          {/* Left Column */}
          <div className="about-top-text">
            <div>
              <span className="badge-pill">LEARN MORE</span>
              <h1 className="page-title about-title">About Us</h1>
              <p className="page-subtitle about-subtitle">
                Dedicated to delivering professional and patient-centered healthcare
              </p>

              <div 
                className="rich-text-content about-rich-text"
                dangerouslySetInnerHTML={{ __html: cleanedContent }}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="about-top-media">
            <div className="image-card about-hero-image-card">
              <Image
                src="/images/three.webp"
                alt="Dr. Sai Sekhar Clinic Care"
                width={550}
                height={420}
                className="about-side-img"
                sizes="(max-width: 991px) 100vw, 550px"
                priority
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Bottom 2-Column Row */}
        <div className="about-bottom-grid">
          {/* Left Box: Why Choose Dr. Sai Sekhar? */}
          <div className="highlights-list-card equal-bottom-card">
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

          {/* Right Box: Need to Consult Dr. Sai Sekhar P? */}
          <div className="cta-block equal-bottom-card">
            <div>
              <span className="badge-pill cta-badge">APPOINTMENTS</span>
              <h3 className="cta-heading">
                Need to Consult Dr. Sai Sekhar P?
              </h3>
              <p className="cta-desc">
                Schedule an appointment at Trinetra Medicals today for expert consultation, early diagnosis, and comprehensive treatment plans.
              </p>
            </div>

            <div className="cta-buttons">
              <Link href="/contact" prefetch={true} className="btn btn-pill-primary cta-action-btn">
                Book an Appointment <i className="fas fa-calendar-alt" style={{ marginLeft: "6px" }}></i>
              </Link>
              <Link href="/services" prefetch={true} className="btn btn-pill-outline cta-action-btn">
                Browse Services
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
