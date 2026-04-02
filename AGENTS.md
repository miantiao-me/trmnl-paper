# 仓库 Agent 指南

本仓库是 TRMNL 相关 skills 集合，不是完整应用。修改前先读对应 skill 的 `SKILL.md` 与 `references/`，再动手。

## 项目速览

- `trmnl-paper-blade`：生成 TRMNL Framework v3 / `trmnl-blade` 的 Blade markup
- `trmnl-paper-screen`：把已有 markup 通过 LaraPaper `/api/screens` 推送到设备
- 仓库以文档与 skill 说明为主，Python 脚本：`push_screen.py`（推送）与 `validate_markup.py`（校验）
- 无第三方依赖，Python 脚本仅使用标准库

## 目录结构

```text
skills/
├── trmnl-paper-blade/
│   ├── SKILL.md
│   ├── references/
│   │   ├── components/           # layout, screen, view, title_bar, item, table, ...
│   │   ├── examples/             # 完整屏幕示例
│   │   ├── design-rules.md, patterns.md, attributes.md, colors.md
│   │   ├── guides.md, utilities.md
│   └── scripts/validate_markup.py
└── trmnl-paper-screen/
    ├── SKILL.md
    ├── references/api-screens.md
    └── scripts/push_screen.py
```

## 构建 / 校验 / 测试

无构建步骤、无测试框架。验证方式如下：

### Python 脚本编译检查

```bash
python3 -m py_compile skills/trmnl-paper-screen/scripts/push_screen.py
python3 -m py_compile skills/trmnl-paper-blade/scripts/validate_markup.py
python3 skills/trmnl-paper-screen/scripts/push_screen.py --help
python3 skills/trmnl-paper-blade/scripts/validate_markup.py --help
```

### Blade markup 校验

```bash
python3 skills/trmnl-paper-blade/scripts/validate_markup.py <markup-file>
echo '<x-trmnl::screen>...</x-trmnl::screen>' | python3 skills/trmnl-paper-blade/scripts/validate_markup.py
```

### Lint（ruff）

```bash
ruff check .                  # 检查全部
ruff check <file>             # 检查单个文件
ruff check --fix .            # 自动修复
```

### 推送脚本 dry-run 验证

改动请求构造逻辑后，跑一次 dry-run 确认输出正确：

```bash
python3 skills/trmnl-paper-screen/scripts/push_screen.py \
  --base-url https://example.com \
  --mac-address AA:BB:CC:DD:EE:FF \
  --api-key test-key \
  --markup-file <some-file>
```

## 代码风格（Python）

### 文件结构

- shebang 行：`#!/usr/bin/env python3`
- 首行导入始终为 `from __future__ import annotations`
- 模块级常量紧跟导入之后
- 入口函数 `main() -> int` 置于文件末尾，入口点为 `raise SystemExit(main())`

### 导入

- 仅使用标准库，不引入第三方依赖
- 按字母序排列，分组：`__future__` → 标准库（空行分隔）

### 格式化

- 4 空格缩进
- 双引号 `"` 为默认字符串引号
- 多行参数列表使用尾随逗号
- 行宽遵循 ruff 默认（88 字符）

### 类型标注

- 所有函数签名必须有参数和返回值类型标注
- 使用小写内置泛型：`list[str]`、`dict[str, str]`、`tuple[str, int]`（非 `List`/`Dict`/`Tuple`）
- 联合类型用 `X | None`（非 `Optional[X]`）
- 多返回值用 `tuple[T1, T2]`

### 命名

- 函数、变量：`snake_case`
- 模块级常量：`UPPER_SNAKE_CASE`
- 私有函数 / 变量：`_leading_underscore`
- 编译正则常量：`_NAME_RE` 格式

### 错误处理

- 输入校验用 `ValueError`，运行时错误用 `RuntimeError`
- 链式 re-raise：`raise ValueError(...) from error`
- 退出码约定：`0` 成功、`1` 运行时错误、`2` 参数 / 输入错误
- `main()` 中用 `except ValueError` 返回 2，`except RuntimeError` 返回 1
- 错误信息输出到 stderr：`print(..., file=sys.stderr)`

### 注释与消息

- 代码注释用英文，解释 why 而非 what；不写多余注释
- 面向用户的错误消息和 CLI help 用中文
- argparse 使用 `RawDescriptionHelpFormatter`，epilog 列出规则与退出码

## 工作规则

- 优先复用 `<x-trmnl::...>` 组件，不要先写自由 HTML/CSS
- 以 TRMNL Framework v3 与 `trmnl-blade` 为准，不要臆造不存在的组件或 props
- Blade 结构层级与 e-paper 约束以 `references/design-rules.md` 为准
- `trmnl-paper-screen` 只使用已验证路径：`POST /api/screens`
- 推送认证只用设备级凭据：`id=<MAC address>`、`access-token=<device API key>`
- 默认先 dry-run；只有用户明确要求时才真的发送请求

## 修改指引

### 改 `trmnl-paper-blade` 时

1. 先读 `skills/trmnl-paper-blade/SKILL.md`
2. 组件细节 → `references/components/`；完整示例 → `references/patterns.md` 或 `references/examples/`
3. 结构约束 → `references/design-rules.md`；颜色 → `references/colors.md`；属性 → `references/attributes.md`
4. 如与上游不一致，优先修正文档，不要硬编 API

### 改 `trmnl-paper-screen` 时

1. 先读 `skills/trmnl-paper-screen/SKILL.md`
2. 请求格式以 `references/api-screens.md` 为准
3. 保持纯标准库，保留 dry-run、安全 masking、清晰错误输出

## 验证清单

1. **文档改动**：核对上游文档或源码，确认没有虚构内容
2. **Blade markup 改动**：运行 `validate_markup.py` 校验结构
3. **Python 脚本改动**：`py_compile` + `--help` + `ruff check`
4. **请求构造逻辑改动**：补一次 dry-run 验证

## 参考资料更新

`references/` 目录基于上游整理。当上游框架发布重大版本时，对照上游逐项核实，新增缺失项，移除废弃项，commit message 中注明上游版本或日期。发现不一致时优先修正文档。

## 上游来源

- TRMNL Framework Docs: https://trmnl.com/framework/docs/v3
- trmnl-blade: https://github.com/bnussbau/trmnl-blade
- LaraPaper: https://github.com/usetrmnl/larapaper
