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
  const [touchStart, setTouchStart] = useState<{x: number, y: number} | null>(null);
  const [touchEnd, setTouchEnd] = useState<{x: number, y: number} | null>(null);

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    
    // If vertical scroll distance is greater than horizontal swipe, ignore it
    if (Math.abs(distanceY) > Math.abs(distanceX)) return;

    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;

    if (isLeftSwipe) {
      setActive((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }
    if (isRightSwipe) {
      setActive((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    }
  };

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
    const timer = setInterval(() => {
      setActive((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

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
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="reviews-slider">
            {reviews.map((rev, idx) => (
              <div 
                key={idx} 
                className={`review-card ${idx === active ? "active" : ""}`}
              >
                <div style={{ position: "absolute", top: "-20px", right: "10px", fontSize: "120px", color: "rgba(13, 122, 102, 0.05)", fontFamily: "serif", lineHeight: 1, pointerEvents: "none" }}>"</div>
                <div style={{ marginBottom: "15px", color: "#fbbf24", fontSize: "1.2rem", letterSpacing: "2px" }}>
                  {"★".repeat(rev.rating)}
                </div>
                <p className="review-text" style={{ fontStyle: "italic", fontSize: "1.1rem", color: "var(--neutral-muted)", marginBottom: "20px", position: "relative", zIndex: 1 }}>"{rev.comment}"</p>
                <div className="review-author" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <div className="author-avatar" style={{ width: "50px", height: "50px", borderRadius: "50%", background: "var(--primary-glow)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1.2rem" }}>
                    {rev.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                  </div>
                  <div className="author-info">
                    <h4 className="author-name" style={{ fontSize: "1rem", fontWeight: 700, margin: 0, color: "var(--neutral-dark)" }}>{rev.name}</h4>
                    <span className="author-source" style={{ fontSize: "0.85rem", color: "var(--primary)", display: "flex", alignItems: "center", gap: "4px" }}>
                      <i className="fas fa-check-circle" style={{ fontSize: "0.8rem" }}></i> Verified Patient
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
                aria-label={`View review ${idx + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
