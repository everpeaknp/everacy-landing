import {
  AppWindow,
  BarChart3,
  Blocks,
  BriefcaseBusiness,
  Code2,
  Gauge,
  LayoutGrid,
  Megaphone,
  MonitorCog,
  Palette,
  PenTool,
  Search,
  ShieldCheck,
  ShoppingCart,
  Share2,
  Smartphone,
  Target,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import {
  siDjango,
  siDocker,
  siFacebook,
  siFigma,
  siFirebase,
  siFlutter,
  siGoogleads,
  siGoogleanalytics,
  siGooglecloud,
  siGooglesearchconsole,
  siInstagram,
  siGithubactions,
  siHtml5,
  siJavascript,
  siCss,
  siKubernetes,
  siLooker,
  siMeta,
  siNextdotjs,
  siPostgresql,
  siPython,
  siRedis,
  siRedux,
  siReact,
  siTypescript,
  siTailwindcss,
  siVercel,
  siNodedotjs,
  siVuedotjs,
  siAngular,
  type SimpleIcon,
} from "simple-icons";

const serviceIcons: Record<string, LucideIcon> = {
  AppWindow,
  BarChart3,
  Blocks,
  BriefcaseBusiness,
  Code2,
  Gauge,
  LayoutGrid,
  Megaphone,
  MonitorCog,
  Palette,
  PenTool,
  Search,
  ShieldCheck,
  ShoppingCart,
  Share2,
  Smartphone,
  Target,
  Workflow,
};

const technologyIcons: Record<string, SimpleIcon> = {
  django: siDjango,
  docker: siDocker,
  facebook: siFacebook,
  figma: siFigma,
  firebase: siFirebase,
  flutter: siFlutter,
  "google ads": siGoogleads,
  "google analytics": siGoogleanalytics,
  "google cloud": siGooglecloud,
  "google search console": siGooglesearchconsole,
  instagram: siInstagram,
  "github actions": siGithubactions,
  kubernetes: siKubernetes,
  "looker studio": siLooker,
  "meta ads": siMeta,
  "meta business suite": siMeta,
  "next.js": siNextdotjs,
  nextjs: siNextdotjs,
  "next js": siNextdotjs,
  html: siHtml5,
  html5: siHtml5,
  css: siCss,
  css3: siCss,
  javascript: siJavascript,
  js: siJavascript,
  redux: siRedux,
  "node.js": siNodedotjs,
  nodejs: siNodedotjs,
  vue: siVuedotjs,
  angular: siAngular,
  postgresql: siPostgresql,
  python: siPython,
  redis: siRedis,
  react: siReact,
  "react native": siReact,
  typescript: siTypescript,
  "tailwind css": siTailwindcss,
  vercel: siVercel,
};

export function ServiceContentIcon({ name, className = "h-6 w-6" }: { name?: string | null; className?: string }) {
  const Icon = serviceIcons[name || ""] || Blocks;
  return <Icon aria-hidden="true" className={className} strokeWidth={1.7} />;
}

export function TechnologyMark({ name, className = "h-8 w-8" }: { name: string; className?: string }) {
  const normalizedName = name.trim().toLowerCase();
  const icon = technologyIcons[normalizedName];
  if (!icon) {
  const fallback = normalizedName.includes("seo") || normalizedName.includes("schema")
    ? "Search"
      : normalizedName.includes("linkedin")
        ? "Share2"
      : normalizedName.includes("adobe") || normalizedName.includes("canva")
        ? "Palette"
        : normalizedName.includes("vital") || normalizedName.includes("performance")
          ? "Gauge"
          : "Blocks";
    return <ServiceContentIcon name={fallback} className={`${className} text-[#008da4]`} />;
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`${className} shrink-0`} fill={`#${icon.hex}`}>
      <path d={icon.path} />
    </svg>
  );
}
