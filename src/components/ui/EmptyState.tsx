"use client";

import { useState } from "react";

export function EmptyState({
  title,
  description = "There is nothing here yet. Please check back soon.",
}: {
  title: string;
  description?: string;
}) {
  const [engaged, setEngaged] = useState(false);

  return (
    <section className="cms-empty-state" aria-labelledby="cms-empty-title">
      <button
        className={`cms-empty-state__art${engaged ? " is-engaged" : ""}`}
        type="button"
        aria-label="Interact with the empty-state illustration"
        aria-pressed={engaged}
        onClick={() => setEngaged((value) => !value)}
      >
        <svg aria-hidden="true" viewBox="0 0 120 88" fill="none">
          <path className="cms-empty-state__orbit" d="M20 42c0-18 18-32 40-32s40 14 40 32-18 32-40 32S20 60 20 42Z" />
          <rect className="cms-empty-state__page" x="37" y="20" width="46" height="53" rx="8" />
          <path className="cms-empty-state__mark" d="M49 39h22M49 49h22M49 59h13" />
          <circle className="cms-empty-state__spark" cx="92" cy="22" r="5" />
          <circle className="cms-empty-state__spark" cx="28" cy="66" r="3" />
        </svg>
      </button>
      <h2 id="cms-empty-title">{title}</h2>
      <p>{description}</p>
    </section>
  );
}
