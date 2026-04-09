#!/usr/bin/env python3
from __future__ import annotations

import argparse
import base64
import html
import mimetypes
import sys
from pathlib import Path


_SCREEN_OPEN = "<x-trmnl::screen>"
_SCREEN_CLOSE = "</x-trmnl::screen>"
_VIEW_OPEN = "  <x-trmnl::view>"
_VIEW_CLOSE = "  </x-trmnl::view>"
_LAYOUT_OPEN = "    <x-trmnl::layout>"
_LAYOUT_CLOSE = "    </x-trmnl::layout>"

# mimetypes 可能缺少 webp
mimetypes.add_type("image/webp", ".webp")


def _attr(value: str) -> str:
    """Escape a string for safe use inside an HTML double-quoted attribute."""
    return html.escape(value, quote=True)


def _image_classes(fit: str, dither: bool) -> str:
    classes = ["image", "w--full", "h--full"]
    if dither:
        classes.append("image-dither")
    classes.append(f"image--{fit}")
    return " ".join(classes)


def _file_to_data_uri(path: Path) -> str:
    """Read a local image and return a base64 data URI."""
    mime_type = mimetypes.guess_type(str(path))[0] or "image/webp"
    try:
        data = path.read_bytes()
    except OSError as error:
        raise RuntimeError(f"读取图片文件失败：{path} ({error})") from error
    encoded = base64.b64encode(data).decode("ascii")
    return f"data:{mime_type};base64,{encoded}"


def build_markup(
    src: str,
    alt: str,
    fit: str,
    dither: bool,
) -> str:
    img_class = _image_classes(fit, dither)
    img_tag = f'      <img class="{img_class}" src="{_attr(src)}" alt="{_attr(alt)}">'

    lines = [
        _SCREEN_OPEN,
        _VIEW_OPEN,
        _LAYOUT_OPEN,
        img_tag,
        _LAYOUT_CLOSE,
        _VIEW_CLOSE,
        _SCREEN_CLOSE,
        "",
    ]
    return "\n".join(lines)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="将图片包装成最小 TRMNL Blade markup（不包含 title-bar）。",
        epilog=(
            "图片来源（二选一）：\n"
            "  --file  本地文件，转为 base64 data URI 内嵌（推荐，无需上传图片）\n"
            "  --url   已有的外部 URL\n\n"
            "结构规则：\n"
            "  screen > view > layout\n"
            '  图片使用框架原生 <img class="image w--full h--full image-dither image--{fit}"> 元素\n'
            "  wrapper 默认优先启用 image-dither；仅在确认关闭后实机更好时再用 --no-dither\n\n"
            "退出码：\n"
            "  0  成功\n"
            "  1  运行时错误（读取文件失败、写入失败）\n"
            "  2  参数错误（未指定图片来源等）"
        ),
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )

    source_group = parser.add_mutually_exclusive_group(required=True)
    source_group.add_argument(
        "--file",
        help="本地图片文件路径，转为 base64 data URI 内嵌（推荐）。",
    )
    source_group.add_argument(
        "--url",
        help="已有的外部图片 URL。",
    )

    parser.add_argument(
        "--alt",
        default="",
        help="图片 alt 文字（可选，默认为空）。",
    )
    parser.add_argument(
        "--fit",
        choices=["cover", "contain", "fill"],
        default="contain",
        help="图片适配方式：contain（留白缩入，默认）/ cover（裁剪填满）/ fill（拉伸填满）。",
    )
    dither_group = parser.add_mutually_exclusive_group()
    dither_group.add_argument(
        "--dither",
        dest="dither",
        action="store_true",
        help="显式启用 image-dither class（默认已开启）。",
    )
    dither_group.add_argument(
        "--no-dither",
        dest="dither",
        action="store_false",
        help="关闭 image-dither；仅在实机确认不加更好时使用。",
    )
    parser.add_argument(
        "--out",
        help="输出文件路径（省略则输出到 stdout）。",
    )
    parser.set_defaults(dither=True)
    return parser.parse_args()


def main() -> int:
    try:
        args = parse_args()

        if args.file:
            file_path = Path(args.file)
            if not file_path.exists():
                raise ValueError(f"图片文件不存在：{file_path}")
            if not file_path.is_file():
                raise ValueError(f"不是普通文件：{file_path}")
            src = _file_to_data_uri(file_path)
        else:
            src = args.url.strip()
            if not src:
                raise ValueError("--url 不能为空")

        markup = build_markup(
            src,
            args.alt,
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
