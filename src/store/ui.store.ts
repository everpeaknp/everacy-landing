import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Theme } from "@/types";

interface UIState {
  /** Current theme selection */
  theme: Theme;
  /** Whether the mobile nav is open */
  isNavOpen: boolean;
  /** Whether a loading overlay is shown */
  isLoading: boolean;
  /** Active section id (tracked by scroll) */
  activeSection: string;

  // Actions
  setTheme: (theme: Theme) => void;
  toggleNav: () => void;
  setNavOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
  setActiveSection: (id: string) => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      theme: "system",
      isNavOpen: false,
      isLoading: false,
      activeSection: "hero",

      setTheme: (theme) => set({ theme }, false, "setTheme"),
      toggleNav: () =>
        set((s) => ({ isNavOpen: !s.isNavOpen }), false, "toggleNav"),
      setNavOpen: (open) => set({ isNavOpen: open }, false, "setNavOpen"),
      setLoading: (loading) => set({ isLoading: loading }, false, "setLoading"),
      setActiveSection: (id) =>
        set({ activeSection: id }, false, "setActiveSection"),
    }),
    { name: "ui-store" }
  )
);
