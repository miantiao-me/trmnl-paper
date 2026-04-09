# 常用命令示例

## 示例 1：完全自包含的像素图案

```bash
cd skills/trmnl-paper-takumi
npm install
npm run render -- --scene assets/templates/pixel-matrix.tsx
```

## 示例 2：本地 sprite 放大为 pixelated 主视觉

```bash
cd skills/trmnl-paper-takumi
npm run render -- \
  --scene assets/templates/pixel-image.tsx \
  --props '{"imageKey":"hero","title":"PIXEL WEATHER","subtitle":"forecast 09:00"}' \
  --image hero=./sprite.png
```

## 示例 3：中文与符号字体

```bash
cd skills/trmnl-paper-takumi
npm run render -- --scene assets/templates/google-font-showcase.tsx
```

## 示例 4：命令行临时追加 Google Fonts

```bash
cd skills/trmnl-paper-takumi
npm run render -- \
  --scene assets/templates/retro-dashboard.tsx \
  --props '{"title":"生产环境 ✓","uptime":"7天 3小时"}' \
  --google-font "Noto Sans SC:wght@400;700" \
  --google-font "Noto Sans Symbols 2"
```

## 示例 5：生成 wrapper markup

```bash
python3 scripts/wrap_image_markup.py \
  --url https://example.com/pixel-weather.webp \
  --fit contain \
  --out dist/pixel-weather.markup
```

说明：默认优先启用 `image-dither`。

## 示例 6：确认不需要抖动时关闭

```bash
python3 scripts/wrap_image_markup.py \
  --url https://example.com/pixel-weather.webp \
  --no-dither \
  --out dist/pixel-weather-clean.markup
```

## 示例 7：校验后进入推送脚本

```bash
python3 ../trmnl-paper-blade/scripts/validate_markup.py dist/pixel-weather.markup

python3 ../trmnl-paper-screen/scripts/push_screen.py \
  --base-url https://larapaper.example.com \
  --mac-address AA:BB:CC:DD:EE:FF \
  --api-key test-key \
  --markup-file dist/pixel-weather.markup
```
