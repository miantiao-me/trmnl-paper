# Todo List — 待办列表

分组带索引的待办列表，使用 columns + data-overflow、group-header 分组标题、label--gray 已完成样式。

来源：https://trmnl.com/framework/examples/todo_list?version=v3

## Full View

```html
<div class="layout layout--col layout--stretch gap">
  <div class="columns">
    <div class="column" data-overflow="true" data-overflow-counter="true">
      <span class="label label--medium lg:label--base group-header label--gray">Done</span>
      <div class="item">
        <div class="meta">
          <span class="index">1</span>
        </div>
        <div class="content">
          <span class="title title--small lg:title--base label--gray">
            <p>Practice winking</p>
          </span>
        </div>
      </div>
      <div class="item">
        <div class="meta">
          <span class="index">2</span>
        </div>
        <div class="content">
          <span class="title title--small lg:title--base label--gray">
            <p>Ask Pam to laugh louder at my jokes, people aren't getting them</p>
          </span>
        </div>
      </div>
      <!-- ... more items ... -->
    </div>
    <div class="column" data-overflow="true" data-overflow-counter="true">
      <span class="label label--medium lg:label--base group-header ">Doing</span>
      <div class="item">
        <div class="meta">
          <span class="index">1</span>
        </div>
        <div class="content">
          <span class="title title--small lg:title--base ">
            <p>Cancel meeting with Toby (tell him I died)</p>
          </span>
        </div>
      </div>
      <div class="item">
        <div class="meta">
          <span class="index">2</span>
        </div>
        <div class="content">
          <span class="title title--small lg:title--base ">
            <p>Find out if 14 inches is big for a plasma TV</p>
          </span>
        </div>
      </div>
      <!-- ... more items ... -->
    </div>
  </div>
</div>
<div class="title_bar">
  <img class="image" alt="" src="https://trmnl.com/images/plugins/todo_list--render.svg">
  <span class="title">Todo List</span>
  <span class="instance">Work Tasks (Plain)</span>
</div>
```

### 关键技巧

- `data-overflow="true"` + `data-overflow-counter="true"` 启用 Overflow Engine 自动截断溢出条目并显示剩余计数
- `group-header` class 用于分组标题
- `label--gray` class 标记已完成条目的灰化样式
- 每个 item 的 `meta > index` 提供序号
