# Framework v3 设计约束

本文件是 `screen` / `mashup` / `view` / `layout` / `title-bar` 结构层级与 e-paper 约束的权威说明；其他文档只保留最小必要提示，不重复定义同一套规则。

## 结构层级（不可违反）

固定层级：**Screen → (Mashup →) View → Layout (+ 可选 Title Bar)**

- 每个 View 内恰好有 **一个** Layout。
- Title Bar 是 Layout 的**兄弟**，不是子节点。
- **绝对不要**嵌套 Layout；内部组织必须改用 `columns`、`grid`、`flex`。
- 非 `full` 的 View 必须包在 Mashup 里。
- TRMNL 平台自动提供 Screen/Mashup/View；插件只需写 Layout + 可选 Title Bar。BYOS 需自行提供完整层级。

```
✅ 正确                        ❌ 错误
screen                         screen
  view(full)                     view(full)
    layout                         layout
      columns / flex / grid          layout    ← 嵌套 layout
    title-bar                        title-bar ← 在 layout 内
```

## 组件选择优先级

1. **第一优先：高阶 Components** — `richtext`、`item`、`table`、`chart`、`progress`
2. **第二优先：语义组合** — `columns`、`value` + `label`、`title` + `description`
3. **第三优先：布局原语与工具类** — `flex`、`grid`、`progress-dots`、`bg--*`、`text--*` 等
4. **最后**：自定义 CSS/HTML — 仅框架组件无法满足时才动手

不要先写自由 HTML，先想：**能不能直接落进 Rich Text / Item / Table / Chart / Progress 之一**。

### 当前 Blade 组件清单

`screen`、`mashup`、`view`、`layout`、`title-bar`、`columns`、`column`、`flex`、`grid`、`col`、`richtext`、`content`、`text`、`item`、`table`、`label`、`title`、`value`、`description`、`divider`、`meta`、`progress`（progress-bar 封装）、`track`、`clamp`、`background`、`aspect`

### 重要使用说明

| 组件 / 能力 | 说明 |
|---|---|
| `richtext` | 富文本容器（富段落、引言、通知），`markdown` 已 **deprecated**，统一改用 `richtext` |
| `table` | 输出 `<table class="table ...">` 元素，slot 内只放 `<thead>` / `<tbody>`，**不要嵌套 `<table>`** |
| `progress` | 仅封装 progress-bar 结构；**progress-dots 无 Blade 封装**，使用原生 `div.progress-dots` class |
| `background` | 薄封装，输出 `bg-{color}` class；v3 token（`bg--gray-N`、`bg--primary`）推荐**直接写原生 class** |
| `chart` | **无 Blade 组件封装**，使用 Highcharts / Chartkick JS；禁动画，灰度用 pattern，显式指定高度 |
| `image` | **无专用 Blade 组件**，使用框架原生 class：`image-dither`、`image-stroke` |
| `title-bar` | `image='inline'` 时用 slot 传图；`title-bar` 始终是 `layout` 兄弟，不是子节点 |

## e-paper 核心思维

- **Adaptive in Context**：框架自动适配 1-bit、2-bit、4-bit 位深及设备色板，不必硬编码设备条件。
- 优先信息层级、留白、对比；一屏聚焦一个主任务。
- 用 `data-pixel-perfect="true"` 确保文字在 e-paper 上锐利。
- 用灰度 token（`bg--gray-N`）代替纯灰色填充。

## v3 颜色系统约束

| 规则 | 说明 |
|---|---|
| 优先语义色 | 用 `primary/success/error/warning` 表达状态，而非硬编码色相 |
| 自动回退 | 灰度设备自动降级，色彩受限设备自动映射最近色，不需条件代码 |
| 废弃旧灰度 | `gray-1`~`gray-7` 已废弃，新代码使用 `gray-10`~`gray-75` |
| 暗色模式 | 灰度 token 自动反转，色度色亮度步进镜像，无需额外处理 |
| CSS 变量覆盖 | 可通过 `--color-primary` 等变量自定义语义色映射 |
| 不依赖颜色编码 | 仍需依靠灰度、形状、边框强度作为主要编码手段 |

## v3 核心行为

| 特性 | 说明 |
|---|---|
| 内容截断 | `title`/`label`/`description` **不自动截断**，必须显式加 `data-clamp="N"` |
| DOM 级截断引擎 | `data-clamp="N"` 基于单词 DOM 截断 + 省略号 |
| 表格限行引擎 | `data-table-limit="true"` 自动限高 + "and X more" |
| 列布局引擎 | `columns` Overflow 引擎接管列表排布，支持按组截断 |
| 分隔线 | `divider` 和 `divider--vertical` |
| 数值能力 | `data-value-format="true"` 格式化；`data-value-fit="true"` 自动缩放 |
| 圆角/比例/缩放 | `rounded--*`、`aspect--*`（Beta）、`scale--*`（Beta） |
| 可见性控制 | `hidden-1bit`、`hidden-2bit` 等按位深隐藏 |
| CSS 变量架构 | 内部从选择器规则改为 CSS custom properties，class name 不变 |
| High-density 支持 | Background/Border 支持 high-density 1bit/2bit 渲染 |
| 颜色系统 | 10 色相 × 14 步 + 语义色 + 14 步灰度 |

## Layout 内部组织

- **同类列表** → `columns`（自动分栏 + 溢出处理）
- **严格列对齐** → `grid`（固定列数 + span）
- **弹性行内** → `flex`（可独立也可放入 grid cell）
- **结构化数据** → `table`

## 内容溢出策略

| 场景 | 推荐做法 |
|---|---|
| Columns 超出 | `data-overflow-max-cols="N"` |
| Table 超出 | `data-table-limit="true"` |
| Richtext 超出 | `data-content-limiter="true"` |
| 文本超出 | `data-clamp="N"`（必须显式） |
| 数值太大 | `data-value-fit="true"` |

## Chart 规则

- 图表用 CDN JS（Highcharts / Chartkick），不用纯 CSS，无 Blade 封装
- 始终禁用动画：`animation: false`
- 1bit：多系列用灰度 pattern，单系列 `["black"]`
- v3：彩色设备可用 chromatic color patterns
- 显式指定高度

## 设备参数

用户明确给出设备信息时才设置 `screen` props，否则保持默认。

| Prop | 可选值 | 说明 |
|---|---|---|
| `deviceVariant` | `og` / `v2` | 800×480 / 1040×780 |
| `deviceOrientation` | `portrait` | 竖屏 |
| `colorDepth` | `1bit` / `2bit` / `4bit` | 位深 |

---

来源：[Framework v3 文档](https://trmnl.com/framework/docs/v3) · [trmnl-blade](https://github.com/bnussbau/trmnl-blade)
