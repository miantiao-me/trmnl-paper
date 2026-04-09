# 仓库 Agent 指南
本仓库是 TRMNL 相关 skills 集合，不是完整应用。
先确认你在改哪条路线，再读对应 `SKILL.md` 与 `references/`。

## 1. 仓库定位
- `skills/trmnl-paper-blade/`：生成 `<x-trmnl::...>` Blade markup
- `skills/trmnl-paper-takumi/`：用 Takumi JSX / Tailwind 渲染 800x480 图像，再包最小 wrapper markup
- `skills/trmnl-paper-screen/`：通过 LaraPaper `/api/screens` 推送已生成的 markup
- Python 脚本都只用标准库；Node 依赖只存在于 `skills/trmnl-paper-takumi/`
- 仓库以 skill 说明与参考资料为主；改脚本前不要跳过文档核对

## 2. 开工前必读
- 改 `trmnl-paper-blade`：先读 `skills/trmnl-paper-blade/SKILL.md`
- Blade 结构与组件：看 `references/components/`、`design-rules.md`、`patterns.md`、`attributes.md`、`colors.md`
- 改 `trmnl-paper-takumi`：先读 `skills/trmnl-paper-takumi/SKILL.md`
- Takumi 工作流：看 `takumi-basics.md`、`render-workflow.md`、`trmnl-wrapper.md`、`examples.md`、`api_reference.md`
- 改 `trmnl-paper-screen`：先读 `skills/trmnl-paper-screen/SKILL.md`
- 推送 API 与效果检查：看 `references/api-screens.md`、`references/review-checklist.md`
- 若文档与上游行为不一致，先修正文档或说明差异，不要臆造组件、props、接口或 CLI 行为

## 3. 外部规则文件
- 未发现 `.cursor/rules/`
- 未发现 `.cursorrules`
- 未发现 `.github/copilot-instructions.md`
- 当前仓库的主要约束来源就是本文件、各 skill 的 `SKILL.md` 与 `references/`

## 4. 构建 / Lint / 测试速查
### 总体结论
- 没有统一构建系统
- 没有 `pytest`、`unittest`、`vitest`、`jest` 等测试框架
- “测试”主要依靠：`py_compile`、CLI `--help`、`ruff check`、`npx tsc --noEmit`、单场景渲染、markup 校验、push dry-run
- 不要编造不存在的 `npm test`、`pytest -k` 或单测目录

### Python：编译与 CLI smoke check
```bash
python3 -m py_compile skills/trmnl-paper-blade/scripts/validate_markup.py
python3 -m py_compile skills/trmnl-paper-screen/scripts/push_screen.py
python3 -m py_compile skills/trmnl-paper-takumi/scripts/wrap_image_markup.py
python3 skills/trmnl-paper-blade/scripts/validate_markup.py --help
python3 skills/trmnl-paper-screen/scripts/push_screen.py --help
python3 skills/trmnl-paper-takumi/scripts/wrap_image_markup.py --help
```

### Ruff
仓库里没有 `pyproject.toml` / repo-local ruff 配置；按 ruff 默认规则执行。
```bash
ruff check .
ruff check skills/trmnl-paper-screen/scripts/push_screen.py
ruff check --fix .
```

### Takumi：安装、类型检查、单场景渲染
以下命令在 `skills/trmnl-paper-takumi/` 目录执行：
```bash
npm install
npx tsc --noEmit
npm run render -- --scene assets/templates/clock.tsx
npm run render -- --scene assets/templates/google-font-showcase.tsx
```
- `package.json` 里唯一脚本是：`npm run render`
- `tsconfig.json` 启用了 `strict: true`、`noEmit: true`、`jsx: react-jsx`

### 最小粒度检查（相当于“单测”）
没有真正的单元测试；最小检查粒度如下：
```bash
# 单个 Python 文件
python3 -m py_compile path/to/script.py
ruff check path/to/script.py

# 单个 markup 文件
python3 skills/trmnl-paper-blade/scripts/validate_markup.py ./screen.markup

# 单个 Takumi scene
npm run render -- --scene assets/templates/<scene>.tsx

# 单个 wrapper 工作流
python3 skills/trmnl-paper-takumi/scripts/wrap_image_markup.py \
  --url https://example.com/demo.webp \
  --title Demo \
  --out /tmp/demo.markup
python3 skills/trmnl-paper-blade/scripts/validate_markup.py /tmp/demo.markup
```

### Push dry-run / 集成检查
默认先 dry-run；只有用户明确要求时才真发请求。
```bash
python3 skills/trmnl-paper-screen/scripts/push_screen.py \
  --base-url https://example.com \
  --mac-address AA:BB:CC:DD:EE:FF \
  --api-key test-key \
  --markup-file ./screen.markup
```

## 5. 代码风格：通用原则
- 保持 KISS；这是 skill 仓库，不要引入无必要抽象层
- 改文档时以事实为准；引用上游时注明来源文件或链接
- 注释解释 why，不重复解释 what
- 用户可见的 CLI 文案与错误信息优先中文
- 修改时尽量延续现有文件的语言、缩进、导入顺序、命名和错误处理模式

### Python 风格
- 脚本入口保留 shebang：`#!/usr/bin/env python3`
- 首个非 shebang 语句应是 `from __future__ import annotations`
- 常量放在导入后；文件末尾保留 `raise SystemExit(main())`
- 仅使用标准库；不要为现有脚本补第三方依赖
- 导入分组：`__future__` → 标准库；组内按字母序或模块族自然排序
- 4 空格缩进，双引号，多行参数保留尾随逗号，行宽遵循 ruff 默认 88
- 函数签名补全参数和返回值类型；用内置泛型与 `X | None`
- 函数/变量用 `snake_case`；常量用 `UPPER_SNAKE_CASE`；私有辅助项用前导下划线
- 输入校验抛 `ValueError`；运行时 / IO / 网络失败抛 `RuntimeError`
- 需要保留底层异常时使用 `raise ... from error`
- stderr 输出错误；退出码保持 `0` 成功、`1` 运行时失败、`2` 参数/输入错误
- argparse 使用 `RawDescriptionHelpFormatter`；`epilog` 说明规则与退出码

### TypeScript / TSX 风格
- 使用 ESM；当前 `package.json` 为 `"type": "module"`
- JSX 运行时为 `react-jsx`；代码库默认严格类型检查，不能靠关闭 `strict` 绕过问题
- 导入顺序遵循现有习惯：`node:` 内建模块 → 外部包 → 本地模块
- 类型导入使用 `import type { ... }`
- 2 空格缩进，双引号，不写分号，多行对象 / 参数 / 数组保留尾随逗号
- 公共数据结构优先用 `interface`，如 `Props`、`SceneModule`、`Metric`
- 帮助函数、异步函数、解析函数保留显式返回类型
- JSON 解析结果先收窄，再转成 `Record<string, unknown>` 之类的安全类型
- 组件、类、接口用 `PascalCase`；函数、变量用 `camelCase`；真正常量才用 `UPPER_SNAKE_CASE`
- scene 默认导出应是 React 组件或 React 元素；可选导出 `renderOptions`、`googleFonts`、`googleFontText`
- CLI 输入错误走显式输入错误分支；当前 `render_scene.tsx` 用 `InputError`
- 用户可见错误信息保持中文；入口处集中 `catch`，把输入错误映射到退出码 `2`，其他失败映射到 `1`
- 非致命问题用 `console.warn` / `console.error` 明确提示，不要静默吞错

## 6. 领域规则
- 结构化屏幕优先复用 `<x-trmnl::...>` 组件，不要先写自由 HTML/CSS
- 以 TRMNL Framework v3 与 `trmnl-blade` 为准，不要捏造不存在的组件或属性
- `validate_markup.py` 当前关心的核心结构规则：
  - `title-bar` 必须是 `layout` 的兄弟节点
  - `layout` 不能嵌套
  - 每个 `view` 内必须且只能有一个 `layout`
  - `<x-trmnl::table>` 内不要嵌套原生 `<table>`
- `trmnl-paper-takumi` 只负责 image-first 路线，不替代结构化 Blade skill
- Takumi 默认目标尺寸是 TRMNL OG：800x480
- 只有 scene 导出 `googleFonts` 或显式传 `--google-font` 时，才远程加载 Google Fonts
- 推送前必须先把图片变成可访问 URL；不要把本地文件路径直接交给 LaraPaper
- `trmnl-paper-screen` 只走已验证路径：`POST /api/screens`
- 推送认证只用设备级凭据：`id=<MAC>`、`access-token=<device api key>`

## 7. 变更后验证清单
- 文档改动：核对对应上游文档或源码，确保没有虚构内容
- Blade / wrapper 改动：至少跑一次 `validate_markup.py`
- Python 脚本改动：`py_compile` + `--help` + `ruff check`
- Takumi 脚本改动：`npx tsc --noEmit` + 至少渲染一个 scene
- image-first 工作流改动：生成一次 `.markup` 并再次过 `validate_markup.py`
- 推送逻辑改动：至少做一次 dry-run；只有用户要求时再 `--send`

## 8. 上游来源
- TRMNL Framework Docs: https://trmnl.com/framework/docs/v3
- trmnl-blade: https://github.com/bnussbau/trmnl-blade
- Takumi: https://github.com/kane50613/takumi
- LaraPaper: https://github.com/usetrmnl/larapaper
