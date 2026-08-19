"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface GalleryItem {
  id: number;
  type: "image" | "video";
  src: string;
  title: string;
  category: string;
}

export default function ClinicGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      type: "image",
      src: "/images/clinic image.jpeg",
      title: "Trinetra Medicals Facility Premises",
      category: "Clinic Overview"
    },
    {
      id: 2,
      type: "image",
      src: "/images/clinicimage.jpeg",
      title: "Trinetra Medicals Reception & Counter",
      category: "Reception & Patient Area"
    },
    {
      id: 3,
      type: "image",
      src: "/images/doctor.jpeg",
      title: "Dr. Sai Sekhar Pyla Consultation",
      category: "Physician Care"
    },
    {
      id: 4,
      type: "image",
      src: "/images/doctor2.jpeg",
      title: "Clinical Evaluation & Diagnostics",
      category: "Internal Medicine"
    },
    {
      id: 5,
      type: "video",
      src: "/videos/laboverview.mp4",
      title: "Laboratory & Diagnostic Facilities Overview",
      category: "Diagnostic Lab Video"
    },
    {
      id: 6,
      type: "image",
      src: "/images/one.webp",
      title: "Consultation Suite & Patient Examination",
      category: "Examination Room"
    },
    {
      id: 7,
      type: "image",
      src: "/images/three.webp",
      title: "Diagnostic Equipment & Testing",
      category: "Diagnostic Testing"
    },
    {
      id: 8,
      type: "image",
      src: "/images/four.webp",
      title: "Pharmacy & Medical Dispensing",
      category: "In-House Pharmacy"
    }
  ];

  // Close modal on Escape key, navigate on Left/Right keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : 0));
      }
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % galleryItems.length : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, galleryItems.length]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  const activeItem = selectedIndex !== null ? galleryItems[selectedIndex] : null;

  return (
    <div className="clinic-gallery-container">
      <div className="gallery-header-block">
        <span className="badge-pill">INFRASTRUCTURE & FACILITIES</span>
        <h3 className="gallery-title" style={{ marginTop: "6px", marginBottom: "6px" }}>
          Clinic Photo & Video Gallery
        </h3>
        <p className="gallery-subtitle" style={{ fontSize: "0.95rem", color: "var(--neutral-muted)", margin: "0 0 24px 0" }}>
          Click any photo or video below to open interactive full-screen view
        </p>
      </div>

      <div className="gallery-masonry-grid">
        {galleryItems.map((item, idx) => (
          <div
            key={item.id}
            className={`gallery-card-item ${item.type === "video" ? "video-item" : ""}`}
            onClick={() => setSelectedIndex(idx)}
            tabIndex={0}
            role="button"
            aria-label={`View ${item.title}`}
          >
            <div className="gallery-card-media-wrapper">
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={item.title}
                  width={380}
                  height={250}
                  className="gallery-card-img"
                />
              ) : (
                <div className="gallery-video-thumbnail">
                  <video
                    src={item.src}
                    muted
                    preload="metadata"
                    className="gallery-card-video-preview"
                  />
                  <div className="video-play-overlay-badge">
                    <i className="fas fa-play"></i>
                  </div>
                </div>
              )}
              
              <div className="gallery-card-overlay">
                <div className="overlay-action-indicator">
                  <i className={item.type === "video" ? "fas fa-play-circle" : "fas fa-search-plus"}></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal Popup (Portal to document.body) */}
      {mounted && selectedIndex !== null && activeItem && createPortal(
        <div className="gallery-lightbox-backdrop" onClick={() => setSelectedIndex(null)}>
          <div className="gallery-lightbox-modal" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              className="lightbox-close-btn"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close Lightbox"
            >
              <i className="fas fa-times"></i>
            </button>

            {/* Prev Arrow */}
            <button
              className="lightbox-nav-btn lightbox-prev"
              onClick={() => setSelectedIndex((prev) => (prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : 0))}
              aria-label="Previous item"
            >
              <i className="fas fa-chevron-left"></i>
            </button>

            {/* Next Arrow */}
            <button
              className="lightbox-nav-btn lightbox-next"
              onClick={() => setSelectedIndex((prev) => (prev !== null ? (prev + 1) % galleryItems.length : 0))}
              aria-label="Next item"
            >
              <i className="fas fa-chevron-right"></i>
            </button>

            {/* Modal Content */}
            <div className="lightbox-media-container">
              {activeItem.type === "image" ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={activeItem.src}
                  alt="Clinic Gallery Item"
                  className="lightbox-img"
                />
              ) : (
                <video
                  src={activeItem.src}
                  controls
                  autoPlay
                  className="lightbox-video"
                />
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
