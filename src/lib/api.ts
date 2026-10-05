/**
 * ─────────────────────────────────────────────────────────
 *  Everacy API Client
 *  Typed fetchers for every Django backend endpoint.
 *  All functions are safe to call from Next.js Server Components.
 * ─────────────────────────────────────────────────────────
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://everacylanding.everacy.com";

export class CmsApiError extends Error {
  readonly endpoint: string;
  readonly status?: number;

  constructor(message: string, endpoint: string, status?: number, options?: ErrorOptions) {
    super(message, options);
    this.name = "CmsApiError";
    this.endpoint = endpoint;
    this.status = status;
  }
}

// CMS content is uncached so an admin edit is visible on the next request.
// A null result is reserved for a missing detail record; empty collections
// remain valid empty arrays and transport/server errors stay distinguishable.
async function apiFetch<T>(
  path: string,
  options?: RequestInit,
  allowNotFound = false
): Promise<T | null> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/v1${path}`, {
      cache: "no-store",
      ...options,
    });
  } catch (cause) {
    throw new CmsApiError("The content service could not be reached.", path, undefined, { cause });
  }

  if (allowNotFound && res.status === 404) return null;
  if (!res.ok) {
    throw new CmsApiError(
      `The content service returned HTTP ${res.status}.`,
      path,
      res.status
    );
  }

  try {
    return (await res.json()) as T;
  } catch (cause) {
    throw new CmsApiError("The content service returned an invalid response.", path, res.status, { cause });
  }
}

async function apiFetchFresh<T>(path: string, allowNotFound = false): Promise<T | null> {
  return apiFetch<T>(path, undefined, allowNotFound);
}

// ── Types matching Django serializers ─────────────────────

export interface GlobalSEOData {
  id?: number;
  site_name?: string;
  site_url?: string;
  default_title_template?: string;
  default_meta_title?: string;
  default_meta_description?: string;
  default_description?: string;
  default_keywords?: string;
  default_og_image?: string | null;
  favicon?: string | null;
  twitter_handle?: string | null;
  facebook_page_id?: string;
  linkedin_company_url?: string;
  google_analytics_id?: string | null;
  google_tag_manager_id?: string;
  facebook_pixel_id?: string;
  canonical_domain?: string;
  robots_txt_content?: string;
  sitemap_enabled?: boolean;
  sitemap_change_frequency?: string;
  sitemap_priority?: number;
  organization_name?: string;
  organization_logo?: string | null;
  organization_address?: string;
  organization_phone?: string;
  organization_email?: string;

  // camelCase aliases for yummy parity
  titleTemplate?: string;
  defaultDescription?: string;
  defaultKeywords?: string;
  defaultOgImage?: string | null;
  twitterHandle?: string | null;
  canonicalDomain?: string;
  robotsTxtContent?: string;
  googleAnalyticsId?: string | null;
  googleTagManagerId?: string;
  facebookPixelId?: string;
  facebookPageId?: string;
  linkedinCompanyUrl?: string;
  organizationName?: string;
  organizationLogo?: string | null;
  organizationAddress?: string;
  organizationPhone?: string;
  organizationEmail?: string;
  sitemapEnabled?: boolean;
}

export interface PageSEOData {
  id?: number;
  page_id?: string;
  pageId?: string;
  meta_title?: string;
  metaTitle?: string;
  meta_description?: string;
  metaDescription?: string;
  meta_keywords?: string;
  metaKeywords?: string;
  canonical_url?: string | null;
  canonicalUrl?: string | null;
  og_title?: string;
  ogTitle?: string;
  og_description?: string;
  ogDescription?: string;
  og_type?: string;
  ogType?: string;
  og_image?: string | null;
  ogImage?: string | null;
  twitter_card_type?: string;
  twitterCardType?: string;
  robots_meta?: string;
  robotsMeta?: string;
  include_in_sitemap?: boolean;
  includeInSitemap?: boolean;
  sitemap_priority?: number;
  sitemapPriority?: number;
  sitemap_change_frequency?: string;
  sitemapChangeFrequency?: string;
  json_ld?: Record<string, unknown> | null;
  jsonLd?: Record<string, unknown> | null;
}

export interface SEOFieldData {
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  og_image: string | null;
  canonical_url: string | null;
  is_indexed: boolean;
}

export interface NavbarSettingsData {
  id: number;
  site_name: string;
  logo: string | null;
  logo_alt: string;
  scrolled_logo: string | null;
  button_text: string;
  button_link: string;
}

export interface NavbarItemData {
  id: number;
  title: string;
  link: string;
  order: number;
}

export interface NavbarData {
  settings: NavbarSettingsData | null;
  items: NavbarItemData[];
  active_jobs_count?: number;
}

export interface HeroData {
  id: number;
  tagline: string;
  heading: string;
  subtext: string;
  logo: string | null;
  background_image: string | null;
  scroll_text: string;
}

export interface ServiceCapabilityData {
  title: string;
  description: string;
  icon?: string;
}

export interface ServicePipelineStepData {
  step: string;
  title: string;
  detail: string;
}

export interface ServiceBenefitData {
  title: string;
  description: string;
  icon?: string;
}

export interface ServiceFeatureData {
  title: string;
  description: string;
  icon?: string;
}

export interface ServiceFaqData {
  question: string;
  answer: string;
}

export interface ServiceCategorySummaryData {
  id: number;
  title: string;
  slug: string;
}

export interface ServiceCardData {
  id: number;
  title: string;
  slug?: string;
  category?: ServiceCategorySummaryData | null;
  featured_in_menu?: boolean;
  icon?: string;
  is_active?: boolean;
  seo?: SEOFieldData | null;
  description: string;
  link_label: string;
  link_href: string;
  accent_color: string;
  background_color: string;
  image: string | null;
  image_alt: string;
  layout: "left" | "right";
  order: number;
  // Dynamic drawer fields
  tagline: string | null;
  cta_label: string | null;
  capabilities: ServiceCapabilityData[] | null;
  tech_stack: string[] | null;
  tech_stack_groups?: { label: string; technologies: string[] }[] | null;
  tech_stack_items?: TechnologyStackItemData[] | null;
  show_capabilities?: boolean;
  show_case_studies?: boolean;
  case_study_card_label?: string;
  show_pipeline?: boolean;
  show_tech_stack?: boolean;
  show_features?: boolean;
  show_benefits?: boolean;
  show_faqs?: boolean;
  show_projects?: boolean;
  projects_link_label?: string;
  show_articles?: boolean;
  journal_link_label?: string;
  article_link_label?: string;
  show_bottom_cta?: boolean;
  bottom_cta_button_label?: string;
  pipeline: ServicePipelineStepData[] | null;
  benefits?: ServiceBenefitData[] | null;
  faqs?: ServiceFaqData[] | null;
  features?: ServiceFeatureData[] | null;
  case_studies?: ServiceCaseStudyPreviewData[] | null;
  section_solutions_title?: string;
  section_case_studies_title?: string;
  section_pipeline_title?: string;
  section_technology_title?: string;
  section_features_title?: string;
  section_benefits_title?: string;
  section_faqs_title?: string;
  section_projects_title?: string;
  section_journal_title?: string;
  section_cta_title?: string;
}

export interface ServiceCaseStudyPreviewData {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  image_alt: string;
}

export interface ServiceCategoryData {
  id: number;
  title: string;
  slug: string;
  description: string;
  breadcrumb_label?: string;
  hero_eyebrow?: string;
  cta_label?: string;
  service_link_label?: string;
  empty_state_text?: string;
  image: string | null;
  order: number;
  services: ServiceCardData[];
  featured_services: ServiceCardData[];
  seo?: SEOFieldData | null;
}

export interface ServicesPageHeroData {
  id: number;
  title: string;
  eyebrow?: string;
  subtitle: string;
  cta_label?: string;
  category_link_label?: string;
  service_link_label?: string;
  empty_state_text?: string;
  background_image: string | null;
  scroll_text: string | null;
  seo?: SEOFieldData | null;
}

export interface ServicesPageData {
  hero: ServicesPageHeroData | null;
  services: ServiceCardData[];
  seo?: SEOFieldData | null;
}

export interface TestimonialData {
  id: number;
  name: string;
  designation: string;
  company: string | null;
  quote: string;
  image: string | null;
  company_logo: string | null;
  rating: number;
  accent_color: string;
  order: number;
}

export interface ProcessStepData {
  id: number;
  step_number: number;
  step_label: string;
  title: string;
  description: string;
  order: number;
}

export interface TeamMemberData {
  id: number;
  name: string;
  role: string;
  subtitle: string;
  image: string | null;
  section: string;
  linkedin: string | null;
  twitter: string | null;
  website: string | null;
  order: number;
}

export interface TeamSectionData {
  id: number;
  title: string;
  slug: string;
  icon: string;
  order: number;
  members: TeamMemberData[];
}

export interface ContactSocialLinkData {
  id: number;
  platform: string;
  url: string;
  order: number;
}

export interface ContactPageData {
  id: number;
  eyebrow?: string;
  title: string;
  subtitle: string;
  form_title?: string;
  form_subtitle?: string;
  button_text: string;
  phones?: string[];
  work_types?: { id: string; title: string; desc: string }[];
  services_list?: string[];
  follow_us_label: string;
  follow_us_text: string;
  social_links?: ContactSocialLinkData[];
  hero_image?: string | null;
  lets_talk_title?: string | null;
  lets_talk_subtitle?: string | null;
  phone?: string | null;
  phone_schedule_text?: string | null;
  jobs_title?: string | null;
  jobs_description?: string | null;
  jobs_link_text?: string | null;
  seo?: SEOFieldData | null;
}

export interface FooterSettingsData {
  id: number;
  company_name: string;
  logo: string | null;
  background_logo: string | null;
  description: string | null;
  copyright: string;
  privacy_policy_text: string;
  terms_text: string;
  cookies_text: string;
  privacy_policy_url: string;
  terms_url: string;
  cookies_url: string;
}

export interface FooterNavItemData {
  id: number;
  title: string;
  link: string;
  order: number;
  is_active: boolean;
}

export interface FooterSocialLinkData {
  id: number;
  platform: "github" | "linkedin" | "twitter";
  url: string;
  order: number;
  is_active: boolean;
}

export interface FooterData {
  settings: FooterSettingsData | null;
  nav_items: FooterNavItemData[];
  social_links: FooterSocialLinkData[];
}

export interface CTASectionData {
  id: number;
  heading: string;
  button_text: string;
  button_link: string;
  background_image: string | null;
}

export interface HomeData {
  hero: HeroData | null;
  technology_section?: HomeTechnologySectionData | null;
  process_section?: { title: string; subtitle: string } | null;
  services_section?: { title: string } | null;
  testimonials_section?: { title: string; subtitle: string } | null;
  cta: CTASectionData | null;
  navbar: NavbarData;
  services: ServiceCardData[];
  testimonials: TestimonialData[];
  process: ProcessStepData[];
  team: TeamSectionData[];
  contact: ContactPageData | null;
  footer: FooterData;
  featured_blogs?: BlogPostData[];
  featured_blogs_section?: { title: string; subtitle: string } | null;
  seo?: SEOFieldData | null;
}

export interface AboutData {
  title: string;
  subtitle: string;
  team_title: string;
  team_subtitle: string;
  scroll_text: string;
  sections: TeamSectionData[];
  seo?: SEOFieldData | null;
}

export interface ProjectDetailData {
  id: number;
  question: string;
  answer: string;
  order: number;
}

export interface ProjectHeroData {
  title: string | null;
  subtitle: string | null;
  background_image: string | null;
  scroll_text: string | null;
}

export interface ProjectTaglineData {
  text: string | null;
  background_image: string | null;
}

export interface ProjectScreenshotData {
  id: number;
  image: string;
  alt_text: string;
  order: number;
}

export interface ProjectStorySectionData {
  id: number;
  section: "approach" | "solutions" | "result";
  heading: string;
  intro: string;
  body: string;
  highlights: string[];
  order: number;
}

export interface TechnologyStackCategoryData {
  name: string;
  slug: string;
  order: number;
}

export interface TechnologyStackItemData {
  name: string;
  category: TechnologyStackCategoryData;
  logo_url: string | null;
}

export interface HomeTechnologySectionData {
  enabled: boolean;
  eyebrow: string;
  title: string;
  description: string;
  stack_label: string;
  feature_eyebrow: string;
  feature_title: string;
  feature_description: string;
  layers: { title: string; description: string }[];
  technologies: TechnologyStackItemData[];
}

export interface ProjectData {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  logo: string | null;
  background_image?: string | null;
  accent_color: string;
  tech_stack?: string[] | null;
  tech_stack_items?: TechnologyStackItemData[] | null;
  platforms?: string[] | null;
  challenges?: string[] | null;
  features?: string[] | null;
  team_composition?: { role: string; count: number }[] | null;
  visit_links?: { label: string; href: string }[] | null;
  order: number;
  is_active: boolean;
  is_featured?: boolean;
  hero: ProjectHeroData | null;
  details: ProjectDetailData[];
  tagline: ProjectTaglineData | null;
  screenshots?: ProjectScreenshotData[];
  story_sections?: ProjectStorySectionData[];
  seo?: SEOFieldData | null;
}

export interface ProjectsPageHeroData {
  id: number;
  title: string;
  subtitle: string | null;
  logo: string | null;
  logo_alt: string;
  background_image: string | null;
  scroll_text: string | null;
  seo?: SEOFieldData | null;
}

export interface ProjectsData {
  page_hero: ProjectsPageHeroData | null;
  projects: ProjectData[];
  seo?: SEOFieldData | null;
}

export interface CareerHeroData {
  id: number;
  title: string;
  highlight_text: string;
  subtitle: string;
  background_image: string | null;
  scroll_text: string;
}

export interface JobPositionData {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  location: string;
  location_icon: string;
  job_type: string;
  job_type_icon: string;
  category: string;
  category_icon: string;
  order: number;
  about_company?: string;
  about_role?: string;
  responsibilities?: string[];
  requirements?: string[];
  nice_to_have?: string[];
  soft_skills?: string[];
  seo?: SEOFieldData | null;
}

export interface CareerFooterData {
  id: number;
  text: string;
  email: string;
}

export interface CareerValueData {
  id: number;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface CareerPerkData {
  id: number;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface CareerTestimonialData {
  id: number;
  name: string;
  role: string | null;
  quote: string;
  image: string | null;
  order: number;
}

export interface CareerProcessStepData {
  id: number;
  step_number: number;
  title: string;
  description: string | null;
  icon: string;
  order: number;
}

export interface CareerPageSettingsData {
  id: number;
  title: string;
  values_title: string;
  values_subtitle: string | null;
  middle_image_strip: string | null;
  middle_image_text: string | null;
  perks_title: string;
  perks_subtitle: string | null;
  positions_title: string;
  positions_subtitle: string | null;
  testimonials_title: string;
  testimonials_subtitle: string | null;
  process_title: string;
  process_subtitle: string | null;
  seo?: SEOFieldData | null;
}

export interface CareersData {
  hero: CareerHeroData | null;
  jobs: JobPositionData[];
  values: CareerValueData[];
  perks: CareerPerkData[];
  testimonials: CareerTestimonialData[];
  process_steps: CareerProcessStepData[];
  footer: CareerFooterData | null;
  page_settings: CareerPageSettingsData | null;
  seo?: SEOFieldData | null;
}

export interface BlogHeroData {
  id: number;
  title: string;
  subtitle: string;
  scroll_text: string | null;
}

export interface BlogPostData {
  id: number;
  slug?: string;
  title: string;
  intro: string | null;
  content: string;
  cover_image: string | null;
  comments_count: number;
  publish_date: string | null;
  order: number;
  is_featured?: boolean;
  comments?: any[];
  recommended_blogs?: any[];
  seo?: SEOFieldData | null;
  category?: { id: number; name: string; slug: string } | null;
  tags?: { id: number; name: string; slug: string }[];
}

export interface BlogsData {
  hero: BlogHeroData | null;
  posts: BlogPostData[];
  seo?: SEOFieldData | null;
}

export interface LegalPageSectionData {
  id: number;
  heading: string;
  body: string;
  bullet_items: string[];
  order: number;
}

export interface LegalPageData {
  key: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  effective_date: string | null;
  updated_at: string;
  sections: LegalPageSectionData[];
}

// ── API Fetchers ───────────────────────────────────────────

export async function fetchHero(): Promise<HeroData | null> {
  return apiFetchFresh<HeroData>("/hero/");
}

export async function fetchNavbar(): Promise<NavbarData | null> {
  return apiFetchFresh<NavbarData>("/navbar/");
}

export async function fetchServices(): Promise<ServiceCardData[]> {
  const data = await apiFetch<ServiceCardData[]>("/services/");
  return data ?? [];
}

export async function fetchServicesPage(): Promise<ServicesPageData | null> {
  return apiFetch<ServicesPageData>("/services-page/");
}

export async function fetchServiceCategories(): Promise<ServiceCategoryData[]> {
  const data = await apiFetch<ServiceCategoryData[]>("/service-categories/");
  return data ?? [];
}

export async function fetchServiceCategory(slug: string): Promise<ServiceCategoryData | null> {
  return apiFetch<ServiceCategoryData>("/service-categories/" + encodeURIComponent(slug) + "/", undefined, true);
}

export async function fetchServiceBySlug(slug: string): Promise<ServiceCardData | null> {
  return apiFetchFresh<ServiceCardData>("/services/" + encodeURIComponent(slug) + "/", true);
}

export async function fetchTestimonials(): Promise<TestimonialData[]> {
  const data = await apiFetch<TestimonialData[]>("/testimonials/");
  return data ?? [];
}

export async function fetchProcess(): Promise<ProcessStepData[]> {
  const data = await apiFetch<ProcessStepData[]>("/process/");
  return data ?? [];
}

export async function fetchLegalPage(key: string): Promise<LegalPageData | null> {
  return apiFetch<LegalPageData>("/legal/" + encodeURIComponent(key) + "/", undefined, true);
}

export async function fetchTeam(): Promise<TeamSectionData[]> {
  const data = await apiFetch<TeamSectionData[]>("/team/");
  return data ?? [];
}

export async function fetchContact(): Promise<ContactPageData | null> {
  return apiFetch<ContactPageData>("/contact/");
}

export async function fetchFooter(): Promise<FooterData | null> {
  // Footer settings are optional CMS content; an unpublished/missing singleton
  // should leave the structural footer in place instead of failing every route.
  return apiFetchFresh<FooterData>("/footer/", true);
}

export async function fetchProjects(): Promise<ProjectsData | null> {
  return apiFetchFresh<ProjectsData>("/projects/");
}

export async function fetchProject(slug: string): Promise<ProjectData | null> {
  return apiFetchFresh<ProjectData>(`/projects/${encodeURIComponent(slug)}/`, true);
}

export async function fetchCareers(): Promise<CareersData | null> {
  return apiFetchFresh<CareersData>("/careers/");
}

export async function fetchJobPosition(slug: string): Promise<JobPositionData | null> {
  return apiFetchFresh<JobPositionData>(`/careers/${encodeURIComponent(slug)}/`, true);
}

export async function fetchBlogsPageData(): Promise<BlogsData | null> {
  return apiFetchFresh<BlogsData>("/blogs/");
}

export async function fetchGlobalSEO(): Promise<GlobalSEOData | null> {
  return apiFetch<GlobalSEOData>("/global-seo/");
}

export async function fetchPageSEO(pageId: string): Promise<PageSEOData | null> {
  return apiFetch<PageSEOData>(`/seo/page/${pageId}/`);
}

export async function fetchAllPageSEO(): Promise<Record<string, PageSEOData> | null> {
  return apiFetch<Record<string, PageSEOData>>("/seo/pages/");
}

export interface SitemapData {
  projects: string[];
  blogs: string[];
}

export async function fetchSitemapData(): Promise<SitemapData | null> {
  return apiFetch<SitemapData>("/sitemap/");
}

export async function fetchBlogs(): Promise<BlogsData | null> {
  return apiFetchFresh<BlogsData>("/blogs/");
}

export async function fetchBlogPost(id: number | string): Promise<BlogPostData | null> {
  return apiFetchFresh<BlogPostData>(`/blogs/${encodeURIComponent(String(id))}/`, true);
}

export async function fetchHomeData(): Promise<HomeData | null> {
  return apiFetchFresh<HomeData>("/");
}

export async function fetchAboutData(): Promise<AboutData | null> {
  return apiFetchFresh<AboutData>("/about/");
}

// ── Contact form submission (client-side POST) ─────────────
export interface ContactSubmitPayload {
  name: string;
  email: string;
  message: string;
}

export async function submitContactForm(
  payload: ContactSubmitPayload
): Promise<{ success: boolean; message?: string; errors?: Record<string, string[]> }> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/contact-submit/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.status === 201) {
      const data = await res.json();
      return { success: true, message: data.message };
    }

    const errors = await res.json();
    return { success: false, errors };
   } catch (err) {
    console.error("Error submitting contact form:", err);
    return { success: false, message: "Network error occurred" };
  }
}

export async function submitJobApplication(
  formData: FormData
): Promise<{ success: boolean; message?: string; errors?: Record<string, string[]> }> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/job-application-submit/`, {
      method: "POST",
      body: formData,
      // Note: When using FormData, do NOT set Content-Type header. 
      // The browser will set it to multipart/form-data with the correct boundary automatically.
    });

    if (res.status === 201) {
      const data = await res.json();
      return { success: true, message: data.message };
    }

    const errors = await res.json();
    return { success: false, errors };
  } catch (err) {
    console.error("Error submitting job application:", err);
    return { success: false, message: "Network error occurred" };
  }
}

export interface BlogCommentPayload {
  name: string;
  email: string;
  content: string;
}

export async function submitBlogComment(
  slug: string,
  payload: BlogCommentPayload
): Promise<{ success: boolean; message?: string; errors?: Record<string, string[]> }> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/blogs/${slug}/comment/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.status === 201) {
      const data = await res.json();
      return { success: true, message: data.message || "Comment posted successfully!" };
    }

    const errors = await res.json();
    return { success: false, errors };
  } catch (err) {
    console.error("Error submitting blog comment:", err);
    return { success: false, message: "Network error occurred" };
  }
}
