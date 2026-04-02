# meta

## 作用

`item` 和 `table` 内的左侧辅助区域，用于放置索引编号（`index`）或空白的颜色强调条。不单独使用。

## Blade / 原生写法

```blade
<x-trmnl::meta>
    <span class="index">1</span>
</x-trmnl::meta>
```

```html
<!-- item 内：空 meta（只显示左侧细条） -->
<div class="item">
    <div class="meta"></div>
    <div class="content">...</div>
</div>

<!-- item 内：带索引编号 -->
<div class="item">
    <div class="meta">
        <span class="index">1</span>
    </div>
    <div class="content">...</div>
</div>

<!-- table 内：索引列 -->
<td>
    <span class="meta">
        <span class="index">1</span>
    </span>
</td>
```

## 关键 class / 属性

| class | 说明 |
|---|---|
| `meta` | 左侧辅助区容器，宽度由 `--item-meta-width`（10px）控制 |
| `index` | 序号文字，放在 `meta` 内 |

- table 使用 `table--indexed` 配合 `meta` > `index` 展示行号列

## 注意事项

- `x-trmnl::meta` 是薄包装；若你需要更复杂结构，直接写原生 HTML 更清晰
- 空 `meta`（无子内容）仍会渲染左侧细条占位
- `item--emphasis-1/2/3` 影响 `meta` 区域的深浅颜色

## 最小示例

```html
<div class="item item--emphasis-2">
    <div class="meta">
        <span class="index">3</span>
    </div>
    <div class="content">
        <span class="title title--small">第三名</span>
        <span class="description">42 分</span>
    </div>
</div>
```

## 来源

- Framework v3 文档：https://trmnl.com/framework/docs/v3/item（item meta 节）
- trmnl-blade 源码：`src/View/Components/Meta.php`
