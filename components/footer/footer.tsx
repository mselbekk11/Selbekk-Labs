import Image from "next/image";

export default function Footer() {
  return (
    <div className="flex items-center justify-center w-full h-[160px] bg-black">
      <Image src="/logo.svg" alt="Logo" width={40} height={40} />
    </div>
  );
}
