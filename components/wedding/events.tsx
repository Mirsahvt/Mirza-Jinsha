"use client"

import { motion } from "framer-motion"
import {
  Heart,
  Church,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
} from "lucide-react"
import Image from "next/image"

interface EventsProps {
  language: "ES" | "EN"
}

export function Events({ language }: EventsProps) {
  const content = {
    EN: {
      title: "Wedding Celebrations",
      subtitle:
        "With love, grace, and joy in Christ, we invite you to celebrate these beautiful moments with us.",
      events: [
        {
          icon: Sparkles,
          title: "Betrothal Eve",
          date: "29 April 2026",
          time: "5:30 PM",
          location: "Sacred Heart Church, Angadikadavu",
          venue: "Bride Side Celebration",
          description:
            "A beautiful evening of family prayers, love, and blessings as we begin our sacred celebration together.",
          image: "/images/betrothal-eve.jpg",
        },
        {
          icon: Heart,
          title: "Betrothal",
          date: "30 April 2026",
          time: "11:00 AM · Lunch at 12:00 PM",
          location: "Sacred Heart Church, Angadikadavu",
          venue: "Plackiyil Auditorium, Angadikadavu",
          description:
            "Join us for our betrothal ceremony followed by lunch and a heartfelt gathering with family and friends.",
          image: "/images/betrothal.jpg",
        },
        {
          icon: Church,
          title: "Wedding",
          date: "11 May 2026",
          time: "10:00 AM · Lunch at 12:30 PM",
          location: "St Mary's Church, Mylampully",
          venue: "Galaxy Events Complex, Mylampully",
          description:
            "By the grace of God, we joyfully invite you to witness our wedding ceremony followed by lunch and reception.",
          image: "/images/wedding.jpg",
        },
      ],
      quote:
        '"Therefore what God has joined together, let no one separate." — Mark 10:9',
    },
    ES: {
      title: "Wedding Celebrations",
      subtitle:
        "With love, grace, and joy in Christ, we invite you to celebrate these beautiful moments with us.",
      events: [
        {
          icon: Sparkles,
          title: "Betrothal Eve",
          date: "29 April 2026",
          time: "5:30 PM",
          location: "Sacred Heart Church, Angadikadavu",
          venue: "Bride Side Celebration",
          description:
            "A beautiful evening of family prayers, love, and blessings as we begin our sacred celebration together.",
          image: "/images/betrothal-eve.jpg",
        },
        {
          icon: Heart,
          title: "Betrothal",
          date: "30 April 2026",
          time: "11:00 AM · Lunch at 12:00 PM",
          location: "Sacred Heart Church, Angadikadavu",
          venue: "Plackiyil Auditorium, Angadikadavu",
          description:
            "Join us for our betrothal ceremony followed by lunch and a heartfelt gathering with family and friends.",
          image: "/images/betrothal.jpg",
        },
        {
          icon: Church,
          title: "Wedding",
          date: "11 May 2026",
          time: "10:00 AM · Lunch at 12:30 PM",
          location: "St Mary's Church, Mylampully",
          venue: "Galaxy Events Complex, Mylampully",
          description:
            "By the grace of God, we joyfully invite you to witness our wedding ceremony followed by lunch and reception.",
          image: "/images/wedding.jpg",
        },
      ],
      quote:
        '"Therefore what God has joined together, let no one separate." — Mark 10:9',
    },
  }

  const { title, subtitle, events, quote } = content[language]

  return (
    <section
      id="events"
      className="relative overflow-hidden py-24 md:py-28"
      style={{
        background:
          "linear-gradient(180deg, #f8dce7 0%, #f5d2df 14%, #f0d3dc 28%, #47293a 54%, #2f1926 72%, #f3d8e2 100%)",
      }}
    >
      {/* dreamy blush background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#ffeaf2]/90 via-[#f8dce7]/55 to-transparent" />
        <div className="absolute left-[6%] top-10 h-72 w-72 rounded-full bg-[#ffd7e5]/30 blur-3xl" />
        <div className="absolute right-[8%] top-24 h-72 w-72 rounded-full bg-[#ffc9dc]/22 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7f4a65]/16 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#ffe1eb]/16 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_36%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%,rgba(255,255,255,0.03)_70%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center md:mb-20"
          initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#c790a8] to-transparent" />
            <div className="h-2.5 w-2.5 rotate-45 border border-[#d9aabc]/80 bg-white/70 shadow-[0_0_12px_rgba(255,255,255,0.35)]" />
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#c790a8] to-transparent" />
          </div>

          <h2
            className="mb-4 text-4xl md:text-5xl"
            style={{
              fontFamily: "var(--font-script), cursive",
              color: "#3a2130",
              textShadow:
                "0 1px 0 rgba(255,255,255,0.55), 0 8px 28px rgba(122,70,94,0.14)",
            }}
          >
            {title}
          </h2>

          <p className="mx-auto max-w-2xl text-sm leading-7 md:text-base text-[#5a3949]">
            {subtitle}
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-7xl gap-7 md:grid-cols-3">
          {events.map((event, index) => {
            const Icon = event.icon

            return (
              <motion.div
                key={event.title}
                className="group"
                initial={{
                  opacity: 0,
                  y: 60,
                  scale: 0.96,
                  filter: "blur(10px)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.9,
                  delay: index * 0.14,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.div
                  className="relative min-h-[520px] overflow-hidden rounded-[2.2rem] border border-white/20 bg-white/10 shadow-[0_24px_70px_rgba(24,10,18,0.25)] backdrop-blur-xl"
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(47,25,38,0.12)_0%,rgba(47,25,38,0.32)_28%,rgba(26,10,18,0.88)_100%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_35%,transparent_60%)]" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f4d4e0]/8 via-transparent to-[#311a28]/15" />

                  <motion.div
                    className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-18deg]"
                    initial={{ x: "-140%" }}
                    whileHover={{ x: "390%" }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  />

                  <div className="absolute left-5 top-5 h-8 w-8 rounded-tl-xl border-l border-t border-[#efc6d7]/70" />
                  <div className="absolute right-5 top-5 h-8 w-8 rounded-tr-xl border-r border-t border-[#efc6d7]/70" />
                  <div className="absolute bottom-5 left-5 h-8 w-8 rounded-bl-xl border-b border-l border-[#efc6d7]/70" />
                  <div className="absolute bottom-5 right-5 h-8 w-8 rounded-br-xl border-b border-r border-[#efc6d7]/70" />

                  <div className="relative z-10 flex h-full flex-col p-7 md:p-8">
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, scale: 0.8, y: 12 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.55,
                        delay: 0.12 + index * 0.08,
                      }}
                    >
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/35 bg-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.10)] backdrop-blur-md">
                        <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(135deg,rgba(255,255,255,0.25),transparent_60%)]" />
                        <Icon className="relative h-6 w-6 text-[#532d40]" />
                      </div>
                    </motion.div>

                    <motion.h3
                      className="mb-4 text-[2.2rem] leading-none text-white drop-shadow-[0_6px_20px_rgba(0,0,0,0.25)]"
                      style={{ fontFamily: "var(--font-script), cursive" }}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.65,
                        delay: 0.18 + index * 0.08,
                      }}
                    >
                      {event.title}
                    </motion.h3>

                    <motion.div
                      className="mb-5 space-y-3"
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.65,
                        delay: 0.24 + index * 0.08,
                      }}
                    >
                      <div className="flex items-center gap-2.5 text-sm text-white/92">
                        <Calendar className="h-4 w-4 shrink-0 text-[#efc6d7]" />
                        <span>{event.date}</span>
                      </div>

                      <div className="flex items-center gap-2.5 text-sm text-white/92">
                        <Clock className="h-4 w-4 shrink-0 text-[#efc6d7]" />
                        <span>{event.time}</span>
                      </div>

                      <div className="flex items-start gap-2.5 text-sm text-white/92">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#efc6d7]" />
                        <span>{event.location}</span>
                      </div>

                      <div className="flex items-start gap-2.5 text-sm text-white/92">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#efc6d7]" />
                        <span>{event.venue}</span>
                      </div>
                    </motion.div>

                    <motion.p
                      className="mt-auto text-sm leading-7 text-white/84"
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.7,
                        delay: 0.3 + index * 0.08,
                      }}
                    >
                      {event.description}
                    </motion.p>

                    <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#efc6d7]/60 to-transparent" />
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="mx-auto mt-14 max-w-4xl md:mt-20"
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 px-6 py-7 text-center shadow-[0_24px_70px_rgba(24,10,18,0.18)] backdrop-blur-xl md:px-10">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(255,255,255,0.03)_35%,transparent_65%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#efc6d7]/70 to-transparent" />
            <p
              className="relative text-lg italic text-white/88 md:text-[1.3rem]"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                lineHeight: 1.7,
                textShadow: "0 2px 12px rgba(0,0,0,0.14)",
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