# content

## 作用

`richtext` 的子组件，承载实际文字内容（段落、标题等）。控制文字块的尺寸、对齐和溢出适应。**尺寸通过 class 控制，不是 prop。**

## Blade / 原生写法

```blade
{{-- 通常嵌套在 richtext 内使用 --}}
<x-trmnl::richtext>
    <x-trmnl::content contentAlignment="center" textAlignment="center">
        <p>正文内容</p>
    </x-trmnl::content>
</x-trmnl::richtext>
```

```html
<!-- 原生 HTML -->
<div class="content content--large text--center gap">
    <p>正文内容</p>
</div>
```

## 关键 props / class / 属性

### Blade props

| prop | 可选值 | 说明 |
|---|---|---|
| `contentAlignment` | `left`、`center`、`right` | content 块对齐（`content--left` 等） |
| `textAlignment` | `left`、`center`、`right` | 文字对齐（`text--left` 等） |
| `gapSize` | gap 值 | 内部 gap 间距 |

### 尺寸 class（加在 `content` div 上）

`content--small` / `content--base` / `content--large` / `content--xlarge` / `content--xxlarge` / `content--xxxlarge`

支持响应前缀：`lg:content--xxlarge`、`portrait:content--small`、`1bit:content--large`

### 溢出处理 data 属性

| 属性 | 说明 |
|---|---|
| `data-content-limiter="true"` | 超出时自动缩小字号适应容器 |
| `data-content-max-height="140"` | 手动限制最大高度（px） |

## 注意事项

- 尺寸用 class 附加，不是 Blade prop
- `content--base` 与无修饰符等价，用于响应式重置
- 在 `richtext` 外独立使用 `content` 也合法

## 最小示例

```html
<div class="richtext richtext--center gap--large">
    <div class="content content--xlarge text--center" data-content-limiter="true">
        <p>今日名言：行动是治愈恐惧的良药。</p>
    </div>
</div>
```

## 来源

- Framework v3 文档：https://trmnl.com/framework/docs/v3/rich_text（Content Limiter 节）
- trmnl-blade 源码：`src/View/Components/Content.php`
