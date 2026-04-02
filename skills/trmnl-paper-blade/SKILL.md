---
name: trmnl-paper-blade
description: >
  Use when the user wants to build, edit, or redesign screens for TRMNL e-paper
  devices. Handles dashboards, KPI displays, item lists, data tables, quotes,
  rich text, charts, and any screen layout — converting content briefs, data
  descriptions, or plain HTML into `<x-trmnl::...>` Blade component markup.
  Also use when they mention "trmnl-blade", "TRMNL Framework", "e-paper screen",
  or describe content for an e-ink display, even without naming TRMNL directly.
---

# trmnl-paper-blade

## 概览

为 Laravel + `trmnl-blade` 生成可直接渲染的 Blade 组件 markup。优先复用 `x-trmnl::` 组件和 Framework v3 的布局语义，避免自由拼接 CSS/HTML。

**两个事实来源**：
1. **Framework v3 规则**：结构层级、颜色系统、Overflow/Clamp/Content Limiter/Pixel Perfect 等运行时机制
2. **trmnl-blade 实际封装范围**：当前已有 Blade 组件（见下文），未封装的能力用原生 class

## 当前 Blade 组件

`screen`、`mashup`、`view`、`layout`、`title-bar`、`columns`、`column`、`flex`、`grid`、`col`、`richtext`、`content`、`text`、`item`、`table`、`label`、`title`、`value`、`description`、`divider`、`meta`、`progress`（progress-bar 封装）、`track`、`clamp`、`background`、`aspect`

**未封装为 Blade 组件**：chart（Highcharts/Chartkick JS）、image（原生 class）、progress-dots（原生 class）

## 工作流

1. 先确认目标：
   - 新建一个 TRMNL 屏幕
   - 把现有 HTML / 草图 / 数据说明改写成 TRMNL Blade
   - 只要骨架，还是要完整屏幕
2. 再收集最小输入：
   - 屏幕主题与核心数据
   - 是否需要标题栏
   - 是否需要双栏、列表、表格、图表、进度条、KPI、大字值、富文本
   - 是否有设备、方向、位深等限制
3. 选择组件路径（**优先使用高阶组件 / Components**）：
    - 第一优先：**Rich Text / Item / Table / Chart / Progress**。当内容能落进这些现成模式时，不要先拆成零散 `div`、`grid`、`flex`
    - 文案、引言、通知、段落：`richtext`（支持多级对齐、尺寸变体、Content Limiter）；**`markdown` 已废弃，改用 `richtext`**
    - 列表、日程、事件：`item`（支持 meta/index/icon/emphasis）
    - 结构化数据：简单表格可用 `table`（slot 内放 `<thead>` / `<tbody>`，不要嵌套 `<table>`）；需要 `data-table-limit`、`table--indexed` 等附加属性时优先改用原生 `<table class="table ...">`
    - 数据可视化：Highcharts / Chartkick JS 原生用法（禁动画，灰度图案），无 Blade 组件封装
    - 进度条：`<x-trmnl::progress>` 封装 progress-bar；progress-dots 用原生 `div.progress-dots` class
    - KPI、大数字：`value`（`xxsmall` ~ `peta` 尺寸 + `tnums`）+ `label`
    - 多区域 / 多列：`columns` / `mashup`；严格列对齐用 `grid` / `col` class
    - 颜色背景：v3 `bg--{token}` / `text--{token}` 优先**直接写原生 class**；`background` Blade 封装是薄层，不覆盖 v3 全部 token
4. 从基础骨架开始，再填充模块。
5. 默认只负责生成 markup；API 推送说明交给 `trmnl-paper-screen`。

## 默认骨架

```blade
<x-trmnl::screen>
    <x-trmnl::view>
        <x-trmnl::layout>
            <!-- content -->
        </x-trmnl::layout>
        <x-trmnl::title-bar title="..." />
    </x-trmnl::view>
</x-trmnl::screen>
```

- 无标题栏时可省略 `title-bar`
- 需要分栏时优先用 `columns` / `column`
- 需要居中堆叠时优先用 `layout direction="col" alignment="center"`

## 生成规则

- 优先使用 `x-trmnl::` 组件，不先写自由 class
- 当需求可直接映射到 Rich Text / Item / Table / Chart / Progress 时，先用这些高阶组件/模式，再考虑 `columns`、`grid`、`flex`
- 先保证结构清晰，再考虑细节
- 保持层级少、信息密度可读
- 避免硬编码像素值
- `title` / `label` / `description` 默认不自动 clamp；可能溢出时显式使用 `data-clamp="1"` 等属性截断
- 用户没有要求时，不要臆造未验证的 props
- props 不确定时，宁可使用默认 slot，也不要发明 API
- 输出完整屏幕时，优先给完整可渲染的 Blade 片段
- 输出局部模块时，说明它应插入 `layout` / `column` 的位置

## 输出前自检

### 自动可校验（运行 `validate_markup.py`）

- [ ] 已运行 `validate_markup.py` 校验结构层级与 `table` 使用规则（权威说明见 `references/design-rules.md`）

```bash
python3 skills/trmnl-paper-blade/scripts/validate_markup.py <markup-file>
```

### 仍需手工检查

- [ ] 优先使用已验证的 `<x-trmnl::...>` 组件；`chart` / `image` / `progress-dots` 用原生 class
- [ ] 可能溢出的 `title` / `label` / `description` 已显式加 `data-clamp`
- [ ] 如果只输出局部模块，已说明应插入 `layout`、`column` 或 `mashup` 的位置

## 参考资料

- 组件速查（props / CSS 映射 / 用法）：读 `references/components/` 目录下对应组件文件
- v3 特性与升级差异：读 `references/guides.md`
- 工具类与 data 属性（间距、尺寸、圆角、可见性等）：读 `references/attributes.md`
- 常用布局模板（可直接复制的完整示例）：读 `references/patterns.md`
- 官方示例索引：先读 `references/examples/_index.md`
- 官方示例（完整 HTML 源码参考）：读 `references/examples/` 目录下对应文件
- v3 颜色系统完整参考（灰度 / 色度 / 语义色）：读 `references/colors.md`
- v3 设计约束（结构层级权威说明 / e-paper 规则）：读 `references/design-rules.md`
- 上游文档：https://trmnl.com/framework/docs/v3
- Blade 源码：https://github.com/bnussbau/trmnl-blade

## 可用脚本

- **`scripts/validate_markup.py`** — 校验 Blade markup 结构规则（title-bar 位置、layout 嵌套、view 必须且只能有一个 layout、table 内嵌原生 table、忽略 HTML/Blade 注释）

## 输出约定

默认按以下顺序输出：

1. Blade markup
2. 如有必要，补 1-3 条简短接入说明

如果用户只要代码，只输出代码。

### 管道输出

当 markup 需要直接传递给 `trmnl-paper-screen` 推送时：

- 保存到文件 → `trmnl-paper-screen` 通过 `--markup-file <path>` 读取
- 通过管道 → `echo '<markup>' | python3 skills/trmnl-paper-screen/scripts/push_screen.py --markup-stdin ...`

### 交接格式

收到 `trmnl-paper-screen` 回传的问题清单时，每条问题使用以下最小字段格式：

```yaml
- issue: 文案在标题栏溢出
  location: x-trmnl::title-bar title 属性
  suggested_fix: 缩短标题文案，或加 data-clamp="1"
```

`issue` 描述问题现象，`location` 定位组件或属性，`suggested_fix` 给出最小修改方向。
