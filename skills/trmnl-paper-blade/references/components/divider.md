# divider

## 作用

视觉分隔线，用于水平或垂直分割内容区域。`x-trmnl::divider` 适合基础水平分隔；垂直分隔与更细控制通常直接用原生 class。

## Blade / 原生写法

```blade
{{-- trmnl-blade 提供 x-trmnl::divider 组件 --}}
<x-trmnl::divider />
```

```html
<!-- 原生 HTML -->
<div class="divider"></div>                    <!-- 水平 -->
<div class="divider divider--vertical"></div>  <!-- 垂直 -->
```

## 关键 props / class / 属性

### 方向

| class | 说明 |
|---|---|
| `divider` | 水平分隔线 |
| `divider divider--vertical` | 垂直分隔线 |

## 注意事项

- `x-trmnl::divider` 只输出基础 `<div class="divider">`
- 需要垂直分隔时直接写原生 HTML class 更明确

## 最小示例

```html
<div class="layout layout--col gap">
    <span class="label">区域 A</span>
    <div class="divider"></div>
    <span class="label">区域 B</span>
</div>
```

## 来源

- Framework v3 文档：https://trmnl.com/framework/docs/v3/divider
- trmnl-blade 源码：`src/View/Components/Divider.php`
