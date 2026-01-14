import React from "react";
import Image from "next/image";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";

export default function Three() {
  return (
    <div className="bg-[#10100D] w-full h-full relative overflow-hidden rounded-lg">
      <DottedGlowBackground
        className="pointer-events-none mask-radial-to-90% mask-radial-at-center"
        opacity={2}
        gap={7}
        radius={1.6}
        colorLightVar="--color-neutral-500"
        glowColorLightVar="--color-neutral-600"
        colorDarkVar="--color-neutral-500"
        glowColorDarkVar="--color-sky-800"
        backgroundOpacity={0}
        speedMin={0.8}
        speedMax={1.6}
        speedScale={1}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-18 h-18 rounded-full bg-[#10100D] flex items-center justify-center shadow-[0_0_40px_20px_rgba(0,0,0,0.9)] border border-[#404040]">
          <Image
            src="/logo-S.svg"
            alt="Logo"
            width={30}
            height={30}
          />
        </div>
      </div>
    </div>
  );
}
