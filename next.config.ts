import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      { source: "/settlements", destination: "/class-actions", permanent: false },
      { source: "/settlements/:slug*", destination: "/class-actions", permanent: false },
      { source: "/legal-basics", destination: "/class-actions", permanent: false },
      { source: "/legal-basics/:slug*", destination: "/class-actions", permanent: false },
      { source: "/resources", destination: "/about", permanent: false },
      { source: "/resources/:slug*", destination: "/about", permanent: false },
    ];
  },
};

export default nextConfig;
