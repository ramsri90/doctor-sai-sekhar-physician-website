import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [50, 75, 85, 100],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.drsaisekharphysician.com",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/storage/**",
      },
    ],
  },

  // ── Security & SEO HTTP Response Headers ──
  // These improve Core Web Vitals trust, HTTPS scores, and Google's E-E-A-T signals.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Force HTTPS everywhere (HSTS) — strong SEO + security trust signal
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Prevent clickjacking (protects domain reputation)
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          // Prevent MIME sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Control referrer info passed to third parties
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Permissions policy — disable unused browser APIs (privacy + trust)
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), payment=()",
          },
          // XSS protection for legacy browsers
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      // ── Cache static assets aggressively (improves LCP / CWV) ──
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/videos/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
    ];
  },

  // ── Permanent Redirects (SEO 301 signals) ──
  async redirects() {
    return [
      // Legacy URL fixes
      { source: "/Aboutclinic", destination: "/about-clinic", permanent: true },
      { source: "/Aboutdr", destination: "/about-doctor", permanent: true },
      { source: "/Reviews", destination: "/#reviews", permanent: true },
      // Common alternate spellings / typos people search for
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/clinic", destination: "/about-clinic", permanent: true },
      { source: "/doctor", destination: "/about-doctor", permanent: true },
      { source: "/appointment", destination: "/contact", permanent: true },
      { source: "/book-appointment", destination: "/contact", permanent: true },
      { source: "/services/cancer-surgery", destination: "/services", permanent: true },
    ];
  },
};

export default nextConfig;
