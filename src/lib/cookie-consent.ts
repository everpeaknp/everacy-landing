export const COOKIE_CONSENT_NAME = "everacy_consent";
export const COOKIE_CONSENT_VERSION = 1;
export const COOKIE_CONSENT_MAX_AGE = 60 * 60 * 24 * 180;

export interface CookieConsent {
  version: 1;
  analytics: boolean;
  updatedAt: string;
}

export function readCookieConsent(): CookieConsent | null {
  if (typeof document === "undefined") return null;

  const entry = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(COOKIE_CONSENT_NAME + "="));

  if (!entry) return null;

  try {
    const value = JSON.parse(decodeURIComponent(entry.slice(COOKIE_CONSENT_NAME.length + 1)));
    if (
      value?.version !== COOKIE_CONSENT_VERSION ||
      typeof value.analytics !== "boolean" ||
      typeof value.updatedAt !== "string" ||
      Number.isNaN(Date.parse(value.updatedAt))
    ) {
      return null;
    }

    return value as CookieConsent;
  } catch {
    return null;
  }
}

export function writeCookieConsent(analytics: boolean): CookieConsent | null {
  if (typeof document === "undefined") return null;

  const consent: CookieConsent = {
    version: COOKIE_CONSENT_VERSION,
    analytics,
    updatedAt: new Date().toISOString(),
  };
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie =
    COOKIE_CONSENT_NAME +
    "=" +
    encodeURIComponent(JSON.stringify(consent)) +
    "; Path=/; SameSite=Lax; Max-Age=" +
    COOKIE_CONSENT_MAX_AGE +
    secure;

  return readCookieConsent();
}

export function clearAnalyticsCookies() {
  if (typeof document === "undefined") return;

  const names = document.cookie
    .split(";")
    .map((part) => part.trim().split("=")[0])
    .filter((name) => /^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/.test(name));

  const labels = window.location.hostname.split(".");
  const domains = new Set<string | null>([null]);
  for (let index = 0; index < labels.length - 1; index += 1) {
    domains.add("." + labels.slice(index).join("."));
  }
  const secure = window.location.protocol === "https:" ? "; Secure" : "";

  for (const name of names) {
    for (const domain of domains) {
      document.cookie =
        name +
        "=; Path=/; Max-Age=0; SameSite=Lax" +
        (domain ? "; Domain=" + domain : "") +
        secure;
    }
  }
}
