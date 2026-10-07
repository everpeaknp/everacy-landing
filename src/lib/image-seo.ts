type ImageAltOptions = {
  alt?: string | null;
  imageTitle?: string | null;
  recordTitle?: string | null;
  keywords?: string | null;
  decorative?: boolean;
};

function firstKeyword(keywords?: string | null) {
  return keywords?.split(/[,;\n]/).map((keyword) => keyword.trim()).find(Boolean) || "";
}

export function resolveImageAlt({ alt, imageTitle, recordTitle, keywords, decorative }: ImageAltOptions) {
  if (decorative) return "";
  if (typeof alt === "string" && alt.trim()) return alt.trim();
  if (imageTitle?.trim()) return imageTitle.trim();
  const keyword = firstKeyword(keywords);
  return [recordTitle?.trim(), keyword].filter(Boolean).join(" — ").slice(0, 255);
}

function escapeAttribute(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Add accessible fallback alt/title metadata to CMS rich text without rewriting authored attributes. */
export function addImageSeoAttributes(
  html: string,
  options: Omit<ImageAltOptions, "alt"> = {}
) {
  return html.replace(/<img\b[^>]*>/gi, (tag) => {
    const altAttribute = tag.match(/\salt\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    const titleAttribute = tag.match(/\stitle\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    // An explicitly empty alt marks a decorative image, so preserve it as authored.
    if (altAttribute && !(altAttribute[1] ?? altAttribute[2] ?? altAttribute[3] ?? "").trim()) return tag;

    const authoredAlt = altAttribute?.[1] ?? altAttribute?.[2] ?? altAttribute?.[3];
    const alt = resolveImageAlt({ ...options, alt: authoredAlt });
    if (!alt) return tag;
    const title = titleAttribute ? null : alt;
    let result = tag;
    if (!altAttribute) result = result.replace(/\s*\/?\s*>$/, (end) => ` alt="${escapeAttribute(alt)}"${end}`);
    if (title) result = result.replace(/\s*\/?\s*>$/, (end) => ` title="${escapeAttribute(title)}"${end}`);
    return result;
  });
}
