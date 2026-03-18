"use client"

import { motion } from "framer-motion"
import { Sparkles, MoonStar, Music2, Crown, Check } from "lucide-react"

interface DressCodeProps {
  language: "ES" | "EN"
}

export function DressCode({ language }: DressCodeProps) {
  const content = {
    EN: {
      title: "Dress Code",
      subtitle: "A style guide for each celebration",
      noteTitle: "Kindly follow the palette",
      noteText:
        "To keep each celebration visually elegant and beautifully coordinated, we invite our guests to follow the suggested colors for each day.",
      sections: [
        {
          icon: MoonStar,
          day: "Nikah Day",
          date: "25 April 2026 · Morning",
          vibe: "Soft, serene, elegant",
          attire: "Pastel elegance / graceful traditional",
          description:
            "Since we will be wearing off-white, guests are requested to choose soft pastel and light neutral tones.",
          wear: [
            "Champagne Beige",
            "Blush Pink",
            "Sage Green",
            "Powder Blue",
            "Light Grey",
            "Soft Ivory",
          ],
          avoid: ["Pure White", "Black", "Neon Shades"],
          chipColors: [
            "bg-[#d9c7a4]",
            "bg-[#e8c8c8]",
            "bg-[#b8c4ad]",
            "bg-[#c8d6e8]",
            "bg-[#d8d8d8]",
            "bg-[#f1eadc]",
          ],
        },
        {
          icon: Music2,
          day: "Sangeeth Night",
          date: "25 April 2026 · Evening",
          vibe: "Royal, festive, vibrant",
          attire: "Jewel tones / festive glamour",
          description:
            "Since we will be wearing champagne-gold and dark olive green, guests are requested to choose rich festive shades that do not overlap with the couple’s palette, so the bride and groom remain the visual highlight.",
          wear: [
            "Wine",
            "Maroon",
            "Navy Blue",
            "Deep Purple",
            "Plum",
            "Midnight Blue",
          ],
          avoid: [
            "Green Shades",
            "Olive",
            "Brown Tones",
            "Champagne Gold",
            "Beige",
          ],
          chipColors: [
            "bg-[#6b1f34]",
            "bg-[#7a2330]",
            "bg-[#203c73]",
            "bg-[#5f3b78]",
            "bg-[#6f3d6d]",
            "bg-[#1f2f4f]",
          ],
        },
        {
          icon: Crown,
          day: "Reception Day",
          date: "26 April 2026 · Grand Celebration",
          vibe: "Formal, luxurious, evening chic",
          attire: "Elegant formal / evening luxury",
          description:
            "Since the bride will be wearing red and the groom black, guests are requested to select refined evening tones that allow the couple to remain the visual focus.",
          wear: [
            "Metallic Gold",
            "Bronze",
            "Beige",
            "Deep Navy",
            "Charcoal Grey",
            "Taupe",
          ],
          avoid: ["Black", "Bright Red", "Neon Colors", "Heavy Red-Black Match"],
          chipColors: [
            "bg-[#c7a34b]",
            "bg-[#8d6238]",
            "bg-[#dcc8ae]",
            "bg-[#22345a]",
            "bg-[#52565c]",
            "bg-[#9b8a7a]",
          ],
        },
      ],
    },
    ES: {
      title: "Código de Vestimenta",
      subtitle: "Una guía de estilo para cada celebración",
      noteTitle: "Sugerimos seguir la paleta",
      noteText:
        "Para mantener cada celebración visualmente elegante y bellamente coordinada, invitamos a nuestros invitados a seguir los colores sugeridos para cada día.",
      sections: [
        {
          icon: MoonStar,
          day: "Día del Nikah",
          date: "25 Abril 2026 · Mañana",
          vibe: "Suave, sereno, elegante",
          attire: "Pasteles elegantes / tradicional refinado",
          description:
            "Como nosotros vestiremos off-white, pedimos a los invitados elegir tonos pastel suaves y neutros claros.",
          wear: [
            "Champán Beige",
            "Rosa Blush",
            "Verde Salvia",
            "Azul Polvo",
            "Gris Claro",
            "Marfil Suave",
          ],
          avoid: ["Blanco Puro", "Negro", "Tonos Neón"],
          chipColors: [
            "bg-[#d9c7a4]",
            "bg-[#e8c8c8]",
            "bg-[#b8c4ad]",
            "bg-[#c8d6e8]",
            "bg-[#d8d8d8]",
            "bg-[#f1eadc]",
          ],
        },
        {
          icon: Music2,
          day: "Noche de Sangeeth",
          date: "25 Abril 2026 · Noche",
          vibe: "Real, festivo, vibrante",
          attire: "Tonos joya / glamour festivo",
          description:
            "Como nosotros vestiremos champagne-gold y verde oliva oscuro, pedimos a los invitados elegir tonos festivos intensos que no coincidan con la paleta de la pareja, para que los novios sigan siendo el centro visual.",
          wear: [
            "Vino",
            "Marrón Rojo",
            "Azul Marino",
            "Púrpura Oscuro",
            "Ciruela",
            "Azul Medianoche",
          ],
          avoid: [
            "Tonos Verdes",
            "Oliva",
            "Tonos Marrones",
            "Champagne Gold",
            "Beige",
          ],
          chipColors: [
            "bg-[#6b1f34]",
            "bg-[#7a2330]",
            "bg-[#203c73]",
            "bg-[#5f3b78]",
            "bg-[#6f3d6d]",
            "bg-[#1f2f4f]",
          ],
        },
        {
          icon: Crown,
          day: "Día de Recepción",
          date: "26 Abril 2026 · Gran Celebración",
          vibe: "Formal, lujoso, nocturno",
          attire: "Formal elegante / lujo de noche",
          description:
            "Como la novia vestirá rojo y el novio negro, pedimos a los invitados elegir tonos refinados de noche que permitan que la pareja siga siendo el centro visual.",
          wear: [
            "Dorado Metálico",
            "Bronce",
            "Beige",
            "Azul Marino Oscuro",
            "Gris Carbón",
            "Topo",
          ],
          avoid: ["Negro", "Rojo Brillante", "Colores Neón", "Combinación Roja-Negra Muy Fuerte"],
          chipColors: [
            "bg-[#c7a34b]",
            "bg-[#8d6238]",
            "bg-[#dcc8ae]",
            "bg-[#22345a]",
            "bg-[#52565c]",
            "bg-[#9b8a7a]",
          ],
        },
      ],
    },
  }

  const { title, subtitle, noteTitle, noteText, sections } = content[language]

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-[#f6f1e7] via-[#eee8db] to-[#e7e0d3]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-16 left-[8%] h-72 w-72 rounded-full bg-sage/12 blur-3xl" />
        <div className="absolute bottom-10 right-[8%] h-72 w-72 rounded-full bg-champagne/16 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-olive/8 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
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

          <p className="text-[#24311f]/65 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.08 }}
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/20 backdrop-blur-2xl px-6 py-6 md:px-8 md:py-7 shadow-[0_18px_50px_rgba(36,49,31,0.08)]">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(255,255,255,0.03)_35%,transparent_60%)]" />
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-champagne/55 to-transparent" />

            <div className="relative text-center">
              <div className="flex justify-center mb-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/40 bg-white/70 shadow-[0_10px_20px_rgba(0,0,0,0.05)]">
                  <Sparkles className="h-5 w-5 text-[#24311f]" />
                </div>
              </div>

              <h3 className="text-[#24311f] text-lg md:text-xl font-medium mb-2">
                {noteTitle}
              </h3>
              <p className="text-[#24311f]/65 text-sm md:text-base leading-7">
                {noteText}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-7 lg:grid-cols-3 max-w-7xl mx-auto">
          {sections.map((section, index) => {
            const Icon = section.icon

            return (
              <motion.div
                key={section.day}
                initial={{ opacity: 0, y: 50, scale: 0.97, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.85,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-full overflow-hidden rounded-[2rem] border border-white/40 bg-white/20 backdrop-blur-2xl shadow-[0_22px_55px_rgba(36,49,31,0.10)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/18 via-transparent to-[#d9c28c]/8" />
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.02)_36%,transparent_60%)]" />

                  <div className="absolute top-4 left-4 h-8 w-8 rounded-tl-xl border-l border-t border-champagne/65" />
                  <div className="absolute top-4 right-4 h-8 w-8 rounded-tr-xl border-r border-t border-champagne/65" />
                  <div className="absolute bottom-4 left-4 h-8 w-8 rounded-bl-xl border-b border-l border-champagne/65" />
                  <div className="absolute bottom-4 right-4 h-8 w-8 rounded-br-xl border-b border-r border-champagne/65" />

                  <motion.div
                    className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/14 to-transparent skew-x-[-18deg]"
                    initial={{ x: "-140%" }}
                    whileHover={{ x: "380%" }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  />

                  <div className="relative z-10 p-7 md:p-8">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/40 bg-white/75 shadow-[0_10px_20px_rgba(0,0,0,0.05)]">
                        <Icon className="h-6 w-6 text-[#24311f]" />
                      </div>

                      <div className="rounded-full border border-champagne/35 bg-white/55 px-4 py-1.5 text-[11px] tracking-[0.18em] uppercase text-[#24311f]/70">
                        {section.date}
                      </div>
                    </div>

                    <h3
                      className="text-[2rem] leading-none text-[#24311f] mb-2"
                      style={{ fontFamily: "var(--font-script), cursive" }}
                    >
                      {section.day}
                    </h3>

                    <p className="text-sm uppercase tracking-[0.18em] text-[#8f7440] font-medium mb-4">
                      {section.vibe}
                    </p>

                    <div className="mb-5 rounded-2xl border border-champagne/25 bg-white/45 px-4 py-3">
                      <p className="text-[#24311f] text-sm font-medium">{section.attire}</p>
                    </div>

                    <p className="text-[#24311f]/67 text-sm leading-7 mb-6">
                      {section.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-[#24311f] text-sm font-semibold mb-3 flex items-center gap-2">
                        <Check className="h-4 w-4 text-[#8f7440]" />
                        Recommended Colors
                      </h4>

                      <div className="grid grid-cols-2 gap-2.5">
                        {section.wear.map((item, chipIndex) => (
                          <motion.div
                            key={item}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.45,
                              delay: 0.25 + chipIndex * 0.05 + index * 0.08,
                            }}
                            className="flex items-center gap-2 rounded-full border border-white/45 bg-white/55 px-2.5 py-2"
                          >
                            <span
                              className={`h-5 w-5 rounded-full border border-white/60 shadow-sm ${section.chipColors[chipIndex]}`}
                            />
                            <span className="text-[12px] md:text-[13px] text-[#24311f]/78">
                              {item}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-[#b98d73]/18 bg-[#fff7f2]/55 px-4 py-4">
                      <h4 className="text-[#7b4934] text-sm font-semibold mb-2">
                        Avoid
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {section.avoid.map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-white/70 border border-[#caa08d]/25 px-3 py-1.5 text-[12px] text-[#7b4934]/90"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-2">
                      <div className="w-7 h-px bg-champagne/45" />
                      <div className="w-1.5 h-1.5 rounded-full bg-champagne/45" />
                      <div className="w-7 h-px bg-champagne/45" />
                    </div>
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