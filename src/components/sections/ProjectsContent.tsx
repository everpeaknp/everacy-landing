"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ProjectsContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const swappers = document.querySelectorAll(".swapper");

      const handleTranslation = (swapper: Element) => {
        const controller = swapper.parentElement?.querySelector(".controller") as HTMLElement;
        if (!controller) return;

        gsap.to(swapper, {
          y: controller.offsetHeight - (swapper as HTMLElement).offsetHeight,
          scrollTrigger: {
            trigger: swapper.parentElement,
            scrub: true,
            start: "top center+=10%",
            end: "bottom center-=10%",
          },
        });
      };

      const handleCrossFade = (swapper: Element, mobile = false) => {
        const imgs = swapper.querySelectorAll("img");
        if (imgs.length < 2) return;

        // Explicitly set initial state to override any CSS fighting
        gsap.set(imgs[0], { opacity: 0 });
        gsap.set(imgs[1], { opacity: 1 });

        gsap.to(imgs, {
          opacity: (index) => (index === 0 ? 1 : 0),
          scrollTrigger: {
            trigger: mobile ? swapper : swapper.parentElement!,
            scrub: true,
            start: mobile ? "top center" : "top center",
            end: mobile ? "bottom center" : "bottom center",
          },
        });
      };

      const handleProgress = (swapper: Element, mobile = false) => {
        const progress = swapper.querySelectorAll(".progress");
        const trigger = mobile ? swapper : swapper.parentElement!;

        gsap.to(progress, {
          "--flip": 1,
          scrollTrigger: {
            trigger,
            scrub: true,
            start: "center center",
            end: "center center",
          },
        } as any);

        const markers = swapper.querySelectorAll(".progress > div div");
        markers.forEach((marker, index) => {
          gsap.to(marker, {
            height: "100%",
            scrollTrigger: {
              trigger,
              scrub: true,
              start: index === 0 ? "center center+=50%" : "center center",
              end: index === 0 ? "center center" : "center center-=50%",
            },
          });
        });
      };

      // Apply initial states and triggers
      swappers.forEach((swapper) => {
        const isMobile = window.innerWidth < 768;
        if (!isMobile) handleTranslation(swapper);
        handleCrossFade(swapper, isMobile);
        handleProgress(swapper, isMobile);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="projects-container">
      <header className="projects-header">
        <h1><span>Elite Creations</span>Portfolio</h1>
        <h2>Engineering the Extraordinary</h2>
      </header>

      <div className="projects-main">
        {/* Project 1: Nebula Core */}
        <section>
          <div className="image-box">
            <div className="swapper">
              <div className="progress">
                <div><div></div></div>
                <div><div></div></div>
              </div>
              <div className="caption">
                <h2>Nebula Core</h2>
                <p>Advanced cloud infrastructure and distributed node clusters for global data resilience.</p>
              </div>
              <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200" alt="Cloud Infrastructure" loading="eager" />
              <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" alt="Data Centers" />
            </div>
            <div className="controller">
              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" alt="Nebula View" />
            </div>
          </div>
        </section>

        {/* Project 2: Titan Structure */}
        <section>
          <div className="image-box">
            <div className="controller">
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" alt="Modern Skyscraper" />
            </div>
            <div className="swapper">
              <div className="progress">
                <div><div></div></div>
                <div><div></div></div>
              </div>
              <div className="caption">
                <h2>Titan Structure</h2>
                <p>Architectural visualization and structural engineering for next-generation smart cities.</p>
              </div>
              <img src="https://images.unsplash.com/photo-1503387762-5929c6293f2d?auto=format&fit=crop&q=80&w=1200" alt="Industrial Framework" />
              <img src="https://images.unsplash.com/photo-1518005020251-582c3dc62821?auto=format&fit=crop&q=80&w=1200" alt="Geometric Structures" />
            </div>
          </div>
        </section>

        {/* Project 3: Quantum Link */}
        <section>
          <div className="image-box">
            <div className="swapper">
              <div className="progress">
                <div><div></div></div>
                <div><div></div></div>
              </div>
              <div className="caption">
                <h2>Quantum Link</h2>
                <p>Secure, ultra-fast fiber connectivity and quantum-encrypted communication layers.</p>
              </div>
              <img src="https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=1200" alt="Fiber Optics" />
              <img src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200" alt="Global Network" />
            </div>
            <div className="controller">
              <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=1200" alt="Server Grid" />
            </div>
          </div>
        </section>

        {/* Project 4: Astra Frame */}
        <section>
          <div className="image-box">
            <div className="controller">
              <img src="https://images.unsplash.com/photo-1581091215307-91e8bc17f864?auto=format&fit=crop&q=80&w=1200" alt="Robot Arm" />
            </div>
            <div className="swapper">
              <div className="progress">
                <div><div></div></div>
                <div><div></div></div>
              </div>
              <div className="caption">
                <h2>Astra Frame</h2>
                <p>Precision prototyping and advanced robotics for automated manufacturing systems.</p>
              </div>
              <img src="https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&q=80&w=1200" alt="Industrial Tech" />
              <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1200" alt="Circuitry Detail" />
            </div>
          </div>
        </section>

        <section className="fin">
          <h2>Engineering Tomorrow.</h2>
          <h2>Experience the future of digital infrastructure.<br />Polyfilled with GSAP.</h2>
        </section>
      </div>

      <style jsx global>{`
        :root {
          --left-pad: calc(48px + 2rem);
          --container-width: calc(100vw - 1rem - var(--left-pad));
          --column-one: calc(var(--container-width) * (1.2 / 3.2));
          --column-two: calc(var(--container-width) * (2 / 3.2));
          --col-one-height: min(70vh, calc((380 / 272) * var(--column-one)));
          --col-two-height: min(110vh, calc((1148 / 940) * var(--column-two)));
          --catch-up: calc(var(--col-two-height) - var(--col-one-height));
          --heading: clamp(2rem, 6vw + 1rem, 10rem);
        }

        .projects-container {
          min-height: 100vh;
          font-family: Montserrat, "SF Pro Text", system-ui, sans-serif;
          background: white;
          color: black;
          overflow-x: hidden;
        }

        .projects-header {
          height: 100vh;
          display: grid;
          place-items: center;
          align-content: center;
          margin-bottom: 25vh;
          text-align: center;
        }

        .projects-header h1 {
          font-size: var(--heading);
          margin: 0;
          position: relative;
          font-weight: 900;
          text-transform: uppercase;
        }

        .projects-header h1 span {
          position: absolute;
          bottom: 100%;
          left: 50%;
          display: inline-block;
          translate: -50% 50%;
          font-size: calc(var(--heading) * 0.2);
          text-transform: uppercase;
          color: #27446e;
        }

        .projects-header h2 {
          text-transform: uppercase;
          opacity: 0.8;
          font-size: calc(var(--heading) * 0.25);
          margin-top: 1rem;
        }

        .projects-main {
          display: flex;
          flex-direction: column;
          gap: 12rem;
        }

        .image-box {
          display: grid;
          gap: 1rem;
          padding: 1rem 1rem 1rem var(--left-pad);
          min-height: 100vh;
          grid-template-columns: 1.2fr 2fr;
          position: relative;
          view-timeline: --container;
        }

        section:nth-of-type(odd) .image-box {
          grid-template-columns: 1.2fr 2fr;
        }

        section:nth-of-type(even) .image-box {
          grid-template-columns: 2fr 1.2fr;
        }

        .swapper {
          height: var(--col-one-height);
          width: 100%;
          position: relative;
          border-radius: 6px;
          isolation: isolate;
          background: #0a0a0a;
        }

        .swapper img {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 6px;
          object-fit: cover;
        }

        .progress {
          position: absolute;
          height: min(100px, 15%);
          width: 6px;
          top: 50%;
          translate: 0 -50%;
          display: flex;
          flex-direction: column;
          gap: 5%;
          z-index: 10;
          --flip: 0;
        }

        .progress > div {
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.25);
          flex: 10;
          position: relative;
        }

        .progress div > div {
          position: absolute;
          top: 0;
          width: 100%;
          border-radius: 100px;
          height: 0%;
          background: white;
        }

        .progress > div:last-of-type {
          flex: calc(1 + (var(--flip) * 99));
        }

        .image-box > .swapper:first-child .progress {
          right: 6px;
        }
        .image-box > .swapper:last-child .progress {
          left: 6px;
        }

        .caption {
          position: absolute;
          bottom: 100%;
          padding: 1rem;
          font-size: 12px;
          width: 40ch;
          max-width: 90%;
          text-align: right;
          right: 6px;
          text-transform: uppercase;
          display: grid;
          gap: 0.25rem;
          color: #1e293b;
        }

        section:nth-of-type(even) .caption {
           text-align: left;
           left: 6px;
           right: auto;
        }

        .caption h2 {
          font-size: 14px;
          font-weight: 800;
          color: #0f172a;
        }

        .controller {
          height: var(--col-two-height);
          width: 100%;
          border-radius: 6px;
          background: #0a0a0a;
        }

        .controller img {
          width: 100%;
          height: 100%;
          border-radius: 6px;
          object-fit: cover;
        }

        .fin {
          height: 50vh;
          display: grid;
          place-items: center;
          align-content: center;
          text-align: center;
          padding-bottom: 10vh;
        }

        .fin h2 {
          font-size: calc(var(--heading) * 0.8);
          font-weight: 900;
          text-transform: uppercase;
        }

        .fin h2:last-of-type {
          font-size: calc(var(--heading) * 0.15);
          text-transform: uppercase;
          opacity: 0.6;
          margin-top: 1rem;
        }

        @supports (animation-timeline: scroll()) {
          .swapper {
            animation: move linear;
            animation-timeline: --container;
            animation-range: entry 100% exit 0%;
          }

          @keyframes move {
            to { transform: translateY(var(--catch-up)); }
          }
        }

        @media (max-width: 768px) {
          .projects-main {
            gap: 6rem;
          }
          .image-box {
            display: flex;
            flex-direction: column;
            gap: 8rem;
            padding-left: 1rem;
            min-height: auto;
          }
          .controller {
            height: 40vh;
          }
          .swapper {
            width: 100%;
            height: 40vh;
          }
          .caption {
             position: static;
             width: 100%;
             text-align: left;
             padding: 1rem 0;
          }
        }
      `}</style>
    </main>
  );
}
