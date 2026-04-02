# Wikipedia Articles — 富文本阅读

富文本内容展示，使用 richtext + data-content-limiter 自动截断、data-pixel-perfect 字体优化。

来源：https://trmnl.com/framework/examples/wiki_random_article?version=v3

## Full View

```html
<div class="layout">
  <div class="columns">
    <div class="column">
      <div class="richtext richtext--center gap--large">
        <span class="title" data-pixel-perfect="true">First Time Around</span>
        <div class="content" data-content-limiter="true">
          <p>
            <i><b>First Time Around</b></i>
            is a one-disk DVD by Randy Bachman and Burton Cummings recorded in 2006 at CBC Studios in Toronto, Canada...
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="title_bar">
  <img class="image" alt="" src="https://trmnl.com/images/plugins/wikipedia--render.svg">
  <span class="title">Wikipedia</span>
  <span class="instance">Article of the day</span>
</div>
```

### 关键技巧

- `data-content-limiter="true"` 启用 Content Limiter Engine，自动截断超出容器的文本
- `data-pixel-perfect="true"` 启用 Pixel-Perfect Fonts Engine，优化 e-paper 字体渲染
- `richtext--center` 居中对齐富文本内容
- 不同 view size 下调整标题元素（Full: `title`、Half Vertical: `title--small`、Quadrant: `label`）
