import Image from "next/image";
import Link from "next/link";
import HomeSlider from "@/components/HomeSlider";
import ReviewsSection from "@/components/ReviewsSection";
import ContactForm from "@/components/ContactForm";
import AnimatedCounterSection from "@/components/AnimatedCounterSection";

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
    { id: 1, title: "Patients Treated", count: "1,00,000+" },
    { id: 2, title: "Chronic Disease Management Cases", count: "50,000+" },
    { id: 3, title: "Preventive Health Screenings", count: "35,000+" },
    { id: 4, title: "Emergency Cases Handled", count: "20,000+" }
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
    const APIcounters = countersRes?.data || [];
    const mergedCounters = fallbackCounters.map((fallback, idx) => {
      const apiItem = APIcounters[idx];
      return {
        id: fallback.id,
        count: apiItem?.count || fallback.count,
        title: fallback.title // keep exact specified title
      };
    });

    return {
      banners: bannersRes?.data || [],
      settings: settingsRes?.data || fallbackSettings,
      counters: mergedCounters,
      services: servicesRes?.data || fallbackServices,
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
        <h1>Dr P Sai Sekhar</h1>
        <p>General Physician</p>
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
            <h2 className="section-title">Dr. Sai Sekhar Pyla</h2>
            <h3 className="doctor-credentials">MBBS, MD (General Medicine) | Gold Medalist | Consultant Physician</h3>
            <p className="doctor-specialty-desc" style={{ marginBottom: "15px" }}>
              Consultant Physician at CARE Hospital, Visakhapatnam
            </p>

            <p className="doctor-bio-paragraph">
              Dr. Sai Sekhar Pyla, MBBS, MD (General Medicine), gold medalist, a highly experienced physician with a passion for providing top-quality medical care. With 12 years of expertise, he specializes in the management of critical care, lifestyle diseases, and preventive healthcare. He is the best physician in Visakhapatnam with great knowledge.
            </p>
            <p className="doctor-bio-paragraph">
              Currently serving as a Consultant Physician at CARE Hospital, Visakhapatnam, Dr. Sai Sekhar Pyla is known for his patient-centered approach and commitment to medical excellence. His expertise includes:
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

      {/* 6. Testimonials Section */}
      <ReviewsSection />

      {/* 7. Contact Map Section */}
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

      
    </div>
  );
}
