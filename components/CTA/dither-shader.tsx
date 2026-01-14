"use client";
import { DitherShader } from "@/components/ui/dither-shader";

export function DitherShaderBackground() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <div className="absolute bottom-0 left-0 right-0 h-[800px]">
        <DitherShader
          src="/sl-hero-7.png"
          gridSize={1}
          ditherMode="bayer"
          colorMode="duotone"
          invert={false}
          animated={false}
          animationSpeed={0.02}
          primaryColor="#181818"
          secondaryColor="#ffffff"
          threshold={0.2}
          className="w-full h-full object-cover object-bottom"
        />
      </div>
    </div>
  );
}

export function DitherShaderDemo() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
        <DitherShader
          src="/sl-hero-7.png"
          gridSize={1}
          ditherMode="bayer"
          colorMode="duotone"
          invert={false}
          animated={false}
          animationSpeed={0.02}
          primaryColor="#181818"
          secondaryColor="#ffffff"
          threshold={0.3}
          className="min-h-[800px] min-w-[1300px] w-full"
        />
      </div>
    </div>
  );
}
