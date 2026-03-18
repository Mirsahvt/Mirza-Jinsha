"use client"

import { motion } from "framer-motion"
import { Heart, Users, UtensilsCrossed, Camera, Music, Sparkles } from "lucide-react"

interface TimelineProps {
  language: "ES" | "EN"
}

export function Timeline({ language }: TimelineProps) {
  const content = {
    EN: {
      title: "Day Program",
      subtitle: "Schedule for the celebration",
      events: [
        { icon: Heart, title: "Ceremony", description: "Wedding ceremony begins", time: "11:00 AM" },
        { icon: Users, title: "Welcome Gathering", description: "Greet family and friends", time: "1:00 PM" },
        { icon: UtensilsCrossed, title: "Dinner", description: "Celebration feast together", time: "3:00 PM" },
        { icon: Sparkles, title: "Couple Entry", description: "Grand entrance of the newlyweds", time: "5:00 PM" },
        { icon: Camera, title: "Photo Session", description: "Capture beautiful memories", time: "6:00 PM" },
        { icon: Music, title: "Celebration", description: "Dance and enjoy the evening", time: "7:00 PM" }
      ]
    },
    ES: {
      title: "Programa del Día",
      subtitle: "Horario de la celebración",
      events: [
        { icon: Heart, title: "Ceremonia", description: "Comienza la ceremonia de boda", time: "11:00 AM" },
        { icon: Users, title: "Reunión de Bienvenida", description: "Saludo a familiares y amigos", time: "1:00 PM" },
        { icon: UtensilsCrossed, title: "Cena", description: "Festín de celebración juntos", time: "3:00 PM" },
        { icon: Sparkles, title: "Entrada de la Pareja", description: "Gran entrada de los recién casados", time: "5:00 PM" },
        { icon: Camera, title: "Sesión de Fotos", description: "Captura hermosos recuerdos", time: "6:00 PM" },
        { icon: Music, title: "Celebración", description: "Baile y disfrute de la noche", time: "7:00 PM" }
      ]
    }
  }

  const { title, subtitle, events } = content[language]

  return (
    <section id="program" className="py-24 bg-cream relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-64 h-64 bg-sage/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-champagne/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-3">
            {title}
          </h2>
          <p className="text-foreground/60">
            {subtitle}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-sage/50 via-champagne/50 to-wine/50 -translate-x-1/2" />

            {events.map((event, index) => {
              const Icon = event.icon
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={event.title}
                  className={`relative flex items-start gap-6 mb-10 last:mb-0 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Icon Circle */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                    <motion.div 
                      className="w-12 h-12 bg-ivory rounded-full flex items-center justify-center shadow-md border-2 border-champagne/30"
                      whileInView={{ scale: [0.8, 1.1, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                    >
                      <Icon className="w-5 h-5 text-wine" />
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  <div className={`ml-20 md:ml-0 md:w-[44%] ${isEven ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <motion.div 
                      className="bg-ivory/80 backdrop-blur-sm border border-champagne/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                      whileHover={{ y: -2 }}
                    >
                      {/* Time chip */}
                      <span className="inline-block text-xs font-medium text-wine bg-wine/10 px-3 py-1 rounded-full mb-3">
                        {event.time}
                      </span>
                      <h3 className="text-lg font-medium text-foreground mb-1.5">
                        {event.title}
                      </h3>
                      <p className="text-foreground/60 text-sm">
                        {event.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-[44%]" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
