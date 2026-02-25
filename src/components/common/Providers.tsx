"use client";

import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "@/types";
import { SmoothScroll } from "@/components/common/SmoothScroll";

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
      <SmoothScroll>{children}</SmoothScroll>
    </ThemeProvider>
  );
}
