"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useMemo, useState } from "react"
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
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-ivory via-cream to-sage/10"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/images/wedding-hero.JPG"
          alt="Wedding ceremony backdrop"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#f5f0e6]/82 via-[#f5f0e6]/42 to-[#e8e2d6]/88" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#24311f]/34 via-transparent to-[#24311f]/22" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(36,49,31,0.22)_100%)]" />
      </motion.div>

      <FloatingPetals />
      <SparkleParticles />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-champagne/10 to-transparent" />

      <motion.button
        className="absolute top-24 right-4 z-20 w-11 h-11 rounded-full border border-white/30 bg-white/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(36,49,31,0.16)] flex items-center justify-center"
        onClick={() => setIsMuted(!isMuted)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-forest/85" />
        ) : (
          <Volume2 className="w-4 h-4 text-forest/85" />
        )}
      </motion.button>

      <div className="relative z-10 text-center px-4 py-20 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-champagne to-transparent" />
            <div className="w-3 h-3 rotate-45 border border-champagne bg-white/60 shadow-sm" />
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-champagne to-transparent" />
          </motion.div>

          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl text-[#24311f] mb-5 leading-[1.02] drop-shadow-[0_2px_10px_rgba(255,255,255,0.18)]"
            style={{
              fontFamily: '"Playfair Display", "Cormorant Garamond", serif',
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block">
              <motion.span
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.62, duration: 0.65 }}
              >
                Mirza
              </motion.span>
            </span>

            <motion.span
              className="inline-block mx-4 text-[#c8b27d] drop-shadow-[0_2px_10px_rgba(200,178,125,0.35)]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.82, duration: 0.45, type: "spring" }}
            >
              &
            </motion.span>

            <span className="inline-block">
              <motion.span
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.62, duration: 0.65 }}
              >
                Jinsha
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-[#24311f]/80 mb-10 tracking-[0.28em] uppercase font-medium"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.82, duration: 0.8 }}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <span className="text-[#24311f]/50 text-[11px] tracking-[0.24em] uppercase">
            {scroll}
          </span>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-6 h-10 rounded-full border border-[#24311f]/30 bg-white/10 backdrop-blur-sm flex items-start justify-center p-2">
              <motion.div
                className="w-1 h-2 bg-olive rounded-full"
                animate={{ y: [0, 8, 0], opacity: [1, 0.35, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}