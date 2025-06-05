# 部署指南

本项目已简化为**统一构建方式**，同时支持本地预览和 GitHub Pages 部署。

## 🚀 统一构建命令

无论是本地预览还是 GitHub Pages 部署，都使用同一个命令：

```bash
npm run build
```

这个命令会：
1. 运行 `next build` 生成静态文件
2. 自动运行 `node fix-paths.js` 修复路径
3. 在 `out` 目录生成适用于本地和 GitHub Pages 的文件

## 📁 本地预览

构建完成后，可以通过多种方式预览：

### 方法 1：使用 Python HTTP 服务器
```bash
npm run build
cd out
python -m http.server 8000
# 访问：http://localhost:8000
```

### 方法 2：使用 Live Server（VS Code）
1. 运行 `npm run build`
2. 右键点击 `out/index.html`
3. 选择 "Open with Live Server"

### 方法 3：使用任何静态文件服务器
```bash
npm run build
# 然后将 out 目录部署到任何静态文件服务器
```

## 🌐 GitHub Pages 部署

### 自动部署（推荐）

1. **仓库设置**：
   - 仓库名：`cangmushui.github.io`
   - 推送到 `main` 分支会自动触发部署

2. **GitHub Pages 设置**：
   - 进入仓库 Settings → Pages
   - Source 选择 "GitHub Actions"

3. **自动构建**：
   - 推送代码到 `main` 分支
   - GitHub Actions 自动运行 `npm run build`
   - 自动部署到 `https://cangmushui.github.io/cangmushui.github.io/`

### 手动部署

如果需要手动部署：

```bash
# 1. 构建项目
npm run build

# 2. 将 out 目录内容推送到 gh-pages 分支
cd out
git init
git add .
git commit -m "Deploy to GitHub Pages"
git remote add origin https://github.com/cangmushui/cangmushui.github.io.git
git push -f origin main:gh-pages
```

## 🔧 技术细节

### 路径配置

项目使用**相对路径**配置，确保在两种环境下都能正常工作：

- **本地预览**：`http://localhost:8000/_next/static/css/xxx.css`
- **GitHub Pages**：`https://cangmushui.github.io/cangmushui.github.io/_next/static/css/xxx.css`

### fix-paths.js 脚本

这个脚本会自动：
- 修复 HTML 文件中的资源路径
- 确保图片、CSS、JS 文件正确引用
- 支持相对路径访问

### Next.js 配置

`next.config.ts` 简化配置：
```typescript
const nextConfig: NextConfig = {
  output: isProduction ? 'export' : undefined,
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: { unoptimized: true },
  basePath: '',        // 统一使用相对路径
  assetPrefix: '',     // 统一使用相对路径
};
```

## 📋 常用命令

```bash
# 开发模式
npm run dev

# 构建（适用于本地 + GitHub Pages）
npm run build

# 代码检查
npm run lint
```

## ✅ 优势

1. **简化工作流**：只需记住一个构建命令
2. **统一性**：一次构建，多处可用
3. **减少错误**：避免使用错误的构建版本
4. **易维护**：配置更简单，问题更少

## 🔍 故障排除

### CSS 样式未加载

如果遇到样式问题：
1. 确保运行了 `npm run build`（包含路径修复）
2. 检查浏览器开发者工具的网络标签
3. 确认 CSS 文件路径正确

### 本地预览问题

如果本地预览有问题：
1. 不要直接打开 HTML 文件（file://）
2. 必须通过 HTTP 服务器访问
3. 推荐使用 `python -m http.server` 或 Live Server

### GitHub Pages 部署问题

如果 GitHub Pages 无法访问：
1. 检查仓库名是否为 `cangmushui.github.io`
2. 确认 GitHub Actions 是否成功运行
3. 访问 `https://cangmushui.github.io/cangmushui.github.io/`（注意路径）

## 📝 注意事项

- 构建后的 `out` 目录可以直接部署到任何静态文件托管服务
- GitHub Pages 的访问路径是 `https://cangmushui.github.io/cangmushui.github.io/`
- 本地预览时务必使用 HTTP 服务器，不要直接打开 HTML 文件

# 提交并推送源代码
npm run push:source

# 或者手动操作
git add .
git commit -m "你的提交信息"
git push origin main