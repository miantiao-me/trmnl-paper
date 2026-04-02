# track

## 作用

`progress-bar` 内的轨道容器，包裹 `fill`（已完成部分）。也在 `progress-dots` 内包裹 `dot` 列表。通常不单独使用，作为 `progress` 组件的子结构。

## 原生写法

```html
<!-- progress-bar 内的 track -->
<div class="progress-bar">
    <div class="content">
        <span class="label">进度</span>
        <span class="value value--xxsmall">75%</span>
    </div>
    <div class="track">
        <div class="fill" style="width: 75%"></div>
    </div>
</div>

<!-- progress-dots 内的 track -->
<div class="progress-dots">
    <div class="track">
        <div class="dot dot--filled"></div>
        <div class="dot dot--current"></div>
        <div class="dot"></div>
    </div>
</div>
```

## Blade 写法（trmnl-blade）

```blade
<x-trmnl::progress>
    <x-trmnl::track>
        <div class="fill" style="width: 60%"></div>
    </x-trmnl::track>
</x-trmnl::progress>
```

## 关键 class

| class | 说明 |
|---|---|
| `track` | 进度条轨道背景容器 |
| `fill` | 填充块，宽度通过 `style="width: N%"` 控制 |
| `dot` | 步骤点（在 progress-dots 内） |
| `dot--filled` | 已完成状态 |
| `dot--current` | 当前步骤（激活状态） |

## 注意事项

- `fill` 宽度必须通过内联 style 设置，无工具 class 控制
- `x-trmnl::track` 只是轨道包装，填充块仍使用原生 `<div class="fill">`

## 最小示例

```html
<div class="progress-bar">
    <div class="track">
        <div class="fill" style="width: 40%"></div>
    </div>
</div>
```

## 来源

- Framework v3 文档：https://trmnl.com/framework/docs/v3/progress
- trmnl-blade 源码：`src/View/Components/Track.php`
