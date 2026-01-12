import { Button } from "../ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="mx-auto px-4 pt-28 ">
      <div className="max-w-[1300px] mx-auto flex flex-col gap-4 mb-14">
        <h1 className="font-sans">
          Beautiful websites and AI-powered experiences, <br />
          Engineered for agencies and small businesses.
        </h1>
        <div>
          <Button>Work with me</Button>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col">
        <Image
          src="/sl-hero-2.png"
          alt="Hero image"
          width={1300}
          height={400}
          className="w-full rounded-[5px]"
        />
      </div>
    </div>
  );
}
