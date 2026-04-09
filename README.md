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
| **trmnl-paper-takumi** | 用 Takumi JSX / Tailwind 生成 800x480 黑白主视觉图像，并包一层最小 TRMNL markup |
| **trmnl-paper-screen** | 通过设备凭据将 markup 推送到 LaraPaper |

支持两条生成路线：

- **结构化路线**：`trmnl-paper-blade`，适合 KPI 看板、列表、表格、图表、进度条、富文本等组件化屏幕
- **image-first 路线**：`trmnl-paper-takumi`，适合海报式单屏、像素风主视觉、黑白工业风、截图式或插画式布局

## 本地脚本快速上手

下面这些命令面向**已 clone 本仓库**、需要本地验证或直接运行脚本的场景。

### 路线 A：结构化屏幕（Blade）

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

通常把它保存为 `./screen.markup`，然后进入下方“共享后续步骤”。

### 路线 B：image-first 屏幕（Takumi）

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
```

> `trmnl-paper-takumi` 只在 scene 声明 `googleFonts` 或显式传 `--google-font` 时，才远程加载 Google Fonts。

> `trmnl-paper-takumi` 默认按电子墨水屏友好的黑白 / 高对比 / 排版驱动风格出图；具体规则见 `skills/trmnl-paper-takumi/references/design-rules.md`。

### 共享后续步骤

#### 1. 校验 markup

```bash
python3 skills/trmnl-paper-blade/scripts/validate_markup.py <markup-file>
```

其中 `<markup-file>` 可以是 `./screen.markup`、`./clock.markup` 或任何已生成的 markup 文件。

#### 2. 推送到设备

```bash
# 先 dry-run 预览请求（默认行为）
python3 skills/trmnl-paper-screen/scripts/push_screen.py \
  --base-url https://your-larapaper.example.com \
  --mac-address AA:BB:CC:DD:EE:FF \
  --api-key YOUR_DEVICE_API_KEY \
  --markup-file <markup-file>

# 确认无误后，加 --send 实际推送
python3 skills/trmnl-paper-screen/scripts/push_screen.py \
  --base-url https://your-larapaper.example.com \
  --mac-address AA:BB:CC:DD:EE:FF \
  --api-key YOUR_DEVICE_API_KEY \
  --markup-file <markup-file> \
  --send
```

推送后可追加 `--current-screen` 查看渲染结果，或 `--download-image output.png` 下载渲染图。

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
│   ├── references/               # Takumi 能力、工作流、wrapper 规则、电子墨水屏设计规则
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

完整组件列表、路由规则与参考资料，见 `skills/trmnl-paper-blade/SKILL.md` 与 `skills/trmnl-paper-blade/references/`。

## 上游项目

- [TRMNL](https://usetrmnl.com/) — e-paper 设备
- [TRMNL Framework v3](https://trmnl.com/framework/docs/v3) — 前端框架文档
- [trmnl-blade](https://github.com/bnussbau/trmnl-blade) — Laravel Blade 组件包
- [LaraPaper](https://github.com/usetrmnl/larapaper) — 自托管服务端
- [TRMNL Firmware](https://github.com/usetrmnl/trmnl-firmware) — 设备固件

## 致谢

- [dominikmartn/nothing-design-skill](https://github.com/dominikmartn/nothing-design-skill) — `trmnl-paper-takumi` 的电子墨水屏设计约束吸收了其 `references/` 中关于排版层级、等宽标签、分段进度条、dot-grid 纹理等表达方式，感谢原作者的公开分享。

## License

[MIT](LICENSE)
