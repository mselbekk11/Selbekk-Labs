"use client";

import { TextEffect } from "@/components/motion-primitives/text-effect";
import { motion } from "motion/react";
import { CTAButton } from "@/components/contact/cta-button";

export function TextEffectWithCustomDelay() {
  return (
    <div className="flex flex-col gap-0 md:gap-4">
      <div className="flex flex-col space-y-0">
        <TextEffect
          per="char"
          className="text-sm md:text-2xl font-medium tracking-[-0.03em] font-sans text-white"
          delay={0.5}
          variants={{
            container: {
              hidden: {
                opacity: 0,
              },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.03,
                },
              },
            },
            item: {
              hidden: {
                opacity: 0,
                rotateX: 90,
                y: 10,
              },
              visible: {
                opacity: 1,
                rotateX: 0,
                y: 0,
                transition: {
                  duration: 0.2,
                },
              },
            },
          }}
        >
          Beautiful websites and AI-powered experiences,
        </TextEffect>
        <TextEffect
          per="char"
          delay={1.5}
          className="text-sm md:text-2xl font-medium tracking-[-0.03em] font-sans text-white"
        >
          Engineered for agencies and small businesses.
        </TextEffect>
      </div>
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: "easeIn",
          delay: 2.5,
        }}
      >
        <CTAButton size="lg" className="hidden md:block" />
      </motion.div>
    </div>
  );
}
