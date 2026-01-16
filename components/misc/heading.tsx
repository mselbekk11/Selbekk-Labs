"use client";

import { useRef, useState, useEffect } from "react";
import { TextEffect } from "@/components/motion-primitives/text-effect";

export default function Heading({ title }: { title: string }) {
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
    <div ref={containerRef} className="flex flex-col md:pl-5">
      {isInView ? (
        <TextEffect
          per="char"
          as="h2"
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
          {title}
        </TextEffect>
      ) : (
        <h2 className="opacity-0">{title}</h2>
      )}
    </div>
  );
}
