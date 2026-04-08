"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
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

  const content = {
    EN: {
      title: "Our Story",
      subtitle: "From a simple introduction to a beautiful promise",
      intro:
        "What started as a simple matrimony profile slowly unfolded into a story guided by faith, family, and a beautiful beginning.",
      stories: [
        {
          icon: Users,
          number: "01",
          title: "A Simple Beginning",
          description:
            "It all began with a simple profile on a matrimony website. Among many profiles and possibilities, Stebin and Jesna were just two names in the crowd—unaware that their lives were about to intertwine in a beautiful way.",
        },
        {
          icon: Heart,
          number: "02",
          title: "A First Connection",
          description:
            "Their conversations began gently. Messages turned into smiles across screens, and slowly curiosity grew into comfort as they started to know each other better.",
        },
        {
          icon: Video,
          number: "03",
          title: "The First Meeting",
          description:
            "One day, Stebin travelled to Ernakulam to meet Jesna for the very first time. It wasn’t a dramatic moment—just two people sitting across from each other. Yet somehow it felt calm, familiar, and quietly meaningful.",
        },
        {
          icon: Plane,
          number: "04",
          title: "Families Came Together",
          description:
            "Soon their families stepped in. Stebin’s parents visited Jesna’s home in Kannur, where conversations flowed naturally and hearts slowly aligned. What began as a formal visit started feeling like something more special.",
        },
        {
          icon: Sparkles,
          number: "05",
          title: "A Beautiful Decision",
          description:
            "Later, Jesna’s family came to meet Stebin. Amid laughter, tea, and warm conversations, a beautiful decision was made—the wedding was fixed. What began as an arranged meeting slowly turned into a story that feels a little like love.",
        },
      ],
    },
    ES: {
      title: "Nuestra Historia",
      subtitle: "De una simple presentación a una hermosa promesa",
      intro:
        "Lo que comenzó como un simple perfil matrimonial poco a poco se convirtió en una historia guiada por la fe, la familia y un hermoso comienzo.",
      stories: [
        {
          icon: Users,
          number: "01",
          title: "Un Comienzo Sencillo",
          description:
            "Todo comenzó con un simple perfil en un sitio matrimonial. Entre muchos perfiles y posibilidades, Stebin y Jesna eran solo dos nombres entre la multitud, sin saber que sus vidas pronto se entrelazarían de una manera hermosa.",
        },
        {
          icon: Heart,
          number: "02",
          title: "Una Primera Conexión",
          description:
            "Sus conversaciones comenzaron suavemente. Los mensajes se convirtieron en sonrisas a través de las pantallas, y poco a poco la curiosidad se transformó en comodidad mientras empezaban a conocerse mejor.",
        },
        {
          icon: Video,
          number: "03",
          title: "El Primer Encuentro",
          description:
            "Un día, Stebin viajó a Ernakulam para conocer a Jesna por primera vez. No fue un momento dramático, solo dos personas sentadas frente a frente. Sin embargo, de algún modo se sintió tranquilo, familiar y profundamente especial.",
        },
        {
          icon: Plane,
          number: "04",
          title: "Las Familias se Unieron",
          description:
            "Pronto sus familias intervinieron. Los padres de Stebin visitaron la casa de Jesna en Kannur, donde las conversaciones fluyeron con naturalidad y los corazones comenzaron a alinearse. Lo que empezó como una visita formal empezó a sentirse como algo más especial.",
        },
        {
          icon: Sparkles,
          number: "05",
          title: "Una Hermosa Decisión",
          description:
            "Más tarde, la familia de Jesna fue a conocer a Stebin. Entre risas, té y cálidas conversaciones, se tomó una hermosa decisión: se fijó la boda. Lo que comenzó como un encuentro arreglado poco a poco se convirtió en una historia que se siente un poco como amor.",
        },
      ],
    },
  }

  const { title, subtitle, intro, stories } = content[language]

  return (
    <section
      id="our-story"
      ref={containerRef}
      className="relative overflow-hidden py-24"
      style={{
        background:
          "linear-gradient(to bottom, #f7dbe3 0%, #f4e7df 14%, #efe6dc 32%, #f4ece5 52%, #f7ece8 70%, #f8e2e8 86%, #f7dbe3 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#f7dbe3] via-[#f4e7df]/75 to-transparent" />
        <div className="absolute left-[8%] top-20 h-72 w-72 rounded-full bg-white/22 blur-3xl" />
        <div className="absolute right-[10%] top-1/4 h-72 w-72 rounded-full bg-[#f7c6d9]/16 blur-3xl" />
        <div className="absolute bottom-10 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#f4d2dc]/18 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.26),transparent_36%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="h-px w-14 bg-gradient-to-r from-transparent via-[#caa78d] to-transparent" />
            <div className="h-2.5 w-2.5 rotate-45 border border-[#d7b89a]/80 bg-white/60 shadow-[0_0_12px_rgba(255,255,255,0.35)]" />
            <div className="h-px w-14 bg-gradient-to-r from-transparent via-[#caa78d] to-transparent" />
          </div>

          <h2
            className="mb-3 text-4xl text-[#3b2d28] md:text-5xl"
            style={{
              fontFamily: "var(--font-script), cursive",
              textShadow: `
                0 1px 0 rgba(255,255,255,0.82),
                0 4px 14px rgba(132,102,79,0.10)
              `,
            }}
          >
            {title}
          </h2>

          <p
            className="mx-auto mb-6 max-w-2xl text-base text-[#5f5046]/80 md:text-lg"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              textShadow: "0 1px 0 rgba(255,255,255,0.45)",
            }}
          >
            {subtitle}
          </p>

          <motion.div
            className="relative overflow-hidden rounded-[2rem] border border-white/55 px-6 py-7 shadow-[0_20px_60px_rgba(110,87,73,0.10)] backdrop-blur-2xl md:px-10"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.18) 100%)",
              WebkitBackdropFilter: "blur(18px) saturate(160%)",
              backdropFilter: "blur(18px) saturate(160%)",
              boxShadow:
                "0 20px 60px rgba(110,87,73,0.10), inset 0 1px 0 rgba(255,255,255,0.62)",
            }}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.12 }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(255,255,255,0.04)_38%,transparent_64%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d7b89a]/70 to-transparent" />
            <p
              className="relative text-lg italic text-[#4d3d37] md:text-[1.35rem]"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                lineHeight: 1.6,
                textShadow: "0 1px 0 rgba(255,255,255,0.45)",
              }}
            >
              {intro}
            </p>
          </motion.div>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story, index) => {
            const Icon = story.icon
            const fromRight = index % 2 === 0

            return (
              <motion.div
                key={story.number}
                className="group relative"
                initial={{
                  opacity: 0,
                  x: fromRight ? 60 : -60,
                  y: 24,
                  scale: 0.96,
                  filter: "blur(10px)",
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.82,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onViewportEnter={() => vibrateSoft([8, 18, 8])}
              >
                <motion.div
                  className="relative h-full overflow-hidden rounded-[2rem] border border-white/55 p-6 shadow-[0_18px_60px_rgba(103,83,67,0.10)] backdrop-blur-2xl md:p-7"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.18) 100%)",
                    WebkitBackdropFilter: "blur(18px) saturate(160%)",
                    backdropFilter: "blur(18px) saturate(160%)",
                    boxShadow:
                      "0 18px 60px rgba(103,83,67,0.10), inset 0 1px 0 rgba(255,255,255,0.65)",
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(255,255,255,0.03)_40%,transparent_62%)]" />
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_42%)]" />
                  <div className="absolute left-5 right-5 top-0 h-px bg-gradient-to-r from-transparent via-[#d7b89a]/65 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d0b59a]/28 to-transparent" />

                  <div className="absolute left-4 top-4 h-4 w-4 rounded-tl border-l border-t border-[#d7b89a]/40" />
                  <div className="absolute right-4 top-4 h-4 w-4 rounded-tr border-r border-t border-[#d7b89a]/40" />
                  <div className="absolute bottom-4 left-4 h-4 w-4 rounded-bl border-b border-l border-[#d7b89a]/40" />
                  <div className="absolute bottom-4 right-4 h-4 w-4 rounded-br border-b border-r border-[#d7b89a]/40" />

                  <div className="relative mb-5 flex items-center justify-between">
                    <motion.div
                      className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/55 bg-white/40 shadow-[0_10px_24px_rgba(103,83,67,0.10)] backdrop-blur-xl"
                      whileInView={{ scale: [0.88, 1.08, 1], rotate: [0, 4, 0] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08 + 0.2 }}
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/35 to-[#f7c6d9]/10" />
                      <Icon className="relative h-4 w-4 text-[#4c3d36]" />
                    </motion.div>

                    <span
                      className="text-[11px] uppercase tracking-[0.28em] text-[#7a6658]/80"
                      style={{
                        fontFamily: '"Cormorant Garamond", serif',
                        textShadow: "0 1px 0 rgba(255,255,255,0.45)",
                      }}
                    >
                      {story.number}
                    </span>
                  </div>

                  <div className="relative">
                    <h3
                      className="mb-3 text-[1.1rem] text-[#3d2f2a] md:text-[1.18rem]"
                      style={{
                        fontWeight: 600,
                        textShadow: "0 1px 0 rgba(255,255,255,0.42)",
                      }}
                    >
                      {story.title}
                    </h3>

                    <p
                      className="text-sm leading-7 text-[#5c4e46]/82"
                      style={{
                        textShadow: "0 1px 0 rgba(255,255,255,0.35)",
                      }}
                    >
                      {story.description}
                    </p>
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