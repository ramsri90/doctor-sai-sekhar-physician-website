import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.drsaisekharphysician.com"),
  title: {
    default: "Trinetra Medicals | Dr Sai Sekhar P | Best Physician in Visakhapatnam / Vizag",
    template: "%s | Trinetra Medicals - Dr. Sai Sekhar P Visakhapatnam"
  },
  description: "Trinetra Medicals is the clinic of Dr. Sai Sekhar Pyla (MD General Medicine, Diabetologist) in Muralinagar, Visakhapatnam. Specialized treatment for Diabetes, Thyroid, Fevers, Hypertension & Internal Medicine.",
  keywords: [
    "Trinetra Medicals",
    "Trinetra Medicals Visakhapatnam",
    "Trinetra Medicals Vizag",
    "Trinetra Medicals Muralinagar",
    "Trinetra Medicals doctor",
    "Trinetra Medicals contact number",
    "Dr. Sai Sekhar P",
    "Dr. Sai Sekhar Pyla",
    "Best Physician in Visakhapatnam",
    "Best Physician in Vizag",
    "General Physician Visakhapatnam",
    "Diabetologist Visakhapatnam",
    "Infectious Disease Specialist Vizag",
    "Internal Medicine Doctor Visakhapatnam",
    "Doctor in Muralinagar Visakhapatnam"
  ],
  authors: [{ name: "Dr. Sai Sekhar P" }],
  creator: "Dr. Sai Sekhar Pyla",
  alternates: {
    canonical: "https://www.drsaisekharphysician.com/"
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" }
    ],
    apple: [
      { url: "/images/logo-circle.png", type: "image/png" }
    ],
    shortcut: ["/icon.png"]
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.drsaisekharphysician.com/",
    title: "Trinetra Medicals | Dr Sai Sekhar P | Best Physician in Visakhapatnam / Vizag",
    description: "Trinetra Medicals is the clinic of Dr. Sai Sekhar Pyla (MD General Medicine, Diabetologist) in Muralinagar, Visakhapatnam. Specialized treatment for Diabetes, Thyroid, Fevers, Hypertension & Internal Medicine.",
    siteName: "Trinetra Medicals - Dr. Sai Sekhar Pyla Clinic Visakhapatnam",
    images: [{ url: "https://www.drsaisekharphysician.com/images/two.webp", width: 1200, height: 630, alt: "Trinetra Medicals - Dr. Sai Sekhar P Best Physician in Visakhapatnam" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Trinetra Medicals | Dr Sai Sekhar P | Best Physician in Visakhapatnam / Vizag",
    description: "Trinetra Medicals is the clinic of Dr. Sai Sekhar Pyla (MD General Medicine, Diabetologist) in Muralinagar, Visakhapatnam. Specialized treatment for Diabetes, Thyroid, Fevers, Hypertension & Internal Medicine.",
    images: ["https://www.drsaisekharphysician.com/images/two.webp"]
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
    }
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": "https://www.drsaisekharphysician.com/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.drsaisekharphysician.com/"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://www.drsaisekharphysician.com/#organization",
      "name": "Trinetra Medicals",
      "alternateName": ["Trinetra Medicals Visakhapatnam", "Trinetra Medicals Vizag", "Dr. Sai Sekhar Clinic"],
      "url": "https://www.drsaisekharphysician.com",
      "logo": "https://www.drsaisekharphysician.com/images/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+916300793688",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["English", "Telugu", "Hindi"]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Physician",
      "@id": "https://www.drsaisekharphysician.com/#physician",
      "name": "Dr. Sai Sekhar Pyla (Dr. Sai Sekhar P)",
      "alternateName": ["Dr. P. Sai Sekhar", "Dr. Sai Sekhar Physician Visakhapatnam"],
      "image": "https://www.drsaisekharphysician.com/images/two.webp",
      "medicalSpecialty": [
        "GeneralMedicine",
        "Endocrinology",
        "InfectiousDisease"
      ],
      "jobTitle": "MD General Medicine | Diabetologist | Infectious Disease Specialist",
      "description": "Dr. Sai Sekhar Pyla (MD) is a top physician & diabetologist in Visakhapatnam with 12+ years experience. Evening care at Trinetra Medicals, Muralinagar.",
      "telephone": "+916300793688",
      "email": "info@drsaisekharphysician.com",
      "url": "https://www.drsaisekharphysician.com",
      "logo": "https://www.drsaisekharphysician.com/images/logo.png",
      "worksFor": {
        "@type": "MedicalClinic",
        "name": "Trinetra Medicals"
      },
      "sameAs": [
        "https://maps.app.goo.gl/RwBcYF5CqF1yoigb9",
        "https://wa.me/916300793688"
      ],
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
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      "@id": "https://www.drsaisekharphysician.com/#clinic",
      "name": "Trinetra Medicals",
      "alternateName": ["Trinetra Medicals Visakhapatnam", "Trinetra Medicals Vizag", "Trinetra Medicals Muralinagar", "Dr. Sai Sekhar Clinic"],
      "description": "Trinetra Medicals is a premier primary healthcare center and clinic in Muralinagar, Visakhapatnam, headed by Dr. Sai Sekhar Pyla (MD General Medicine), offering expert care for Diabetes, Thyroid, Dengue, Hypertension, and Internal Medicine.",
      "image": "https://www.drsaisekharphysician.com/images/one.webp",
      "logo": "https://www.drsaisekharphysician.com/images/logo.png",
      "url": "https://www.drsaisekharphysician.com",
      "telephone": "+916300793688",
      "priceRange": "₹₹",
      "hasMap": "https://maps.app.goo.gl/RwBcYF5CqF1yoigb9",
      "medicalSpecialty": ["GeneralMedicine", "Endocrinology", "InfectiousDisease"],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Beside Abhiruchi Sweets, Ramalayam Street, Muralinagar",
        "addressLocality": "Visakhapatnam",
        "addressRegion": "Andhra Pradesh",
        "postalCode": "530007",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 17.7458262,
        "longitude": 83.1835354
      },
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Visakhapatnam" },
        { "@type": "AdministrativeArea", "name": "Vizag" },
        { "@type": "AdministrativeArea", "name": "Muralinagar" },
        { "@type": "AdministrativeArea", "name": "Madhavadhara" }
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "18:00",
          "closes": "21:00"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "66"
      }
    }
  ];

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/images/logo.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchemas) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="ambient-bg">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
        </div>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <ScrollReveal />
      </body>
    </html>
  );
}
