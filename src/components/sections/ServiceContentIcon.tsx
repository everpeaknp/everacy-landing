import {
  Activity,
  AppWindow,
  BarChart3,
  Blocks,
  BriefcaseBusiness,
  Brush,
  Cloud,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Gauge,
  Globe,
  Headset,
  Layers,
  Layout,
  LayoutGrid,
  LayoutDashboard,
  Lock,
  Mail,
  Megaphone,
  MessageCircle,
  MonitorCog,
  MousePointerClick,
  Palette,
  PanelTop,
  PenTool,
  Search,
  Server,
  ShieldCheck,
  Shield,
  ShoppingCart,
  Share2,
  Smartphone,
  Store,
  Target,
  Terminal,
  Utensils,
  Workflow,
  Zap,
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
  siRust,
  siRedux,
  siReact,
  siTypescript,
  siTailwindcss,
  siVercel,
  siNodedotjs,
  siVuedotjs,
  siAngular,
  siCloudinary,
  siAndroid,
  siApple,
  siExpress,
  siFastapi,
  siGo,
  siSocketdotio,
  type SimpleIcon,
} from "simple-icons";

const serviceIcons: Record<string, LucideIcon> = {
  Activity,
  AppWindow,
  BarChart3,
  Blocks,
  BriefcaseBusiness,
  Brush,
  Cloud,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Gauge,
  Globe,
  Headset,
  Layers,
  Layout,
  LayoutDashboard,
  LayoutGrid,
  Lock,
  Mail,
  Megaphone,
  MessageCircle,
  MonitorCog,
  MousePointerClick,
  Palette,
  PanelTop,
  PenTool,
  Search,
  Server,
  ShieldCheck,
  Shield,
  ShoppingCart,
  Share2,
  Smartphone,
  Store,
  Target,
  Terminal,
  Utensils,
  Workflow,
  Zap,
};

const technologyIcons: Record<string, SimpleIcon> = {
  android: siAndroid,
  apple: siApple,
  django: siDjango,
  cloudinary: siCloudinary,
  docker: siDocker,
  facebook: siFacebook,
  fastapi: siFastapi,
  express: siExpress,
  expressjs: siExpress,
  go: siGo,
  golang: siGo,
  socketio: siSocketdotio,
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
  ios: siApple,
  css: siCss,
  css3: siCss,
  javascript: siJavascript,
  js: siJavascript,
  redux: siRedux,
  rust: siRust,
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

const technologyIconsByNormalizedName = Object.fromEntries(
  Object.entries(technologyIcons).map(([name, icon]) => [name.replace(/[^a-z0-9]+/gi, "").toLowerCase(), icon]),
) as Record<string, SimpleIcon>;

export function ServiceContentIcon({ name, className = "h-6 w-6" }: { name?: string | null; className?: string }) {
  const Icon = serviceIcons[name || ""] || Blocks;
  return <Icon aria-hidden="true" className={className} strokeWidth={1.7} />;
}

export function TechnologyMark({ name, logoUrl, className = "h-8 w-8" }: { name: string; logoUrl?: string | null; className?: string }) {
  if (logoUrl) {
    return <img src={logoUrl} alt="" aria-hidden="true" loading="lazy" className={`${className} shrink-0 object-contain`} />;
  }

  const normalizedName = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
  const icon = technologyIconsByNormalizedName[normalizedName];
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
