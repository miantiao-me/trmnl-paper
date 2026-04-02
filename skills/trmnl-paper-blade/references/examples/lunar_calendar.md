# Lunar Calendar — 月相日历

丰富的视觉信息展示，使用 flex 自定义布局、grid--row 水平排列、图片序列、label--inverted 高亮当前项。

来源：https://trmnl.com/framework/examples/lunar_calendar?version=v3

## Full View

```html
<div class="layout layout--col gap--space-between">
  <div class="grid portrait:grid--cols-8 portrait:gap--xlarge">
    <div class="item col--span-4 portrait:col--span-8">
      <div class="meta"></div>
      <div class="content">
        <span class="value lg:value--xlarge" data-value-fit="true" data-value-fit-max-height="140px">Full Moon</span>
        <span class="label">Current Phase</span>
      </div>
    </div>
    <div class="item col--span-2 portrait:col--span-4">
      <div class="meta"></div>
      <div class="content">
        <span class="value value--xsmall lg:value--base">99.8%</span>
        <span class="label">Moon Illumination</span>
      </div>
    </div>
    <div class="item col--span-2 portrait:col--span-4">
      <div class="meta"></div>
      <div class="content">
        <span class="value value--xsmall lg:value--base">15.0</span>
        <span class="label">Lunar Age</span>
      </div>
    </div>
  </div>
  <div class="divider"></div>
  <div class="flex flex--col w--full gap--large rounded--large">
    <div class="grid grid--row grid--top">
      <div class="flex flex--row flex--center">
        <span class="label label--small ">Jan 7</span>
      </div>
      <div class="flex flex--row flex--center">
        <span class="label label--small ">Jan 10</span>
      </div>
      <div class="flex flex--row flex--center">
        <span class="label label--small ">Jan 12</span>
      </div>
      <div class="flex flex--row flex--center">
        <span class="label label--small label--inverted">Jan 13</span>
      </div>
      <div class="flex flex--row flex--center">
        <span class="label label--small ">Jan 15</span>
      </div>
      <div class="flex flex--row flex--center">
        <span class="label label--small ">Jan 20</span>
      </div>
      <div class="flex flex--row flex--center">
        <span class="label label--small ">Jan 24</span>
      </div>
    </div>
    <div class="grid grid--row grid--center">
      <div class="flex flex--row flex--center">
        <img class="image w--min-[12cqw] h--min-[12cqw] lg:w--min-[14cqw] lg:h--min-[14cqw]" alt="Moon phase" src="https://trmnl.com/images/plugins/lunar_calendar/wi-moon-alt-waxing-crescent-3.svg">
      </div>
      <div class="flex flex--row flex--center">
        <img class="image w--min-[12cqw] h--min-[12cqw] lg:w--min-[14cqw] lg:h--min-[14cqw]" alt="Moon phase" src="https://trmnl.com/images/plugins/lunar_calendar/wi-moon-alt-first-quarter.svg">
      </div>
      <div class="flex flex--row flex--center">
        <img class="image w--min-[12cqw] h--min-[12cqw] lg:w--min-[14cqw] lg:h--min-[14cqw]" alt="Moon phase" src="https://trmnl.com/images/plugins/lunar_calendar/wi-moon-alt-waxing-gibbous-3.svg">
      </div>
      <div class="flex flex--row flex--center">
        <img class="image w--min-[14cqw] h--min-[14cqw] lg:w--min-[16cqw] lg:h--min-[16cqw]" alt="Moon phase" src="https://trmnl.com/images/plugins/lunar_calendar/wi-moon-alt-full.svg">
      </div>
      <div class="flex flex--row flex--center">
        <img class="image w--min-[12cqw] h--min-[12cqw] lg:w--min-[14cqw] lg:h--min-[14cqw]" alt="Moon phase" src="https://trmnl.com/images/plugins/lunar_calendar/wi-moon-alt-waning-gibbous-3.svg">
      </div>
      <div class="flex flex--row flex--center">
        <img class="image w--min-[12cqw] h--min-[12cqw] lg:w--min-[14cqw] lg:h--min-[14cqw]" alt="Moon phase" src="https://trmnl.com/images/plugins/lunar_calendar/wi-moon-alt-third-quarter.svg">
      </div>
      <div class="flex flex--row flex--center">
        <img class="image w--min-[12cqw] h--min-[12cqw] lg:w--min-[14cqw] lg:h--min-[14cqw]" alt="Moon phase" src="https://trmnl.com/images/plugins/lunar_calendar/wi-moon-alt-waning-crescent-3.svg">
      </div>
    </div>
    <div class="grid grid--row grid--top">
      <div class="flex flex--row flex--center">
        <span class="label label--small text--center ">Waxing Crescent</span>
      </div>
      <div class="flex flex--row flex--center">
        <span class="label label--small text--center ">First Quarter</span>
      </div>
      <div class="flex flex--row flex--center">
        <span class="label label--small text--center ">Waxing Gibbous</span>
      </div>
      <div class="flex flex--row flex--center">
        <span class="label label--small text--center label--inverted">Full Moon</span>
      </div>
      <div class="flex flex--row flex--center">
        <span class="label label--small text--center ">Waning Gibbous</span>
      </div>
      <div class="flex flex--row flex--center">
        <span class="label label--small text--center ">Third Quarter</span>
      </div>
      <div class="flex flex--row flex--center">
        <span class="label label--small text--center ">Waning Crescent</span>
      </div>
    </div>
  </div>
  <div class="divider"></div>
  <div class="grid portrait:grid--cols-8 portrait:gap--xlarge">
    <div class="item col--span-4 portrait:col--span-8">
      <div class="meta"></div>
      <div class="content">
        <span class="value value--xsmall lg:value--base">Waning Gibbous</span>
        <span class="label">Next Phase (January 15)</span>
      </div>
    </div>
    <div class="item col--span-2 portrait:col--span-4">
      <div class="meta"></div>
      <div class="content">
        <span class="value value--xsmall lg:value--base">February 11</span>
        <span class="label">Next Full Moon</span>
      </div>
    </div>
    <div class="item col--span-2 portrait:col--span-4">
      <div class="meta"></div>
      <div class="content">
        <span class="value value--xsmall lg:value--base">January 28</span>
        <span class="label">Next New Moon</span>
      </div>
    </div>
  </div>
</div>
<div class="title_bar">
  <img class="image" alt="" src="https://trmnl.com/images/plugins/lunar_calendar--render.svg">
  <span class="title">Lunar Calendar</span>
  <span class="instance">Moon Phases</span>
</div>
```

### 关键技巧

- `label--inverted` 反色高亮当前月相
- `grid--row` + `grid--top` / `grid--center` 控制行内元素对齐
- `data-value-fit="true"` + `data-value-fit-max-height` 限制大字体最大高度
- `w--min-[Ncqw]` / `h--min-[Ncqh]` 容器查询单位用于响应式图片尺寸
