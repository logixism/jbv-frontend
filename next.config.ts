import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["jbvalues.com", "cdn.discordapp.com"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "jbvalues.com",
    //     port: "",
    //     pathname: "*",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "cdn.discordapp.com",
    //     port: "",
    //     pathname: "**",
    //     search: "",
    //   },
    // ],
  },
};

export default nextConfig;
