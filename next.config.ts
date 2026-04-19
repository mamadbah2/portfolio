import type { NextConfig } from "next";

const isPages = process.env.GITHUB_PAGES === "1";
const basePath = isPages ? "/portfolio" : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
