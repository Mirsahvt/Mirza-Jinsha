"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"

interface DateRevealProps {
  language: "ES" | "EN"
}

interface ScratchTileProps {
  value: string
  delay?: number
  onReveal?: () => void
}

function ScratchTile({ value, delay = 0, onReveal }: ScratchTileProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [revealed, setRevealed] = useState(false)
  const [isScratching, setIsScratching] = useState(false)
  const [burst, setBurst] = useState(false)

  const powderBits = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: `${(i * 17) % 100}%`,
        top: `${(i * 13) % 100}%`,
        x: (Math.random() - 0.5) * 48,
        y: (Math.random() - 0.5) * 34,
        delay: i * 0.015,
      })),
    []
  )

  const sparkles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${(i * 19) % 100}%`,
        top: `${(i * 11) % 100}%`,
        x: i % 2 === 0 ? 24 : -24,
        y: -14 - (i % 4) * 5,
        delay: i * 0.03,
      })),
    []
  )

  useEffect(() => {
    audioRef.current = new Audio("/freesound_community-morris-head-scratch-103330.mp3")
    audioRef.current.volume = 0.3
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
      gradient.addColorStop(0, "#fafafa")
      gradient.addColorStop(0.15, "#d9d9d9")
      gradient.addColorStop(0.34, "#f2f2f2")
      gradient.addColorStop(0.56, "#bdbdbd")
      gradient.addColorStop(0.78, "#ececec")
      gradient.addColorStop(1, "#cfcfcf")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      const sheen = ctx.createLinearGradient(0, 0, width, height)
      sheen.addColorStop(0, "rgba(255,255,255,0.32)")
      sheen.addColorStop(0.2, "rgba(255,255,255,0.08)")
      sheen.addColorStop(0.5, "rgba(255,255,255,0)")
      sheen.addColorStop(0.82, "rgba(255,255,255,0.18)")
      sheen.addColorStop(1, "rgba(255,255,255,0.04)")
      ctx.fillStyle = sheen
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < 10; i++) {
        const y = (height / 10) * i
        ctx.strokeStyle =
          i % 2 === 0 ? "rgba(255,255,255,0.16)" : "rgba(90,90,90,0.08)"
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.bezierCurveTo(width * 0.25, y + 4, width * 0.7, y - 5, width, y + 3)
        ctx.stroke()
      }

      for (let i = 0; i < 50; i++) {
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.14})`
        ctx.beginPath()
        ctx.arc(
          Math.random() * width,
          Math.random() * height,
          Math.random() * 1.1 + 0.3,
          0,
          Math.PI * 2
        )
        ctx.fill()
      }

      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillStyle = "rgba(72,72,72,0.92)"
      ctx.font = '700 13px "Cormorant Garamond", Georgia, serif'
      ctx.fillText("Scratch", width / 2, height / 2)

      ctx.globalCompositeOperation = "destination-out"
    }

    setupCanvas()

    let drawing = false
    let lastSoundTime = 0

    const playScratchSound = () => {
      const now = Date.now()
      if (!audioRef.current || now - lastSoundTime < 110) return
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
      ctx.arc(x, y, radius * 0.58, 0, Math.PI * 2)
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

      if (percent > 0.28 && !revealed) {
        setRevealed(true)
        setBurst(true)
        onReveal?.()

        if (typeof navigator !== "undefined" && "vibrate" in navigator) {
          navigator.vibrate([14, 28, 14])
        }

        if (audioRef.current) {
          audioRef.current.currentTime = 0
          audioRef.current.play().catch(() => {})
        }

        setTimeout(() => setBurst(false), 1000)
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
    }

    const handleMove = (event: MouseEvent | TouchEvent) => {
      if (!drawing || revealed) return
      const point = getPoint(event)
      if (!point) return
      scratch(point.x, point.y)
      playScratchSound()
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

    const resizeObserver = new ResizeObserver(() => setupCanvas())
    resizeObserver.observe(wrapper)

    return () => {
      canvas.removeEventListener("mousedown", handleStart as EventListener)
      canvas.removeEventListener("mousemove", handleMove as EventListener)
      window.removeEventListener("mouseup", handleEnd)

      canvas.removeEventListener("touchstart", handleStart as EventListener)
      canvas.removeEventListener("touchmove", handleMove as EventListener)
      window.removeEventListener("touchend", handleEnd)

      resizeObserver.disconnect()
    }
  }, [revealed, onReveal])

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 28, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={wrapperRef}
        className="relative h-[92px] w-[92px] overflow-hidden rounded-[1.4rem] border border-white/70 bg-gradient-to-br from-[#fff8f5] via-[#fdeaf1] to-[#f7c6d9] shadow-[0_18px_55px_rgba(183,110,121,0.18)] backdrop-blur-xl sm:h-[110px] sm:w-[110px] md:h-[120px] md:w-[120px]"
      >
        <div className="absolute inset-0 rounded-[1.4rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.42),transparent_42%)]" />
        <div className="absolute inset-0 rounded-[1.4rem] border border-[#f5dfe5]/80" />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="font-serif text-[26px] font-bold tracking-[0.08em] text-[#111111] sm:text-[30px] md:text-[34px]"
            style={{
              fontFamily: '"Playfair Display", "Cormorant Garamond", serif',
              textShadow: revealed
                ? `
                  0 1px 0 rgba(255,255,255,0.85),
                  0 2px 0 rgba(255,255,255,0.45),
                  0 8px 18px rgba(0,0,0,0.10)
                `
                : "none",
            }}
            animate={
              revealed
                ? {
                    scale: [1, 1.08, 1],
                    filter: [
                      "drop-shadow(0 0 0 rgba(0,0,0,0))",
                      "drop-shadow(0 0 10px rgba(255,255,255,0.18))",
                      "drop-shadow(0 0 0 rgba(0,0,0,0))",
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
              className="absolute inset-0 h-full w-full rounded-[1.4rem] touch-none"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.04, filter: "blur(2px)" }}
              transition={{ duration: 0.45 }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {revealed &&
            sparkles.map((spark) => (
              <motion.div
                key={spark.id}
                className="absolute"
                style={{ left: spark.left, top: spark.top }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.25, 0],
                  x: [0, spark.x],
                  y: [0, spark.y],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.95, delay: spark.delay }}
              >
                <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
              </motion.div>
            ))}
        </AnimatePresence>

        <AnimatePresence>
          {isScratching &&
            !revealed &&
            powderBits.map((bit) => (
              <motion.div
                key={bit.id}
                className="absolute h-1 w-1 rounded-full bg-white/80"
                style={{ left: bit.left, top: bit.top }}
                initial={{ opacity: 0.9, x: 0, y: 0, scale: 1 }}
                animate={{
                  opacity: 0,
                  x: bit.x,
                  y: bit.y,
                  scale: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: bit.delay }}
              />
            ))}
        </AnimatePresence>

        <AnimatePresence>
          {burst &&
            Array.from({ length: 18 }).map((_, i) => {
              const x = (Math.random() - 0.5) * 130
              const y = (Math.random() - 0.5) * 110
              return (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full"
                  style={{
                    background:
                      i % 3 === 0 ? "#ffffff" : i % 3 === 1 ? "#d1d1d1" : "#f7c6d9",
                  }}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  animate={{
                    opacity: 0,
                    x,
                    y,
                    scale: 0,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                />
              )
            })}
        </AnimatePresence>

        <AnimatePresence>
          {isScratching && !revealed && (
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-[1.4rem] border border-white/45"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export function DateReveal({ language }: DateRevealProps) {
  const [revealedCount, setRevealedCount] = useState(0)

  const content = {
    EN: {
      title: "Save the Date",
      subtitle: "Gently scratch each tile to reveal our special day",
      day: "11",
      month: "05",
      year: "2026",
      note: "Please note the date and kindly grace the events with your presence.",
    },
    ES: {
      title: "Reserva la Fecha",
      subtitle: "Raspa suavemente cada bloque para revelar nuestro día especial",
      day: "11",
      month: "05",
      year: "2026",
      note: "Please note the date and kindly grace the events with your presence.",
    },
  }

  const { title, subtitle, day, month, year, note } = content[language]

  const handleReveal = () => {
    setRevealedCount((prev) => Math.min(prev + 1, 3))
  }

  return (
    <section
      className="relative overflow-hidden py-24"
      style={{
        background: `linear-gradient(
          to bottom,
          #151111 0%,
          #241b1e 10%,
          #38292e 18%,
          #523942 28%,
          #7c5a64 42%,
          #b98294 58%,
          #e7bcc9 76%,
          #fff4f7 100%
        )`,
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-black/20 via-black/8 to-transparent" />
        <div className="absolute left-[10%] top-20 h-80 w-80 rounded-full bg-[#ffdbe6]/22 blur-[120px]" />
        <div className="absolute right-[10%] bottom-16 h-96 w-96 rounded-full bg-[#f7c6d9]/28 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/16 blur-[140px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="h-px w-14 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
            <div className="h-2.5 w-2.5 rotate-45 border border-white/70 bg-white/40" />
            <div className="h-px w-14 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
          </div>

          <h2
            className="mb-3 text-4xl text-white md:text-5xl"
            style={{
              fontFamily: 'var(--font-script), cursive',
              textShadow: `
                0 1px 0 rgba(255,255,255,0.22),
                0 3px 12px rgba(0,0,0,0.20)
              `,
            }}
          >
            {title}
          </h2>

          <p
            className="mx-auto max-w-xl text-sm leading-relaxed text-white/85 md:text-base"
            style={{
              textShadow: "0 1px 0 rgba(0,0,0,0.18)",
            }}
          >
            {subtitle}
          </p>
        </motion.div>

        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[2.2rem] border border-white/55 bg-gradient-to-br from-[#fff8f5]/88 via-[#fdeaf1]/88 to-[#f7c6d9]/72 px-6 py-10 shadow-[0_28px_80px_rgba(183,110,121,0.20)] backdrop-blur-2xl md:px-10 md:py-12">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.20),rgba(255,255,255,0.02)_36%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.28),transparent_38%)]" />

            <div className="absolute left-4 top-4 h-8 w-8 rounded-tl-xl border-l border-t border-white/60" />
            <div className="absolute right-4 top-4 h-8 w-8 rounded-tr-xl border-r border-t border-white/60" />
            <div className="absolute bottom-4 left-4 h-8 w-8 rounded-bl-xl border-b border-l border-white/60" />
            <div className="absolute bottom-4 right-4 h-8 w-8 rounded-br-xl border-b border-r border-white/60" />

            <div className="relative flex flex-row items-center justify-center gap-3 sm:gap-5 md:gap-7">
              <ScratchTile value={day} delay={0} onReveal={handleReveal} />
              <ScratchTile value={month} delay={0.1} onReveal={handleReveal} />
              <ScratchTile value={year} delay={0.2} onReveal={handleReveal} />
            </div>

            <AnimatePresence>
              {revealedCount === 3 && (
                <motion.div
                  className="mx-auto mt-10 max-w-2xl px-4 text-center"
                  initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <p
                    className="text-[#4a3a34]"
                    style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: "clamp(20px, 2.2vw, 28px)",
                      fontStyle: "italic",
                      fontWeight: 500,
                      lineHeight: 1.5,
                      textShadow: `
                        0 1px 0 rgba(255,255,255,0.9),
                        0 2px 0 rgba(255,255,255,0.55),
                        0 8px 18px rgba(121, 88, 71, 0.18)
                      `,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {note}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}