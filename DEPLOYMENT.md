# 部署文档（Vercel / Netlify）

## Vercel
- 连接仓库后，一键导入
- Framework 选择 Vite，Build Command：`npm run build`，Output Directory：`dist`
- 环境变量：无
- 缓存策略：
  - 在 `dist/_headers` 中配置（见下）

## Netlify
- 一键导入仓库
- Build command：`npm run build`，Publish directory：`dist`
- 添加 `_headers` 文件至 `dist`：

```
/* 
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://giscus.app; connect-src 'self' https://giscus.app https://*.giscus.app; img-src * data:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; frame-src https://giscus.app
```

```
/assets/images/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: no-cache
```

## 注意事项
- 所有外链需 `rel="noopener noreferrer"`
- Service Worker 会缓存核心资源与图片，首次加载后可离线访问
- 如需自托管字体，请将 woff2 文件置于 `/src/assets/fonts/` 并更新 `<link rel="preload">`
