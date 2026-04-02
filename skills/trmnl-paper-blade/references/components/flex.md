# flex

## 作用

基于 CSS Flexbox 的布局容器，支持行/列方向、对齐、伸展、换行等。适合内容驱动的弹性布局（宽高随内容变化）。严格列对齐用 `grid`，同质数据列表用 `columns`。

## Blade / 原生写法

```blade
{{-- Blade 组件 --}}
<x-trmnl::flex direction="row" alignment="center" stretch="y">
    <div>...</div>
    <div>...</div>
</x-trmnl::flex>
```

```html
<!-- 原生 HTML -->
<div class="flex flex--row flex--center flex--stretch-y">
    <div>...</div>
    <div>...</div>
</div>
```

## 关键 props / class / 属性

### Blade props

| prop | 可选值 |
|---|---|
| `direction` | `row`、`col`、`row-reverse`、`col-reverse` |
| `alignment` | `left`、`center`、`right`、`top`、`bottom`、`center-x`、`center-y`、`between`、`around`、`evenly` |
| `stretch` | `true`、`x`、`y` |

### 原生 class

**方向**：`flex--row` / `flex--col` / `flex--row-reverse` / `flex--col-reverse`

**对齐**：`flex--left` / `flex--center` / `flex--right` / `flex--top` / `flex--bottom` / `flex--center-x` / `flex--center-y` / `flex--between` / `flex--around` / `flex--evenly`

**伸展（容器）**：`flex--stretch` / `flex--stretch-x` / `flex--stretch-y`

**伸展（子元素）**：`stretch` / `stretch-x` / `stretch-y` / `no-shrink`

**换行**：`flex--wrap` / `flex--nowrap` / `flex--wrap-reverse`

**子元素独立**：`grow` / `shrink-0` / `flex-none` / `self--start` / `self--center` / `self--end` / `self--stretch`

**响应前缀**：`portrait:flex--col` 等

## 注意事项

- `flex` 本身不产生 gap，需额外加 `gap` class
- 可嵌套在 `grid` 单元格内使用

## 最小示例

```blade
<x-trmnl::layout>
    <x-trmnl::flex direction="row" alignment="between">
        <span class="label">标签</span>
        <span class="value">42</span>
    </x-trmnl::flex>
</x-trmnl::layout>
```

## 来源

- Framework v3 文档：https://trmnl.com/framework/docs/v3/flex
- trmnl-blade 源码：`src/View/Components/Flex.php`
