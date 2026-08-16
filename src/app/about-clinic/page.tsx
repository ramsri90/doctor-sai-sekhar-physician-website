import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Trinetra Medicals Muralinagar | General Medicine Clinic Visakhapatnam | Dr. Sai Sekhar P",
  description: "Trinetra Medicals is a trusted general medicine clinic in Muralinagar, Visakhapatnam led by Dr. Sai Sekhar Pyla. Evening OPD: Monday to Saturday 6 PM – 9 PM. Opposite Govt School, Ramalayam Street, Muralinagar – 530007.",
  keywords: [
    "Trinetra Medicals Muralinagar",
    "clinic Muralinagar Visakhapatnam",
    "general medicine clinic Vizag",
    "doctor clinic near me Muralinagar",
    "evening OPD Visakhapatnam",
    "clinic timings Muralinagar 530007"
  ],
  openGraph: {
    title: "Trinetra Medicals | General Medicine Clinic in Muralinagar, Visakhapatnam",
    description: "Trusted healthcare clinic in Muralinagar led by Dr. Sai Sekhar Pyla. Evening OPD Mon–Sat, 6 PM–9 PM. Call +91 63007 93688.",
    url: "https://www.drsaisekharphysician.com/about-clinic",
    type: "website",
  },
  alternates: {
    canonical: "https://www.drsaisekharphysician.com/about-clinic",
  },
};

async function getAboutClinicContent() {
  try {
    const res = await fetch("https://admin.drsaisekharphysician.com/api/client/get-dynamic-page-list", { next: { revalidate: 3600 }, signal: AbortSignal.timeout(1200) });
    if (!res.ok) throw new Error("Failed to fetch");
    const json = await res.json();
    const page = json.data.find((p: { slug: string, content: string }) => p.slug === "about-clinic");
    let content = page ? page.content : "";
    content = content.replace(/<h2>.*?<\/h2>/i, "");
    content = content.replace(/<strong>([^<]*CARE Hospital[^<]*)<\/strong>/gi, "$1");
    content = content.replace(/<b>([^<]*CARE Hospital[^<]*)<\/b>/gi, "$1");
    return content;
  } catch (err) {
    console.error("Error fetching about-clinic content:", err);
    return `
      <h2>About Our Clinic</h2>
      <p><strong>Trinetra Medicals</strong> is a trusted healthcare facility in <strong>Muralinagar, Visakhapatnam</strong>, led by <span class="doctor-name-highlight">Dr. Sai Sekhar P</span>. We specialize in <strong>comprehensive medical care</strong> with a focus on preventive, diagnostic, and therapeutic treatments. We aim to be the <strong>best physician clinic in Visakhapatnam / Vizag</strong>.</p>
      <p>Conveniently located <strong>beside Abhiruchi Sweets, Ramalayam Street, Muralinagar</strong>, our clinic is equipped with modern medical facilities to ensure accurate diagnoses and effective treatment plans.</p>
      <h3>Clinic Timings</h3>
      <ul>
        <li><strong>Trinetra Medicals (Muralinagar)</strong> &ndash; 6:00 PM to 9:00 PM (Monday &ndash; Saturday)</li>
      </ul>
    `;
  }
}

export default async function AboutClinicPage() {
  const content = await getAboutClinicContent();

  return (
    <div className="about-page-wrapper">
      {/* Main Content */}
      <div className="container main-content-container scroll-reveal" style={{ marginTop: "40px" }}>
        <div className="clinic-grid">
          <div className="clinic-details-content">
            <div style={{ marginBottom: "2rem" }}>
              <span className="badge">Clinic Profile</span>
              <h1 className="page-title" style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>Trinetra Medicals</h1>
              <p className="page-subtitle" style={{ margin: 0, color: "var(--neutral-muted)" }}>Your trusted primary care & diagnostic clinic in Muralinagar, Visakhapatnam</p>
            </div>

            <div 
              className="rich-text-content"
              dangerouslySetInnerHTML={{ __html: content }}
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
                * Dr. Sai Sekhar P is also available at CARE Hospital, Ram Nagar (12:00 PM - 2:00 PM & 4:00 PM - 5:00 PM).
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
      </div>

      
    </div>
  );
}
