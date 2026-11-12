"use client";
import { Printer } from "lucide-react";
export function PrintButton() {
  return (
    <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition hover:opacity-90">
      <Printer size={15} /> Save as PDF
    </button>
  );
}
