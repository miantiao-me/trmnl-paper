# aspect

## 作用

宽高比容器，用于保持元素固定的宽高比（如 16:9、1:1、4:3 等），配合图片或图表使用，防止在不同屏幕尺寸下变形。

## Blade / 原生写法

```blade
{{-- Blade 组件 --}}
<x-trmnl::aspect ratio="16/9">
    <img class="image image--cover" src="/path/to/image.jpg" alt="">
</x-trmnl::aspect>
```

```html
<!-- 原生 HTML（使用工具类） -->
<div class="aspect aspect--16/9">
    <img class="image image--cover" src="/path/to/image.jpg" alt="">
</div>

<!-- 或使用 CSS 自定义属性 -->
<div style="aspect-ratio: 16/9;">
    <img class="image image--cover" src="/path/to/image.jpg" alt="">
</div>
```

## 关键 props / class / 属性

| Blade prop `ratio` | 说明 |
|---|---|
| `1/1` | 正方形 |
| `4/3` | 传统横屏比例 |
| `16/9` | 宽屏比例 |
| `3/2` | 标准摄影比例 |

## 注意事项

- 内部图片通常配合 `image--cover` 使用以填满比例容器
- e-paper 屏幕分辨率固定，aspect 主要用于图片/图表的一致性展示

## 最小示例

```blade
<x-trmnl::layout>
    <x-trmnl::aspect ratio="16/9">
        <img class="image image--cover" src="/screenshots/dashboard.jpg" alt="截图">
    </x-trmnl::aspect>
</x-trmnl::layout>
```

## 来源

- trmnl-blade 源码：`src/View/Components/Aspect.php`
