# title

## 作用

标题文字组件，用于内容标题、列表项标题、区块标头等。当前 Blade 组件仅明确提供 `size="small"` 这一快捷入口；更大尺寸建议直接使用原生 class。

## Blade / 原生写法

```blade
{{-- trmnl-blade 提供 x-trmnl::title 组件 --}}
{{-- 当前仅 `size="small"` 有明确快捷支持 --}}
<x-trmnl::title size="small">任务名称</x-trmnl::title>
```

```html
<!-- 原生 HTML（推荐直接用 class） -->
<span class="title title--small">任务名称</span>
<span class="title">默认标题</span>
<span class="title title--large">大标题</span>
```

## 关键 props / class / 属性

### Blade props

| prop | 说明 |
|---|---|
| `size="small"` | 等同 `title--small` |

> 其他尺寸暂无对应的快捷 prop，直接在原生 class 上使用。

### 原生 class

| class | 尺寸 |
|---|---|
| `title title--small` | 小（16px / NicoClean） |
| `title` | 默认（26px / BlockKie） |
| `title title--base` | 同默认（用于响应式重置） |
| `title title--large` | 大（30px） |
| `title title--xlarge` | 超大（35px） |
| `title title--xxlarge` | 最大（40px） |

**响应前缀**：`lg:title--base`、`portrait:title--small`

## 注意事项

- Blade 组件只有 `size="small"` 是源码明确支持的快捷写法，其他尺寸直接用 HTML class
- 不要编造 `size="large"` 之类的 prop
- `x-trmnl::title` 不透传任意属性；需要 `data-clamp` 时优先直接写原生 `<span class="title ...">`
- `title--small` 是列表项标题最常用的变体

## 最小示例

```html
<span class="title title--small">任务标题</span>
<span class="title title--large">每日摘要</span>
```

## 来源

- Framework v3 文档：https://trmnl.com/framework/docs/v3/title
- trmnl-blade 源码：`src/View/Components/Title.php`
