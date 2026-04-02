# grid

## 作用

CSS Grid 布局系统，提供精确的列数控制和跨列能力。适合需要严格列对齐的"网格型"设计。弹性内容用 `flex`，同质数据列表用 `columns`。

## Blade / 原生写法

```blade
{{-- Blade 组件（cols 控制列数） --}}
<x-trmnl::grid cols="3">
    <x-trmnl::col span="2">...</x-trmnl::col>
    <x-trmnl::col span="1">...</x-trmnl::col>
</x-trmnl::grid>
```

```html
<!-- 原生 HTML -->
<div class="grid grid--cols-3">
    <div class="col col--span-2">...</div>
    <div class="col col--span-1">...</div>
</div>
```

## 关键 props / class / 属性

### grid Blade props / class

| Blade prop `cols` | 原生 class | 说明 |
|---|---|---|
| `2` ~ N | `grid--cols-2` 等 | 等宽列数 |
| — | `grid--wrap` | 启用自动换行 |
| — | `grid--min-{size}` | 换行时最小列宽（配合 `grid--wrap`） |

### col Blade props / class

| Blade prop | 原生 class | 说明 |
|---|---|---|
| `span="N"` | `col--span-N` | 跨 N 列 |
| `position="start/center/end"` | `col--start` 等 | 列内垂直对齐 |

### 其他原生 class

- `row` / `row--start` / `row--center` / `row--end`：行内水平对齐

## 注意事项

- 一行内所有 `col--span-N` 的总和应等于 `grid--cols-N`
- `col` 在 `grid` 内表示"垂直排列的格子"；`row` 表示"水平排列的格子"
- 可在 `col` / `row` 内嵌套 `flex` 做二次布局

## 最小示例

```html
<div class="layout">
    <div class="grid grid--cols-3">
        <div class="col">
            <span class="value value--large">1</span>
            <span class="label">指标 A</span>
        </div>
        <div class="col">
            <span class="value value--large">2</span>
            <span class="label">指标 B</span>
        </div>
        <div class="col">
            <span class="value value--large">3</span>
            <span class="label">指标 C</span>
        </div>
    </div>
</div>
```

## 来源

- Framework v3 文档：https://trmnl.com/framework/docs/v3/grid
- trmnl-blade 源码：`src/View/Components/Grid.php`、`Col.php`
