import { Button } from "../ui/button";
import { DitherShaderBackground } from "./dither-shader";

const CTA_HEIGHT = "400px";

export default function CTA() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: CTA_HEIGHT }}
    >
      {/* Background */}
      <DitherShaderBackground />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/60">
        <div className="flex flex-col items-center text-center gap-6 px-4">
          <h2 className="text-xl md:text-2xl ">
            Ready to ship your next project?
          </h2>
          {/* <p className="text-lg md:text-xl text-white max-w-xl">
            Let&apos;s build something amazing together. Get in touch today.
          </p> */}
          <Button variant="labs" className="">
            Work with me
          </Button>
        </div>
      </div>
    </div>
  );
}
