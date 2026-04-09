# TRMNL 包装规则

## 最小结构

```blade
<x-trmnl::screen>
    <x-trmnl::view>
        <x-trmnl::layout>
            <img class="image w--full h--full image-dither image--contain" src="https://..." alt="">
        </x-trmnl::layout>
    </x-trmnl::view>
</x-trmnl::screen>
```

## 规则

- `screen > view > layout` 不能乱改
- 绝对不要生成 `<x-trmnl::title-bar title="..." />`
- 图片使用原生 `<img class="image ...">`
- 不要发明不存在的 `<x-trmnl::image>` 组件

## fit 选择

- `contain`：默认；完整保留图片
- `cover`：允许裁剪，适合图片本来就要铺满
- `fill`：允许拉伸，通常最后再考虑

## dither 选择

默认先 **加** `image-dither`。

更适合保持默认开启的情况：

- 图片仍然是连续灰阶照片
- 图片里有细线、小字、浅灰进度条、弱对比纹理
- 你希望让 TRMNL 的 1-bit 风格更明显

才考虑关闭 `image-dither` 的情况：

- Takumi scene 已经是纯黑白硬边块面
- `image-dither` 让边缘或底纹明显变脏
- 已经完成一次实机 / 远端复查，确认 `--no-dither` 更好

`scripts/wrap_image_markup.py` 默认就会输出 `image-dither`；需要关闭时显式传 `--no-dither`。

## 验证

```bash
python3 ../trmnl-paper-blade/scripts/validate_markup.py dist/example.markup
```
