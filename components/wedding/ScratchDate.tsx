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
  const [shimmering, setShimmering] = useState(true)

  const sparkles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${(i * 13.7) % 100}%`,
        top: `${(i * 17.3) % 100}%`,
        delay: i * 0.06,
        x: i % 2 === 0 ? 24 : -24,
        y: -18 - (i % 4) * 6,
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

    const ctx = canvas.getContext("2d")
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

      // metallic gold foil gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, "#f5e7b2")
      gradient.addColorStop(0.18, "#d7bb72")
      gradient.addColorStop(0.36, "#fff2c7")
      gradient.addColorStop(0.52, "#b48d3c")
      gradient.addColorStop(0.72, "#e7cc86")
      gradient.addColorStop(1, "#8f6a22")

      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // foil texture lines
      for (let i = 0; i < 16; i++) {
        const y = (height / 16) * i
        ctx.strokeStyle = i % 2 === 0 ? "rgba(255,255,255,0.12)" : "rgba(90,60,20,0.08)"
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y + 12)
        ctx.stroke()
      }

      // subtle vignette
      const radial = ctx.createRadialGradient(
        width / 2,
        height / 2,
        width * 0.12,
        width / 2,
        height / 2,
        width * 0.75
      )
      radial.addColorStop(0, "rgba(255,255,255,0.10)")
      radial.addColorStop(1, "rgba(0,0,0,0.10)")
      ctx.fillStyle = radial
      ctx.fillRect(0, 0, width, height)

      // instruction text on foil
      ctx.fillStyle = "rgba(70, 52, 18, 0.78)"
      ctx.font = "600 14px var(--font-sans), serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("Gently scratch to reveal", width / 2, height / 2)

      ctx.globalCompositeOperation = "destination-out"
    }

    setupCanvas()

    let drawing = false
    let lastVibrateTime = 0

    const vibrateScratch = () => {
      const now = Date.now()
      if (now - lastVibrateTime > 90 && typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(6)
        lastVibrateTime = now
      }
    }

    const playScratchSound = () => {
      if (!audioRef.current) return
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
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
      const radius = 24

      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()

      // add trail
      ctx.beginPath()
      ctx.arc(x, y, radius * 0.55, 0, Math.PI * 2)
      ctx.fill()
    }

    const checkReveal = () => {
      const width = canvas.width
      const height = canvas.height
      const imageData = ctx.getImageData(0, 0, width, height)
      let transparentPixels = 0

      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] === 0) transparentPixels++
      }

      const percent = transparentPixels / (imageData.data.length / 4)

      if (percent > 0.38 && !revealed) {
        setRevealed(true)
        setShimmering(false)

        if (typeof navigator !== "undefined" && "vibrate" in navigator) {
          navigator.vibrate([18, 40, 18])
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
      playScratchSound()
      const point = getPoint(event)
      scratch(point.x, point.y)
      vibrateScratch()
    }

    const handleMove = (event: MouseEvent | TouchEvent) => {
      if (!drawing || revealed) return
      const point = getPoint(event)
      scratch(point.x, point.y)
      vibrateScratch()
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
    <motion.div
      ref={wrapperRef}
      className="relative w-[290px] sm:w-[330px] mx-auto"
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* glass card underlay */}
      <motion.div
        className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/18 backdrop-blur-2xl shadow-[0_20px_60px_rgba(36,49,31,0.18)] px-6 py-5"
        animate={
          revealed
            ? {
                boxShadow: [
                  "0 20px 60px rgba(36,49,31,0.18)",
                  "0 22px 68px rgba(200,178,125,0.22)",
                  "0 20px 60px rgba(36,49,31,0.18)",
                ],
              }
            : {}
        }
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-champagne/10" />
        <div className="absolute left-5 right-5 top-0 h-px bg-gradient-to-r from-transparent via-champagne/60 to-transparent" />
        <div className="absolute left-5 right-5 bottom-0 h-px bg-gradient-to-r from-transparent via-olive/25 to-transparent" />

        <div className="relative flex items-center justify-center gap-4 min-h-[72px]">
          <div className="h-2 w-2 rounded-full bg-olive shadow-[0_0_10px_rgba(111,123,91,0.45)]" />

          <motion.span
            className="text-[#24311f] font-medium tracking-[0.18em] text-sm md:text-base uppercase text-center"
            initial={{ opacity: 0.7 }}
            animate={
              revealed
                ? {
                    opacity: 1,
                    scale: [1, 1.03, 1],
                    filter: [
                      "drop-shadow(0 0 0 rgba(200,178,125,0))",
                      "drop-shadow(0 0 12px rgba(200,178,125,0.35))",
                      "drop-shadow(0 0 0 rgba(200,178,125,0))",
                    ],
                  }
                : { opacity: 0.65 }
            }
            transition={{ duration: 1.1, ease: "easeInOut" }}
          >
            {text}
          </motion.span>

          <div className="h-2 w-2 rounded-full bg-olive shadow-[0_0_10px_rgba(111,123,91,0.45)]" />
        </div>

        <AnimatePresence>
          {!revealed && (
            <motion.canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full rounded-[2rem] touch-none"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.02, filter: "blur(2px)" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
        </AnimatePresence>

        {/* metallic shimmer over foil before reveal */}
        {!revealed && shimmering && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-r from-transparent via-white/25 to-transparent"
            animate={{ x: ["-120%", "120%"] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1.1,
            }}
          />
        )}

        {/* tiny helper text */}
        {!revealed && (
          <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center">
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#5c5032]/70">
              Reveal Our Date
            </span>
          </div>
        )}
      </motion.div>

      {/* reveal sparkles */}
      <AnimatePresence>
        {revealed && (
          <div className="pointer-events-none absolute inset-0">
            {sparkles.map((sparkle) => (
              <motion.div
                key={sparkle.id}
                className="absolute"
                style={{ left: sparkle.left, top: sparkle.top }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  x: [0, sparkle.x],
                  y: [0, sparkle.y],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.2,
                  delay: sparkle.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-champagne shadow-[0_0_12px_rgba(200,178,125,0.8)]" />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* reveal glow */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            className="pointer-events-none absolute -inset-2 rounded-[2.3rem] bg-gradient-to-r from-transparent via-champagne/15 to-transparent blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.35] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* pressed effect while scratching */}
      <AnimatePresence>
        {isScratching && !revealed && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[2rem] border border-white/35"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}