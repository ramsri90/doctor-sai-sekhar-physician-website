"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { getServiceImage } from "@/lib/servicesImageMap";
import { getServiceSummary } from "@/data/serviceDetails";

interface ServiceItem {
  id: number | string;
  name: string;
  slug: string;
}

interface CategoryItem {
  id: number | string;
  category_name: string;
  services: ServiceItem[];
}

interface FeaturedServicesTabsProps {
  categories: CategoryItem[];
  showCatalogLink?: boolean;
}

const CATEGORY_ICONS: Record<string, string> = {
  "Diabetes": "fa-syringe",
  "Thyroid Disorder": "fa-dna",
  "Fever & Infections": "fa-thermometer-half",
  "Fever": "fa-virus",
  "Headache Care": "fa-head-side-virus",
  "Headache": "fa-brain",
  "Bone and Joint": "fa-bone",
  "Gastro Intestinal": "fa-capsules",
  "Renal Care": "fa-notes-medical",
  "Renal": "fa-x-ray",
  "Cardiac & Hypertension": "fa-heart-pulse",
  "Cardiac": "fa-heartbeat",
  "Respiratory": "fa-lungs",
  "Miscellaneous": "fa-stethoscope",
  "others": "fa-user-md"
};

export default function FeaturedServicesTabs({ categories, showCatalogLink = true }: FeaturedServicesTabsProps) {
  if (!categories || categories.length === 0) return null;

  // Default active category is the first one
  const [activeCatId, setActiveCatId] = useState<number | string>(categories[0].id);
  const tabTrackRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    tabTrackRef.current?.scrollBy({ left: -240, behavior: "smooth" });
  };

  const scrollRight = () => {
    tabTrackRef.current?.scrollBy({ left: 240, behavior: "smooth" });
  };

  const activeCategory = categories.find((c) => String(c.id) === String(activeCatId)) || categories[0];

  return (
    <div className="featured-services-wrapper">
      {/* Category Pills Navigation with Side Moving Arrows */}
      <div className="tabs-nav-wrapper">
        <button
          className="tab-arrow-btn tab-arrow-left"
          onClick={scrollLeft}
          aria-label="Scroll Tabs Left"
          title="Scroll Left"
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        <div className="featured-tabs-nav" ref={tabTrackRef}>
          {categories.map((cat) => {
            const isActive = String(cat.id) === String(activeCatId);
            const iconClass = CATEGORY_ICONS[cat.category_name] || "fa-stethoscope";

            return (
              <button
                key={cat.id}
                className={`featured-tab-btn ${isActive ? "active" : ""}`}
                onClick={() => setActiveCatId(cat.id)}
              >
                <i className={`fas ${iconClass}`}></i>
                <span>{cat.category_name}</span>
              </button>
            );
          })}
        </div>

        <button
          className="tab-arrow-btn tab-arrow-right"
          onClick={scrollRight}
          aria-label="Scroll Tabs Right"
          title="Scroll Right"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      {/* Active Category Display Grid */}
      <div className="featured-tab-content">
        <div className="active-cat-header">
          <h3>
            <i className={`fas ${CATEGORY_ICONS[activeCategory.category_name] || "fa-stethoscope"}`}></i>
            {activeCategory.category_name} Care & Treatments
          </h3>
          <span className="count-badge">
            {activeCategory.services ? activeCategory.services.length : 0} Specialized Treatments
          </span>
        </div>

        <div className="featured-card-grid">
          {activeCategory.services && activeCategory.services.length > 0 ? (
            activeCategory.services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="featured-service-card card-interactive"
              >
                <div className="card-image-wrapper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getServiceImage(service.slug, service.name)}
                    alt={service.name}
                    loading="eager"
                    // @ts-expect-error fetchpriority attribute for instant browser preloading
                    fetchpriority="high"
                    className="card-service-img"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <span className="card-badge">{activeCategory.category_name}</span>
                </div>

                <div className="card-body-content">
                  <h4 className="card-service-title">{service.name}</h4>
                  <p className="card-service-desc">
                    Comprehensive clinical consultation, evaluation, and management plan by Dr. Sai Sekhar P.
                  </p>
                  <span className="card-link-action">
                    View Details & Care Protocol <i className="fas fa-arrow-right"></i>
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <p className="no-services-msg">Contact the clinic directly for available treatments in this category.</p>
          )}
        </div>
      </div>

      {/* Footer Action CTA (only shown if showCatalogLink is true) */}
      {showCatalogLink && (
        <div className="text-center section-footer-cta">
          <Link href="/services" prefetch={true} className="btn btn-primary cta-catalog-btn">
            View Complete Medical Specialties Catalog (40+ Services) <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      )}
    </div>
  );
}
