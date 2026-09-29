export function ContentUnavailable({
  onRetry,
  title = "Unable to load content",
}: {
  onRetry: () => void;
  title?: string;
}) {
  return (
    <section className="cms-unavailable" role="alert">
      <span className="cms-unavailable__mark" aria-hidden="true">!</span>
      <h2>{title}</h2>
      <p>Please check your connection and try again.</p>
      <button type="button" onClick={onRetry}>Try again</button>
    </section>
  );
}
