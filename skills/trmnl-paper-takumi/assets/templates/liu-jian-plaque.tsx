import type { RenderOptions } from "@takumi-rs/core"

export const renderOptions: Partial<RenderOptions> = {
  width: 800,
  height: 480,
  format: "webp",
}

export const googleFonts = ["Liu Jian Mao Cao"]

interface Props {
  text?: string
  signature?: string
}

const PLAQUE_FONT_STACK = "'Liu Jian Mao Cao', 'Noto Sans SC', serif"

export default function LiuJianPlaque({
  text = "为人类服务",
  signature = "Codex",
}: Props) {
  const glyphs = Array.from(text.trim())
  const slotWidth = Math.max(90, Math.floor(560 / Math.max(glyphs.length, 1)))
  const fontSize = Math.min(150, Math.floor(slotWidth * 1.34))

  return (
    <div
      style={{
        width: 800,
        height: 480,
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: PLAQUE_FONT_STACK,
      }}
    >
      <div
        style={{
          width: 752,
          height: 380,
          border: "14px solid #000000",
          padding: 14,
          boxSizing: "border-box",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            border: "3px solid #000000",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px 32px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              transform: "translateY(-8px)",
            }}
          >
            {glyphs.map((glyph, index) => (
              <span
                key={`${glyph}-${index}`}
                style={{
                  display: "block",
                  width: slotWidth,
                  fontSize,
                  lineHeight: 1,
                  textAlign: "center",
                  color: "#000000",
                }}
              >
                {glyph}
              </span>
            ))}
          </div>

          <div
            style={{
              position: "absolute",
              right: 28,
              bottom: 18,
              color: "#333333",
              fontSize: 18,
              lineHeight: 1,
              letterSpacing: 1,
              fontFamily: "'Geist', sans-serif",
            }}
          >
            {signature}
          </div>
        </div>
      </div>
    </div>
  )
}
