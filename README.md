# trmnl-paper

AI Agent Skills，让 AI 为 [TRMNL](https://usetrmnl.com/) 电子墨水屏生成界面并推送到设备。

基于 [TRMNL Framework v3](https://trmnl.com/framework/docs/v3) 与 [trmnl-blade](https://github.com/bnussbau/trmnl-blade) 构建，推送到自托管 [LaraPaper](https://github.com/usetrmnl/larapaper) 实例。

## 安装

如果你是把这组 skill 安装到支持 skills 的客户端，直接运行：

```bash
npx skills add miantiao-me/trmnl-paper
```

安装后可直接使用：`trmnl-paper-blade`、`trmnl-paper-takumi`、`trmnl-paper-screen`。

## 三个 Skill

| Skill | 用途 |
|---|---|
| **trmnl-paper-blade** | 将内容简报、草图或 HTML 转换为 `<x-trmnl::...>` Blade 组件 markup |
| **trmnl-paper-takumi** | 用 Takumi JSX / Tailwind 生成 800x480 图像，并包一层最小 TRMNL markup |
| **trmnl-paper-screen** | 通过设备凭据将 markup 推送到 LaraPaper |

支持两条生成路线：

- **结构化路线**：`trmnl-paper-blade`，适合 KPI 看板、列表、表格、图表、进度条、富文本等组件化屏幕
- **image-first 路线**：`trmnl-paper-takumi`，适合海报式单屏、像素风主视觉、截图式或插画式布局

## 本地脚本快速上手

下面这些命令面向**已 clone 本仓库**、需要本地验证或直接运行脚本的场景。

### 1A. 生成结构化 Blade markup

告诉 AI 你想要的屏幕内容，它会基于 `trmnl-paper-blade` 生成结构化 markup：

```blade
<x-trmnl::screen>
    <x-trmnl::view>
        <x-trmnl::layout>
            <!-- 你的内容 -->
        </x-trmnl::layout>
        <x-trmnl::title-bar title="标题" />
    </x-trmnl::view>
</x-trmnl::screen>
```

### 2. 校验 markup

```bash
python3 skills/trmnl-paper-blade/scripts/validate_markup.py screen.blade.markup
```

### 3. 推送到设备

```bash
# 先 dry-run 预览请求（默认行为）
python3 skills/trmnl-paper-screen/scripts/push_screen.py \
  --base-url https://your-larapaper.example.com \
  --mac-address AA:BB:CC:DD:EE:FF \
  --api-key YOUR_DEVICE_API_KEY \
  --markup-file ./screen.blade.markup

# 确认无误后，加 --send 实际推送
python3 skills/trmnl-paper-screen/scripts/push_screen.py \
  --base-url https://your-larapaper.example.com \
  --mac-address AA:BB:CC:DD:EE:FF \
  --api-key YOUR_DEVICE_API_KEY \
  --markup-file ./screen.blade.markup \
  --send
```

推送后可追加 `--current-screen` 查看渲染结果，或 `--download-image output.png` 下载渲染图。

### 1B. 走 image-first 路线（Takumi）

如果屏幕更像一张海报或主视觉图，可以先用 Takumi 生成图，再包一层最小 markup：

```bash
cd skills/trmnl-paper-takumi
npm install

# 渲染 800x480 图片
npm run render -- --scene assets/templates/clock.tsx

# 生成最小 wrapper markup
python3 scripts/wrap_image_markup.py \
  --url https://example.com/clock.webp \
  --title "Takumi Demo" \
  --out ./clock.markup

# 校验结构
python3 ../trmnl-paper-blade/scripts/validate_markup.py ./clock.markup
```

> `trmnl-paper-takumi` 只在 scene 声明 `googleFonts` 或显式传 `--google-font` 时，才远程加载 Google Fonts。

## 本地运行前提

- 一个可访问的 [LaraPaper](https://github.com/usetrmnl/larapaper) 实例，且已安装 [trmnl-blade](https://github.com/bnussbau/trmnl-blade)
- 设备的 MAC 地址与 Device API Key（不是 APP_KEY）
- Python 3（脚本仅使用标准库，无需 pip install）
- 如果使用 `trmnl-paper-takumi`：需要 Node.js（依赖只安装在 `skills/trmnl-paper-takumi` 内）

## 目录结构

```text
skills/
├── trmnl-paper-blade/
│   ├── SKILL.md                  # Skill 说明
│   ├── references/
│   │   ├── components/           # 各组件文档（layout, item, table, ...）
│   │   ├── examples/             # 官方完整屏幕示例
│   │   ├── design-rules.md       # 结构层级与 e-paper 约束
│   │   ├── patterns.md           # 常用布局模板
│   │   ├── attributes.md         # 工具类与 data 属性
│   │   └── colors.md             # 颜色系统
│   └── scripts/
│       └── validate_markup.py    # markup 结构校验
├── trmnl-paper-takumi/
│   ├── SKILL.md                  # image-first 路线说明
│   ├── assets/templates/         # Takumi scene 模板
│   ├── references/               # Takumi 能力、工作流、wrapper 规则、示例
│   └── scripts/
│       ├── render_scene.tsx      # 渲染 800x480 图像
│       └── wrap_image_markup.py  # 外部图片 URL → 最小 TRMNL wrapper
└── trmnl-paper-screen/
    ├── SKILL.md                  # Skill 说明
    ├── references/
    │   ├── api-screens.md        # API 文档
    │   └── review-checklist.md   # 推送后视觉审查标准
    └── scripts/
        └── push_screen.py        # 推送脚本
```

## 可用组件

`screen` · `view` · `layout` · `mashup` · `columns` · `column` · `grid` · `col` · `flex` · `title-bar` · `item` · `table` · `richtext` · `content` · `text` · `value` · `label` · `title` · `description` · `divider` · `meta` · `progress` · `track` · `clamp` · `background` · `aspect`

未封装为 Blade 组件的功能使用原生 CSS class：chart（Highcharts）、image、progress-dots。

## 上游项目

- [TRMNL](https://usetrmnl.com/) — e-paper 设备
- [TRMNL Framework v3](https://trmnl.com/framework/docs/v3) — 前端框架文档
- [trmnl-blade](https://github.com/bnussbau/trmnl-blade) — Laravel Blade 组件包
- [LaraPaper](https://github.com/usetrmnl/larapaper) — 自托管服务端
- [TRMNL Firmware](https://github.com/usetrmnl/trmnl-firmware) — 设备固件

## License

[MIT](LICENSE)
