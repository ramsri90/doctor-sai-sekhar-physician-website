import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";

export const revalidate = 3600; // Revalidate every hour

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getServiceDetail(slug: string) {
  try {
    const res = await fetch(`https://admin.drsaisekharphysician.com/api/client/get-single-service/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.status && json.data) {
      return json.data;
    }
    return null;
  } catch (err) {
    console.error(`Error fetching service detail for ${slug}:`, err);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch("https://admin.drsaisekharphysician.com/api/client/get-services-list", { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    const paths: { slug: string }[] = [];
    json.data.forEach((cat: { services: Array<{ slug: string }> }) => {
      if (cat.services) {
        cat.services.forEach((s: { slug: string }) => {
          paths.push({ slug: s.slug });
        });
      }
    });
    return paths;
  } catch (error) {
    console.error("Error generating static params for services:", error);
    // Return some default common service paths to guarantee build success even if offline
    return [
      { slug: "type-1-dm" },
      { slug: "type-ii-dm" },
      { slug: "diabetic-neuropathy" },
      { slug: "diabetic-nephropathy" },
      { slug: "hypothyroidism" },
      { slug: "hyperthyroidism" },
      { slug: "dengue-fever" },
      { slug: "malaria" },
      { slug: "migraine" },
      { slug: "hypertension-htn" }
    ];
  }
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
    title: `${service.name} Treatment & Diagnosis | Dr. Sai Sekhar P Visakhapatnam`,
    description: cleanDescription,
    openGraph: {
      title: `${service.name} Treatment & Diagnosis | Dr. Sai Sekhar P`,
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

  return (
    <div className="service-detail-wrapper">
      {/* Header Banner */}
      <div className="page-header bg-gradient-mesh">
        <div className="container">
          <Link href="/services" className="back-link">
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
                  alt={`Treatment for ${service.name}`}
                  width={800}
                  height={400}
                  className="service-image"
                  sizes="(max-width: 991px) 100vw, 800px"
                  priority
                />
              </div>
            )}
            
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
