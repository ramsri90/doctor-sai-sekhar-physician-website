import type { Metadata } from "next";
import Link from "next/link";
import FeaturedServicesTabs from "@/components/FeaturedServicesTabs";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: { absolute: "Medical Services | Dr. Sai Sekhar Visakhapatnam" },
  description: "Explore 40+ clinical services & internal medicine treatments by Dr. Sai Sekhar Pyla (MD) at Trinetra Medicals, Visakhapatnam.",
};

const fallbackServicesList = [
  {
    id: 1,
    category_name: "Diabetes",
    services: [
      { id: 39, name: "Type 1 DM", slug: "type-1-dm" },
      { id: 40, name: "Type II DM", slug: "type-ii-dm" },
      { id: 41, name: "Diabetic Neuropathy", slug: "diabetic-neuropathy" },
      { id: 42, name: "Diabetic Nephropathy", slug: "diabetic-nephropathy" }
    ]
  },
  {
    id: 2,
    category_name: "Thyroid Disorder",
    services: [
      { id: 44, name: "Hypothyroidism", slug: "hypothyroidism" },
      { id: 45, name: "Hyperthyroidism", slug: "hyperthyroidism" }
    ]
  },
  {
    id: 3,
    category_name: "Fever",
    services: [
      { id: 47, name: "Dengue fever", slug: "dengue-fever" },
      { id: 48, name: "Malaria", slug: "malaria" },
      { id: 49, name: "Urinary Tract Infection (UTI)", slug: "urinary-tract-infection-uti" },
      { id: 50, name: "Viral bacterial infection", slug: "viral-bacterial-infection" },
      { id: 51, name: "Acute Gastroenteritis", slug: "acute-gastroenteritis" }
    ]
  },
  {
    id: 4,
    category_name: "Headache",
    services: [
      { id: 54, name: "Tension Headache", slug: "tension-headache" },
      { id: 55, name: "Migraine", slug: "migraine" }
    ]
  },
  {
    id: 5,
    category_name: "Bone and Joint",
    services: [
      { id: 58, name: "Rheumatoid Arthritis", slug: "rheumatoid-arthritis" },
      { id: 59, name: "Cervical Spondylosis", slug: "cervical-spondylosis" },
      { id: 60, name: "Lumbar Spondylosis", slug: "lumbar-spondylosis" }
    ]
  },
  {
    id: 6,
    category_name: "Gastro Intestinal",
    services: [
      { id: 61, name: "Acute Gastritis", slug: "acute-gastritis" },
      { id: 63, name: "Acute and Chronic Diarrhea", slug: "acute-and-chronic-diarrhea" },
      { id: 64, name: "Constipation", slug: "constipation" },
      { id: 65, name: "Jaundice & Liver Problems", slug: "jaundice-liver-problems" }
    ]
  },
  {
    id: 7,
    category_name: "Renal",
    services: [
      { id: 66, name: "Acute Renal Failure", slug: "acute-renal-failure" },
      { id: 68, name: "Chronic Renal Failure", slug: "chronic-renal-failure" },
      { id: 69, name: "Kidney stones", slug: "kidney-stones" }
    ]
  },
  {
    id: 8,
    category_name: "Cardiac",
    services: [
      { id: 70, name: "Ischemic heart disease", slug: "ischemic-heart-disease" },
      { id: 71, name: "Heart Failure", slug: "heart-failure" }
    ]
  },
  {
    id: 9,
    category_name: "Respiratory",
    services: [
      { id: 72, name: "Asthma", slug: "asthma" },
      { id: 73, name: "Pneumonia", slug: "pneumonia" },
      { id: 74, name: "COPD (Chronic Obstructive Pulmonary Disease).", slug: "copd-chronic-obstructive-pulmonary-disease" }
    ]
  },
  {
    id: 10,
    category_name: "Miscellaneous",
    services: [
      { id: 76, name: "Allergies", slug: "allergies" },
      { id: 77, name: "Substance abuse", slug: "substance-abuse" },
      { id: 78, name: "Insomnia", slug: "insomnia" },
      { id: 79, name: "Adult Vaccination", slug: "adult-vaccination" },
      { id: 80, name: "Connective Tissue Diseases", slug: "connective-tissue-diseases" },
      { id: 81, name: "Cancer Surgery", slug: "cancer-surgery" },
      { id: 82, name: "Routine Health Checkups", slug: "routine-health-checkups" },
      { id: 83, name: "Vitamin Deficiency", slug: "vitamin-deficiency" },
      { id: 84, name: "Diet & Lifestyle Modifications", slug: "diet-lifestyle-modifications" }
    ]
  },
  {
    id: 15,
    category_name: "others",
    services: [
      { id: 43, name: "Hypertension (HTN)", slug: "hypertension-htn" },
      { id: 46, name: "Dyslipidemia", slug: "dyslipidemia" },
      { id: 52, name: "Septic Syndrome", slug: "septic-syndrome" },
      { id: 75, name: "Geriatric care", slug: "geriatric-care" }
    ]
  }
];

async function getServicesList() {
  return fallbackServicesList;
}

export default async function ServicesPage() {
  const categories = await getServicesList();

  return (
    <div className="services-page-wrapper">
      {/* Header Banner */}
      <div className="page-header bg-gradient-mesh">
        <div className="container" style={{ textAlign: "center" }}>
          <span className="badge">OUR SPECIALTIES</span>
          <h1 className="page-title" style={{ marginTop: "8px", marginBottom: "8px", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800 }}>
            Medical Services & Care
          </h1>
          <p className="page-subtitle" style={{ margin: "0 auto", fontSize: "1.05rem", color: "var(--neutral-muted)" }}>
            Dedicated primary, chronic, and preventative healthcare services across 40+ clinical categories by <strong>Dr. Sai Sekhar P</strong> (<strong>Best Physician in Visakhapatnam / Vizag</strong>) at <strong>Trinetra Medicals</strong>.
          </p>
        </div>
      </div>

      {/* Main Content - Featured Specialties Tabs View */}
      <div className="container scroll-reveal">
        <FeaturedServicesTabs categories={categories} showCatalogLink={false} />

        {/* Bottom CTA Block */}
        <div className="services-cta-block bg-gradient-mesh" style={{ marginTop: "40px" }}>
          <div className="cta-content">
            <h2>Need Consultation for a Custom Health Concern?</h2>
            <p>Dr. Sai Sekhar P is available for diagnosis and treatment plans for various general medicine conditions. Book your consultation today.</p>
          </div>
          <div className="cta-action">
            <Link href="/contact" className="btn btn-primary cta-btn">
              Schedule Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
