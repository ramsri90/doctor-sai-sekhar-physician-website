import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [50, 75, 85, 100],
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
  async redirects() {
    return [
      {
        source: "/Aboutclinic",
        destination: "/about-clinic",
        permanent: true,
      },
      {
        source: "/Aboutdr",
        destination: "/about-doctor",
        permanent: true,
      },
      {
        source: "/Reviews",
        destination: "/#reviews",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
