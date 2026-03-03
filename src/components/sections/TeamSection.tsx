/* ─────────────────────────────────────────────────────────
   TeamSection — 3x3 Grid of Team Members
   Features pop-out hover effects and brand-consistent design.
   ───────────────────────────────────────────────────────── */
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { teamConfig } from "@/lib/site-theme";
import Image from "next/image";

export function TeamSection() {
  const { header, members } = teamConfig;

  return (
    <section className="py-24 bg-white font-mont relative z-[2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <header className="text-center mb-20 px-4">
          <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight" style={{ color: "#0d2a4a" }}>
            {header.title}
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[2px] w-12" style={{ backgroundColor: "#0d2a4a4d" }} />
            <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: "#0d2a4a" }} />
            <div className="h-[2px] w-12" style={{ backgroundColor: "#0d2a4a4d" }} />
          </div>
          <p className="max-w-2xl mx-auto text-lg font-medium" style={{ color: "#0d2a4a" }}>
            {header.subtitle}
          </p>
        </header>

        {/* Leadership Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-10 text-center uppercase tracking-widest opacity-60" style={{ color: "#0d2a4a" }}>
            Leadership
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-10">
            {members.slice(0, 3).map((member, index) => (
              <PremiumTeamCard key={member.id} member={member} dark={index === 1} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center mb-24 opacity-20">
          <div className="h-[1px] w-full max-w-4xl bg-[#0d2a4a]" />
        </div>

        {/* Engineering Team Section */}
        <div>
          <h3 className="text-2xl font-bold mb-16 text-center uppercase tracking-widest opacity-60" style={{ color: "#0d2a4a" }}>
            Engineering Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-10 pt-24">
            {members.slice(3).map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .morph-card {
          --bg: #fff;
          --title-color: #fff;
          --title-color-hover: #fff;
          --text-color: rgba(255,255,255,0.75);
          background: var(--bg);
          border-radius: 2rem;
          width: 20rem;
          height: 30rem;
          overflow: hidden;
          position: relative;
          font-family: Lato, Montserrat, Helvetica, Arial, sans-serif;
          margin: 0 auto;
          cursor: pointer;
        }

        .morph-card.dark {
          --bg: #222;
          --title-color: #fff;
          --title-color-hover: #fff;
          --text-color: #ccc;
          --button-color: #555;
          --button-color-hover: #444;
        }

        .morph-card::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 45%;
          bottom: 0;
          left: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 100%);
          z-index: 10;
        }

        .morph-card > img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 50% 10%;
          display: block;
          transition: object-position 0.4s ease, transform 0.4s ease;
          z-index: 1;
        }

        .morph-card > section {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1rem 1.5rem 1.4rem;
          display: flex;
          flex-direction: column;
          z-index: 20;
          gap: 0;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .morph-card > section h2 {
          margin: 0;
          font-size: 1.35rem;
          color: #fff;
          font-weight: 700;
          opacity: 1;
          text-shadow: 0 1px 10px rgba(0,0,0,0.5);
          line-height: 1.2;
        }

        /* Collapsible wrapper — bio + button */
        .card-expand {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease;
          opacity: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .morph-card:hover .card-expand,
        .morph-card:focus-within .card-expand {
          max-height: 9rem;
          opacity: 1;
        }

        .card-expand p {
          font-size: 0.82rem;
          line-height: 1.4;
          color: rgba(255,255,255,0.8);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          padding-top: 0.6rem;
        }

        .card-expand .card-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.2rem;
        }

        .morph-card button {
          border: 1.5px solid rgba(255,255,255,0.25);
          border-radius: 2rem;
          font-size: 0.78rem;
          padding: 0.45rem 1rem 0.45rem 1.9rem;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(6px);
          transition: background 0.33s, border-color 0.33s;
          outline-offset: 2px;
          position: relative;
          color: #fff;
          width: auto;
          min-width: 5.5rem;
          text-align: right;
          cursor: pointer;
          font-weight: 700;
          letter-spacing: 0.03em;
          flex-shrink: 0;
        }

        .morph-card.dark button {
          border-color: rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.1);
        }

        .morph-card button::before,
        .morph-card button::after {
          content: "";
          width: 0.7rem;
          height: 0.1rem;
          background: currentcolor;
          position: absolute;
          top: 50%;
          left: 0.85rem;
          border-radius: 1rem;
          margin-top: -0.05rem;
        }

        .morph-card button::after {
          rotate: 90deg;
          transition: rotate 0.15s;
        }

        .morph-card button.following::after {
          rotate: 0deg;
        }

        .morph-card button:hover {
          background: rgba(255,255,255,0.28);
          border-color: rgba(255,255,255,0.5);
        }



        .morph-card:hover::before,
        .morph-card:focus-within::before {
          opacity: 1;
        }

        .morph-card:hover > img,
        .morph-card:focus-within > img {
          transform: scale(1.06);
          object-position: 50% 15%;
        }

        /* Entire section slides up on hover */
        .morph-card:hover > section,
        .morph-card:focus-within > section {
          transform: translateY(-0.5rem);
        }
      `}</style>
    </section>
  );
}

function PremiumTeamCard({ member, dark = false }: { member: any; dark?: boolean }) {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className={`morph-card ${dark ? "dark" : ""}`}>
      <img src={member.image} alt={member.name} />
      <section>
        <h2>{member.name}</h2>
        <div className="card-expand">
          <p>{member.bio}</p>
          <div className="card-actions">
            <button
              className={isFollowing ? "following" : ""}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
            {isFollowing && member.links && (
              <motion.div
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                {member.links.linkedin && (
                  <a
                    href={member.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                    style={{
                      width: "1.8rem", height: "1.8rem",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.18)",
                      backdropFilter: "blur(6px)",
                      border: "1px solid rgba(255,255,255,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", transition: "background 0.2s",
                      flexShrink: 0,
                    }}
                  >
                    <svg style={{ width: "0.85rem", height: "0.85rem" }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                )}
                {member.links.github && (
                  <a
                    href={member.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                    style={{
                      width: "1.8rem", height: "1.8rem",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.18)",
                      backdropFilter: "blur(6px)",
                      border: "1px solid rgba(255,255,255,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", transition: "background 0.2s",
                      flexShrink: 0,
                    }}
                  >
                    <svg style={{ width: "0.85rem", height: "0.85rem" }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function TeamMemberCard({ member }: { member: any }) {
  return (
    <div className="flex flex-col items-center">
      <img
        src={member.image}
        alt={member.name}
        className="eng-card-img"
      />

      <div className="text-center w-full px-4 mt-8">
        <h3 className="text-xl font-black mb-1 font-mont tracking-tight" style={{ color: "#020512" }}>
          {member.name}
        </h3>
        <p className="text-slate-500 text-sm font-medium mb-4 font-mont">
          {member.role}
        </p>
        <div className="w-full border-t border-dashed border-slate-300 opacity-60" />
      </div>
    </div>
  );
}
