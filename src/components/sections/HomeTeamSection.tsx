/* ─────────────────────────────────────────────────────────
   HomeTeamSection — Human Engineering & Leadership
   Inspired by Leapfrog's team/human culture section:
   - Real engineer & leadership headshots from Django team data
   - Sharp, boxy layout with authentic titles and bios
   - Highlights the people behind the code to build deep trust
   ───────────────────────────────────────────────────────── */
"use client";

import Link from "next/link";
import { ArrowRight, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import type { TeamSectionData } from "@/lib/api";

interface HomeTeamSectionProps {
  teamSections?: TeamSectionData[] | null;
}

export function HomeTeamSection({ teamSections }: HomeTeamSectionProps) {
  // Flatten or pick the primary leadership and key squad directors
  const allMembers = (teamSections ?? []).flatMap((sec) =>
    sec.members.map((m) => ({ ...m, categoryName: sec.title }))
  );

  // If team data isn't loaded yet, return null
  if (!allMembers.length) return null;

  // Showcase key directors and squad leads (first 6)
  const featuredMembers = allMembers.slice(0, 6);

  return (
    <section className="relative z-[2] overflow-hidden border-t border-[#dce8ec] bg-[#f8fbfc] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 border border-[#dce8ec] bg-white px-3 py-1 shadow-sm">
              <span className="h-2 w-2 bg-[#008da4]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#008da4]">
                Human Engineering &amp; Culture
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-[#0d2a4a] sm:text-4xl lg:text-5xl">
              The Minds Engineering Your Systems
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#586d82]">
              Software isn&apos;t built in a vacuum. Meet the squad directors, software architects, and technical leads who take personal ownership of your code and infrastructure.
            </p>
          </div>

          <Link
            href="/about"
            className="group inline-flex shrink-0 items-center gap-2 rounded-none border border-[#0d2a4a] bg-white px-5 py-3 font-mono text-xs font-black uppercase tracking-wider text-[#0d2a4a] transition-all hover:bg-[#0d2a4a] hover:text-white"
          >
            <span>Meet All Team Members</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Team Grid (Sharp Boxy Cards with Real Photos) */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredMembers.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="group flex flex-col justify-between rounded-none border border-[#dce8ec] bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#008da4] hover:shadow-[4px_4px_0px_0px_#008da4]"
            >
              <div>
                {/* Photo Frame */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-none border border-[#e2ecee] bg-[#f0f4f6]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.image || "/images/person.png"}
                    alt={member.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/images/person.png";
                    }}
                  />
                  <div className="absolute top-2.5 right-2.5 border border-[#dce8ec] bg-white/95 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#008da4]">
                    {member.categoryName || "ENGINEERING"}
                  </div>
                </div>

                {/* Member Info */}
                <div className="mt-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black tracking-tight text-[#0d2a4a] transition-colors group-hover:text-[#008da4]">
                      {member.name}
                    </h3>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#7a8f9f] hover:text-[#008da4]"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <p className="mt-1 font-mono text-xs font-bold uppercase tracking-wider text-[#008da4]">
                    {member.role}
                  </p>
                  {member.subtitle && (
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#5c7288]">
                      {member.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom Tag */}
              <div className="mt-5 border-t border-[#f0f4f6] pt-3 flex items-center justify-between text-[11px] font-mono text-[#7a8f9f]">
                <span>ACCOUNTABLE SQUAD</span>
                <span className="font-semibold text-[#0d2a4a]">FULL OWNERSHIP</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Human Collaboration Banner */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border border-[#dce8ec] bg-white p-8 sm:flex-row shadow-sm">
          <div>
            <h4 className="text-xl font-black uppercase text-[#0d2a4a]">
              Need a dedicated engineering squad?
            </h4>
            <p className="mt-1 text-sm text-[#586d82]">
              We assemble customized squads (engineers, architects, and QA leads) ready to integrate into your product within 48 hours.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-none border border-[#0d2a4a] bg-[#0d2a4a] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all hover:border-[#008da4] hover:bg-[#008da4]"
          >
            <span>Speak With Technical Leadership</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
