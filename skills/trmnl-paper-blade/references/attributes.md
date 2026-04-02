# 属性与修饰符参考

本文件是工具类与 `data-*` 属性的主参考；`utilities.md` 保留为兼容入口，不再重复维护同类内容。所有能力均为纯 CSS 或 `data-*` 属性，无 Blade 封装。

---

## 内容调节

### Clamp（文字截断）

截断文字到 N 行，基于单词 + 省略号，保留原始文本，宽度变化时自动重算。

```html
<!-- 截断到 2 行 -->
<span class="description" data-clamp="2">很长的描述文字...</span>

<!-- 响应式：默认 2 行，中等屏 4 行，竖屏 1 行 -->
<span class="description"
      data-clamp="2"
      data-clamp-md="4"
      data-clamp-portrait="1">描述文字</span>
```

支持响应式后缀：`data-clamp-sm`、`data-clamp-md`、`data-clamp-lg`、`data-clamp-portrait`、`data-clamp-sm-portrait`、`data-clamp-md-portrait`、`data-clamp-lg-portrait`。

旧版 class 写法仍可用（会自动映射）：`clamp--none`、`clamp--1` ~ `clamp--50`。

### Content Limiter（内容限高）

内容超出阈值时，自动添加 `content--small` class 并截断第一个溢出块。

```html
<div class="content" data-content-limiter="true">
  <p>内容段落...</p>
</div>

<!-- 自定义最大高度（像素） -->
<div class="content" data-content-limiter="true" data-content-max-height="140">
  <p>内容段落...</p>
</div>
```

### Pixel Perfect（像素对齐）

1bit 渲染优化，确保文字锐利。高位深模式自动跳过。

```html
<div data-pixel-perfect="true">...</div>
```

### Table Overflow（表格限行）

超出高度时自动截断行，末尾追加"and X more"。

```html
<table class="table" data-table-limit="true">
  ...
</table>
```

当前 `trmnl-blade` 的 `x-trmnl::table` 适合**简单表格骨架**。若需要 `data-table-limit="true"`、`table--indexed` 等附加属性/类，优先直接写原生 `<table class="table ...">`，避免属性丢失。

### Overflow（列溢出）

`columns` 容器使用 Overflow 引擎自动分列：

```html
<div class="columns" data-overflow-cols="2">...</div>
<div class="columns" data-overflow-max-cols="3">...</div>
<div class="columns" data-overflow-max-cols="2" data-overflow-max-cols-lg="3">...</div>
<!-- 显示溢出计数器 -->
<div class="columns" data-overflow-max-cols="2" data-overflow-counter="true">...</div>
```

---

## 数值处理

### Fit Value（自动缩放）

```html
<!-- 单行自动缩放 -->
<span class="value value--xxxlarge" data-value-fit="true">$1,000,000</span>

<!-- 多行，限制最大高度 -->
<span class="value value--xxxlarge"
      data-value-fit="true"
      data-value-fit-max-height="340">长文本...</span>
```

旧属性名 `data-fit-value="true"` 仍可用。

### Format Value（数字格式化）

```html
<!-- 自动千分位 + 缩写（K/M/B） -->
<span class="value value--xlarge value--tnums" data-value-format="true">2345678</span>

<!-- 货币 + 格式化 + 自动缩放 -->
<span class="value value--xlarge value--tnums"
      data-value-format="true"
      data-value-fit="true">$2345678</span>

<!-- 区域格式 -->
<span class="value value--large value--tnums"
      data-value-format="true"
      data-value-locale="de-DE">€123456.78</span>
```

旧属性名 `data-format-value="true"` 仍可用。常用 locale：`en-US`、`de-DE`、`fr-FR`、`en-GB`、`ja-JP`。

支持的货币符号：`$`、`€`、`£`、`¥`、`₴`、`₹`、`₪`、`₩`、`₫`、`₱`、`₽`、`₿`。

---

## 颜色

详细色板见 `references/colors.md`。

### 背景色（Background）

```html
<!-- 灰度 -->
<div class="bg--black">纯黑</div>
<div class="bg--gray-30">灰度背景</div>
<div class="bg--white">纯白</div>

<!-- 色度（hue 或 hue-step） -->
<div class="bg--red">纯红</div>
<div class="bg--blue-40">蓝 40</div>
<div class="bg--green-60">绿 60</div>

<!-- 语义色 -->
<div class="bg--primary">主色</div>
<div class="bg--success">成功</div>
<div class="bg--error">错误</div>
<div class="bg--warning">警告</div>
```

### 文字颜色（Text Color）

```html
<span class="text--black">黑色文字</span>
<span class="text--gray-40">灰色文字</span>
<span class="text--red">红色文字</span>
<span class="text--success">语义绿色文字</span>
<span class="text--white">白色文字</span>
```

---

## 边框与描边

### Border（抖动边框）

1（黑）~ 7（白），通过 dither pattern 模拟灰度强度，支持 high-density 1bit/2bit 渲染。

```html
<div class="border--h-1">最深水平边框</div>
<div class="border--h-4">中间水平边框</div>
<div class="border--h-7">最浅水平边框</div>
<div class="border--v-1">最深垂直边框</div>
```

> v2 与 v1 **不向后兼容**：类名相同，但同一 N 值的视觉效果不同，升级时需重新评估 N 值。

### Outline（像素级圆角边框）

1bit：CSS gradient 点阵；2bit/4bit：回退为标准 `border-radius`。

```html
<div class="outline">有像素级圆角边框的内容</div>
```

---

## 间距

### Gap

```html
<!-- 预设尺寸 -->
<div class="flex flex--col gap--none">...</div>
<div class="flex flex--col gap--xsmall">...</div>
<div class="flex flex--col gap--small">...</div>
<div class="flex flex--col gap">...</div>          <!-- 默认 -->
<div class="flex flex--col gap--base">...</div>    <!-- 同默认，用于响应式重置 -->
<div class="flex flex--col gap--medium">...</div>
<div class="flex flex--col gap--large">...</div>
<div class="flex flex--col gap--xlarge">...</div>
<div class="flex flex--col gap--xxlarge">...</div>

<!-- 分布修饰符 -->
<div class="flex flex--col gap--auto">...</div>        <!-- space-evenly -->
<div class="flex flex--col gap--distribute">...</div>  <!-- space-between -->

<!-- 任意像素值（0-50px，不支持响应式） -->
<div class="grid grid--cols-3 gap--[10px]">...</div>

<!-- 响应式 -->
<div class="grid grid--cols-3 gap--small md:gap--large lg:gap--xlarge portrait:gap--medium">...</div>
```

### Spacing（间距）

```html
<div class="m--4">全方向 margin</div>
<div class="p--4">全方向 padding</div>
<div class="mt--2 mb--4 ml--2 mr--2">单方向 margin</div>
<div class="pt--2 pb--4 pl--2 pr--2">单方向 padding</div>
```

---

## 尺寸

### Size

```html
<!-- 固定宽高 -->
<div class="w--32">宽度 32 单位</div>
<div class="h--full">满高</div>
<div class="w--full">满宽</div>

<!-- 任意像素值（支持响应式） -->
<div class="w--[250px] md:w--[400px]">响应式任意宽度</div>
<div class="h--[120px]">任意高度</div>

<!-- 容器查询单位（相对于 layout 容器，TRMNL X） -->
<div class="w--[50cqw]">layout 宽度的 50%</div>
<div class="h--[80cqh]">layout 高度的 80%</div>
```

### Aspect Ratio（宽高比，Beta）

```html
<div class="aspect--1/1">正方形</div>
<div class="aspect--16/9">宽屏</div>
<div class="aspect--3/4">竖向</div>
<div class="aspect--auto">无约束</div>
```

可用值：`1/1`、`4/3`、`3/2`、`16/9`、`21/9`、`3/4`、`2/3`、`9/16`、`9/21`。

---

## 圆角

```html
<div class="rounded--none">无圆角（0px）</div>
<div class="rounded--xsmall">超小（5px）</div>
<div class="rounded--small">小（7px）</div>
<div class="rounded--base">默认（10px，用于响应式重置）</div>
<div class="rounded--medium">中（15px）</div>
<div class="rounded--large">大（20px）</div>
<div class="rounded--xlarge">超大（25px）</div>
<div class="rounded--xxlarge">最大（30px）</div>
<div class="rounded--full">完全圆形（9999px）</div>
<div class="rounded--[8px]">任意值（从 0px 起）</div>
```

---

## 图片

### Image（图片处理）

```html
<img class="image image-dither" src="photo.jpg">    <!-- 1bit 抖动优化 -->
```

### Image Stroke（图片描边）

给透明/矢量图像添加描边，确保在着色背景上可读。

```html
<!-- 默认白色描边（1.5px） -->
<img class="image-stroke" src="icon.svg">

<!-- 尺寸变体 -->
<img class="image-stroke image-stroke--small" src="icon.svg">   <!-- 1px -->
<img class="image-stroke image-stroke--base" src="icon.svg">    <!-- 1.5px -->
<img class="image-stroke image-stroke--medium" src="icon.svg">  <!-- 2px -->
<img class="image-stroke image-stroke--large" src="icon.svg">   <!-- 2.5px -->
<img class="image-stroke image-stroke--xlarge" src="icon.svg">  <!-- 3px -->

<!-- 黑色描边（用于暗背景上的白色图标） -->
<img class="image-stroke image-stroke--black" src="white-icon.svg">
```

---

## 缩放（Beta）

```html
<div class="scale--90">缩小至 90%</div>
<div class="scale--95">缩小至 95%</div>
<div class="scale--100">原始大小</div>
<div class="scale--105">放大至 105%</div>
<div class="scale--110">放大至 110%</div>
```

---

## 文字工具

### Text Alignment

```html
<div class="text--left">左对齐</div>
<div class="text--center">居中</div>
<div class="text--right">右对齐</div>
<div class="text--justify">两端对齐</div>

<!-- 响应式 -->
<div class="text--left portrait:text--center">横屏左对齐，竖屏居中</div>
```

### Text Stroke（文字描边）

着色背景上的文字辅助描边：

```html
<span class="value text-stroke">128</span>
<span class="value text-stroke text-stroke--base">128</span>
```

---

## 可见性

```html
<div class="hidden">隐藏</div>
<div class="visible">显示</div>
<div class="hidden-1bit">1bit 设备上隐藏</div>
<div class="hidden-2bit">2bit 设备上隐藏</div>
<div class="hidden-4bit">4bit 设备上隐藏</div>
```

---

## 响应式前缀

| 前缀类型 | 值 | 说明 |
|---|---|---|
| 断点 | `sm:`, `md:`, `lg:` | 屏幕宽度（mobile-first） |
| 方向 | `portrait:` | 仅竖屏变体；横屏是默认态 |
| 位深 | `1bit:`, `2bit:`, `4bit:` | 仅命中特定位深，**不是渐进式** |
| 主题 | `dark:` | 仅 Visibility / Background / Text 支持，且必须放在最前 |

### 断点

| 前缀 | 最小宽度 | 常见设备 |
|---|---:|---|
| `sm:` | 600px | Kindle 2024 |
| `md:` | 800px | TRMNL OG、TRMNL OG V2 |
| `lg:` | 1024px | TRMNL V2 |

- `sm:` / `md:` / `lg:` 遵循 mobile-first：`md:` 对中屏及更大屏生效
- 位深前缀不遵循 mobile-first：`4bit:` 只对 4-bit 设备生效，不会命中 1-bit / 2-bit

### 组合顺序与优先级

- 标准顺序：`size:orientation:bit-depth:utility`
- 带暗色模式时：`dark:size:orientation:bit-depth:utility`
- 修饰符越多，优先级越高；例如 `portrait:2bit:label--filled` 会覆盖 `portrait:label--underline`

### 组件支持矩阵

`Auto` 表示框架已内建适配，通常不必手写该维度前缀。

| 能力 | Size | Orientation | Bit-Depth | 说明 |
|---|---|---|---|---|
| Background | ✅ | ✅ | Auto | 背景色自动适配位深 |
| Border | ❌ | ❌ | Auto | 无 `md:border--*` |
| Text | ✅ | ✅ | Auto | 文本工具自动适配位深 |
| Visibility | ✅ | ✅ | ✅ | 可与 `1bit:` / `2bit:` / `4bit:` 组合 |
| Value | ✅ | ✅ | ❌ | 无 `4bit:value--large` |
| Label | ✅ | ✅ | ✅ | 支持多重组合 |
| Spacing | ✅ | ✅ | ❌ | margin / padding |
| Gap | ✅ | ✅ | ❌ | gap 工具类 |
| Layout / Flex | ✅ | ✅ | ❌ | 布局方向/对齐 |
| Grid | ✅ | ✅ | ❌ | 列数 / span |
| Rounded / Size | ✅ | ✅ | ❌ | 圆角 / 宽高 |
| Clamp / Overflow | ✅ | ✅ | ❌ | `data-clamp-*` / `data-overflow-*` |

```html
<span class="title sm:title--small lg:title--large">响应式标题</span>
<span class="value value--small md:value--base">响应式数值</span>
<div class="grid grid--cols-2 portrait:grid--cols-1">响应式网格</div>
<div class="dark:md:hidden">暗色中屏以上隐藏</div>
```

---

来源：[Framework v3 文档](https://trmnl.com/framework/docs/v3)
