"use client";

import { ContentUnavailable } from "@/components/ui/ContentUnavailable";

export default function MarketingError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ContentUnavailable onRetry={reset} />;
}
