"use client";

import React, { useState, useRef, useEffect } from "react";

interface ReelVideo {
  id: string;
  title: string;
  src: string;
}

const REEL_VIDEOS: ReelVideo[] = [
  {
    id: "adult-vaccination",
    title: "Adult Vaccination Awareness",
    src: "/videos/Adult vaccination awareness video.mp4",
  },
  {
    id: "asthma-awareness",
    title: "Asthma Care & Prevention",
    src: "/videos/Asthma awareness video.mp4",
  },
  {
    id: "diabetes-awareness",
    title: "Diabetes Management Tips",
    src: "/videos/Diabetes awareness video.mp4",
  },
  {
    id: "diabetic-foot",
    title: "Diabetic Foot Care Protocol",
    src: "/videos/Diabetic foot awareness video.mp4",
  },
  {
    id: "fermented-products",
    title: "Gut Health & Fermented Foods",
    src: "/videos/Fermented  products awareness video.mp4",
  },
];

export default function AwarenessReels() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // 1. IntersectionObserver to play/pause only the visible video when scrolling on mobile
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoId = entry.target.getAttribute("data-video-id");
          if (!videoId) return;
          const vid = videoRefs.current[videoId];
          if (!vid) return;

          if (entry.isIntersecting) {
            // Auto play muted when in viewport
            vid.muted = true;
            vid.play().catch(() => {});
          } else {
            vid.pause();
            if (playingId === videoId) {
              setPlayingId(null);
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    const elements = document.querySelectorAll(".phone-reel-card");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [playingId]);

  // 2. Play / Unmute video on tap/click gesture for iOS / Android compatibility
  const handleCardClick = (id: string) => {
    const targetVid = videoRefs.current[id];
    if (!targetVid) return;

    if (playingId === id && !isMuted) {
      // Toggle to muted
      targetVid.muted = true;
      setIsMuted(true);
    } else {
      // Pause all other videos
      Object.keys(videoRefs.current).forEach((k) => {
        const v = videoRefs.current[k];
        if (v && k !== id) {
          v.pause();
          v.muted = true;
        }
      });

      targetVid.currentTime = 0;
      targetVid.muted = false;
      setIsMuted(false);
      
      // Explicit play inside user gesture handler for iOS Safari / Android Chrome
      const p = targetVid.play();
      if (p !== undefined) {
        p.catch(() => {
          // If unmuted autoplay blocked by browser policy, fallback to muted play
          targetVid.muted = true;
          setIsMuted(true);
          targetVid.play().catch(() => {});
        });
      }
      setPlayingId(id);
    }
  };

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section id="awareness-reels" className="awareness-reels-section">
      <div className="container">
        <div className="section-header text-center" style={{ marginBottom: "32px" }}>
          <span className="badge-pill">PATIENT EDUCATION</span>
          <h2 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 2.6rem)", fontWeight: 800, color: "var(--neutral-dark)", marginTop: "8px" }}>
            Health Awareness Reels
          </h2>
          <p style={{ color: "var(--neutral-muted)", fontSize: "1.05rem", marginTop: "4px" }}>
            Tap any reel below to play with audio on your phone or computer
          </p>
        </div>
      </div>

      <div className="full-width-reels-container">
        <div className="reels-carousel-wrapper">
          <button 
            className="reels-nav-btn reels-prev-btn" 
            onClick={scrollLeft}
            aria-label="Previous Reels"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="reels-carousel-track" ref={carouselRef}>
            {REEL_VIDEOS.map((video) => {
              const isPlayingThis = playingId === video.id && !isMuted;

              return (
                <div
                  key={video.id}
                  data-video-id={video.id}
                  className={`phone-reel-card ${isPlayingThis ? "active-reel" : ""}`}
                  onClick={() => handleCardClick(video.id)}
                >
                  <div className="phone-reel-frame">
                    <div className="phone-notch"></div>

                    {/* Sound Indicator / Play Button */}
                    <button
                      className={`sound-toggle-btn ${isPlayingThis ? "unmuted" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(video.id);
                      }}
                      aria-label={isPlayingThis ? "Mute Audio" : "Unmute Audio"}
                    >
                      <i className={`fas ${isPlayingThis ? "fa-volume-up" : "fa-volume-mute"}`}></i>
                    </button>

                    <video
                      ref={(el) => {
                        videoRefs.current[video.id] = el;
                      }}
                      src={video.src}
                      loop
                      muted
                      playsInline
                      className="reel-video-element"
                      preload="metadata"
                    />

                    <div className="reel-title-overlay">
                      <span>{video.title}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button 
            className="reels-nav-btn reels-next-btn" 
            onClick={scrollRight}
            aria-label="Next Reels"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
