# `/api/screens` 已验证更新方式

## 目录

- [适用条件](#适用条件)
- [请求格式](#请求格式)
- [响应格式](#响应格式)
- [推送后获取当前渲染图](#推送后获取当前渲染图)
- [不要用的方式](#不要用的方式)
- [命令模板](#命令模板)

## 适用条件

你手上有：

- LaraPaper `base URL`（必须带 scheme，默认推荐 `https://`）
- 设备 `MAC address`（服务端自动 `mb_strtoupper`，大小写均可）
- 设备 `API key`（不是 `APP_KEY`）
- 已准备好的 markup

## 请求格式

- endpoint：`POST /api/screens`
- headers：
  - `id: <MAC_ADDRESS>`
  - `access-token: <DEVICE_API_KEY>`
  - `Content-Type: application/json`
  - `Accept: application/json`
- body：

```json
{
  "image": {
    "content": "<x-trmnl::screen>...</x-trmnl::screen>",
    "file_name": "screen.blade.markup"
  }
}
```

### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `image` | object | ✅ | 外层容器 |
| `image.content` | string | ✅ | Blade / HTML markup，服务端会执行 `Blade::render()` |
| `image.file_name` | string | — | 可选，脚本默认使用 `screen.blade.markup` |

## 响应格式

### 成功（200）

```json
{
  "message": "success"
}
```

注意：`POST /api/screens` **不会直接返回** `image_url`。如果要拿到渲染后的图片链接，需要在推送成功后再调用 `GET /api/current_screen`。

### 设备未找到（404）

```json
{
  "message": "MAC Address not registered or invalid access token"
}
```

常见原因：MAC 地址不匹配（检查是否已在 LaraPaper 注册）或 API key 错误。

### 验证失败（422）

```json
{
  "message": "The image field is required.",
  "errors": { "image": ["The image field is required."] }
}
```

常见原因：body 缺少 `image` 或 `image.content` 字段，或类型不是 string。

### 渲染失败（500）

Blade 语法错误会导致服务端渲染异常。检查 markup 中的组件是否存在、属性是否正确。

## 推送后获取当前渲染图

### 请求格式

- endpoint：`GET /api/current_screen`
- headers：
  - `access-token: <DEVICE_API_KEY>`
  - `Accept: application/json`
- body：无

说明：上游 LaraPaper 在 `routes/api.php` 中定义的是 `GET /current_screen` 路由，经 Laravel API 前缀后实际对外路径为 `GET /api/current_screen`。认证只需要 `access-token`，不需要 `id`。

### 成功响应（200）

```json
{
  "status": 200,
  "image_url": "https://larapaper.example.com/storage/images/generated/6f0c6dd2-3d57-4d24-a0cb-example.png",
  "filename": "6f0c6dd2-3d57-4d24-a0cb-example.png",
  "refresh_rate": 900,
  "reset_firmware": false,
  "update_firmware": false,
  "firmware_url": "https://trmnl.com/firmware",
  "special_function": null
}
```

通常在 `POST /api/screens` 成功后立即调用即可拿到新图；上游实现使用同步生成任务，标准部署下不需要额外轮询等待。

如果目标实例自行改成异步渲染、挂了 CDN / 代理缓存，`GET /api/current_screen` 也可能短暂返回旧图；这时先等待片刻再重试。

默认假设 `image_url` 是可直接访问的公开链接；如果实例额外做了鉴权或私有存储，下载图片时需要按部署方式补充认证。

## 不要用的方式

- 不要把 `APP_KEY` 当作认证凭据
- 不要把 device API key 当成 Bearer token
- 不要用 `/api/display/update`（那是 Sanctum token 认证，不是设备级）
- 不要声称 `POST /api/screens` 本身会返回 `image_url`
- 更新只走 `/api/screens`；推送后的读图只使用 `/api/current_screen`

## 命令模板

以下命令默认从**仓库根目录**运行；如果当前目录已在 `skills/trmnl-paper-screen/` 下，可把 `skills/trmnl-paper-screen/` 前缀省略为 `scripts/push_screen.py`。

### dry-run（默认）

```bash
python3 skills/trmnl-paper-screen/scripts/push_screen.py \
  --base-url https://larapaper.example.com \
  --mac-address AA:BB:CC:DD:EE:FF \
  --api-key YOUR_DEVICE_API_KEY \
  --markup-file ./screen.blade.markup
```

### 直接发送

```bash
python3 skills/trmnl-paper-screen/scripts/push_screen.py \
  --base-url https://larapaper.example.com \
  --mac-address AA:BB:CC:DD:EE:FF \
  --api-key YOUR_DEVICE_API_KEY \
  --markup-file ./screen.blade.markup \
  --send
```

### 发送后输出 `image_url`

```bash
python3 skills/trmnl-paper-screen/scripts/push_screen.py \
  --base-url https://larapaper.example.com \
  --mac-address AA:BB:CC:DD:EE:FF \
  --api-key YOUR_DEVICE_API_KEY \
  --markup-file ./screen.blade.markup \
  --send --current-screen
```

### 发送后下载渲染图

```bash
python3 skills/trmnl-paper-screen/scripts/push_screen.py \
  --base-url https://larapaper.example.com \
  --mac-address AA:BB:CC:DD:EE:FF \
  --api-key YOUR_DEVICE_API_KEY \
  --markup-file ./screen.blade.markup \
  --send \
  --download-image ./current-screen.png
```

说明：`--download-image` 会自动触发一次 current screen 读取（`/api/current_screen`），所以这里不必再额外写 `--current-screen`。

### 用 stdin 发送

```bash
python3 skills/trmnl-paper-screen/scripts/push_screen.py \
  --base-url https://larapaper.example.com \
  --mac-address AA:BB:CC:DD:EE:FF \
  --api-key YOUR_DEVICE_API_KEY \
  --markup-stdin --send <<< '<h1>Hello World</h1>'
```

### 自定义 file_name

```bash
python3 skills/trmnl-paper-screen/scripts/push_screen.py \
  --base-url https://larapaper.example.com \
  --mac-address AA:BB:CC:DD:EE:FF \
  --api-key YOUR_DEVICE_API_KEY \
  --markup-file ./screen.blade.markup \
  --file-name my-dashboard.blade.markup \
  --send
```
