"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"
import { Heart, Users, Video, Plane, Sparkles } from "lucide-react"

interface OurStoryProps {
  language: "ES" | "EN"
}

function vibrateSoft(pattern: number | number[] = 8) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(pattern)
  }
}

export function OurStory({ language }: OurStoryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lastScrollVibeRef = useRef(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"])
  const sectionY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.6, 1, 1, 0.7])

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", () => {
      const now = Date.now()
      if (now - lastScrollVibeRef.current > 700) {
        vibrateSoft(5)
        lastScrollVibeRef.current = now
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  const content = {
    EN: {
      title: "Our Story",
      subtitle: "How our paths crossed and hearts connected",
      stories: [
        {
          icon: Users,
          title: "An Unexpected Meeting",
          description:
            "Jinsha's grandmother and Mirza's mother met unexpectedly at a funeral. In that quiet moment, a beautiful connection began.",
        },
        {
          icon: Heart,
          title: "A Shared Hope",
          description:
            "Both families realized they were searching for a life partner for their children. It felt like destiny had gently stepped in.",
        },
        {
          icon: Video,
          title: "Across the Miles",
          description:
            "A video call connected Mirza in Dubai and Jinsha in Kerala. Even through a screen, the warmth felt real.",
        },
        {
          icon: Plane,
          title: "Journey to Kerala",
          description:
            "Mirza and his father traveled from Dubai to Kerala, where both families met and found instant harmony.",
        },
        {
          icon: Sparkles,
          title: "The Beginning",
          description:
            "The engagement was fixed with joy, and now our wedding celebration begins — the start of a beautiful new chapter.",
        },
      ],
    },
    ES: {
      title: "Nuestra Historia",
      subtitle: "Cómo se cruzaron nuestros caminos y se conectaron nuestros corazones",
      stories: [
        {
          icon: Users,
          title: "Un Encuentro Inesperado",
          description:
            "La abuela de Jinsha y la madre de Mirza se conocieron inesperadamente en un funeral. En ese momento tranquilo comenzó una hermosa conexión.",
        },
        {
          icon: Heart,
          title: "Una Esperanza Compartida",
          description:
            "Ambas familias se dieron cuenta de que buscaban una pareja de vida para sus hijos. Parecía que el destino había intervenido.",
        },
        {
          icon: Video,
          title: "A Través de las Distancias",
          description:
            "Una videollamada conectó a Mirza en Dubái con Jinsha en Kerala. Incluso a través de una pantalla, la calidez era real.",
        },
        {
          icon: Plane,
          title: "Viaje a Kerala",
          description:
            "Mirza y su padre viajaron de Dubái a Kerala, donde ambas familias se conocieron y encontraron armonía instantánea.",
        },
        {
          icon: Sparkles,
          title: "El Comienzo",
          description:
            "El compromiso se fijó con alegría, y ahora comienza nuestra celebración de boda: el inicio de un nuevo capítulo hermoso.",
        },
      ],
    },
  }

  const { title, subtitle, stories } = content[language]

  return (
    <section
      id="our-story"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-[#f3eee4] via-[#ece7da] to-[#dde4d3]"
      ref={containerRef}
    >
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute top-0 left-[8%] w-72 h-72 rounded-full bg-sage/18 blur-3xl" />
        <div className="absolute bottom-0 right-[8%] w-72 h-72 rounded-full bg-champagne/20 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-56 h-56 rounded-full bg-olive/10 blur-3xl" />
      </div>

      <motion.div
        className="container mx-auto px-4 relative z-10"
        style={{ y: sectionY, opacity: sectionOpacity }}
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="text-4xl md:text-5xl font-light text-[#24311f] mb-4"
            style={{ fontFamily: "var(--font-script), cursive" }}
          >
            {title}
          </h2>
          <p className="text-[#24311f]/68 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-champagne/30 -translate-x-1/2">
            <motion.div
              className="w-full bg-gradient-to-b from-sage via-olive to-champagne"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-8 md:space-y-12">
            {stories.map((story, index) => {
              const Icon = story.icon
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={index}
                  className={`relative flex items-start gap-6 md:gap-8 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, y: 60, scale: 0.96, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.9,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onViewportEnter={() => vibrateSoft([8, 20, 8])}
                >
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      className="relative w-11 h-11 rounded-full bg-white/70 border border-white/40 backdrop-blur-xl flex items-center justify-center shadow-[0_12px_30px_rgba(36,49,31,0.14)]"
                      whileInView={{ scale: [0.82, 1.08, 1], rotate: [0, 4, 0] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08 + 0.2 }}
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/35 to-champagne/10" />
                      <Icon className="relative w-4 h-4 text-[#24311f]" />
                    </motion.div>
                  </div>

                  <div
                    className={`ml-16 md:ml-0 md:w-[45%] ${
                      isEven ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <motion.div
                      className="relative rounded-[1.8rem] border border-white/35 bg-white/18 backdrop-blur-2xl p-6 overflow-hidden shadow-[0_18px_50px_rgba(36,49,31,0.12)] group"
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-champagne/10" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-champagne/10 via-transparent to-olive/10" />
                      <div className="absolute left-5 right-5 top-0 h-px bg-gradient-to-r from-transparent via-champagne/55 to-transparent" />

                      <div className="relative">
                        <span className="inline-block text-[11px] text-[#24311f]/70 font-medium tracking-[0.28em] uppercase mb-2">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <h3 className="text-lg md:text-[1.15rem] font-medium text-[#24311f] mb-2">
                          {story.title}
                        </h3>

                        <p className="text-[#24311f]/68 text-sm leading-7">
                          {story.description}
                        </p>
                      </div>

                      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-olive/20 to-transparent" />
                    </motion.div>
                  </div>

                  <div className="hidden md:block md:w-[45%]" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </section>
  )
}