import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Parent /workspace has its own package-lock; pin Turbopack to this app.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
