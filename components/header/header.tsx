import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-background border-b border-border">
      <div className="max-w-[1300px] mx-auto px-4">
        <div className="relative z-2 grid h-16 grid-cols-[1fr_auto_auto] items-center gap-4 lg:grid-cols-[auto_1fr_auto]">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-semibold">
              Logo
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
            <Button>Work with me</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
