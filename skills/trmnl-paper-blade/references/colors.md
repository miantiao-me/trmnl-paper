# v3 颜色系统

本文件是 v3 颜色 token、语义色与设备回退策略的完整参考。若关注升级差异或迁移注意事项，请读 `references/guides.md`。

---

## 灰度色阶

14 步灰度，从 `gray-10`（最深）到 `gray-75`（最浅）。大部分相邻步进为 6.25% 白像素密度，但 `gray-40`（43.75%）与 `gray-45`（56.25%）之间有一个 12.5% 的 center spacer。

| Token | 1bit 白像素密度 | 说明 |
|---|---|---|
| `gray-10` | 6.25% | 最深灰 |
| `gray-15` | 12.5% | |
| `gray-20` | 18.75% | |
| `gray-25` | 25% | |
| `gray-30` | 31.25% | |
| `gray-35` | 37.5% | |
| `gray-40` | 43.75% | |
| `gray-45` | 56.25% | |
| `gray-50` | 62.5% | |
| `gray-55` | 68.75% | |
| `gray-60` | 75% | |
| `gray-65` | 81.25% | |
| `gray-70` | 87.5% | |
| `gray-75` | 93.75% | 最浅灰 |

> 旧版 `gray-1` ~ `gray-7` 仍可用但已**废弃**，新代码应使用 `gray-10` ~ `gray-75`。

- 1bit 模式：灰度使用 dither pattern（16×16 px 抖动）
- 2bit/4bit+ 模式：使用实色渲染

---

## 色度色（Chromatic Colors）

10 种色相，每种 14 级亮度步进（10 最深 ~ 75 最浅）。

**色相列表**：`red`、`orange`、`yellow`、`lime`、`green`、`cyan`、`blue`、`violet`、`purple`、`pink`

**用法**：
- 纯色相：`bg--red`、`text--blue`（使用基础全饱和色）
- 色相 + 步进：`bg--red-40`、`text--green-60`（亮度变体）

```html
<div class="bg--blue-30 p--3">
  <span class="text--white">深蓝背景白字</span>
</div>
```

---

## 语义颜色（Semantic Colors）

按意图而非具体色相来样式化，可通过 CSS 变量主题化。

| 语义 | 映射色相 | 用途 |
|---|---|---|
| `primary` | blue | 高亮、重点 |
| `success` | green | 确认、正向状态 |
| `error` | red | 错误、严重状态 |
| `warning` | orange | 警告、提醒 |

**用法**：`bg--primary`、`text--success`、`label--error`、`bg--warning`

**覆盖默认映射**：
```css
.screen {
  --color-primary: var(--violet);
  --color-success: var(--cyan);
}
```

---

## 背景工具类

`bg--{token}` 统一用法，支持灰度、色度、语义三种 token。

```html
<div class="bg--gray-30">灰度背景</div>
<div class="bg--red-40">色度背景</div>
<div class="bg--primary">语义背景</div>
<div class="bg--black">纯黑背景</div>
<div class="bg--white">纯白背景</div>
```

---

## 文字颜色

`text--{token}` 同样支持灰度、色度、语义 token。

```html
<span class="text--gray-40">灰色文字</span>
<span class="text--red">红色文字</span>
<span class="text--success">语义绿色文字</span>
```

---

## Label 颜色变体 (v3)

```html
<span class="label label--primary">Key Info</span>
<span class="label label--success">Passed</span>
<span class="label label--error">Failed</span>
<span class="label label--warning">Caution</span>
<span class="label label--filled">Default Black</span>
```

---

## 设备适配

- **灰度设备**：色度 token 自动回退为感知等效灰值（基于 LAB L*）
- **有限色彩设备**（如 B/W/R/Y）：不支持的色相自动映射到最近可用色
- **暗色模式**：灰度 token 自动反转；色度色亮度步进镜像
- 无需编写条件逻辑，框架通过 CSS 变量自动处理

---

来源：[Framework v3 文档](https://trmnl.com/framework/docs/v3)
