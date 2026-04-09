import type { RenderOptions } from "@takumi-rs/core"
import { MONO_FONT_STACK, SANS_FONT_STACK, SHOWCASE_GOOGLE_FONTS } from "./_shared"

export const renderOptions: Partial<RenderOptions> = {
  width: 800,
  height: 480,
  format: "webp",
}

export const googleFonts = [
  ...SHOWCASE_GOOGLE_FONTS,
  "IBM Plex Mono:wght@400;500;600;700",
]

interface UsageRow {
  label: string
  progress: number
  rightText: string
}

interface Props {
  brand?: string
  footerLabel?: string
  mainLabel?: string
  mainPercent?: number
  mainReset?: string
  rows?: UsageRow[]
}

const DEFAULT_ROWS: UsageRow[] = [
  { label: "每周使用限额", progress: 99, rightText: "99% · 04/08" },
  { label: "Spark 5小时", progress: 100, rightText: "100%" },
  { label: "Spark 每周", progress: 92, rightText: "92% · 04/03" },
  { label: "代码审查", progress: 100, rightText: "100%" },
]

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function SegmentedBar({ progress }: { progress: number }) {
  const safe = clamp(progress, 0, 100)
  const segments = 12
  const filled = Math.round((segments * safe) / 100)

  return (
    <div style={{ display: "flex", gap: 6, width: "100%", height: 16 }}>
      {Array.from({ length: segments }, (_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            backgroundColor: i < filled ? "#000000" : "transparent",
            border: i < filled ? "none" : "2px solid #000000",
          }}
        />
      ))}
    </div>
  )
}

function UsageRowItem({ row }: { row: UsageRow }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 800,
            lineHeight: 1,
            color: "#000000",
            fontFamily: SANS_FONT_STACK,
          }}
        >
          {row.label}
        </div>
        <div
          style={{
            fontSize: 20,
            lineHeight: 1,
            fontWeight: 600,
            color: "#000000",
            fontFamily: MONO_FONT_STACK,
            letterSpacing: 1,
          }}
        >
          {row.rightText}
        </div>
      </div>
      <SegmentedBar progress={row.progress} />
    </div>
  )
}

function CodexMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
      {Array.from({ length: 6 }, (_, i) => (
        <rect
          key={i}
          x="14"
          y="2"
          width="4"
          height="10"
          fill="#000000"
          transform={`rotate(${i * 60} 16 16)`}
        />
      ))}
    </svg>
  )
}

export default function CodexUsageStats({
  brand = "CODEX",
  footerLabel = "SYS_STAT",
  mainLabel = "剩余额度",
  mainPercent = 98,
  mainReset = "重置: 20:50",
  rows = DEFAULT_ROWS,
}: Props) {
  return (
    <div
      style={{
        width: 800,
        height: 480,
        background: "#ffffff",
        color: "#000000",
        display: "flex",
        fontFamily: SANS_FONT_STACK,
        padding: 40,
        gap: 60,
      }}
    >
      {/* Left Column: Hero Number */}
      <div
        style={{
          width: 320,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 160,
              fontWeight: 900,
              lineHeight: 0.8,
              letterSpacing: -8,
              color: "#000000",
              fontFamily: MONO_FONT_STACK,
              marginLeft: -8,
            }}
          >
            {mainPercent}<span style={{ fontSize: 80, letterSpacing: -2 }}>%</span>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: "#000000",
                letterSpacing: 2,
              }}
            >
              {mainLabel}
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: "#000000",
                fontFamily: MONO_FONT_STACK,
                letterSpacing: 2,
              }}
            >
              {mainReset}
            </div>
          </div>
        </div>

        {/* Bottom Left: Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <CodexMark />
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "#000000",
              fontFamily: MONO_FONT_STACK,
              letterSpacing: 4,
            }}
          >
            {brand}
          </div>
        </div>
      </div>

      {/* Right Column: Bars */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 36,
          borderLeft: "4px solid #000000",
          paddingLeft: 40,
        }}
      >
        {rows.map((row) => (
          <UsageRowItem key={row.label} row={row} />
        ))}
      </div>
    </div>
  )
}
