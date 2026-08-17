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

  // Local fallback banners if API banners list is empty
  const mobileImages = [
    "/images/mobileversion 2.png",
    "/images/mobile version.png"
  ];

  const defaultBanners = [
    { id: 1, desktopImage: "/images/desktop2.png", mobileImage: mobileImages[0], title: "Comprehensive diabetes and chronic disease care.", subtitle: "Expert diagnosis and advanced, patient-centered therapy for endocrine and metabolic disorders." },
    { id: 2, desktopImage: "/images/desktop.png", mobileImage: mobileImages[1], title: "Dedicated Chronic Disease Management", subtitle: "Personalized care plans for long-term health, lifestyle conditions, and preventative medicine." },
    { id: 3, desktopImage: "/images/desktop2.png", mobileImage: mobileImages[0], title: "Thyroid & Lifestyle Disorders", subtitle: "Tailored treatment plans for metabolic, joint, and chronic ailments." },
    { id: 4, desktopImage: "/images/desktop.png", mobileImage: mobileImages[1], title: "Critical Care & Internal Medicine", subtitle: "Renowned medical expertise with a patient-first bedside manner." }
  ];

  const slides = banners && banners.length > 0
    ? banners.map((b, idx) => ({
        id: b.id,
        desktopImage: defaultBanners[idx % defaultBanners.length].desktopImage,
        mobileImage: mobileImages[idx % mobileImages.length],
        title: defaultBanners[idx % defaultBanners.length].title,
        subtitle: defaultBanners[idx % defaultBanners.length].subtitle
      }))
    : defaultBanners;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
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
      // Swiped left -> Next slide
      setCurrent((prev) => (prev + 1) % slides.length);
    } else if (diff < -minSwipeDistance) {
      // Swiped right -> Prev slide
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div 
      className="slider-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`slide-item ${idx === current ? "active" : ""}`}
        >
          {/* Main Content Layout */}
          <div className="container slide-content-wrapper">
            <div className="slide-grid-layout">
              {/* Left Column (60%) */}
              <div className="slide-content">
                <div className="eyebrow-container">
                  <span className="eyebrow-line"></span>
                  <span className="eyebrow-text">YOUR HEALTH, OUR PRIORITY</span>
                </div>
                
                <h2 className="slide-title">{slide.title}</h2>
                <p className="slide-subtitle">{slide.subtitle}</p>
                
                <div className="slide-buttons">
                  <Link href="/contact" className="btn btn-primary btn-amber">
                    Book Appointment <i className="fas fa-calendar-alt btn-icon"></i>
                  </Link>
                  <Link href="/services" className="btn btn-secondary slide-btn-sec">
                    Explore Services <i className="fas fa-arrow-right btn-icon"></i>
                  </Link>
                </div>

                <hr className="slide-divider" />

                {/* Bottom Info Row */}
                <div className="slide-info-row">
                  <div className="info-col">
                    <span className="info-label"><i className="fas fa-mobile-alt info-icon"></i> CLINIC CONTACT</span>
                    <span className="info-value">6300793688</span>
                  </div>
                  <div className="info-col">
                    <span className="info-label">LOCATION & CLINIC</span>
                    <span className="info-value"><strong style={{ color: "var(--secondary)" }}>Trinetra Medicals</strong>, Muralinagar</span>
                  </div>
                  <div className="info-col">
                    <span className="info-label">TIMINGS</span>
                    <span className="info-value">Mon - Sat · 6 PM - 9 PM</span>
                  </div>
                </div>
              </div>

              {/* Right Column (40%) */}
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
                      alt="Doctor Consultation"
                      width={480}
                      height={500}
                      priority={idx === 0}
                      className="doctor-hero-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

