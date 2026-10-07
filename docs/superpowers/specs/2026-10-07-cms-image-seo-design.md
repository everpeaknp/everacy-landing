# CMS Image SEO and Accessibility Design

## Status

Approved for implementation by the user on 2026-10-07; includes the requested filename and image-title behavior.

## Goal

Make image descriptions easy to add at the point an editor uploads or chooses an image throughout the Django CMS, including CKEditor, and ensure meaningful descriptions reach public pages and social metadata. Preserve current media files, URLs, layouts, and page behavior.

## Current system

- Most CMS images are independent Django `ImageField`s rendered by native admin file inputs. There is no shared media library or shared image record.
- CKEditor 5 uploads to `uploads/`. Its image toolbar already offers `imageTextAlternative`; the editor stores the alternative text in the blog HTML. Blog publishing has no missing-alt warning.
- A small number of image fields already store alt text, including service cards, project screenshots, and hero logos. Many other content images do not.
- Global, page, and per-page Open Graph image fields have no associated alternative text. Frontend metadata emits image URLs without Open Graph image alt text.
- Some public image renderers use model labels as fallback alt text or use CSS backgrounds. Other images, such as page backgrounds, are intentionally decorative.
- Production media uses ordinary file storage. This design does not change file storage, image bytes, URLs, resizing, or format conversion.

## Chosen approach

Extend existing model-specific image fields with contextual metadata and a consistent CMS editing experience. Do not introduce a centralized media library: the same file may need different descriptions in different contexts, and replacing current fields with shared asset references would create unnecessary migration and rendering risk.

## CMS editing experience

- For each meaningful CMS image, show a consistent image SEO area immediately beside/below its upload control with an image preview, descriptive alt-text field, and concise guidance on writing useful text.
- For content images, include an editable image title and alt text next to the upload. A generated alt fallback uses the most specific supplied value first, then the record title plus its configured SEO keyword target; editors can replace it with a more accurate description.
- Rename newly uploaded CMS images using a safe slug made from the record slug/title, image title/alt text when available, and a small number of configured SEO keywords. Preserve the current upload directory and extension, and let the configured Django storage backend resolve name collisions. Existing files and URLs are never renamed.
- Keep decorative-only assets (backgrounds, ornamental graphics, and redundant decorative icons) explicitly identified as decorative in the admin. They do not require alt text and render with empty alt text where appropriate.
- For fields that can represent either meaningful or decorative content, provide an explicit decorative choice. Do not infer a detailed description from the filename or silently copy a title into alt text.
- Preserve the existing CKEditor alternative-text workflow. Make it discoverable in the editor help text and add a non-blocking warning when a post contains an image with no `alt` attribute. An explicit empty `alt=""` remains valid for intentionally decorative inline images.
- Add an article-aware CKEditor upload adapter so new inline image uploads use the current blog post slug/title and SEO keywords in their filename. Keep upload permissions, CSRF protection, file validation, and storage behavior aligned with the existing uploader.
- On public article HTML, add an image `title` attribute from the explicitly entered image title or, when absent, its alt text. Never replace an authored title attribute.
- Show missing descriptions as actionable admin guidance; do not block saving or publishing existing or new content.

## Data and API flow

- Inventory every CMS image upload field and classify it by how it is rendered. Add additive, nullable/blank metadata fields for meaningful images that currently lack descriptions. This includes blog cover images, service-category imagery when it conveys content, testimonial portraits/company logos, team portraits, contact imagery, project imagery where it conveys content, career testimonial/job imagery, and branded navbar/footer/hero logos when their meaning is not already conveyed by nearby text.
- Reuse existing alt fields where present; do not duplicate their data.
- Add matching alt fields for global and page Open Graph images and for model-level SEO images.
- Keep backgrounds, favicons, redundant logos, and other decorative assets decorative rather than adding required editorial data. For image fields whose role can vary by record, allow the editor to mark that particular image decorative.
- Include the new fields in the relevant Django admin forms and serializers. Preserve existing API properties and add fields without renaming or removing anything.
- Use the supplied alt text in public `<img>`/Next Image output. Keep redundant card imagery decorative when adjacent text already conveys the same information.
- Emit the CMS-provided description as Open Graph image alt metadata when available. Keep current image URL and fallback selection behavior.

## Existing content and compatibility

- All additions are nullable or blank by default. Existing records and uploads remain valid without edits; computed fallback descriptions are used only at render time.
- Existing media files and paths are not renamed or re-encoded. New uploads use contextual filenames while upload and clear controls keep their current behavior.
- Existing page structure, crop/object-position, dimensions, CSS backgrounds, and visual layout remain unchanged.
- No new external image service or runtime dependency is introduced.

## Validation and tests

- Django migration checks confirm only additive metadata columns are introduced.
- Admin tests verify the complete image-field inventory is classified, meaningful image uploads expose their metadata controls together, decorative assets do not require alt text, and missing descriptions produce a warning rather than a save/publish failure.
- Serializer tests verify old fields remain and new descriptions are returned for existing and newly populated records.
- Frontend tests/build verify CMS alt values reach image elements and Open Graph metadata, while missing values preserve safe existing fallbacks.
- CKEditor tests verify descriptive alt is retained in saved HTML and missing-alt guidance does not reject content.
- Review representative pages on desktop/mobile to confirm the unchanged media layout and image URLs.

## Explicitly out of scope

- Central media library or asset deduplication.
- Automatic AI-generated descriptions.
- Required publication gates for legacy or new content.
- Image compression, format conversion, responsive derivatives, or storage/CDN migration.
- Unrelated visual or content changes to marketing pages.
