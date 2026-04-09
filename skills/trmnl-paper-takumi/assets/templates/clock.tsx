/**
 * clock.tsx — Retro monospace clock display for TRMNL e-paper (800×480).
 * Fully self-contained: renders current system time at build time.
 */
import React from "react"
import type { RenderOptions } from "@takumi-rs/core"
import { MONO_FONT_STACK } from "./_shared"

export const renderOptions: Partial<RenderOptions> = {
  width: 800,
  height: 480,
  format: "webp",
}

interface Props {
  /** Label shown in the header badge. */
  label?: string
}

function pad2(n: number): string {
  return String(n).padStart(2, "0")
}

function snapshot() {
  const d = new Date()
  return {
    hh: pad2(d.getHours()),
    mm: pad2(d.getMinutes()),
    ss: pad2(d.getSeconds()),
    date: d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  }
}

export default function ClockScene({ label = "TRMNL" }: Props) {
  const { hh, mm, ss, date } = snapshot()

  return (
    <div
      style={{
        width: 800,
        height: 480,
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: MONO_FONT_STACK,
      }}
    >
      {/* outer frame */}
      <div
        style={{
          width: 720,
          border: "4px solid #000000",
          padding: "28px 48px 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
        }}
      >
        {/* header badge */}
        <div
          style={{
            fontSize: 12,
            letterSpacing: 8,
            color: "#000000",
            textTransform: "uppercase",
          }}
        >
          {"★  "}
          {label}
          {"  ★"}
        </div>

        {/* large time display */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
          <span
            style={{
              fontSize: 130,
              fontWeight: 700,
              lineHeight: 1,
              color: "#000000",
            }}
          >
            {hh}
          </span>
          <span
            style={{
              fontSize: 110,
              fontWeight: 700,
              lineHeight: 1.08,
              color: "#000000",
            }}
          >
            :
          </span>
          <span
            style={{
              fontSize: 130,
              fontWeight: 700,
              lineHeight: 1,
              color: "#000000",
            }}
          >
            {mm}
          </span>
          <span
            style={{
              fontSize: 56,
              fontWeight: 400,
              lineHeight: 1.55,
              color: "#888888",
              marginLeft: 12,
            }}
          >
            {":"}
            {ss}
          </span>
        </div>

        {/* date line */}
        <div
          style={{
            fontSize: 17,
            letterSpacing: 3,
            color: "#333333",
            textTransform: "uppercase",
          }}
        >
          {date}
        </div>

        {/* decorative pixel row */}
        <div style={{ display: "flex", gap: 6 }}>
          {Array.from({ length: 28 }, (_, i) => (
            <div
              key={i}
              style={{
                width: 6,
                height: 6,
                background: i % 4 === 0 ? "#000000" : "#cccccc",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
