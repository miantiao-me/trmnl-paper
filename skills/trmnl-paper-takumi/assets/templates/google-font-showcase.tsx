import React from "react"
import type { RenderOptions } from "@takumi-rs/core"
import { SANS_FONT_STACK, SHOWCASE_GOOGLE_FONTS } from "./_shared"

export const renderOptions: Partial<RenderOptions> = {
  width: 800,
  height: 480,
  format: "webp",
}

export const googleFonts = SHOWCASE_GOOGLE_FONTS

interface Props {
  title?: string
  subtitle?: string
  symbols?: string
}

export default function GoogleFontShowcase({
  title = "中文字体与符号演示",
  subtitle = "天气：晴转多云，气温 24°C，湿度 68%，状态：正常运行",
  symbols = "☀ ☁ ☂ ★ ✓ → ↓ ↑ ℃ ¥ § ♫",
}: Props) {
  return (
    <div
      tw="w-[800px] h-[480px] bg-white p-[32px] flex flex-col gap-[22px]"
      style={{ fontFamily: SANS_FONT_STACK }}
    >
      <div tw="border-[4px] border-black rounded-[24px] p-[24px] flex flex-col gap-[14px]">
        <div tw="text-[14px] tracking-[6px] uppercase text-[#666666]">Google Fonts</div>
        <div tw="text-[38px] leading-[1.2] font-[700] text-black">{title}</div>
        <div tw="text-[19px] leading-[1.7] text-[#222222]">{subtitle}</div>
      </div>

      <div tw="grid grid-cols-[1fr_220px] gap-[20px] flex-1">
        <div tw="border-[4px] border-black rounded-[24px] p-[24px] flex flex-col gap-[16px]">
          <div tw="text-[14px] uppercase tracking-[4px] text-[#666666]">Mixed glyphs</div>
          <div tw="text-[56px] leading-[1.1] font-[700] text-black">数据同步成功 ✓</div>
          <div tw="text-[26px] leading-[1.6] text-[#333333]">
            今日提醒：09:30 开会 → 12:00 午餐 → 18:30 跑步 5 km
          </div>
        </div>

        <div tw="border-[4px] border-black rounded-[24px] p-[20px] flex flex-col justify-between">
          <div tw="text-[14px] uppercase tracking-[4px] text-[#666666]">Symbols</div>
          <div tw="text-[28px] leading-[1.8] text-black break-words">{symbols}</div>
          <div tw="text-[12px] text-[#666666]">Noto Sans SC + Noto Sans Symbols 2</div>
        </div>
      </div>
    </div>
  )
}
