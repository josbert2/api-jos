import path from "node:path";
import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  output: process.env.NEXT_OUTPUT_STANDALONE === "1" ? "standalone" : undefined,
  outputFileTracingRoot: path.join(process.cwd(), "../.."),
  typescript: {
    ignoreBuildErrors: process.env.NEXT_OUTPUT_STANDALONE === "1",
  },
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_OUTPUT_STANDALONE === "1",
  },


  async redirects() {
    return [];
  },
  async rewrites() {
    return [
      {
        destination: "/api/raw/docs/:path*",
        source: "/docs/:path*.md",
      },
    ];
  },
  transpilePackages: ["@coss/ui", "@coss/flyonui"],
};

export default withMDX(nextConfig);
