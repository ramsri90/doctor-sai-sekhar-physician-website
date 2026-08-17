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
    title: "Adult Vaccination",
    src: "/videos/Adult vaccination awareness video.mp4",
  },
  {
    id: "asthma-awareness",
    title: "Asthma Awareness",
    src: "/videos/Asthma awareness video.mp4",
  },
  {
    id: "diabetes-awareness",
    title: "Diabetes Awareness",
    src: "/videos/Diabetes awareness video.mp4",
  },
  {
    id: "diabetic-foot",
    title: "Diabetic Foot",
    src: "/videos/Diabetic foot awareness video.mp4",
  },
  {
    id: "fermented-products",
    title: "Fermented Products",
    src: "/videos/Fermented  products awareness video.mp4",
  },
];

export default function AwarenessReels() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [isAutoSliding, setIsAutoSliding] = useState<boolean>(true);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // 1. Initial silent auto-play for all videos on mount
  useEffect(() => {
    Object.keys(videoRefs.current).forEach((key) => {
      const vid = videoRefs.current[key];
      if (vid) {
        vid.muted = true;
        vid.play().catch(() => {});
      }
    });
  }, []);

  // 2. Continuous smooth right-to-left auto-sliding track when isAutoSliding is true
  useEffect(() => {
    if (!isAutoSliding) return;

    let animId: number;

    const autoScroll = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += 1.2;

        const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
        if (carouselRef.current.scrollLeft >= maxScroll - 2) {
          carouselRef.current.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(autoScroll);
    };

    animId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animId);
  }, [isAutoSliding]);

  // 3. Click handler: Stop sliding, reset video to 0, unmute audio and play!
  const handleVideoClick = (uniqueKey: string) => {
    const targetVid = videoRefs.current[uniqueKey];

    if (activeKey === uniqueKey && !isAutoSliding) {
      // Second click: Resume sliding and mute audio
      setIsAutoSliding(true);
      if (targetVid) {
        targetVid.muted = true;
      }
      setActiveKey(null);
    } else {
      // First click: Stop sliding, reset video to 0 and unmute synchronously!
      setIsAutoSliding(false);

      // Mute all other videos
      Object.keys(videoRefs.current).forEach((k) => {
        const vid = videoRefs.current[k];
        if (vid && k !== uniqueKey) {
          vid.muted = true;
        }
      });

      if (targetVid) {
        try {
          targetVid.pause();
          targetVid.currentTime = 0;
          targetVid.muted = false;
          targetVid.volume = 1.0;
          
          const playPromise = targetVid.play();
          if (playPromise !== undefined) {
            playPromise.catch((err) => console.log("Sync play error:", err));
          }
        } catch (e) {
          console.error("Video reset error:", e);
        }
      }
      setActiveKey(uniqueKey);
    }
  };

  const toggleMute = (e: React.MouseEvent, uniqueKey: string) => {
    e.stopPropagation();
    const vid = videoRefs.current[uniqueKey];
    if (vid) {
      if (vid.muted) {
        setIsAutoSliding(false);
        vid.pause();
        vid.currentTime = 0;
        vid.muted = false;
        vid.volume = 1.0;
        vid.play().catch(() => {});
        setActiveKey(uniqueKey);
      } else {
        setIsAutoSliding(true);
        vid.muted = true;
        setActiveKey(null);
      }
    }
  };

  return (
    <section className="awareness-reels-section scroll-reveal">
      {/* Centered Header */}
      <div className="container">
        <div className="section-header text-center" style={{ marginBottom: "36px" }}>
          <span className="badge-pill">PATIENT EDUCATION</span>
          <h2 className="section-title" style={{ fontSize: "clamp(2.2rem, 4.5vw, 2.8rem)", fontWeight: 800, color: "var(--neutral-dark)", marginTop: "8px" }}>
            Awareness Reels
          </h2>
          <p style={{ color: "var(--neutral-muted)", fontSize: "1.1rem", marginTop: "4px" }}>
            Watch short video reels on health tips & preventive healthcare
          </p>
        </div>
      </div>

      {/* Full-width Edge to Edge Carousel Track */}
      <div className="full-width-reels-container">
        <div className="reels-carousel-wrapper">
          <button 
            className="reels-nav-btn reels-prev-btn" 
            onClick={() => {
              setIsAutoSliding(false);
              carouselRef.current?.scrollBy({ left: -320, behavior: "smooth" });
            }}
            aria-label="Previous Reels"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          {/* Triple video list for full screen edge-to-edge seamless loop */}
          <div className="reels-carousel-track" ref={carouselRef}>
            {[...REEL_VIDEOS, ...REEL_VIDEOS, ...REEL_VIDEOS].map((video, idx) => {
              const uniqueKey = `${video.id}-${idx}`;
              const isSelected = activeKey === uniqueKey;

              return (
                <div
                  key={uniqueKey}
                  className={`phone-reel-card ${isSelected ? "active-reel" : ""}`}
                  onClick={() => handleVideoClick(uniqueKey)}
                >
                  <div className="phone-reel-frame">
                    {/* Phone Notch */}
                    <div className="phone-notch"></div>

                    {/* Sound Mute/Unmute Badge */}
                    <button
                      className={`sound-toggle-btn ${isSelected ? "unmuted" : ""}`}
                      onClick={(e) => toggleMute(e, uniqueKey)}
                      title={isSelected ? "Mute Audio" : "Unmute Audio"}
                    >
                      <i className={`fas ${isSelected ? "fa-volume-up" : "fa-volume-mute"}`}></i>
                    </button>

                    {/* Continuous Auto-playing Video */}
                    <video
                      ref={(el) => {
                        videoRefs.current[uniqueKey] = el;
                      }}
                      src={video.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="reel-video-element"
                      preload="auto"
                    />

                    {/* Overlay Title Label */}
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
            onClick={() => {
              setIsAutoSliding(false);
              carouselRef.current?.scrollBy({ left: 320, behavior: "smooth" });
            }}
            aria-label="Next Reels"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
