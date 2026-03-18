"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"

interface CountdownProps {
  language: "ES" | "EN"
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function AnimatedNumber({
  value,
  prevValue,
}: {
  value: number
  prevValue: number
}) {
  const displayValue = String(value).padStart(2, "0")
  const changed = value !== prevValue

  return (
    <div className="relative h-[56px] md:h-[72px] lg:h-[84px] overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          className="block text-4xl md:text-5xl lg:text-6xl font-light text-[#24311f] tabular-nums drop-shadow-[0_1px_6px_rgba(255,255,255,0.18)]"
          initial={changed ? { y: -40, opacity: 0, filter: "blur(4px)" } : false}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: 40, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {displayValue}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export function Countdown({ language }: CountdownProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const isInView = useInView(sectionRef, { amount: 0.35 })

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const prevTimeRef = useRef<TimeLeft>(timeLeft)
  const tickAudioRef = useRef<HTMLAudioElement | null>(null)

  const content = {
    EN: {
      title: "Countdown",
      subtitle: "To the most special day of our lives",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
    },
    ES: {
      title: "Cuenta Regresiva",
      subtitle: "Para el día más especial de nuestras vidas",
      days: "Días",
      hours: "Horas",
      minutes: "Minutos",
      seconds: "Segundos",
    },
  }

  const { title, subtitle, days, hours, minutes, seconds } = content[language]

  useEffect(() => {
    const audio = new Audio("/freesound_community-ticking-clock_1-27477.mp3")
    audio.volume = 0.28
    audio.preload = "auto"
    tickAudioRef.current = audio

    return () => {
      if (tickAudioRef.current) {
        tickAudioRef.current.pause()
        tickAudioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const weddingDate = new Date("2026-04-25T00:00:00").getTime()

    const playTick = () => {
      if (!isInView) return
      const audio = tickAudioRef.current
      if (!audio) return

      try {
        audio.currentTime = 0
        audio.play().catch(() => {})
      } catch {
        // ignore playback issues
      }
    }

    const vibrateTick = () => {
      if (!isInView) return
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(8)
      }
    }

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = weddingDate - now

      if (difference > 0) {
        const newTime = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        }

        setTimeLeft((prev) => {
          prevTimeRef.current = prev

          if (newTime.seconds !== prev.seconds && isInView) {
            vibrateTick()
            playTick()
          }

          return newTime
        })
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [isInView])

  const timeUnits = [
    { value: timeLeft.days, prev: prevTimeRef.current.days, label: days },
    { value: timeLeft.hours, prev: prevTimeRef.current.hours, label: hours },
    { value: timeLeft.minutes, prev: prevTimeRef.current.minutes, label: minutes },
    { value: timeLeft.seconds, prev: prevTimeRef.current.seconds, label: seconds },
  ]

  return (
    <section
      ref={sectionRef}
      id="countdown"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-[#ece7d8] via-[#e7e2d5] to-[#dce4d1]"
    >
      <div className="absolute inset-0 opacity-60 pointer-events-none">
        <div className="absolute top-0 left-[12%] w-72 h-72 bg-sage/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-[10%] w-72 h-72 bg-champagne/25 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-56 h-56 bg-olive/10 rounded-full blur-3xl" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/20 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-light text-[#24311f] mb-4">
            {title}
          </h2>
          <p
            className="text-[#24311f]/70 text-lg"
            style={{ fontFamily: "var(--font-script), cursive" }}
          >
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              className="relative"
              initial={{ opacity: 0, y: 34, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.65,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                className="relative rounded-[2rem] border border-white/35 bg-white/18 backdrop-blur-2xl p-6 md:p-8 text-center overflow-hidden group shadow-[0_18px_50px_rgba(36,49,31,0.12)]"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-champagne/10" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-champagne/10 via-transparent to-olive/12" />
                <div className="absolute left-5 right-5 top-0 h-px bg-gradient-to-r from-transparent via-champagne/60 to-transparent" />

                <div className="relative mb-3">
                  <AnimatedNumber value={unit.value} prevValue={unit.prev} />
                </div>

                <span className="relative text-[11px] md:text-sm uppercase tracking-[0.28em] text-[#24311f]/58 font-medium">
                  {unit.label}
                </span>

                <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-champagne/35 rounded-tl" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-champagne/35 rounded-tr" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-champagne/35 rounded-bl" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-champagne/35 rounded-br" />

                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-olive/30 to-transparent" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}