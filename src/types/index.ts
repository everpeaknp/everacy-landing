/** ── Navigation ── */
export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

/** ── Projects ── */
export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
};

/** ── Services ── */
export type Service = {
  id: string;
  title: string;
  description: string;
  icon?: string;
};

/** ── Team member ── */
export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio?: string;
  avatarUrl?: string;
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
};

/** ── SEO ── */
export type PageMeta = {
  title: string;
  description: string;
  canonicalPath?: string;
  image?: string;
  noIndex?: boolean;
};

/** ── Theme ── */
export type Theme = "light" | "dark" | "system";

/** ── Utility types ── */
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type MaybeArray<T> = T | T[];

/** ── React ── */
export type PropsWithClassName<P = object> = P & {
  className?: string;
};

export type PropsWithChildren<P = object> = P & {
  children: React.ReactNode;
};
