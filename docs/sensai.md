# Selbekk Labs — Style & Animation Reference

Instructions for replicating the text animation, button style, and textured background from selbekk.dev.

---

## Dependencies

```bash
npm install motion class-variance-authority clsx tailwind-merge radix-ui
```

Fonts (via `next/font/google`):

```bash
# These are configured in layout.tsx — no extra install needed
```

---

## 1. Fonts

Set up four Google fonts in your root layout:

```tsx
// app/layout.tsx
import { Geist, Geist_Mono, Inter, STIX_Two_Text } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const stixTwoText = STIX_Two_Text({ variable: "--font-stix-two-text", subsets: ["latin"] });

// Apply to <body>:
<body className={`${geistSans.variable} ${geistMono.variable} ${stixTwoText.variable} ${inter.variable} antialiased`}>
```

Map CSS variables in your global CSS `@theme` block:

```css
@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --font-inter: var(--font-inter);
  --font-stix-two-text: var(--font-stix-two-text);
}
```

---

## 2. Text Animation (TextEffect component)

### Utility: `cn`

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### TextEffect component

Create `components/motion-primitives/text-effect.tsx`:

```tsx
'use client';
import { cn } from '@/lib/utils';
import {
  AnimatePresence,
  motion
} from 'motion/react';
import type {
  TargetAndTransition,
  Transition,
  Variant,
  Variants,
} from 'motion/react'
import React from 'react';

export type PresetType = 'blur' | 'fade-in-blur' | 'scale' | 'fade' | 'slide';
export type PerType = 'word' | 'char' | 'line';

export type TextEffectProps = {
  children: string;
  per?: PerType;
  as?: keyof React.JSX.IntrinsicElements;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  className?: string;
  preset?: PresetType;
  delay?: number;
  speedReveal?: number;
  speedSegment?: number;
  trigger?: boolean;
  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;
  segmentWrapperClassName?: string;
  containerTransition?: Transition;
  segmentTransition?: Transition;
  style?: React.CSSProperties;
};

const defaultStaggerTimes: Record<PerType, number> = {
  char: 0.03,
  word: 0.05,
  line: 0.1,
};

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const presetVariants: Record<PresetType, { container: Variants; item: Variants }> = {
  blur: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(12px)' },
      visible: { opacity: 1, filter: 'blur(0px)' },
      exit: { opacity: 0, filter: 'blur(12px)' },
    },
  },
  'fade-in-blur': {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20, filter: 'blur(12px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
      exit: { opacity: 0, y: 20, filter: 'blur(12px)' },
    },
  },
  scale: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 0 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0 },
    },
  },
  fade: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    },
  },
  slide: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
  },
};

const AnimationComponent: React.FC<{
  segment: string;
  variants: Variants;
  per: 'line' | 'word' | 'char';
  segmentWrapperClassName?: string;
}> = React.memo(({ segment, variants, per, segmentWrapperClassName }) => {
  const content =
    per === 'line' ? (
      <motion.span variants={variants} className='block'>
        {segment}
      </motion.span>
    ) : per === 'word' ? (
      <motion.span aria-hidden='true' variants={variants} className='inline-block whitespace-pre'>
        {segment}
      </motion.span>
    ) : (
      <motion.span className='inline-block whitespace-pre'>
        {segment.split('').map((char, charIndex) => (
          <motion.span
            key={`char-${charIndex}`}
            aria-hidden='true'
            variants={variants}
            className='inline-block whitespace-pre'
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    );

  if (!segmentWrapperClassName) return content;

  const defaultWrapperClassName = per === 'line' ? 'block' : 'inline-block';
  return (
    <span className={cn(defaultWrapperClassName, segmentWrapperClassName)}>
      {content}
    </span>
  );
});

AnimationComponent.displayName = 'AnimationComponent';

const splitText = (text: string, per: PerType) => {
  if (per === 'line') return text.split('\n');
  return text.split(/(\s+)/);
};

const hasTransition = (
  variant?: Variant
): variant is TargetAndTransition & { transition?: Transition } => {
  if (!variant) return false;
  return typeof variant === 'object' && 'transition' in variant;
};

const createVariantsWithTransition = (
  baseVariants: Variants,
  transition?: Transition & { exit?: Transition }
): Variants => {
  if (!transition) return baseVariants;
  const { exit: _, ...mainTransition } = transition;
  return {
    ...baseVariants,
    visible: {
      ...baseVariants.visible,
      transition: {
        ...(hasTransition(baseVariants.visible) ? baseVariants.visible.transition : {}),
        ...mainTransition,
      },
    },
    exit: {
      ...baseVariants.exit,
      transition: {
        ...(hasTransition(baseVariants.exit) ? baseVariants.exit.transition : {}),
        ...mainTransition,
        staggerDirection: -1,
      },
    },
  };
};

export function TextEffect({
  children,
  per = 'word',
  as = 'p',
  variants,
  className,
  preset = 'fade',
  delay = 0,
  speedReveal = 1,
  speedSegment = 1,
  trigger = true,
  onAnimationComplete,
  onAnimationStart,
  segmentWrapperClassName,
  containerTransition,
  segmentTransition,
  style,
}: TextEffectProps) {
  const segments = splitText(children, per);
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  const baseVariants = preset
    ? presetVariants[preset]
    : { container: defaultContainerVariants, item: defaultItemVariants };

  const stagger = defaultStaggerTimes[per] / speedReveal;
  const baseDuration = 0.3 / speedSegment;

  const customStagger = hasTransition(variants?.container?.visible ?? {})
    ? (variants?.container?.visible as TargetAndTransition).transition?.staggerChildren
    : undefined;

  const customDelay = hasTransition(variants?.container?.visible ?? {})
    ? (variants?.container?.visible as TargetAndTransition).transition?.delayChildren
    : undefined;

  const computedVariants = {
    container: createVariantsWithTransition(
      variants?.container || baseVariants.container,
      {
        staggerChildren: customStagger ?? stagger,
        delayChildren: customDelay ?? delay,
        ...containerTransition,
        exit: { staggerChildren: customStagger ?? stagger, staggerDirection: -1 },
      }
    ),
    item: createVariantsWithTransition(variants?.item || baseVariants.item, {
      duration: baseDuration,
      ...segmentTransition,
    }),
  };

  return (
    <AnimatePresence mode='popLayout'>
      {trigger && (
        <MotionTag
          initial='hidden'
          animate='visible'
          exit='exit'
          variants={computedVariants.container}
          className={className}
          onAnimationComplete={onAnimationComplete}
          onAnimationStart={onAnimationStart}
          style={style}
        >
          {per !== 'line' ? <span className='sr-only'>{children}</span> : null}
          {segments.map((segment, index) => (
            <AnimationComponent
              key={`${per}-${index}-${segment}`}
              segment={segment}
              variants={computedVariants.item}
              per={per}
              segmentWrapperClassName={segmentWrapperClassName}
            />
          ))}
        </MotionTag>
      )}
    </AnimatePresence>
  );
}
```

### Usage — the hero text style

The hero text uses per-character animation with a 3D rotateX flip:

```tsx
"use client";
import { TextEffect } from "@/components/motion-primitives/text-effect";

<TextEffect
  per="char"
  className="text-2xl font-medium tracking-[-0.03em] font-sans text-white"
  delay={0.5}
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
  Your text here
</TextEffect>
```

Key text style properties:
- `text-2xl` (1.5rem / 24px)
- `font-medium` (500 weight)
- `tracking-[-0.03em]` (tight letter spacing)
- `font-sans` (maps to Geist Sans via CSS variable)
- `text-white`

Available presets (use instead of custom variants for simpler effects): `blur`, `fade-in-blur`, `scale`, `fade`, `slide`.

---

## 3. Button

### Button component

Create `components/ui/button.tsx`:

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-lg border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-[3px] aria-invalid:ring-[3px] [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        labs: "bg-white text-primary-foreground [a]:hover:bg-primary/80 rounded-4xl px-4!",
        outline: "border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground",
        square: "border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground rounded-none",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost: "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive: "bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem]",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-8",
        "icon-xs": "size-6 rounded-[min(var(--radius-md),10px)]",
        "icon-sm": "size-7 rounded-[min(var(--radius-md),12px)]",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
```

### The "labs" button style

The signature CTA button uses the `labs` variant:
- White background (`bg-white`)
- Dark text (`text-primary-foreground`)
- Fully rounded (`rounded-4xl`)
- Extra horizontal padding (`px-4!`)

```tsx
<Button variant="labs" size="lg">
  Work with me
</Button>
```

---

## 4. Textured Grain Background

### Step 1: Create the texture SVG

Save this as `public/texture-two.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 700 700" width="700" height="700" opacity="1"><defs><filter id="nnnoise-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB">
	<feTurbulence type="fractalNoise" baseFrequency="0.113" numOctaves="4" seed="15" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
	<feSpecularLighting surfaceScale="14" specularConstant="0.7" specularExponent="20" lighting-color="#797979" x="0%" y="0%" width="100%" height="100%" in="turbulence" result="specularLighting">
    		<feDistantLight azimuth="3" elevation="117"></feDistantLight>
  	</feSpecularLighting>

</filter></defs><rect width="700" height="700" fill="#14130eff"></rect><rect width="700" height="700" fill="#797979" filter="url(#nnnoise-filter)"></rect></svg>
```

### Step 2: Apply via global CSS

In your `globals.css`, add this to the `@layer base` block:

```css
@layer base {
  body {
    @apply bg-background text-foreground;
    position: relative;
    min-height: 100vh;
    overflow-x: clip;
  }

  body::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-image: url(/texture-two.svg);
    background-repeat: repeat;
    background-size: 100px 100px;
    opacity: 0.3;
    pointer-events: none;
    z-index: 0;
  }
}
```

Key details:
- The SVG uses `feTurbulence` with fractal noise at 11.3% frequency, 4 octaves
- Tiled at 100x100px and repeated across the entire page
- Opacity 0.3 keeps it subtle
- `pointer-events: none` ensures it doesn't block interaction
- `z-index: 0` keeps it behind content — make sure your main content has `position: relative; z-index: 10` or similar

### Step 3: Dark mode is required

The texture is designed for a dark background. Enable dark mode on the html element:

```tsx
<html lang="en" className="dark">
```

And include these dark mode CSS variables in your globals:

```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.87 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.371 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --radius: 0.45rem;
}
```

---

## 5. Global Typography

These base styles are applied globally:

```css
@layer base {
  h1 {
    @apply text-lg md:text-2xl font-medium tracking-[-0.03em] font-sans text-white;
  }
  h2 {
    @apply text-base md:text-xl font-semibold tracking-[-0.03em] font-sans text-white;
  }
  p {
    @apply text-sm md:text-base font-normal text-white tracking-[-0.02em] font-sans;
  }
}
```

---

## Quick Start Checklist

1. Install deps: `motion`, `class-variance-authority`, `clsx`, `tailwind-merge`, `radix-ui`
2. Set up fonts in `layout.tsx` (Inter, Geist, Geist Mono, STIX Two Text)
3. Copy `lib/utils.ts` (the `cn` helper)
4. Copy `components/motion-primitives/text-effect.tsx`
5. Copy `components/ui/button.tsx`
6. Save `texture-two.svg` to `public/`
7. Add texture overlay + dark mode variables + typography to `globals.css`
8. Set `className="dark"` on `<html>`
9. Ensure main content wrapper has `position: relative; z-index: 10`
