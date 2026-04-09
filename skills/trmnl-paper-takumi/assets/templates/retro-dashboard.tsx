/**
 * retro-dashboard.tsx — Terminal-style system monitor for TRMNL e-paper (800×480).
 * Ships with default fake metrics; override via --props JSON.
 */
import type { RenderOptions } from "@takumi-rs/core"
import { MONO_FONT_STACK } from "./_shared"

export const renderOptions: Partial<RenderOptions> = {
  width: 800,
  height: 480,
  format: "webp",
}

/** Single auxiliary gray for all secondary elements. */
const AUX_GRAY = "#999999"

const SEGMENTS = 10

export interface Metric {
  /** Left-aligned label (padded to align bars). */
  label: string
  /** Percentage fill, 0–100. */
  value: number
  /** Human-readable value shown on the right. */
  display: string
}

interface Props {
  title?: string
  metrics?: Metric[]
  uptime?: string
  version?: string
}

const DEFAULT_METRICS: Metric[] = [
  { label: "CPU     ", value: 42, display: " 42%" },
  { label: "MEMORY  ", value: 67, display: " 67%" },
  { label: "DISK    ", value: 28, display: " 28%" },
  { label: "NETWORK ", value: 81, display: "81 KB/s" },
  { label: "TEMP    ", value: 55, display: " 55°C" },
]

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v))
}

function SegmentedBar({ value }: { value: number }) {
  const safe = clamp(value, 0, 100)
  const filled = Math.round((SEGMENTS * safe) / 100)

  return (
    <div style={{ flex: 1, display: "flex", gap: 4, height: 14 }}>
      {Array.from({ length: SEGMENTS }, (_, i) => (
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

function MetricRow({ metric }: { metric: Metric }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        height: 26,
      }}
    >
      <span
        style={{
          fontSize: 13,
          color: "#000000",
          width: 90,
          flexShrink: 0,
        }}
      >
        {metric.label}
      </span>
      <SegmentedBar value={metric.value} />
      <span
        style={{
          fontSize: 13,
          color: "#000000",
          width: 70,
          textAlign: "right",
          flexShrink: 0,
        }}
      >
        {metric.display}
      </span>
    </div>
  )
}

export default function RetroDashboardScene({
  title = "SYS MONITOR",
  metrics = DEFAULT_METRICS,
  uptime = "42d 07h 13m",
  version = "v0.1.0",
}: Props) {
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ")

  return (
    <div
      style={{
        width: 800,
        height: 480,
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        fontFamily: MONO_FONT_STACK,
        padding: 32,
        gap: 0,
      }}
    >
      {/* title bar */}
      <div
        style={{
          background: "#000000",
          color: "#ffffff",
          padding: "8px 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 15, letterSpacing: 4 }}>{"◆ "}{title}</span>
        <span style={{ fontSize: 11, color: AUX_GRAY }}>{timestamp}</span>
      </div>

      {/* metrics panel */}
      <div
        style={{
          flex: 1,
          border: "2px solid #000000",
          borderTop: "none",
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {metrics.map((metric) => (
          <MetricRow key={metric.label} metric={metric} />
        ))}

        {/* separator */}
        <div style={{ height: 1, background: "#000000", marginTop: 2 }} />

        {/* status footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            color: AUX_GRAY,
          }}
        >
          <span>STATUS: OK</span>
          <span>{"UPTIME: "}{uptime}</span>
          <span>{version}</span>
        </div>
      </div>

      {/* bottom accent */}
      <div style={{ background: "#000000", height: 4 }} />
    </div>
  )
}
