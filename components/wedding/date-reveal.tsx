"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"

interface DateRevealProps {
  language: "ES" | "EN"
}

interface ScratchCircleProps {
  label: string
  value: string
  delay?: number
}

function ScratchCircle({ label, value, delay = 0 }: ScratchCircleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [revealed, setRevealed] = useState(false)
  const [isScratching, setIsScratching] = useState(false)

  const sparkles = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: `${(i * 23) % 100}%`,
        top: `${(i * 17) % 100}%`,
        x: i % 2 === 0 ? 18 : -18,
        y: -12 - (i % 3) * 6,
        delay: i * 0.04,
      })),
    []
  )

  useEffect(() => {
    audioRef.current = new Audio("/matimassa-fx-scratch-01-379214.mp3")
    audioRef.current.volume = 0.28
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return

    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return

    const setupCanvas = () => {
      const rect = wrapper.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      const width = rect.width
      const height = rect.height

      ctx.clearRect(0, 0, width, height)

      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, "#fff0bf")
      gradient.addColorStop(0.18, "#ddb85e")
      gradient.addColorStop(0.35, "#fff7d2")
      gradient.addColorStop(0.58, "#b8862d")
      gradient.addColorStop(1, "#8a6218")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, Math.PI * 2)
      ctx.fill()

      for (let i = 0; i < 80; i++) {
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.12})`
        ctx.beginPath()
        ctx.arc(
          Math.random() * width,
          Math.random() * height,
          Math.random() * 1.5 + 0.3,
          0,
          Math.PI * 2
        )
        ctx.fill()
      }

      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      ctx.fillStyle = "rgba(78,56,16,0.92)"
      ctx.font = '700 11px Georgia, serif'
      ctx.fillText(label, width / 2, height / 2)

      ctx.globalCompositeOperation = "destination-out"
    }

    setupCanvas()

    let drawing = false
    let lastVibrateTime = 0
    let lastSoundTime = 0

    const vibrateScratch = () => {
      const now = Date.now()
      if (now - lastVibrateTime > 95 && typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(6)
        lastVibrateTime = now
      }
    }

    const playScratchSound = () => {
      const now = Date.now()
      if (!audioRef.current || now - lastSoundTime < 120) return
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
      lastSoundTime = now
    }

    const getPoint = (event: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect()

      if ("touches" in event && event.touches.length > 0) {
        return {
          x: event.touches[0].clientX - rect.left,
          y: event.touches[0].clientY - rect.top,
        }
      }

      const mouseEvent = event as MouseEvent
      return {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top,
      }
    }

    const scratch = (x: number, y: number) => {
      const radius = 18
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.arc(x, y, radius * 0.55, 0, Math.PI * 2)
      ctx.fill()
    }

    const checkReveal = () => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      let transparentPixels = 0

      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] < 20) transparentPixels++
      }

      const totalPixels = imageData.data.length / 4
      const percent = transparentPixels / totalPixels

      if (percent > 0.32 && !revealed) {
        setRevealed(true)

        if (typeof navigator !== "undefined" && "vibrate" in navigator) {
          navigator.vibrate([16, 36, 16])
        }

        if (audioRef.current) {
          audioRef.current.currentTime = 0
          audioRef.current.play().catch(() => {})
        }
      }
    }

    const handleStart = (event: MouseEvent | TouchEvent) => {
      if (revealed) return
      drawing = true
      setIsScratching(true)
      const point = getPoint(event)
      if (!point) return
      scratch(point.x, point.y)
      playScratchSound()
      vibrateScratch()
    }

    const handleMove = (event: MouseEvent | TouchEvent) => {
      if (!drawing || revealed) return
      const point = getPoint(event)
      if (!point) return
      scratch(point.x, point.y)
      playScratchSound()
      vibrateScratch()
      checkReveal()
    }

    const handleEnd = () => {
      drawing = false
      setIsScratching(false)
      checkReveal()
    }

    canvas.addEventListener("mousedown", handleStart as EventListener)
    canvas.addEventListener("mousemove", handleMove as EventListener)
    window.addEventListener("mouseup", handleEnd)

    canvas.addEventListener("touchstart", handleStart as EventListener, { passive: true })
    canvas.addEventListener("touchmove", handleMove as EventListener, { passive: true })
    window.addEventListener("touchend", handleEnd)

    return () => {
      canvas.removeEventListener("mousedown", handleStart as EventListener)
      canvas.removeEventListener("mousemove", handleMove as EventListener)
      window.removeEventListener("mouseup", handleEnd)

      canvas.removeEventListener("touchstart", handleStart as EventListener)
      canvas.removeEventListener("touchmove", handleMove as EventListener)
      window.removeEventListener("touchend", handleEnd)
    }
  }, [label, revealed])

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={wrapperRef}
        className="relative w-[96px] h-[96px] sm:w-[120px] sm:h-[120px] rounded-full border border-white/40 bg-white/20 backdrop-blur-2xl shadow-[0_18px_45px_rgba(36,49,31,0.12)] overflow-hidden"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/25 via-transparent to-champagne/10" />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-[#24311f] text-xl sm:text-2xl font-semibold tracking-[0.12em]"
            style={{ fontFamily: '"Playfair Display", "Cormorant Garamond", serif' }}
            animate={
              revealed
                ? {
                    scale: [1, 1.05, 1],
                    filter: [
                      "drop-shadow(0 0 0 rgba(200,178,125,0))",
                      "drop-shadow(0 0 12px rgba(200,178,125,0.35))",
                      "drop-shadow(0 0 0 rgba(200,178,125,0))",
                    ],
                  }
                : {}
            }
            transition={{ duration: 1 }}
          >
            {value}
          </motion.span>
        </div>

        <AnimatePresence>
          {!revealed && (
            <motion.canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full rounded-full touch-none"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.03, filter: "blur(2px)" }}
              transition={{ duration: 0.45 }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {revealed && (
            <>
              {sparkles.map((spark) => (
                <motion.div
                  key={spark.id}
                  className="absolute"
                  style={{ left: spark.left, top: spark.top }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.3, 0],
                    x: [0, spark.x],
                    y: [0, spark.y],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, delay: spark.delay }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-champagne shadow-[0_0_12px_rgba(200,178,125,0.8)]" />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isScratching && !revealed && (
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-full border border-white/35"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </div>

      <span
        className="mt-3 text-[11px] sm:text-xs uppercase tracking-[0.26em] text-[#6a5a35]/78"
        style={{ fontFamily: '"Cormorant Garamond", serif' }}
      >
        {label}
      </span>
    </motion.div>
  )
}

export function DateReveal({ language }: DateRevealProps) {
  const content = {
    EN: {
      title: "Save the Date",
      subtitle: "Gently scratch each seal to reveal our special day",
      dayLabel: "Day",
      monthLabel: "Month",
      yearLabel: "Year",
      day: "25",
      month: "04",
      year: "2026",
    },
    ES: {
      title: "Reserva la Fecha",
      subtitle: "Raspa suavemente cada sello para revelar nuestro día especial",
      dayLabel: "Día",
      monthLabel: "Mes",
      yearLabel: "Año",
      day: "25",
      month: "04",
      year: "2026",
    },
  }

  const { title, subtitle, dayLabel, monthLabel, yearLabel, day, month, year } =
    content[language]

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-[#f6f1e7] via-[#eee8db] to-[#e7e0d3]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-16 left-[8%] h-72 w-72 rounded-full bg-sage/12 blur-3xl" />
        <div className="absolute bottom-10 right-[8%] h-72 w-72 rounded-full bg-champagne/16 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-olive/8 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="h-px w-14 bg-gradient-to-r from-transparent via-champagne to-transparent" />
            <div className="h-2.5 w-2.5 rotate-45 border border-champagne/70 bg-white/50" />
            <div className="h-px w-14 bg-gradient-to-r from-transparent via-champagne to-transparent" />
          </div>

          <h2
            className="text-4xl md:text-5xl text-[#24311f] mb-3"
            style={{ fontFamily: 'var(--font-script), cursive' }}
          >
            {title}
          </h2>

          <p className="text-[#24311f]/65 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/20 backdrop-blur-2xl px-6 py-10 md:px-10 md:py-12 shadow-[0_22px_55px_rgba(36,49,31,0.10)]">
            <div className="absolute inset-0 bg-gradient-to-b from-white/18 via-transparent to-[#d9c28c]/8" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.02)_36%,transparent_60%)]" />

            <div className="absolute top-4 left-4 h-8 w-8 rounded-tl-xl border-l border-t border-champagne/65" />
            <div className="absolute top-4 right-4 h-8 w-8 rounded-tr-xl border-r border-t border-champagne/65" />
            <div className="absolute bottom-4 left-4 h-8 w-8 rounded-bl-xl border-b border-l border-champagne/65" />
            <div className="absolute bottom-4 right-4 h-8 w-8 rounded-br-xl border-b border-r border-champagne/65" />

            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
              <ScratchCircle label={dayLabel} value={day} delay={0} />
              <ScratchCircle label={monthLabel} value={month} delay={0.12} />
              <ScratchCircle label={yearLabel} value={year} delay={0.24} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}