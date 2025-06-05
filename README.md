# Tongyuan Bai - Academic Portfolio

这是 Tongyuan Bai 的个人学术网站，使用 Next.js 构建的静态网站。

## 🚀 快速开始

### 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看开发版本。

### 构建部署

```bash
# 构建静态网站（适用于本地预览和 GitHub Pages）
npm run build

# 本地预览构建结果
cd out
python -m http.server 8000
# 访问 http://localhost:8000
```

## 📁 项目结构

```
├── src/
│   ├── app/                 # Next.js App Router 页面
│   ├── components/          # React 组件
│   └── data/               # 数据文件
├── public/                 # 静态资源
├── .github/workflows/      # GitHub Actions 自动部署
├── fix-paths.js           # 路径修复脚本
├── next.config.ts         # Next.js 配置
└── DEPLOYMENT.md          # 详细部署指南
```

## 🔧 技术栈

- **框架**: Next.js 15 (App Router)
- **样式**: Tailwind CSS 4
- **语言**: TypeScript
- **部署**: GitHub Pages (自动部署)
- **构建**: 静态导出 (SSG)

## 📋 可用命令

```bash
# 开发
npm run dev          # 启动开发服务器

# 构建
npm run build        # 构建静态网站（本地 + GitHub Pages 通用）

# 其他
npm run lint         # 代码检查
npm start            # 启动生产服务器（仅用于测试）
```

## 🌐 部署

### 自动部署（推荐）

推送到 `main` 分支会自动触发 GitHub Actions 部署到 GitHub Pages：

- **仓库**: `cangmushui/cangmushui.github.io`
- **访问地址**: `https://cangmushui.github.io/cangmushui.github.io/`

### 手动部署

详见 [DEPLOYMENT.md](./DEPLOYMENT.md) 了解完整的部署指南。

## ✨ 特性

- 📱 响应式设计，支持桌面和移动设备
- 🌙 深色模式支持
- ⚡ 静态站点生成，加载速度快
- 🔄 自动部署到 GitHub Pages
- 📊 包含学术论文、教育背景、工作经历等信息
- 🎨 现代化 UI 设计

## 🛠️ 开发说明

### 统一构建方式

项目使用统一的构建命令 `npm run build`，同时适用于：
- 本地预览测试
- GitHub Pages 部署

### 路径处理

`fix-paths.js` 脚本自动将绝对路径转换为相对路径，确保在不同环境下都能正确加载资源。

### 自动化部署

GitHub Actions 工作流 (`.github/workflows/deploy.yml`) 自动处理构建和部署过程。

## 📝 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 👨‍💻 作者

**Tongyuan Bai**
- 📧 Email: baity23@mails.jlu.edu.cn
- 🎓 Ph.D. Student at Jilin University
- 🔬 Research: 3D Scene Generation, Diffusion Models, Large Language Models
