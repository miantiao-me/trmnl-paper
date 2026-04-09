#!/usr/bin/env tsx
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, extname, resolve } from "node:path"
import { pathToFileURL } from "node:url"
import { parseArgs } from "node:util"
import React from "react"
import { Renderer } from "@takumi-rs/core"
import type { Font, Node, OutputFormat, RenderOptions } from "@takumi-rs/core"
import { fromJsx } from "@takumi-rs/helpers/jsx"

// Defaults for TRMNL OG device (800×480 e-paper)
const DEFAULT_WIDTH = 800
const DEFAULT_HEIGHT = 480
const DEFAULT_FORMAT: OutputFormat = "webp"
const GOOGLE_FONTS_API_URL = "https://fonts.googleapis.com/css2"
// Google Fonts returns browser-specific CSS, so keep a desktop browser UA here.
const GOOGLE_FONTS_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36"

// Scene module shape: default export + optional render hints
interface SceneModule {
  default: React.ComponentType<Record<string, unknown>> | React.ReactElement
  renderOptions?: Partial<RenderOptions>
  googleFonts?: string[]
  googleFontText?: string
}

class InputError extends Error {}

function exitInputError(message: string): never {
  throw new InputError(message)
}

function parseCliArgs() {
  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: {
      scene: { type: "string" },
      out: { type: "string" },
      width: { type: "string" },
      height: { type: "string" },
      format: { type: "string" },
      props: { type: "string" },
      // key=localPath pairs; may be repeated
      image: { type: "string", multiple: true },
      "google-font": { type: "string", multiple: true },
      "google-font-text": { type: "string" },
    },
    strict: true,
    allowPositionals: false,
  })

  if (!values.scene) {
    exitInputError("--scene <path> 为必填项")
  }

  return values as typeof values & { scene: string }
}

function parsePositiveInteger(name: string, value: string | undefined, fallback: number): number {
  if (value === undefined) {
    return fallback
  }

  const parsed = Number.parseInt(value, 10)
  if (!Number.isFinite(parsed) || parsed <= 0) {
    exitInputError(`--${name} 必须是正整数`)
  }

  return parsed
}

function parseProps(raw: string | undefined): Record<string, unknown> {
  if (!raw) {
    return {}
  }

  try {
    const parsed = JSON.parse(raw)
    if (parsed === null || Array.isArray(parsed) || typeof parsed !== "object") {
      exitInputError("--props 必须是 JSON 对象字符串")
    }
    return parsed as Record<string, unknown>
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error)
    exitInputError(`--props 不是合法 JSON：${reason}`)
  }
}

function uniqueStrings(values: string[]): string[] {
  const result: string[] = []
  const seen = new Set<string>()

  for (const value of values) {
    const trimmed = value.trim()
    if (!trimmed || seen.has(trimmed)) {
      continue
    }
    seen.add(trimmed)
    result.push(trimmed)
  }

  return result
}

function uniqueCharacters(text: string): string {
  const normalized = text.replace(/\s+/g, " ")
  const seen = new Set<string>()
  let result = ""

  for (const char of normalized) {
    if (seen.has(char)) {
      continue
    }
    seen.add(char)
    result += char
  }

  return result.trim()
}

function collectNodeText(node: Node): string {
  if (node.type === "text") {
    return node.text
  }

  if (node.type === "container") {
    return (node.children ?? []).map((child) => collectNodeText(child)).join("")
  }

  return ""
}

function extractGoogleFontFamilyName(spec: string): string {
  const separatorIndex = spec.indexOf(":")
  if (separatorIndex === -1) {
    return spec.trim()
  }
  return spec.slice(0, separatorIndex).trim()
}

function buildGoogleFontsCssUrl(spec: string, subsetText: string): string {
  const familyQuery = spec.trim().replace(/\s+/g, "+")
  let url = `${GOOGLE_FONTS_API_URL}?family=${familyQuery}&display=swap`

  if (subsetText) {
    url += `&text=${encodeURIComponent(subsetText)}`
  }

  return url
}

function parseFontWeight(value: string | undefined): number | undefined {
  if (!value) {
    return undefined
  }

  const trimmed = value.trim()
  if (/^\d+$/.test(trimmed)) {
    return Number.parseInt(trimmed, 10)
  }
  if (trimmed === "normal") {
    return 400
  }
  if (trimmed === "bold") {
    return 700
  }

  return undefined
}

interface RemoteFontSource {
  name: string
  url: string
  style?: string
  weight?: number
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      "user-agent": GOOGLE_FONTS_UA,
    },
  })

  if (!response.ok) {
    throw new Error(`请求失败：${response.status} ${response.statusText} (${url})`)
  }

  return response.text()
}

async function fetchBinary(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url, {
    headers: {
      "user-agent": GOOGLE_FONTS_UA,
    },
  })

  if (!response.ok) {
    throw new Error(`下载失败：${response.status} ${response.statusText} (${url})`)
  }

  return response.arrayBuffer()
}

function parseGoogleFontsCss(spec: string, css: string): RemoteFontSource[] {
  const familyName = extractGoogleFontFamilyName(spec)
  const blocks = css.match(/@font-face\s*\{[^}]*\}/gms) ?? []
  const fonts: RemoteFontSource[] = []

  for (const block of blocks) {
    const urlMatch = block.match(/src:\s*[^;]*url\(([^)]+)\)[^;]*;/m)
    if (!urlMatch) {
      continue
    }

    const styleMatch = block.match(/font-style:\s*([^;]+);/m)
    const weightMatch = block.match(/font-weight:\s*([^;]+);/m)
    const url = urlMatch[1].trim().replace(/^['"]|['"]$/g, "")
    const style = styleMatch?.[1]?.trim()
    const weight = parseFontWeight(weightMatch?.[1])

    fonts.push({
      name: familyName,
      url,
      style,
      weight,
    })
  }

  return fonts
}

async function loadGoogleFonts(
  renderer: Renderer,
  specs: string[],
  subsetText: string,
): Promise<void> {
  const remoteFonts: Font[] = []

  for (const spec of specs) {
    const cssUrl = buildGoogleFontsCssUrl(spec, subsetText)
    const css = await fetchText(cssUrl)
    const parsedFonts = parseGoogleFontsCss(spec, css)

    if (parsedFonts.length === 0) {
      throw new Error(`Google Fonts 未返回可用字体文件：${spec}`)
    }

    for (const font of parsedFonts) {
      const data = await fetchBinary(font.url)
      remoteFonts.push({
        name: font.name,
        data,
        style: font.style,
        weight: font.weight,
      })
    }
  }

  if (remoteFonts.length > 0) {
    await renderer.loadFonts(remoteFonts)
    console.log(`  已加载 Google Fonts：${specs.join(", ")}`)
  }
}

function resolveFormat(
  outPath?: string,
  formatArg?: string,
  sceneFormat?: OutputFormat,
): OutputFormat {
  // Extension on --out path takes precedence over --format
  if (outPath) {
    const ext = extname(outPath).toLowerCase().slice(1)
    if (ext === "webp" || ext === "png") return ext
    if (ext === "jpg" || ext === "jpeg") return "jpeg"
  }
  if (formatArg) {
    if (formatArg === "webp" || formatArg === "png") return formatArg
    if (formatArg === "jpg" || formatArg === "jpeg") return "jpeg"
    console.error(`警告：未知格式 "${formatArg}"，已回退到 webp`)
  }
  if (sceneFormat) {
    return sceneFormat
  }
  return DEFAULT_FORMAT
}

function resolveOutputPath(
  scenePath: string,
  outArg: string | undefined,
  format: OutputFormat,
): string {
  if (outArg) return resolve(outArg)
  // Strip extension, take basename, place under dist/
  const stem = scenePath.replace(/\.[^./\\]+$/, "").split(/[\\/]/).pop()!
  const ext = format === "jpeg" ? "jpg" : format
  return resolve("dist", `${stem}.${ext}`)
}

async function loadPersistentImages(
  renderer: Renderer,
  imageArgs: string[],
): Promise<void> {
  for (const entry of imageArgs) {
    const eqIdx = entry.indexOf("=")
    if (eqIdx === -1) {
      console.error(`警告：--image 格式应为 "key=path"，已跳过：${entry}`)
      continue
    }
    const key = entry.slice(0, eqIdx)
    const imgPath = resolve(entry.slice(eqIdx + 1))
    if (!existsSync(imgPath)) {
      console.error(`警告：图片文件不存在，已跳过：${imgPath}`)
      continue
    }
    const data = readFileSync(imgPath)
    await renderer.putPersistentImage(key, data)
    console.log(`  已注册持久图片：${key} → ${imgPath}`)
  }
}

async function main(): Promise<void> {
  const args = parseCliArgs()

  const scenePath = resolve(args.scene)
  if (!existsSync(scenePath)) {
    exitInputError(`找不到 scene 文件：${scenePath}`)
  }

  // Dynamic import with tsx interop (tsx patches Node's module loader)
  const sceneModule = (await import(
    pathToFileURL(scenePath).href
  )) as SceneModule

  const SceneDefault = sceneModule.default
  if (!SceneDefault) {
    exitInputError("scene 模块缺少默认导出（应为 React 组件函数或 React 元素）")
  }

  // CLI args override scene's own renderOptions
  const sceneOpts: Partial<RenderOptions> = sceneModule.renderOptions ?? {}
  const format = resolveFormat(args.out, args.format, sceneOpts.format)
  const width = parsePositiveInteger("width", args.width, sceneOpts.width ?? DEFAULT_WIDTH)
  const height = parsePositiveInteger(
    "height",
    args.height,
    sceneOpts.height ?? DEFAULT_HEIGHT,
  )

  const renderOptions: RenderOptions = { ...sceneOpts, width, height, format }

  // Build React element: component receives --props JSON, element is used as-is
  const parsedProps = parseProps(args.props)
  let element: React.ReactElement
  if (typeof SceneDefault === "function") {
    element = React.createElement(
      SceneDefault as React.ComponentType<Record<string, unknown>>,
      parsedProps,
    )
  } else {
    if (Object.keys(parsedProps).length > 0) {
      console.warn("警告：scene 默认导出是 React 元素，--props 将被忽略。")
    }
    element = SceneDefault as React.ReactElement
  }

  // Set up renderer and register persistent images (--image key=path)
  const renderer = new Renderer()
  const imageArgs = (args.image as string[] | undefined) ?? []
  if (imageArgs.length > 0) await loadPersistentImages(renderer, imageArgs)

  // Convert JSX → Takumi node tree; fromJsx also emits Tailwind stylesheets
  const { node, stylesheets } = await fromJsx(element)

  if (stylesheets.length > 0) {
    renderOptions.stylesheets = [
      ...(renderOptions.stylesheets ?? []),
      ...stylesheets,
    ]
  }

  const googleFontSpecs = uniqueStrings([
    ...(sceneModule.googleFonts ?? []),
    ...((args["google-font"] as string[] | undefined) ?? []),
  ])

  if (googleFontSpecs.length > 0) {
    const subsetText = uniqueCharacters(
      [collectNodeText(node), sceneModule.googleFontText ?? "", args["google-font-text"] ?? ""].join(
        "",
      ),
    )
    await loadGoogleFonts(renderer, googleFontSpecs, subsetText)
  }

  const buffer = await renderer.render(node, renderOptions)

  const outPath = resolveOutputPath(args.scene, args.out, format)
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, buffer)

  console.log(`✓ 渲染完成：${outPath}  (${width}×${height}, ${format})`)
}

main().catch((err: unknown) => {
  if (err instanceof InputError) {
    console.error(`错误：${err.message}`)
    process.exit(2)
  }

  console.error("渲染失败：", err instanceof Error ? err.message : err)
  process.exit(1)
})
