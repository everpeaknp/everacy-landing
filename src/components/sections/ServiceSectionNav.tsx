"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

interface ServiceSectionNavProps {
  items: Array<{ id: string; label: string }>;
}

export function ServiceSectionNav({ items }: ServiceSectionNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id || "");
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef<{ pointerId: number; startX: number; startScrollLeft: number; moved: boolean; captureTarget: HTMLElement } | null>(null);
  const suppressClickRef = useRef(false);

  useEffect(() => {
    if (items.length === 0 || !("IntersectionObserver" in window)) return;

    const visibleSections = new Map<string, number>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleSections.set(entry.target.id, entry.intersectionRatio);
        else visibleSections.delete(entry.target.id);
      }

      const current = [...visibleSections.entries()].sort((a, b) => b[1] - a[1])[0];
      if (current) setActiveId(current[0]);
    }, { rootMargin: "-20% 0px -68% 0px", threshold: [0, 0.15, 0.35, 0.6] });

    for (const item of items) {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const captureTarget: HTMLElement = event.target instanceof Element
      ? event.target.closest("a") || event.currentTarget
      : event.currentTarget;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: event.currentTarget.scrollLeft,
      moved: false,
      captureTarget,
    };
    setDragging(true);
    captureTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 4) {
      drag.moved = true;
      setDragging(true);
    }
    if (drag.moved) event.currentTarget.scrollLeft = drag.startScrollLeft - distance;
  };

  const finishPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (drag.captureTarget.hasPointerCapture(event.pointerId)) drag.captureTarget.releasePointerCapture(event.pointerId);
    if (drag.moved) {
      suppressClickRef.current = true;
      window.setTimeout(() => { suppressClickRef.current = false; }, 0);
    }
    dragRef.current = null;
    setDragging(false);
  };

  return (
    <nav
      aria-label="On this page"
      className="sticky top-16 z-30 border-b border-t border-[#dce8ec] bg-white/95 px-5 backdrop-blur-md transition-colors sm:px-8"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center touch-pan-x gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          dragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointer}
        onPointerCancel={finishPointer}
        onClickCapture={(event) => {
          if (suppressClickRef.current) {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
        onDragStart={(event) => event.preventDefault()}
      >
        {items.map((item, idx) => {
          const active = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active ? "location" : undefined}
              onClick={() => setActiveId(item.id)}
              className={`group relative flex shrink-0 items-center gap-2 border-b-2 px-4 py-3.5 text-xs font-extrabold uppercase tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#008da4] ${
                dragging ? "cursor-grabbing" : "cursor-grab"
              } ${
                active
                  ? "border-[#00a6cb] bg-[#f2fafb] text-[#0d2a4a]"
                  : "border-transparent text-[#586d82] hover:bg-[#f8fbfc] hover:text-[#008da4]"
              }`}
            >
              <span
                className={`text-[10px] font-black tabular-nums ${
                  active ? "text-[#00a6cb]" : "text-[#9aabb6] group-hover:text-[#008da4]"
                }`}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
