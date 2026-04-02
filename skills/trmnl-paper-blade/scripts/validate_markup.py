#!/usr/bin/env python3

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


# Quote-aware attribute matching so '>' inside attr values doesn't trip the parser.
_TAG_RE = re.compile(
    r'<(?P<close>/)?x-trmnl::(?P<name>[a-z][a-z0-9-]*)(?P<attrs>(?:[^>"\'<]|"[^"]*"|\'[^\']*\')*?)(?P<self>/)?>',
    re.IGNORECASE | re.DOTALL,
)

# Native <table> opening tags — used to detect forbidden nesting inside x-trmnl::table.
_NATIVE_TABLE_RE = re.compile(
    r"<table(?:\s[^>]*)?>",
    re.IGNORECASE,
)

# Replace comment content with blank lines so line numbers stay accurate.
_HTML_COMMENT_RE = re.compile(r"<!--.*?-->", re.DOTALL)
_BLADE_COMMENT_RE = re.compile(r"\{\{--.*?--\}\}", re.DOTALL)


def _strip_comments(text: str) -> str:
    def _blank(m: re.Match) -> str:
        return "\n" * m.group(0).count("\n")

    text = _HTML_COMMENT_RE.sub(_blank, text)
    return _BLADE_COMMENT_RE.sub(_blank, text)


def _line_of(text: str, pos: int) -> int:
    return text[:pos].count("\n") + 1


def validate(markup: str) -> list[str]:
    errors: list[str] = []
    text = _strip_comments(markup)
    tag_matches = list(_TAG_RE.finditer(text))

    if not tag_matches:
        return ["ERROR: 未检测到任何 x-trmnl:: 组件"]

    # Merge x-trmnl:: tag events with native <table> events, process in document order.
    events: list[tuple[str, re.Match]] = sorted(
        [("trmnl", m) for m in tag_matches]
        + [("native_table", m) for m in _NATIVE_TABLE_RE.finditer(text)],
        key=lambda x: x[1].start(),
    )

    # Each entry: (tag_name, line_number)
    stack: list[tuple[str, int]] = []
    # One entry per currently-open <x-trmnl::view>: (line_number, layout_count).
    view_layout_counts: list[tuple[int, int]] = []

    def _finalize_view(view_state: tuple[int, int]) -> None:
        open_line, layout_count = view_state

        if layout_count == 0:
            errors.append(
                "ERROR: 每个 view 内必须且只能有一个 layout"
                f"（view 开始于第 {open_line} 行）"
            )

    for kind, m in events:
        line = _line_of(text, m.start())

        if kind == "native_table":
            # Rule 4: native <table> must not appear inside <x-trmnl::table>.
            for tag, open_line in stack:
                if tag == "table":
                    errors.append(
                        f"ERROR: <x-trmnl::table> 的 slot 内不应嵌套原生 <table>，"
                        f"直接放 <thead> / <tbody> 即可"
                        f"（外层 x-trmnl::table 开始于第 {open_line} 行）(line {line})"
                    )
                    break
            continue

        # kind == "trmnl": process x-trmnl:: tags with existing rules.
        is_close = bool(m.group("close"))
        name = m.group("name").lower()
        is_self = bool(m.group("self"))

        if is_close:
            # Pop up to and including the nearest matching open tag.
            # Unmatched close tags are silently skipped — not our job to validate HTML.
            for i in range(len(stack) - 1, -1, -1):
                if stack[i][0] == name:
                    while len(stack) > i:
                        popped = stack.pop()
                        if popped[0] == "view" and view_layout_counts:
                            _finalize_view(view_layout_counts.pop())
                    break
        else:
            # Rules fire on first encounter (applies to both opening and self-closing tags).
            if name == "layout":
                # Rule 2: layout cannot be nested inside another layout.
                for tag, open_line in stack:
                    if tag == "layout":
                        errors.append(
                            f"ERROR: layout 不能嵌套"
                            f"（外层 layout 开始于第 {open_line} 行）(line {line})"
                        )
                        break

                # Rule 3: exactly one layout per view.
                if view_layout_counts:
                    open_line, layout_count = view_layout_counts[-1]
                    layout_count += 1
                    view_layout_counts[-1] = (open_line, layout_count)
                    if layout_count > 1:
                        errors.append(
                            "ERROR: 每个 view 内必须且只能有一个 layout"
                            f"（view 开始于第 {open_line} 行，第 {line} 行发现多余 layout）"
                        )

            elif name == "title-bar":
                # Rule 1: title-bar must be layout's sibling, not its descendant.
                for tag, open_line in stack:
                    if tag == "layout":
                        errors.append(
                            f"ERROR: title-bar 不能在 layout 内部，"
                            f"必须是 layout 的兄弟节点"
                            f"（layout 开始于第 {open_line} 行）(line {line})"
                        )
                        break

            # Self-closing tags have no children; skip pushing to stack.
            if not is_self:
                stack.append((name, line))
                if name == "view":
                    view_layout_counts.append((line, 0))

    while view_layout_counts:
        _finalize_view(view_layout_counts.pop())

    return errors


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="校验 TRMNL Blade markup 的结构规则。",
        epilog=(
            "规则：\n"
            "  1. title-bar 必须是 layout 的兄弟节点，不能在 layout 内部\n"
            "  2. layout 不能嵌套\n"
            "  3. 每个 view 内必须且只能有一个 layout\n"
            "  4. <x-trmnl::table> 的 slot 内不应嵌套原生 <table>\n"
            "\n"
            "退出码：\n"
            "  0  所有检查通过\n"
            "  1  发现结构错误或未检测到 x-trmnl:: 组件\n"
            "  2  文件读取失败"
        ),
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "file",
        nargs="?",
        metavar="FILE",
        help="要校验的 markup 文件路径；省略则从 stdin 读取。",
    )
    return parser.parse_args()


def read_input(args: argparse.Namespace) -> str:
    if args.file:
        path = Path(args.file)
        if not path.exists():
            raise ValueError(f"找不到文件: {path}")
        if not path.is_file():
            raise ValueError(f"不是普通文件: {path}")
        try:
            return path.read_text(encoding="utf-8")
        except OSError as e:
            raise ValueError(f"读取文件失败: {path} ({e})") from e
    return sys.stdin.read()


def main() -> int:
    try:
        args = parse_args()
        markup = read_input(args)
    except ValueError as e:
        print(str(e), file=sys.stderr)
        return 2

    errors = validate(markup)

    if errors:
        for msg in errors:
            print(msg, file=sys.stderr)
        return 1

    print("OK: 所有结构检查通过")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
