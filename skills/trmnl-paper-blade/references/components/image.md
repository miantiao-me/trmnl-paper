# image

## 作用

图片显示，支持抖动（dithering）处理以适应 1-bit 黑白电子墨水屏，以及对象适应方式控制。

> **注意**：这是框架级 HTML class 能力，**不是** trmnl-blade 的完整 Blade 组件。直接使用原生 `<img>` 加 class。

## 原生写法

```html
<!-- 基础图片（title_bar 内的图标） -->
<img class="image" src="/icons/plugin.svg" alt="">

<!-- 带抖动（1-bit 灰度模拟） -->
<img class="image image-dither rounded" src="/path/to/photo.jpg" alt="">

<!-- 对象适应 -->
<img class="image image--fill" src="/path/to/photo.jpg" alt="">
<img class="image image--contain" src="/path/to/photo.jpg" alt="">
<img class="image image--cover" src="/path/to/photo.jpg" alt="">
```

## 关键 class / 属性

| class | 说明 |
|---|---|
| `image` | 基础图片样式 |
| `image-dither` | 抖动处理（1-bit 灰度仿真） |
| `image--fill` | 拉伸填满容器（可能变形） |
| `image--contain` | 保持比例缩入容器（留白） |
| `image--cover` | 保持比例裁剪填满容器 |
| `rounded` | 圆角（可组合） |

## 注意事项

- `image-dither` 在截图渲染时将灰度图转换为黑白点阵图案
- 图片尺寸建议通过 `w--*` / `h--*` 工具类控制，不要硬编码 px
- `title_bar` 内的图标使用 `class="image"` 即可（无需 dither）

## 最小示例

```html
<!-- 在 item 内展示天气图标 -->
<div class="item">
    <div class="icon">
        <img class="image w--[6cqw] h--[6cqw]" src="/icons/wi-sunny.svg" alt="">
    </div>
    <div class="content">
        <span class="value value--small">25°C</span>
        <span class="label">晴天</span>
    </div>
</div>
```

## 来源

- Framework v3 文档：https://trmnl.com/framework/docs/v3/image
