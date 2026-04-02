# richtext

## 作用

富文本容器，用于段落、引言、长文案等文字为主的内容。`richtext` 是外层容器，`content` 是实际文字区域，两者有各自独立的对齐控制。

## Blade / 原生写法

```blade
{{-- Blade 组件 --}}
<x-trmnl::richtext align="center" gapSize="large">
    <x-trmnl::content contentAlignment="center" textAlignment="center">
        <p>正文内容</p>
    </x-trmnl::content>
</x-trmnl::richtext>
```

```html
<!-- 原生 HTML -->
<div class="richtext richtext--center gap--large">
    <div class="content content--center gap text--center">
        <p>正文内容</p>
    </div>
</div>
```

## 关键 props / class / 属性

### richtext Blade props

| prop | 可选值 | 说明 |
|---|---|---|
| `align` | `left`、`center`、`right` | 整体容器在父元素中的对齐 |
| `gapSize` | `small`、`base`、`large` 等 | 内部间距 |

### content Blade props

| prop | 可选值 | 说明 |
|---|---|---|
| `contentAlignment` | `left`、`center`、`right` | content 块自身对齐 |
| `textAlignment` | `left`、`center`、`right` | 内部文字对齐（`text--*`） |
| `gapSize` | gap 值 | 内部 gap |

> 尺寸通过 class 控制（见下），**不是** `content` 的 prop。

### content 尺寸 class

`content--small` / `content--base` / `content--large` / `content--xlarge` / `content--xxlarge` / `content--xxxlarge`

支持响应前缀：`lg:content--xxlarge`、`portrait:content--small`、`1bit:content--large` 等

### 溢出处理

- `data-content-limiter="true"`：内容超出时自动缩小字号
- `data-content-max-height="140"`：手动指定最大高度（像素）

## 注意事项

- `richtext` 和 `content` 是两层，对齐各自独立
- `text--left/center/right` 控制段落内文字对齐，加在 `content` 上
- 尺寸变体用 class 而非 prop

## 最小示例

```blade
<x-trmnl::layout alignment="center">
    <x-trmnl::richtext align="center" gapSize="large">
        <x-trmnl::content contentAlignment="center" textAlignment="center">
            <p>今日格言</p>
        </x-trmnl::content>
    </x-trmnl::richtext>
</x-trmnl::layout>
```

## 来源

- Framework v3 文档：https://trmnl.com/framework/docs/v3/rich_text
- trmnl-blade 源码：`src/View/Components/Richtext.php`、`Content.php`
