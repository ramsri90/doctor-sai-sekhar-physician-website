"use client";

import { useRef, useState } from "react";

const videos = [
  { src: "/videos/Adult vaccination awareness video.mp4", title: "Adult Vaccination" },
  { src: "/videos/Asthma awareness video.mp4", title: "Asthma Awareness" },
  { src: "/videos/Diabetes awareness video.mp4", title: "Diabetes Awareness" },
  { src: "/videos/Diabetic foot awareness video.mp4", title: "Diabetic Foot" },
  { src: "/videos/Fermented  products awareness video.mp4", title: "Fermented Products" },
];

export default function VideoReelsSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="video-reels-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="badge">Health Education</span>
          <h2 className="section-title">Awareness Reels</h2>
          <p className="section-subtitle">Watch our short videos on health awareness</p>
        </div>
        
        <div 
          className="reels-slider-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          <div className={`reels-track ${isHovered ? 'paused' : ''}`}>
            {/* Double the array for infinite scroll effect */}
            {[...videos, ...videos].map((vid, idx) => (
              <VideoReelItem key={idx} video={vid} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoReelItem({ video }: { video: { src: string, title: string } }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleAudio = () => {
    if (videoRef.current) {
      if (isMuted) {
        // Mute all other videos on the page
        document.querySelectorAll('video').forEach(vid => {
          if (vid !== videoRef.current) {
            vid.muted = true;
          }
        });
        
        // Ensure video is playing (in case it was paused)
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(e => console.log("Play failed", e));
        
        // Unmute current video
        videoRef.current.muted = false;
        setIsMuted(false);
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  return (
    <div className="reel-phone-frame" onClick={toggleAudio}>
      <div className="phone-notch"></div>
      <video 
        ref={videoRef}
        src={video.src}
        className="reel-video"
        loop
        autoPlay
        muted
        playsInline
        onVolumeChange={(e) => setIsMuted(e.currentTarget.muted)}
      ></video>
      
      <div className="audio-toggle-btn">
        {isMuted ? (
          <i className="fas fa-volume-mute"></i>
        ) : (
          <i className="fas fa-volume-up" style={{ color: 'var(--primary)' }}></i>
        )}
      </div>

      <div className="reel-title">{video.title}</div>
    </div>
  );
}
