# 重庆第二师范学院“班草”唐煜涵响应式单页应用

## 本地开发
- 前置条件：Node.js ≥ 18
- 安装依赖：
  
  ```bash
  npm install
  ```
- 启动开发服务器：
  
  ```bash
  npm run dev
  ```
- 预览构建产物：
  
  ```bash
  npm run build
  npm run preview
  ```

## 目录结构
- /src：源代码
  - index.html
  - css/styles.css
  - js/main.js、js/sw.js
  - assets/images（使用外链 WebP，Service Worker 首次加载后离线可用）
  - assets/fonts（自托管字体，建议加入 HarmonyOS Sans 与 Inter woff2）
- /dist：构建产物（哈希文件名 + gzip）
- /reports/lhci：Lighthouse 报告输出目录

## 技术点
- 语义化 HTML5 标签与微数据
- CSS 变量、Grid+Flex 布局、clamp 流式字体、prefers-reduced-motion 动画降级
- GPU 加速动画（transform/opacity），will-change 优化
- 原生 ES6 模块，防抖/节流优化滚动与输入
- 懒加载图片（lazySizes）、IntersectionObserver、Lightbox 支持手势缩放
- Web Share API + 降级二维码（qrcode）
- Service Worker 缓存策略：核心资源预缓存、图片缓存优先
- 安全：CSP、外链 rel="noopener noreferrer"、DOMPurify（如需本地输入过滤）
- 可访问性：alt、aria-*、键盘导航、对比度 ≥ 4.5:1

## 性能预算与门禁
- 首屏资源 ≤ 300 KB，TTI < 2s，LCP < 1.5s，CLS < 0.1
- Lighthouse CI 阈值（lighthouserc.json）：
  - Performance ≥ 90
  - Accessibility ≥ 95
  - Best Practices ≥ 95
  - SEO ≥ 95

## 浏览器支持
- Chrome ≥ 90、Safari ≥ 14、Edge ≥ 90、Firefox ≥ 88
- PostCSS Autoprefixer 自动补全前缀

## 构建与压缩
- Vite 默认哈希文件名
- vite-plugin-compression 输出 .gz

## 测试报告
- 使用 `npm run lhci` 生成报告（需本地安装 Chrome/Chromium）
- 将四项得分截图保存至 /reports/lhci/screenshots
- 跨浏览器通过清单可记录于 /reports/compat.md（BrowserStack 或实际设备）

## 部署（Vercel/Netlify）
- 参见 DEPLOYMENT.md

