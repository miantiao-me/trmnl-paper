# Stock Price — 股票报价

多支股票报价展示，使用 grid + col--span 布局、value--tnums 等宽数字、data-fit-value 自适应。

来源：https://trmnl.com/framework/examples/stock_price?version=v3

## Full View

```html
<div class="layout layout--col gap--space-between">
  <div class="grid">
    <div class="col--span-2">
      <div class="grid grid--cols-1">
        <div class="item">
          <div class="meta"></div>
          <div class="content">
            <span class="value value--small lg:value--large" data-fit-value="true">AAPL</span>
            <span class="label">Apple Inc.</span>
          </div>
        </div>
        <div class="item">
          <div class="meta"></div>
          <div class="content">
            <span class="value value--small lg:value--large value--tnums" data-fit-value="true">+0.62%</span>
            <span class="label">Daily Change</span>
          </div>
        </div>
      </div>
    </div>
    <div class="item col--span-4">
      <div class="meta"></div>
      <div class="content">
        <span class="value value--xxlarge value--tnums" data-fit-value="true">$226.40</span>
      </div>
    </div>
  </div>
  <div class="divider"></div>
  <div class="grid">
    <div class="col--span-2">
      <div class="grid grid--cols-1">
        <div class="item">
          <div class="meta"></div>
          <div class="content">
            <span class="value value--small lg:value--large" data-fit-value="true">MSFT</span>
            <span class="label">Microsoft Corporation</span>
          </div>
        </div>
        <div class="item">
          <div class="meta"></div>
          <div class="content">
            <span class="value value--small lg:value--large value--tnums" data-fit-value="true">+1.23%</span>
            <span class="label">Daily Change</span>
          </div>
        </div>
      </div>
    </div>
    <div class="item col--span-4">
      <div class="meta"></div>
      <div class="content">
        <span class="value value--xxlarge value--tnums" data-fit-value="true">$420.15</span>
      </div>
    </div>
  </div>
  <div class="divider"></div>
  <div class="grid">
    <div class="col--span-2">
      <div class="grid grid--cols-1">
        <div class="item">
          <div class="meta"></div>
          <div class="content">
            <span class="value value--small lg:value--large" data-fit-value="true">NVDA</span>
            <span class="label">NVIDIA Corporation</span>
          </div>
        </div>
        <div class="item">
          <div class="meta"></div>
          <div class="content">
            <span class="value value--small lg:value--large value--tnums" data-fit-value="true">-2.87%</span>
            <span class="label">Daily Change</span>
          </div>
        </div>
      </div>
    </div>
    <div class="item col--span-4">
      <div class="meta"></div>
      <div class="content">
        <span class="value value--xxlarge value--tnums" data-fit-value="true">$128.50</span>
      </div>
    </div>
  </div>
</div>
<div class="title_bar">
  <img class="image" alt="Stock Prices" src="https://trmnl.com/images/plugins/stock_price--render.svg">
  <span class="title">Stock Prices</span>
  <span class="instance">Stonks Demo (% Change)</span>
</div>
```

### 关键技巧

- `col--span-2` / `col--span-4` 不等比分栏：左侧代号+涨跌幅，右侧大字价格
- `value--tnums` 等宽数字字体，确保同列价格小数点对齐
- `data-fit-value="true"` 自适应字号，防止较长数值溢出
- `grid--cols-1` 内嵌单列 grid 使代号与涨跌幅垂直堆叠
- 每支股票之间用 `divider` 分隔，视觉整齐
