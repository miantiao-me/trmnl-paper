# Takumi 基础约束

## 适用场景

这个 skill 走的是 **image-first** 路线：先把 scene 渲染成一张图，再包进 TRMNL。

适合：

- 像素风主视觉
- 海报式单屏
- 一张图占主要版面
- 截图式或插画式布局

不适合：

- 以 `item` / `table` / `richtext` / `progress` 为主的结构化屏幕

> 视觉风格细则读 `design-rules.md`：默认按电子墨水屏友好的黑白、高对比、排版驱动路线出图，不把 Takumi 当普通彩色 UI 截图工具。

## 上游官方支持范围

`llms-full.txt` 明确说明，上游 Takumi 支持：

- 输入：JSX、原始 HTML、node tree
- 布局：Flexbox、CSS Grid、block、float、`calc()`、absolute、z-index
- 文本：WOFF / WOFF2、emoji、RTL、multi-span inline blocks
- 样式：复杂选择器、CSS variables、`@keyframes`、gradients、`box-shadow`、`filter`、`backdrop-filter`、`mix-blend-mode`、`transform`
- Tailwind：v4，含 arbitrary values
- SVG：inline 或 external SVG
- 输出：PNG / JPEG / WebP，动图 WebP / GIF / APNG，raw RGBA frames

当前 `trmnl-paper-takumi` 没有把这些能力全部封装成 CLI。

## 当前 skill 暴露的子集

当前 `render_scene.tsx` 主要封装：

- `fromJsx(...)`
- `Renderer.render(...)`
- `Renderer.putPersistentImage(...)`
- `Renderer.loadFonts(...)`

未直接封装但上游官方支持：

- `measure()`
- `renderAnimation()`
- `encodeFrames()`
- 原始 HTML 输入
- `ImageResponse` 路线
- `resourcesOptions.cache`
- `emoji` 选项与 `extractEmojis()` 路线

## 画布与布局

- 默认尺寸：`800x480`
- 根节点始终显式声明宽高
- 优先使用整数尺寸、整数间距
- Takumi v1 默认 `display: inline`；容器布局要显式写 `flex` / `grid` / `block`
- 默认优先白底黑字，灰阶只保留极少量辅助层

示例：

```tsx
<div tw="flex items-center justify-center" />
```

## 字体

Takumi Node 原生运行时默认嵌入：

- `Geist`
- `Geist Mono`

因此纯英文、纯默认字体场景不需要额外加载字体。

### Google Fonts 动态加载

当前 skill 支持两条入口：

- CLI：`--google-font`
- scene：`export const googleFonts = [...]`

示例：

```bash
npm run render -- \
  --scene assets/templates/google-font-showcase.tsx \
  --google-font "Noto Sans SC:wght@400;700" \
  --google-font "Noto Sans Symbols 2"
```

```tsx
export const googleFonts = ["Noto Sans SC:wght@400;700", "Noto Sans Symbols 2"]
```

默认行为：

1. 只有声明了 `googleFonts` / `--google-font` 时，才会远程加载 Google Fonts
2. 自动遍历 scene 的 text node
3. 自动提取字符并去重
4. 作为 `text=` 传给 Google Fonts CSS2 API
5. 只下载当前 scene 真正需要的字形子集

需要额外补字时：

- CLI：`--google-font-text "中文✓☀→"`
- scene：`export const googleFontText = "中文✓☀→"`

> 这是当前 skill 的实现策略；Takumi 官方文档只要求“显式加载字体”，并未提供 Google Fonts 专用 API。

推荐字体栈：

- monospace：`'IBM Plex Mono', 'Geist Mono', monospace`
- sans：`'Noto Sans SC', 'Noto Sans Symbols 2', 'Geist', sans-serif`

如果想吸收更强的 Nothing 风格，但仍保持电子墨水屏友好，可参考：

- display（纯英文 / 数字 hero）：`'Doto', 'Space Mono', monospace`
- body / heading：`'Space Grotesk', 'Noto Sans SC', 'Geist', sans-serif`
- labels / data：`'Space Mono', 'IBM Plex Mono', 'Geist Mono', monospace`

约束：

- `Doto` 只建议用于 36px 以上的大号数字、时间或短标题，不用于正文
- 标签、单位、坐标轴更适合 mono + ALL CAPS + 稍大字距
- 中文优先保证可读性；不要为了风格牺牲字形完整性

上游性能建议还提到：**TTF 比 WOFF2 更快**。当前 skill 选择 Google Fonts + WOFF2，是便捷与按需远程加载优先，不是性能最优解。

## 图片

### 外部 URL

Takumi 可以直接抓取外部图片 URL。

### 本地图片

优先使用 persistent image：

```bash
npm run render -- \
  --scene assets/templates/pixel-image.tsx \
  --props '{"imageKey":"hero"}' \
  --image hero=./sprite.png
```

scene 内：

```tsx
<img src="hero" style={{ imageRendering: "pixelated" }} />
```

上游官方还支持：

- 外部 `src` 自动抓取
- `background-image` / `mask-image` 自动抓取
- `persistent image key` 在 `src` / `background-image` / `mask-image` 中复用

当前 skill 没有暴露 `resourcesOptions.cache`。

## 输出

- 默认：`webp`
- 备选：`png`
- `jpeg` 仅在用户明确要求时再用

> 上游官方还支持动画输出（`webp` / `gif` / `apng`）与 `raw` 帧；当前 skill CLI 先不封装。

## 运行时包选择

Takumi 官方文档的统一入口名是 `takumi-js@1`。

当前 skill 为了直接控制 Node 本地渲染，直接使用：

- `@takumi-rs/core`
- `@takumi-rs/helpers/jsx`

这属于实现选型，不代表上游只有这两种包名。
