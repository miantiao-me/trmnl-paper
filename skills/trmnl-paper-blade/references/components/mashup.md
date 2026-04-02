# mashup

## 作用

将多个插件的 `view` 组合在单屏内，`mashupLayout` 决定排列方式，每个 `view` 的 `size` 决定占用空间。

## Blade / 原生写法

```blade
{{-- Blade 组件 --}}
<x-trmnl::mashup mashupLayout="1Lx1R">
    <x-trmnl::view size="half_vertical">
        <x-trmnl::layout>...</x-trmnl::layout>
    </x-trmnl::view>
    <x-trmnl::view size="half_vertical">
        <x-trmnl::layout>...</x-trmnl::layout>
    </x-trmnl::view>
</x-trmnl::mashup>
```

```html
<!-- 原生 HTML -->
<div class="mashup mashup--1Lx1R">
    <div class="view view--half_vertical">
        <div class="layout">...</div>
    </div>
    <div class="view view--half_vertical">
        <div class="layout">...</div>
    </div>
</div>
```

## 关键 props / class / 属性

| `mashupLayout` / class | 布局描述 | 子 view size |
|---|---|---|
| `1Lx1R` | 左1右1（左右各半） | `half_vertical` × 2 |
| `1Tx1B` | 上1下1（上下各半） | `half_horizontal` × 2 |
| `1Lx2R` | 左1右2（左半 + 右两象限） | `half_vertical` + `quadrant` × 2 |
| `2Lx1R` | 左2右1（左两象限 + 右半） | `quadrant` × 2 + `half_vertical` |
| `2Tx1B` | 上2下1 | `quadrant` × 2 + `half_horizontal` |
| `1Tx2B` | 上1下2 | `half_horizontal` + `quadrant` × 2 |
| `2x2` | 四象限 | `quadrant` × 4 |

## 注意事项

- TRMNL 平台多插件屏自动提供 `mashup`，无需手动写
- BYOS / 本地开发时需手动提供，并确保 view size 与 mashupLayout 对应
- `screen--backdrop` 可切换 mashup 背景为图案/纯灰样式

## 最小示例

```blade
<x-trmnl::screen>
    <x-trmnl::mashup mashupLayout="1Lx1R">
        <x-trmnl::view size="half_vertical">
            <x-trmnl::layout>
                <span class="label">左侧内容</span>
            </x-trmnl::layout>
        </x-trmnl::view>
        <x-trmnl::view size="half_vertical">
            <x-trmnl::layout>
                <span class="label">右侧内容</span>
            </x-trmnl::layout>
        </x-trmnl::view>
    </x-trmnl::mashup>
</x-trmnl::screen>
```

## 来源

- Framework v3 文档：https://trmnl.com/framework/docs/v3/mashup
- trmnl-blade 源码：`src/View/Components/Mashup.php`
