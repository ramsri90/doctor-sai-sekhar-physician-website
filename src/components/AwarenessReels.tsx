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
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isAutoSliding, setIsAutoSliding] = useState<boolean>(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // 1. Initial silent play for all video cards on mount
  useEffect(() => {
    Object.keys(videoRefs.current).forEach((k) => {
      const v = videoRefs.current[k];
      if (v) {
        v.muted = true;
        v.play().catch(() => {});
      }
    });
  }, []);

  // 2. Smooth auto-sliding timer when isAutoSliding is true
  useEffect(() => {
    if (!isAutoSliding) return;

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const container = carouselRef.current;
        const cardWidth = 310;
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft >= maxScroll - 10) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isAutoSliding]);

  // 3. Click handler:
  // - If clicked while active/unmuted -> Mute audio & RESUME AUTO-SLIDING!
  // - If clicked first time -> STOP AUTO-SLIDING, reset video to 0, unmute audio, and play!
  const handleCardClick = (id: string) => {
    const targetVid = videoRefs.current[id];
    if (!targetVid) return;

    if (activeId === id && !targetVid.muted) {
      // Unmuted -> Clicking again mutes video and resumes auto sliding!
      targetVid.muted = true;
      setActiveId(null);
      setIsAutoSliding(true);
    } else {
      // First click -> Stops auto sliding, resets video to 0, unmutes audio & plays!
      setIsAutoSliding(false);

      // Mute and pause all other videos
      Object.keys(videoRefs.current).forEach((k) => {
        const v = videoRefs.current[k];
        if (v && k !== id) {
          v.pause();
          v.muted = true;
        }
      });

      try {
        targetVid.pause();
        targetVid.currentTime = 0;
        targetVid.muted = false;
        targetVid.volume = 1.0;
        
        const p = targetVid.play();
        if (p !== undefined) {
          p.catch((err) => {
            console.log("Audio play policy fallback:", err);
            targetVid.muted = true;
            targetVid.play().catch(() => {});
          });
        }
      } catch (e) {
        console.error("Video reset error:", e);
      }

      setActiveId(id);
    }
  };

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -310, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 310, behavior: "smooth" });
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
            Tap any reel to play with audio from 0:00. Tap again to mute & resume auto-slide.
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
              const isUnmutedActive = activeId === video.id;

              return (
                <div
                  key={video.id}
                  className={`phone-reel-card ${isUnmutedActive ? "active-reel" : ""}`}
                  onClick={() => handleCardClick(video.id)}
                >
                  <div className="phone-reel-frame">
                    <div className="phone-notch"></div>

                    {/* Sound Badge Toggle */}
                    <button
                      className={`sound-toggle-btn ${isUnmutedActive ? "unmuted" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(video.id);
                      }}
                      title={isUnmutedActive ? "Mute Audio & Resume Auto-Slide" : "Play Unmuted from Beginning"}
                    >
                      <i className={`fas ${isUnmutedActive ? "fa-volume-up" : "fa-volume-mute"}`}></i>
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
                      preload="auto"
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
