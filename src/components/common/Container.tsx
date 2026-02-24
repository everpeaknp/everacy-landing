import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "@/types";

interface ContainerProps extends PropsWithChildren {
  className?: string;
  as?: React.ElementType;
  narrow?: boolean;
}

/**
 * Reusable layout container with max-width and responsive padding.
 * Use `narrow` for article/content-width layouts.
 * Use `as` to change the HTML element (default: div).
 */
export function Container({
  children,
  className,
  as: Tag = "div",
  narrow = false,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        narrow ? "max-w-3xl" : "max-w-7xl",
        className
      )}
    >
      {children}
    </Tag>
  );
}
