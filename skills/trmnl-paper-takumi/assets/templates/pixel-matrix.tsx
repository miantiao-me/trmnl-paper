/**
 * pixel-matrix.tsx — Static pixel-art tile pattern for TRMNL e-paper (800×480).
 * Completely self-contained: no external data or images required.
 */
import React from "react"
import type { RenderOptions } from "@takumi-rs/core"
import { MONO_FONT_STACK } from "./_shared"

export const renderOptions: Partial<RenderOptions> = {
  width: 800,
  height: 480,
  format: "webp",
}

const COLS = 24
const ROWS = 14
const CELL = 26
const GAP = 4

/**
 * Returns a fill level 0–3 for each cell based on its position.
 * Creates a repeating diamond / cross motif across the grid.
 */
function cellLevel(r: number, c: number): number {
  const rMod = r % 4
  const cMod = c % 4
  const diag = (rMod + cMod) % 4
  if (diag === 0) return 3 // black
  if (diag === 2) return 1 // light gray
  return 0 // white
}

const FILLS = ["#f5f5f5", "#aaaaaa", "#555555", "#000000"]

export default function PixelMatrixScene() {
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
        gap: 24,
        fontFamily: MONO_FONT_STACK,
      }}
    >
      {/* pixel grid */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: GAP,
        }}
      >
        {Array.from({ length: ROWS }, (_, r) => (
          <div key={r} style={{ display: "flex", gap: GAP }}>
            {Array.from({ length: COLS }, (_, c) => (
              <div
                key={c}
                style={{
                  width: CELL,
                  height: CELL,
                  background: FILLS[cellLevel(r, c)],
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* footer label */}
      <div
        style={{
          fontSize: 12,
          letterSpacing: 7,
          color: "#888888",
          textTransform: "uppercase",
        }}
      >
        pixel  matrix  v1.0
      </div>
    </div>
  )
}
