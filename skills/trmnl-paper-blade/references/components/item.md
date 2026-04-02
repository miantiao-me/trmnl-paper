# item

## 作用

列表条目容器，用于日程、事件、待办等结构化列表内容。由 `meta`（可选，左侧细条/索引区域）+ 可选 `icon` + `content`（主体）组成。

## Blade / 原生写法

```blade
{{-- 基础 item 可用 Blade 组件 --}}
<x-trmnl::item>
    <div class="meta"></div>
    <div class="content">
        <span class="title title--small">任务标题</span>
        <span class="description">描述文字</span>
    </div>
</x-trmnl::item>
```

```html
<!-- 基础结构（带 meta 区域） -->
<div class="item">
    <div class="meta"></div>
    <div class="content">
        <span class="title title--small">任务标题</span>
        <span class="description">描述文字</span>
    </div>
</div>

<!-- 带索引编号 -->
<div class="item">
    <div class="meta">
        <span class="index">1</span>
    </div>
    <div class="content">
        <span class="title title--small">第一条</span>
    </div>
</div>

<!-- 带图标 -->
<div class="item">
    <div class="meta"></div>
    <div class="icon">
        <img src="/icons/weather.svg" class="w--[6cqw] h--[6cqw]" />
    </div>
    <div class="content">
        <span class="value value--small">72°</span>
        <span class="label">温度</span>
    </div>
</div>
```

## 关键 props / class / 属性

### 变体 class

| class | 说明 |
|---|---|
| `item` | 基础条目 |
| `item--emphasis-1` | 左侧 meta 条 - 浅色强调 |
| `item--emphasis-2` | 左侧 meta 条 - 中等强调 |
| `item--emphasis-3` | 左侧 meta 条 - 深色强调 |

### 子结构

- `meta`：左侧细条区域，可包含 `span.index`（编号）
- `icon`：图标区域（可选）
- `content`：主体，包含 `title`、`description`、`label` 等

## 注意事项

- `x-trmnl::item` 是基础包装；若需要 `item--emphasis-*` 等额外 class，优先直接写原生 HTML
- 无 meta 时可省略 `<div class="meta"></div>`（简洁变体）
- `index` 在 `meta` 内，显示序号
- `item` 通常配合 `columns` / `flex` 列表使用

## 最小示例

```html
<div class="item item--emphasis-2">
    <div class="meta"></div>
    <div class="content">
        <span class="title title--small">每日站会</span>
        <span class="description">10:00 AM</span>
        <div class="flex gap--small">
            <span class="label label--small label--outline">已确认</span>
        </div>
    </div>
</div>
```

## 来源

- Framework v3 文档：https://trmnl.com/framework/docs/v3/item
- trmnl-blade 源码：`src/View/Components/Item.php`
