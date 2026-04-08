"use client"

import { motion } from "framer-motion"
import { Shirt, Sparkles, Cross, HeartHandshake } from "lucide-react"

interface DressCodeProps {
  language: "ES" | "EN"
}

export function DressCode({ language }: DressCodeProps) {
  const content = {
    EN: {
      title: "Dress Code & Blessings",
      subtitle:
        "A gentle note on attire, and a warm message from the groom’s side with love in Christ.",
      dressTitle: "Dress Code",
      dressText:
        "Guests are welcome to wear any elegant color that beautifully complements the Groom.",
      menTitle: "For Men",
      menText: "Mundu and Kurta will be especially appreciated.",
      ladiesTitle: "For Ladies",
      ladiesText:
        "Any graceful and elegant attire in beautiful tones is warmly welcome.",
      noteTitle: "A Loving Note",
      noteText:
        "With joyful hearts in Christ, we warmly invite you to be part of our blessed celebration. Your presence, prayers, and blessings mean so much to us and to our families.",
      quoteTitle: "A Christian Blessing",
      quote:
        "“This is the day that the Lord has made; let us rejoice and be glad in it.”",
      verse: "Psalm 118:24",
      footer:
        "Come celebrate love, faith, and togetherness with us on this special day.",
    },
    ES: {
      title: "Dress Code & Blessings",
      subtitle:
        "A gentle note on attire, and a warm message from the groom’s side with love in Christ.",
      dressTitle: "Dress Code",
      dressText:
        "Guests are welcome to wear any elegant color that beautifully complements the Groom.",
      menTitle: "For Men",
      menText: "Mundu and Kurta will be especially appreciated.",
      ladiesTitle: "For Ladies",
      ladiesText:
        "Any graceful and elegant attire in beautiful tones is warmly welcome.",
      noteTitle: "A Loving Note",
      noteText:
        "With joyful hearts in Christ, we warmly invite you to be part of our blessed celebration. Your presence, prayers, and blessings mean so much to us and to our families.",
      quoteTitle: "A Christian Blessing",
      quote:
        "“This is the day that the Lord has made; let us rejoice and be glad in it.”",
      verse: "Psalm 118:24",
      footer:
        "Come celebrate love, faith, and togetherness with us on this special day.",
    },
  }

  const {
    title,
    subtitle,
    dressTitle,
    dressText,
    menTitle,
    menText,
    ladiesTitle,
    ladiesText,
    noteTitle,
    noteText,
    quoteTitle,
    quote,
    verse,
    footer,
  } = content[language]

  const dressItems = [
    {
      icon: Shirt,
      title: dressTitle,
      text: dressText,
    },
    {
      icon: Sparkles,
      title: menTitle,
      text: menText,
    },
    {
      icon: HeartHandshake,
      title: ladiesTitle,
      text: ladiesText,
    },
  ]

  return (
    <section
      id="dress-code"
      className="relative overflow-hidden py-24 md:py-28"
      style={{
        background:
          "linear-gradient(180deg, #f8dde7 0%, #f4d2de 18%, #f2dbe2 34%, #4a2a3a 62%, #2d1824 82%, #f3d8e2 100%)",
      }}
    >
      {/* background atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#ffeaf2]/85 via-[#f9dde8]/40 to-transparent" />
        <div className="absolute left-[6%] top-16 h-64 w-64 rounded-full bg-[#ffd7e5]/20 blur-2xl" />
        <div className="absolute right-[8%] top-24 h-72 w-72 rounded-full bg-[#ffc9dc]/14 blur-2xl" />
        <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7f4a65]/12 blur-2xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#ffe3ec]/12 blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_34%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* heading */}
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center md:mb-20"
          initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#c996ad] to-transparent" />
            <div className="h-2.5 w-2.5 rotate-45 border border-[#ddb4c7]/80 bg-white/75 shadow-[0_0_10px_rgba(255,255,255,0.30)]" />
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#c996ad] to-transparent" />
          </div>

          <h2
            className="mb-4 text-4xl md:text-5xl"
            style={{
              fontFamily: "var(--font-script), cursive",
              color: "#3f2433",
              textShadow:
                "0 1px 0 rgba(255,255,255,0.55), 0 8px 24px rgba(122,70,94,0.10)",
            }}
          >
            {title}
          </h2>

          <p className="mx-auto max-w-2xl text-sm leading-7 text-[#604151] md:text-base">
            {subtitle}
          </p>
        </motion.div>

        {/* new split layout */}
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* left side */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2.2rem] border border-white/25 bg-[#fff8fb]/88 p-6 shadow-[0_20px_60px_rgba(25,10,19,0.12)] md:p-8"
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.04)_36%,transparent_60%)]" />
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#efc8d7]/60 to-transparent" />
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full border border-[#f0cad8]/20" />

            <div className="relative z-10">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#edd0dc] bg-[#fff8fb] shadow-[0_10px_24px_rgba(79,44,61,0.08)]">
                  <Shirt className="h-6 w-6 text-[#5a3347]" />
                </div>
                <div>
                  <h3
                    className="text-[2rem] leading-none text-[#4b2d3d] md:text-[2.2rem]"
                    style={{ fontFamily: "var(--font-script), cursive" }}
                  >
                    {dressTitle}
                  </h3>
                  <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[#9a6c84]">
                    Elegant • Graceful • Warmly Welcome
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {dressItems.map((item, index) => {
                  const Icon = item.icon

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 24, scale: 0.98 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.7,
                        delay: 0.12 + index * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="group relative overflow-hidden rounded-[1.6rem] border border-[#efd4df] bg-white/80 p-5 shadow-[0_12px_30px_rgba(79,44,61,0.06)]"
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_58%)]" />
                      <div className="relative z-10 flex gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f7e6ee]">
                          <Icon className="h-5 w-5 text-[#6b4154]" />
                        </div>
                        <div>
                          <h4 className="mb-1 text-base font-semibold text-[#4b2d3d]">
                            {item.title}
                          </h4>
                          <p className="text-sm leading-7 text-[#6a5060]">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* right side */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2.2rem] border border-white/20 bg-[#4f2c3d] p-6 text-white shadow-[0_24px_70px_rgba(25,10,19,0.18)] md:p-8"
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_38%,rgba(255,255,255,0.03)_70%,transparent_100%)]" />
            <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_34%)]" />
            <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full border border-white/10" />

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.08 }}
                className="mb-8"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                  <Cross className="h-6 w-6 text-[#f5d7e4]" />
                </div>

                <h3
                  className="mb-3 text-[2rem] leading-none md:text-[2.2rem]"
                  style={{ fontFamily: "var(--font-script), cursive" }}
                >
                  {noteTitle}
                </h3>

                <p className="text-sm leading-8 text-white/82 md:text-[15px]">
                  {noteText}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: 0.16 }}
                className="relative overflow-hidden rounded-[1.8rem] border border-white/15 bg-white/10 p-6 md:p-7"
              >
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_60%)]" />
                <div className="relative z-10">
                  <p className="mb-3 text-xs uppercase tracking-[0.24em] text-[#f1cad9]">
                    {quoteTitle}
                  </p>

                  <p
                    className="text-lg italic leading-8 text-white/92 md:text-[1.35rem]"
                    style={{
                      fontFamily: '"Cormorant Garamond", serif',
                    }}
                  >
                    {quote}
                  </p>

                  <p className="mt-4 text-sm font-medium tracking-[0.14em] text-[#f3d5e1] uppercase">
                    {verse}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.24 }}
                className="mt-6 flex items-start gap-4 rounded-[1.6rem] border border-white/12 bg-[#5d3649]/70 p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                  <Sparkles className="h-5 w-5 text-[#f3d5e1]" />
                </div>
                <p className="text-sm leading-7 text-white/84">{footer}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}