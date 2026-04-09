---
name: trmnl-paper-takumi
description: >
  Use when the user wants image-first TRMNL screens rendered with Takumi-style JSX
  and Tailwind instead of assembling everything with `x-trmnl::` components. Best
  for 800x480 poster-like screens, pixel art, screenshot-like compositions, hero
  illustrations, or layouts that should be rendered as one image and then wrapped
  in minimal TRMNL markup. Also use when they mention Takumi, JSX-to-image,
  Tailwind image rendering, pixelated artwork, or want a rendered WebP/PNG handed
  off to `trmnl-paper-screen`.
---

# trmnl-paper-takumi

## 概览

把 **TSX / JSX + Tailwind 风格布局** 渲染成 **800x480 图片**，再包一层最小 TRMNL markup。

默认路线：

1. 写或改一个 Takumi scene（`.tsx`）
2. 本地渲染成 `webp` / `png` / `jpeg`
3. 把图片放到 LaraPaper 可访问的 URL
4. 用 `wrap_image_markup.py` 生成最小 Blade markup
5. 必要时交给 `trmnl-paper-screen` 推送

## 何时使用

优先用这个 skill：

- 海报式单屏
- 像素风 / pixelated 主视觉
- 截图式、插画式、封面式布局
- 更适合“先渲染成图片，再包进 TRMNL” 的内容

改用 `trmnl-paper-blade`：

- KPI、列表、表格、rich text、item、table、progress 为主
- 需要直接复用 `<x-trmnl::...>` 组件
- 需要后续长期编辑局部模块，而不是替换整张图

## 当前 skill 边界

Takumi 上游官方能力比当前 skill 更多，例如原始 HTML、`measure()`、`renderAnimation()`、raw frames、`ImageResponse`、emoji 路线等。

当前 `trmnl-paper-takumi` 只封装最常用的子集：

- `.tsx` scene → 本地静态图
- persistent images（`--image key=path`）
- 可选 Google Fonts 动态加载
- 外部图片 URL → 最小 TRMNL wrapper

需要更完整的上游边界时，先读 `references/takumi-basics.md` 与 `references/api_reference.md`。

## 工作流

1. 判断是否适合 **image-first** 路线
2. 选择或新建 scene：优先从 `assets/templates/` 复制
3. 运行 `scripts/render_scene.tsx` 生成图片
4. 肉眼检查构图、灰度、留白、可读性
5. 把图片上传到可访问 URL
6. 运行 `scripts/wrap_image_markup.py` 生成最小 wrapper
7. 用 `trmnl-paper-blade/scripts/validate_markup.py` 校验结构
8. 需要推送时，交给 `trmnl-paper-screen`

## 生成规则

- 画布默认 `800x480`
- 根节点始终显式写宽高
- Takumi v1 默认 `display: inline`；需要容器布局时显式写 `display: "flex"` / `tw="flex"`
- 布局优先 `tw`；精确像素控制优先 `style`
- 像素图放大时显式写 `imageRendering: "pixelated"`
- 尽量用整数尺寸、整数间距
- 默认输出 `webp`
- 只有在 scene 导出 `googleFonts` 或显式传 `--google-font` 时，才远程加载 Google Fonts
- wrapper 只负责放一张图片，不要在这里重建复杂 TRMNL 结构

## 可用脚本

- `scripts/render_scene.tsx`：渲染 scene 到本地图片
- `scripts/wrap_image_markup.py`：生成最小 TRMNL wrapper

## 建议阅读顺序

1. `references/takumi-basics.md`：Takumi 能力边界、字体、图片、Google Fonts
2. `references/render-workflow.md`：从 scene 到 wrapper 的整条链路
3. `references/trmnl-wrapper.md`：最小 TRMNL 包装规则
4. `references/examples.md`：常用命令示例
5. `references/api_reference.md`：Node API 速查
