import Image from "next/image";

export default function One() {
  return (
    <div className="h-full w-full flex items-center justify-end">
      <Image
        src="/code.png"
        alt="One"
        width={400}
        height={300}
        className="h-full w-auto object-cover object-right"
      />
    </div>
  );
}
