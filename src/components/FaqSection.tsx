"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What conditions does a General Physician treat?",
    answer:
      "Direct Answer: A General Physician diagnoses and treats a full range of adult medical conditions including Type 1 & Type 2 Diabetes, Hypertension, Dengue and viral fevers, Thyroid disorders, Asthma/COPD, and Gastrointestinal illnesses. Dr. Sai Sekhar Pyla provides expert primary and preventive care at Trinetra Medicals, Visakhapatnam.",
  },
  {
    question: "When should you see a Diabetologist in Vizag?",
    answer:
      "Direct Answer: You should consult a diabetologist immediately if your fasting blood sugar exceeds 126 mg/dL, HbA1c is above 6.5%, or if you experience frequent urination, extreme thirst, or foot numbness. As per ICMR guidelines, early diabetes management by Dr. Sai Sekhar Pyla prevents kidney damage and neuropathy.",
  },
  {
    question: "How is Dr. Sai Sekhar different from other physicians in Visakhapatnam?",
    answer:
      "Direct Answer: Dr. Sai Sekhar Pyla brings 12+ years of dual expertise in critical care medicine and diabetology. He focuses on root-cause clinical diagnosis, evidence-based guidelines, and patient-centered lifestyle counseling at Trinetra Medicals, Muralinagar.",
  },
  {
    question: "What should I expect during my first consultation?",
    answer:
      "Direct Answer: During your first visit at Trinetra Medicals, expect a comprehensive 30-minute medical evaluation, detailed symptom analysis, blood sugar or vitals check, and a personalized treatment and diet plan tailored to your health goals.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section bg-gradient-mesh scroll-reveal">
      <div className="container max-w-4xl" style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div className="section-header text-center" style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="badge">Frequently Asked Questions</span>
          <h2 className="section-title" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, marginTop: "8px" }}>
            Common Patient Queries
          </h2>
        </div>

        <div className="faq-accordion" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`faq-card ${isOpen ? "open" : ""}`}
                style={{
                  backgroundColor: "var(--white)",
                  border: "1px solid var(--neutral-border)",
                  borderRadius: "var(--border-radius-md)",
                  boxShadow: isOpen ? "var(--shadow-md)" : "var(--shadow-sm)",
                  overflow: "hidden",
                  transition: "var(--transition-smooth)",
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 24px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: "16px",
                  }}
                  aria-expanded={isOpen}
                >
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: isOpen ? "var(--primary)" : "var(--neutral-dark)",
                      margin: 0,
                    }}
                  >
                    {faq.question}
                  </h3>
                  <i
                    className={`fas ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}
                    style={{
                      color: "var(--primary)",
                      fontSize: "1rem",
                      transition: "transform 0.3s ease",
                    }}
                  ></i>
                </button>

                {isOpen && (
                  <div
                    className="faq-answer faq-answer-anim"
                    style={{
                      padding: "0 24px 20px 24px",
                      color: "var(--neutral-muted)",
                      fontSize: "0.98rem",
                      lineHeight: "1.6",
                      borderTop: "1px solid var(--neutral-light)",
                      paddingTop: "16px",
                    }}
                  >
                    <p style={{ margin: 0 }}>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
