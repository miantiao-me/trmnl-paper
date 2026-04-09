# 渲染工作流

## 1. 判断是否该走图片路线

满足任一情况时，优先用本 skill：

- 画面本质是一张主视觉
- 更像海报、封面、插画，而不是组件拼装
- 用户明确提到 Takumi / JSX-to-image / pixelated

## 2. 选择 scene 起点

- 完全自包含：先从 `clock.tsx` / `pixel-matrix.tsx` 开始
- 需要本地 sprite：从 `pixel-image.tsx` 开始
- 需要文本 + 进度感画面：从 `retro-dashboard.tsx` 开始
- 需要验证中文 / 符号：从 `google-font-showcase.tsx` 开始

## 3. 本地渲染

```bash
cd skills/trmnl-paper-takumi
npm install
npm run render -- --scene assets/templates/clock.tsx
```

默认输出：`dist/<scene-name>.webp`

如果 scene 需要中文 / 符号字体，显式启用 Google Fonts：

```bash
npm run render -- --scene assets/templates/google-font-showcase.tsx
```

或：

```bash
npm run render -- \
  --scene my-scene.tsx \
  --google-font "Noto Sans SC:wght@400;700" \
  --google-font "Noto Sans Symbols 2"
```

Google Fonts 细节与字体策略，读 `takumi-basics.md`；电子墨水屏视觉约束，读 `design-rules.md`。

## 4. 肉眼检查

至少检查：

- 是否确实是 800x480
- 是否只有一个绝对主焦点
- 文字是否清晰
- 灰度层级是否过多，是否能进一步收敛到黑白
- 像素图是否需要 `imageRendering: "pixelated"`
- 留白、边距、对齐是否合理
- 元信息是否已经降权并推到边缘

## 5. 上传图片

`wrap_image_markup.py` 需要的是 **可访问 URL**，不是本地文件路径。

如果目标是通过 LaraPaper 推送到远端实例，先把 `webp/png` 上传到：

- 你自己的静态资源服务
- 对外可访问的对象存储
- LaraPaper / 应用自身可访问的静态路径

## 6. 生成最小 TRMNL wrapper

```bash
python3 scripts/wrap_image_markup.py \
  --url https://example.com/render.webp \
  --out dist/takumi-demo.markup
```

默认会优先加 `image-dither`，因为实机推送到 TRMNL / LaraPaper 时，灰阶条、细线和小字常在 1-bit 处理中丢失。

只有在以下条件同时满足时，才考虑关闭：

- 原图已经是纯黑白硬边块面
- `image-dither` 反而让边缘明显发脏
- 你已经做过一次实机 / 远端复查，确认 `--no-dither` 更好

关闭示例：

```bash
python3 scripts/wrap_image_markup.py \
  --url https://example.com/render.webp \
  --no-dither \
  --out dist/takumi-demo.markup
```

## 7. 校验 markup

```bash
python3 ../trmnl-paper-blade/scripts/validate_markup.py dist/takumi-demo.markup
```

## 8. 交给推送 skill

```bash
python3 ../trmnl-paper-screen/scripts/push_screen.py \
  --base-url https://larapaper.example.com \
  --mac-address AA:BB:CC:DD:EE:FF \
  --api-key test-key \
  --markup-file dist/takumi-demo.markup
```

默认先 dry-run；只有用户明确要求时才真正发送。
