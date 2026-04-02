# label

## 作用

行内文字标签，用于状态标记、标签、次要说明文字。支持多种外观变体（轮廓、下划线、填充等）和五档尺寸。

## Blade / 原生写法

```blade
{{-- trmnl-blade 提供 x-trmnl::label 组件 --}}
<x-trmnl::label variant="outline" size="small">已确认</x-trmnl::label>
```

```html
<!-- 原生 HTML -->
<span class="label label--small label--outline">已确认</span>
```

## 关键 props / class / 属性

### Blade props

| prop | 可选值 |
|---|---|
| `variant` | `outline`、`underline`、`gray`、`filled`、`primary`、`success`、`error`、`warning` |
| `size` | `small`、`base`（默认）、`large`、`xlarge`、`xxlarge` |

### 原生 class

**变体**：
- `label--outline`：带边框
- `label--underline`：下划线
- `label--gray`：灰色（弱化）
- `label--filled`：黑色背景填充
- `label--primary` / `label--success` / `label--error` / `label--warning`：语义色

**尺寸**：`label--small` / `label--large` / `label--xlarge` / `label--xxlarge`

**截断**：`data-clamp="1"` 或 `data-clamp="2"`

**响应前缀**：`lg:label--xlarge`、`portrait:label--small`、`1bit:label--filled`

### 兼容别名

- `label--gray-out` → `label--gray`（已弃用但有效）
- `label--inverted` → `label--filled`（已弃用但有效）

## 注意事项

- 默认无背景、无边框（纯文字）
- `label--filled` 使用黑色背景；语义色变体（`primary` 等）用对应颜色 token
- 默认不截断，可能溢出时显式加 `data-clamp`

## 最小示例

```html
<span class="label label--small label--outline">待处理</span>
<span class="label label--small label--filled">已完成</span>
<span class="label label--small label--error">失败</span>
```

## 来源

- Framework v3 文档：https://trmnl.com/framework/docs/v3/label
- trmnl-blade 源码：`src/View/Components/Label.php`
