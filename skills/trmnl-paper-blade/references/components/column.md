# column

## 作用

`columns` 的子组件，代表一列内容。通常直接包含 `item` 列表。

## Blade / 原生写法

```blade
<x-trmnl::columns>
    <x-trmnl::column>
        <!-- 列内容 -->
    </x-trmnl::column>
</x-trmnl::columns>
```

```html
<div class="columns">
    <div class="column">
        <!-- 列内容 -->
    </div>
</div>
```

## 关键 props / class / 属性

- 无独立 props，宽度由父 `columns` 等分决定
- 可在 `column` 上附加 gap 类（如 `gap`、`gap--small`）控制内部间距

## 注意事项

- 必须作为 `columns` 的直接子节点
- 不要在 `column` 内嵌套 `columns`

## 最小示例

```blade
<x-trmnl::columns>
    <x-trmnl::column>
        <div class="item">
            <div class="content">
                <span class="title title--small">标题</span>
            </div>
        </div>
    </x-trmnl::column>
    <x-trmnl::column>
        <div class="item">
            <div class="content">
                <span class="title title--small">标题</span>
            </div>
        </div>
    </x-trmnl::column>
</x-trmnl::columns>
```

## 来源

- trmnl-blade 源码：`src/View/Components/Column.php`
