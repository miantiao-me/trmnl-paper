---
name: trmnl-paper-screen
description: >
  Use when the user wants to push, deploy, or update screen content on a TRMNL
  device via a LaraPaper instance. Builds the JSON payload with device credentials
  (MAC address + device API key) and sends to `/api/screens`. After an actual
  send, it can read back `image_url` from the current screen endpoint, review the
  rendered result, and route layout fixes back to `trmnl-paper-blade`. Also use
  when they say "send to device," "update the display," "deploy this screen,"
  or need to construct the LaraPaper screen update request for already-prepared
  markup.
---

# trmnl-paper-screen

## 概览

负责把已有 markup 通过 `POST /api/screens` 推送到 LaraPaper。实际发送成功后，再取回当前渲染图（路径见 `references/api-screens.md`），审查展示是否正常、是否适合 e-paper；若有问题，则把问题清单回传给 `trmnl-paper-blade` 做下一轮修正。

## 工作流

1. **确认 markup 是否就绪**
   - 没有 → 先用 `trmnl-paper-blade` 生成，再回到这里
   - 有 → 继续
2. **收集参数**（四个都必须）：

   | 参数 | 说明 | 示例 |
   |---|---|---|
   | `base URL` | LaraPaper 实例地址，必须带 scheme | `https://larapaper.example.com` |
   | `mac_address` | 设备 MAC，服务端会自动转大写 | `AA:BB:CC:DD:EE:FF` |
   | `device API key` | 设备级 API key（不是 `APP_KEY`） | `abc123...` |
   | markup | 要推送的 Blade / HTML 内容 | `<x-trmnl::screen>...</x-trmnl::screen>` |

3. **默认 dry-run**：预览完整请求体（凭据已脱敏），用户明确要求时才实际 POST；如需查看原始凭据，仅 dry-run 可加 `--show-secrets`。
4. **优先使用脚本**：从仓库根目录运行 `python3 skills/trmnl-paper-screen/scripts/push_screen.py ...`，避免手写 JSON 转义错误；如果当前目录已在 skill 内，可用 `python3 scripts/push_screen.py ...`。
5. **实际发送后读取渲染结果**：使用 `--send --current-screen`，或在发送成功后调用当前屏幕接口（路径见 `references/api-screens.md`）。
6. **需要视觉审查时下载图片**：使用 `--download-image <path>` 把 `image_url` 下载到本地，再检查展示是否正常与美观；`--download-image` 会隐式触发 `current_screen` 读取。
7. **若有问题，走修正闭环**：整理问题清单 → 交回 `trmnl-paper-blade` 改 markup → `validate_markup.py` 校验 → 重新推送并复查。

## 推送后审查闭环

只在用户明确要求**实际发送**时进入这个闭环；dry-run 不做图片审查。

1. `POST /api/screens` 推送 markup
2. 取回当前渲染图 `image_url`（路径见 `references/api-screens.md`）
3. 下载图片并做人工/多模态审查（审查标准见 `references/review-checklist.md`）
4. 按问题类型回到 `trmnl-paper-blade` 修正
5. 重新校验、推送、复查

默认先修最明显的 1-3 个问题，避免一次改太多导致回归。若两轮后仍存在明显取舍，再向用户说明并确认方向。

如果目标实例做了异步渲染或额外缓存，取回的图片可能短暂是上一版；此时等待片刻后重试即可，不要误判为新稿无效。

## 规则

- 不伪造 `base URL`、`mac_address`、`device API key`
- 只使用 `POST /api/screens`
- 取回渲染结果的路径见 `references/api-screens.md`
- 请求头固定为 `id` + `access-token`
- body 固定为 `{"image":{"content":"...","file_name":"..."}}`
- `file_name` 可选，默认 `screen.blade.markup`
- 默认把 markup 与请求体分开展示
- 只有用户明确要求时才实际发送
- `POST /api/screens` 不返回 `image_url`；`image_url` 来自后续当前屏幕接口
- 只有用户明确要求实际发送时，才执行"推送 → 取图 → 审查 → 优化"闭环
- `APP_KEY` 不是这个 skill 的凭据
- LaraPaper 会对 `content` 执行 `Blade::render()`，所以可以直接发送 `<x-trmnl::...>` 语法，前提是目标实例安装了 `trmnl-blade`

## 图片审查标准

详见 `references/review-checklist.md`。审查时先看"正常性"，再看"美观性"，最后参考"常见修正动作"回到 `trmnl-paper-blade` 修正。

## 错误处理

| HTTP 状态码 | 含义 | 处理方式 |
|---|---|---|
| 200 | 成功，返回 `{"message":"success"}` | — |
| 404 | MAC 或 API key 不匹配 | 检查 MAC 大小写和 API key 是否正确 |
| 422 | 请求体验证失败（缺 `image.content`） | 检查 JSON 结构是否符合规范 |
| 500 | 服务端渲染失败（Blade 语法错误等） | 检查 markup 是否合法 |
| 连接失败 | base URL 不可达 | 检查 URL scheme 和网络 |
| 取回渲染图失败 | 无法读取当前屏幕 | 检查 `access-token`、实例可达性，以及是否真的完成了发送 |
| `image_url` 缺失或图片下载失败 | 无法做推送后审查 | 先确认 LaraPaper 当前屏幕已生成，再重试 |

## 发送前检查

- [ ] `base URL` 带 scheme（`http://` 或 `https://`，默认优先 `https://`）
- [ ] `mac_address` 与 `device API key` 来自用户输入，不自行伪造
- [ ] 先执行 dry-run，核对 endpoint、headers、body 结构是否正确
- [ ] dry-run 输出里凭据保持脱敏；只有用户明确要求时才 `--send`
- [ ] 如果用户要求实际发送，发送后再取一次 `image_url` 做视觉复查（取图路径见 `references/api-screens.md`）
- [ ] 若失败，返回 HTTP 状态码或脚本错误，再给最小修复建议

## 与 `trmnl-paper-blade` 的边界

| | `trmnl-paper-blade` | `trmnl-paper-screen` |
|---|---|---|
| 职责 | 生成 markup | 推送 markup |
| 输入 | 内容描述 / 数据 | 已完成的 markup |
| 输出 | Blade 模板代码 | API 请求或执行结果 |
| 验证 | 组件语法、结构规则 | 请求格式、凭据 |

### 管道衔接

`trmnl-paper-blade` 生成的 markup 通过以下方式传入本 skill：

- **文件**：`--markup-file <path>`（推荐，避免转义问题）
- **标准输入**：`--markup-stdin`，适合管道串联

### 交接格式

以下 YAML 是 `trmnl-paper-screen` 与 `trmnl-paper-blade` 共用的权威交接格式。

推送后如需回传问题给 `trmnl-paper-blade`，每条问题使用以下最小字段格式：

```yaml
- issue: 文案在标题栏溢出
  location: x-trmnl::title-bar title 属性
  suggested_fix: 缩短标题文案，或加 data-clamp="1"
```

`issue` 描述问题现象，`location` 定位组件或属性，`suggested_fix` 给出最小修改方向。

## 参考资料

- 已验证请求格式与取图步骤：读 `references/api-screens.md`
- 推送后视觉审查标准：读 `references/review-checklist.md`

## 可用脚本

- **`scripts/push_screen.py`** — 构造或发送 LaraPaper 屏幕更新请求（默认 dry-run），可在发送后获取 `current_screen` 并下载渲染图

## 输出约定

默认按以下顺序输出：

1. endpoint：`POST /api/screens`
2. 请求头（凭据脱敏）
3. 请求体（markup 单独展示）
4. 如用户要求实际发送，再给发送结果
5. 如用户要求发送后复查，再给 `image_url`、审查结论与修正建议
