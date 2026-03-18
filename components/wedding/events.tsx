"use client"

import { motion } from "framer-motion"
import { Heart, Music, PartyPopper, Calendar, Clock, MapPin } from "lucide-react"
import Image from "next/image"

interface EventsProps {
  language: "ES" | "EN"
}

export function Events({ language }: EventsProps) {
  const content = {
    EN: {
      title: "Celebrations",
      subtitle: "Join us for these special moments",
      events: [
        {
          icon: Heart,
          title: "Nikah",
          date: "25 April 2026",
          time: "Morning",
          location: "Bride's Home",
          description:
            "Sacred Nikah ceremony with family prayers and blessings. An intimate gathering to witness our union.",
          image: "/images/nikkah.jpg",
        },
        {
          icon: Music,
          title: "Sangeeth Night",
          date: "25 April 2026",
          time: "Evening",
          location: "Groom's Home",
          description:
            "Family gathering with food, music, muttippattu, and joyful celebration. Let's dance the night away!",
          image: "/images/sangeeth.jpg",
        },
        {
          icon: PartyPopper,
          title: "Wedding Reception",
          date: "26 April 2026",
          time: "Full Day",
          location: "Rainbow Convention Centre",
          description:
            "Grand celebration with couple entry, family festivities, delicious food, activities, and photography.",
          image: "/images/reception.jpg",
        },
      ],
    },
    ES: {
      title: "Celebraciones",
      subtitle: "Únete a nosotros en estos momentos especiales",
      events: [
        {
          icon: Heart,
          title: "Nikah",
          date: "25 Abril 2026",
          time: "Mañana",
          location: "Casa de la Novia",
          description:
            "Sagrada ceremonia de Nikah con oraciones familiares y bendiciones. Una reunión íntima para presenciar nuestra unión.",
          image: "/images/nikkah.jpg",
        },
        {
          icon: Music,
          title: "Noche de Sangeeth",
          date: "25 Abril 2026",
          time: "Noche",
          location: "Casa del Novio",
          description:
            "Reunión familiar con comida, música, muttippattu y celebración alegre. ¡Bailemos toda la noche!",
          image: "/images/sangeeth.jpg",
        },
        {
          icon: PartyPopper,
          title: "Recepción de Boda",
          date: "26 Abril 2026",
          time: "Todo el Día",
          location: "Rainbow Convention Centre",
          description:
            "Gran celebración con entrada de la pareja, festividades familiares, comida deliciosa, actividades y fotografía.",
          image: "/images/reception.jpg",
        },
      ],
    },
  }

  const { title, subtitle, events } = content[language]

  return (
    <section
      id="events"
      className="relative overflow-hidden py-24 bg-gradient-to-b from-[#f5efe4] via-[#ede7d8] to-[#e5e0d2]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-8 left-[8%] h-64 w-64 rounded-full bg-sage/12 blur-3xl" />
        <div className="absolute bottom-8 right-[8%] h-64 w-64 rounded-full bg-champagne/18 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-olive/8 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
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
            style={{ fontFamily: "var(--font-script), cursive" }}
          >
            {title}
          </h2>

          <p className="text-[#24311f]/65 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {events.map((event, index) => {
            const Icon = event.icon

            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 50, scale: 0.97, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group"
              >
                <motion.div
                  className="relative min-h-[440px] h-full overflow-hidden rounded-[2rem] border border-white/35 shadow-[0_20px_50px_rgba(36,49,31,0.10)]"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1f2a1f]/90 via-[#24311f]/52 to-[#24311f]/18" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#d6b773]/10" />
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_30%,transparent_55%)]" />

                  <div className="absolute top-4 left-4 h-8 w-8 rounded-tl-xl border-l border-t border-champagne/75" />
                  <div className="absolute top-4 right-4 h-8 w-8 rounded-tr-xl border-r border-t border-champagne/75" />
                  <div className="absolute bottom-4 left-4 h-8 w-8 rounded-bl-xl border-b border-l border-champagne/75" />
                  <div className="absolute bottom-4 right-4 h-8 w-8 rounded-br-xl border-b border-r border-champagne/75" />

                  <motion.div
                    className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/12 to-transparent skew-x-[-18deg]"
                    initial={{ x: "-140%" }}
                    whileHover={{ x: "380%" }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  />

                  <div className="relative z-10 flex h-full flex-col p-7">
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, scale: 0.85, y: 10 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.12 + index * 0.08 }}
                    >
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/40 bg-white/75 backdrop-blur-md shadow-[0_10px_20px_rgba(0,0,0,0.08)]">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/35 via-transparent to-champagne/10" />
                        <Icon className="relative h-6 w-6 text-[#24311f]" />
                      </div>
                    </motion.div>

                    <motion.h3
                      className="mb-4 text-[2rem] leading-none text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.30)]"
                      style={{ fontFamily: "var(--font-script), cursive" }}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.65, delay: 0.18 + index * 0.08 }}
                    >
                      {event.title}
                    </motion.h3>

                    <motion.div
                      className="space-y-2.5 mb-6"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.65, delay: 0.24 + index * 0.08 }}
                    >
                      <div className="flex items-center gap-2.5 text-white/92 text-sm">
                        <Calendar className="h-4 w-4 text-champagne shrink-0" />
                        <span>{event.date}</span>
                      </div>

                      <div className="flex items-center gap-2.5 text-white/92 text-sm">
                        <Clock className="h-4 w-4 text-champagne shrink-0" />
                        <span>{event.time}</span>
                      </div>

                      <div className="flex items-start gap-2.5 text-white/92 text-sm">
                        <MapPin className="mt-0.5 h-4 w-4 text-champagne shrink-0" />
                        <span>{event.location}</span>
                      </div>
                    </motion.div>

                    <motion.p
                      className="mt-auto text-sm leading-7 text-white/84"
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.3 + index * 0.08 }}
                    >
                      {event.description}
                    </motion.p>

                    <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-champagne/55 to-transparent" />
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}