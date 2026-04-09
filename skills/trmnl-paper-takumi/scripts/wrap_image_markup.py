#!/usr/bin/env python3
from __future__ import annotations

import argparse
import html
import sys
from pathlib import Path


_SCREEN_OPEN = "<x-trmnl::screen>"
_SCREEN_CLOSE = "</x-trmnl::screen>"
_VIEW_OPEN = "  <x-trmnl::view>"
_VIEW_CLOSE = "  </x-trmnl::view>"
_LAYOUT_OPEN = "    <x-trmnl::layout>"
_LAYOUT_CLOSE = "    </x-trmnl::layout>"


def _attr(value: str) -> str:
    """Escape a string for safe use inside an HTML double-quoted attribute."""
    return html.escape(value, quote=True)


def _image_classes(fit: str, dither: bool) -> str:
    classes = ["image", "w--full", "h--full"]
    if dither:
        classes.append("image-dither")
    classes.append(f"image--{fit}")
    return " ".join(classes)


def build_title_bar(title: str, instance: str | None) -> str:
    if instance:
        return (
            f"    <x-trmnl::title-bar"
            f' title="{_attr(title)}"'
            f' instance="{_attr(instance)}" />'
        )
    return f'    <x-trmnl::title-bar title="{_attr(title)}" />'


def build_markup(
    url: str,
    alt: str,
    title: str | None,
    instance: str | None,
    fit: str,
    dither: bool,
) -> str:
    img_class = _image_classes(fit, dither)
    img_tag = f'      <img class="{img_class}" src="{_attr(url)}" alt="{_attr(alt)}">'

    lines = [
        _SCREEN_OPEN,
        _VIEW_OPEN,
        _LAYOUT_OPEN,
        img_tag,
        _LAYOUT_CLOSE,
    ]

    if title:
        lines.append(build_title_bar(title, instance))

    lines += [_VIEW_CLOSE, _SCREEN_CLOSE, ""]
    return "\n".join(lines)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="将外部图片 URL 包装成最小 TRMNL Blade markup。",
        epilog=(
            "结构规则：\n"
            "  screen > view > layout\n"
            "  title-bar 是 layout 的兄弟节点（非子节点）\n"
            '  图片使用框架原生 <img class="image w--full h--full image--{fit}"> 元素\n\n'
            "退出码：\n"
            "  0  成功\n"
            "  1  运行时错误（写入失败）\n"
            "  2  参数错误（URL 为空等）"
        ),
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "--url",
        required=True,
        help="要嵌入的图片 URL（必填）。",
    )
    parser.add_argument(
        "--alt",
        default="",
        help="图片 alt 文字（可选，默认为空）。",
    )
    parser.add_argument(
        "--title",
        help="title-bar 标题（省略则不生成 title-bar）。",
    )
    parser.add_argument(
        "--instance",
        help="title-bar 副标题 / 实例名（需配合 --title 使用）。",
    )
    parser.add_argument(
        "--fit",
        choices=["cover", "contain", "fill"],
        default="contain",
        help="图片适配方式：contain（留白缩入，默认）/ cover（裁剪填满）/ fill（拉伸填满）。",
    )
    parser.add_argument(
        "--dither",
        action="store_true",
        help="添加 image-dither class，适用于 1-bit 黑白电子墨水屏。",
    )
    parser.add_argument(
        "--out",
        help="输出文件路径（省略则输出到 stdout）。",
    )
    return parser.parse_args()


def main() -> int:
    try:
        args = parse_args()

        url = args.url.strip()
        if not url:
            raise ValueError("--url 不能为空")
        if args.instance and not args.title:
            raise ValueError("--instance 需要与 --title 一起使用")

        markup = build_markup(
            url,
            args.alt,
            args.title,
            args.instance,
            args.fit,
            args.dither,
        )

        if args.out:
            out_path = Path(args.out)
            try:
                out_path.parent.mkdir(parents=True, exist_ok=True)
                out_path.write_text(markup, encoding="utf-8")
            except OSError as error:
                raise RuntimeError(f"写入文件失败：{out_path} ({error})") from error
            print(f"已写入：{out_path}")
        else:
            print(markup, end="")

        return 0
    except ValueError as error:
        print(str(error), file=sys.stderr)
        return 2
    except RuntimeError as error:
        print(str(error), file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
