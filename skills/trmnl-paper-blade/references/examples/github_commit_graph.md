# GitHub Commit Graph — GitHub 提交热力图

贡献统计 KPI + 53×7 热力图，使用自定义 CSS grid 与灰度 token 映射提交密度。

来源：https://trmnl.com/framework/examples/github_commit_graph?version=v3

## Full View

```html
<div class="layout layout--col gap">
  <div class="grid grid--cols-2">
    <div class="item">
      <div class="meta"></div>
      <div class="content">
        <span class="value value--xxxlarge" data-value-fit="true" data-value-format="true">10004</span>
        <span class="label mt--2">Contributions in last year</span>
      </div>
    </div>
    <div class="flex flex--col gap--medium">
      <div class="grid grid--cols-2">
        <div class="item">
          <div class="meta"></div>
          <div class="content">
            <span class="value lg:value--xlarge">19</span>
            <span class="label">Longest streak</span>
          </div>
        </div>
        <div class="item">
          <div class="meta"></div>
          <div class="content">
            <span class="value lg:value--xlarge">3</span>
            <span class="label">Current streak</span>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="grid grid--cols-2">
        <div class="item">
          <div class="meta"></div>
          <div class="content">
            <span class="value lg:value--xlarge">27</span>
            <span class="label">Most in a day</span>
          </div>
        </div>
        <div class="item">
          <div class="meta"></div>
          <div class="content">
            <span class="value lg:value--xlarge">2.45</span>
            <span class="label">Average per day</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="divider"></div>
  <div id="github_commit_graph" style="--columns: 53">
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day 1bit:bg--gray-35 bg--gray-40"></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-25 bg--gray-30"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-30 bg--gray-35"></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day 1bit:bg--gray-30 bg--gray-35"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day 1bit:bg--gray-25 bg--gray-30"></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day 1bit:bg--gray-30 bg--gray-35"></span>
    <span class="day 1bit:bg--gray-40 bg--gray-50"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-20 bg--gray-20"></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-35 bg--gray-40"></span>
    <span class="day 1bit:bg--gray-40 bg--gray-50"></span>
    <span class="day 1bit:bg--gray-15 bg--gray-15"></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day bg--black"></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-35 bg--gray-40"></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day 1bit:bg--gray-40 bg--gray-50"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-25 bg--gray-30"></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day 1bit:bg--gray-30 bg--gray-35"></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-40 bg--gray-50"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day 1bit:bg--gray-40 bg--gray-50"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day 1bit:bg--gray-10 bg--gray-10"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-25 bg--gray-30"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-40 bg--gray-50"></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day bg--black"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-35 bg--gray-40"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-35 bg--gray-40"></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day 1bit:bg--gray-40 bg--gray-50"></span>
    <span class="day 1bit:bg--gray-40 bg--gray-50"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day 1bit:bg--gray-35 bg--gray-40"></span>
    <span class="day 1bit:bg--gray-40 bg--gray-50"></span>
    <span class="day bg--black"></span>
    <span class="day 1bit:bg--gray-35 bg--gray-40"></span>
    <span class="day 1bit:bg--gray-25 bg--gray-30"></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day 1bit:bg--gray-30 bg--gray-35"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-30 bg--gray-35"></span>
    <span class="day 1bit:bg--gray-40 bg--gray-50"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day 1bit:bg--gray-30 bg--gray-35"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-30 bg--gray-35"></span>
    <span class="day 1bit:bg--gray-30 bg--gray-35"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day 1bit:bg--gray-40 bg--gray-50"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day 1bit:bg--gray-40 bg--gray-50"></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day 1bit:bg--gray-40 bg--gray-50"></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-35 bg--gray-40"></span>
    <span class="day 1bit:bg--gray-30 bg--gray-35"></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day 1bit:bg--gray-30 bg--gray-35"></span>
    <span class="day 1bit:bg--gray-30 bg--gray-35"></span>
    <span class="day 1bit:bg--gray-30 bg--gray-35"></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day 1bit:bg--gray-40 bg--gray-50"></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day 1bit:bg--gray-25 bg--gray-30"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-15 bg--gray-15"></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-40 bg--gray-50"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day 1bit:bg--gray-25 bg--gray-30"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day 1bit:bg--gray-40 bg--gray-50"></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-35 bg--gray-40"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-40 bg--gray-50"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day 1bit:bg--gray-40 bg--gray-50"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day 1bit:bg--gray-15 bg--gray-15"></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day 1bit:bg--gray-35 bg--gray-40"></span>
    <span class="day 1bit:bg--gray-15 bg--gray-15"></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day 1bit:bg--gray-30 bg--gray-35"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-20 bg--gray-20"></span>
    <span class="day 1bit:bg--gray-30 bg--gray-35"></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-60 bg--gray-75"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-30 bg--gray-35"></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-15 bg--gray-15"></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-50 bg--gray-65"></span>
    <span class="day "></span>
    <span class="day 1bit:bg--gray-45 bg--gray-60"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day 1bit:bg--gray-55 bg--gray-70"></span>
    <span class="day "></span>
    <span class="day "></span>
  </div>
</div>
<div class="title_bar">
  <img class="image" alt="" src="https://trmnl.com/images/plugins/github--render.svg">
  <span class="title">GitHub</span>
  <span class="instance">@ryanckulp</span>
</div>
```

## Shared CSS

```css
.trmnl #github_commit_graph {
  --rows: 7;
  --columns: 52;
  --gap: 3px;
  width:100%;
  height:100%;
  padding:0px;
  flex:1 1 0;
  justify-content:center;
  display:grid;
  grid-template-columns:repeat(var(--columns), round(down, (100% - var(--gap) * (var(--columns) - 1)) / var(--columns), 1px));
  grid-template-rows:repeat(var(--rows), round(down, (100% - var(--gap) * (var(--rows) - 1)) / var(--rows), 1px));
  grid-auto-flow:column;
  gap:var(--gap);
}

.trmnl #github_commit_graph .day {
  display:block;
  border-radius:4px;
  width:100%;
  height:100%;
}

.trmnl .view--quadrant #github_commit_graph {
  --gap: 1px;
}

.trmnl .view--half_vertical #github_commit_graph {
  --gap: 1px;
}

.trmnl .view--half_horizontal #github_commit_graph {
  --gap: 2px;
}

.trmnl .view--full #github_commit_graph {
  --gap: 3px;
}
```

### 关键技巧

- `grid--cols-2` 将 KPI 统计区与热力图区并排
- `id="github_commit_graph"` + `style="--columns: 53"` 通过 CSS 变量控制图表列数
- `1bit:bg--gray-*` / `bg--gray-*` 两套灰度 token 分别适配 1bit 与彩色设备，映射提交密度
- `bg--black` 标记当天格子（最高亮）
- `data-value-fit="true"` + `data-value-format="true"` 自适应字号并添加千位分隔符
- Shared CSS 用 `.view--*` 前缀按视图尺寸调整 gap，避免小尺寸格子过密
