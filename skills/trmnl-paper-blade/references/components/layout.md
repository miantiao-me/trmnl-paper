# layout

## 作用

`view` 内的核心内容容器，每个 `view` **有且只有一个** `layout`。高度由框架根据设备/方向/是否有 title-bar 自动计算。内部用 `flex`、`columns`、`grid` 组织子内容。

## Blade / 原生写法

```blade
{{-- Blade 组件（支持 direction / alignment / stretch） --}}
<x-trmnl::layout direction="col" alignment="center">
    <!-- 内容 -->
</x-trmnl::layout>
```

```html
<!-- 原生 HTML -->
<div class="layout layout--col layout--center">
    <!-- 内容 -->
</div>
```

## 关键 props / class / 属性

### Blade props

| prop | 可选值 | 默认 |
|---|---|---|
| `direction` | `row`、`col` | — |
| `alignment` | `left`、`center`、`right`、`top`、`bottom`、`center-x`、`center-y` | — |
| `stretch` | `true`、`x`、`y` | — |

### 原生 class

**方向**：`layout--row` / `layout--col`

**对齐**：`layout--left` / `layout--center` / `layout--right` / `layout--top` / `layout--bottom` / `layout--center-x` / `layout--center-y`

**伸展（容器级）**：`layout--stretch` / `layout--stretch-x` / `layout--stretch-y`

**伸展（子元素级）**：`stretch-x` / `stretch-y`（加在子元素上）

## 注意事项

- `view` / `layout` / `title-bar` 的结构层级以 `references/design-rules.md` 为准
- 方向默认为垂直堆叠（无 modifier 时为 column flex）
- 对齐默认居中

## 最小示例

```blade
<x-trmnl::layout direction="col" alignment="center">
    <span class="value value--large">42</span>
    <span class="label">完成任务</span>
</x-trmnl::layout>
```

## 来源

- Framework v3 文档：https://trmnl.com/framework/docs/v3/layout
- trmnl-blade 源码：`src/View/Components/Layout.php`
