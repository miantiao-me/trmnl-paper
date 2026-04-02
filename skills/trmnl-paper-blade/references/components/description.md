# description

## 作用

次要说明文字组件，用于条目副标题、补充说明、元信息等。字号比 `label` 更小，视觉层级低于 `title`。

## Blade / 原生写法

```blade
{{-- trmnl-blade 提供 x-trmnl::description 组件 --}}
<x-trmnl::description>补充说明文字</x-trmnl::description>
```

```html
<!-- 原生 HTML -->
<span class="description">补充说明文字</span>
<span class="description description--large">较大说明</span>
```

## 关键 props / class / 属性

### 尺寸 class

| class | 字号（1-bit） |
|---|---|
| `description`（默认） | 16px（NicoPups 字体） |
| `description--large` | 16px（NicoClean，同字号但字形更清晰） |
| `description--xlarge` | 21px |
| `description--xxlarge` | 24px |

**响应前缀**：`lg:description--xlarge`、`portrait:description--base`

### 截断

`data-clamp="1"` / `data-clamp="2"` — 超出行数显示省略号

## 注意事项

- `x-trmnl::description` 支持属性透传，可直接在组件标签上加 `data-clamp`
- 默认不截断，在空间受限的条目中建议显式加 `data-clamp`
- 在 `item` 内通常紧跟 `title title--small` 之后

## 最小示例

```html
<div class="item">
    <div class="content">
        <span class="title title--small">团队会议</span>
        <span class="description" data-clamp="1">每周一次全员同步</span>
    </div>
</div>
```

## 来源

- Framework v3 文档：https://trmnl.com/framework/docs/v3/description
- trmnl-blade 源码：`src/View/Components/Description.php`
