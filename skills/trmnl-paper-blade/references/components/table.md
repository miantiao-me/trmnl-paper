# table

## 作用

结构化数据表格，使用标准 HTML `<table>` 元素配合框架 class。`x-trmnl::table` 组件本身**已输出 `<table>` 标签**，内部直接写 `thead` / `tbody`。适合简单表格；需要 `data-table-limit`、`table--indexed` 等附加属性/类时，优先改用原生 HTML。

## Blade / 原生写法

```blade
{{-- Blade 组件 --}}
<x-trmnl::table size="small">
    <thead>
        <tr>
            <th><span class="title title--small">名称</span></th>
            <th><span class="title title--small">状态</span></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span class="label label--small" data-clamp="1">任务 A</span></td>
            <td><span class="label label--small">进行中</span></td>
        </tr>
    </tbody>
</x-trmnl::table>
```

```html
<!-- 原生 HTML -->
<table class="table table--small" data-table-limit="true">
    <thead>
        <tr>
            <th><span class="title title--small">名称</span></th>
            <th><span class="title title--small">状态</span></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span class="label label--small" data-clamp="1">任务 A</span></td>
            <td><span class="label label--small">进行中</span></td>
        </tr>
    </tbody>
</table>
```

## 关键 props / class / 属性

### Blade prop `size`

| 值 | 原生 class | 行高 |
|---|---|---|
| （默认） | `table` | 46px tbody / 36px thead |
| `base` | `table--base` | 同默认 |
| `large` | `table--large` | 56px / 44px |
| `xlarge` | `table--xlarge` | 72px / 56px |
| `small` | `table--small` | 31px / 24px |
| `xsmall` | `table--xsmall` | 22px / 18px |

### 溢出与截断

- `data-table-limit="true"`：超出高度时隐藏多余行并追加"and X more"（推荐加在原生 `<table>` 上）
- `data-clamp="1"`：单元格内文字截断为 1 行（加在 `label` / `span` 上）

### 索引列

```html
<table class="table table--indexed">
    ...
    <td><span class="meta"><span class="index">1</span></span></td>
```

## 注意事项

- Blade 组件已输出 `<table>`，**内部不要再写 `<table>`**
- 当前 Blade 组件不适合承载 `data-table-limit`、`table--indexed` 等附加属性/类
- 表头用 `title` / `title--small`，单元格用 `label` / `label--small`
- 长文本单元格建议加 `data-clamp="1"` 避免破坏行高

## 最小示例

```blade
<x-trmnl::layout>
    <table class="table table--small" data-table-limit="true">
        <thead>
            <tr>
                <th><span class="title title--small">项目</span></th>
                <th><span class="title title--small">进度</span></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><span class="label label--small" data-clamp="1">官网重构</span></td>
                <td><span class="label label--small">80%</span></td>
            </tr>
        </tbody>
    </table>
</x-trmnl::layout>
```

## 来源

- Framework v3 文档：https://trmnl.com/framework/docs/v3/table
- trmnl-blade 源码：`src/View/Components/Table.php`
