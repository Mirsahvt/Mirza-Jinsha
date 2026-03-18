"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useMemo, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"

interface HeroProps {
  language: "ES" | "EN"
}

function FloatingPetals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${(i * 7.9) % 100}%`,
        duration: 12 + (i % 5) * 1.4,
        delay: i * 0.45,
        drift: i % 2 === 0 ? 26 : -24,
        rotate: i % 2 === 0 ? 280 : -280,
        size: i % 3 === 0 ? "w-3 h-3" : "w-2.5 h-2.5",
      })),
    []
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute top-[-8%]"
          style={{ left: petal.left }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, petal.drift],
            rotate: [0, petal.rotate],
            opacity: [0, 0.5, 0.5, 0],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          <div className={`${petal.size} rounded-full bg-gradient-to-br from-champagne/70 via-sage/40 to-olive/25`} />
        </motion.div>
      ))}
    </div>
  )
}

function SparkleParticles() {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: `${(i * 11.7) % 100}%`,
        top: `${(i * 16.1) % 100}%`,
        duration: 2 + (i % 4) * 0.45,
        delay: i * 0.22,
      })),
    []
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute w-1 h-1 rounded-full bg-champagne/60"
          style={{ left: sparkle.left, top: sparkle.top }}
          animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export function Hero({ language }: HeroProps) {
  const [isMuted, setIsMuted] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18])
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])
  const bgBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"])

  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35])

  const nameFloatY = useTransform(scrollYProgress, [0, 1], [0, -18])
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -10])

  const content = {
    EN: {
      subtitle: "We are getting married",
      scroll: "Scroll to explore",
    },
    ES: {
      subtitle: "Nos casamos",
      scroll: "Desplázate para explorar",
    },
  }

  const { subtitle, scroll } = content[language]

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#ece7d8]"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        style={{
          scale: bgScale,
          y: bgY,
          filter: bgBlur,
        }}
      >
        <Image
          src="/images/wedding-hero.JPG"
          alt="Wedding ceremony backdrop"
          fill
          className="object-cover object-center"
          priority
        />

        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-[#f5f0e6]/40 via-[#f5f0e6]/12 to-[#ece7d8]/72"
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#24311f]/18 via-transparent to-[#24311f]/12" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(36,49,31,0.12)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-[#ece7d8]/55 to-[#ece7d8]" />
      </motion.div>

      <FloatingPetals />
      <SparkleParticles />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-champagne/10 to-transparent" />

      {/* Music button */}
      <motion.button
        className="absolute top-24 right-4 z-20 w-11 h-11 rounded-full border border-white/35 bg-white/25 backdrop-blur-xl shadow-[0_10px_30px_rgba(36,49,31,0.14)] flex items-center justify-center"
        onClick={() => setIsMuted(!isMuted)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-[#24311f]/85" />
        ) : (
          <Volume2 className="w-4 h-4 text-[#24311f]/85" />
        )}
      </motion.button>

      {/* Content bottom aligned */}
      <motion.div
        className="relative z-10 w-full px-4 max-w-5xl mx-auto min-h-screen flex flex-col justify-end pb-24 md:pb-28"
        style={{
          y: contentY,
          opacity: contentOpacity,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-champagne to-transparent" />
            <div className="w-3 h-3 rotate-45 border border-champagne bg-white/60 shadow-sm" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-champagne to-transparent" />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl mb-4 text-[#24311f]"
            style={{
              fontFamily: "var(--font-script), cursive",
              fontWeight: 400,
              letterSpacing: "0.01em",
              textShadow: "0 2px 10px rgba(255,255,255,0.18)",
              y: nameFloatY,
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="inline-block"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              Mirza
            </motion.span>{" "}
            <motion.span
              className="inline-block text-[#c8b27d] drop-shadow-[0_2px_10px_rgba(200,178,125,0.35)] mx-3"
              animate={{ scale: [1, 1.06, 1], rotate: [0, 2, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            >
              &
            </motion.span>{" "}
            <motion.span
              className="inline-block"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, delay: 0.35, repeat: Infinity, ease: "easeInOut" }}
            >
              Jinsha
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-[#24311f]/78 uppercase"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 600,
              letterSpacing: "0.22em",
              y: subtitleY,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="flex flex-col items-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span
            className="text-[#24311f]/50 text-[11px] uppercase"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 600,
              letterSpacing: "0.24em",
            }}
          >
            {scroll}
          </span>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-6 h-10 mt-2 rounded-full border border-[#24311f]/30 bg-white/10 backdrop-blur-sm flex items-start justify-center p-2">
              <motion.div
                className="w-1 h-2 bg-olive rounded-full"
                animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}