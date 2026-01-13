"use client";

import { useState, useEffect, useCallback } from "react";

// ============================================
// CUSTOMIZATION - Edit these values
// ============================================

const CONFIG = {
  // Typing speed (ms per character)
  typingSpeed: 40,
  // Delay between lines (ms)
  lineDelay: 150,
  // Initial delay before typing starts (ms)
  startDelay: 500,
  // Cursor blink speed (ms)
  cursorBlinkSpeed: 530,
  // Window title
  windowTitle: "selbekk-labs.tsx",
  // Show line numbers
  showLineNumbers: true,
};

// The code to display - edit this!
const CODE_CONTENT = `import { useState } from 'react'

interface User {
  id: string
  name: string
  email: string
}

export function UserCard({ user }: { user: User }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="user-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      {isHovered && <span>Click to view profile</span>}
    </div>
  )
}`;

// ============================================
// SYNTAX HIGHLIGHTING - Token definitions
// ============================================

const TOKEN_PATTERNS = [
  // Keywords
  {
    pattern:
      /\b(import|export|from|const|let|var|function|return|if|else|interface|type|class|extends|implements|new|typeof|instanceof|async|await|try|catch|throw|finally)\b/g,
    className: "token-keyword",
  },
  // Built-in types
  {
    pattern: /\b(string|number|boolean|void|null|undefined|any|never)\b/g,
    className: "token-type",
  },
  // React/special
  {
    pattern: /\b(useState|useEffect|useCallback|useMemo|useRef|React)\b/g,
    className: "token-function-special",
  },
  // Booleans
  {
    pattern: /\b(true|false)\b/g,
    className: "token-boolean",
  },
  // Strings (double quotes)
  {
    pattern: /"[^"]*"/g,
    className: "token-string",
  },
  // Strings (single quotes)
  {
    pattern: /'[^']*'/g,
    className: "token-string",
  },
  // Template literals
  {
    pattern: /`[^`]*`/g,
    className: "token-string",
  },
  // JSX tags
  {
    pattern: /<\/?[a-zA-Z][a-zA-Z0-9]*|\/>/g,
    className: "token-tag",
  },
  // Function calls
  {
    pattern: /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g,
    className: "token-function",
  },
  // Numbers
  {
    pattern: /\b\d+\.?\d*\b/g,
    className: "token-number",
  },
  // Comments
  {
    pattern: /\/\/.*$/gm,
    className: "token-comment",
  },
  // Punctuation
  {
    pattern: /[{}[\]();:,]/g,
    className: "token-punctuation",
  },
  // Operators
  {
    pattern: /[=+\-*/<>!&|?]+/g,
    className: "token-operator",
  },
  // Properties/attributes
  {
    pattern: /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g,
    className: "token-property",
  },
];

// ============================================
// COMPONENT
// ============================================

export default function Five() {
  const [displayedCode, setDisplayedCode] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, CONFIG.cursorBlinkSpeed);
    return () => clearInterval(interval);
  }, []);

  // Typing animation
  useEffect(() => {
    let charIndex = 0;
    let timeoutId;

    const typeNextChar = () => {
      if (charIndex < CODE_CONTENT.length) {
        setDisplayedCode(CODE_CONTENT.slice(0, charIndex + 1));
        charIndex++;

        // Add extra delay after newlines
        const lastChar = CODE_CONTENT[charIndex - 1];
        const delay =
          lastChar === "\n"
            ? CONFIG.typingSpeed + CONFIG.lineDelay
            : CONFIG.typingSpeed;

        timeoutId = setTimeout(typeNextChar, delay);
      } else {
        setIsTypingComplete(true);
      }
    };

    timeoutId = setTimeout(typeNextChar, CONFIG.startDelay);
    return () => clearTimeout(timeoutId);
  }, []);

  // Simple syntax highlighting
  const highlightCode = useCallback((code) => {
    if (!code) return null;

    const lines = code.split("\n");

    return lines.map((line, lineIndex) => {
      // Tokenize the line
      let result = [];
      let remaining = line;
      let key = 0;

      while (remaining.length > 0) {
        let earliestMatch = null;
        let earliestIndex = remaining.length;
        let matchedPattern = null;

        // Find the earliest match
        for (const { pattern, className } of TOKEN_PATTERNS) {
          pattern.lastIndex = 0;
          const match = pattern.exec(remaining);
          if (match && match.index < earliestIndex) {
            earliestMatch = match;
            earliestIndex = match.index;
            matchedPattern = className;
          }
        }

        if (earliestMatch) {
          // Add text before match
          if (earliestIndex > 0) {
            result.push(
              <span key={key++} className="token-plain">
                {remaining.slice(0, earliestIndex)}
              </span>
            );
          }
          // Add matched token
          result.push(
            <span key={key++} className={matchedPattern}>
              {earliestMatch[0]}
            </span>
          );
          remaining = remaining.slice(earliestIndex + earliestMatch[0].length);
        } else {
          // No more matches, add remaining text
          result.push(
            <span key={key++} className="token-plain">
              {remaining}
            </span>
          );
          break;
        }
      }

      return (
        <div key={lineIndex} className="code-line">
          {CONFIG.showLineNumbers && (
            <span className="line-number">{lineIndex + 1}</span>
          )}
          <span className="line-content">
            {result}
            {lineIndex === lines.length - 1 && (
              <span
                className={`cursor ${cursorVisible ? "visible" : "hidden"}`}
              />
            )}
          </span>
        </div>
      );
    });
  }, [cursorVisible]);

  return (
    <>
      <style jsx>{`
        .editor-container {
          --bg-editor: #0d1117;
          --bg-titlebar: #161b22;
          --bg-line-number: #0d1117;
          --border-color: #30363d;
          --text-plain: #e6edf3;
          --text-muted: #484f58;
          --line-number: #484f58;
          --cursor-color: #58a6ff;

          /* Syntax colors - GitHub Dark theme inspired */
          --syntax-keyword: #ff7b72;
          --syntax-string: #a5d6ff;
          --syntax-function: #d2a8ff;
          --syntax-function-special: #79c0ff;
          --syntax-type: #79c0ff;
          --syntax-number: #79c0ff;
          --syntax-boolean: #79c0ff;
          --syntax-comment: #8b949e;
          --syntax-tag: #7ee787;
          --syntax-property: #79c0ff;
          --syntax-punctuation: #e6edf3;
          --syntax-operator: #ff7b72;

          font-family: "JetBrains Mono", "Fira Code", "SF Mono", Consolas,
            "Liberation Mono", Menlo, monospace;
          font-size: 14px;
          line-height: 1.6;
          width: 100%;
          max-width: 720px;
        }

        .editor-window {
          background: var(--bg-editor);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4),
            0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .title-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: var(--bg-titlebar);
          border-bottom: 1px solid var(--border-color);
        }

        .window-controls {
          display: flex;
          gap: 8px;
        }

        .control {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .control-close {
          background: #ff5f57;
        }

        .control-minimize {
          background: #febc2e;
        }

        .control-maximize {
          background: #28c840;
        }

        .window-title {
          flex: 1;
          text-align: center;
          color: var(--text-muted);
          font-size: 13px;
          font-weight: 500;
        }

        .spacer {
          width: 52px;
        }

        .code-area {
          padding: 20px 0;
          overflow-x: auto;
          overflow-y: auto;
          height: 320px;
        }

        .code-line {
          display: flex;
          padding: 0 20px;
          min-height: 1.6em;
        }

        .code-line:hover {
          background: rgba(110, 118, 129, 0.1);
        }

        .line-number {
          display: inline-block;
          width: 40px;
          color: var(--line-number);
          text-align: right;
          padding-right: 20px;
          user-select: none;
          flex-shrink: 0;
        }

        .line-content {
          flex: 1;
          white-space: pre;
        }

        /* Syntax highlighting classes */
        .token-plain {
          color: var(--text-plain);
        }

        .token-keyword {
          color: var(--syntax-keyword);
        }

        .token-string {
          color: var(--syntax-string);
        }

        .token-function {
          color: var(--syntax-function);
        }

        .token-function-special {
          color: var(--syntax-function-special);
        }

        .token-type {
          color: var(--syntax-type);
        }

        .token-number {
          color: var(--syntax-number);
        }

        .token-boolean {
          color: var(--syntax-boolean);
        }

        .token-comment {
          color: var(--syntax-comment);
          font-style: italic;
        }

        .token-tag {
          color: var(--syntax-tag);
        }

        .token-property {
          color: var(--syntax-property);
        }

        .token-punctuation {
          color: var(--syntax-punctuation);
        }

        .token-operator {
          color: var(--syntax-operator);
        }

        /* Cursor */
        .cursor {
          display: inline-block;
          width: 2px;
          height: 1.2em;
          background: var(--cursor-color);
          margin-left: 1px;
          vertical-align: text-bottom;
          animation: none;
        }

        .cursor.visible {
          opacity: 1;
        }

        .cursor.hidden {
          opacity: 0;
        }

        /* Scrollbar styling */
        .code-area::-webkit-scrollbar {
          height: 8px;
        }

        .code-area::-webkit-scrollbar-track {
          background: var(--bg-editor);
        }

        .code-area::-webkit-scrollbar-thumb {
          background: var(--border-color);
          border-radius: 4px;
        }

        .code-area::-webkit-scrollbar-thumb:hover {
          background: var(--text-muted);
        }
      `}</style>

      <div className="editor-container">
        <div className="editor-window">
          <div className="title-bar">
            <div className="window-controls">
              <div className="control control-close" />
              <div className="control control-minimize" />
              <div className="control control-maximize" />
            </div>
            <span className="window-title">{CONFIG.windowTitle}</span>
            <div className="spacer" />
          </div>
          <div className="code-area">{highlightCode(displayedCode)}</div>
        </div>
      </div>
    </>
  );
}
