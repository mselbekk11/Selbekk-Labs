import Image from "next/image";
import { TextEffectWithCustomDelay } from "./text";
import { DottedBorder } from "@/lib/dotted-border";

export default function Hero() {
  return (
    <div className="mx-auto px-4 pt-14 md:pt-28 ">
      <div className="max-w-[1300px] mx-auto flex flex-col gap-4 mb-14">
        <TextEffectWithCustomDelay />
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col">
        <div className="relative">
          <DottedBorder />
          <Image
            src="/sl-hero-7.png"
            alt="Hero image"
            width={1300}
            height={400}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
