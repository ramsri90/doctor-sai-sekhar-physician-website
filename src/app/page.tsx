import Image from "next/image";
import Link from "next/link";
import HomeSlider from "@/components/HomeSlider";
import ReviewsSection from "@/components/ReviewsSection";
import ContactForm from "@/components/ContactForm";
import AnimatedCounterSection from "@/components/AnimatedCounterSection";
import FaqSection from "@/components/FaqSection";
import AwarenessReels from "@/components/AwarenessReels";
import FeaturedServicesTabs from "@/components/FeaturedServicesTabs";
import { getServiceImage } from "@/lib/servicesImageMap";

// Force static rendering with dynamic revalidation (ISR)
export const revalidate = 3600; // Revalidate every hour

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
    { id: 1, category_name: "Diabetes", services: [{ id: 39, name: "Type 1 DM", slug: "type-1-dm" }, { id: 40, name: "Type II DM", slug: "type-ii-dm" }, { id: 41, name: "Diabetic Neuropathy", slug: "diabetic-neuropathy" }] },
    { id: 2, category_name: "Thyroid Disorder", services: [{ id: 44, name: "Hypothyroidism", slug: "hypothyroidism" }, { id: 45, name: "Hyperthyroidism", slug: "hyperthyroidism" }] },
    { id: 3, category_name: "Fever & Infections", services: [{ id: 47, name: "Dengue fever", slug: "dengue-fever" }, { id: 48, name: "Malaria", slug: "malaria" }, { id: 49, name: "UTI", slug: "urinary-tract-infection-uti" }] },
    { id: 4, category_name: "Headache Care", services: [{ id: 54, name: "Tension Headache", slug: "tension-headache" }, { id: 55, name: "Migraine", slug: "migraine" }] },
    { id: 5, category_name: "Bone and Joint", services: [{ id: 58, name: "Rheumatoid Arthritis", slug: "rheumatoid-arthritis" }, { id: 59, name: "Cervical Spondylosis", slug: "cervical-spondylosis" }] },
    { id: 6, category_name: "Gastro Intestinal", services: [{ id: 61, name: "Acute Gastritis", slug: "acute-gastritis" }, { id: 63, name: "Diarrhea", slug: "acute-and-chronic-diarrhea" }] },
    { id: 7, category_name: "Renal Care", services: [{ id: 66, name: "Acute Renal Failure", slug: "acute-renal-failure" }, { id: 69, name: "Kidney stones", slug: "kidney-stones" }] },
    { id: 8, category_name: "Cardiac & Hypertension", services: [{ id: 43, name: "Hypertension (HTN)", slug: "hypertension-htn" }, { id: 70, name: "Ischemic Heart Disease", slug: "ischemic-heart-disease" }] }
  ];

  const fetchOpts = {
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(300)
  };

  try {
    const [bannersRes, settingsRes, countersRes, servicesRes, videosRes] = await Promise.all([
      fetch(`${baseURL}get-banners-list`, fetchOpts).then(res => res.json()).catch(() => null),
      fetch(`${baseURL}get-settings`, fetchOpts).then(res => res.json()).catch(() => null),
      fetch(`${baseURL}get-counter-list`, fetchOpts).then(res => res.json()).catch(() => null),
      fetch(`${baseURL}get-services-list`, fetchOpts).then(res => res.json()).catch(() => null),
      fetch(`${baseURL}get-videos-list`, fetchOpts).then(res => res.json()).catch(() => null)
    ]);

    const mergedCounters = fallbackCounters.map((fallback) => {
      return {
        id: fallback.id,
        count: fallback.count,
        title: fallback.title
      };
    });

    return {
      banners: bannersRes?.data || [],
      settings: settingsRes?.data || fallbackSettings,
      counters: mergedCounters,
      services: (servicesRes?.data && servicesRes.data.length > 0) ? servicesRes.data : fallbackServices,
      videos: videosRes?.data || []
    };
  } catch (error) {
    return {
      banners: [],
      settings: fallbackSettings,
      counters: fallbackCounters,
      services: fallbackServices,
      videos: []
    };
  }
}

export default async function HomePage() {
  const data = await getClinicData();

  return (
    <div className="home-page">
      {/* WebPage & Physician Structured Schema (AEO/GEO/SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": "https://www.drsaisekharphysician.com/#webpage",
                "url": "https://www.drsaisekharphysician.com/",
                "name": "Dr Sai Sekhar P | Best Physician in Visakhapatnam / Vizag",
                "description": "Dr. Sai Sekhar P is the best physician in Visakhapatnam / Vizag. MD General Medicine, Diabetologist, & Infectious Disease Specialist at Trinetra Medicals, Muralinagar.",
                "datePublished": "2024-01-01T00:00:00+05:30",
                "dateModified": "2026-08-18T00:00:00+05:30",
                "inLanguage": "en-IN",
                "isPartOf": {
                  "@type": "WebSite",
                  "@id": "https://www.drsaisekharphysician.com/#website",
                  "url": "https://www.drsaisekharphysician.com/",
                  "name": "Dr. Sai Sekhar P - General Physician Visakhapatnam"
                },
                "about": {
                  "@type": "Person",
                  "@id": "https://www.drsaisekharphysician.com/#physician",
                  "name": "Dr. Sai Sekhar P (Dr. Sai Sekhar Pyla)",
                  "jobTitle": "MD General Medicine | Diabetologist | Infectious Disease Specialist",
                  "medicalSpecialty": ["GeneralMedicine", "Endocrinology", "InfectiousDisease"],
                  "telephone": "+916300793688"
                }
              },
              {
                "@type": "Physician",
                "@id": "https://www.drsaisekharphysician.com/#physician",
                "name": "Dr. Sai Sekhar P",
                "alternateName": ["Dr. Sai Sekhar Pyla", "Best Physician in Visakhapatnam / Vizag"],
                "medicalSpecialty": ["GeneralMedicine", "Diabetology", "InfectiousDisease"],
                "telephone": "+916300793688",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Beside Abhiruchi Sweets, Ramalayam Street, Muralinagar",
                  "addressLocality": "Visakhapatnam",
                  "addressRegion": "Andhra Pradesh",
                  "postalCode": "530007",
                  "addressCountry": "IN"
                }
              },
              {
                "@type": "FAQPage",
                "@id": "https://www.drsaisekharphysician.com/#faq",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Who is the best physician in Visakhapatnam / Vizag?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Dr. Sai Sekhar P (MD General Medicine, Diabetologist, Infectious Disease Specialist) with 12 years of clinical experience is widely recognized as the best physician in Visakhapatnam / Vizag. He practices primarily at Trinetra Medicals, Muralinagar, Visakhapatnam."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Where is Dr. Sai Sekhar P's clinic located in Visakhapatnam?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Dr. Sai Sekhar P practices at Trinetra Medicals, located Beside Abhiruchi Sweets, Ramalayam Street, Muralinagar, Visakhapatnam (6:00 PM to 9:00 PM, Monday to Saturday)."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What conditions does Dr. Sai Sekhar P treat?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Dr. Sai Sekhar P specializes in Type 1 & Type 2 Diabetes management, Thyroid disorders (Hypo/Hyperthyroidism), Dengue & Infectious fevers, Hypertension, Asthma/COPD, Gastrointestinal issues, and Kidney care."
                    }
                  }
                ]
              }
            ]
          })
        }}
      />

      {/* 1. Hero Slideshow Section */}
      <HomeSlider banners={data.banners} />

      {/* 2. Doctor Bio Section */}
      <section className="about-doctor-section scroll-reveal">
        <div className="container doctor-grid">
          <div className="doctor-image-wrapper">
            <div className="doctor-blob-bg">
              <Image
                src="/images/two.webp"
                alt="Dr. Sai Sekhar Pyla - General Physician in Visakhapatnam"
                width={450}
                height={550}
                className="doctor-main-image"
                priority
                sizes="(max-width: 767px) 100vw, 450px"
              />
            </div>
            <div className="doctor-experience-badge">
              <span className="exp-num">12</span>
              <span className="exp-text">YEARS OF MEDICAL EXCELLENCE</span>
            </div>
          </div>
          
          <div className="doctor-info-content">
            <span className="badge-pill">ABOUT THE PHYSICIAN</span>
            <h1 className="section-title-doctor">
              Dr. Sai Sekhar Pyla
            </h1>
            <h2 className="doctor-credentials-subtitle">
              MD General Medicine | Diabetologist | Infectious Disease Specialist
            </h2>
            <p className="doctor-hospitals-subtitle">
              Consultant Physician at CARE Hospital & <strong>Trinetra Medicals, Muralinagar, Visakhapatnam</strong>
            </p>

            {/* Featured Highlight Card - Best Physician in Visakhapatnam / Vizag */}
            <div className="top-key-takeaway-card" style={{ backgroundColor: "#f0fdf4", borderLeft: "4px solid var(--primary)", padding: "14px 18px", borderRadius: "12px", marginBottom: "16px" }}>
              <p style={{ margin: 0, fontSize: "0.98rem", color: "var(--neutral-dark)", lineHeight: 1.6 }}>
                <strong>Best Physician in Visakhapatnam / Vizag</strong> — <strong>Dr. Sai Sekhar Pyla</strong> is an <strong>MD General Medicine</strong>, <strong>Diabetologist</strong>, and <strong>Infectious Disease Specialist</strong> with 12 years of experience providing gold-standard healthcare at <strong>Trinetra Medicals, Muralinagar, Visakhapatnam</strong>.
              </p>
            </div>
            
            <p className="doctor-bio-paragraph">
              If you are wondering <strong>when should I see a physician</strong>, or if you are experiencing persistent fatigue, unexplained weight changes, or managing a chronic condition like diabetes or thyroid disorders, <strong>Dr. Sai Sekhar Pyla&apos;s</strong> General Medicine practice provides comprehensive care. According to research published by the <a href="https://www.icmr.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)", textDecoration: "underline" }}>Indian Council of Medical Research (ICMR)</a>, over 101 million Indians live with diabetes—making early diagnosis and evidence-based diabetology essential for preventing long-term complications.
            </p>
            <p className="doctor-bio-paragraph">
              Currently serving as a Consultant Physician at CARE Hospital, Visakhapatnam, and primarily at <strong>Trinetra Medicals</strong>, <strong>Dr. Sai Sekhar</strong> is known for his evidence-based, patient-centered approach. Whether you want to know <em>how to manage type 2 diabetes</em>, need screening for thyroid imbalance, or require immediate treatment for acute infectious fevers, his clinical expertise encompasses comprehensive internal medicine care.
            </p>

            <div className="doctor-key-highlights-box">
              <div className="highlight-row">
                <div className="highlight-circle-icon">
                  <i className="fas fa-stethoscope"></i>
                </div>
                <div>
                  <h4>Primary Timings</h4>
                  <p>Trinetra Medicals (Muralinagar): 6:00 PM – 9:00 PM</p>
                </div>
              </div>
              <div className="highlight-row">
                <div className="highlight-circle-icon">
                  <i className="fas fa-sun"></i>
                </div>
                <div>
                  <h4>Experience & Specialization</h4>
                  <p>12 Years of Experience in Diabetology & Infectious Diseases</p>
                </div>
              </div>
            </div>

            <div className="bio-pill-buttons">
              <Link href="/about-doctor" className="btn btn-pill-primary">
                Read Detailed Bio <i className="fas fa-arrow-right" style={{ marginLeft: "6px" }}></i>
              </Link>
              <Link href="/contact" className="btn btn-pill-outline">
                Book Consultation
              </Link>
            </div>

            {/* Item 14: Freshness Signal */}
            <p className="freshness-signal" style={{ fontSize: "0.82rem", color: "var(--neutral-muted)", marginTop: "16px" }}>
              <i className="fas fa-calendar-check" style={{ marginRight: "4px", color: "var(--primary)" }}></i> Clinical profile last updated: <strong>August 2026</strong>
            </p>
          </div>
        </div>
      </section>

      {/* 3. Metric Counter Section */}
      <AnimatedCounterSection initialCounters={data.counters} />

      {/* 4. Services Grid Section */}
      <section id="services" className="services-section bg-gradient-mesh scroll-reveal">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge">Our Specialties</span>
            <h2 className="section-title">Medical Services & Care</h2>
            <p className="section-subtitle">Dedicated primary, chronic, and preventative healthcare services</p>
          </div>

          <FeaturedServicesTabs categories={data.services} />
        </div>
      </section>

      {/* 5. Frequently Asked Questions Section */}
      <FaqSection />

      {/* 6. Health Awareness Reels Carousel */}
      <AwarenessReels />

      {/* 7. Testimonials Section */}
      <ReviewsSection />

      {/* 8. Contact Map Section */}
      <section className="contact-map-section bg-gradient-mesh scroll-reveal">
        <div className="container contact-map-grid">
          {/* Map Embed */}
          <div className="map-wrapper">
            <div className="map-header">
              <span className="badge-pill">LOCATION</span>
              <h3 className="map-title">Trinetra Medicals</h3>
              <p className="map-desc">Opposite Govt School, Ramalayam Street, Muralinagar, Visakhapatnam, 530007</p>
            </div>
            <div className="map-iframe-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60799.59690698831!2d83.18353544863278!3d17.745826199999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a395d0384a06819%3A0x45ef7110571ff582!2sDr%20SAI%20SEKHAR%20P!5e0!3m2!1sen!2sin!4v1786558233514!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
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
                className="btn btn-pill-outline map-directions-btn"
              >
                <i className="fas fa-compass" style={{ marginRight: "6px" }}></i> Get Directions on Google Maps
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="form-wrapper">
            <ContactForm />
          </div>
        </div>
      </section>

      
    </div>
  );
}
