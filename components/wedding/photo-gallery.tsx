"use client"

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"

interface PhotoGalleryProps {
  language: "ES" | "EN"
}

function vibrateSoft(pattern: number | number[] = [10, 25, 10]) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(pattern)
  }
}

export function PhotoGallery({ language }: PhotoGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const coupleVibratedRef = useRef(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  })

  const content = {
    EN: {
      title: "Meet the Couple",
      groom: "The Groom",
      bride: "The Bride",
      together: "Together Forever",
      arabicQuote:
        "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    },
    ES: {
      title: "Conoce a la Pareja",
      groom: "El Novio",
      bride: "La Novia",
      together: "Juntos Para Siempre",
      arabicQuote:
        "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    },
  }

  const { title, groom, bride, together, arabicQuote } = content[language]

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05])

  const groomX = useTransform(scrollYProgress, [0.14, 0.32], ["0%", "28%"])
  const brideX = useTransform(scrollYProgress, [0.14, 0.32], ["0%", "-28%"])
  const sideY = useTransform(scrollYProgress, [0.14, 0.32], [0, -24])
  const sideScale = useTransform(scrollYProgress, [0.14, 0.32], [1, 0.82])
  const sideOpacity = useTransform(scrollYProgress, [0.14, 0.32], [1, 0.1])
  const sideBlur = useTransform(scrollYProgress, [0.14, 0.32], [0, 16])

  const coupleY = useTransform(scrollYProgress, [0.26, 0.44], [110, 0])
  const coupleScale = useTransform(scrollYProgress, [0.26, 0.44], [0.76, 1])
  const coupleOpacity = useTransform(scrollYProgress, [0.26, 0.4], [0, 1])
  const coupleGlow = useTransform(scrollYProgress, [0.3, 0.46], [0, 1])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.18 && !coupleVibratedRef.current) {
      vibrateSoft([12, 30, 12])
      coupleVibratedRef.current = true
    }

    if (latest < 0.06) {
      coupleVibratedRef.current = false
    }
  })

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative h-[115vh] overflow-hidden bg-gradient-to-b from-[#f4efe5] via-[#ece7da] to-[#dfe6d5]"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ scale: bgScale }}
      >
        <div className="absolute top-0 left-[10%] w-60 h-60 rounded-full bg-sage/18 blur-3xl" />
        <div className="absolute bottom-0 right-[10%] w-60 h-60 rounded-full bg-champagne/18 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-52 h-52 rounded-full bg-olive/10 blur-3xl" />
      </motion.div>

      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="container mx-auto px-4 h-full relative z-10">
          <motion.div
            className="text-center pt-10 md:pt-16 mb-4"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="text-4xl md:text-5xl font-light text-[#24311f]"
              style={{ fontFamily: "var(--font-script), cursive" }}
            >
              {title}
            </h2>
          </motion.div>

          <div className="relative h-[calc(100vh-90px)] max-w-md md:max-w-6xl mx-auto">
            {/* MOBILE / TABLET */}
            <div className="md:hidden relative h-full">
              {/* Groom */}
              <motion.div
                className="absolute left-0 top-[42%] w-[56%] -translate-y-1/2"
                style={{
                  x: groomX,
                  y: sideY,
                  scale: sideScale,
                  opacity: sideOpacity,
                  filter: useTransform(sideBlur, (v) => `blur(${v}px)`),
                }}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-white/35 bg-white/15 backdrop-blur-xl shadow-[0_18px_50px_rgba(36,49,31,0.14)]">
                  <Image src="/images/groom.jpg" alt="Mirza" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#24311f]/78 via-[#24311f]/15 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-champagne/10" />

                  <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-champagne/70 rounded-tl-lg" />
                  <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-champagne/70 rounded-tr-lg" />
                  <div className="absolute bottom-16 left-4 w-7 h-7 border-b-2 border-l-2 border-champagne/70 rounded-bl-lg" />
                  <div className="absolute bottom-16 right-4 w-7 h-7 border-b-2 border-r-2 border-champagne/70 rounded-br-lg" />

                  <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                    <p className="text-ivory/75 text-[10px] tracking-[0.22em] uppercase mb-1">
                      {groom}
                    </p>
                    <h3
                      className="text-ivory text-xl font-medium"
                      style={{ fontFamily: "var(--font-script), cursive" }}
                    >
                      Mirza
                    </h3>
                  </div>
                </div>
              </motion.div>

              {/* Bride */}
              <motion.div
                className="absolute right-0 top-[42%] w-[56%] -translate-y-1/2"
                style={{
                  x: brideX,
                  y: sideY,
                  scale: sideScale,
                  opacity: sideOpacity,
                  filter: useTransform(sideBlur, (v) => `blur(${v}px)`),
                }}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-white/35 bg-white/15 backdrop-blur-xl shadow-[0_18px_50px_rgba(36,49,31,0.14)]">
                  <Image src="/images/bride.jpg" alt="Jinsha" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#24311f]/78 via-[#24311f]/15 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-champagne/10" />

                  <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-champagne/70 rounded-tl-lg" />
                  <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-champagne/70 rounded-tr-lg" />
                  <div className="absolute bottom-16 left-4 w-7 h-7 border-b-2 border-l-2 border-champagne/70 rounded-bl-lg" />
                  <div className="absolute bottom-16 right-4 w-7 h-7 border-b-2 border-r-2 border-champagne/70 rounded-br-lg" />

                  <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                    <p className="text-ivory/75 text-[10px] tracking-[0.22em] uppercase mb-1">
                      {bride}
                    </p>
                    <h3
                      className="text-ivory text-xl font-medium"
                      style={{ fontFamily: "var(--font-script), cursive" }}
                    >
                      Jinsha
                    </h3>
                  </div>
                </div>
              </motion.div>

              {/* Couple */}
              <motion.div
                className="absolute left-1/2 top-[42%] w-[76%] -translate-x-1/2 -translate-y-1/2"
                style={{
                  y: coupleY,
                  scale: coupleScale,
                  opacity: coupleOpacity,
                }}
              >
                <motion.div
                  className="relative aspect-[4/5] overflow-hidden rounded-[2.2rem] border border-white/40 bg-white/18 backdrop-blur-2xl shadow-[0_24px_70px_rgba(36,49,31,0.18)]"
                  animate={{
                    boxShadow: [
                      "0 24px 70px rgba(36,49,31,0.12)",
                      "0 24px 80px rgba(200,178,125,0.22)",
                      "0 24px 70px rgba(36,49,31,0.18)",
                    ],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    className="absolute -inset-4 rounded-[2.6rem] bg-gradient-to-r from-transparent via-champagne/20 to-transparent blur-2xl pointer-events-none"
                    style={{ opacity: coupleGlow }}
                  />

                  <Image
                    src="/images/couple.jpg"
                    alt="Mirza & Jinsha"
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#24311f]/82 via-[#24311f]/18 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/14 via-transparent to-champagne/12" />

                  <div className="absolute top-5 left-5 w-9 h-9 border-t-2 border-l-2 border-champagne/75 rounded-tl-xl" />
                  <div className="absolute top-5 right-5 w-9 h-9 border-t-2 border-r-2 border-champagne/75 rounded-tr-xl" />
                  <div className="absolute bottom-20 left-5 w-9 h-9 border-b-2 border-l-2 border-champagne/75 rounded-bl-xl" />
                  <div className="absolute bottom-20 right-5 w-9 h-9 border-b-2 border-r-2 border-champagne/75 rounded-br-xl" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <p className="text-ivory/80 text-[10px] tracking-[0.28em] uppercase mb-2">
                      {together}
                    </p>
                    <h3
                      className="text-ivory text-3xl font-medium"
                      style={{ fontFamily: "var(--font-script), cursive" }}
                    >
                      Mirza & Jinsha
                    </h3>
                  </div>
                </motion.div>
              </motion.div>

              {/* Arabic Quote Below Section */}
              <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center px-6 w-full max-w-[360px]"
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.p
                  dir="rtl"
                  className="text-[22px] font-bold leading-11"
                  style={{
                    fontFamily: "'Amiri', 'Noto Naskh Arabic', serif",
                    background:
                      "linear-gradient(180deg, #f8ebbe 0%, #dfc27a 38%, #c99a3c 68%, #b27a23 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 0 18px rgba(212,181,106,0.22)",
                    letterSpacing: "0.02em",
                  }}
                  initial={{ opacity: 0, y: 22, scale: 0.96, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  animate={{
                    textShadow: [
                      "0 0 8px rgba(212,181,106,0.10)",
                      "0 0 22px rgba(212,181,106,0.35)",
                      "0 0 12px rgba(212,181,106,0.16)",
                    ],
                    opacity: [0.9, 1, 0.92],
                  }}
                  transition={{
                    opacity: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                    y: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                    scale: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                    filter: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                    textShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  }}
                >
                  {arabicQuote}
                </motion.p>

                <motion.p
                  className="mt-3 text-[11px] tracking-[0.28em] uppercase text-[#24311f]/60 font-medium"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                >
                  Qur'an 30:21
                </motion.p>
              </motion.div>
            </div>

            {/* Desktop simple layout */}
            <div className="hidden md:flex flex-col items-center justify-center h-full">
              <div className="flex items-center justify-center gap-8 w-full">
                {[
                  { src: "/images/groom.jpg", label: groom, name: "Mirza" },
                  {
                    src: "/images/couple.jpg",
                    label: together,
                    name: "Mirza & Jinsha",
                    featured: true,
                  },
                  { src: "/images/bride.jpg", label: bride, name: "Jinsha" },
                ].map((photo, index) => (
                  <motion.div
                    key={photo.label}
                    initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.75,
                      delay: index * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`relative ${photo.featured ? "w-[36%]" : "w-[26%]"}`}
                  >
                    <motion.div
                      className={`relative overflow-hidden rounded-[2rem] border border-white/35 bg-white/15 backdrop-blur-xl shadow-[0_18px_50px_rgba(36,49,31,0.14)] group ${
                        photo.featured ? "aspect-[4/5]" : "aspect-[3/4]"
                      }`}
                      whileHover={{ y: -6, scale: 1.02 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#24311f]/72 via-[#24311f]/12 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-champagne/10" />

                      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-champagne/70 rounded-tl-lg" />
                      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-champagne/70 rounded-tr-lg" />
                      <div className="absolute bottom-16 left-4 w-8 h-8 border-b-2 border-l-2 border-champagne/70 rounded-bl-lg" />
                      <div className="absolute bottom-16 right-4 w-8 h-8 border-b-2 border-r-2 border-champagne/70 rounded-br-lg" />

                      <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                        <p className="text-ivory/75 text-xs tracking-[0.25em] uppercase mb-1">
                          {photo.label}
                        </p>
                        <h3
                          className={`${photo.featured ? "text-2xl" : "text-xl"} text-ivory font-medium`}
                          style={{ fontFamily: "var(--font-script), cursive" }}
                        >
                          {photo.name}
                        </h3>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-8 text-center px-6 max-w-3xl"
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.p
                  dir="rtl"
                  className="text-[22px] font-bold leading-10"
                  style={{
                    fontFamily: "'Amiri', 'Noto Naskh Arabic', serif",
                    background:
                      "linear-gradient(180deg, #f8ebbe 0%, #dfc27a 38%, #c99a3c 68%, #b27a23 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 0 18px rgba(212,181,106,0.22)",
                    letterSpacing: "0.02em",
                  }}
                  initial={{ opacity: 0, y: 22, scale: 0.96, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  animate={{
                    textShadow: [
                      "0 0 8px rgba(212,181,106,0.10)",
                      "0 0 22px rgba(212,181,106,0.35)",
                      "0 0 12px rgba(212,181,106,0.16)",
                    ],
                    opacity: [0.9, 1, 0.92],
                  }}
                  transition={{
                    opacity: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                    y: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                    scale: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                    filter: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                    textShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  }}
                >
                  {arabicQuote}
                </motion.p>

                <motion.p
                  className="mt-3 text-[11px] tracking-[0.28em] uppercase text-[#24311f]/60 font-medium"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                >
                  Qur'an 30:21
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}