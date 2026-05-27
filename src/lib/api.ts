/**
 * ─────────────────────────────────────────────────────────
 *  Everacy API Client
 *  Typed fetchers for every Django backend endpoint.
 *  All functions are safe to call from Next.js Server Components.
 * ─────────────────────────────────────────────────────────
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://everacylanding.everacy.com";

// ── Shared fetch helper ────────────────────────────────────
async function apiFetch<T>(path: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}/api/v1${path}`, {
      next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
      ...options,
    });
    if (!res.ok) {
      return null;
    }
    return res.json() as Promise<T>;
  } catch (err) {
    return null;
  }
}

// ── No-cache fetch for data that must always be fresh ──────
async function apiFetchFresh<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}/api/v1${path}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return null;
    }
    return res.json() as Promise<T>;
  } catch (err) {
    return null;
  }
}

// ── Types matching Django serializers ─────────────────────

export interface GlobalSEOData {
  id: number;
  site_name: string;
  site_url: string;
  default_meta_title: string;
  default_meta_description: string;
  default_og_image: string | null;
  favicon: string | null;
  twitter_handle: string | null;
  google_analytics_id: string | null;
  robots_txt_content: string;
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
  icon: string;
}

export interface ServicePipelineStepData {
  step: string;
  title: string;
  detail: string;
}

export interface ServiceCardData {
  id: number;
  title: string;
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
  pipeline: ServicePipelineStepData[] | null;
}

export interface ServicesPageHeroData {
  id: number;
  title: string;
  subtitle: string;
  background_image: string | null;
  scroll_text: string | null;
}

export interface ServicesPageData {
  hero: ServicesPageHeroData | null;
  services: ServiceCardData[];
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
  title: string;
  subtitle: string;
  button_text: string;
  direct_connect_title: string;
  inquiries_label: string;
  email: string;
  address_label: string;
  address: string;
  follow_us_label: string;
  follow_us_text: string;
  social_links?: ContactSocialLinkData[];
  hero_image?: string | null;
  lets_talk_title?: string | null;
  lets_talk_subtitle?: string | null;
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

export interface ProjectData {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  logo: string | null;
  background_image?: string | null;
  accent_color: string;
  tech_stack?: string[] | null;
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
}

export interface ProjectsPageHeroData {
  id: number;
  title: string;
  subtitle: string | null;
  logo: string | null;
  logo_alt: string;
  background_image: string | null;
  scroll_text: string | null;
}

export interface ProjectsData {
  page_hero: ProjectsPageHeroData | null;
  projects: ProjectData[];
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

export async function fetchTestimonials(): Promise<TestimonialData[]> {
  const data = await apiFetch<TestimonialData[]>("/testimonials/");
  return data ?? [];
}

export async function fetchProcess(): Promise<ProcessStepData[]> {
  const data = await apiFetch<ProcessStepData[]>("/process/");
  return data ?? [];
}

export async function fetchTeam(): Promise<TeamSectionData[]> {
  const data = await apiFetch<TeamSectionData[]>("/team/");
  return data ?? [];
}

export async function fetchContact(): Promise<ContactPageData | null> {
  return apiFetch<ContactPageData>("/contact/");
}

export async function fetchFooter(): Promise<FooterData | null> {
  return apiFetchFresh<FooterData>("/footer/");
}

export async function fetchProjects(): Promise<ProjectsData | null> {
  return apiFetchFresh<ProjectsData>("/projects/");
}

export async function fetchProject(slug: string): Promise<ProjectData | null> {
  return apiFetchFresh<ProjectData>(`/projects/${slug}/`);
}

export async function fetchCareers(): Promise<CareersData | null> {
  return apiFetchFresh<CareersData>("/careers/");
}

export async function fetchJobPosition(slug: string): Promise<JobPositionData | null> {
  return apiFetchFresh<JobPositionData>(`/careers/${slug}/`);
}

export async function fetchBlogsPageData(): Promise<BlogsPageData | null> {
  return apiFetch<BlogsPageData>("/blogs/");
}

export async function fetchGlobalSEO(): Promise<GlobalSEOData | null> {
  return apiFetch<GlobalSEOData>("/global-seo/");
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
  return apiFetchFresh<BlogPostData>(`/blogs/${id}/`);
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
