// Decorative dotted border line styles that extend past corners
// Creates a cross effect at each corner of a container

const dottedLineBase = {
  position: "absolute" as const,
  pointerEvents: "none" as const,
};

export const verticalDotStyle = {
  ...dottedLineBase,
  width: "1px",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 8'%3E%3Crect width='1' height='4' fill='%23505050'/%3E%3C/svg%3E")`,
  maskImage: "linear-gradient(transparent, white 2.5rem, white calc(100% - 2.5rem), transparent)",
  WebkitMaskImage: "linear-gradient(transparent, white 2.5rem, white calc(100% - 2.5rem), transparent)",
  marginTop: "-3.5rem",
  marginBottom: "-3.5rem",
};

export const horizontalDotStyle = {
  ...dottedLineBase,
  height: "1px",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 1'%3E%3Crect width='4' height='1' fill='%23505050'/%3E%3C/svg%3E")`,
  maskImage: "linear-gradient(to right, transparent, white 2.5rem, white calc(100% - 2.5rem), transparent)",
  WebkitMaskImage: "linear-gradient(to right, transparent, white 2.5rem, white calc(100% - 2.5rem), transparent)",
};

// React component for easy reuse
export function DottedBorder({ className = "" }: { className?: string }) {
  return (
    <>
      <div aria-hidden="true" className={`inset-y-0 -left-px z-20 ${className}`} style={verticalDotStyle} />
      <div aria-hidden="true" className={`inset-y-0 -right-px z-20 ${className}`} style={verticalDotStyle} />
      <div aria-hidden="true" className={`inset-x-0 -top-px z-20 md:-mx-14 ${className}`} style={horizontalDotStyle} />
      <div aria-hidden="true" className={`inset-x-0 -bottom-px z-20 md:-mx-14 ${className}`} style={horizontalDotStyle} />
    </>
  );
}
