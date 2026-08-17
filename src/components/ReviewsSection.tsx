"use client";

import { useState, useEffect } from "react";

interface Review {
  name: string;
  rating: number;
  comment: string;
  source: string;
}

export default function ReviewsSection() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const reviews: Review[] = [
    {
      name: "Ravi Kumar",
      rating: 5,
      comment: "Dr. Sai Sekhar is extremely patient and attentive. He listened carefully to my entire long medical history before prescribing any medication. Excellent doctor for diabetes care and management.",
      source: "Google Review"
    },
    {
      name: "Sujatha Reddy",
      rating: 5,
      comment: "His diagnostic accuracy is outstanding. My father was admitted in critical condition, and his timely treatment and clear explanation of the diagnosis gave our family immense comfort. An exceptional physician.",
      source: "Google Review"
    },
    {
      name: "Prakash Rao",
      rating: 5,
      comment: "He has a very warm and comfortable bedside manner. He took the time to explain my thyroid diagnosis and treatment plan in simple terms. He makes patients feel very comfortable.",
      source: "Google Review"
    },
    {
      name: "K. Srinivasa Rao",
      rating: 5,
      comment: "Highly experienced in internal medicine and intensive care cases. Under his expert care, my brother recovered quickly. He is the best physician in Visakhapatnam.",
      source: "Google Review"
    }
  ];

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, reviews.length]);

  return (
    <section className="reviews-section bg-gradient-mesh">
      <div className="container">
        <div className="section-header text-center">
          <span className="badge">Testimonials</span>
          <h2 className="section-title">What Patients Say</h2>
          <p className="section-subtitle">Real feedback from patients treated at Trinetra Medicals, Muralinagar</p>
          
          <div className="google-rating-badge">
            <span className="rating-num">4.9</span>
            <div className="rating-stars">★★★★★</div>
            <span className="rating-count">Based on 66 Google Reviews</span>
          </div>
        </div>

        <div 
          className="reviews-slider-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="reviews-slider">
            {reviews.map((rev, idx) => (
              <div 
                key={idx} 
                className={`review-card ${idx === active ? "active" : ""}`}
              >
                <div className="quote-icon">“</div>
                <p className="review-text">{rev.comment}</p>
                <div className="review-author">
                  <div className="author-avatar">
                    {rev.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">{rev.name}</h4>
                    <span className="author-source">
                      <span className="stars-small">{"★".repeat(rev.rating)}</span> • {rev.source}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="reviews-nav">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className={`nav-dot ${idx === active ? "active" : ""}`}
                aria-label={`Go to patient review ${idx + 1}`}
              >
                <span className="sr-only">Go to review {idx + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
