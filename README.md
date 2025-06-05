# 个人学术主页 - Tongyuan Bai

一个基于 Next.js 的响应式个人学术主页，支持双仓库管理和自动部署。

## 🎯 项目特性

- ✨ 现代化响应式设计
- 🌙 深色/浅色主题支持
- 📱 移动端完美适配
- 🎨 动态背景和头像过渡效果
- 📚 学术论文展示
- 📰 最新动态管理
- 🚀 双仓库自动部署

## 🏗️ 项目架构

本项目采用**双仓库管理**模式：

- **源码仓库** (`HomePage`): 存放 Next.js 源代码
- **部署仓库** (`cangmushui.github.io`): 存放构建后的静态文件

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/cangmushui/HomePage.git
cd HomePage
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

## 📦 双仓库配置流程

### 第一次设置（仅需执行一次）

#### 1. 初始化 Git 仓库

```bash
# 如果还没有git仓库，初始化一个
git init

# 添加所有文件
git add .

# 首次提交
git commit -m "Initial commit: Next.js academic homepage"
```

#### 2. 配置双远程仓库

```bash
# 添加源码仓库（存放Next.js项目）
git remote add origin https://github.com/cangmushui/HomePage.git

# 添加部署仓库（存放构建产物）  
git remote add pages https://github.com/cangmushui/cangmushui.github.io.git

# 验证远程仓库配置
git remote -v
```

应该看到类似输出：

```
origin  https://github.com/cangmushui/HomePage.git (fetch)
origin  https://github.com/cangmushui/HomePage.git (push)
pages   https://github.com/cangmushui/cangmushui.github.io.git (fetch)
pages   https://github.com/cangmushui/cangmushui.github.io.git (push)
```

#### 3. 推送源码到源码仓库

```bash
# 推送到源码仓库
git push -u origin main
```

## 🔄 日常开发工作流

### 开发阶段

```bash
# 启动开发服务器
npm run dev

# 修改代码...
# 测试功能...
```

### 提交源代码

```bash
# 方法1: 使用npm脚本（推荐）
npm run push:source

# 方法2: 手动操作
git add .
git commit -m "你的提交信息"
git push origin main
```

### 部署到 GitHub Pages

```bash
# 一键构建并部署（推荐）
npm run deploy:pages

# 等价的两个指令：
# npm run build && node deploy-pages.js
```

这个命令会：

1. 运行 `npm run build` 构建项目
2. 创建临时目录并复制构建产物
3. 在临时目录初始化新的git仓库
4. 提交并推送到 `cangmushui.github.io` 仓库
5. 清理临时文件

## 📋 可用脚本

| 脚本                         | 描述                                                                                   |
| ---------------------------- | -------------------------------------------------------------------------------------- |
| `npm run dev`              | 启动开发服务器                                                                         |
| `npm run build`            | 构建生产版本                                                                           |
| `npm run build:production` | 生产环境构建                                                                           |
| `npm run push:source`      | 提交并推送源代码                                                                       |
| `npm run deploy:pages`     | 构建并部署到GitHub Pages``*等价于: `npm run build && node deploy-pages.js`* |
| `npm run lint`             | 代码检查                                                                               |
| `npm run start`            | 启动生产服务器                                                                         |

## 🔧 项目配置

### 环境变量

项目支持以下环境变量：

- `NODE_ENV`: 环境模式 (`development` | `production`)
- `GITHUB_PAGES`: GitHub Pages部署标识

### Next.js 配置

关键配置在 `next.config.ts`：

```typescript
const nextConfig: NextConfig = {
  output: isProduction ? 'export' : undefined,  // 生产环境静态导出
  trailingSlash: true,                         // URL末尾斜杠
  skipTrailingSlashRedirect: true,             // 跳过斜杠重定向
  distDir: 'out',                              // 输出目录
  images: { unoptimized: true },               // 图片优化
  basePath: '',                                // 基础路径
  assetPrefix: '',                             // 资源前缀
};
```

## 📁 项目结构

```
cangmushui.github.io/
├── src/
│   ├── app/                 # Next.js 13+ App Router
│   ├── components/          # React 组件
│   │   ├── layout/         # 布局组件
│   │   ├── sections/       # 页面段落组件
│   │   └── ui/             # UI组件
│   └── data/               # 数据文件
│       ├── personal.json   # 个人信息
│       ├── publications.json # 论文数据
│       └── news.json       # 新闻数据
├── public/                 # 静态资源
├── out/                    # 构建输出目录
├── deploy-pages.js         # 部署脚本
├── fix-paths.js           # 路径修复脚本
└── package.json           # 项目配置
```

## 🎨 自定义配置

### 个人信息

编辑 `src/data/personal.json`:

```json
{
  "name": "Your Name",
  "position": "Your Position",
  "affiliation": "Your Institution",
  "bio": "Your biography...",
  "avatar": "/avatar.jpg",
  "email": "your.email@example.com",
  "social": {
    "googleScholar": "your-scholar-link",
    "github": "your-github-link",
    "linkedin": "your-linkedin-link"
  }
}
```

### 添加论文

编辑 `src/data/publications.json`:

```json
{
  "id": 1,
  "title": "Paper Title",
  "authors": ["Author 1", "Author 2"],
  "venue": "Conference/Journal Name",
  "year": "2024",
  "type": "conference",
  "abstract": "Paper abstract...",
  "links": {
    "paper": "paper-url",
    "project": "project-url",
    "code": "code-url"
  },
  "featured": true,
  "image": "/publications/paper-image.jpg"
}
```

## 🌐 部署说明

### GitHub Pages 设置

1. 在 `cangmushui.github.io` 仓库设置中：

   - 进入 Settings → Pages
   - Source 选择 "Deploy from a branch"
   - Branch 选择 "main"
   - 保存设置
2. 网站将在以下地址可访问：

   - https://cangmushui.github.io

### 自动部署流程

当你运行 `npm run deploy:pages` 时：

1. **构建阶段**：

   ```bash
   npm run build
   # 生成 out/ 目录
   ```
2. **部署准备**：

   ```bash
   # 创建临时目录
   mkdir temp-deploy
   # 复制构建产物
   xcopy out\* temp-deploy\ /E /I /Y
   ```
3. **Git 操作**：

   ```bash
   cd temp-deploy
   git init
   git branch -M main
   git remote add origin https://github.com/cangmushui/cangmushui.github.io.git
   git add .
   git commit -m "Deploy: 2024-01-01T00:00:00.000Z"
   git push -f origin main
   ```
4. **清理**：

   ```bash
   cd ..
   rm -rf temp-deploy
   ```

## 🔧 故障排除

### 常见问题

1. **构建失败**

   ```bash
   # 清理依赖重新安装
   rm -rf node_modules package-lock.json
   npm install
   ```
2. **部署失败**

   ```bash
   # 检查GitHub权限
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```
3. **文件被占用错误 (Windows)**

   ```bash
   # 停止所有Node进程
   taskkill /F /IM node.exe
   # 删除out目录
   rm -rf out
   ```
4. **路径问题**

   ```bash
   # 确保在正确目录
   cd D:\website\cangmushui.github.io
   # 重新构建
   npm run build
   ```

### 调试模式

启用详细日志：

```bash
# 开发模式详细日志
DEBUG=* npm run dev

# 构建详细日志  
npm run build -- --debug
```

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

- 邮箱: baity23@mails.jlu.edu.cn
- GitHub: [@cangmushui](https://github.com/cangmushui)
- 个人主页: [https://cangmushui.github.io](https://cangmushui.github.io)

---

⭐ 如果这个项目对你有帮助，请给个 Star！
