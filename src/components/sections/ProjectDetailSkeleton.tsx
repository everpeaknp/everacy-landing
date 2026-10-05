function Block({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`project-detail-skeleton__shine ${className}`} />;
}

export function ProjectDetailSkeleton() {
  return <main className="project-detail-skeleton" aria-busy="true" aria-label="Loading project case study">
    <section className="project-detail-skeleton__hero" aria-hidden="true">
      <div className="project-detail-skeleton__container">
        <Block className="project-detail-skeleton__back" />
        <div className="project-detail-skeleton__intro">
          <Block className="project-detail-skeleton__eyebrow" />
          <Block className="project-detail-skeleton__title" />
          <Block className="project-detail-skeleton__tagline" />
          <div className="project-detail-skeleton__description"><Block /><Block className="project-detail-skeleton__copy--short" /></div>
          <Block className="project-detail-skeleton__button" />
        </div>
      </div>
    </section>
    <section className="project-detail-skeleton__preview" aria-hidden="true"><div className="project-detail-skeleton__container"><Block className="project-detail-skeleton__banner" /></div></section>
    <section className="project-detail-skeleton__section" aria-hidden="true"><div className="project-detail-skeleton__container">
      <Block className="project-detail-skeleton__eyebrow" /><Block className="project-detail-skeleton__heading" />
      <div className="project-detail-skeleton__details">{Array.from({ length: 6 }, (_, index) => <Block key={index} className="project-detail-skeleton__detail" />)}</div>
    </div></section>
    <section className="project-detail-skeleton__technology" aria-hidden="true"><div className="project-detail-skeleton__container">
      <Block className="project-detail-skeleton__eyebrow" /><Block className="project-detail-skeleton__heading" />
      <div className="project-detail-skeleton__technology-groups">{Array.from({ length: 4 }, (_, group) => <div key={group} className="project-detail-skeleton__technology-group"><Block className="project-detail-skeleton__group-label" /><div className="project-detail-skeleton__technology-row">{Array.from({ length: group === 0 ? 2 : 1 }, (_, index) => <Block key={index} className="project-detail-skeleton__technology-item" />)}</div></div>)}</div>
    </div></section>
    <section className="project-detail-skeleton__section" aria-hidden="true"><div className="project-detail-skeleton__container">
      <div className="project-detail-skeleton__team">
        {[0, 1].map((group) => <div key={group}><Block className="project-detail-skeleton__heading" />{Array.from({ length: group === 0 ? 4 : 3 }, (_, index) => <Block key={index} className="project-detail-skeleton__team-row" />)}</div>)}
      </div>
    </div></section>
    <section className="project-detail-skeleton__closing" aria-hidden="true"><div className="project-detail-skeleton__container">
      <Block className="project-detail-skeleton__heading" /><Block className="project-detail-skeleton__button" />
    </div></section>
  </main>;
}
