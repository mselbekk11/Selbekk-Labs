"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { CTAButton } from "@/components/contact/cta-button";
import { DitherShaderBackground } from "./dither-shader";
import { TextEffect } from "@/components/motion-primitives/text-effect";

const CTA_HEIGHT = "400px";

export default function CTA() {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: CTA_HEIGHT }}
    >
      {/* Background */}
      <DitherShaderBackground />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/60">
        <div className="flex flex-col items-center text-center gap-6 px-4">
          {isInView ? (
            <TextEffect
              per="char"
              as="h2"
              className="text-xl md:text-2xl"
              variants={{
                container: {
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.03 },
                  },
                },
                item: {
                  hidden: { opacity: 0, rotateX: 90, y: 10 },
                  visible: {
                    opacity: 1,
                    rotateX: 0,
                    y: 0,
                    transition: { duration: 0.2 },
                  },
                },
              }}
            >
              Ready to ship your next project?
            </TextEffect>
          ) : (
            <h2 className="text-xl md:text-2xl opacity-0">
              Ready to ship your next project?
            </h2>
          )}
          {isInView && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1.2,
                ease: "easeIn",
                delay: 1.2,
              }}
            >
              <CTAButton />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
