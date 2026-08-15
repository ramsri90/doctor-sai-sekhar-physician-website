import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HomeSlider from "@/components/HomeSlider";
import ReviewsSection from "@/components/ReviewsSection";
import ContactForm from "@/components/ContactForm";
import AnimatedCounterSection from "@/components/AnimatedCounterSection";
import VideoReelsSection from "@/components/VideoReelsSection";

// Force static rendering with dynamic revalidation (ISR)
export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Dr. Sai Sekhar Pyla | Best General Physician in Visakhapatnam",
  description: "Consult the best General Physician & Diabetologist in Visakhapatnam. Dr. Sai Sekhar treats diabetes, thyroid, & fevers at Trinetra Medicals.",
  keywords: [
    "best physician Visakhapatnam", "best general physician Vizag", "Dr Sai Sekhar",
    "general doctor Muralinagar", "physician near me Visakhapatnam",
    "diabetes doctor Vizag", "thyroid doctor Visakhapatnam", "Trinetra Medicals",
  ],
  alternates: { canonical: "https://www.drsaisekharphysician.com" },
  openGraph: {
    title: "Dr. Sai Sekhar Pyla | Best Physician in Visakhapatnam",
    description: "Consult the best General Physician & Diabetologist in Visakhapatnam. Dr. Sai Sekhar treats diabetes, thyroid, & fevers.",
    url: "https://www.drsaisekharphysician.com",
    siteName: "Trinetra Medicals",
    images: [
      {
        url: "https://www.drsaisekharphysician.com/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Dr. Sai Sekhar Pyla - Consultant Physician",
      },
    ],
    type: "website",
  },
};

async function getClinicData() {
  const baseURL = "https://admin.drsaisekharphysician.com/api/client/";
  
  const fallbackSettings = {
    contact: {
      phone: "6300793688",
      whatsapp_no: "6300793688",
      email: "info@drsaisekharphysician.com"
    }
  };

  const fallbackCounters = [
    { id: 1, title: "Patients Treated", count: "2,00,000+" },
    { id: 2, title: "Chronic Disease Management Cases", count: "1,00,000+" },
    { id: 3, title: "Preventive Health Screenings", count: "50,000+" },
    { id: 4, title: "Emergency Cases Handled", count: "30,000+" }
  ];

  const fallbackServices = [
    { id: 1, category_name: "Diabetes", services: [{ name: "Type II DM", slug: "type-ii-dm" }] },
    { id: 2, category_name: "Thyroid Disorder", services: [{ name: "Hypothyroidism", slug: "hypothyroidism" }] },
    { id: 3, category_name: "Fever & Infections", services: [{ name: "Dengue fever", slug: "dengue-fever" }] },
    { id: 4, category_name: "Cardiac & Hypertension", services: [{ name: "Hypertension (HTN)", slug: "hypertension-htn" }] }
  ];

  try {
    const [bannersRes, settingsRes, countersRes, servicesRes] = await Promise.all([
      fetch(`${baseURL}get-banners-list`, { next: { revalidate: 3600 } }).then(res => res.json()).catch(() => null),
      fetch(`${baseURL}get-settings`, { next: { revalidate: 3600 } }).then(res => res.json()).catch(() => null),
      fetch(`${baseURL}get-counter-list`, { next: { revalidate: 3600 } }).then(res => res.json()).catch(() => null),
      fetch(`${baseURL}get-services-list`, { next: { revalidate: 3600 } }).then(res => res.json()).catch(() => null),
    ]);

    // Format target fallback details on counter items if needed
    // The API is returning old data, so we force the updated fallback counts instead
    const APIcounters = countersRes?.data || [];
    const mergedCounters = fallbackCounters.map((fallback, idx) => {
      const apiItem = APIcounters[idx];
      return {
        id: fallback.id,
        count: fallback.count, // Override API with the new requested values
        title: fallback.title // keep exact specified title
      };
    });

    let fetchedServices = servicesRes?.data || fallbackServices;
    // Filter out osteoarthritis from API data
    fetchedServices = fetchedServices.map((cat: any) => ({
      ...cat,
      services: cat.services ? cat.services.filter((s: any) => s.slug !== 'osteoarthritis') : []
    }));

    return {
      banners: bannersRes?.data || [],
      settings: settingsRes?.data || fallbackSettings,
      counters: mergedCounters,
      services: fetchedServices,
    };
  } catch (error) {
    console.error("Error fetching clinic data, using fallbacks:", error);
    return {
      banners: [],
      settings: fallbackSettings,
      counters: fallbackCounters,
      services: fallbackServices,
    };
  }
}

export default async function HomePage() {
  const data = await getClinicData();

  return (
    <div className="home-page">
      {/* SEO H1 — visually embedded in hero, exactly one per page (slider uses h2) */}
      <div className="sr-h1-hero">
        <h1>Dr. Sai Sekhar Pyla – Best Physician in Visakhapatnam</h1>
        <p>MBBS, MD General Medicine | Trinetra Medicals, Muralinagar</p>
      </div>

      {/* AEO Featured Snippet / Top Summary Signal */}
      <div className="sr-only">
        <p><strong>Key Takeaway:</strong> Dr. Sai Sekhar Pyla is an MD General Medicine physician and diabetologist based in Visakhapatnam, with 12 years of experience treating diabetes, hypertension, and infectious diseases. He is a gold medalist known for his patient-centered approach at Trinetra Medicals.</p>
      </div>

      {/* 1. Hero Slideshow Section */}
      <HomeSlider banners={data.banners} />

      {/* 2. Doctor Bio Section */}
      <section className="about-doctor-section scroll-reveal">
        <div className="container doctor-grid">
          <div className="doctor-blob-wrapper">
            <Image
              src="/images/two.webp"
              alt="Dr. Sai Sekhar P - Consultant Physician"
              width={450}
              height={550}
              className="blob-mask"
              priority
              sizes="(max-width: 767px) 100vw, 450px"
            />
            <div className="floating-glass-badge glass-panel">
              <span className="exp-num" style={{ color: "var(--primary)" }}>12</span>
              <span className="exp-text">Years of Medical Excellence</span>
            </div>
          </div>
          
          <div className="doctor-info-content">
            <span className="badge">About the Physician</span>
            <h2 className="section-title"><span className="doctor-name-highlight">Dr. Sai Sekhar Pyla</span></h2>
            <p className="doctor-credentials" style={{ fontSize: "1.2rem", fontWeight: "600", color: "var(--text)", marginBottom: "5px" }}>MBBS, MD (General Medicine) | Consultant Physician</p>
            <p className="doctor-specialty-desc" style={{ marginBottom: "15px" }}>
              Consultant Physician at CARE Hospital & <strong>Trinetra Medicals</strong>
            </p>

            <p className="doctor-bio-paragraph">
              If you are wondering <strong>when should I see a physician</strong>, or if you are experiencing persistent fatigue, unexplained weight changes, or managing a chronic condition like diabetes or thyroid disorders, <span className="doctor-name-highlight">Dr. Sai Sekhar Pyla's</span> General Medicine practice provides comprehensive care. With 12 years of clinical expertise, he specializes in the management of critical care, lifestyle diseases, and preventive healthcare.
            </p>
            <p className="doctor-bio-paragraph">
              Currently serving as a Consultant Physician at CARE Hospital, Visakhapatnam, and primarily at <strong>Trinetra Medicals</strong>, <span className="doctor-name-highlight">Dr. Sai Sekhar</span> is known for his evidence-based, patient-centered approach. Whether you want to know <em>how to manage type 2 diabetes</em> or need immediate treatment for acute infectious fevers, his expertise includes:
            </p>

            <div className="doctor-key-highlights">
              <div className="highlight-item">
                <i className="fas fa-stethoscope highlight-icon"></i>
                <div>
                  <h4>Primary Timings</h4>
                  <p>Trinetra Medicals (Muralinagar): 6:00 PM – 9:00 PM</p>
                </div>
              </div>
              <div className="highlight-item">
                <i className="fas fa-certificate highlight-icon"></i>
                <div>
                  <h4>Experience & Specialization</h4>
                  <p>12 Years of Experience in Diabetology & Infectious Diseases</p>
                </div>
              </div>
            </div>

            <div className="bio-buttons">
              <Link href="/about-doctor" className="btn btn-primary btn-gradient">
                Read Detailed Bio <i className="fas fa-arrow-right"></i>
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Metric Counter Section */}
      <AnimatedCounterSection initialCounters={data.counters} />

      {/* 4. Services Grid Section */}
      <section className="services-section bg-gradient-mesh scroll-reveal">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge">Our Specialties</span>
            <h2 className="section-title">Medical Services & Care</h2>
            <p className="section-subtitle">Dedicated primary, chronic, and preventative healthcare services</p>
          </div>

          <div className="services-category-grid">
            {data.services.slice(0, 8).map((cat: { id: number | string, category_name: string, services: Array<{ id: number | string, slug: string, name: string }> }) => (
              <div key={cat.id} className="service-cat-card-modern">
                <div className="cat-header">
                  <div className="duotone-icon">
                    <i className="fas fa-notes-medical"></i>
                  </div>
                  <h3 className="cat-title" style={{ marginBottom: "1rem" }}>{cat.category_name}</h3>
                </div>
                
                {cat.services && cat.services.length > 0 && (
                  <ul className="cat-services-list" style={{ flexGrow: 1 }}>
                    {cat.services.slice(0, 3).map((s: { id: number | string, slug: string, name: string }) => (
                      <li key={s.id}>
                        <Link href={`/services/${s.slug}`} className="service-sublink">
                          <i className="fas fa-angle-right"></i> {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                
                <Link href="/services" className="cat-view-all">
                  View All Services <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center section-footer-cta">
            <Link href="/services" className="btn btn-primary btn-gradient">
              View Complete Services Catalog <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Video Reels Section */}
      <VideoReelsSection />

      {/* 7. Testimonials Section */}
      <ReviewsSection />

      {/* 8. Patient FAQ & Medical Advice (AEO Optimization) */}
      <section className="aeo-faq-section scroll-reveal" style={{ padding: "4rem 0", background: "var(--background-alt)" }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="badge">Frequently Asked Questions</span>
            <h2 className="section-title">Common Patient Queries</h2>
          </div>
          
          <div className="faq-grid" style={{ display: "grid", gap: "2rem", maxWidth: "900px", margin: "0 auto" }}>
            <details className="faq-item" style={{ background: "var(--card-bg)", padding: "1.5rem 2rem", borderRadius: "12px", boxShadow: "var(--shadow-md)", cursor: "pointer", transition: "all 0.3s ease" }}>
              <summary style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--text-dark)", outline: "none" }}>
                What conditions does a General Physician treat?
              </summary>
              <p style={{ marginTop: "1rem", color: "var(--text)", lineHeight: "1.6" }}>A General Physician is your primary point of contact for adult healthcare. Dr. Sai Sekhar treats a wide range of acute and chronic conditions, including viral fevers, respiratory infections, gastrointestinal issues, and metabolic disorders. According to the <a href="https://www.who.int/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)", textDecoration: "underline" }}>World Health Organization (WHO)</a>, primary care physicians handle the vast majority of personal health needs safely and effectively.</p>
            </details>

            <details className="faq-item" style={{ background: "var(--card-bg)", padding: "1.5rem 2rem", borderRadius: "12px", boxShadow: "var(--shadow-md)", cursor: "pointer", transition: "all 0.3s ease" }}>
              <summary style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--text-dark)", outline: "none" }}>
                When should you see a Diabetologist in Vizag?
              </summary>
              <p style={{ marginTop: "1rem", color: "var(--text)", lineHeight: "1.6" }}>You should consult a diabetologist if your fasting blood sugar is consistently above 126 mg/dL, if you experience excessive thirst or frequent urination, or if you have a family history of diabetes. Early intervention is critical; as per <a href="https://main.icmr.nic.in/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)", textDecoration: "underline" }}>ICMR guidelines</a>, timely management of Type 2 Diabetes prevents severe complications like neuropathy and kidney disease.</p>
            </details>

            <details className="faq-item" style={{ background: "var(--card-bg)", padding: "1.5rem 2rem", borderRadius: "12px", boxShadow: "var(--shadow-md)", cursor: "pointer", transition: "all 0.3s ease" }}>
              <summary style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--text-dark)", outline: "none" }}>
                How is Dr. Sai Sekhar different from other physicians in Visakhapatnam?
              </summary>
              <p style={{ marginTop: "1rem", color: "var(--text)", lineHeight: "1.6" }}>Dr. Sai Sekhar brings 12 years of specialized experience in both critical care and chronic disease management. His approach focuses on evidence-based medicine and comprehensive lifestyle counseling rather than just prescribing medication. He prioritizes taking a detailed medical history to uncover the root cause of symptoms.</p>
            </details>

            <details className="faq-item" style={{ background: "var(--card-bg)", padding: "1.5rem 2rem", borderRadius: "12px", boxShadow: "var(--shadow-md)", cursor: "pointer", transition: "all 0.3s ease" }}>
              <summary style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--text-dark)", outline: "none" }}>
                What should I expect during my first consultation?
              </summary>
              <p style={{ marginTop: "1rem", color: "var(--text)", lineHeight: "1.6" }}>During your initial visit at Trinetra Medicals, expect a thorough review of your medical history, a physical examination, and a detailed discussion of your current symptoms. Dr. Sai Sekhar will explain your diagnosis clearly and work with you to develop a personalized, easy-to-follow treatment and diet plan.</p>
            </details>
          </div>
        </div>
      </section>

      {/* 9. Contact Map Section */}
      <section className="contact-map-section scroll-reveal">
        <div className="container contact-map-grid">
          {/* Map Embed */}
          <div className="map-wrapper">
            <div className="map-header">
              <span className="badge">Location</span>
              <h3 className="map-title">Trinetra Medicals</h3>
              <p className="map-desc">Opposite Govt School, Ramalayam Street, Muralinagar, Visakhapatnam, 530007</p>
            </div>
            <div className="map-iframe-container styled-map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60799.59690698831!2d83.18353544863278!3d17.745826199999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a395d0384a06819%3A0x45ef7110571ff582!2sDr%20SAI%20SEKHAR%20P!5e0!3m2!1sen!2sin!4v1786558233514!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location - Dr. Sai Sekhar P Clinic"
                className="map-iframe"
              ></iframe>
            </div>
            <div className="map-directions-cta">
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

          {/* Contact Form */}
          <div className="form-wrapper">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Freshness Signal for GEO/SEO */}
      <div className="container" style={{ textAlign: "center", paddingBottom: "2rem", fontSize: "0.85rem", color: "var(--text-light)" }}>
        <p>Medical information last updated: <strong>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</strong></p>
      </div>

    </div>
  );
}
