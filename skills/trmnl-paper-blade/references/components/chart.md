# chart

## 作用

在 TRMNL 屏幕上渲染折线图、柱状图、仪表盘等图表。使用 JS 图表库（Highcharts / Chartkick），通过 `<div id="chart-xxx">` 作为挂载点。

> **注意**：这是框架能力 + 原生 HTML + JS 用法，**不是** trmnl-blade 的 Blade 组件。无 `<x-trmnl::chart>` 可用。

## 原生写法

```html
<!-- 1. 引入库（Highcharts 推荐） -->
<script src="https://trmnl.com/js/highcharts/12.3.0/highcharts.js"></script>
<script src="https://trmnl.com/js/chartkick/5.0.1/chartkick.min.js"></script>

<!-- 2. 挂载容器 -->
<div id="my-chart" class="w--full"></div>

<!-- 3. 初始化（关键：禁用动画） -->
<script>
new Chartkick["LineChart"]("my-chart", data, {
    adapter: "highcharts",
    colors: ["black"],
    library: {
        chart: { height: 260, backgroundColor: "transparent" },
        plotOptions: { series: { animation: false } }
    }
});
</script>
```

## 关键配置要点

| 配置 | 说明 |
|---|---|
| `animation: false` | **必须禁用**，截图渲染服务无法捕获动画中间帧 |
| `backgroundColor: "transparent"` | 透明背景，融合屏幕色 |
| `colors: ["black"]` | 1-bit 显示只用黑色 |
| `height: null` / 固定值 | `null` 自动填满容器；或指定像素 |
| 灰度 pattern | 多系列用 `https://trmnl.com/images/grayscale/gray-N.png` 填充 |

## 注意事项

- 所有动画必须关闭（`animation: false`）
- 多系列图使用灰度点阵图案区分（`pattern-fill.js`）
- 图表通常放在 `layout layout--col gap--space-between` 内，顶部展示 KPI 数据，底部放图表容器
- 确保图表加载在截图之前完成（监听 `chartkick:load`）

## 最小示例（折线图）

```html
<script src="https://trmnl.com/js/highcharts/12.3.0/highcharts.js"></script>
<script src="https://trmnl.com/js/chartkick/5.0.1/chartkick.min.js"></script>

<div class="layout layout--col gap--space-between">
    <div class="item">
        <div class="meta"></div>
        <div class="content">
            <span class="value value--tnums">1,234</span>
            <span class="label">访问量</span>
        </div>
    </div>
    <div id="visits-chart" class="w--full"></div>
</div>

<script>
var data = [["2024-01-01", 400], ["2024-01-02", 600], ["2024-01-03", 500]];
function initChart() {
    new Chartkick["LineChart"]("visits-chart", data, {
        adapter: "highcharts",
        colors: ["black"],
        library: {
            chart: { height: 200, backgroundColor: "transparent" },
            plotOptions: { series: { animation: false, lineWidth: 3 } }
        }
    });
}
if ("Chartkick" in window) { initChart(); }
else { window.addEventListener("chartkick:load", initChart, true); }
</script>
```

## 来源

- Framework v3 文档：https://trmnl.com/framework/docs/v3/chart
- Highcharts：https://highcharts.com
- Chartkick：https://chartkick.com
