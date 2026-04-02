#!/usr/bin/env python3

from __future__ import annotations

import argparse
import json
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path


DEFAULT_FILE_NAME = "screen.blade.markup"
DEFAULT_TIMEOUT_SECONDS = 30.0
_MAC_ADDRESS_RE = re.compile(r"^[0-9A-F]{2}(?::[0-9A-F]{2}){5}$")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Build or send LaraPaper screen update requests.",
        epilog=(
            "退出码：\n"
            "  0  成功（dry-run 预览或请求发送成功）\n"
            "  1  请求失败（HTTP 错误或网络错误）\n"
            "  2  参数错误（文件不存在、markup 为空等）"
        ),
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("--base-url", required=True, help="LaraPaper base URL.")
    parser.add_argument(
        "--mac-address",
        required=True,
        help="Device MAC address (e.g. AA:BB:CC:DD:EE:FF).",
    )
    parser.add_argument("--api-key", required=True, help="Device API key.")

    markup_group = parser.add_mutually_exclusive_group(required=True)
    markup_group.add_argument("--markup-file", help="Path to markup file.")
    markup_group.add_argument(
        "--markup-stdin",
        action="store_true",
        help="Read markup from stdin.",
    )

    parser.add_argument(
        "--file-name", help="Optional file name for /api/screens payload."
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=DEFAULT_TIMEOUT_SECONDS,
        help="Per-request timeout in seconds when --send is used.",
    )
    parser.add_argument(
        "--current-screen",
        action="store_true",
        help="After --send, request current screen info and print the result.",
    )
    parser.add_argument(
        "--download-image",
        help="After --send, download current_screen.image_url to a file.",
    )
    parser.add_argument(
        "--show-secrets",
        action="store_true",
        help="Show full secrets in dry-run output.",
    )
    parser.add_argument(
        "--send",
        action="store_true",
        help="Actually send the request. Default is dry-run preview.",
    )

    return parser.parse_args()


def normalize_base_url(base_url: str) -> str:
    if not base_url.startswith(("http://", "https://")):
        raise ValueError(
            f"--base-url 缺少 scheme，应以 http:// 或 https:// 开头: {base_url}"
        )

    return base_url.rstrip("/")


def normalize_mac_address(mac_address: str) -> str:
    normalized = mac_address.strip().upper()

    if not _MAC_ADDRESS_RE.fullmatch(normalized):
        raise ValueError("--mac-address 格式不正确，应为 AA:BB:CC:DD:EE:FF")

    return normalized


def read_markup(markup_file: str | None) -> tuple[str, str]:
    if markup_file:
        path = Path(markup_file)

        if not path.exists():
            raise ValueError(f"找不到 markup 文件: {path}")

        if not path.is_file():
            raise ValueError(f"markup 文件不是普通文件: {path}")

        try:
            return path.read_text(encoding="utf-8"), path.name
        except OSError as error:
            raise ValueError(f"读取 markup 文件失败: {path} ({error})") from error

    return sys.stdin.read(), DEFAULT_FILE_NAME


def build_request(
    base_url: str,
    mac_address: str,
    api_key: str,
    markup: str,
    file_name: str,
) -> tuple[str, dict[str, str], dict[str, dict[str, str]]]:
    url = f"{base_url}/api/screens"
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "id": mac_address,
        "access-token": api_key,
    }
    body = {
        "image": {
            "content": markup,
            "file_name": file_name,
        }
    }
    return url, headers, body


def build_current_screen_url(base_url: str) -> str:
    return f"{base_url}/api/current_screen"


def mask_secret(value: str) -> str:
    if len(value) <= 12:
        return "****"

    return f"{value[:4]}****{value[-4:]}"


def mask_mac_address(value: str) -> str:
    parts = value.split(":")

    if len(parts) == 6 and all(len(part) == 2 for part in parts):
        return ":".join([parts[0], parts[1], "**", "**", "**", parts[5]])

    return mask_secret(value)


def mask_headers(headers: dict[str, str]) -> dict[str, str]:
    masked = dict(headers)

    if "id" in masked:
        masked["id"] = mask_mac_address(masked["id"])

    if "access-token" in masked:
        masked["access-token"] = mask_secret(masked["access-token"])

    return masked


def dry_run_payload(
    url: str,
    headers: dict[str, str],
    body: dict[str, dict[str, str]],
    show_secrets: bool,
) -> str:
    payload = {
        "url": url,
        "headers": headers if show_secrets else mask_headers(headers),
        "body": body,
    }
    return json.dumps(payload, ensure_ascii=False, indent=2)


def request_text(
    url: str,
    headers: dict[str, str],
    timeout: float,
    *,
    body: dict[str, dict[str, str]] | None = None,
    method: str,
) -> str:
    data = None

    if body is not None:
        data = json.dumps(body, ensure_ascii=False).encode("utf-8")

    request = urllib.request.Request(url, data=data, method=method)

    for key, value in headers.items():
        request.add_header(key, value)

    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            return response.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as error:
        content = error.read().decode("utf-8", errors="replace")
        message = f"HTTP {error.code} {error.reason}"

        if content:
            message = f"{message}\n{content}"

        raise RuntimeError(message) from error
    except urllib.error.URLError as error:
        raise RuntimeError(f"请求失败: {error}") from error


def request_bytes(url: str, headers: dict[str, str], timeout: float) -> bytes:
    request = urllib.request.Request(url, method="GET")

    for key, value in headers.items():
        request.add_header(key, value)

    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            return response.read()
    except urllib.error.HTTPError as error:
        content = error.read().decode("utf-8", errors="replace")
        message = f"下载失败: HTTP {error.code} {error.reason}"

        if content:
            message = f"{message}\n{content}"

        raise RuntimeError(message) from error
    except urllib.error.URLError as error:
        raise RuntimeError(f"下载失败: {error}") from error


def parse_response(content: str) -> object:
    try:
        return json.loads(content)
    except json.JSONDecodeError:
        return content


def send_request(
    url: str,
    headers: dict[str, str],
    body: dict[str, dict[str, str]],
    timeout: float,
) -> object:
    return parse_response(request_text(url, headers, timeout, body=body, method="POST"))


def fetch_current_screen(
    base_url: str, api_key: str, timeout: float
) -> dict[str, object]:
    headers = {
        "Accept": "application/json",
        "access-token": api_key,
    }
    url = build_current_screen_url(base_url)
    response = parse_response(
        request_text(
            url,
            headers,
            timeout,
            method="GET",
        )
    )

    if not isinstance(response, dict):
        raise RuntimeError(f"{url} 返回的不是 JSON 对象")

    return response


def download_image(image_url: str, output_path: str, timeout: float) -> str:
    path = Path(output_path).expanduser()

    if path.exists() and path.is_dir():
        raise ValueError(f"--download-image 需要文件路径，不能是目录: {path}")

    if not path.parent.exists():
        raise ValueError(f"下载目录不存在: {path.parent}")

    data = request_bytes(image_url, {"Accept": "image/*"}, timeout)

    try:
        path.write_bytes(data)
    except OSError as error:
        raise RuntimeError(f"保存图片失败: {path} ({error})") from error

    return str(path)


def print_output(payload: object) -> None:
    if isinstance(payload, (dict, list)):
        print(json.dumps(payload, ensure_ascii=False, indent=2))
        return

    print(payload)


def build_result(
    push_response: object,
    current_screen: dict[str, object] | None,
    downloaded_image: str | None,
) -> object:
    if current_screen is None and downloaded_image is None:
        return push_response

    result: dict[str, object] = {
        "push": push_response,
    }

    if current_screen is not None:
        if "image_url" in current_screen:
            result["image_url"] = current_screen["image_url"]

        result["current_screen"] = current_screen

    if downloaded_image is not None:
        result["downloaded_image"] = downloaded_image

    return result


def validate_send_options(
    send: bool,
    show_secrets: bool,
    current_screen: bool,
    download_image: str | None,
) -> None:
    if show_secrets and send:
        raise ValueError("--show-secrets 只能用于 dry-run，不能与 --send 一起使用")

    if not current_screen and not download_image:
        return

    if not send:
        raise ValueError("--current-screen 和 --download-image 只能与 --send 一起使用")


def resolve_image_url(current_screen: dict[str, object]) -> str:
    image_url = current_screen.get("image_url")

    if not isinstance(image_url, str) or not image_url:
        raise RuntimeError("current screen 接口未返回 image_url")

    return image_url


def run_send_flow(
    base_url: str,
    api_key: str,
    timeout: float,
    current_screen_requested: bool,
    download_image_path: str | None,
    url: str,
    headers: dict[str, str],
    body: dict[str, dict[str, str]],
) -> object:
    push_response = send_request(url, headers, body, timeout)
    current_screen = None
    downloaded_image = None

    if current_screen_requested:
        current_screen = fetch_current_screen(base_url, api_key, timeout)

        if download_image_path:
            downloaded_image = download_image(
                resolve_image_url(current_screen),
                download_image_path,
                timeout,
            )

    return build_result(push_response, current_screen, downloaded_image)


def main() -> int:
    try:
        args = parse_args()
        validate_send_options(
            args.send,
            args.show_secrets,
            args.current_screen,
            args.download_image,
        )

        base_url = normalize_base_url(args.base_url)
        mac_address = normalize_mac_address(args.mac_address)
        markup, markup_file_name = read_markup(args.markup_file)

        if not markup.strip():
            raise ValueError("markup 不能为空")

        file_name = args.file_name or markup_file_name
        url, headers, body = build_request(
            base_url,
            mac_address,
            args.api_key,
            markup,
            file_name,
        )

        if not args.send:
            print(dry_run_payload(url, headers, body, args.show_secrets))
            return 0

        current_screen_requested = args.current_screen or bool(args.download_image)
        print_output(
            run_send_flow(
                base_url,
                args.api_key,
                args.timeout,
                current_screen_requested,
                args.download_image,
                url,
                headers,
                body,
            )
        )
        return 0
    except ValueError as error:
        print(str(error), file=sys.stderr)
        return 2
    except RuntimeError as error:
        print(str(error), file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
