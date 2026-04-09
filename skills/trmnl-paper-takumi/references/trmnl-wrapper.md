# TRMNL 包装规则

## 最小结构

```blade
<x-trmnl::screen>
    <x-trmnl::view>
        <x-trmnl::layout>
            <img class="image w--full h--full image--contain" src="https://..." alt="">
        </x-trmnl::layout>
        <x-trmnl::title-bar title="..." />
    </x-trmnl::view>
</x-trmnl::screen>
```

## 规则

- `screen > view > layout` 不能乱改
- `title-bar` 必须是 `layout` 的兄弟节点
- 图片使用原生 `<img class="image ...">`
- 不要发明不存在的 `<x-trmnl::image>` 组件

## fit 选择

- `contain`：默认；完整保留图片
- `cover`：允许裁剪，适合图片本来就要铺满
- `fill`：允许拉伸，通常最后再考虑

## dither 选择

默认先 **不要** 加 `image-dither`。

更适合开启 `image-dither` 的情况：

- 图片仍然是连续灰阶照片
- 你希望让 TRMNL 的 1-bit 风格更明显

不建议默认开启的情况：

- Takumi scene 本身已经做成像素风
- 已经手工控制成黑 / 白 / 灰块面

## 验证

```bash
python3 ../trmnl-paper-blade/scripts/validate_markup.py dist/example.markup
```
