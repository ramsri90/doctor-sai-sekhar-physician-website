import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import ContactForm from "@/components/ContactForm";

export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

interface PageProps {
  params: Promise<{ slug: string }>;
}

const fallbackServiceDetails: Record<string, { name: string; content: string; image?: string }> = {
  "type-1-dm": {
    name: "Type 1 Diabetes Mellitus",
    content: "<p>Type 1 Diabetes Mellitus is an autoimmune condition where the pancreas produces little to no insulin. Dr. Sai Sekhar P offers specialized management focusing on insulin therapy, blood glucose monitoring, and diet regulation to prevent long-term complications.</p>",
    image: "/images/two.webp"
  },
  "type-ii-dm": {
    name: "Type II Diabetes Mellitus",
    content: "<p>Type II Diabetes is a chronic metabolic condition characterized by insulin resistance. Comprehensive treatment at Trinetra Medicals includes personalized medication, dietary counseling, HbA1c tracking, and lifestyle modifications to maintain optimal glycemic control.</p>",
    image: "/images/two.webp"
  },
  "diabetic-neuropathy": {
    name: "Diabetic Neuropathy",
    content: "<p>Diabetic Neuropathy causes nerve damage throughout the body, most commonly affecting the feet and legs. Early screening, glycemic management, and targeted nerve care help relieve tingling, numbness, and pain.</p>",
    image: "/images/two.webp"
  },
  "diabetic-nephropathy": {
    name: "Diabetic Nephropathy",
    content: "<p>Diabetic Nephropathy is a progressive kidney disease caused by long-term diabetes. Regular urine microalbumin testing, blood pressure control, and specialized renal protective therapies are provided by Dr. Sai Sekhar P.</p>",
    image: "/images/two.webp"
  },
  "hypothyroidism": {
    name: "Hypothyroidism",
    content: "<p>Hypothyroidism occurs when the thyroid gland produces insufficient thyroid hormones, leading to fatigue, weight gain, and sluggish metabolism. Precise hormone replacement therapy (Levothyroxine) and routine TSH monitoring ensure full recovery of energy and health.</p>",
    image: "/images/two.webp"
  },
  "hyperthyroidism": {
    name: "Hyperthyroidism",
    content: "<p>Hyperthyroidism is characterized by an overactive thyroid gland causing rapid heart rate, weight loss, and anxiety. Treatment includes antithyroid medications, symptom control, and hormone balancing.</p>",
    image: "/images/two.webp"
  },
  "dengue-fever": {
    name: "Dengue Fever Management",
    content: "<p>Dengue is a mosquito-borne viral infection causing high fever, severe body aches, and risk of thrombocytopenia (low platelet count). Dr. Sai Sekhar provides critical monitoring, fluid management, and supportive care for safe recovery.</p>",
    image: "/images/two.webp"
  },
  "malaria": {
    name: "Malaria Treatment",
    content: "<p>Malaria is a parasitic infection presenting with recurring chills, high fever, and sweats. Rapid diagnostic testing (RDT) and targeted antimalarial therapy ensure complete parasite clearance.</p>",
    image: "/images/two.webp"
  },
  "urinary-tract-infection-uti": {
    name: "Urinary Tract Infection (UTI)",
    content: "<p>UTIs cause painful urination, urgency, and pelvic discomfort. Prompt urine culture diagnostics and targeted antibiotic treatment clear the infection quickly and prevent kidney spread.</p>",
    image: "/images/two.webp"
  },
  "viral-bacterial-infection": {
    name: "Viral & Bacterial Infections",
    content: "<p>Comprehensive diagnosis and management of acute systemic infections, fever of unknown origin (FUO), and respiratory infections using evidence-based antibiotic and antiviral protocols.</p>",
    image: "/images/two.webp"
  },
  "acute-gastroenteritis": {
    name: "Acute Gastroenteritis",
    content: "<p>Gastroenteritis causes sudden vomiting, diarrhea, abdominal cramps, and dehydration. Fluid electrolyte balance restoration and gut restorative management are provided for swift recovery.</p>",
    image: "/images/two.webp"
  },
  "tension-headache": {
    name: "Tension Headache",
    content: "<p>Tension headaches present as constant dull pain around the forehead or neck. Evaluation focuses on stress reduction, posture care, and effective pain relief management.</p>",
    image: "/images/two.webp"
  },
  "migraine": {
    name: "Migraine Care & Management",
    content: "<p>Migraines are severe throbbing headaches often accompanied by nausea, sensitivity to light, and sound. Dr. Sai Sekhar provides abortive and preventive migraine therapies tailored to individual triggers.</p>",
    image: "/images/two.webp"
  },
  "rheumatoid-arthritis": {
    name: "Rheumatoid Arthritis",
    content: "<p>Rheumatoid Arthritis is a chronic inflammatory autoimmune disease affecting joint linings. Early initiation of disease-modifying antirheumatic drugs (DMARDs) protects joint function and alleviates stiffness.</p>",
    image: "/images/two.webp"
  },
  "cervical-spondylosis": {
    name: "Cervical Spondylosis",
    content: "<p>Age-related wear and tear affecting spinal disks in the neck. Treatment includes pain relief, anti-inflammatory care, and ergonomic guidance to relieve nerve compression.</p>",
    image: "/images/two.webp"
  },
  "lumbar-spondylosis": {
    name: "Lumbar Spondylosis",
    content: "<p>Degenerative changes in the lower back spinal disks causing pain and stiffness. Management focuses on pain relief, posture stabilization, and non-surgical rehabilitation.</p>",
    image: "/images/two.webp"
  },
  "acute-gastritis": {
    name: "Acute Gastritis",
    content: "<p>Inflammation of the stomach lining causing burning upper abdominal pain, bloating, and nausea. Acid suppression therapy (PPIs) and dietary adjustments restore gastric health.</p>",
    image: "/images/two.webp"
  },
  "hypertension-htn": {
    name: "Hypertension (HTN) Management",
    content: "<p>High blood pressure requires persistent monitoring and tailored antihypertensive medication to safeguard heart, kidney, and brain health. Comprehensive cardiovascular risk assessments are performed.</p>",
    image: "/images/two.webp"
  },
  "bronchial-asthma": {
    name: "Bronchial Asthma",
    content: "<p>Chronic airway inflammation causing wheezing, shortness of breath, and chest tightness. Inhaler therapy, trigger avoidance, and asthma action plans provide continuous relief.</p>",
    image: "/images/two.webp"
  },
  "copd": {
    name: "COPD Management",
    content: "<p>Chronic Obstructive Pulmonary Disease involves progressive airflow limitation. Pulmonary rehabilitation, bronchodilator therapy, and exacerbation prevention improve breathing capacity.</p>",
    image: "/images/two.webp"
  },
  "chronic-kidney-disease": {
    name: "Chronic Kidney Disease (CKD)",
    content: "<p>Long-term reduction in renal function. Management includes renal protective medication, electrolyte balancing, and strict blood pressure control to delay disease progression.</p>",
    image: "/images/two.webp"
  },
  "fatty-liver": {
    name: "Fatty Liver Disease (NAFLD)",
    content: "<p>Accumulation of excess fat in liver cells associated with metabolic syndrome. Treatment focuses on weight management, lipid control, and hepatoprotective care.</p>",
    image: "/images/two.webp"
  },
  "geriatric-care": {
    name: "Geriatric Healthcare",
    content: "<p>Specialized medical care tailored for elderly patients, managing multiple chronic co-morbidities, medication safety, mobility, and overall quality of life.</p>",
    image: "/images/two.webp"
  },
  "adult-vaccination": {
    name: "Adult Vaccination Services",
    content: "<p>Preventative immunization against influenza, pneumococcus, hepatitis, tetanus, and shingles to protect vulnerable adults and chronic disease patients.</p>",
    image: "/images/two.webp"
  },
  "routine-health-checkup": {
    name: "Routine Health Checkups",
    content: "<p>Comprehensive annual health evaluations including complete blood counts, metabolic panels, lipid profiles, and early risk detection screenings.</p>",
    image: "/images/two.webp"
  }
};

function getServiceDetail(slug: string) {
  if (fallbackServiceDetails[slug]) {
    return fallbackServiceDetails[slug];
  }

  const formattedName = slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    name: formattedName,
    content: `<p>Consult Dr. Sai Sekhar Pyla for expert medical evaluation, diagnosis, and treatment of ${formattedName} in Visakhapatnam. Book an appointment for comprehensive clinical care.</p>`,
    image: "/images/two.webp"
  };
}

export async function generateStaticParams() {
  const allSlugs = Object.keys(fallbackServiceDetails);
  return allSlugs.map(slug => ({ slug }));
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
                  <h4><span className="doctor-name-highlight">Dr. Sai Sekhar P</span></h4>
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
