import Link from "next/link";
import { Button } from "@/components/ui/button";
import logo from "@/public/logo.svg";
import Image from "next/image";

export default function Header() {
  const menuItems = [
    { label: "Serices", href: "/" },
    { label: "Projects", href: "/about" },
    { label: "Serices", href: "/boom" },
    { label: "Projects", href: "/bop" },
  ];

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-background px-4">
      <div className="max-w-[1300px] mx-auto relative z-10">
        <div className="relative z-2 flex h-16 items-center justify-between lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-semibold"
            >
              <Image src={logo} alt="Logo" width={20} height={20} />
              <span className="text-sm font-semibold">Selbekk Labs</span>
            </Link>
          </div>

          {/* Navigation Menu - Centered */}
          <nav className="hidden lg:flex items-center justify-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center justify-end">
            <Button variant="labs">Work with me</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
