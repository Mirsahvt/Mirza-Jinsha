"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"

interface ScratchDateProps {
  text: string
}

export default function ScratchDate({ text }: ScratchDateProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [revealed, setRevealed] = useState(false)
  const [isScratching, setIsScratching] = useState(false)
  const [showBurst, setShowBurst] = useState(false)

  const petals = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: `${(i * 11.3) % 100}%`,
        delay: i * 0.05,
        size: 8 + (i % 4) * 3,
        x: i % 2 === 0 ? 40 : -40,
        y: -40 - (i % 5) * 12,
      })),
    []
  )

  const confetti = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 380,
        y: (Math.random() - 0.5) * 260,
        delay: i * 0.015,
      })),
    []
  )

  useEffect(() => {
    audioRef.current = new Audio("/audio/scratch-reveal.mp3")
    audioRef.current.volume = 0.35
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

      const foil = ctx.createLinearGradient(0, 0, width, height)
      foil.addColorStop(0, "#fafafa")
      foil.addColorStop(0.18, "#d9d9d9")
      foil.addColorStop(0.36, "#f2f2f2")
      foil.addColorStop(0.58, "#bebebe")
      foil.addColorStop(0.8, "#ededed")
      foil.addColorStop(1, "#c8c8c8")

      ctx.fillStyle = foil
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < 18; i++) {
        const y = (height / 18) * i
        ctx.strokeStyle =
          i % 2 === 0 ? "rgba(255,255,255,0.2)" : "rgba(90,90,90,0.08)"
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.bezierCurveTo(width * 0.25, y + 7, width * 0.75, y - 7, width, y + 5)
        ctx.stroke()
      }

      for (let i = 0; i < 120; i++) {
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.16})`
        ctx.beginPath()
        ctx.arc(
          Math.random() * width,
          Math.random() * height,
          Math.random() * 1.4 + 0.3,
          0,
          Math.PI * 2
        )
        ctx.fill()
      }

      const gloss = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        10,
        width * 0.5,
        height * 0.5,
        width * 0.7
      )
      gloss.addColorStop(0, "rgba(255,255,255,0.18)")
      gloss.addColorStop(1, "rgba(255,255,255,0)")
      ctx.fillStyle = gloss
      ctx.fillRect(0, 0, width, height)

      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      ctx.fillStyle = "rgba(80,62,68,0.92)"
      ctx.font = "700 15px Georgia, serif"
      ctx.fillText("Scratch to Reveal", width / 2, height / 2 + 1)

      ctx.fillStyle = "rgba(255,255,255,0.92)"
      ctx.font = "700 14px Georgia, serif"
      ctx.fillText("Scratch to Reveal", width / 2, height / 2 - 1)

      ctx.globalCompositeOperation = "destination-out"
    }

    setupCanvas()

    let drawing = false

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
      const radius = 26

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

      if (percent > 0.32 && !revealed) {
        setRevealed(true)
        setShowBurst(true)

        if (audioRef.current) {
          audioRef.current.currentTime = 0
          audioRef.current.play().catch(() => {})
        }

        setTimeout(() => setShowBurst(false), 1600)
      }
    }

    const handleStart = (event: MouseEvent | TouchEvent) => {
      if (revealed) return
      drawing = true
      setIsScratching(true)
      const point = getPoint(event)
      if (!point) return
      scratch(point.x, point.y)
    }

    const handleMove = (event: MouseEvent | TouchEvent) => {
      if (!drawing || revealed) return
      const point = getPoint(event)
      if (!point) return
      scratch(point.x, point.y)
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
  }, [revealed])

  return (
    <>
      <style>{`
        @keyframes dateShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <section className="relative overflow-hidden py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-[#161212] via-[#f7dbe3] to-[#fff8f5]" />

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#f7c6d9]"
              style={{
                left: `${(i * 9.7) % 100}%`,
                top: `${(i * 14.3) % 100}%`,
                width: 6 + (i % 4) * 4,
                height: 6 + (i % 4) * 4,
                filter: "blur(1px)",
              }}
              animate={{
                y: [0, -18, 0],
                opacity: [0.15, 0.85, 0.15],
                scale: [1, 1.25, 1],
              }}
              transition={{
                duration: 4 + (i % 5),
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mb-14 text-center">
          <motion.h2
            className="font-serif text-4xl text-[#2e2a2a] md:text-5xl"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            Save The Date
          </motion.h2>
        </div>

        <motion.div
          ref={wrapperRef}
          className="relative mx-auto w-[320px] sm:w-[380px]"
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{
            y: -8,
            scale: 1.02,
            boxShadow: "0 35px 100px rgba(183,110,121,0.38)",
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative overflow-hidden rounded-[28px] border border-[#f2c9d6] bg-gradient-to-br from-[#fff8f5] via-[#fdeaf1] to-[#f7c6d9] px-12 py-12 shadow-[0_30px_80px_rgba(183,110,121,0.35)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_38%)]" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-[#f7c6d9]/15" />

            <motion.div
              className="relative text-center"
              initial={{ opacity: 0.2 }}
              animate={
                revealed
                  ? {
                      opacity: 1,
                      scale: [0.82, 1.08, 1],
                    }
                  : {
                      opacity: 0.35,
                    }
              }
              transition={{ duration: 1 }}
            >
              <div className="mb-3 text-[11px] uppercase tracking-[0.32em] text-[#8d6a56]">
                Wedding Date
              </div>

              <span
                className="text-[36px] font-serif tracking-[0.24em] text-transparent md:text-[44px]"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #b8874a 0%, #fff1c8 30%, #d4af7f 52%, #fff1c8 72%, #b8874a 100%)",
                  backgroundSize: "200% 100%",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  animation: revealed ? "dateShimmer 3s linear infinite" : "none",
                  textShadow: revealed ? "0 0 18px rgba(212,175,127,0.2)" : "none",
                }}
              >
                {text}
              </span>
            </motion.div>

            <AnimatePresence>
              {!revealed && (
                <motion.canvas
                  ref={canvasRef}
                  className="absolute inset-0 h-full w-full rounded-[28px] touch-none"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 1.04, filter: "blur(2px)" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <AnimatePresence>
          {isScratching && !revealed && (
            <div className="pointer-events-none absolute inset-0">
              {petals.map((petal) => (
                <motion.div
                  key={petal.id}
                  className="absolute rounded-full bg-[#f7c6d9]"
                  style={{
                    left: petal.left,
                    top: "58%",
                    width: petal.size,
                    height: petal.size * 0.78,
                    borderRadius: "65% 35% 60% 40% / 50% 45% 55% 50%",
                    boxShadow: "0 8px 18px rgba(219,133,163,0.16)",
                  }}
                  initial={{ x: 0, y: 0, opacity: 0.9, rotate: 0 }}
                  animate={{
                    x: petal.x,
                    y: petal.y,
                    opacity: 0,
                    rotate: 180,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1.4,
                    delay: petal.delay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showBurst && (
            <div className="pointer-events-none absolute inset-0">
              {confetti.map((piece) => (
                <motion.div
                  key={piece.id}
                  className="absolute rounded-full"
                  style={{
                    left: "50%",
                    top: "56%",
                    width: 8,
                    height: 8,
                    background:
                      piece.id % 3 === 0 ? "#f7c6d9" : piece.id % 3 === 1 ? "#d4af7f" : "#fff1d6",
                    boxShadow: "0 0 14px rgba(212,175,127,0.28)",
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: piece.x,
                    y: piece.y,
                    opacity: 0,
                    scale: 0,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1.35,
                    delay: piece.delay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </section>
    </>
  )
}