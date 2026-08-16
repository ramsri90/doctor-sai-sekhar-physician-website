import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const BASE_URL = "https://www.drsaisekharphysician.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Dr. Sai Sekhar P | Best Physician in Visakhapatnam | Trinetra Medicals",
    template: "%s | Dr. Sai Sekhar P – Visakhapatnam"
  },
  description: "Dr. Sai Sekhar Pyla (MBBS, MD General Medicine) is the best Consultant Physician in Visakhapatnam. Specializes in Diabetes, Thyroid, Hypertension & Infectious Diseases at Trinetra Medicals, Muralinagar. Available Mon–Sat 6 PM – 9 PM. Call +91 63007 93688.",
  keywords: [
    "Dr. Sai Sekhar P",
    "Dr. Sai Sekhar Pyla",
    "Dr Sai Sekhar physician Visakhapatnam",
    "best physician Visakhapatnam",
    "general physician Vizag",
    "consultant physician Muralinagar",
    "internal medicine specialist Visakhapatnam",
    "diabetes specialist Vizag",
    "thyroid specialist Visakhapatnam",
    "Trinetra Medicals Muralinagar",
    "best doctor near me Visakhapatnam",
    "fever doctor Vizag",
    "hypertension doctor Visakhapatnam",
    "MD general medicine Visakhapatnam",
    "physician Muralinagar Madhavadhara",
  ],
  authors: [{ name: "Dr. Sai Sekhar Pyla", url: BASE_URL }],
  creator: "Dr. Sai Sekhar Pyla",
  publisher: "Trinetra Medicals",
  category: "Healthcare",
  classification: "Medical Practice",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    title: "Dr. Sai Sekhar P | Best Physician in Visakhapatnam",
    description: "Dr. Sai Sekhar Pyla, MBBS MD General Medicine – Diabetes, Thyroid, Hypertension & Infectious Disease expert at Trinetra Medicals, Muralinagar, Visakhapatnam. 12+ years experience. 4.9★ on Google.",
    siteName: "Dr. Sai Sekhar P – Physician Visakhapatnam",
    images: [
      {
        url: `${BASE_URL}/images/og-cover.webp`,
        width: 1200,
        height: 630,
        alt: "Dr. Sai Sekhar P – Consultant Physician at Trinetra Medicals, Visakhapatnam",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Sai Sekhar P | Best Physician in Visakhapatnam",
    description: "Expert Consultant Physician at Trinetra Medicals, Muralinagar. Specializes in Diabetes, Thyroid & Infectious Diseases. 12+ Years | 4.9★ Google Rating.",
    images: [`${BASE_URL}/images/og-cover.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: "google-site-verification-token-here",
  },
  other: {
    // GEO: Geo-region metadata for local SEO signal
    "geo.region": "IN-AP",
    "geo.placename": "Visakhapatnam, Andhra Pradesh, India",
    "geo.position": "17.745176;83.256999",
    "ICBM": "17.745176, 83.256999",
    // AEO: Helps AI assistants understand the expertise domain
    "dcterms.subject": "Internal Medicine, General Physician, Diabetology, Thyroid Disorders, Infectious Diseases",
    "dcterms.type": "MedicalWebPage",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ── SCHEMA 1: Physician (Primary entity — powers Google Knowledge Panel & GEO)
  const physicianSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${BASE_URL}/#physician`,
    "name": "Dr. Sai Sekhar Pyla",
    "alternateName": ["Dr. Sai Sekhar P", "Dr P Sai Sekhar"],
    "description": "Dr. Sai Sekhar Pyla is a highly qualified Consultant Physician with 12 years of experience in Internal Medicine at Trinetra Medicals, Muralinagar, Visakhapatnam, specializing in Diabetes, Thyroid Disorders, Hypertension, and Infectious Diseases.",
    "image": `${BASE_URL}/images/two.webp`,
    "url": BASE_URL,
    "telephone": "+916300793688",
    "email": "info@drsaisekharphysician.com",
    "medicalSpecialty": [
      "Internal Medicine",
      "General Practice",
      "Diabetology",
      "Endocrinology",
      "Infectious Disease"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "degree",
        "name": "MBBS",
        "educationalLevel": "undergraduate",
        "recognizedBy": { "@type": "Organization", "name": "Narayana Medical College" }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "postgraduate degree",
        "name": "MD (General Medicine)",
        "educationalLevel": "postgraduate",
        "recognizedBy": { "@type": "Organization", "name": "JJM Medical College, Davanagere" }
      }
    ],
    "memberOf": [
      {
        "@type": "MedicalOrganization",
        "name": "Indian Medical Association (IMA)"
      },
      {
        "@type": "MedicalOrganization",
        "name": "Andhra Pradesh Medical Council"
      }
    ],
    "worksFor": {
      "@type": "MedicalClinic",
      "@id": `${BASE_URL}/#clinic`,
      "name": "Trinetra Medicals",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kodanda Ramalayam Street, Muralinagar, Madhavadhara",
        "addressLocality": "Visakhapatnam",
        "addressRegion": "Andhra Pradesh",
        "postalCode": "530007",
        "addressCountry": "IN"
      }
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kodanda Ramalayam Street, Muralinagar, Madhavadhara",
      "addressLocality": "Visakhapatnam",
      "addressRegion": "Andhra Pradesh",
      "postalCode": "530007",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.745176,
      "longitude": 83.256999
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        "opens": "18:00",
        "closes": "21:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "worstRating": "1",
      "reviewCount": "66",
      "ratingCount": "66"
    },
    "sameAs": [
      "https://www.google.com/maps?cid=5040476316534415746"
    ]
  };

  // ── SCHEMA 2: MedicalClinic (local business — drives Google Maps & GEO)
  const clinicSchema = {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness"],
    "@id": `${BASE_URL}/#clinic`,
    "name": "Trinetra Medicals – Dr. Sai Sekhar P Clinic",
    "alternateName": "Trinetra Medicals Muralinagar",
    "description": "Trinetra Medicals is a general medicine and internal medicine clinic in Muralinagar, Visakhapatnam, managed by Dr. Sai Sekhar Pyla. Evening OPD: Monday to Saturday, 6 PM to 9 PM.",
    "url": BASE_URL,
    "telephone": "+916300793688",
    "email": "info@drsaisekharphysician.com",
    "priceRange": "₹₹",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, UPI",
    "image": `${BASE_URL}/images/logo.png`,
    "logo": `${BASE_URL}/images/logo.png`,
    "medicalSpecialty": "General Practice",
    "availableService": [
      { "@type": "MedicalTherapy", "name": "Diabetes Management" },
      { "@type": "MedicalTherapy", "name": "Thyroid Disorder Treatment" },
      { "@type": "MedicalTherapy", "name": "Hypertension Management" },
      { "@type": "MedicalTherapy", "name": "Infectious Disease Treatment" },
      { "@type": "MedicalTherapy", "name": "Asthma & COPD Management" },
      { "@type": "MedicalTherapy", "name": "Dengue & Malaria Treatment" },
      { "@type": "MedicalTherapy", "name": "Adult Vaccination" },
      { "@type": "MedicalTherapy", "name": "Routine Health Checkups" }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Opposite Govt School, Ramalayam Street, Muralinagar, Madhavadhara",
      "addressLocality": "Visakhapatnam",
      "addressRegion": "Andhra Pradesh",
      "postalCode": "530007",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.745176,
      "longitude": 83.256999
    },
    "hasMap": "https://maps.app.goo.gl/RwBcYF5CqF1yoigb9",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        "opens": "18:00",
        "closes": "21:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "reviewCount": "66"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Ravi Kumar" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Dr. Sai Sekhar is extremely patient and attentive. He listened carefully to my entire long medical history before prescribing any medication. Excellent doctor for diabetes care and management."
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Sujatha Reddy" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "His diagnostic accuracy is outstanding. My father was admitted in critical condition, and his timely treatment and clear explanation of the diagnosis gave our family immense comfort."
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "K. Srinivasa Rao" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Highly experienced in internal medicine and intensive care cases. Under his expert care, my brother recovered quickly. He is the best physician in Visakhapatnam."
      }
    ],
    "sameAs": [
      "https://www.google.com/maps?cid=5040476316534415746"
    ]
  };

  // ── SCHEMA 3: FAQPage (AEO — answers common voice/AI search questions)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are Dr. Sai Sekhar P's clinic timings?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dr. Sai Sekhar P practices at Trinetra Medicals, Muralinagar, Visakhapatnam from Monday to Saturday, 6:00 PM to 9:00 PM."
        }
      },
      {
        "@type": "Question",
        "name": "Where is Dr. Sai Sekhar P's clinic located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dr. Sai Sekhar P's clinic, Trinetra Medicals, is located at Opposite Govt School, Ramalayam Street, Muralinagar, Madhavadhara, Visakhapatnam – 530007, Andhra Pradesh."
        }
      },
      {
        "@type": "Question",
        "name": "What does Dr. Sai Sekhar P specialize in?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dr. Sai Sekhar Pyla specializes in Internal Medicine and General Medicine with expertise in Diabetes (Type 1 & Type 2), Thyroid Disorders, Hypertension, Infectious Diseases (Dengue, Malaria), Respiratory conditions (Asthma, COPD), and Critical Care."
        }
      },
      {
        "@type": "Question",
        "name": "How many years of experience does Dr. Sai Sekhar P have?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dr. Sai Sekhar Pyla has over 12 years of experience in Internal Medicine and General Practice, with expertise in chronic disease management, critical care, and preventive healthcare."
        }
      },
      {
        "@type": "Question",
        "name": "How can I book an appointment with Dr. Sai Sekhar P?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can book an appointment with Dr. Sai Sekhar P by calling or WhatsApp at +91 63007 93688, visiting Trinetra Medicals in Muralinagar during evening hours (6 PM – 9 PM), or by using the online appointment form at drsaisekharphysician.com/contact."
        }
      },
      {
        "@type": "Question",
        "name": "What are Dr. Sai Sekhar's qualifications?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dr. Sai Sekhar Pyla holds MBBS from Narayana Medical College and MD in General Medicine from JJM Medical College, Davanagere. He is registered with the Andhra Pradesh Medical Council and is a member of the Indian Medical Association (IMA)."
        }
      },
      {
        "@type": "Question",
        "name": "Is Dr. Sai Sekhar P a good doctor for diabetes in Visakhapatnam?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Dr. Sai Sekhar Pyla is one of the best diabetes specialists and general physicians in Visakhapatnam. He manages Type 1 DM, Type 2 DM, Diabetic Neuropathy, and Diabetic Nephropathy with personalized treatment plans. He has treated over 1,00,000 chronic disease cases over 12 years."
        }
      },
      {
        "@type": "Question",
        "name": "What is the consultation fee at Trinetra Medicals?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For accurate consultation fee information, please contact Trinetra Medicals directly at +91 63007 93688 or visit the clinic at Muralinagar, Visakhapatnam during evening hours (Monday–Saturday, 6 PM – 9 PM)."
        }
      }
    ]
  };

  // ── SCHEMA 4: WebSite with SearchAction (AEO — enables sitelinks searchbox)
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    "url": BASE_URL,
    "name": "Dr. Sai Sekhar P – Physician Visakhapatnam",
    "description": "Official website of Dr. Sai Sekhar Pyla, Consultant Physician at Trinetra Medicals, Muralinagar, Visakhapatnam.",
    "publisher": {
      "@id": `${BASE_URL}/#clinic`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BASE_URL}/services?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // ── SCHEMA 5: BreadcrumbList for internal pages (SEO hierarchy signal)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BASE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About Dr. Sai Sekhar",
        "item": `${BASE_URL}/about-doctor`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Medical Services",
        "item": `${BASE_URL}/services`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Contact & Appointment",
        "item": `${BASE_URL}/contact`
      }
    ]
  };

  // ── SCHEMA 6: WebPage (Top-level page schema connecting organization & author)
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}/#webpage`,
    "url": BASE_URL,
    "name": "Dr. Sai Sekhar Pyla | Best General Physician in Visakhapatnam",
    "description": "Consult the best General Physician & Diabetologist in Visakhapatnam. Dr. Sai Sekhar treats diabetes, thyroid, & fevers.",
    "publisher": { "@id": `${BASE_URL}/#clinic` },
    "author": { "@id": `${BASE_URL}/#physician` },
    "inLanguage": "en-IN",
    "datePublished": "2023-01-01T08:00:00+05:30",
    "dateModified": new Date().toISOString()
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Preconnect for performance (CWV) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />

        {/* Font Awesome */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          crossOrigin="anonymous"
        />

        {/* Canonical — enforced via metadata.alternates above, belt+suspenders */}
        <link rel="canonical" href={BASE_URL} />

        {/* ── JSON-LD Structured Data: All 5 schemas ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
        />
      </head>
      <body>
        <div className="ambient-bg">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
        </div>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ScrollReveal />
      </body>
    </html>
  );
}
