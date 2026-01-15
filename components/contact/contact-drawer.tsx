"use client";

import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { X } from "lucide-react";
import { ContactForm } from "./form";
import { VisuallyHidden } from "radix-ui";

interface ContactDrawerProps {
  children: React.ReactNode;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

export function ContactDrawer({ children }: ContactDrawerProps) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className={isMobile ? "max-h-[90vh] p-6" : "h-full p-8"}>
        <DrawerHeader className="relative">
          <div className="flex items-center justify-between mb-8">
            <h2>Get in touch</h2>
            <DrawerClose asChild>
              <button className="text-gray-400 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </button>
            </DrawerClose>
          </div>
          <VisuallyHidden.Root>
            <DrawerTitle className="text-xl">Get in touch</DrawerTitle>
          </VisuallyHidden.Root>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto pb-6">
          <ContactForm />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
