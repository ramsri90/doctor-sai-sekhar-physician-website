import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.drsaisekharphysician.com"),
  title: {
    default: "Dr. Sai Sekhar P | Consultant Physician in Visakhapatnam",
    template: "%s | Dr. Sai Sekhar P"
  },
  description: "Dr. Sai Sekhar P is a highly experienced Consultant Physician in Internal Medicine & General Medicine practicing at Trinetra Medicals, Muralinagar, Visakhapatnam.",
  keywords: ["Dr. Sai Sekhar P", "Dr. Sai Sekhar", "General Physician Visakhapatnam", "Internal Medicine specialist Vizag", "Diabetes Specialist Visakhapatnam", "Consultant Physician Visakhapatnam", "Trinetra Medicals Muralinagar", "Thyroid Specialist Visakhapatnam", "Fever Consultant Vizag"],
  authors: [{ name: "Dr. Sai Sekhar P" }],
  creator: "Dr. Sai Sekhar P",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.drsaisekharphysician.com",
    title: "Dr. Sai Sekhar P | Consultant Physician in Visakhapatnam",
    description: "Expert General Practitioner & Internal Medicine Consultant at Trinetra Medicals, Muralinagar, Visakhapatnam.",
    siteName: "Dr. Sai Sekhar P Clinic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Sai Sekhar P | Consultant Physician in Visakhapatnam",
    description: "Expert General Practitioner & Internal Medicine Consultant at Trinetra Medicals, Muralinagar, Visakhapatnam.",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": "Dr. Sai Sekhar P",
    "image": "https://www.drsaisekharphysician.com/images/profile.jpg",
    "medicalSpecialty": "Internal Medicine",
    "telephone": "+91 63007 93688",
    "email": "info@drsaisekharphysician.com",
    "url": "https://www.drsaisekharphysician.com",
    "logo": "https://www.drsaisekharphysician.com/images/main-logo.webp",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kodanda Ramalayam St, Muralinagar, Madhavadhara",
      "addressLocality": "Visakhapatnam",
      "addressRegion": "Andhra Pradesh",
      "postalCode": "530007",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.745176283204263,
      "longitude": 83.25699997517319
    },
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
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
