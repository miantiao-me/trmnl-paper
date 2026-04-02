# progress

## 作用

进度指示组件，分两类：
- **progress-bar**：连续进度条（带填充轨道），有 Blade 组件 `x-trmnl::progress`
- **progress-dots**：离散步骤点，使用原生 class

> 当前 `x-trmnl::progress` 只输出基础 `div.progress-bar`，尺寸与强调变体通常仍用原生 HTML class。

## Blade / 原生写法

```blade
{{-- Blade 组件（基础 progress-bar） --}}
<x-trmnl::progress>
    <div class="content">
        <span class="label">下载进度</span>
        <span class="value value--xxsmall">60%</span>
    </div>
    <x-trmnl::track>
        <div class="fill" style="width: 60%"></div>
    </x-trmnl::track>
</x-trmnl::progress>
```

```html
<!-- 原生 HTML：progress-bar -->
<div class="progress-bar progress-bar--small">
    <div class="content">
        <span class="label label--small">下载进度</span>
        <span class="value value--xxsmall">60%</span>
    </div>
    <div class="track">
        <div class="fill" style="width: 60%"></div>
    </div>
</div>

<!-- 原生 HTML：progress-dots（无 Blade 封装） -->
<div class="progress-dots">
    <div class="track">
        <div class="dot dot--filled"></div>
        <div class="dot dot--filled"></div>
        <div class="dot dot--current"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    </div>
</div>
```

## 关键 props / class / 属性

### progress-bar 尺寸

| class | 轨道高度 |
|---|---|
| `progress-bar--xsmall` | 6px |
| `progress-bar--small` | 12px |
| `progress-bar` / `progress-bar--base` | 24px（默认） |
| `progress-bar--large` | 32px |

### progress-bar 强调

`progress-bar--emphasis-2` / `progress-bar--emphasis-3`（填充颜色加深）

### progress-dots 尺寸

`progress-dots--xsmall` / `progress-dots--small` / `progress-dots` / `progress-dots--large`

### dot 状态

- `dot dot--filled`：已完成
- `dot dot--current`：当前步骤
- `dot`：未完成

## 注意事项

- `progress-dots` 目前无完整 Blade 封装，使用原生 class
- `fill` 的宽度通过内联 `style="width: N%"` 设置
- `content`（标签+数值）是可选区域，可省略
- 若需要 `progress-bar--small`、`progress-bar--large`、`progress-bar--emphasis-*` 等变体，当前优先直接写原生 HTML

## 最小示例

```html
<div class="progress-bar">
    <div class="content">
        <span class="label">CPU 使用率</span>
        <span class="value value--xxsmall">75%</span>
    </div>
    <div class="track">
        <div class="fill" style="width: 75%"></div>
    </div>
</div>
```

## 来源

- Framework v3 文档：https://trmnl.com/framework/docs/v3/progress
- trmnl-blade 源码：`src/View/Components/Progress.php`（封装 progress-bar）
