"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface Banner {
  id: number;
  image: string;
  link: string;
}

interface HomeSliderProps {
  banners: Banner[];
}

export default function HomeSlider({ banners }: HomeSliderProps) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const defaultBanners = [
    { id: 1, title: "Comprehensive Diabetes & Chronic Disease Care", subtitle: "Expert diagnosis and advanced, patient-centered therapy for endocrine and metabolic disorders." },
    { id: 2, title: "Dedicated Chronic Disease Management", subtitle: "Personalized care plans for long-term health, lifestyle conditions, and preventative medicine." },
    { id: 3, title: "Thyroid & Lifestyle Disorders Treatment", subtitle: "Tailored treatment plans for metabolic, joint, and chronic ailments by Dr. Sai Sekhar P." },
    { id: 4, title: "Critical Care & Internal Medicine", subtitle: "Renowned medical expertise with a patient-first approach at Trinetra Medicals." }
  ];

  const slides = banners && banners.length > 0
    ? banners.map((b, idx) => ({
        id: b.id,
        title: defaultBanners[idx % defaultBanners.length].title,
        subtitle: defaultBanners[idx % defaultBanners.length].subtitle
      }))
    : defaultBanners;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;
    if (diff > minSwipeDistance) {
      setCurrent((prev) => (prev + 1) % slides.length);
    } else if (diff < -minSwipeDistance) {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentSlide = slides[current];

  return (
    <div 
      className="slider-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="stable-hero-layout">
        <div className="container slide-content-wrapper">
          <div className="slide-grid-layout">
            {/* Left Column: Text & CTAs */}
            <div className="slide-content">
              <div className="eyebrow-container">
                <span className="eyebrow-line"></span>
                <span className="eyebrow-text">
                  Dr. Sai Sekhar P · <strong>Best Physician in Visakhapatnam / Vizag</strong>
                </span>
              </div>
              
              {/* Text Container - Only Title & Subtitle Animate */}
              <div className="hero-text-slider-box">
                <h2 key={`title-${current}`} className="slide-title animate-text-fade">
                  {currentSlide.title}
                </h2>
                <p key={`sub-${current}`} className="slide-subtitle animate-text-fade">
                  {currentSlide.subtitle}
                </p>
              </div>
              
              {/* Fixed CTA Action Buttons */}
              <div className="slide-buttons">
                <Link href="/contact" className="btn btn-primary btn-amber">
                  Book Appointment <i className="fas fa-calendar-alt btn-icon"></i>
                </Link>
                <Link href="/services" className="btn btn-secondary slide-btn-sec">
                  Explore Services <i className="fas fa-arrow-right btn-icon"></i>
                </Link>
              </div>

              {/* Slide Indicator Dots */}
              <div className="hero-slide-dots">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    className={`dot-pill ${idx === current ? "active" : ""}`}
                    onClick={() => setCurrent(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <hr className="slide-divider" />

              {/* Bottom Info Row */}
              <div className="slide-info-row">
                <div className="info-col">
                  <span className="info-label"><i className="fas fa-mobile-alt info-icon"></i> CLINIC CONTACT</span>
                  <span className="info-value">6300793688</span>
                </div>
                <div className="info-col">
                  <span className="info-label"><i className="fas fa-map-marker-alt info-icon"></i> CLINIC LOCATION</span>
                  <span className="info-value">
                    <a
                      href="https://maps.app.goo.gl/RwBcYF5CqF1yoigb9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero-map-link"
                      title="Open Clinic Location on Google Maps"
                    >
                      <strong style={{ color: "#34d399", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                        Trinetra Medicals <i className="fas fa-external-link-alt" style={{ fontSize: "0.72rem", marginLeft: "2px" }}></i>
                      </strong>
                    </a>
                    , Muralinagar, Visakhapatnam
                  </span>
                </div>
                <div className="info-col">
                  <span className="info-label">TIMINGS</span>
                  <span className="info-value">Mon - Sat · 6 PM - 9 PM</span>
                </div>
              </div>
            </div>

            {/* Right Column: Stable Doctor Hero Image */}
            <div className="slide-image-aside">
              <div className="doctor-hero-image-wrapper">
                {/* Floating Stat Badge Card */}
                <div className="floating-stat-card">
                  <span className="stat-number">12 Years</span>
                  <span className="stat-label">Clinical Experience</span>
                </div>
                
                <div className="image-frame-container">
                  <Image 
                    src="/images/one.webp"
                    alt="Dr. Sai Sekhar Pila - Consultant Physician"
                    width={480}
                    height={500}
                    priority
                    className="doctor-hero-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
