# view

## 作用

内容容器，持有一个 `layout`（及可选的 `title-bar`）。全屏时直接放在 `screen` 内；多区域时放在 `mashup` 内。

## Blade / 原生写法

```blade
{{-- Blade 组件 --}}
<x-trmnl::view size="full">
    <x-trmnl::layout>...</x-trmnl::layout>
    <x-trmnl::title-bar title="标题" />
</x-trmnl::view>
```

```html
<!-- 原生 HTML -->
<div class="view view--full">
    <div class="layout">...</div>
    <div class="title_bar">...</div>
</div>
```

## 关键 props / class / 属性

| Blade prop `size` | 原生 class | 说明 |
|---|---|---|
| `full`（默认） | `view--full` | 全屏，直接在 `screen` 内 |
| `half_horizontal` | `view--half_horizontal` | 上下二分之一，在 `mashup` 内 |
| `half_vertical` | `view--half_vertical` | 左右二分之一，在 `mashup` 内 |
| `quadrant` | `view--quadrant` | 四分之一，在 `mashup` 内 |

## 注意事项

- `view` 与 `mashup` / `layout` / `title-bar` 的结构组合约束见 `references/design-rules.md`
- TRMNL 平台插件无需手动写 `view`，平台自动提供

## 最小示例

```blade
{{-- 全屏 --}}
<x-trmnl::view>
    <x-trmnl::layout>
        <span class="label">Hello</span>
    </x-trmnl::layout>
</x-trmnl::view>

{{-- Mashup 内的半屏 --}}
<x-trmnl::view size="half_vertical">
    <x-trmnl::layout>...</x-trmnl::layout>
</x-trmnl::view>
```

## 来源

- Framework v3 文档：https://trmnl.com/framework/docs/v3/view
- trmnl-blade 源码：`src/View/Components/View.php`
