import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import { getServiceImage } from "@/lib/servicesImageMap";
import { serviceFallbackMap, cleanServiceContent } from "@/data/serviceDetails";

export const revalidate = 3600; // Revalidate every hour

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getServiceDetail(slug: string) {
  const fallback = serviceFallbackMap[slug];
  if (fallback) {
    return {
      name: fallback.name,
      content: cleanServiceContent(fallback.content, fallback.name),
      image: getServiceImage(slug, fallback.name, fallback.image)
    };
  }

  // Dynamic high-quality protocol generator if slug is not explicitly mapped
  const formattedName = slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const generatedContent = `
    <p>Comprehensive clinical consultation, evaluation, and evidence-based management for <strong>${formattedName}</strong> provided by <strong>Dr. Sai Sekhar Pyla</strong> (MD General Medicine) at Trinetra Medicals, Visakhapatnam.</p>
    <h3>Clinical Evaluation & Care Protocol</h3>
    <ul>
      <li><strong>Comprehensive Clinical Assessment:</strong> Symptom review, vitals evaluation, and physical examination by Dr. Sai Sekhar P.</li>
      <li><strong>Targeted Diagnostics:</strong> Relevant blood biomarkers, organ function panels, and diagnostic imaging.</li>
      <li><strong>Individualized Treatment Plan:</strong> Evidence-based medical therapy and therapeutic lifestyle adjustments.</li>
      <li><strong>Follow-Up & Prevention:</strong> Regular progress tracking and preventative healthcare strategies.</li>
    </ul>
  `;

  return {
    name: formattedName,
    content: cleanServiceContent(generatedContent, formattedName),
    image: getServiceImage(slug, formattedName)
  };
}

export async function generateStaticParams() {
  return Object.keys(serviceFallbackMap).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceDetail(slug);
  
  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested medical service could not be found."
    };
  }

  // Strip HTML tags for clean description
  const cleanDescription = service.content
    ? service.content.replace(/<[^>]*>/g, "").substring(0, 155).trim()
    : `Expert diagnosis and treatment plan for ${service.name} in Visakhapatnam.`;

  return {
    title: { absolute: `${service.name} | Dr. Sai Sekhar Physician Vizag` },
    description: cleanDescription,
    openGraph: {
      title: `${service.name} Treatment | Dr. Sai Sekhar Physician Vizag`,
      description: cleanDescription,
      type: "article",
    }
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceDetail(slug);

  if (!service) {
    notFound();
  }

  const cleanDescription = service.content
    ? service.content.replace(/<[^>]*>/g, "").substring(0, 160).trim()
    : `Expert diagnosis and management for ${service.name} in Visakhapatnam by Dr. Sai Sekhar P.`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": `${service.name} Treatment & Diagnosis in Visakhapatnam`,
    "url": `https://www.drsaisekharphysician.com/services/${slug}`,
    "description": cleanDescription,
    "medicalAudience": "Patient",
    "about": {
      "@type": "MedicalCondition",
      "name": service.name,
      "possibleTreatment": [
        {
          "@type": "MedicalTherapy",
          "name": `Clinical Management & Treatment for ${service.name}`
        }
      ]
    },
    "author": {
      "@type": "Physician",
      "name": "Dr. Sai Sekhar P",
      "jobTitle": "MD General Medicine | Diabetologist | Infectious Disease Specialist",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Muralinagar",
        "addressLocality": "Visakhapatnam",
        "addressRegion": "Andhra Pradesh",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <div className="service-detail-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {/* Header Banner */}
      <div className="page-header bg-gradient-mesh">
        <div className="container">
          <Link href="/services" prefetch={true} className="back-link">
            <i className="fas fa-arrow-left"></i> Back to Services Catalog
          </Link>
          <h1 className="page-title">{service.name}</h1>
          <span className="badge badge-service">Medical Service</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="container">
        <div className="service-detail-grid">
          {/* Main Info */}
          <div className="service-info-panel">
            {service.image && (
              <div className="service-main-image-card">
                <Image
                  src={service.image}
                  alt={`Treatment for ${service.name} in Visakhapatnam`}
                  width={1200}
                  height={650}
                  quality={95}
                  unoptimized={true}
                  className="service-image"
                  sizes="(max-width: 991px) 100vw, 1200px"
                  priority
                />
              </div>
            )}
            
            {/* AEO / GEO Direct Answer Takeaway Card */}
            <div className="top-key-takeaway-card" style={{ backgroundColor: "#f0fdf4", borderLeft: "4px solid var(--primary)", padding: "16px 20px", borderRadius: "10px", marginBottom: "24px" }}>
              <p style={{ margin: 0, fontSize: "0.98rem", color: "var(--neutral-dark)", lineHeight: 1.6 }}>
                <strong>Key Medical Takeaway:</strong> Specialized <strong>{service.name}</strong> diagnosis, treatment, and ongoing care are provided by <strong>Dr. Sai Sekhar P</strong> (<strong>Best Physician in Visakhapatnam / Vizag</strong> · <strong>MD General Medicine</strong>) at <strong>Trinetra Medicals, Muralinagar, Visakhapatnam</strong>.
              </p>
            </div>

            <div 
              className="rich-text-content service-content"
              dangerouslySetInnerHTML={{ __html: service.content }}
            />
          </div>

          {/* Sidebar */}
          <div className="service-sidebar-panel">
            <div className="sidebar-card doc-mini-card">
              <div className="doc-avatar-row">
                <Image
                  src="/images/two.webp"
                  alt="Dr. Sai Sekhar P"
                  width={70}
                  height={70}
                  className="doc-avatar"
                />
                <div>
                  <h4>Dr. Sai Sekhar P</h4>
                  <p>Consultant Physician</p>
                  <p className="hospital-sub">Trinetra Medicals</p>
                </div>
              </div>
              <p className="doc-short-intro">
                For detailed consults regarding {service.name} treatment options and diagnostic checks, please book an appointment.
              </p>
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
