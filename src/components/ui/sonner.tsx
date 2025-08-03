"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-black/90 group-[.toaster]:text-green-400 group-[.toaster]:border-green-500/50 group-[.toaster]:shadow-lg group-[.toaster]:backdrop-blur-sm group-[.toaster]:font-mono",
          description: "group-[.toast]:text-green-300 group-[.toast]:font-mono",
          actionButton:
            "group-[.toast]:bg-green-500/30 group-[.toast]:text-green-300 group-[.toast]:border-green-500/50 group-[.toast]:hover:bg-green-500/50 group-[.toast]:font-mono group-[.toast]:font-semibold",
          cancelButton:
            "group-[.toast]:bg-black/50 group-[.toast]:text-green-400 group-[.toast]:border-green-500/30 group-[.toast]:hover:bg-black/70 group-[.toast]:font-mono",
          success:
            "group-[.toast]:bg-green-500/20 group-[.toast]:border-green-500/70 group-[.toast]:text-green-300 group-[.toast]:font-mono group-[.toast]:font-semibold",
          error:
            "group-[.toast]:bg-red-500/20 group-[.toast]:border-red-500/70 group-[.toast]:text-red-300 group-[.toast]:font-mono group-[.toast]:font-semibold",
          loading:
            "group-[.toast]:bg-blue-500/20 group-[.toast]:border-blue-500/70 group-[.toast]:text-blue-300 group-[.toast]:font-mono group-[.toast]:font-semibold",
        },
        style: {
          background: "rgba(0, 0, 0, 0.95)",
          border: "2px solid rgba(34, 197, 94, 0.5)",
          color: "#4ade80",
          backdropFilter: "blur(12px)",
          fontFamily:
            "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
          fontWeight: "500",
        },
      }}
      position="top-right"
      richColors
      closeButton
      {...props}
    />
  );
};

export { Toaster };
