"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Cookie, SlidersHorizontal } from "lucide-react";
import {
  clearAnalyticsCookies,
  readCookieConsent,
  writeCookieConsent,
  type CookieConsent as CookieConsentValue,
} from "@/lib/cookie-consent";

const OPEN_SETTINGS_EVENT = "everacy:open-cookie-settings";

interface CookieConsentProps {
  analyticsId?: string | null;
}

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}
      className="font-medium transition-colors hover:text-[#8cd4dd]"
    >
      Cookie settings
    </button>
  );
}

export function CookieConsent({ analyticsId }: CookieConsentProps) {
  const [consent, setConsent] = useState<CookieConsentValue | null>(null);
  const [analyticsGranted, setAnalyticsGranted] = useState(false);
  const [ready, setReady] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [analyticsChoice, setAnalyticsChoice] = useState(false);

  useEffect(() => {
    const stored = readCookieConsent();
    setConsent(stored);
    setAnalyticsChoice(stored?.analytics ?? false);
    setAnalyticsGranted(Boolean(stored?.analytics));
    setReady(true);

    const openSettings = () => {
      const latest = readCookieConsent();
      setConsent(latest);
      setAnalyticsChoice(latest?.analytics ?? false);
      setPreferencesOpen(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, openSettings);
  }, []);

  useEffect(() => {
    if (!analyticsId) return;
    const trackerWindow = window as unknown as Record<string, unknown>;
    trackerWindow["ga-disable-" + analyticsId] = !analyticsGranted;
    if (!analyticsGranted) clearAnalyticsCookies();
  }, [analyticsGranted, analyticsId]);

  function savePreferences(analytics: boolean) {
    const stored = writeCookieConsent(analytics);
    const next: CookieConsentValue = stored ?? {
      version: 1,
      analytics,
      updatedAt: new Date().toISOString(),
    };
    setConsent(next);
    setAnalyticsChoice(analytics);
    setAnalyticsGranted(Boolean(stored?.analytics));
    setPreferencesOpen(false);
  }

  const showBanner = ready && !consent;

  return (
    <>
      {showBanner && (
        <section
          aria-label="Cookie preferences"
          className="cookie-consent-banner fixed bottom-3 left-3 right-3 z-[1000] w-auto max-w-[570px] overflow-hidden rounded-md border border-[#27446e]/10 border-t-[3px] border-t-[#00a6cb] bg-white/95 p-4 shadow-[0_18px_54px_-26px_rgba(13,42,74,0.5)] backdrop-blur-xl sm:bottom-6 sm:left-6 sm:right-auto sm:w-[calc(100vw-3rem)] sm:p-5 motion-reduce:transition-none"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <div className="flex items-start gap-3.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#e8f6fc] text-[#27446e] ring-1 ring-inset ring-[#27446e]/5">
              <Cookie aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <div className="min-w-0">
              <h2 className="text-[15px] font-bold tracking-tight text-[#0d2a4a] sm:text-base">Your privacy, your choice</h2>
              <p className="mt-1.5 text-[13px] leading-[1.6] text-slate-600">
                Essential cookies keep Everacy running. With your consent, analytics help us improve your experience.
              </p>
            </div>
          </div>
          <div className="cookie-consent-actions mt-4 grid grid-cols-2 gap-2 sm:ml-[54px] sm:flex sm:flex-wrap sm:items-center">
                <button
                  type="button"
                  onClick={() => savePreferences(true)}
                  className="min-h-11 w-full rounded-md bg-[#27446e] px-3 py-2 text-center text-xs font-bold text-white shadow-[0_4px_14px_rgba(39,68,110,0.2)] transition hover:bg-[#1d3354] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a6cb] focus-visible:ring-offset-2 sm:w-auto sm:px-4"
                >
                  Accept all
                </button>
                <button
                  type="button"
                  onClick={() => savePreferences(false)}
                  className="min-h-11 w-full rounded-md border border-[#27446e]/20 bg-white px-3 py-2 text-center text-xs font-semibold text-[#27446e] transition hover:border-[#00a6cb]/50 hover:bg-[#e8f6fc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a6cb] focus-visible:ring-offset-2 sm:w-auto sm:px-4"
                >
                  Only essential
                </button>
                <button
                  type="button"
                  onClick={() => setPreferencesOpen(true)}
                  className="col-span-2 inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-md border border-[#27446e]/10 px-3 py-2 text-xs font-bold text-[#008db0] transition hover:bg-[#e8f6fc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a6cb] sm:col-span-1 sm:w-auto sm:border-transparent"
                >
                  <SlidersHorizontal aria-hidden="true" className="h-3.5 w-3.5" />
                  Preferences
                </button>
          </div>
        </section>
      )}

      {preferencesOpen && (
        <div className="fixed inset-0 z-[1100] flex items-end justify-center bg-slate-950/45 p-3 sm:items-center sm:p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
            className="cookie-preferences-sheet max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto overscroll-contain rounded-md border border-[#27446e]/10 bg-white shadow-[0_24px_70px_-24px_rgba(13,42,74,0.5)]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <div className="h-1 w-full bg-gradient-to-r from-[#27446e] via-[#008db0] to-[#8cd4dd]" />
            <div className="p-4 sm:p-7">
            <h2 id="cookie-preferences-title" className="text-xl font-bold tracking-tight text-[#0d2a4a]">Cookie preferences</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Choose which optional cookies Everacy can use. Essential cookies are always on.</p>
            <div className="mt-5 divide-y divide-[#27446e]/10 rounded-md border border-[#27446e]/10 px-4">
              <div className="flex items-center justify-between gap-4 py-4">
                <div>
                  <p className="text-sm font-bold text-[#0d2a4a]">Essential</p>
                  <p className="mt-1 text-sm text-slate-600">Required for core site functions.</p>
                </div>
                <span className="text-sm font-bold text-slate-500">Always on</span>
              </div>
              <div className="flex items-center justify-between gap-4 py-4">
                <div>
                  <p className="text-sm font-bold text-[#0d2a4a]">Analytics</p>
                  <p className="mt-1 text-sm text-slate-600">Helps us improve the site.</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={analyticsChoice}
                  aria-label="Allow analytics cookies"
                  onClick={() => setAnalyticsChoice((value) => !value)}
                  className={"relative h-7 w-12 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a6cb] focus-visible:ring-offset-2 " + (analyticsChoice ? "bg-[#00a6cb]" : "bg-slate-300")}
                >
                  <span className={"absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform " + (analyticsChoice ? "translate-x-6" : "translate-x-1")} />
                </button>
              </div>
            </div>
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
              <button
                autoFocus
                type="button"
                onClick={() => setPreferencesOpen(false)}
                className="min-h-11 rounded-md border border-[#27446e]/15 px-4 py-2.5 text-sm font-semibold text-[#27446e] hover:bg-[#e8f6fc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a6cb] sm:border-transparent"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => savePreferences(analyticsChoice)}
                className="min-h-11 rounded-md bg-[#27446e] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1d3354] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a6cb] focus-visible:ring-offset-2"
              >
                Save preferences
              </button>
            </div>
            </div>
          </section>
        </div>
      )}

      {ready && consent?.analytics && analyticsGranted && analyticsId && (
        <>
          <Script
            id="everacy-google-analytics"
            src={"https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(analyticsId)}
            strategy="afterInteractive"
          />
          <Script id="everacy-google-analytics-config" strategy="afterInteractive">
            {"window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments);}gtag('js',new Date());gtag('config'," +
              JSON.stringify(analyticsId) +
              ",{anonymize_ip:true});"}
          </Script>
        </>
      )}
    </>
  );
}
