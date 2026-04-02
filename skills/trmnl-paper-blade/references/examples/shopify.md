# Shopify — 电商数据看板

KPI 指标 + Highcharts 图表的混合布局，展示 grid 嵌套、data-value-type 值类型标注、图表集成。

来源：https://trmnl.com/framework/examples/shopify?version=v3

## Full View

```html
<div class="layout layout--col gap">
  <div class="grid">
    <div class="row">
      <div class="grid portrait:grid--cols-8 portrait:gap">
        <div class="item col--span-2 portrait:col--span-8">
          <div class="meta"></div>
          <div class="content">
            <span class="value value--large lg:value--xxlarge value--tnums" data-value-type="number">$159,022</span>
            <span class="label">Total Sales</span>
          </div>
        </div>
        <div class="item col--span-1 portrait:col--span-4">
          <div class="meta"></div>
          <div class="content">
            <span class="value value--small lg:value--base value--tnums" data-value-type="number">763</span>
            <span class="label">Pending Orders</span>
          </div>
        </div>
        <div class="item col--span-1 portrait:col--span-4">
          <div class="meta"></div>
          <div class="content">
            <span class="value value--small lg:value--base value--tnums" data-value-type="date">
              <div class="w--14 h--1.5 mb--2 bg--black" style="border-radius: 20px;"></div>
              Dec 01 -
                    Dec 31
            </span>
            <span class="label">Current</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="divider"></div>
  <div class="grid">
    <div class="row">
      <div class="grid portrait:grid--cols-8 portrait:gap">
        <div class="item col--span-2 portrait:col--span-8">
          <div class="meta"></div>
          <div class="content">
            <span class="value lg:value--base value--tnums" data-value-type="number">$156</span>
            <span class="label">AOV</span>
          </div>
        </div>
        <div class="item col--span-1 portrait:col--span-4">
          <div class="meta"></div>
          <div class="content">
            <span class="value value--small lg:value--base value--tnums" data-value-type="number">254</span>
            <span class="label">Fulfilled Orders</span>
          </div>
        </div>
        <div class="item col--span-1 portrait:col--span-4">
          <div class="meta"></div>
          <div class="content">
            <span class="value value--small lg:value--base value--tnums" data-value-type="date">
              <div class="w--14 h--1.5 mb--2 bg--gray-5"></div>
              Nov 01 -
                  Nov 30
            </span>
            <span class="label">Comparison</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="https://trmnl.com/js/highcharts/12.3.0/highcharts.js"></script>
  <script src="https://trmnl.com/js/highcharts/12.3.0/highcharts-more.js"></script>
  <script src="https://trmnl.com/js/highcharts/12.3.0/pattern-fill.js"></script>
  <div id="chart-6e0010b4f3a0" class="w--full grow"></div>
  <script type="text/javascript">/* Highcharts config omitted */</script>
</div>
<div class="title_bar">
  <img class="image" alt="" src="https://trmnl.com/images/plugins/shopify--render.svg">
  <span class="title">Shopify</span>
  <span class="instance">trmnl.com</span>
</div>
```

### 关键技巧

- `data-value-type="number"` / `data-value-type="date"` 标注值的类型，供 Format Values Engine 处理
- `value--tnums` 启用等宽数字（tabular numbers）
- Highcharts 图表通过 `<script>` 引入并挂载到 `<div id="chart-...">` 容器
- `portrait:grid--cols-8` 竖屏模式下重排列数
- `bg--gray-5` 用于图例色块（旧版灰度 token，新代码建议用 `bg--gray-50`）
