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
    <section className="py-24 bg-white font-mont relative z-[2] overflow-hidden">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-10">
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
          --title-color-hover: #000;
          --text-color: #666;
          --button-color: #eee;
          --button-color-hover: #ddd;
          background: var(--bg);
          border-radius: 2rem;
          padding: 0; /* Removed padding for full card image */
          width: 20rem;
          height: 30rem;
          overflow: hidden;
          position: relative;
          font-family: Lato, Montserrat, Helvetica, Arial, sans-serif;
          margin: 0 auto;
          transition: background 0.5s;
          display: flex;
          flex-direction: column;
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
          max-width: 100%;
          aspect-ratio: 2 / 3;
          object-fit: cover;
          object-position: 50% 5%;
          display: block;
          transition: aspect-ratio 0.25s, object-position 0.5s, transform 0.3s ease;
          width: 100%;
          height: auto;
        }

        .morph-card > section {
          margin: 1.5rem;
          height: calc(33.3333% - 1.5rem);
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 20;
          justify-content: flex-end;
        }

        .morph-card > section h2 {
          margin: 0;
          margin-block-end: 0.75rem; /* Reduced for more space */
          font-size: 1.5rem;
          color: var(--title-color);
          translate: 0 -200%;
          transition: color 0.5s, margin-block-end 0.25s, translate 0.25s;
          font-weight: 700;
          opacity: 1;
        }

        .morph-card > section p {
          font-size: 0.95rem;
          line-height: 1.3;
          color: var(--text-color);
          opacity: 0;
          margin: 0;
          translate: 0 100%;
          transition: margin-block-end 0.25s, opacity 1s 0.2s, translate 0.25s 0.2s;
          display: -webkit-box;
          -webkit-line-clamp: 4; /* Increased to 4 for better description visibility */
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .morph-card > section > div {
          flex: 1;
          align-items: flex-end;
          display: flex;
          justify-content: flex-end;
          opacity: 0;
          transition: translate 0.25s 0.2s, opacity 1s;
        }

        .morph-card button {
          border: 1px solid #0000;
          border-radius: 1.25rem 1.25rem 1.5rem 1.25rem;
          font-size: 0.9rem; /* Smaller font */
          padding: 0.65rem 1.25rem 0.65rem 2.25rem; /* Smaller padding */
          translate: 1rem;
          background: var(--button-color);
          transition: background 0.33s;
          outline-offset: 2px;
          position: relative;
          color: var(--title-color-hover);
          width: 7.5rem; /* Narrower width */
          text-align: right;
          cursor: pointer;
          font-weight: 700;
        }

        .morph-card button::before,
        .morph-card button::after {
          content: "";
          width: 0.8rem;
          height: 0.1rem;
          background: currentcolor;
          position: absolute;
          top: 50%;
          left: 1.1rem; /* Adjusted for smaller padding */
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
          background: var(--button-color-hover);
        }

        .morph-card:hover::before, 
        .morph-card:focus-within::before {
          translate: 0 100%;
        }

        .morph-card:hover > img,
        .morph-card:focus-within > img {
          aspect-ratio: 1 / 1;
          object-position: 50% 10%;
          transition: aspect-ratio 0.25s, object-position 0.25s;
        }

        .morph-card:hover > section h2,
        .morph-card:focus-within > section h2,
        .morph-card:hover > section p,
        .morph-card:focus-within > section p {
          translate: 0 0;
          margin-block-end: 0.5rem;
          opacity: 1;
        }

        .morph-card:hover > section h2,
        .morph-card:focus-within > section h2 {
          color: var(--title-color-hover);
        }

        .morph-card:hover > section > div,
        .morph-card:focus-within > section > div {
          translate: 0 0;
          opacity: 1;
          transition: translate 0.25s 0.25s, opacity 0.5s 0.25s;
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
        <p>{member.bio}</p>
        <div>
          <div className="flex items-center gap-3">
            {isFollowing && member.links && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 mb-2"
              >
                <a 
                  href={member.links.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-brand hover:text-white transition-all duration-300 shadow-sm"
                  title="LinkedIn"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a 
                  href={member.links.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm"
                  title="GitHub"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </motion.div>
            )}
            <button 
              className={isFollowing ? "following" : ""}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function TeamMemberCard({ member }: { member: any }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="flex flex-col items-center group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Circle Backdrop & Pop-out Image Area */}
      <div className="relative w-full max-w-[280px] aspect-square mb-6 flex items-center justify-center">
        {/* The Circle - Background layer */}
        <div 
          className={`absolute inset-0 bg-[#f3f4f6] rounded-full z-0 transition-all duration-500 ${isHovered ? 'scale-105 bg-[#ebedf0]' : 'scale-100'}`} 
        />
        
        {/* 
          TALL CLIPPER CONTAINER
          - height: 160% ensures head is never clipped at the top
          - overflow-hidden + rounded-b-full clips the torso at the circle's bottom curve
        */}
        <div className="absolute left-0 right-0 bottom-0 h-[160%] overflow-hidden rounded-b-full z-10 pointer-events-none">
          <motion.div
            className="w-full h-full flex items-end justify-center"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            animate={isHovered ? { y: -45, scale: 1.18 } : { y: 0, scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 90, 
              damping: 15,
            }}
          >
            <img 
              src={member.image} 
              alt={member.name}
              className="w-full h-auto object-contain select-none transform translate-y-[8%]"
            />
          </motion.div>
        </div>
      </div>

      {/* Content Area */}
      <div className="text-center w-full px-4">
        <h3 
          className="text-xl font-black mb-1 font-mont tracking-tight transition-all duration-300"
          style={{ color: isHovered ? "#0d2a4a" : "#020512" }}
        >
          {member.name}
        </h3>
        <p className="text-slate-600 text-sm font-medium mb-4 font-mont">
          {member.role}
        </p>
        
        {/* Dashed line */}
        <div className="w-full border-t border-dashed border-slate-300 opacity-60" />
      </div>
    </div>
  );
}
