# Deployment Guide

This project can be deployed in two ways: local preview and GitHub Pages.

## Local Preview

For testing the static build locally (e.g., with Live Server):

```bash
npm run build:local
```

This command:
1. Runs `next build` to generate static files
2. Runs `node fix-paths.js` to convert absolute paths to relative paths

The build creates a `out` directory with relative paths that work when served from any web server or opened directly with Live Server.

### Manual Path Fixing (if needed)

If you need to manually fix paths:

```bash
npm run build:local  # This already includes path fixing
# OR manually:
npm run build
node fix-paths.js
```

## GitHub Pages Deployment

For deploying to GitHub Pages:

```bash
npm run build:github
```

This creates a build with the correct base paths for GitHub Pages (`/cangmushui.github.io`).

## Automatic Deployment

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically uses `build:github` when deploying to GitHub Pages.

## Path Configuration Explanation

The project uses different path configurations for different environments:

- **Local Preview**: Relative paths (e.g., `_next/static/css/app.css`)
- **GitHub Pages**: Absolute paths with basePath (e.g., `/cangmushui.github.io/_next/static/css/app.css`)

The `fix-paths.js` script converts absolute paths to relative paths for local serving.

## Testing

1. **Local testing**: Use `npm run build:local` then serve the `out` directory with Live Server
2. **GitHub Pages testing**: Use `npm run build:github` (but the paths won't work locally)

## Important Notes

- Always use `npm run build:local` for local preview
- The `fix-paths.js` script automatically fixes CSS, JS, and image paths
- Live Server or any local web server will work correctly with the local build

## Configuration

The `next.config.ts` file uses the `GITHUB_PAGES` environment variable to determine whether to use GitHub Pages paths:

- `GITHUB_PAGES=true`: Adds `/cangmushui.github.io` base path
- No `GITHUB_PAGES` variable: Uses relative paths for local serving

## 🚀 自动部署（推荐）

### 1. 仓库设置

1. 确保你的仓库名为 `