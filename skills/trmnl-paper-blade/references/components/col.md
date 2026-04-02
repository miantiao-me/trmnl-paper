# col

## 作用

`grid` 的子组件，表示网格内的一列/单元格。可控制跨列数和垂直对齐。

## Blade / 原生写法

```blade
<x-trmnl::grid cols="3">
    <x-trmnl::col span="2" position="center">
        内容
    </x-trmnl::col>
    <x-trmnl::col span="1">
        内容
    </x-trmnl::col>
</x-trmnl::grid>
```

```html
<div class="grid grid--cols-3">
    <div class="col col--span-2 col--center">内容</div>
    <div class="col col--span-1">内容</div>
</div>
```

## 关键 props / class / 属性

| Blade prop | 原生 class | 说明 |
|---|---|---|
| `span="N"` | `col--span-N` | 跨 N 个网格列（N 可为 1~12） |
| `position="start"` | `col--start` | 内容顶部对齐 |
| `position="center"` | `col--center` | 内容垂直居中 |
| `position="end"` | `col--end` | 内容底部对齐 |

## 注意事项

- 必须作为 `grid` 的直接子节点
- 所有 `col--span-N` 之和应等于父 `grid--cols-N`

## 最小示例

```blade
<x-trmnl::grid cols="4">
    <x-trmnl::col span="3">主区域</x-trmnl::col>
    <x-trmnl::col span="1">侧边</x-trmnl::col>
</x-trmnl::grid>
```

## 来源

- trmnl-blade 源码：`src/View/Components/Col.php`
