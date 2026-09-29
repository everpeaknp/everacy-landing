type SkeletonVariant =
  | "home"
  | "editorial"
  | "listing"
  | "detail"
  | "service"
  | "contact"
  | "legal";

export function PageSkeleton({ variant = "editorial" }: { variant?: SkeletonVariant }) {
  const rows = variant === "home" ? 4 : variant === "detail" || variant === "service" ? 3 : 2;
  const cards = variant === "listing" || variant === "home" ? 6 : variant === "editorial" ? 3 : 0;

  return (
    <div className={`page-skeleton page-skeleton--${variant}`} aria-busy="true" aria-label="Loading page content">
      <div className="page-skeleton__hero" aria-hidden="true">
        <span className="page-skeleton__line page-skeleton__line--eyebrow" />
        <span className="page-skeleton__line page-skeleton__line--title" />
        <span className="page-skeleton__line page-skeleton__line--copy" />
        {(variant === "home" || variant === "contact") && <span className="page-skeleton__media" />}
      </div>
      <div className="page-skeleton__body" aria-hidden="true">
        {Array.from({ length: rows }, (_, index) => (
          <section className="page-skeleton__section" key={index}>
            <span className="page-skeleton__line page-skeleton__line--heading" />
            <span className="page-skeleton__line page-skeleton__line--copy" />
            <span className="page-skeleton__line page-skeleton__line--copy page-skeleton__line--short" />
          </section>
        ))}
        {cards > 0 && (
          <div className="page-skeleton__grid">
            {Array.from({ length: cards }, (_, index) => <span className="page-skeleton__card" key={index} />)}
          </div>
        )}
      </div>
    </div>
  );
}
