"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Form from "./form";

interface ContactDrawerProps {
  children: React.ReactNode;
}

export function ContactDrawer({ children }: ContactDrawerProps) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-full">
        <DrawerHeader className="relative">
          <DrawerClose asChild>
            <button className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors">
              <X className="h-5 w-5" />
            </button>
          </DrawerClose>
          <DrawerTitle className="text-xl">Get in touch</DrawerTitle>
          <DrawerDescription>
            Fill out the form below and I&apos;ll get back to you as soon as
            possible.
          </DrawerDescription>
        </DrawerHeader>

        {/*
          =============================================
          CONTACT FORM - Edit your form fields below
          =============================================
        */}
        <div className="flex-1 overflow-y-auto px-4">
          <Form />
        </div>
        {/*
          =============================================
          END CONTACT FORM
          =============================================
        */}

        <DrawerFooter>
          <Button variant="labs" className="w-full">
            Send message
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
