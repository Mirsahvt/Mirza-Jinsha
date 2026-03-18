"use client"

import { color, motion } from "framer-motion"
import { ExternalLink, Navigation, Calendar } from "lucide-react"
import Image from "next/image"

interface VenueProps {
  language: "ES" | "EN"
}

export function Venue({ language }: VenueProps) {
  const content = {
    EN: {
      title: "Wedding Venues",
      subtitle: "Join us at these beautiful locations",
      openMap: "Open in Maps",
      getDirections: "Get Directions",
      groomVenue: "Groom Venue",
      brideVenue: "Bride Venue",
      eventDate: "25 April 2026",
    },
    ES: {
      title: "Lugares de la Boda",
      subtitle: "Únete a nosotros en estas hermosas ubicaciones",
      openMap: "Abrir en Mapas",
      getDirections: "Obtener Direcciones",
      groomVenue: "Lugar del Novio",
      brideVenue: "Lugar de la Novia",
      eventDate: "25 Abril 2026",
    },
  }

  const {
    title,
    subtitle,
    openMap,
    getDirections,
    groomVenue,
    brideVenue,
    eventDate,
  } = content[language]

  const venues = [
    {
      label: groomVenue,
      name: "Rainbow Convention Centre",
      address: "Keeramkundu",
      city: "Malappuram",
      state: "Kerala 676507",
      country: "India",
      image: "/images/rainbow.png",
      map: "https://maps.google.com/?q=Rainbow+Convention+Centre+Malappuram",
      direction:
        "https://www.google.com/maps/dir/?api=1&destination=Rainbow+Convention+Centre+Malappuram",
      showDate: false,
    },
    {
      label: brideVenue,
      name: "Crown Auditorium",
      address: "Tirur",
      city: "Malappuram",
      state: "Kerala",
      country: "India",
      image: "/images/crown.png",
      map: "https://share.google/RnHwDIFMmJMwS2yt8",
      direction:
        "https://www.google.com/maps/dir/?api=1&destination=Crown+Auditorium+Tirur",
      showDate: true,
    },
  ]

  return (
    <section
      id="venue"
      className="relative overflow-hidden py-24 bg-gradient-to-b from-[#f4efe4] via-[#ece7d9] to-[#e5dfd1]"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-sage/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-champagne/10 blur-3xl rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2
            className="text-4xl md:text-5xl text-[#24311f] mb-3"
            style={{ fontFamily: "var(--font-script), cursive" }}
          >
            {title}
          </h2>

          <p className="text-[#24311f]/65">{subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {venues.map((venue, index) => (
            <motion.div
              key={venue.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/40 shadow-xl bg-white/20 backdrop-blur-xl">
                <div className="relative h-64">
                  <Image
                    src={venue.image}
                    alt={venue.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40" />

                  <div className="absolute top-4 left-4 px-4 py-1 text-xs tracking-widest bg-white/80 rounded-full">
                    {venue.label}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <h3
                      className="text-white text-2xl md:text-3xl drop-shadow"
                      style={{ fontFamily: "var(--font-script), cursive" }}
                    >
                      {venue.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6 text-center">
                  {venue.showDate && (
                    <div className="flex items-center justify-center gap-2 mb-4 text-olive font-medium">
                      <Calendar className="w-4 h-4" />
                      {eventDate}
                    </div>
                  )}

                  <div className="text-[#24311f]/70 mb-6">
                    <p>{venue.address}</p>
                    <p>
                      {venue.city}, {venue.state}
                    </p>
                    <p>{venue.country}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <motion.a
                      href={venue.map}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-[#24311f] text-white px-6 py-3 rounded-full"
                      whileHover={{ scale: 1.05 }}
                    >
                      {openMap}
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>

                    <motion.a
                      href={venue.direction}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 border border-[#24311f]/30 px-6 py-3 rounded-full"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Navigation className="w-4 h-4" />
                      {getDirections}
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
