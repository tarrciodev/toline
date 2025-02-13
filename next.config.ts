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
                hostname: "pvpkvfzhfukbkyudiqic.supabase.co",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "ap-south-1.graphassets.com",
                pathname: "/**",
            },
        ],
    },
};

export default withPlaiceholder(nextConfig);
