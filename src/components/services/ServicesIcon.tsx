import { Cloud, Code2, Layers, Palette, Shield, Target, TrendingUp, Users, Zap, type LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  code: Code2,
  palette: Palette,
  cloud: Cloud,
  growth: TrendingUp,
  shield: Shield,
  zap: Zap,
  users: Users,
  target: Target,
  layers: Layers,
};

export function ServicesIcon({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  const Icon = icons[name] ?? Code2;
  return <Icon aria-hidden="true" className={className} strokeWidth={1.7} />;
}
