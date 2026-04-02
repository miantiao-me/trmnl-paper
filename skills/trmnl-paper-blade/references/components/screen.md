# screen

## 作用

所有内容的最外层容器，定义设备尺寸并向内层组件提供 CSS 变量。在 TRMNL 平台上由平台注入；自建栈（BYOS）时需手动提供。

## Blade / 原生写法

```blade
{{-- Blade 组件（trmnl-blade） --}}
<x-trmnl::screen>
    <x-trmnl::view>
        ...
    </x-trmnl::view>
</x-trmnl::screen>
```

```html
<!-- 原生 HTML -->
<div class="screen">
    <div class="view view--full">...</div>
</div>
```

## 关键 props / class / 属性

### Blade props

| prop | 说明 |
|---|---|
| `noBleed` | 移除屏幕边距，内容延伸至边缘 |
| `darkMode` | 开启深色模式，重映射颜色 token |
| `deviceVariant` | 设备型号，如 `og`、`v2`、`amazon_kindle_2024` |
| `deviceOrientation` | 方向：`landscape`（默认）、`portrait` |
| `colorDepth` | 色深：`1bit`、`2bit`、`4bit` 等 |
| `scaleLevel` | UI 缩放系数 |

### 原生 class 修饰符

| class | 说明 |
|---|---|
| `screen--og` | TRMNL 原版设备（800×480px） |
| `screen--v2` | TRMNL V2（1040×780px） |
| `screen--portrait` | 竖屏方向（宽高互换） |
| `screen--no-bleed` | 去除边距 |
| `screen--dark-mode` | 深色模式 |
| `screen--backdrop` | Mashup 背景样式（图案/纯灰色背景） |
| `screen--1bit` / `screen--4bit` | 色深标记 |

## 注意事项

- TRMNL 平台自动注入 `screen`，**无需在插件 markup 中写**
- 自建栈（BYOS）时需手动写 `screen` 以及对应设备 class
- 每个 `screen` 只包含一个 `view`（全屏）或一个 `mashup`（多区域）

## 最小示例

```blade
<x-trmnl::screen deviceVariant="v2" colorDepth="4bit">
    <x-trmnl::view>
        <x-trmnl::layout>
            <!-- 内容 -->
        </x-trmnl::layout>
        <x-trmnl::title-bar title="我的插件" />
    </x-trmnl::view>
</x-trmnl::screen>
```

## 来源

- Framework v3 文档：https://trmnl.com/framework/docs/v3/screen
- trmnl-blade 源码：`src/View/Components/Screen.php`
