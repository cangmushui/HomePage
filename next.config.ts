import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const isProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: isProduction ? 'export' : undefined,
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true
  },
  basePath: isGitHubPages ? '/cangmushui.github.io' : '',
  assetPrefix: isGitHubPages ? '/cangmushui.github.io/' : '',
};

export default nextConfig;
