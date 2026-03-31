"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center rounded-lg border border-border bg-[#1e1e1e]">
      <Loader2 className="size-6 animate-spin text-muted-foreground" />
      <span className="ml-2 text-sm text-muted-foreground">
        Loading editor…
      </span>
    </div>
  ),
});

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language?: string;
  readOnly?: boolean;
  height?: string;
}

export default function CodeEditor({
  value,
  onChange,
  language = "java",
  readOnly = false,
  height = "400px",
}: CodeEditorProps) {
  return (
    <MonacoEditor
      height={height}
      language={language}
      theme="vs-dark"
      value={value}
      onChange={(v) => onChange?.(v ?? "")}
      options={{
        readOnly,
        fontSize: 14,
        minimap: { enabled: false },
        lineNumbers: "on",
        matchBrackets: "always",
        automaticLayout: true,
        scrollBeyondLastLine: false,
        padding: { top: 12, bottom: 12 },
        wordWrap: "on",
        tabSize: 4,
        renderLineHighlight: "line",
        cursorBlinking: "smooth",
        smoothScrolling: true,
        bracketPairColorization: { enabled: true },
      }}
    />
  );
}
