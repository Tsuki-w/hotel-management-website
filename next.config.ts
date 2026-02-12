import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cacheComponents: true, // 允许在特定路由中逐个开启 PPR
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dclaevazetcjjkrzczpc.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
      {
        protocol: "https",
        hostname: "pjlxgflmrejgipvxmjgr.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
      {
        protocol: "https",
        hostname: "pjlxgflmrejgipvxmjgr.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/customer-images/**",
      },
    ],
  },
};

export default nextConfig;
