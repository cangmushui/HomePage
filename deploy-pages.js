const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting GitHub Pages deployment...');

// 检查 out 目录是否存在
const outDir = path.join(__dirname, 'out');
if (!fs.existsSync(outDir)) {
  console.error('❌ Error: out directory not found. Please run "npm run build" first.');
  process.exit(1);
}

// 创建临时目录
const tempDir = path.join(__dirname, 'temp-deploy');
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true });
}
fs.mkdirSync(tempDir);

try {
  console.log('📁 Copying files from out/ to temp directory...');
  
  // 复制 out 目录内容到临时目录
  execSync(`xcopy "${outDir}\\*" "${tempDir}\\" /E /I /Y`, { stdio: 'inherit' });
  
  // 进入临时目录
  process.chdir(tempDir);
  
  console.log('🔧 Initializing git repository...');
  
  // 初始化 git 仓库
  execSync('git init', { stdio: 'inherit' });
  execSync('git branch -M main', { stdio: 'inherit' });
  
  // 添加远程仓库
  execSync('git remote add origin https://github.com/cangmushui/cangmushui.github.io.git', { stdio: 'inherit' });
  
  // 添加所有文件
  execSync('git add .', { stdio: 'inherit' });
  
  // 提交
  const commitMessage = `Deploy: ${new Date().toISOString()}`;
  execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
  
  console.log('📤 Pushing to GitHub Pages repository...');
  
  // 强制推送到 main 分支
  execSync('git push -f origin main', { stdio: 'inherit' });
  
  console.log('✅ Deployment successful!');
  console.log('🌐 Your site will be available at: https://cangmushui.github.io');
  
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
} finally {
  // 回到原目录
  process.chdir(__dirname);
  
  // 清理临时目录
  if (fs.existsSync(tempDir)) {
    console.log('🧹 Cleaning up temporary files...');
    fs.rmSync(tempDir, { recursive: true });
  }
} 