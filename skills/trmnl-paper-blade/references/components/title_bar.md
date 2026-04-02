# title-bar

## 作用

插件的标准化标题栏，显示图标、标题和可选实例标签。在 Mashup 中自动切换为紧凑样式。

## Blade / 原生写法

```blade
{{-- 基础（图标使用 src 属性） --}}
<x-trmnl::title-bar title="我的插件" image="/icons/plugin.svg" instance="生产环境" />

{{-- 内联图标（image='inline' 时走 slot） --}}
<x-trmnl::title-bar title="我的插件" image="inline">
    <x-slot name="image">
        <img class="image" src="/icons/plugin.svg" alt="">
    </x-slot>
</x-trmnl::title-bar>
```

```html
<!-- 原生 HTML -->
<div class="title_bar">
    <img class="image" src="/icons/plugin.svg" alt="">
    <span class="title">我的插件</span>
    <span class="instance">生产环境</span>
</div>
```

## 关键 props / class / 属性

| Blade prop | 说明 |
|---|---|
| `title` | 标题文本（必填） |
| `image` | 图标 URL；传 `'inline'` 时启用 slot 模式 |
| `instance` | 实例标签（可选，右侧小字） |

原生结构：`div.title_bar > img.image + span.title + span.instance`

## 注意事项

- `title-bar` 的放置位置与层级约束见 `references/design-rules.md`
- 在 `mashup` 内的 view 中，框架自动应用紧凑高度样式（无需额外 class）
- `instance` 可省略

## 最小示例

```blade
<x-trmnl::view>
    <x-trmnl::layout>
        <span class="value value--large">42°C</span>
    </x-trmnl::layout>
    <x-trmnl::title-bar title="天气" image="/icons/weather.svg" instance="北京" />
</x-trmnl::view>
```

## 来源

- Framework v3 文档：https://trmnl.com/framework/docs/v3/title_bar
- trmnl-blade 源码：`src/View/Components/TitleBar.php`
