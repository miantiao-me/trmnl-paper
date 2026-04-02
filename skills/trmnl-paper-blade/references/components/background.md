# background

## 作用

背景色包装组件（`x-trmnl::background`），用于给区块设置背景色 token。但**完整的 v3 颜色系统**（`bg--token` / `text--token` 工具类）优先直接使用原生 class，而非依赖此组件。

> **重要**：`background` wrapper 不是 v3 颜色系统的完整封装。大多数颜色需求建议直接使用 `bg--*` / `text--*` 工具类。

## Blade / 原生写法

```blade
{{-- Blade 组件（简单背景包装） --}}
<x-trmnl::background color="black">
    内容
</x-trmnl::background>
```

```html
<!-- 推荐：直接使用原生工具类 -->
<div class="bg--black text--white p--4">
    <span class="label">深色区块</span>
</div>

<div class="bg--gray-20">
    <span class="label">浅灰背景</span>
</div>
```

## 颜色工具类（原生）

**背景色**：`bg--black` / `bg--white` / `bg--gray-{N}` / `bg--{semantic-color}`

**文字色**：`text--black` / `text--white` / `text--{semantic-color}`

灰度阶梯（`bg--gray-N`，N 越小越深）：`gray-10` / `gray-20` / `gray-30` / ... / `gray-70` / `gray-75`

深色模式下颜色 token 自动重映射（通过 `screen--dark-mode`）。

## 注意事项

- 优先用 `bg--*` / `text--*` 工具类，而非 `x-trmnl::background`
- `background` 组件当前接收 `color` prop，输出的是 `bg-{color}` 这一薄包装
- 颜色详情见 `references/colors.md`

## 最小示例

```html
<!-- 黑色背景区块（直接用工具类） -->
<div class="bg--black p--4 rounded">
    <span class="value value--large text--white">42</span>
    <span class="label text--white">完成</span>
</div>
```

## 来源

- Framework v3 颜色文档：https://trmnl.com/framework/docs/v3/colors
- trmnl-blade 源码：`src/View/Components/Background.php`
- 详细颜色参考：`references/colors.md`
