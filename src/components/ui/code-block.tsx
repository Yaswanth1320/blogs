"use client";

import { useState } from "react";
import { Button } from "./button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  children: string;
  className?: string;
  language?: string;
}

// Custom theme based on your green accent colors
const customTheme = {
  ...oneDark,
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: "#111827",
    border: "1px solid rgba(34, 197, 94, 0.2)",
    borderRadius: "0.5rem",
  },
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    background: "transparent",
  },
};

export function CodeBlock({
  children,
  className = "",
  language,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative group my-6">
      {/* Header with language and copy button */}
      <div className="flex items-center justify-between bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-t-lg border border-green-500/20 border-b-0">
        <div className="flex items-center gap-2">
          {language && (
            <span className="text-xs text-green-400 font-medium uppercase tracking-wide">
              {language}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-7 px-2 text-xs text-gray-400 hover:text-green-400 hover:bg-gray-700 opacity-70 group-hover:opacity-100 transition-all duration-200"
        >
          {copied ? (
            <>
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
              Copy
            </>
          )}
        </Button>
      </div>

      {/* Code content */}
      <div className="relative overflow-hidden rounded-b-lg border border-green-500/20 border-t-0 p-4">
        <SyntaxHighlighter
          language={language || "text"}
          style={customTheme}
          customStyle={{
            margin: 0,
            borderRadius: 0,
            background: "#111827",
            border: "none",
            fontSize: "0.875rem",
            lineHeight: "1.6",
            padding: "1rem",
          }}
          codeTagProps={{
            style: {
              fontSize: "0.875rem",
              fontFamily: '"Courier New", monospace',
            },
          }}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
