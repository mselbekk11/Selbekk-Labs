"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
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

export function ContactDrawer({ children }: ContactDrawerProps) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-full w-full! md:w-[600px]! max-w-none! md:max-w-[600px]! p-6 md:p-8">
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
