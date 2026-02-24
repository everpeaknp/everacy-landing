"use client";

import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "@/types";

/**
 * Root Providers component.
 * Wrap all client-side providers here to keep layout.tsx a Server Component.
 * Add new providers (e.g., QueryClient, TooltipProvider) here.
 */
export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
