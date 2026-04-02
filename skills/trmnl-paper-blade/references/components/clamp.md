# clamp

## 作用

文字截断（Clamp 引擎）工具，将文字限制在指定行数内，超出部分显示省略号。Framework v3 推荐直接在真实文字元素上使用 `data-clamp="N"`。

## 用法

### 文字截断（通用）

不需要单独的 Blade 组件，直接在任意文字元素上添加 `data-clamp` 属性：

```html
<!-- 截断为 1 行 -->
<span class="label" data-clamp="1">很长的标题文字，超出后显示省略号...</span>

<!-- 截断为 2 行 -->
<span class="description" data-clamp="2">可以显示两行的说明内容...</span>

<!-- 截断为 3 行 -->
<span class="title" data-clamp="3">允许三行的长标题...</span>
```

### Blade 组件（兼容写法）

```blade
<x-trmnl::clamp lines="2">很长的说明文字</x-trmnl::clamp>
```

## 关键属性

| 属性 | 说明 |
|---|---|
| `data-clamp="N"` | 截断至 N 行，超出显示 `...` |

## 使用场景

- `label`、`description`、`title` 内容过长时防溢出
- `table` 单元格内截断长文本（`data-clamp="1"`）
- `item` 内的 description 限制行数

## 注意事项

- 框架默认**不截断**，必须显式添加 `data-clamp`
- Clamp 引擎基于字宽测量，resize 时会重新计算
- `x-trmnl::clamp` 本质是一个便利包装；若你需要保留原本标签语义，优先直接给真实文字元素加 `data-clamp`

## 最小示例

```html
<!-- 表格单元格 1 行截断 -->
<td>
    <span class="label label--small" data-clamp="1">很长的内容文字</span>
</td>

<!-- item 说明 2 行截断 -->
<span class="description" data-clamp="2">这是一段较长的说明文字，用来描述任务的背景和目的</span>
```

## 来源

- Framework v3 文档：https://trmnl.com/framework/docs/v3/clamp
- trmnl-blade 源码：`src/View/Components/Clamp.php`
