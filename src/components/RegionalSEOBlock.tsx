import React from "react";

interface RegionalSEOBlockProps {
  useCardOnly?: boolean;
}

export default function RegionalSEOBlock({ useCardOnly = false }: RegionalSEOBlockProps) {
  const regions = [
    { name: "Muralinagar (Clinic Location)", highlight: true },
    { name: "Madhavadhara", highlight: true },
    { name: "NAD Junction", highlight: true },
    { name: "Akkayyapalem", highlight: false },
    { name: "Gajuwaka", highlight: false },
    { name: "Seethammadhara", highlight: false },
    { name: "Visakhapatnam (Vizag)", highlight: true }
  ];

  const cardContent = (
    <div className="regional-seo-card" style={{ height: "100%", justifyContent: "space-between" }}>
      <div className="regional-header">
        <i className="fas fa-map-marked-alt regional-icon"></i>
        <div>
          <h3 className="regional-title">
            Regional Care Coverage - Visakhapatnam / Vizag
          </h3>
          <p className="regional-subtitle">
            Serving patients across <strong>Visakhapatnam (Vizag)</strong> and surrounding coastal neighborhoods with expert General Medicine, Diabetology, & Infectious Disease care.
          </p>
        </div>
      </div>

      <div className="region-chips-wrapper">
        {regions.map((reg, idx) => (
          <span
            key={idx}
            className={`region-chip ${reg.highlight ? "region-highlight" : ""}`}
          >
            <i className="fas fa-location-dot"></i> {reg.name}
          </span>
        ))}
      </div>

      <p className="regional-footer-note">
        Patients from <strong>Muralinagar, Madhavadhara, NAD Junction, Akkayyapalem, Gajuwaka, Seethammadhara</strong> and all areas of <strong>Visakhapatnam</strong> can consult <strong>Dr. Sai Sekhar P</strong> (<strong>Best Physician in Visakhapatnam / Vizag</strong>) at <strong>Trinetra Medicals</strong>. Evening Clinic Timings: 6:00 PM – 9:00 PM (Mon – Sat). Contact: <a href="tel:+916300793688" style={{ color: "var(--primary)", fontWeight: 700 }}>+91 63007 93688</a>.
      </p>
    </div>
  );

  if (useCardOnly) {
    return cardContent;
  }

  return (
    <section className="regional-seo-section">
      <div className="container">
        {cardContent}
      </div>
    </section>
  );
}
