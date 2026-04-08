"use client";

import { useEffect, useMemo, useRef, useState, type SVGProps } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";

interface HeroProps {
  language: "ES" | "EN";
  isMuted: boolean;
  onToggleMusic: () => void;
}

const content = {
  EN: {
    prelude: "TOGETHER WITH THEIR FAMILIES",
    names: ["Stebin", "Jesna Jose"],
    ampersand: "&",
    quote: "Join us as we celebrate love, faith, and a beautiful new beginning.",
    subline: "A Christian Wedding Celebration",
    scroll: "SCROLL TO BEGIN",
    musicOn: "Silence",
    musicOff: "Music",
  },
  ES: {
    prelude: "JUNTO CON SUS FAMILIAS",
    names: ["Stebin", "Jesna Jose"],
    ampersand: "&",
    quote: "Únanse a nosotros para celebrar el amor, la fe y un hermoso nuevo comienzo.",
    subline: "UNA CELEBRACIÓN DE BODA CRISTIANA",
    scroll: "DESLIZA PARA COMENZAR",
    musicOn: "Silencio",
    musicOff: "Música",
  },
};

function OrnamentLine(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 300 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <line x1="0" y1="6" x2="110" y2="6" stroke="#d4af7f" strokeWidth="0.6" strokeDasharray="2 4" />
      <path d="M118 6 L124 2 L130 6 L124 10 Z" fill="none" stroke="#d4af7f" strokeWidth="0.7" />
      <path d="M138 6 L150 2 L162 6 L150 10 Z" fill="none" stroke="#d4af7f" strokeWidth="0.9" />
      <path d="M170 6 L176 2 L182 6 L176 10 Z" fill="none" stroke="#d4af7f" strokeWidth="0.7" />
      <line x1="190" y1="6" x2="300" y2="6" stroke="#d4af7f" strokeWidth="0.6" strokeDasharray="2 4" />
    </svg>
  );
}

function CornerOrnament(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path d="M2 58 L2 2 L58 2" stroke="#d4af7f" strokeWidth="0.7" fill="none" />
      <path d="M2 20 L2 2 L20 2" stroke="#d4af7f" strokeWidth="1.2" fill="none" />
      <circle cx="2" cy="2" r="2" fill="#d4af7f" opacity="0.8" />
    </svg>
  );
}

function RosePetal({
  left,
  delay,
  duration,
  size,
  rotateFrom,
  rotateTo,
}: {
  left: string;
  delay: number;
  duration: number;
  size: number;
  rotateFrom: number;
  rotateTo: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute -top-16 z-[9]"
      style={{ left, width: size, height: size * 0.8 }}
      initial={{ y: -80, x: 0, opacity: 0, rotate: rotateFrom }}
      animate={{
        y: ["0vh", "110vh"],
        x: [0, 18, -12, 10, -8],
        opacity: [0, 0.8, 0.75, 0.5, 0],
        rotate: [rotateFrom, rotateTo],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div
        className="h-full w-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,245,248,0.95) 0%, rgba(247,198,217,0.95) 28%, rgba(226,144,173,0.9) 58%, rgba(176,90,118,0.85) 100%)",
          borderRadius: "65% 35% 60% 40% / 50% 45% 55% 50%",
          boxShadow: "0 8px 18px rgba(219,133,163,0.18)",
          filter: "blur(0.2px)",
        }}
      />
    </motion.div>
  );
}

function GlowParticle({
  left,
  top,
  delay,
  duration,
  size,
}: {
  left: string;
  top: string;
  delay: number;
  duration: number;
  size: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full"
      style={{
        left,
        top,
        width: size,
        height: size,
        background:
          "radial-gradient(circle, rgba(255,245,230,0.95) 0%, rgba(212,175,127,0.55) 35%, rgba(247,198,217,0.18) 70%, transparent 100%)",
        filter: "blur(1px)",
      }}
      animate={{
        y: [0, -18, 0],
        x: [0, 8, 0],
        scale: [1, 1.18, 1],
        opacity: [0.2, 0.8, 0.2],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function Hero({ language, isMuted, onToggleMusic }: HeroProps) {
  const t = content[language];
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1, 1.08]);
  const bgY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "8%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.75]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const petals = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${(i * 8.3 + 6) % 100}%`,
        delay: i * 1.2,
        duration: 10 + (i % 4) * 1.6,
        size: 12 + (i % 4) * 4,
        rotateFrom: i % 2 === 0 ? -20 : 20,
        rotateTo: i % 2 === 0 ? 240 : -220,
      })),
    []
  );

  const glowParticles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${(i * 11.1 + 4) % 100}%`,
        top: `${(i * 13.7 + 10) % 78}%`,
        delay: i * 0.25,
        duration: 3.8 + (i % 5) * 0.6,
        size: 6 + (i % 4) * 4,
      })),
    []
  );

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500;1,600&family=Great+Vibes&family=Inter:wght@300;400;500;600&display=swap');

        .font-cormorant {
          font-family: 'Cormorant Garamond', serif;
        }

        .font-script {
          font-family: 'Great Vibes', cursive;
        }

        .font-inter {
          font-family: 'Inter', sans-serif;
        }

        .hero-name {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 600;
          letter-spacing: -0.028em;
          line-height: 0.86;
        }

        .hero-name-gradient {
          background: linear-gradient(180deg, #fffaf6 0%, #f0d9bf 34%, #c79262 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }

        .hero-name-shadow {
          text-shadow:
            0 2px 0 rgba(255,255,255,0.12),
            0 10px 28px rgba(99,54,20,0.28),
            0 26px 56px rgba(0,0,0,0.24);
        }

        .hero-quote-shadow {
          text-shadow:
            0 0 18px rgba(212,175,127,0.18),
            0 8px 24px rgba(0,0,0,0.18);
        }

        .gold-shimmer {
          background-size: 200% 100%;
          animation: shimmerMove 5s linear infinite;
        }

        @keyframes shimmerMove {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: translateY(0px); }
          50% { opacity: 1; transform: translateY(6px); }
        }

        .scroll-pulse {
          animation: scrollPulse 2.4s ease-in-out infinite;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative min-h-[100svh] overflow-hidden bg-[#fff9f7]"
        aria-label="Wedding Hero"
      >
        {/* FULLSCREEN VISUAL */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            scale: bgScale,
            y: bgY,
          }}
        >
          <img
            src="/images/doodle-couple.png"
            alt="Stebin and Jesna"
            className="h-full w-full object-cover object-center"
          />

          {/* Light rays behind couple */}
          <div className="absolute inset-0">
            <div
              className="absolute left-1/2 top-[38%] h-[90vh] w-[90vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,243,227,0.38) 0%, rgba(255,243,227,0.18) 25%, rgba(247,198,217,0.08) 48%, transparent 70%)",
                filter: "blur(18px)",
              }}
            />
            <div
              className="absolute left-1/2 top-[40%] h-[110vh] w-[110vh] -translate-x-1/2 -translate-y-1/2"
              style={{
                background:
                  "conic-gradient(from 220deg at 50% 50%, transparent 0deg, rgba(255,248,240,0.16) 15deg, transparent 35deg, transparent 60deg, rgba(212,175,127,0.12) 78deg, transparent 95deg, transparent 120deg, rgba(255,248,240,0.14) 136deg, transparent 160deg, transparent 360deg)",
                filter: "blur(12px)",
                opacity: 0.65,
              }}
            />
          </div>

          {/* Romantic glow particles */}
          {!reduceMotion && (
            <div className="absolute inset-0">
              {glowParticles.map((p) => (
                <GlowParticle key={p.id} {...p} />
              ))}
            </div>
          )}

          {/* Floating rose petals */}
          {!reduceMotion && (
            <div className="absolute inset-0 overflow-hidden">
              {petals.map((petal) => (
                <RosePetal key={petal.id} {...petal} />
              ))}
            </div>
          )}

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/28 to-white/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fff9f7]/10 via-transparent to-[#fff9f7]/08" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.05),transparent_38%)]" />

          {/* Fade bottom for text */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0) 52%, rgba(0,0,0,0.42) 72%, rgba(0,0,0,0.72) 100%)",
            }}
          />
        </motion.div>

        {/* CORNER ORNAMENTS */}
        <div className="pointer-events-none absolute inset-0 z-[12]">
          <CornerOrnament className="absolute left-5 top-5 h-12 w-12 sm:left-8 sm:top-8 sm:h-16 sm:w-16" />
          <CornerOrnament className="absolute right-5 top-5 h-12 w-12 scale-x-[-1] sm:right-8 sm:top-8 sm:h-16 sm:w-16" />
        </div>

        {/* MUSIC */}
        <motion.button
          onClick={onToggleMusic}
          className="group absolute right-5 top-5 z-30 flex items-center gap-2 sm:right-8 sm:top-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.85 }}
          whileHover={reduceMotion ? undefined : { scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          aria-label={isMuted ? t.musicOff : t.musicOn}
        >
          <span
            className="font-cormorant text-xs uppercase tracking-[0.32em]"
            style={{ color: "rgba(255,245,235,0.84)" }}
          >
            {isMuted ? t.musicOff : t.musicOn}
          </span>
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full border"
            style={{
              borderColor: "rgba(255,245,235,0.30)",
              color: "rgba(255,245,235,0.92)",
              background: "rgba(255,255,255,0.16)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 10px 28px rgba(212,175,127,0.12)",
            }}
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </span>
        </motion.button>

        {/* TEXT OVER IMAGE AT BOTTOM */}
        <motion.div
          className="absolute bottom-24 left-1/2 z-20 w-full max-w-4xl -translate-x-1/2 px-6 text-center sm:px-8"
          style={{
            y: textY,
            opacity: textOpacity,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.05, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 flex flex-col items-center gap-3"
          >
            <p
              className="font-cormorant uppercase"
              style={{
                color: "rgba(255,245,235,0.84)",
                fontSize: "clamp(8px, 1.7vw, 11px)",
                letterSpacing: "0.34em",
              }}
            >
              {t.prelude}
            </p>

            <motion.div
              initial={{ opacity: 0, scaleX: 0.2, filter: "blur(6px)" }}
              animate={{ opacity: 1, scaleX: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="origin-center"
            >
              <OrnamentLine className="w-40 sm:w-56" />
            </motion.div>
          </motion.div>

          <div className="relative flex flex-col items-center">
            <div className="overflow-hidden">
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 56,
                  scale: 1.03,
                  clipPath: "inset(100% 0 0 0)",
                  filter: "blur(16px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  clipPath: "inset(0% 0 0 0)",
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 1.45,
                  delay: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="hero-name hero-name-gradient hero-name-shadow gold-shimmer text-center"
                style={{ fontSize: "clamp(58px, 10.5vw, 128px)" }}
              >
                {t.names[0]}
              </motion.h1>
            </div>

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
                scale: 0.88,
                rotate: -4,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.95,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="my-[-6px] flex items-center gap-4 sm:my-[-10px]"
            >
              <motion.div
                initial={{ opacity: 0, scaleX: 0.2 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.95, delay: 0.54 }}
                className="origin-right"
                style={{
                  width: "clamp(24px, 6vw, 48px)",
                  height: "0.5px",
                  background: "rgba(255,235,210,0.44)",
                }}
              />
              <span
                className="font-script"
                style={{
                  color: "rgba(240,213,176,0.96)",
                  fontSize: "clamp(38px, 6vw, 60px)",
                  lineHeight: 1,
                  textShadow: "0 0 16px rgba(212,175,127,0.22)",
                }}
              >
                {t.ampersand}
              </span>
              <motion.div
                initial={{ opacity: 0, scaleX: 0.2 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.95, delay: 0.54 }}
                className="origin-left"
                style={{
                  width: "clamp(24px, 6vw, 48px)",
                  height: "0.5px",
                  background: "rgba(255,235,210,0.44)",
                }}
              />
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 56,
                  scale: 1.03,
                  clipPath: "inset(100% 0 0 0)",
                  filter: "blur(16px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  clipPath: "inset(0% 0 0 0)",
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 1.45,
                  delay: 0.72,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="hero-name hero-name-gradient hero-name-shadow gold-shimmer text-center"
                style={{ fontSize: "clamp(58px, 10.5vw, 128px)" }}
              >
                {t.names[1]}
              </motion.h1>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.2, filter: "blur(6px)" }}
            animate={{ opacity: 1, scaleX: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.92, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 origin-center sm:mt-10"
          >
            <OrnamentLine className="w-40 sm:w-60" />
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 22,
              scale: 0.985,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.12,
              delay: 1.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-7 px-2 text-center sm:mt-9"
          >
            <p
              className="font-cormorant hero-quote-shadow italic"
              style={{
                color: "rgba(255,248,242,0.94)",
                fontSize: "clamp(16px, 2.4vw, 24px)",
                lineHeight: 1.55,
              }}
            >
              {t.quote}
            </p>
            <p
              className="font-inter mt-3 uppercase"
              style={{
                color: "rgba(255,240,225,0.76)",
                fontSize: "clamp(10px, 1.4vw, 12px)",
                letterSpacing: "0.18em",
              }}
            >
              {t.subline}
            </p>
          </motion.div>
        </motion.div>

        {/* SCROLL */}
        <motion.div
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.15, duration: 1 }}
        >
          <span
            className="font-cormorant uppercase tracking-[0.38em]"
            style={{ color: "rgba(255,240,225,0.58)", fontSize: "8px" }}
          >
            {t.scroll}
          </span>
          <div className={reduceMotion ? "" : "scroll-pulse"}>
            <ChevronDown size={14} style={{ color: "rgba(255,240,225,0.66)" }} />
          </div>
        </motion.div>
      </section>
    </>
  );
}