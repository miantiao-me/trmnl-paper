# Node API 速查

> 来源：Takumi 官方文档与 `kane50613/takumi` 仓库

本 skill 的本地运行时采用：

- `@takumi-rs/core`：Node 原生渲染器
- `@takumi-rs/helpers/jsx`：把 React JSX 转成 Takumi node tree

> 官方 `llms-full.txt` 主要用 `takumi-js` 作为统一文档入口；当前 skill 为了直接控制 Node 运行时，使用底层 npm 包。

## 最小调用链

```tsx
import { Renderer } from "@takumi-rs/core"
import { fromJsx } from "@takumi-rs/helpers/jsx"

const renderer = new Renderer()
const { node, stylesheets } = await fromJsx(<Scene />)

const output = await renderer.render(node, {
  width: 800,
  height: 480,
  format: "webp",
  stylesheets,
})
```

## 当前 skill 直接依赖的接口

### `Renderer`

- `renderer.putPersistentImage(src, data)`：注册本地图片
- `renderer.render(node, options)`：输出图片 buffer
- `renderer.loadFonts(fonts)`：显式追加自定义字体 / Google Fonts

上游官方还支持但当前 skill 未直接封装：

- `renderer.measure(node, options)`
- `renderer.renderAnimation(...)`
- `renderer.encodeFrames(...)`

### `fromJsx`

- `tw` 属性会被转换成样式表
- 返回的 `stylesheets` 需要继续传给 `renderer.render(...)`
- React Server Components / Fragments 会先解析到最终值
- `<img>` 与 `<svg>` 会转成 image node
- string / number primitive 会自动变成 text node
- 其他元素会转成 container node

## 当前 skill 实际使用的 render options

```ts
{
  width: 800,
  height: 480,
  format: "webp",
  stylesheets,
}
```

补充说明：

- `format` 已验证支持 `webp` / `png` / `jpeg`
- scene 模块可导出 `renderOptions`，再由 CLI 参数覆盖
- 上游官方还支持 `resourcesOptions.cache`、`fetchedResources`、`devicePixelRatio`、`timeMs`、`keyframes`

## 图片与资源

上游官方说明：

- 外部 `src` 会自动抓取
- `background-image` / `mask-image` 的 `url()` 也会抓取
- `persistentImages` 可在这些位置重复使用

当前 skill 显式封装的是 `--image key=path`，没有把 `resourcesOptions.cache` 暴露出来。

## 字体

Takumi Node 原生运行时默认嵌入 **Geist** 与 **Geist Mono**。

Google Fonts、字体栈、子集策略等细节，统一读 `takumi-basics.md`。

## 动画、测量、emoji

上游官方支持但当前 skill 未直接封装：

- `measure()`：只测布局，不出图
- `renderAnimation()`：直接输出 `webp` / `gif` / `apng`
- `render(..., { format: "raw", timeMs, keyframes })`：用于 ffmpeg 等视频流水线
- `ImageResponse` 的 `emoji` 选项
- `extractEmojis()` + `fetchedResources` 的低层 emoji 路线

## 注意

- 不要假设完整浏览器 DOM / CSS 都可用
- 根节点始终显式写宽高
- Takumi v1 默认 `display: inline`，需要布局容器时要显式声明 `display: flex/grid/block` 等
- 像素图放大时用 `style={{ imageRendering: "pixelated" }}`
- 需要更底层能力时，再回看上游文档或仓库类型定义
