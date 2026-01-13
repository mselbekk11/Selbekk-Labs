"use client";

import { useState, useEffect, useCallback, CSSProperties } from "react";

// ============================================
// CUSTOMIZATION - Edit these values
// ============================================

const CONFIG = {
  typingSpeed: 200,
  lineDelay: 150,
  startDelay: 500,
  cursorBlinkSpeed: 530,
  windowTitle: "selbekk-labs.tsx",
  showLineNumbers: true,
};

// Shorter code snippet that fits better in a small tile
const CODE_CONTENT = `import { useState } from 'react'

interface User {
  id: string
  name: string
}

export function UserCard({ user }: { 
  user: User 
}) {
  const [hovered, setHovered] = 
    useState(false)

  return (
    <div className="card">
      <h2>{user.name}</h2>
    </div>
  )
}`;

// ============================================
// THEME COLORS
// ============================================

const theme = {
  bgEditor: "#0d1117",
  bgTitlebar: "#161b22",
  borderColor: "#30363d",
  textPlain: "#e6edf3",
  textMuted: "#484f58",
  lineNumber: "#484f58",
  cursorColor: "#58a6ff",
  keyword: "#ff7b72",
  string: "#a5d6ff",
  function: "#d2a8ff",
  functionSpecial: "#79c0ff",
  type: "#79c0ff",
  number: "#79c0ff",
  boolean: "#79c0ff",
  comment: "#8b949e",
  tag: "#7ee787",
  property: "#79c0ff",
  punctuation: "#e6edf3",
  operator: "#ff7b72",
};

// ============================================
// STYLES
// ============================================

const styles: Record<string, CSSProperties> = {
  container: {
    fontFamily: '"JetBrains Mono", "Fira Code", "SF Mono", Consolas, monospace',
    fontSize: "10px",
    lineHeight: 1.5,
    width: "100%",
    height: "100%",
    maxWidth: "370px",
    maxHeight: "370px",
  },
  window: {
    background: theme.bgEditor,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: "10px",
    overflow: "hidden",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  },
  titleBar: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 12px",
    background: theme.bgTitlebar,
    borderBottom: `1px solid ${theme.borderColor}`,
    flexShrink: 0,
  },
  windowControls: {
    display: "flex",
    gap: "6px",
  },
  controlClose: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#ff5f57",
  },
  controlMinimize: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#febc2e",
  },
  controlMaximize: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#28c840",
  },
  windowTitle: {
    flex: 1,
    textAlign: "center",
    color: theme.textMuted,
    fontSize: "11px",
    fontWeight: 500,
  },
  spacer: {
    width: "38px",
  },
  codeArea: {
    padding: "12px 0",
    overflowX: "auto",
    overflowY: "auto",
    height: "320px",
  },
  codeLine: {
    display: "flex",
    padding: "0 12px",
    minHeight: "1.5em",
  },
  lineNumber: {
    display: "inline-block",
    width: "28px",
    color: theme.lineNumber,
    textAlign: "right",
    paddingRight: "12px",
    userSelect: "none",
    flexShrink: 0,
  },
  lineContent: {
    flex: 1,
    whiteSpace: "pre",
  },
  cursor: {
    display: "inline-block",
    width: "1.5px",
    height: "1.1em",
    background: theme.cursorColor,
    marginLeft: "1px",
    verticalAlign: "text-bottom",
  },
};

// Token styles
const tokenStyles: Record<string, CSSProperties> = {
  plain: { color: theme.textPlain },
  keyword: { color: theme.keyword },
  string: { color: theme.string },
  function: { color: theme.function },
  functionSpecial: { color: theme.functionSpecial },
  type: { color: theme.type },
  number: { color: theme.number },
  boolean: { color: theme.boolean },
  comment: { color: theme.comment, fontStyle: "italic" },
  tag: { color: theme.tag },
  property: { color: theme.property },
  punctuation: { color: theme.punctuation },
  operator: { color: theme.operator },
};

// ============================================
// TOKEN PATTERNS
// ============================================

const TOKEN_PATTERNS: { pattern: RegExp; type: keyof typeof tokenStyles }[] = [
  {
    pattern:
      /\b(import|export|from|const|let|var|function|return|if|else|interface|type|class|extends|implements|new|typeof|instanceof|async|await)\b/g,
    type: "keyword",
  },
  {
    pattern: /\b(string|number|boolean|void|null|undefined|any|never)\b/g,
    type: "type",
  },
  {
    pattern: /\b(useState|useEffect|useCallback|useMemo|useRef|React)\b/g,
    type: "functionSpecial",
  },
  { pattern: /\b(true|false)\b/g, type: "boolean" },
  { pattern: /"[^"]*"/g, type: "string" },
  { pattern: /'[^']*'/g, type: "string" },
  { pattern: /`[^`]*`/g, type: "string" },
  { pattern: /<\/?[a-zA-Z][a-zA-Z0-9]*|\/>/g, type: "tag" },
  { pattern: /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, type: "function" },
  { pattern: /\b\d+\.?\d*\b/g, type: "number" },
  { pattern: /\/\/.*$/gm, type: "comment" },
  { pattern: /[{}[\]();:,]/g, type: "punctuation" },
  { pattern: /[=+\-*/<>!&|?]+/g, type: "operator" },
];

// ============================================
// COMPONENT
// ============================================

export default function Six() {
  const [displayedCode, setDisplayedCode] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, CONFIG.cursorBlinkSpeed);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let charIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      if (charIndex < CODE_CONTENT.length) {
        setDisplayedCode(CODE_CONTENT.slice(0, charIndex + 1));
        charIndex++;
        const lastChar = CODE_CONTENT[charIndex - 1];
        const delay =
          lastChar === "\n"
            ? CONFIG.typingSpeed + CONFIG.lineDelay
            : CONFIG.typingSpeed;
        timeoutId = setTimeout(typeNextChar, delay);
      }
    };

    timeoutId = setTimeout(typeNextChar, CONFIG.startDelay);
    return () => clearTimeout(timeoutId);
  }, []);

  const highlightCode = useCallback(
    (code: string) => {
      if (!code) return null;

      const lines = code.split("\n");

      return lines.map((line, lineIndex) => {
        const result: JSX.Element[] = [];
        let remaining = line;
        let key = 0;

        while (remaining.length > 0) {
          let earliestMatch: RegExpExecArray | null = null;
          let earliestIndex = remaining.length;
          let matchedType: keyof typeof tokenStyles = "plain";

          for (const { pattern, type } of TOKEN_PATTERNS) {
            pattern.lastIndex = 0;
            const match = pattern.exec(remaining);
            if (match && match.index < earliestIndex) {
              earliestMatch = match;
              earliestIndex = match.index;
              matchedType = type;
            }
          }

          if (earliestMatch) {
            if (earliestIndex > 0) {
              result.push(
                <span key={key++} style={tokenStyles.plain}>
                  {remaining.slice(0, earliestIndex)}
                </span>,
              );
            }
            result.push(
              <span key={key++} style={tokenStyles[matchedType]}>
                {earliestMatch[0]}
              </span>,
            );
            remaining = remaining.slice(
              earliestIndex + earliestMatch[0].length,
            );
          } else {
            result.push(
              <span key={key++} style={tokenStyles.plain}>
                {remaining}
              </span>,
            );
            break;
          }
        }

        return (
          <div key={lineIndex} style={styles.codeLine}>
            {CONFIG.showLineNumbers && (
              <span style={styles.lineNumber}>{lineIndex + 1}</span>
            )}
            <span style={styles.lineContent}>
              {result}
              {lineIndex === lines.length - 1 && (
                <span
                  style={{
                    ...styles.cursor,
                    opacity: cursorVisible ? 1 : 0,
                  }}
                />
              )}
            </span>
          </div>
        );
      });
    },
    [cursorVisible],
  );

  return (
    <div style={styles.container}>
      <div style={styles.window}>
        <div style={styles.titleBar}>
          <div style={styles.windowControls}>
            <div style={styles.controlClose} />
            <div style={styles.controlMinimize} />
            <div style={styles.controlMaximize} />
          </div>
          <span style={styles.windowTitle as CSSProperties}>
            {CONFIG.windowTitle}
          </span>
          <div style={styles.spacer} />
        </div>
        <div style={styles.codeArea}>{highlightCode(displayedCode)}</div>
      </div>
    </div>
  );
}
