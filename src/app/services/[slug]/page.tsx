import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";

export const revalidate = 3600; // Revalidate every hour

interface PageProps {
  params: Promise<{ slug: string }>;
}

const serviceFallbackMap: Record<string, { name: string; content: string; image?: string }> = {
  "type-1-dm": {
    name: "Type 1 Diabetes Mellitus",
    content: "<p>Type 1 Diabetes Mellitus requires precise insulin management, glucose monitoring, and comprehensive dietary guidance. Dr. Sai Sekhar P offers tailored insulin regimens and metabolic tracking for long-term health stability.</p><h3>Key Features & Management</h3><ul><li>Customized Basal-Bolus Insulin Therapy</li><li>Continuous Glucose Monitoring (CGM) Guidance</li><li>Prevention of Diabetic Ketoacidosis (DKA)</li><li>Dietary & Exercise Counseling</li></ul>"
  },
  "type-ii-dm": {
    name: "Type II Diabetes Mellitus",
    content: "<p>Type II Diabetes is a chronic metabolic condition characterized by insulin resistance. Dr. Sai Sekhar P brings extensive experience in evidence-based glycemic control, oral hypoglycemic agents, GLP-1 receptor agonists, and lifestyle modifications to prevent microvascular and macrovascular complications.</p><h3>Treatment Approach</h3><ul><li>Comprehensive HbA1c & Fasting Blood Sugar Monitoring</li><li>Weight & Cholesterol Optimization</li><li>Diabetic Foot & Neuropathy Screenings</li><li>Personalized Nutrition & Exercise Plans</li></ul>"
  },
  "diabetic-neuropathy": {
    name: "Diabetic Neuropathy Care",
    content: "<p>Diabetic Neuropathy affects nerve health, leading to numbness, tingling, or pain in extremities. Early diagnosis and glycemic regulation stop progression.</p><h3>Care & Interventions</h3><ul><li>Comprehensive Neurological Evaluation</li><li>Pain Management & Nerve Conduction Support</li><li>Preventative Foot Care Protocols</li></ul>"
  },
  "diabetic-nephropathy": {
    name: "Diabetic Nephropathy Care",
    content: "<p>Diabetic Nephropathy is kidney damage caused by chronic high blood sugar. Specialized monitoring of urine albumin and GFR preserves kidney function.</p><h3>Management Protocols</h3><ul><li>Microalbuminuria Screenings & Serum Creatinine Checks</li><li>Blood Pressure & RAAS Blockade Control</li><li>Renal-Protective Diet Guidance</li></ul>"
  },
  "hypothyroidism": {
    name: "Hypothyroidism Treatment",
    content: "<p>Hypothyroidism causes sluggish metabolism, weight gain, fatigue, and cold intolerance due to low thyroid hormone levels. Dr. Sai Sekhar provides precise TSH monitoring and Levothyroxine dosage titration.</p><h3>Diagnostic & Treatment Features</h3><ul><li>Comprehensive Thyroid Panel (TSH, Free T3, Free T4)</li><li>Personalized Dosage Adjustment</li><li>Symptom Recovery & Energy Optimization</li></ul>"
  },
  "hyperthyroidism": {
    name: "Hyperthyroidism Care",
    content: "<p>Hyperthyroidism occurs when the thyroid gland produces excess thyroid hormones, leading to rapid heartbeat, anxiety, and weight loss. Expert antithyroid medical therapy restores hormonal balance.</p><h3>Clinical Interventions</h3><ul><li>Antithyroid Medication Management</li><li>Beta-Blocker Symptom Relief</li><li>Regular Thyroid Function Evaluation</li></ul>"
  },
  "dengue-fever": {
    name: "Dengue Fever Management",
    content: "<p>Dengue fever is a viral infection transmitted by mosquitoes, characterized by high fever, severe body aches, and potential platelet drop. Early medical supervision ensures safe fluid therapy and recovery.</p><h3>Medical Protocol</h3><ul><li>Daily Platelet & Hematocrit Monitoring</li><li>Intravenous & Oral Hydration Therapy</li><li>Warning Sign Surveillance for Dengue Hemorrhagic Risk</li></ul>"
  },
  "malaria": {
    name: "Malaria Diagnosis & Treatment",
    content: "<p>Malaria causes cyclical fevers, chills, and fatigue. Rapid antigen tests and blood smear analysis ensure prompt antimalarial prescription.</p><h3>Care Steps</h3><ul><li>Rapid Diagnostic Testing (RDT) & Peripheral Smear</li><li>Targeted Antimalarial Medication</li><li>Post-Treatment Recovery Screening</li></ul>"
  },
  "migraine": {
    name: "Migraine & Tension Headache Management",
    content: "<p>Migraines and chronic tension headaches significantly impact daily quality of life. Dr. Sai Sekhar provides abortive acute therapy and preventive treatment plans to minimize headache frequency.</p><h3>Therapeutic Focus</h3><ul><li>Trigger Identification & Lifestyle Optimization</li><li>Preventive & Acute Pharmacotherapy</li><li>Neurological Screenings</li></ul>"
  },
  "hypertension-htn": {
    name: "Hypertension (High Blood Pressure) Care",
    content: "<p>Hypertension is a primary risk factor for heart disease, stroke, and kidney failure. Strategic antihypertensive therapy keeps blood pressure strictly in target range.</p><h3>Management Program</h3><ul><li>24-Hour Ambulatory Blood Pressure Assessment</li><li>Cardiovascular & Organ Damage Screening</li><li>Dietary Sodium & Lifestyle Counseling</li></ul>"
  }
};

async function getServiceDetail(slug: string) {
  try {
    const res = await fetch(`https://admin.drsaisekharphysician.com/api/client/get-single-service/${slug}`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(300)
    });
    if (!res.ok) throw new Error("Fetch failed");
    const json = await res.json();
    if (json.status && json.data) {
      return json.data;
    }
  } catch (err) {
    // Return instant static fallback if available
  }

  const fallback = serviceFallbackMap[slug];
  if (fallback) {
    return {
      name: fallback.name,
      content: fallback.content,
      image: fallback.image || "/images/one.webp"
    };
  }

  // Generic fallback if slug is not explicitly mapped
  const formattedName = slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    name: formattedName,
    content: `<p>Expert diagnosis, clinical evaluation, and customized treatment plans for <strong>${formattedName}</strong> provided by Dr. Sai Sekhar P in Visakhapatnam.</p><h3>Clinical Services & Care</h3><ul><li>Comprehensive Medical Evaluation</li><li>Targeted Diagnostic & Medication Therapy</li><li>Preventative Health Counseling</li></ul>`,
    image: "/images/one.webp"
  };
}

export async function generateStaticParams() {
  try {
    const res = await fetch("https://admin.drsaisekharphysician.com/api/client/get-services-list", {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(300)
    });
    if (!res.ok) throw new Error("Fetch failed");
    const json = await res.json();
    const paths: { slug: string }[] = [];
    if (json.data && Array.isArray(json.data)) {
      json.data.forEach((cat: { services: Array<{ slug: string }> }) => {
        if (cat.services) {
          cat.services.forEach((s: { slug: string }) => {
            paths.push({ slug: s.slug });
          });
        }
      });
    }
    if (paths.length > 0) return paths;
  } catch (error) {
    // Fallback paths
  }
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
