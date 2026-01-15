"use client";

import Image from "next/image";
import React from "react";

interface IntegrationsGridProps {
  className?: string;
}

const IntegrationsGrid: React.FC<IntegrationsGridProps> = ({
  className = "",
}) => {
  return (
    <div className={`integrations-grid ${className}`}>
      <style>{`
        .integrations-grid {
          width: 100%;
          height: 100%;
          max-width: 370px;
          max-height: 370px;
          background-color: #10100D;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
          position: relative;
          overflow: hidden;
          border-radius: 0.5rem;
        }

        @media (max-width: 768px) {
          .integrations-grid {
            max-width: 100%;
            max-height: 280px;
            aspect-ratio: 1 / 1;
          }
        }

        .grid-cell {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* Animated border elements */
        .border-h, .border-v {
          position: absolute;
          background-repeat: repeat;
        }

        /* Bottom border */
        .border-bottom-line {
          bottom: 0;
          left: 0;
          width: 200%;
          height: 1px;
          background-image: linear-gradient(to right, #3a3a3a 50%, transparent 50%);
          background-size: 12px 1px;
          animation: moveRight 0.4s linear infinite;
        }

        /* Right border */
        .border-right-line {
          right: 0;
          top: 0;
          width: 1px;
          height: 200%;
          background-image: linear-gradient(to bottom, #3a3a3a 50%, transparent 50%);
          background-size: 1px 12px;
          animation: moveDown 0.4s linear infinite;
        }

        /* Left border */
        .border-left-line {
          left: 0;
          top: 0;
          width: 1px;
          height: 200%;
          background-image: linear-gradient(to bottom, #3a3a3a 50%, transparent 50%);
          background-size: 1px 12px;
          animation: moveDown 0.4s linear infinite;
        }

        @keyframes moveRight {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-12px);
          }
        }

        @keyframes moveDown {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-12px);
          }
        }

        /* Logo placeholder styles */
        .logo-placeholder {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-placeholder svg {
          width: 100%;
          height: 100%;
        }

        /* Spanning logo for cells 8-9 */
        .spanning-logo {
          grid-column: 2 / 4;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 20px;
        }

        .spanning-logo .logo-text {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 28px;
          font-weight: 600;
          color: #635BFF;
          letter-spacing: -0.5px;
        }

        @media (max-width: 768px) {
          .logo-placeholder {
            width: 28px;
            height: 28px;
          }
          .spanning-logo {
            padding-left: 10px;
          }
        }
      `}</style>

      {/* Square 1 - no lines, no logo */}
      <div className="grid-cell"></div>

      {/* Square 2 - bottom and right borders, no logo */}
      <div className="grid-cell">
        <span className="border-h border-bottom-line" />
        <span className="border-v border-right-line" />
      </div>

      {/* Square 3 - bottom border, has logo (Gemini-style sparkle) */}
      <div className="grid-cell">
        <span className="border-h border-bottom-line" />
        <div className="logo-placeholder">
          <Image src="/google-gemini.svg" alt="Stripe" width={30} height={30} />
        </div>
      </div>

      {/* Square 4 - bottom border, no logo */}
      <div className="grid-cell">
        <span className="border-h border-bottom-line" />
      </div>

      {/* Square 5 - left, right, down borders, has logo (Vercel triangle) */}
      <div className="grid-cell">
        <span className="border-h border-bottom-line" />
        <span className="border-v border-left-line" />
        <span className="border-v border-right-line" />
        <div className="logo-placeholder">
          <Image src="/openai-light.svg" alt="Stripe" width={30} height={30} />
        </div>
      </div>

      {/* Square 6 - bottom border, has logo (Zapier-style burst) */}
      <div className="grid-cell">
        <span className="border-h border-bottom-line" />
        <div className="logo-placeholder">
          <Image src="/claude-2.svg" alt="Stripe" width={30} height={30} />
        </div>
      </div>

      {/* Square 7 - right border, has logo (OpenAI-style) */}
      <div className="grid-cell">
        <span className="border-v border-right-line" />
        <div className="logo-placeholder">
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 8L34 32H6L20 8Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* Squares 8 & 9 - spanning logo (Stripe-style) */}
      <div className="spanning-logo">
        <Image src="/stripe-logo.svg" alt="Stripe" width={80} height={80} />
      </div>
    </div>
  );
};

export default IntegrationsGrid;
