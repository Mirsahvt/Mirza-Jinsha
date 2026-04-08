"use client"

import { motion } from "framer-motion"
import {
  ExternalLink,
  Navigation,
  MapPin,
  Church,
  Sparkles,
} from "lucide-react"
import Image from "next/image"

interface VenueProps {
  language: "ES" | "EN"
}

export function Venue({ language }: VenueProps) {
  const content = {
    EN: {
      title: "Our Venues",
      subtitle:
        "From sacred vows at the altar to joyful gatherings with loved ones, each place holds a beautiful part of our story.",
      openMap: "Map",
      getDirections: "Route",
      venues: [
        {
          label: "Bride Church",
          badge: "Betrothal",
          dateTag: "29 APR",
          name: "Sacred Heart Church",
          subname: "Angadikadavu",
          address: "Angadikadavu",
          city: "Kannur",
          state: "Kerala",
          image: "/images/church-1.jpg",
          map: "https://maps.app.goo.gl/fvZoL5bKsQ6HnH9p7",
          direction:
            "https://www.google.com/maps/dir/?api=1&destination=Sacred+Heart+Church+Angadikadavu",
          icon: Church,
        },
        {
          label: "Bride Hall",
          badge: "Reception",
          dateTag: "30 APR",
          name: "Plackiyil Auditorium",
          subname: "Angadikadavu",
          address: "Angadikadavu",
          city: "Kannur",
          state: "Kerala",
          image: "/images/hall-1.jpg",
          map: "https://maps.app.goo.gl/5kVLsssEBvvGV1UL9",
          direction:
            "https://www.google.com/maps/dir/?api=1&destination=Plackiyil+Auditorium+Angadikadavu",
          icon: Sparkles,
        },
        {
          label: "Groom Church",
          badge: "Wedding",
          dateTag: "11 MAY",
          name: "St Mary's Church",
          subname: "Mylampully",
          address: "Mylampully",
          city: "Palakkad",
          state: "Kerala",
          image: "/images/church-2.png",
          map: "https://share.google/PT8oR5gUdxS7GColV",
          direction:
            "https://www.google.com/maps/dir/?api=1&destination=St+Marys+Church+Mylampully",
          icon: Church,
        },
        {
          label: "Groom Hall",
          badge: "Reception",
          dateTag: "11 MAY",
          name: "Galaxy Events Complex",
          subname: "Mylampully",
          address: "Mylampully",
          city: "Palakkad",
          state: "Kerala",
          image: "/images/hall-2.jpg",
          map: "https://share.google/UnwMEslIuXuQ4P8km",
          direction:
            "https://www.google.com/maps/dir/?api=1&destination=Galaxy+Events+Complex+Mylampully",
          icon: Sparkles,
        },
      ],
    },
    ES: {
      title: "Our Venues",
      subtitle:
        "From sacred vows at the altar to joyful gatherings with loved ones, each place holds a beautiful part of our story.",
      openMap: "Map",
      getDirections: "Route",
      venues: [
        {
          label: "Bride Church",
          badge: "Betrothal",
          dateTag: "29 APR",
          name: "Sacred Heart Church",
          subname: "Angadikadavu",
          address: "Angadikadavu",
          city: "Kannur",
          state: "Kerala",
          image: "/images/church-1.jpg",
          map: "https://maps.app.goo.gl/fvZoL5bKsQ6HnH9p7",
          direction:
            "https://www.google.com/maps/dir/?api=1&destination=Sacred+Heart+Church+Angadikadavu",
          icon: Church,
        },
        {
          label: "Bride Hall",
          badge: "Reception",
          dateTag: "30 APR",
          name: "Plackiyil Auditorium",
          subname: "Angadikadavu",
          address: "Angadikadavu",
          city: "Kannur",
          state: "Kerala",
          image: "/images/hall-1.jpg",
          map: "https://maps.app.goo.gl/5kVLsssEBvvGV1UL9",
          direction:
            "https://www.google.com/maps/dir/?api=1&destination=Plackiyil+Auditorium+Angadikadavu",
          icon: Sparkles,
        },
        {
          label: "Groom Church",
          badge: "Wedding",
          dateTag: "11 MAY",
          name: "St Mary's Church",
          subname: "Mylampully",
          address: "Mylampully",
          city: "Palakkad",
          state: "Kerala",
          image: "/images/church.png",
          map: "https://share.google/PT8oR5gUdxS7GColV",
          direction:
            "https://www.google.com/maps/dir/?api=1&destination=St+Marys+Church+Mylampully",
          icon: Church,
        },
        {
          label: "Groom Hall",
          badge: "Reception",
          dateTag: "11 MAY",
          name: "Galaxy Events Complex",
          subname: "Mylampully",
          address: "Mylampully",
          city: "Palakkad",
          state: "Kerala",
          image: "/images/hall-2.jpg",
          map: "https://share.google/UnwMEslIuXuQ4P8km",
          direction:
            "https://www.google.com/maps/dir/?api=1&destination=Galaxy+Events+Complex+Mylampully",
          icon: Sparkles,
        },
      ],
    },
  }

  const { title, subtitle, openMap, getDirections, venues } = content[language]

  return (
    <section
      id="venue"
      className="relative overflow-hidden py-16 md:py-22"
      style={{
        background:
          "linear-gradient(180deg, #f7dde7 0%, #f4d2de 18%, #f0d6de 34%, #3b2231 62%, #2b1824 82%, #f3d8e2 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#ffeaf2]/85 via-[#f8dbe7]/35 to-transparent" />
        <div className="absolute left-[6%] top-10 h-40 w-40 rounded-full bg-[#ffd8e6]/18 blur-2xl" />
        <div className="absolute right-[8%] top-20 h-40 w-40 rounded-full bg-[#ffc7dd]/14 blur-2xl" />
        <div className="absolute left-1/2 top-1/2 h-[16rem] w-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6c3f58]/10 blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_34%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-3 sm:px-4">
        <motion.div
          className="mx-auto mb-8 max-w-3xl text-center md:mb-12"
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#c996ad] to-transparent" />
            <div className="h-2 w-2 rotate-45 border border-[#ddb4c7]/80 bg-white/75 shadow-[0_0_10px_rgba(255,255,255,0.30)]" />
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#c996ad] to-transparent" />
          </div>

          <h2
            className="mb-3 text-3xl md:text-5xl"
            style={{
              fontFamily: "var(--font-script), cursive",
              color: "#3f2433",
              textShadow:
                "0 1px 0 rgba(255,255,255,0.55), 0 8px 24px rgba(122,70,94,0.10)",
            }}
          >
            {title}
          </h2>

          <p className="mx-auto max-w-2xl text-xs leading-6 text-[#604151] md:text-base md:leading-7">
            {subtitle}
          </p>
        </motion.div>

        {/* mobile also 2 columns */}
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 md:gap-6">
          {venues.map((venue, index) => {
            const Icon = venue.icon

            return (
              <motion.div
                key={venue.name}
                initial={{
                  opacity: 0,
                  y: 35,
                  scale: 0.97,
                  rotateX: 8,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateX: 0,
                }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformPerspective: 1200 }}
                className="group min-w-0"
              >
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-full overflow-hidden rounded-[1.25rem] border border-white/25 bg-[#fff8fb]/90 shadow-[0_14px_34px_rgba(25,10,19,0.10)] md:rounded-[1.8rem]"
                >
                  <div className="relative p-2.5 md:p-4">
                    <motion.div
                      className="relative h-28 overflow-hidden rounded-[1rem] sm:h-36 md:h-56 md:rounded-[1.35rem]"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.35 }}
                    >
                      <Image
                        src={venue.image}
                        alt={venue.name}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(40,20,30,0.08)_0%,rgba(40,20,30,0.16)_35%,rgba(25,10,19,0.58)_100%)]" />
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02)_35%,transparent_62%)]" />

                      <motion.div
                        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/16 to-transparent skew-x-[-18deg]"
                        initial={{ x: "-140%" }}
                        whileHover={{ x: "390%" }}
                        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                      />

                      <div className="absolute left-2 top-2 flex max-w-[60%] flex-col gap-1 md:left-3 md:top-3">
                        <span className="w-fit rounded-full border border-white/45 bg-[#fff7fa] px-2 py-0.5 text-[8px] font-medium uppercase tracking-[0.14em] text-[#5a3347] md:px-3 md:py-1 md:text-[10px] md:tracking-[0.18em]">
                          {venue.label}
                        </span>
                        <span className="w-fit rounded-full border border-[#f0cad8]/50 bg-[#5a3347] px-2 py-0.5 text-[8px] font-medium uppercase tracking-[0.14em] text-white md:px-3 md:py-1 md:text-[10px] md:tracking-[0.18em]">
                          {venue.badge}
                        </span>
                      </div>

                      <div className="absolute right-2 top-2 rounded-full border border-white/35 bg-white/80 px-2 py-0.5 text-[8px] font-semibold tracking-[0.14em] text-[#6b4154] md:right-3 md:top-3 md:px-3 md:py-1 md:text-[10px] md:tracking-[0.18em]">
                        {venue.dateTag}
                      </div>

                      <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4">
                        <h3
                          className="line-clamp-2 text-[0.95rem] leading-tight text-white drop-shadow-[0_6px_18px_rgba(0,0,0,0.22)] md:text-[1.7rem]"
                          style={{ fontFamily: "var(--font-script), cursive" }}
                        >
                          {venue.name}
                        </h3>
                        <p className="mt-0.5 text-[10px] text-white/90 md:mt-1 md:text-sm">
                          {venue.subname}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="relative px-2.5 pb-2.5 pt-0 md:px-5 md:pb-5 md:pt-1">
                    <div className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-[#efc8d7]/60 to-transparent md:inset-x-5" />

                    <div className="mb-2 flex items-start gap-2 pt-2.5 md:mb-4 md:gap-3 md:pt-4">
                      <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#edd0dc] bg-[#fff8fb] shadow-[0_8px_20px_rgba(79,44,61,0.08)] md:h-10 md:w-10 md:rounded-2xl">
                        <div className="absolute inset-0 rounded-xl bg-[linear-gradient(135deg,rgba(255,255,255,0.25),transparent_60%)] md:rounded-2xl" />
                        <Icon className="relative h-3.5 w-3.5 text-[#5a3347] md:h-4 md:w-4" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-start gap-1.5 text-[#4b2d3d] md:gap-2">
                          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#a46782] md:h-4 md:w-4" />
                          <div className="text-[10px] leading-4 text-[#5f4451] md:text-sm md:leading-6">
                            <p className="line-clamp-1">{venue.address}</p>
                            <p className="line-clamp-1">
                              {venue.city}, {venue.state}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <motion.a
                        href={venue.map}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group/btn relative overflow-hidden rounded-[0.9rem] border border-[#5a3347]/10 bg-[#4f2c3d] px-2 py-2 text-white shadow-[0_10px_18px_rgba(79,44,61,0.14)] md:rounded-[1rem] md:px-4 md:py-3"
                      >
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_55%)]" />
                        <div className="relative flex items-center justify-center gap-1 text-[10px] font-medium tracking-[0.01em] md:gap-2 md:text-sm">
                          <span>{openMap}</span>
                          <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 md:h-4 md:w-4" />
                        </div>
                      </motion.a>

                      <motion.a
                        href={venue.direction}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group/btn relative overflow-hidden rounded-[0.9rem] border border-[#e7c3d2] bg-[#fff8fb] px-2 py-2 text-[#4f2c3d] shadow-[0_10px_18px_rgba(79,44,61,0.08)] md:rounded-[1rem] md:px-4 md:py-3"
                      >
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_60%)]" />
                        <div className="relative flex items-center justify-center gap-1 text-[10px] font-medium tracking-[0.01em] md:gap-2 md:text-sm">
                          <Navigation className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 md:h-4 md:w-4" />
                          <span>{getDirections}</span>
                        </div>
                      </motion.a>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute -right-8 -top-8 h-16 w-16 rounded-full border border-white/10 md:h-20 md:w-20" />
                  <div className="pointer-events-none absolute -bottom-8 -left-8 h-20 w-20 rounded-full border border-[#f0cad8]/10 md:h-24 md:w-24" />
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}