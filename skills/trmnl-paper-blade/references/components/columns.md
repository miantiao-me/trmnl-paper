# columns

## 作用

用于同类型数据的多列布局。自动分配条目到各列，处理溢出（显示"还有 X 条"），适合列表、日程等不确定数量的内容。严格对齐或固定列宽请用 `grid`。

## Blade / 原生写法

```blade
{{-- Blade 组件 --}}
<x-trmnl::columns>
    <x-trmnl::column>
        <!-- 列内容 -->
    </x-trmnl::column>
    <x-trmnl::column>
        <!-- 列内容 -->
    </x-trmnl::column>
</x-trmnl::columns>
```

```html
<!-- 原生 HTML -->
<div class="columns">
    <div class="column">...</div>
    <div class="column">...</div>
    <div class="column">...</div>
</div>
```

## 关键 props / class / 属性

- `columns`：父容器，等分所有 `column`
- `column`：单列，直接包含条目内容
- 列数由 DOM 中 `column` 的数量决定，无需手动设置列宽

## 注意事项

- 放在 `layout` 内部
- 列数量固定（你写几个 `column` 就有几列）
- 溢出条目会被隐藏并附加"and X more"提示（需配合 Overflow 引擎）
- 与 `grid` 的区别：`columns` 用于同质列表，不需要跨列对齐；`grid` 用于精确对齐结构

## 最小示例

```blade
<x-trmnl::layout>
    <x-trmnl::columns>
        <x-trmnl::column>
            <div class="item">
                <div class="content">
                    <span class="title title--small">任务 A</span>
                    <span class="description">描述</span>
                </div>
            </div>
        </x-trmnl::column>
        <x-trmnl::column>
            <div class="item">
                <div class="content">
                    <span class="title title--small">任务 B</span>
                    <span class="description">描述</span>
                </div>
            </div>
        </x-trmnl::column>
    </x-trmnl::columns>
</x-trmnl::layout>
```

## 来源

- Framework v3 文档：https://trmnl.com/framework/docs/v3/columns
- trmnl-blade 源码：`src/View/Components/Columns.php`、`Column.php`
