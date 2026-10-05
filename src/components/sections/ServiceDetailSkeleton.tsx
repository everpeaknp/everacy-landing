function Placeholder({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`service-detail-skeleton__shine ${className}`} />;
}

export function ServiceDetailSkeleton() {
  return (
    <main className="service-detail-skeleton" aria-busy="true" aria-label="Loading service details">
      <section className="service-detail-skeleton__hero" aria-hidden="true">
        <div className="service-detail-skeleton__container">
          <div className="service-detail-skeleton__breadcrumbs">
            <Placeholder className="service-detail-skeleton__crumb" />
            <i />
            <Placeholder className="service-detail-skeleton__crumb service-detail-skeleton__crumb--medium" />
            <i />
            <Placeholder className="service-detail-skeleton__crumb service-detail-skeleton__crumb--long" />
          </div>
          <div className="service-detail-skeleton__hero-copy">
            <Placeholder className="service-detail-skeleton__title service-detail-skeleton__title--long" />
            <Placeholder className="service-detail-skeleton__title service-detail-skeleton__title--short" />
            <div className="service-detail-skeleton__description">
              <Placeholder />
              <Placeholder className="service-detail-skeleton__description--short" />
            </div>
            <div className="service-detail-skeleton__actions">
              <Placeholder className="service-detail-skeleton__button" />
              <Placeholder className="service-detail-skeleton__text-link" />
            </div>
          </div>
        </div>
      </section>

      <section className="service-detail-skeleton__section" aria-hidden="true">
        <div className="service-detail-skeleton__section-heading">
          <Placeholder className="service-detail-skeleton__eyebrow" />
          <Placeholder className="service-detail-skeleton__section-title" />
          <Placeholder className="service-detail-skeleton__section-copy" />
        </div>
        <div className="service-detail-skeleton__grid">
          {Array.from({ length: 4 }, (_, index) => (
            <article className="service-detail-skeleton__card" key={index}>
              <Placeholder className="service-detail-skeleton__icon" />
              <Placeholder className="service-detail-skeleton__card-title" />
              <Placeholder className="service-detail-skeleton__card-copy" />
              <Placeholder className="service-detail-skeleton__card-copy service-detail-skeleton__card-copy--short" />
            </article>
          ))}
        </div>
      </section>

      <section className="service-detail-skeleton__section service-detail-skeleton__section--process" aria-hidden="true">
        <div className="service-detail-skeleton__section-heading">
          <Placeholder className="service-detail-skeleton__eyebrow" />
          <Placeholder className="service-detail-skeleton__section-title" />
          <Placeholder className="service-detail-skeleton__section-copy" />
        </div>
        <div className="service-detail-skeleton__process-grid">
          {Array.from({ length: 3 }, (_, index) => (
            <article className="service-detail-skeleton__process-card" key={index}>
              <div className="service-detail-skeleton__process-index">
                <Placeholder className="service-detail-skeleton__number" />
                <Placeholder className="service-detail-skeleton__rule" />
              </div>
              <Placeholder className="service-detail-skeleton__process-title" />
              <Placeholder className="service-detail-skeleton__card-copy" />
              <Placeholder className="service-detail-skeleton__card-copy service-detail-skeleton__card-copy--short" />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
