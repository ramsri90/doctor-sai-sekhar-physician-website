import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.drsaisekharphysician.com"),
  title: {
    default: "Dr Sai Sekhar Pyla | Best Physician in Visakhapatnam",
    template: "%s | Dr. Sai Sekhar Pyla"
  },
  description: "Dr. Sai Sekhar Pyla is a General Physician & Diabetologist in Visakhapatnam with 12 years of experience in chronic disease management & preventive care.",
  keywords: ["Dr. Sai Sekhar Pyla", "Dr. P. Sai Sekhar", "General Physician Visakhapatnam", "Best Physician Visakhapatnam", "Diabetologist Visakhapatnam", "Internal Medicine Vizag", "Consultant Physician Muralinagar", "Trinetra Medicals"],
  authors: [{ name: "Dr. Sai Sekhar Pyla" }],
  creator: "Dr. Sai Sekhar Pyla",
  alternates: {
    canonical: "https://www.drsaisekharphysician.com/"
  },
  icons: {
    icon: [
      { url: "/images/logo.png", type: "image/png" }
    ],
    apple: [
      { url: "/images/logo.png", type: "image/png" }
    ],
    shortcut: ["/images/logo.png"]
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.drsaisekharphysician.com/",
    title: "Dr Sai Sekhar Pyla | Best Physician in Visakhapatnam",
    description: "Dr. Sai Sekhar Pyla is a General Physician & Diabetologist in Visakhapatnam with 12 years of experience in chronic disease management & preventive care.",
    siteName: "Dr. Sai Sekhar Pyla - General Physician",
    images: [{ url: "https://www.drsaisekharphysician.com/images/two.webp", width: 1200, height: 630, alt: "Dr. Sai Sekhar Pyla - General Physician in Visakhapatnam" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr Sai Sekhar Pyla | Best Physician in Visakhapatnam",
    description: "Dr. Sai Sekhar Pyla is a General Physician & Diabetologist in Visakhapatnam with 12 years of experience in chronic disease management & preventive care.",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": "Dr. P. Sai Sekhar (Dr. Sai Sekhar Pyla)",
    "image": "https://www.drsaisekharphysician.com/images/two.webp",
    "medicalSpecialty": "General Medicine",
    "description": "Dr. Sai Sekhar Pyla, MBBS, MD (General Medicine), General Physician in Visakhapatnam with 12 years of clinical experience.",
    "telephone": "+91 63007 93688",
    "email": "info@drsaisekharphysician.com",
    "url": "https://www.drsaisekharphysician.com",
    "logo": "https://www.drsaisekharphysician.com/images/logo.png",
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
        <link rel="icon" href="/images/logo.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
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
