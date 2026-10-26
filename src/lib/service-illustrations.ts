export interface ServiceIllustration {
  src: string;
  alt: string;
}

const artwork = {
  interfaces: {
    src: "/images/service-previews/service-interface-systems.png",
    alt: "Illustration of a connected website, analytics dashboard, and shopping experience",
  },
  responsive: {
    src: "/images/service-previews/responsive-platforms.png",
    alt: "Illustration of a responsive website across desktop, tablet, and mobile devices",
  },
  outcomes: {
    src: "/images/service-previews/service-outcomes.png",
    alt: "Illustration of digital performance, growth, and reliability",
  },
  quality: {
    src: "/images/service-previews/service-quality.png",
    alt: "Illustration of mobile quality, performance, and accessibility",
  },
} satisfies Record<string, ServiceIllustration>;

export function getServiceHeroIllustration(title: string): ServiceIllustration | null {
  const normalized = title.toLowerCase();
  if (/website|web design|web development|e-?commerce|online store/.test(normalized)) return artwork.responsive;
  if (/mobile|app|accessib|performance|quality|security/.test(normalized)) return artwork.quality;
  if (/marketing|seo|growth|optimization/.test(normalized)) return artwork.outcomes;
  if (/design|ui|ux|brand/.test(normalized)) return artwork.interfaces;
  return null;
}

export function getCapabilityIllustration(title: string): ServiceIllustration | null {
  const normalized = title.toLowerCase();
  if (/e-?commerce|shop|commerce/.test(normalized)) return artwork.responsive;
  if (/redesign|optimization|performance|search|seo/.test(normalized)) return artwork.outcomes;
  if (/mobile|app|accessib|quality|secure/.test(normalized)) return artwork.quality;
  if (/custom|corporate|design|interface|ui|ux/.test(normalized)) return artwork.interfaces;
  return null;
}
