import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.drsaisekharphysician.com"),
  title: {
    default: "Dr Sai Sekhar P | Best Physician in Visakhapatnam / Vizag",
    template: "%s | Dr. Sai Sekhar P - Best Physician in Visakhapatnam"
  },
  description: "Dr. Sai Sekhar P is the best physician in Visakhapatnam / Vizag. MD General Medicine, Diabetologist, & Infectious Disease Specialist with 12 years experience at Trinetra Medicals, Muralinagar.",
  keywords: [
    "Dr. Sai Sekhar P",
    "Dr. Sai Sekhar Pyla",
    "Best Physician in Visakhapatnam",
    "Best Physician in Vizag",
    "General Physician Visakhapatnam",
    "Diabetologist Visakhapatnam",
    "Infectious Disease Specialist Vizag",
    "Internal Medicine Doctor Visakhapatnam",
    "Trinetra Medicals Muralinagar",
    "Doctor in Muralinagar Visakhapatnam"
  ],
  authors: [{ name: "Dr. Sai Sekhar P" }],
  creator: "Dr. Sai Sekhar P",
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
    title: "Dr Sai Sekhar P | Best Physician in Visakhapatnam / Vizag",
    description: "Dr. Sai Sekhar P is the best physician in Visakhapatnam / Vizag. MD General Medicine, Diabetologist, & Infectious Disease Specialist at Trinetra Medicals, Muralinagar.",
    siteName: "Dr. Sai Sekhar P - General Physician Visakhapatnam",
    images: [{ url: "https://www.drsaisekharphysician.com/images/two.webp", width: 1200, height: 630, alt: "Dr. Sai Sekhar P - Best Physician in Visakhapatnam / Vizag" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr Sai Sekhar P | Best Physician in Visakhapatnam / Vizag",
    description: "Dr. Sai Sekhar P is the best physician in Visakhapatnam / Vizag. MD General Medicine, Diabetologist, & Infectious Disease Specialist at Trinetra Medicals, Muralinagar.",
    images: ["https://www.drsaisekharphysician.com/images/two.webp"]
  },
  robots: {
    index: true,
    follow: true,
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
      "@type": "Physician",
      "@id": "https://www.drsaisekharphysician.com/#physician",
      "name": "Dr. Sai Sekhar P (Dr. Sai Sekhar Pyla)",
      "alternateName": ["Dr. P. Sai Sekhar", "Dr. Sai Sekhar Physician Visakhapatnam"],
      "image": "https://www.drsaisekharphysician.com/images/two.webp",
      "medicalSpecialty": [
        "GeneralMedicine",
        "Endocrinology",
        "InfectiousDisease"
      ],
      "jobTitle": "MD General Medicine | Diabetologist | Infectious Disease Specialist",
      "description": "Dr. Sai Sekhar P is the best physician in Visakhapatnam / Vizag with 12 years of experience specializing in MD (General Medicine), Diabetology, Infectious Diseases, and Chronic Care at Trinetra Medicals, Muralinagar.",
      "telephone": "+91 63007 93688",
      "email": "info@drsaisekharphysician.com",
      "url": "https://www.drsaisekharphysician.com",
      "logo": "https://www.drsaisekharphysician.com/images/logo.png",
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
      "name": "Trinetra Medicals - Dr. Sai Sekhar Clinic",
      "image": "https://www.drsaisekharphysician.com/images/one.webp",
      "logo": "https://www.drsaisekharphysician.com/images/logo.png",
      "url": "https://www.drsaisekharphysician.com",
      "telephone": "+916300793688",
      "priceRange": "₹₹",
      "hasMap": "https://maps.app.goo.gl/RwBcYF5CqF1yoigb9",
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
