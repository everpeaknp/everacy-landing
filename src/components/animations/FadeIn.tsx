"use client";

import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import type { PropsWithChildren } from "@/types";

interface FadeInProps extends PropsWithChildren {
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
}

const directionOffset: Record<NonNullable<FadeInProps["direction"]>, object> = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
  none: {},
};

/**
 * FadeIn animation wrapper using Framer Motion.
 * Automatically disables animation for users who prefer reduced motion.
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = "up",
  once = true,
}: FadeInProps) {
  const prefersReduced = useReducedMotion();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...directionOffset[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : duration,
        delay: prefersReduced ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10%" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

/** Staggered container for animating lists of children. */
interface StaggerProps extends PropsWithChildren {
  className?: string;
  staggerDelay?: number;
}

export function Stagger({ children, className, staggerDelay = 0.1 }: StaggerProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: prefersReduced ? 0 : staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
