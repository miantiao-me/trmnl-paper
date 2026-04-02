# Weather — 天气看板

多区域天气信息展示，使用 grid 6 列布局 + 响应式图片 + item/value 嵌套。

来源：https://trmnl.com/framework/examples/weather?version=v3

## Full View

```html
<div class="layout layout--col gap--space-between">
  <div class="grid grid--cols-6">
    <div class="row row--center col--span-2 portrait:col--span-6 col--end">
      <img class="w--[22cqw] h--auto portrait:w--auto portrait:h--[40cqh] lg:w--[28cqw] lg:h--[28cqw] lg:portrait:w--auto lg:portrait:h--[33cqh]" src="https://trmnl.com/images/plugins/weather/wi-day-sunny.svg">
    </div>
    <div class="col col--span-2 portrait:col--span-3 col--end">
      <div class="item grow">
        <div class="meta"></div>
        <div class="content">
          <span class="value value--xxxlarge lg:value--giga" data-fit-value="true">77°</span>
          <span class="label">Temperature ( 9:39 PM)</span>
        </div>
      </div>
    </div>
    <div class="col col--span-2 portrait:col--span-3 col--end gap--medium">
      <div class="item">
        <div class="meta"></div>
        <div class="icon">
          <img class="w--[6cqw] h--[6cqw] portrait:w--[10cqw] portrait:h--[10cqw]" alt="Temperature" src="https://trmnl.com/images/plugins/weather/wi-thermometer.svg">
        </div>
        <div class="content">
          <span class="value value--xsmall lg:value--large">80°</span>
          <span class="label">Feels Like</span>
        </div>
      </div>
      <div class="item">
        <div class="meta"></div>
        <div class="icon">
          <img class="w--[6cqw] h--[6cqw] portrait:w--[10cqw] portrait:h--[10cqw]" alt="Humidity" src="https://trmnl.com/images/plugins/weather/wi-raindrops.svg">
        </div>
        <div class="content">
          <span class="value value--xsmall lg:value--large">45%</span>
          <span class="label">Humidity</span>
        </div>
      </div>
      <div class="item">
        <div class="meta"></div>
        <div class="icon">
          <img class="w--[6cqw] h--[6cqw] portrait:w--[10cqw] portrait:h--[10cqw]" src="https://trmnl.com/images/plugins/weather/wi-day-sunny.svg">
        </div>
        <div class="content">
          <span class="value value--xsmall lg:value--base">Sunny</span>
          <span class="label">Right Now</span>
        </div>
      </div>
    </div>
  </div>
  <div class="divider"></div>
  <div class="grid">
    <div class="col gap--large">
      <div class="grid">
        <div class="item col--span-3 grow">
          <div class="meta"></div>
          <div class="icon">
            <img class="w--[6cqw] h--[6cqw] portrait:w--[10cqw] portrait:h--[10cqw]" alt="Today weather condition" src="https://trmnl.com/images/plugins/weather/wi-day-cloudy.svg">
          </div>
          <div class="content">
            <span class="value value--xsmall lg:value--base">Partly cloudy</span>
            <span class="label">Apr 1</span>
          </div>
        </div>
        <div class="item col--span-3 grow">
          <div class="meta"></div>
          <div class="icon portrait:hidden">
            <img class="w--[6cqw] h--[6cqw] portrait:w--[10cqw] portrait:h--[10cqw]" alt="UV Index" src="https://trmnl.com/images/plugins/weather/wi-hot.svg">
          </div>
          <div class="content">
            <span class="value value--xsmall lg:value--base">High (8)</span>
            <span class="label">UV</span>
          </div>
        </div>
        <div class="row col--span-3 grow">
          <div class="item">
            <div class="meta"></div>
            <div class="icon portrait:hidden">
              <img class="w--[6cqw] h--[6cqw] portrait:w--[10cqw] portrait:h--[10cqw]" alt="Temperature" src="https://trmnl.com/images/plugins/weather/wi-thermometer.svg">
            </div>
            <div class="content">
              <div class="flex flex--row gap--xlarge portrait:gap">
                <div class="content">
                  <span class="value value--xsmall lg:value--base">70°</span>
                  <span class="label">Low</span>
                </div>
                <div class="content">
                  <span class="value value--xsmall lg:value--base">86°</span>
                  <span class="label">High</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid">
        <div class="item col--span-3 grow">
          <div class="meta"></div>
          <div class="icon">
            <img class="w--[6cqw] h--[6cqw] portrait:w--[10cqw] portrait:h--[10cqw]" alt="Tomorrow weather condition" src="https://trmnl.com/images/plugins/weather/wi-day-showers.svg">
          </div>
          <div class="content">
            <span class="value value--xsmall lg:value--base">Light Rain</span>
            <span class="label">Apr 2</span>
          </div>
        </div>
        <div class="item col--span-3 grow">
          <div class="meta"></div>
          <div class="icon portrait:hidden">
            <img class="w--[6cqw] h--[6cqw] portrait:w--[10cqw] portrait:h--[10cqw]" alt="UV Index" src="https://trmnl.com/images/plugins/weather/wi-hot.svg">
          </div>
          <div class="content">
            <span class="value value--xsmall lg:value--base">Moderate (5)</span>
            <span class="label">UV</span>
          </div>
        </div>
        <div class="row col--span-3 grow">
          <div class="item">
            <div class="meta"></div>
            <div class="icon portrait:hidden">
              <img class="w--[6cqw] h--[6cqw] portrait:w--[10cqw] portrait:h--[10cqw]" alt="Temperature" src="https://trmnl.com/images/plugins/weather/wi-thermometer.svg">
            </div>
            <div class="content">
              <div class="flex flex--row gap--xlarge portrait:gap">
                <div class="content">
                  <span class="value value--xsmall lg:value--base">65°</span>
                  <span class="label">Low</span>
                </div>
                <div class="content">
                  <span class="value value--xsmall lg:value--base">79°</span>
                  <span class="label">High</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="title_bar">
  <img class="image" alt="" src="https://trmnl.com/images/plugins/weather--render.svg">
  <h1 class="title">Weather</h1>
  <span class="instance">Las Vegas</span>
</div>
```

### 关键技巧

- `grid--cols-6` + `col--span-2` 实现三栏等分布局
- `portrait:col--span-6` / `portrait:col--span-3` 响应式前缀适配竖屏排列
- `data-fit-value="true"` 主温度值自适应字号
- `icon` div 配合 `cqw/cqh` 容器查询单位，使气象图标随容器等比缩放
- `row--center col--end` 使天气图标区垂直居中并底部对齐
- `portrait:hidden` 在竖屏下隐藏非关键图标，保持简洁
