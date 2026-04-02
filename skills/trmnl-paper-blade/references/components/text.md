# text

## 作用

行内文字工具组件，控制文字对齐和底纹（shading）。通常作为文字修饰类使用，或通过 `x-trmnl::text` 组件包裹文字片段。

## Blade / 原生写法

```blade
{{-- Blade 组件 --}}
<x-trmnl::text alignment="center" shading="gray-40">
    辅助说明文字
</x-trmnl::text>
```

```html
<!-- 原生 HTML，常见用法是在文字元素上附加 text-- 类 -->
<span class="text--center">居中文字</span>
<p class="text--left">左对齐段落</p>
```

## 关键 props / class / 属性

### Blade props

| prop | 可选值 | 说明 |
|---|---|---|
| `alignment` | `left`、`center`、`right` | 文字对齐 |
| `shading` | 如 `gray-40` | 追加 `text--{值}` 样式 |

### 原生 class

**对齐**：`text--left` / `text--center` / `text--right`

## 注意事项

- `text--*` 对齐类可附加在任意文字元素上（`p`、`span`、`div`），不必用 `x-trmnl::text` 包裹
- 在 `content` 内控制段落文字对齐时通常直接加 `text--center` 到 `content` div

## 最小示例

```html
<div class="content content--large text--center">
    <p>今日格言</p>
</div>
```

## 来源

- trmnl-blade 源码：`src/View/Components/Text.php`
