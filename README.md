# LBMA GOLD — 前端 1:1 反编译还原

[goldslbma.com](https://goldslbma.com) 前端像素级重建。

## 技术栈

- React 19 + Vite 8
- 路由：react-router-dom v7
- 样式：original.css (387KB，MD5 逐字节匹配原站)
- MUI v5 DOM 结构（无运行时依赖，CSS类名+内联样式）

## 快速启动

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # dist/
```

## 项目结构

```
src/
├── api/           # API 调用（支持 mock 开发模式）
├── components/    # Layout（带导航）、InnerLayout（无导航）
├── pages/         # 34 个页面组件
├── styles/        # original.css（原站静态CSS）+ mui-runtime.css
└── i18n/          # 多语言
public/
├── images/        # 62 张图片
└── static/css/    # main.51c4594e.css（构建时逐字节一致）
```

## 构建产物

| 文件 | 大小 | 说明 |
|------|------|------|
| `dist/static/css/main.51c4594e.css` | 387KB | MD5 逐字节匹配原站 |
| `dist/assets/index-*.js` | 419KB | React 应用 |
| `dist/index.html` | 1KB | HTML 入口 |

## API Mock

在 `src/api/index.js` 中设置 `USE_MOCK = true` 可跳过 API 签名验证，使用本地模拟数据。

## 页面对照

| 有底部导航 | 无底部导航（返回按钮） |
|-----------|---------------------|
| /home, /packages, /record, /my, /shop | 其他所有页面 |
