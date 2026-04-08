"use client"

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion"
import Image from "next/image"
import { useRef } from "react"

interface PhotoGalleryProps {
  language: "ES" | "EN"
}

function vibrateSoft(pattern: number | number[] = [10, 25, 10]) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(pattern)
  }
}

export function PhotoGallery({ language }: PhotoGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const groomVibratedRef = useRef(false)
  const brideVibratedRef = useRef(false)
  const coupleVibratedRef = useRef(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const content = {
    EN: {
      title: "Meet the Couple",
      groomLabel: "The Groom",
      brideLabel: "The Bride",
      coupleLabel: "United in Christ",
      groomName: "Stebin",
      brideName: "Jesna Jose",
      coupleName: "Stebin & Jesna",
      quote:
        '"Therefore what God has joined together, let no one separate." — Mark 10:9',
    },
    ES: {
      title: "Conoce a la Pareja",
      groomLabel: "El Novio",
      brideLabel: "La Novia",
      coupleLabel: "Unidos en Cristo",
      groomName: "Stebin",
      brideName: "Jesna Jose",
      coupleName: "Stebin & Jesna",
      quote:
        '"Therefore what God has joined together, let no one separate." — Mark 10:9',
    },
  }

  const {
    title,
    groomLabel,
    brideLabel,
    coupleLabel,
    groomName,
    brideName,
    coupleName,
    quote,
  } = content[language]

  // Groom: enters from left
  const groomOpacity = useTransform(
    scrollYProgress,
    [0.03, 0.10, 0.28, 0.38],
    [0, 1, 1, 0]
  )
  const groomScale = useTransform(
    scrollYProgress,
    [0.03, 0.12, 0.38],
    [0.92, 1, 1.03]
  )
  const groomX = useTransform(
    scrollYProgress,
    [0.03, 0.12, 0.38],
    [-140, 0, 18]
  )
  const groomBlur = useTransform(
    scrollYProgress,
    [0.03, 0.12, 0.38],
    [16, 0, 10]
  )

  // Bride: enters from right
  const brideOpacity = useTransform(
    scrollYProgress,
    [0.34, 0.44, 0.60, 0.72],
    [0, 1, 1, 0]
  )
  const brideScale = useTransform(
    scrollYProgress,
    [0.34, 0.46, 0.72],
    [0.92, 1, 1.03]
  )
  const brideX = useTransform(
    scrollYProgress,
    [0.34, 0.46, 0.72],
    [140, 0, -18]
  )
  const brideBlur = useTransform(
    scrollYProgress,
    [0.34, 0.46, 0.72],
    [16, 0, 10]
  )

  // Couple: fades from center with luxury feel
  const coupleOpacity = useTransform(
    scrollYProgress,
    [0.68, 0.80, 1],
    [0, 1, 1]
  )
  const coupleScale = useTransform(
    scrollYProgress,
    [0.68, 0.82, 1],
    [0.88, 1, 1.02]
  )
  const coupleY = useTransform(
    scrollYProgress,
    [0.68, 0.82, 1],
    [28, 0, 0]
  )
  const coupleBlur = useTransform(
    scrollYProgress,
    [0.68, 0.82, 1],
    [18, 0, 0]
  )

  const quoteOpacity = useTransform(scrollYProgress, [0.84, 0.92, 1], [0, 1, 1])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.08 && !groomVibratedRef.current) {
      vibrateSoft([10, 20, 10])
      groomVibratedRef.current = true
    }
    if (latest > 0.42 && !brideVibratedRef.current) {
      vibrateSoft([10, 20, 10])
      brideVibratedRef.current = true
    }
    if (latest > 0.78 && !coupleVibratedRef.current) {
      vibrateSoft([12, 24, 12])
      coupleVibratedRef.current = true
    }

    if (latest < 0.04) groomVibratedRef.current = false
    if (latest < 0.30) brideVibratedRef.current = false
    if (latest < 0.64) coupleVibratedRef.current = false
  })

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative h-[310vh]"
      style={{
        background:
          "linear-gradient(to bottom, #f8dfe6 0%, #f6e7e1 18%, #efe3db 38%, #f6ece6 60%, #f9e8ec 84%, #f7dbe3 100%)",
      }}
    >
      {/* background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#f7dbe3] via-[#f5e6df]/70 to-transparent" />
        <div className="absolute left-[7%] top-20 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute right-[8%] top-1/4 h-80 w-80 rounded-full bg-[#f7c6d9]/14 blur-3xl" />
        <div className="absolute bottom-16 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#f4d2dc]/18 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_38%)]" />
      </div>

      <div className="sticky top-0 h-screen overflow-hidden">
        {/* title sticky on top */}
        <div className="absolute inset-x-0 top-0 z-30">
          <div className="mx-auto flex w-full max-w-6xl justify-center px-4 pt-8 md:pt-10">
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div className="mb-4 flex items-center justify-center gap-3">
                <div className="h-px w-14 bg-gradient-to-r from-transparent via-[#caa78d] to-transparent" />
                <div className="h-2.5 w-2.5 rotate-45 border border-[#d7b89a]/80 bg-white/60 shadow-[0_0_12px_rgba(255,255,255,0.35)]" />
                <div className="h-px w-14 bg-gradient-to-r from-transparent via-[#caa78d] to-transparent" />
              </div>

              <h2
                className="text-3xl text-[#3b2d28] sm:text-4xl md:text-5xl"
                style={{
                  fontFamily: "var(--font-script), cursive",
                  textShadow:
                    "0 1px 0 rgba(255,255,255,0.82), 0 4px 14px rgba(132,102,79,0.10)",
                }}
              >
                {title}
              </h2>
            </motion.div>
          </div>
        </div>

        {/* bigger centered frame */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="relative w-[84vw] max-w-[360px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[560px]">
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/55 shadow-[0_30px_90px_rgba(103,83,67,0.16)]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.16) 100%)",
                WebkitBackdropFilter: "blur(20px) saturate(160%)",
                backdropFilter: "blur(20px) saturate(160%)",
                boxShadow:
                  "0 30px 90px rgba(103,83,67,0.16), inset 0 1px 0 rgba(255,255,255,0.68)",
              }}
            >
              <div className="absolute inset-0 z-[1] bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.03)_42%,transparent_64%)]" />
              <div className="absolute left-6 right-6 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-[#d7b89a]/65 to-transparent" />

              <div className="absolute left-6 top-6 z-[2] h-6 w-6 rounded-tl border-l border-t border-[#d7b89a]/40" />
              <div className="absolute right-6 top-6 z-[2] h-6 w-6 rounded-tr border-r border-t border-[#d7b89a]/40" />
              <div className="absolute bottom-6 left-6 z-[2] h-6 w-6 rounded-bl border-b border-l border-[#d7b89a]/40" />
              <div className="absolute bottom-6 right-6 z-[2] h-6 w-6 rounded-br border-b border-r border-[#d7b89a]/40" />

              {/* groom */}
              <motion.div
                className="absolute inset-0 z-0"
                style={{
                  opacity: groomOpacity,
                  scale: groomScale,
                  x: groomX,
                  filter: useTransform(groomBlur, (v) => `blur(${v}px)`),
                }}
              >
                <Image
                  src="/images/groom.png"
                  alt="Groom portrait"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d201c]/82 via-[#2d201c]/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 z-[2] p-6 text-center md:p-8">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.26em] text-white/75 md:text-[11px]">
                    {groomLabel}
                  </p>
                  <h3
                    className="text-3xl text-white md:text-4xl"
                    style={{ fontFamily: "var(--font-script), cursive" }}
                  >
                    {groomName}
                  </h3>
                  <p className="mt-2 text-sm text-white/80 md:text-[15px]">
                    Xavier & Teresa
                  </p>
                </div>
              </motion.div>

              {/* bride */}
              <motion.div
                className="absolute inset-0 z-0"
                style={{
                  opacity: brideOpacity,
                  scale: brideScale,
                  x: brideX,
                  filter: useTransform(brideBlur, (v) => `blur(${v}px)`),
                }}
              >
                <Image
                  src="/images/bride.png"
                  alt="Bride portrait"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d201c]/82 via-[#2d201c]/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 z-[2] p-6 text-center md:p-8">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.26em] text-white/75 md:text-[11px]">
                    {brideLabel}
                  </p>
                  <h3
                    className="text-3xl text-white md:text-4xl"
                    style={{ fontFamily: "var(--font-script), cursive" }}
                  >
                    {brideName}
                  </h3>
                  <p className="mt-2 text-sm text-white/80 md:text-[15px]">
                    Joseph M.D. & Mary Jose
                  </p>
                </div>
              </motion.div>

              {/* couple */}
              <motion.div
                className="absolute inset-0 z-0"
                style={{
                  opacity: coupleOpacity,
                  scale: coupleScale,
                  y: coupleY,
                  filter: useTransform(coupleBlur, (v) => `blur(${v}px)`),
                }}
              >
                <Image
                  src="/images/couple.png"
                  alt="Couple portrait"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d201c]/84 via-[#2d201c]/16 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 z-[2] p-6 text-center md:p-8">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-white/75 md:text-[11px]">
                    {coupleLabel}
                  </p>
                  <h3
                    className="text-3xl text-white md:text-5xl"
                    style={{ fontFamily: "var(--font-script), cursive" }}
                  >
                    {coupleName}
                  </h3>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* christian quote */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-8 z-20 mx-auto max-w-3xl px-4 md:bottom-10"
          style={{ opacity: quoteOpacity }}
        >
          <div
            className="relative mx-auto max-w-[850px] overflow-hidden rounded-[1.8rem] border border-white/55 px-5 py-5 text-center shadow-[0_20px_60px_rgba(110,87,73,0.10)] backdrop-blur-2xl md:px-10 md:py-6"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.36) 0%, rgba(255,255,255,0.18) 100%)",
              WebkitBackdropFilter: "blur(18px) saturate(160%)",
              backdropFilter: "blur(18px) saturate(160%)",
              boxShadow:
                "0 20px 60px rgba(110,87,73,0.10), inset 0 1px 0 rgba(255,255,255,0.62)",
            }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(255,255,255,0.04)_38%,transparent_64%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d7b89a]/70 to-transparent" />
            <p
              className="relative text-base italic text-[#4d3d37] md:text-[1.25rem]"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                lineHeight: 1.7,
                textShadow: "0 1px 0 rgba(255,255,255,0.45)",
              }}
            >
              {quote}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}