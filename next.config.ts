import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/doc',
        destination: '/',
        permanent: true,
      }
    ]
  },
};

export default nextConfig;
