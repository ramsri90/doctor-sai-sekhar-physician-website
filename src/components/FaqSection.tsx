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
      "A General Physician is your primary point of contact for adult healthcare. Dr. Sai Sekhar treats a wide range of acute and chronic conditions, including viral fevers, respiratory infections, gastrointestinal issues, and metabolic disorders. According to the World Health Organization (WHO), primary care physicians handle the vast majority of personal health needs safely and effectively.",
  },
  {
    question: "When should you see a Diabetologist in Vizag?",
    answer:
      "You should consult a diabetologist if your fasting blood sugar is consistently above 126 mg/dL, if you experience excessive thirst or frequent urination, or if you have a family history of diabetes. Early intervention is critical; as per ICMR guidelines, timely management of Type 2 Diabetes prevents severe complications like neuropathy and kidney disease.",
  },
  {
    question: "How is Dr. Sai Sekhar different from other physicians in Visakhapatnam?",
    answer:
      "Dr. Sai Sekhar brings 12 years of specialized experience in both critical care and chronic disease management. His approach focuses on evidence-based medicine and comprehensive lifestyle counseling rather than just prescribing medication. He prioritizes taking a detailed medical history to uncover the root cause of symptoms.",
  },
  {
    question: "What should I expect during my first consultation?",
    answer:
      "During your initial visit at Trinetra Medicals, expect a thorough review of your medical history, a physical examination, and a detailed discussion of your current symptoms. Dr. Sai Sekhar will explain your diagnosis clearly and work with you to develop a personalized, easy-to-follow treatment and diet plan.",
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
