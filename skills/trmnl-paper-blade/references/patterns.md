# 常用布局模板

## 目录

- [1. 居中提示 / 引言](#1-居中提示--引言)
- [2. KPI / 单值看板](#2-kpi--单值看板)
- [3. 带颜色状态的 KPI 看板 (v3)](#3-带颜色状态的-kpi-看板-v3)
- [4. 双栏摘要（自动溢出排布）](#4-双栏摘要自动溢出排布)
- [5. 状态标签列表 (v3)](#5-状态标签列表-v3)
- [6. 列表 / 日程](#6-列表--日程)
- [7. 紧凑表格](#7-紧凑表格)
- [8. 带索引列表（Grid 辅助）](#8-带索引列表grid-辅助)
- [9. 进度展示](#9-进度展示)
- [10. 索引表格](#10-索引表格)
- [11. Mashup 多视图](#11-mashup-多视图)

以下模板优先作为起点，再按用户内容改写。

> **注意事项**
> - `<x-trmnl::table>` 本身输出 `<table class="table ...">` 元素，slot 内直接放 `<thead>` / `<tbody>`，不要再嵌套 `<table>`。
> - 当前 `x-trmnl::table` 不适合承载 `data-table-limit`、`table--indexed` 等附加属性/类；需要这些能力时优先直接写原生 `<table class="table ...">`。
> - `progress-bar` / `progress-dots` 使用原生 HTML class；`<x-trmnl::progress>` 是 progress-bar 的 Blade 封装，progress-dots 无专用 Blade 封装。

## 1. 居中提示 / 引言

```blade
<x-trmnl::screen>
    <x-trmnl::view>
        <x-trmnl::layout direction="col" alignment="center">
            <x-trmnl::richtext align="center" gapSize="large">
                <x-trmnl::title>Daily Note</x-trmnl::title>
                <x-trmnl::content>Keep the layout simple and readable.</x-trmnl::content>
                <x-trmnl::label variant="underline">TRMNL</x-trmnl::label>
            </x-trmnl::richtext>
        </x-trmnl::layout>
        <x-trmnl::title-bar title="Note" />
    </x-trmnl::view>
</x-trmnl::screen>
```

## 2. KPI / 单值看板

```blade
<x-trmnl::screen>
    <x-trmnl::view>
        <x-trmnl::layout direction="col" alignment="center">
            <x-trmnl::text alignment="center">
                <x-trmnl::value size="large" data-value-fit="true">128</x-trmnl::value>
                <x-trmnl::label>Completed Tasks</x-trmnl::label>
                <x-trmnl::description>Updated 5 minutes ago</x-trmnl::description>
            </x-trmnl::text>
        </x-trmnl::layout>
        <x-trmnl::title-bar title="Today" />
    </x-trmnl::view>
</x-trmnl::screen>
```

## 3. 带颜色状态的 KPI 看板 (v3)

v3 新增 `label--primary` / `label--success` / `label--error` / `label--warning` 语义颜色变体，适合在 KPI 场景标注趋势或状态。

```blade
<x-trmnl::screen>
    <x-trmnl::view>
        <x-trmnl::layout direction="col" alignment="center">
            <x-trmnl::text alignment="center">
                <x-trmnl::value size="large" data-value-fit="true">$12,450</x-trmnl::value>
                <x-trmnl::label>Monthly Revenue</x-trmnl::label>
                <span class="label label--success">+8.3% vs last month</span>
            </x-trmnl::text>
        </x-trmnl::layout>
        <x-trmnl::title-bar title="Sales" />
    </x-trmnl::view>
</x-trmnl::screen>
```

> 灰度设备上语义色自动回退为等效灰值，无需额外处理。

## 4. 双栏摘要 (自动溢出排布)

```blade
<x-trmnl::screen>
    <x-trmnl::view>
        <x-trmnl::layout>
            <x-trmnl::columns>
                <x-trmnl::column>
                    <x-trmnl::item>
                        <x-trmnl::label>Focus</x-trmnl::label>
                        <x-trmnl::value>7</x-trmnl::value>
                        <x-trmnl::description data-clamp="1">Hours deep work</x-trmnl::description>
                    </x-trmnl::item>
                </x-trmnl::column>
                <x-trmnl::column>
                    <x-trmnl::item>
                        <x-trmnl::label>Meetings</x-trmnl::label>
                        <x-trmnl::value>3</x-trmnl::value>
                        <x-trmnl::description data-clamp="1">Planned today</x-trmnl::description>
                    </x-trmnl::item>
                </x-trmnl::column>
            </x-trmnl::columns>
        </x-trmnl::layout>
        <x-trmnl::title-bar title="Summary" />
    </x-trmnl::view>
</x-trmnl::screen>
```

## 5. 状态标签列表 (v3)

v3 语义 Label 配合列表使用，标注条目状态。

```blade
<x-trmnl::screen>
    <x-trmnl::view>
        <x-trmnl::layout>
            <x-trmnl::columns>
                <x-trmnl::column>
                    <x-trmnl::item>
                        <span class="title title--small" data-clamp="1">API Gateway</span>
                        <span class="label label--small label--success">Healthy</span>
                    </x-trmnl::item>
                    <x-trmnl::item>
                        <span class="title title--small" data-clamp="1">Queue Worker</span>
                        <span class="label label--small label--warning">High Latency</span>
                    </x-trmnl::item>
                    <x-trmnl::item>
                        <span class="title title--small" data-clamp="1">Database Primary</span>
                        <span class="label label--small label--error">Down</span>
                    </x-trmnl::item>
                    <x-trmnl::item>
                        <span class="title title--small" data-clamp="1">CDN Edge</span>
                        <span class="label label--small label--primary">Deploying</span>
                    </x-trmnl::item>
                </x-trmnl::column>
            </x-trmnl::columns>
        </x-trmnl::layout>
        <x-trmnl::title-bar title="Service Status" />
    </x-trmnl::view>
</x-trmnl::screen>
```

## 6. 列表 / 日程

```blade
<x-trmnl::screen>
    <x-trmnl::view>
        <x-trmnl::layout>
            <x-trmnl::columns>
                <x-trmnl::column>
                    <x-trmnl::item>
                        <span class="title title--small" data-clamp="1">09:30 Standup</span>
                        <x-trmnl::description data-clamp="1">Team sync in Meeting Room A</x-trmnl::description>
                        <x-trmnl::meta>15 min</x-trmnl::meta>
                    </x-trmnl::item>
                    <x-trmnl::item>
                        <span class="title title--small" data-clamp="1">11:00 Review PRs</span>
                        <x-trmnl::description data-clamp="1">Focus on blockers first</x-trmnl::description>
                        <x-trmnl::meta>45 min</x-trmnl::meta>
                    </x-trmnl::item>
                    <x-trmnl::item>
                        <span class="title title--small" data-clamp="1">14:00 Ship release</span>
                        <x-trmnl::description data-clamp="2">Validate rollout status and announce in Slack.</x-trmnl::description>
                        <x-trmnl::meta>High priority</x-trmnl::meta>
                    </x-trmnl::item>
                </x-trmnl::column>
            </x-trmnl::columns>
        </x-trmnl::layout>
        <x-trmnl::title-bar title="Agenda" />
    </x-trmnl::view>
</x-trmnl::screen>
```

## 7. 紧凑表格

> 需要 `data-table-limit="true"` 时，直接写原生 `<table class="table table--small">` 更稳妥。

```blade
<x-trmnl::screen>
    <x-trmnl::view>
        <x-trmnl::layout>
            <table class="table table--small" data-table-limit="true">
                <thead>
                <tr>
                    <th><span class="title title--small">Service</span></th>
                    <th><span class="title title--small">Status</span></th>
                    <th><span class="title title--small">Latency</span></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><span class="label label--small" data-clamp="1">API</span></td>
                    <td><span class="label label--small">OK</span></td>
                    <td><span class="label label--small">92ms</span></td>
                </tr>
                <tr>
                    <td><span class="label label--small" data-clamp="1">Queue</span></td>
                    <td><span class="label label--small">OK</span></td>
                    <td><span class="label label--small">41ms</span></td>
                </tr>
                </tbody>
            </table>
        </x-trmnl::layout>
        <x-trmnl::title-bar title="Ops" />
    </x-trmnl::view>
</x-trmnl::screen>
```

## 8. 带索引列表 (Grid 辅助)

```blade
<x-trmnl::screen>
    <x-trmnl::view>
        <x-trmnl::layout>
            <x-trmnl::columns>
                <x-trmnl::column>
                    <div class="item">
                        <div class="meta"><span class="index">1</span></div>
                        <div class="content">
                            <span class="title title--small" data-clamp="1">Build Feature X</span>
                            <span class="description" data-clamp="1">High priority sprint item</span>
                            <div class="flex gap--small">
                                <span class="label label--small label--underline">In Progress</span>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="meta"><span class="index">2</span></div>
                        <div class="content">
                            <span class="title title--small" data-clamp="1">Fix Bug #42</span>
                            <span class="description" data-clamp="1">Login timeout issue</span>
                            <div class="flex gap--small">
                                <span class="label label--small label--underline">Blocked</span>
                            </div>
                        </div>
                    </div>
                </x-trmnl::column>
            </x-trmnl::columns>
        </x-trmnl::layout>
        <x-trmnl::title-bar title="Backlog" />
    </x-trmnl::view>
</x-trmnl::screen>
```

## 9. 进度展示

> `progress-bar` / `progress-dots` 使用原生 HTML class；没有专用 Blade 组件封装 progress-dots。

```blade
<x-trmnl::screen>
    <x-trmnl::view>
        <x-trmnl::layout direction="col">
            <div class="progress-bar">
                <div class="content">
                    <span class="label" data-clamp="1">Sprint Progress</span>
                    <span class="value value--xxsmall">72%</span>
                </div>
                <div class="track">
                    <div class="fill" style="width: 72%"></div>
                </div>
            </div>
            <div class="divider"></div>
            <div class="progress-bar progress-bar--small progress-bar--emphasis-2">
                <div class="content">
                    <span class="label label--small" data-clamp="1">Test Coverage</span>
                    <span class="value value--xxsmall">85%</span>
                </div>
                <div class="track">
                    <div class="fill" style="width: 85%"></div>
                </div>
            </div>
            <div class="divider"></div>
            <div class="progress-dots">
                <div class="track">
                    <div class="dot dot--filled"></div>
                    <div class="dot dot--filled"></div>
                    <div class="dot dot--current"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        </x-trmnl::layout>
        <x-trmnl::title-bar title="Status" />
    </x-trmnl::view>
</x-trmnl::screen>
```

## 10. 索引表格

> 索引表格需要 `table--indexed` 额外类，当前优先直接用原生 HTML class。

```blade
<x-trmnl::screen>
    <x-trmnl::view>
        <x-trmnl::layout>
            {{-- 原生写法，确保 table--indexed 正确应用 --}}
            <table class="table table--small table--indexed" data-table-limit="true">
                <thead>
                    <tr>
                        <th><span class="title title--small"></span></th>
                        <th><span class="title title--small" data-clamp="1">Repo</span></th>
                        <th><span class="title title--small">Stars</span></th>
                        <th><span class="title title--small">Language</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><span class="meta"><span class="index">1</span></span></td>
                        <td><span class="label" data-clamp="1">laravel/framework</span></td>
                        <td><span class="label label--small">32k</span></td>
                        <td><span class="label label--small" data-clamp="1">PHP</span></td>
                    </tr>
                    <tr>
                        <td><span class="meta"><span class="index">2</span></span></td>
                        <td><span class="label" data-clamp="1">vuejs/core</span></td>
                        <td><span class="label label--small">46k</span></td>
                        <td><span class="label label--small" data-clamp="1">TypeScript</span></td>
                    </tr>
                </tbody>
            </table>
        </x-trmnl::layout>
        <x-trmnl::title-bar title="Trending" />
    </x-trmnl::view>
</x-trmnl::screen>
```

## 11. Mashup 多视图

```blade
<x-trmnl::screen>
    <x-trmnl::mashup mashupLayout="1Lx1R">
        <x-trmnl::view size="half_vertical">
            <x-trmnl::layout direction="col" alignment="center">
                <x-trmnl::text alignment="center">
                    <x-trmnl::value size="large" data-value-format="true">12450</x-trmnl::value>
                    <x-trmnl::label>Revenue</x-trmnl::label>
                </x-trmnl::text>
            </x-trmnl::layout>
            <x-trmnl::title-bar title="Sales" />
        </x-trmnl::view>
        <x-trmnl::view size="half_vertical">
            <x-trmnl::layout>
                <x-trmnl::columns>
                    <x-trmnl::column>
                        <x-trmnl::item>
                            <span class="title title--small" data-clamp="1">New signup: Acme Corp</span>
                            <x-trmnl::description data-clamp="1">Enterprise plan</x-trmnl::description>
                        </x-trmnl::item>
                        <x-trmnl::item>
                            <span class="title title--small" data-clamp="1">Renewal: Beta LLC</span>
                            <x-trmnl::description data-clamp="1">Pro plan, 12-month</x-trmnl::description>
                        </x-trmnl::item>
                    </x-trmnl::column>
                </x-trmnl::columns>
            </x-trmnl::layout>
            <x-trmnl::title-bar title="Activity" />
        </x-trmnl::view>
    </x-trmnl::mashup>
</x-trmnl::screen>
```

---

来源：[Framework v3 文档](https://trmnl.com/framework/docs/v3) · [官方示例](https://trmnl.com/framework/examples?version=v3)
