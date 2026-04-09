import React from "react"
import type { RenderOptions } from "@takumi-rs/core"
import { MONO_FONT_STACK } from "./_shared"

export const renderOptions: Partial<RenderOptions> = {
  width: 800,
  height: 480,
  format: "webp",
}

interface Props {
  title?: string
  subtitle?: string
  imageKey?: string
  footer?: string
}

function Placeholder() {
  return (
    <div
      tw="w-[240px] h-[240px] border-[4px] border-dashed border-black rounded-[24px] flex flex-col items-center justify-center gap-[12px] bg-white"
      style={{ fontFamily: MONO_FONT_STACK }}
    >
      <div tw="text-[16px] tracking-[4px] text-black">NO IMAGE</div>
      <div tw="text-[11px] text-[#666666] text-center leading-[1.4] px-[18px]">
        pass --image hero=./sprite.png
      </div>
    </div>
  )
}

export default function PixelImageScene({
  title = "PIXEL HERO",
  subtitle = "attach a local sprite and scale it up cleanly",
  imageKey,
  footer = "800x480 · WEBP · pixelated",
}: Props) {
  const imagePanel = imageKey ? (
    <img
      src={imageKey}
      width={240}
      height={240}
      style={{
        width: 240,
        height: 240,
        objectFit: "contain",
        imageRendering: "pixelated",
      }}
    />
  ) : (
    <Placeholder />
  )

  return (
    <div tw="w-[800px] h-[480px] bg-white flex gap-[24px] p-[28px]">
      <div tw="flex-1 border-[4px] border-black rounded-[28px] bg-[#f2f2f2] flex items-center justify-center overflow-hidden">
        {imagePanel}
      </div>

      <div
        tw="w-[260px] border-[4px] border-black rounded-[28px] flex flex-col justify-between p-[24px]"
        style={{ fontFamily: MONO_FONT_STACK }}
      >
        <div tw="flex flex-col gap-[14px]">
          <div tw="text-[12px] tracking-[6px] uppercase text-[#666666]">Takumi scene</div>
          <div tw="text-[38px] leading-[1] font-[700] text-black">{title}</div>
          <div tw="text-[14px] leading-[1.6] text-[#333333]">{subtitle}</div>
        </div>

        <div tw="flex flex-col gap-[10px] text-[12px] text-black">
          <div tw="flex items-center justify-between border-t-[2px] border-black pt-[12px]">
            <span>mode</span>
            <span>image-first</span>
          </div>
          <div tw="flex items-center justify-between">
            <span>src</span>
            <span>{imageKey ?? "placeholder"}</span>
          </div>
          <div tw="flex items-center justify-between">
            <span>render</span>
            <span>pixelated</span>
          </div>
          <div tw="pt-[8px] text-[#666666]">{footer}</div>
        </div>
      </div>
    </div>
  )
}
