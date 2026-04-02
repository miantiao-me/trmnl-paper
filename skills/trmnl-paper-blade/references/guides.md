# Framework v3 使用指南

## v3 概述

Framework v3 引入完整颜色系统，支持色度色板、语义色、扩展灰度，并通过 CSS custom properties 自动适配不同设备。**现有 markup 向后兼容，无需改动即可继续使用。** 完整颜色 token 与用法见 `references/colors.md`。

### 核心升级

| 升级项 | 说明 |
|---|---|
| 颜色系统 | 10 色相 × 14 步色度色 + 语义色 + 14 步灰度 |
| CSS 变量架构 | 从规则选择器改为 CSS custom properties，类名不变 |
| High-density 渲染 | Background / Border 支持 1bit / 2bit 高密度模式 |
| 14 步灰度 | 1bit 可用灰度从 7 步扩展到 14 步（`gray-10` ~ `gray-75`） |
| 暗色模式 | 灰度 token 自动反转；色度色亮度步进镜像 |

---

## 颜色系统

v3 把颜色系统扩展为 **10 色相 × 14 步亮度 + 4 个语义色 + 14 步灰度**。完整 token、语义色映射、背景/文字/label 用法，以及设备回退策略，统一见 `references/colors.md`。

### 升级时只需要记住

- 旧 `gray-1` ~ `gray-7` 已废弃，新代码优先使用 `gray-10` ~ `gray-75`
- 语义色 `primary` / `success` / `error` / `warning` 优先于硬编码色相
- 灰度设备与有限色设备会自动回退，无需条件代码
- 暗色模式下灰度 token 自动反转，色度色亮度步进镜像

### v2 → v3 灰度差异

v3 的 1bit 灰度从 7 步扩展到 14 步，并重定义了大部分步进的视觉亮度。若旧稿依赖特定灰度外观，请按下表对照调整。

#### v2 → v3 灰度对照（1bit 模式）

| Class | v2 亮度 | v3 亮度 | 偏移 | v2 外观等效替换 |
|---|---|---|---|---|
| `gray-10` | 6.25% | 6.25% | — | — |
| `gray-15` | 6.25% | 12.5% | +6.25% | `gray-10` |
| `gray-20` | 12.5% | 18.75% | +6.25% | `gray-15` |
| `gray-25` | 12.5% | 25% | +12.5% | `gray-15` |
| `gray-30` | 25% | 31.25% | +6.25% | `gray-25` |
| `gray-35` | 25% | 37.5% | +12.5% | `gray-25` |
| `gray-40` | 50% | 43.75% | −6.25% | `gray-45` |
| `gray-45` | 50% | 56.25% | +6.25% | `gray-40` |
| `gray-50` | 75% | 62.5% | −12.5% | `gray-60` |
| `gray-55` | 75% | 68.75% | −6.25% | `gray-60` |
| `gray-60` | 87.5% | 75% | −12.5% | `gray-70` |
| `gray-65` | 87.5% | 81.25% | −6.25% | `gray-70` |
| `gray-70` | 93.75% | 87.5% | −6.25% | `gray-75` |
| `gray-75` | 93.75% | 93.75% | — | — |

---

## Framework Runtime

运行时自动完成以下步骤，确保内容适配设备固定空间：

| 步骤 | 说明 |
|---|---|
| **Clamp** | 按单词截断文字到 N 行，保留原始文本；宽度变化时重新计算 |
| **Overflow** | 将条目分配到 1..N 列；支持可选的"and X more"溢出计数器；处理分组标题不孤立 |
| **Value Formatting** | 数字千分位、缩写（K/M/B）、货币符号；尊重 `data-value-locale` |
| **Fit Value** | 自动缩小字号/行高/字重，确保数值在容器内显示；最小字号默认 8px |
| **Grid Gaps** | 调整 CSS gap，使网格列宽为整数像素；可用 `data-adjust-grid-gaps="false"` 禁用 |
| **Column Gaps** | 归一化 `.column` 元素间距，确保列宽为整数像素 |
| **Pixel Perfect** | 包装文字行并强制偶/奇像素宽，优化 1bit 渲染；高位深模式跳过 |
| **Content Limiter** | 按 View 类型限制内容高度；超出时添加 `content--small` class 并 Clamp |

### 关键 CSS 变量（1bit 默认）

| 变量 | 值 |
|---|---|
| `--screen-w` | 800px |
| `--screen-h` | 480px |
| `--full-w` | calc(screen-w − gap×2) |
| `--full-h` | calc(screen-h − gap×2) |
| `--half_vertical-w` | calc((screen-w − gap×2) / 2 − gap/2) |
| `--quadrant-w` | calc((screen-w − gap×2) / 2 − gap/2) |

---

## TRMNL X 新能力

TRMNL X 为更大的 4-bit 显示器。Framework 新增以下能力：

### `--base` 修饰符

所有排版元素新增 `--base` 修饰符，用于响应式上下文中重置为默认大小：

```html
<!-- 紧凑屏幕小标题，大屏幕恢复默认 -->
<span class="title title--small lg:title--base">Dashboard</span>

<!-- 默认超小数值，中等以上屏恢复默认 -->
<span class="value value--xsmall md:value--base">48,206</span>
```

可用于：title、value、label、description、content（richtext）、table、progress、gap、rounded、text-stroke、image-stroke。

### 更大字号

```html
<!-- Value 超大尺寸（TRMNL X 专用） -->
<span class="value value--mega">42</span>    <!-- 170px -->
<span class="value value--giga">42</span>    <!-- 220px -->
<span class="value value--tera">42</span>    <!-- 290px -->
<span class="value value--peta">42</span>    <!-- 380px -->

<!-- 响应式用法 -->
<span class="value value--xxxlarge lg:value--giga">42</span>

<!-- Title 大尺寸 -->
<span class="title title--large">Heading</span>     <!-- 30px -->
<span class="title title--xlarge">Heading</span>    <!-- 35px -->
<span class="title title--xxlarge">Heading</span>   <!-- 40px -->
```

Label / Description / Rich Text 同样新增 large / xlarge / xxlarge 变体。

### 容器查询单位

`layout` 建立 CSS Container Query context，支持相对于 layout 容器的尺寸类（在 mashup slot 内也能正确计算）：

```html
<div class="w--[50cqw]">半 layout 宽</div>
<div class="h--[80cqh]">80% layout 高</div>
<div class="w--min-[30cqw] w--max-[70cqw]">受约束的宽度</div>

<!-- 响应式 -->
<div class="w--[100cqw] lg:w--[50cqw]">小屏全宽，大屏半宽</div>
```

可用：`w--[Ncqw]`、`h--[Ncqh]`（0~100），以及 min/max 变体。

### 响应式 Overflow 列数

```html
<!-- 小屏 2 列，大屏 3 列 -->
<div class="columns"
     data-overflow-max-cols="2"
     data-overflow-max-cols-lg="3">
  ...
</div>

<!-- 竖屏不同列数 -->
<div class="columns"
     data-overflow-max-cols="3"
     data-overflow-max-cols-portrait="1"
     data-overflow-max-cols-lg-portrait="2">
  ...
</div>
```

支持后缀：`-sm`、`-md`、`-lg`、`-portrait`、`-sm-portrait`、`-md-portrait`、`-lg-portrait`。

### 其他布局改进

- `stretch-x` / `stretch-y` 现在相对于 `layout` 方向正确工作
- `grid col--span-*` 支持所有响应式前缀
- `item` 组件在 flex row 容器中自动拉伸匹配最高兄弟节点
- `gap--auto`（space-evenly）、`gap--distribute`（space-between）新增；`gap--space-between` 为旧别名

---

来源：[Framework v3 文档](https://trmnl.com/framework/docs/v3)
