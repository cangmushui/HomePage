const fs = require('fs');
const path = require('path');

function fixPaths(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // 修复CSS和JS路径：从 /_next 改为 _next
  content = content.replace(/href="\/_next/g, 'href="_next');
  content = content.replace(/src="\/_next/g, 'src="_next');
  
  // 修复其他资源路径
  content = content.replace(/href="\/(?!http)/g, 'href="');
  content = content.replace(/src="\/(?!http)/g, 'src="');
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed paths in: ${filePath}`);
}

// 修复out目录中的所有HTML文件
function fixAllHtmlFiles(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      fixAllHtmlFiles(fullPath);
    } else if (file.endsWith('.html')) {
      fixPaths(fullPath);
    }
  }
}

// 开始修复
const outDir = path.join(__dirname, 'out');
if (fs.existsSync(outDir)) {
  fixAllHtmlFiles(outDir);
  console.log('All HTML files have been fixed for local serving!');
} else {
  console.log('Out directory not found. Please run npm run build:local first.');
} 