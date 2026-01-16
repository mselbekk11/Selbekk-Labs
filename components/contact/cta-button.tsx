"use client";

import { useState, useEffect, ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { ContactDrawer } from "./contact-drawer";

type ButtonProps = ComponentProps<typeof Button>;

interface CTAButtonProps extends Omit<ButtonProps, "onClick"> {
  children?: React.ReactNode;
}

export function CTAButton({
  children = "Work with me",
  variant = "labs",
  ...props
}: CTAButtonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render button without drawer on server to avoid hydration mismatch
  if (!mounted) {
    return (
      <Button variant={variant} {...props}>
        {children}
      </Button>
    );
  }

  return (
    <ContactDrawer>
      <Button variant={variant} {...props}>
        {children}
      </Button>
    </ContactDrawer>
  );
}
