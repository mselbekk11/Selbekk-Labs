"use client";

import { Button } from "@/components/ui/button";
import { ContactDrawer } from "./contact-drawer";
import { ComponentProps } from "react";

type ButtonProps = ComponentProps<typeof Button>;

interface CTAButtonProps extends Omit<ButtonProps, "onClick"> {
  children?: React.ReactNode;
}

export function CTAButton({
  children = "Work with me",
  variant = "labs",
  ...props
}: CTAButtonProps) {
  return (
    <ContactDrawer>
      <Button variant={variant} {...props}>
        {children}
      </Button>
    </ContactDrawer>
  );
}
