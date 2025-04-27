import withPlaiceholder from "@plaiceholder/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cf.workana.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "github.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "pvpkvfzhfukbkyudiqic.supabase.co",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "ap-south-1.graphassets.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                pathname: "/**",
            },
        ],
    },
    serverActions: {
        bodySizeLimit: "10mb", // Defina um limite maior, como 10MB
    },
};

export default withPlaiceholder(nextConfig);
