"use client";

import { stagger, useAnimate } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { INTRO_STORAGE_KEY } from "@/lib/intro";

/**
 * "The Showcase" — first-visit welcome film for the homepage (~4.5s).
 *
 * Staged like a jeweller's display case: a dark velvet field, one warm light, gold dust in the air.
 *  1. A light blooms; an engine-turned (guilloché) rosette is engraved line by line inside a bangle.
 *  2. The real logo is "cast": it wipes in as solid molten gold, then resolves into the true logo.
 *  3. A polish of light crosses the logo (masked to its own shape) and three facets glint.
 *  4. The tagline sets letter by letter.
 *  5. The bangle opens — an iris of gold widens from the logo and the showroom is revealed through it.
 *
 * Plays once per browser session, can be skipped (button / Esc), honours reduced motion,
 * and can never trap the page (no-JS fallback + safety timeouts).
 */

const STORAGE_KEY = INTRO_STORAGE_KEY;
const LOGO = "/images/logo.svg";
const EASE_DRAW: [number, number, number, number] = [0.65, 0, 0.35, 1];
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

// The pre-paint boot script lives in src/lib/intro.ts and is loaded from the root layout.

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ── Guilloché rosette: 36 circles whose centres sit on a ring, leaving the middle clear for the logo ── */
const ROSE_COUNT = 36;
const ROSE = Array.from({ length: ROSE_COUNT }, (_, i) => {
  const a = (i / ROSE_COUNT) * Math.PI * 2;
  return { cx: (200 + Math.cos(a) * 148).toFixed(2), cy: (200 + Math.sin(a) * 148).toFixed(2) };
});

const TAGLINE = "Wholesale & Retail Gold Ornaments";

// Facet glints, positioned over the logo (percent of the logo box)
const GLINTS = [
  { left: "27%", top: "9%", size: 22 },
  { left: "91%", top: "47%", size: 16 },
  { left: "8%", top: "60%", size: 13 },
];

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1  0 0 0 0 0.9  0 0 0 0 0.7  0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const easeInOutQuart = (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2);

/** Minimal rAF tween — used for the iris so it never depends on CSS-variable animation support. */
const tween = (ms: number, onUpdate: (progress: number) => void) =>
  new Promise<void>((resolve) => {
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      onUpdate(easeInOutQuart(t));
      if (t < 1) requestAnimationFrame(step);
      else resolve();
    };
    requestAnimationFrame(step);
  });

/** Slow gold dust drifting up through the light. Returns a stop function. */
function startDust(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  let width = 0;
  let height = 0;
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();

  const count = width < 640 ? 38 : 84;
  const motes = Array.from({ length: count }, () => {
    const depth = Math.random(); // 0 = far, 1 = near
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.35 + depth * 1.35,
      vy: -(3 + depth * 13),
      sway: 4 + Math.random() * 10,
      swaySpeed: 0.2 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      twinkle: 0.6 + Math.random() * 1.8,
      alpha: 0.18 + depth * 0.55,
    };
  });

  let frame = 0;
  let last = performance.now();
  const startedAt = last;

  const draw = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const t = (now - startedAt) / 1000;
    const fadeIn = Math.min(1, t / 1.4);

    ctx.clearRect(0, 0, width, height);
    for (const m of motes) {
      m.y += m.vy * dt;
      if (m.y < -6) {
        m.y = height + 6;
        m.x = Math.random() * width;
      }
      const x = m.x + Math.sin(t * m.swaySpeed + m.phase) * m.sway;
      const a = m.alpha * fadeIn * (0.45 + 0.55 * Math.sin(t * m.twinkle + m.phase));
      if (a <= 0.01) continue;
      // soft halo + bright core
      ctx.fillStyle = `rgba(232, 201, 106, ${(a * 0.16).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(x, m.y, m.r * 3.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(255, 236, 179, ${a.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(x, m.y, m.r, 0, Math.PI * 2);
      ctx.fill();
    }
    frame = requestAnimationFrame(draw);
  };
  frame = requestAnimationFrame(draw);
  window.addEventListener("resize", resize);

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("resize", resize);
  };
}

const logoMask = {
  WebkitMaskImage: `url(${LOGO})`,
  maskImage: `url(${LOGO})`,
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
} as const;

export const WelcomeIntro = () => {
  const [scope, animate] = useAnimate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const finished = useRef(false);
  const exiting = useRef(false);
  const timeline = useRef<{ stop: () => void } | null>(null);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // storage unavailable — intro simply plays again next visit
    }
    const html = document.documentElement;
    html.classList.remove("intro-playing");
    html.classList.add("intro-seen");
  }, []);

  const exit = useCallback(
    async (quick = false) => {
      const root = scope.current as HTMLElement | null;
      if (exiting.current || !root) return;
      exiting.current = true;
      timeline.current?.stop();
      // Whatever happens below, the page is released
      const hardStop = setTimeout(finish, 2600);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      try {
        if (reduced) {
          await animate(root, { opacity: 0 }, { duration: 0.5 });
        } else {
          // Logo and text step back, the engraving loosens…
          animate("[data-intro-content]", { opacity: 0, scale: 1.05 }, { duration: quick ? 0.25 : 0.4, ease: EASE_OUT });
          animate("[data-intro-engraving]", { opacity: 0, scale: 1.35 }, { duration: quick ? 0.5 : 0.8, ease: EASE_OUT });
          animate("[data-intro-chrome]", { opacity: 0 }, { duration: 0.25 });
          animate("[data-intro-iris-ring]", { opacity: [0, 1] }, { duration: 0.25 });
          // …and the bangle opens onto the showroom
          const radius = Math.hypot(window.innerWidth, window.innerHeight) / 2 + 60;
          await new Promise((r) => setTimeout(r, quick ? 60 : 180));
          await tween(quick ? 750 : 1050, (p) => root.style.setProperty("--iris", `${(p * radius).toFixed(1)}px`));
        }
      } finally {
        clearTimeout(hardStop);
        finish();
      }
    },
    [animate, finish, scope]
  );

  useIsomorphicLayoutEffect(() => {
    const html = document.documentElement;
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seen = true;
    }
    // Client-side navigation back to the homepage: the boot script doesn't re-run, so apply here
    if (seen) {
      finished.current = true;
      html.classList.add("intro-seen");
      return;
    }
    html.classList.add("intro-playing");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const safety = setTimeout(() => exit(true), 8000);
    // Guards against React dev-mode double effects: a stopped run must not trigger the exit
    let cancelled = false;
    const stopDust = !reduced && canvasRef.current ? startDust(canvasRef.current) : () => {};

    const run = async () => {
      if (reduced) {
        const controls = animate([
          ["[data-intro-light]", { opacity: 1 }, { duration: 0.4 }],
          ["[data-intro-ring], [data-intro-rose]", { strokeDashoffset: 0 }, { duration: 0.01, at: 0 }],
          ["[data-intro-logo]", { opacity: 1 }, { duration: 0.6, at: 0.1 }],
          ["[data-intro-char], [data-intro-line]", { opacity: 1 }, { duration: 0.4, at: 0.3 }],
          ["[data-intro-skip]", { opacity: 1 }, { duration: 0.2, at: 0 }],
        ]);
        timeline.current = controls;
        await controls;
        await new Promise((r) => setTimeout(r, 900));
      } else {
        const controls = animate([
          // 1 — light and engraving
          ["[data-intro-light]", { opacity: [0, 1], scale: [0.55, 1] }, { duration: 1.7, ease: EASE_OUT, at: 0.05 }],
          ["[data-intro-ring]", { strokeDashoffset: [1, 0] }, { duration: 1.35, ease: EASE_DRAW, delay: stagger(0.12), at: 0.15 }],
          ["[data-intro-rose]", { strokeDashoffset: [1, 0] }, { duration: 1.05, ease: EASE_DRAW, delay: stagger(0.02), at: 0.3 }],
          // 2 — the logo is cast in gold, then resolves into the real mark
          [
            "[data-intro-cast]",
            { opacity: [0, 1], clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"], filter: ["blur(7px)", "blur(0px)"] },
            { duration: 1.0, ease: EASE_OUT, at: 1.05 },
          ],
          ["[data-intro-logo]", { opacity: [0, 1] }, { duration: 0.65, ease: "easeInOut", at: 1.85 }],
          ["[data-intro-cast]", { opacity: 0 }, { duration: 0.7, ease: "easeInOut", at: 1.95 }],
          // 3 — polish and glints
          ["[data-intro-sheen]", { backgroundPosition: ["140% 0", "-40% 0"] }, { duration: 1.1, ease: "easeInOut", at: 2.2 }],
          [
            "[data-intro-glint]",
            { opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 50] },
            { duration: 0.75, ease: "easeInOut", delay: stagger(0.2), at: 2.35 },
          ],
          // 4 — tagline
          [
            "[data-intro-char]",
            { opacity: [0, 1], y: [9, 0], filter: ["blur(4px)", "blur(0px)"] },
            { duration: 0.5, ease: EASE_OUT, delay: stagger(0.017), at: 2.3 },
          ],
          ["[data-intro-line]", { opacity: [0, 1], y: [8, 0] }, { duration: 0.6, ease: EASE_OUT, at: 2.85 }],
          // chrome
          ["[data-intro-progress]", { scaleX: [0, 1] }, { duration: 3.5, ease: "linear", at: 0 }],
          ["[data-intro-skip]", { opacity: [0, 1] }, { duration: 0.4, at: 0.7 }],
        ]);
        timeline.current = controls;
        await controls;
        await new Promise((r) => setTimeout(r, 220));
      }
      if (!cancelled) await exit();
    };

    run();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") exit(true);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelled = true;
      clearTimeout(safety);
      stopDust();
      window.removeEventListener("keydown", onKey);
      timeline.current?.stop();
      // Never leave the page scroll-locked if the component unmounts mid-sequence
      html.classList.remove("intro-playing");
    };
  }, [animate, exit]);

  return (
    <>
      <noscript>
        <style>{`#welcome-intro{display:none!important}`}</style>
      </noscript>

      <div
        id="welcome-intro"
        ref={scope}
        className="fixed inset-0 z-[200] pointer-events-none"
        style={{ ["--iris" as string]: "0px" }}
      >
        {/* Velvet stage — an iris-shaped hole opens in it on exit */}
        <div
          data-intro-panel
          className="absolute inset-0 pointer-events-auto overflow-hidden"
          style={{
            background: "radial-gradient(120% 90% at 50% 46%, #3E2723 0%, #2A1A17 52%, #150C0A 100%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 50%, transparent calc(var(--iris) - 1px), #000 var(--iris))",
            maskImage: "radial-gradient(circle at 50% 50%, transparent calc(var(--iris) - 1px), #000 var(--iris))",
          }}
        >
          {/* Film grain: gives the dark field a material, velvet quality */}
          <div aria-hidden="true" className="absolute inset-0 opacity-[0.07] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />

          {/* Gold dust */}
          <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />

          {/* Stage, centred exactly on the viewport so the iris opens from the logo */}
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(86vw,60vh,520px)] aspect-square">
            {/* The light */}
            <div
              data-intro-light
              className="absolute inset-[-18%] rounded-full"
              style={{
                opacity: 0,
                background:
                  "radial-gradient(circle, rgba(232,190,110,0.30) 0%, rgba(212,175,55,0.12) 32%, rgba(212,175,55,0) 62%)",
              }}
            />

            {/* Engraving: bangle + guilloché rosette */}
            <svg data-intro-engraving viewBox="0 0 400 400" fill="none" className="absolute inset-0 h-full w-full overflow-visible">
              <defs>
                <linearGradient id="intro-gold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#F3DC8A" />
                  <stop offset="0.5" stopColor="#D4AF37" />
                  <stop offset="1" stopColor="#8C6A1E" />
                </linearGradient>
              </defs>
              <g className="intro-rosette" style={{ transformOrigin: "200px 200px" }}>
                {ROSE.map((c, i) => (
                  <circle
                    key={i}
                    data-intro-rose
                    cx={c.cx}
                    cy={c.cy}
                    r="34"
                    pathLength={1}
                    stroke="#D4AF37"
                    strokeWidth="0.55"
                    strokeOpacity="0.5"
                    strokeDasharray="1"
                    strokeDashoffset="1"
                  />
                ))}
              </g>
              {/* Bangle */}
              <circle data-intro-ring cx="200" cy="200" r="188" pathLength={1} stroke="url(#intro-gold)" strokeWidth="1.6" strokeDasharray="1" strokeDashoffset="1" transform="rotate(-90 200 200)" />
              <circle data-intro-ring cx="200" cy="200" r="194" pathLength={1} stroke="#D4AF37" strokeOpacity="0.45" strokeWidth="0.6" strokeDasharray="1" strokeDashoffset="1" transform="rotate(90 200 200)" />
              <circle data-intro-ring cx="200" cy="200" r="110" pathLength={1} stroke="#D4AF37" strokeOpacity="0.35" strokeWidth="0.6" strokeDasharray="1" strokeDashoffset="1" transform="rotate(-90 200 200)" />
            </svg>

            <div data-intro-content className="absolute inset-0">
              {/* Lit plate behind the logo: hides the engraving there and reads as the spotlight's pool */}
              <div
                className="absolute inset-[12%] rounded-full"
                style={{ background: "radial-gradient(circle, #4A2F28 0%, #3A2420 46%, rgba(58,36,32,0) 72%)" }}
              />

              {/* Logo */}
              <div className="absolute left-1/2 top-1/2 w-[56%] -translate-x-1/2 -translate-y-1/2">
                <div className="relative aspect-[542/343]">
                  {/* Molten cast: the logo's own silhouette, filled with gold */}
                  <div
                    data-intro-cast
                    className="absolute inset-0"
                    style={{
                      ...logoMask,
                      opacity: 0,
                      clipPath: "inset(0 100% 0 0)",
                      background: "linear-gradient(100deg, #8C6A1E 0%, #F7E7A6 34%, #D4AF37 58%, #FFF3C4 76%, #9C7A25 100%)",
                    }}
                  />
                  {/* The real logo */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    data-intro-logo
                    src={LOGO}
                    alt=""
                    width={542}
                    height={343}
                    draggable={false}
                    className="absolute inset-0 h-full w-full drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)]"
                    style={{ opacity: 0 }}
                  />
                  {/* Polish */}
                  <div
                    data-intro-sheen
                    className="absolute inset-0"
                    style={{
                      ...logoMask,
                      backgroundImage:
                        "linear-gradient(105deg, rgba(255,255,255,0) 40%, rgba(255,244,205,0.9) 48%, rgba(255,255,255,0.95) 50%, rgba(255,244,205,0.9) 52%, rgba(255,255,255,0) 60%)",
                      backgroundSize: "250% 100%",
                      backgroundPosition: "140% 0",
                      mixBlendMode: "screen",
                    }}
                  />
                  {/* Facet glints */}
                  {GLINTS.map((g) => (
                    <svg
                      key={g.left}
                      data-intro-glint
                      viewBox="0 0 24 24"
                      width={g.size}
                      height={g.size}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: g.left, top: g.top, opacity: 0, filter: "drop-shadow(0 0 6px rgba(255,236,179,0.9))" }}
                    >
                      <path d="M12 0 C12.6 7.5 16.5 11.4 24 12 C16.5 12.6 12.6 16.5 12 24 C11.4 16.5 7.5 12.6 0 12 C7.5 11.4 11.4 7.5 12 0Z" fill="#FFF6D6" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Tagline, set below the bangle */}
              <div className="absolute left-1/2 top-full mt-5 sm:mt-7 w-[92vw] max-w-xl -translate-x-1/2 flex flex-col items-center gap-3 text-center">
                <p className="font-montserrat text-[9px] sm:text-[11px] font-medium uppercase tracking-[0.34em] sm:tracking-[0.42em] text-[#F3E7C9]/85">
                  {TAGLINE.split("").map((ch, i) => (
                    <span key={i} data-intro-char className="inline-block" style={{ opacity: 0 }}>
                      {ch === " " ? " " : ch}
                    </span>
                  ))}
                </p>
                <p data-intro-line className="flex items-center gap-3 font-cinzel text-[11px] sm:text-sm tracking-[0.28em] text-[#D4AF37]" style={{ opacity: 0 }}>
                  <span className="h-px w-7 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                  Shahibaug · Ahmedabad
                  <span className="h-px w-7 bg-gradient-to-l from-transparent to-[#D4AF37]" />
                </p>
              </div>
            </div>
          </div>

          {/* Chrome: progress hairline + skip */}
          <div data-intro-chrome>
            <div aria-hidden="true" className="absolute bottom-0 left-0 h-px w-full bg-[#D4AF37]/15">
              <div data-intro-progress className="h-full w-full origin-left bg-[#D4AF37]/80" style={{ transform: "scaleX(0)" }} />
            </div>
            <button
              type="button"
              data-intro-skip
              onClick={() => exit(true)}
              style={{ opacity: 0 }}
              className="absolute bottom-5 right-5 sm:bottom-8 sm:right-10 px-2 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#F3E7C9]/45 hover:text-[#D4AF37] transition-colors"
            >
              Skip Intro
            </button>
          </div>
        </div>

        {/* The opening bangle: a gold ring riding the edge of the iris */}
        <div
          data-intro-iris-ring
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            opacity: 0,
            width: "calc(var(--iris) * 2)",
            height: "calc(var(--iris) * 2)",
            boxShadow:
              "0 0 0 1.5px rgba(232,201,106,0.95), 0 0 0 7px rgba(212,175,55,0.14), 0 0 46px 8px rgba(212,175,55,0.35), inset 0 0 38px 4px rgba(212,175,55,0.22)",
          }}
        />
      </div>
    </>
  );
};
