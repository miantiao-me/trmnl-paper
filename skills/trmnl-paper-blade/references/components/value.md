# value

## 作用

数字/数值展示组件，提供 12 档尺寸（xxsmall → peta），适合 KPI 大字显示。`value--tnums` 启用等宽数字，对齐财务数据时使用。

## Blade / 原生写法

```blade
{{-- trmnl-blade 提供 x-trmnl::value 组件 --}}
<x-trmnl::value size="large">48,206</x-trmnl::value>
```

```html
<!-- 原生 HTML -->
<span class="value value--large value--tnums">48,206</span>
```

## 关键 props / class / 属性

### Blade props

| prop | 说明 |
|---|---|
| `size` | 尺寸名称（见下表） |
| `textStroke` | 可选字符串，传入后会拼成 `text-stroke text-stroke--{值}` |

### 尺寸 class 对照

| class | 字号（1-bit） |
|---|---|
| `value value--xxsmall` | 16px |
| `value value--xsmall` | 20px |
| `value value--small` | 26px |
| `value` / `value--base` | 38px（默认） |
| `value value--large` | 58px |
| `value value--xlarge` | 74px |
| `value value--xxlarge` | 96px |
| `value value--xxxlarge` | 128px |
| `value value--mega` | 170px |
| `value value--giga` | 220px |
| `value value--tera` | 290px |
| `value value--peta` | 380px |

### 修饰 class

- `value--tnums`：等宽数字（财务/对齐场景）

**响应前缀**：`md:value--large`、`portrait:value--small`

## 注意事项

- `x-trmnl::value` 支持属性透传，可直接在组件标签上加 `data-value-fit` / `data-value-format`
- 大尺寸（mega 以上）通常单独占满屏幕
- 数字配合 `value--tnums` 可避免数字宽度不一导致跳动
- 如需描边，可优先直接写原生 class；`textStroke` 的取值以 Framework Text Stroke 文档为准

## 最小示例

```html
<div class="layout layout--col layout--center">
    <span class="value value--xxxlarge value--tnums">42</span>
    <span class="label">完成任务</span>
</div>
```

## 来源

- Framework v3 文档：https://trmnl.com/framework/docs/v3/value
- trmnl-blade 源码：`src/View/Components/Value.php`
