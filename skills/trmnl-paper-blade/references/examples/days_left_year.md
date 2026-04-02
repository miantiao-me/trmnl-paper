# Days Left This Year — 年度进度

KPI 数值 + JS 动态生成的热力图式年度日历，展示自定义 CSS grid 与 JS 交互。

来源：https://trmnl.com/framework/examples/days_left_year?version=v3

## Full View

```html
<div class="layout layout--col gap--large lg:gap--xxlarge p--8 lg:p--16">
  <div class="grid grid--cols-10">
    <div class="col col--span-1"></div>
    <div class="col col--span-4">
      <div class="item">
        <div class="meta"></div>
        <div class="content text--center">
          <span class="value value--xxxlarge days_passed" data-value-fit="true">value</span>
          <span class="label">Days Passed</span>
        </div>
      </div>
    </div>
    <div class="col col--span-4">
      <div class="item">
        <div class="meta"></div>
        <div class="content text--center">
          <span class="value value--xxxlarge days_left" data-value-fit="true">value</span>
          <span class="label">Days Left</span>
        </div>
      </div>
    </div>
    <div class="col col--span-1"></div>
  </div>
  <div id="days_left" data-today="2025-09-15T10:29:35+05:30"></div>
</div>
<div class="title_bar">
  <img class="image" alt="" src="https://trmnl.com/images/plugins/days_left_year--render.svg">
  <span class="title">Days Left This Year</span>
  <span class="instance">2026</span>
</div>
```

## Shared CSS

```css
#days_left {
  --rows: 7;
  --cols: 53;
  --gap: 3px;
  width: 100%;
  height: 100%;
  flex: 1 1 0;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(var(--cols), round(down, calc((100% - (var(--cols) - 1) * var(--gap)) / var(--cols)), 1px));
  grid-template-rows: repeat(var(--rows), round(down, calc((100% - (var(--rows) - 1) * var(--gap)) / var(--rows)), 1px));
  grid-auto-flow: column;
  gap: var(--gap);
}

#days_left .day {
  height: 100%;
  margin: 0;
  border-radius: 4px;
}
```

### 关键技巧

- `grid--cols-10` + `col--span-1` 空列实现居中留白
- `data-value-fit="true"` 自适应字号
- JS 通过 `data-today` 属性获取当前日期，动态生成 `.day` 元素
- 使用 v3 灰度 token：`bg--gray-4`（已过）、`bg--gray-5`（未来）、`bg--black`（当天）
- `2bit:bg--gray-50` / `2bit:bg--gray-65` 为 2bit 设备提供专用灰度
