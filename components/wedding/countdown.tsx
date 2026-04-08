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
    <div className="relative flex h-[60px] items-center justify-center overflow-hidden md:h-[80px]">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          className="text-4xl font-semibold tabular-nums text-[#2b211d] md:text-6xl"
          style={{
            fontFamily: '"Playfair Display", serif',
            textShadow:
              "0 1px 0 rgba(255,255,255,0.8), 0 6px 18px rgba(0,0,0,0.15)",
          }}
          initial={changed ? { y: -40, opacity: 0 } : false}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.35 }}
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

  const tickRef = useRef<HTMLAudioElement | null>(null)
  const prevTimeRef = useRef<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const hasInitializedRef = useRef(false)

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const content = {
    EN: {
      title: "Countdown",
      subtitle: "To the most beautiful day of our lives",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
    },
    ES: {
      title: "Cuenta Regresiva",
      subtitle: "Para el día más hermoso de nuestras vidas",
      days: "Días",
      hours: "Horas",
      minutes: "Minutos",
      seconds: "Segundos",
    },
  }

  const { title, subtitle, days, hours, minutes, seconds } = content[language]

  useEffect(() => {
    const weddingDate = new Date("2026-05-11T00:00:00").getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = weddingDate - now

      if (difference <= 0) {
        const zeroTime = { days: 0, hours: 0, minutes: 0, seconds: 0 }
        prevTimeRef.current = timeLeft
        setTimeLeft(zeroTime)

        if (tickRef.current) {
          tickRef.current.pause()
          tickRef.current.currentTime = 0
        }
        return
      }

      const newTime = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      }

      const previous = prevTimeRef.current

      setTimeLeft(newTime)
      prevTimeRef.current = newTime

      // Don't tick on first initialization
      if (!hasInitializedRef.current) {
        hasInitializedRef.current = true
        return
      }

      // Only play when section is visible AND second actually changed
      if (isInView && newTime.seconds !== previous.seconds && tickRef.current) {
        tickRef.current.pause()
        tickRef.current.currentTime = 0
        tickRef.current.play().catch(() => {})
      }
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)

    return () => clearInterval(timer)
  }, [isInView, timeLeft])

  // Immediately stop any playing sound when section leaves view
  useEffect(() => {
    if (!isInView && tickRef.current) {
      tickRef.current.pause()
      tickRef.current.currentTime = 0
    }
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
      className="relative overflow-hidden py-24"
    >
      <audio ref={tickRef} src="/freesound_community-ticking-clock_1-27477.mp3" preload="auto" />

      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/images/rose.jpg"
          alt="Floral background"
          className="h-full w-full scale-[1.1] object-cover object-center"
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.70) 10%, rgba(255,255,255,0.30) 22%, rgba(255,255,255,0.08) 40%, transparent 60%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,248,245,0.30) 0%, rgba(255,248,245,0.10) 40%, transparent 70%)",
        }}
      />

      <div
        className="absolute inset-x-0 bottom-0 h-[40%]"
        style={{
          background:
            "linear-gradient(to top, rgba(247,219,227,0.65) 0%, rgba(247,219,227,0.30) 25%, rgba(255,255,255,0.05) 60%, transparent 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-pink-200/20 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="mb-3 text-5xl text-[#4a342c]"
            style={{ fontFamily: "var(--font-script), cursive" }}
          >
            {title}
          </h2>

          <p className="text-lg text-[#6a574d]">{subtitle}</p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className="rounded-[28px] border border-white/60 p-8 text-center"
                style={{
                  backdropFilter: "blur(18px)",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.15) 100%)",
                  boxShadow:
                    "0 20px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)",
                }}
              >
                <AnimatedNumber value={unit.value} prevValue={unit.prev} />
                <span className="mt-2 block text-sm uppercase tracking-[0.28em] text-[#6b5a50]">
                  {unit.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}