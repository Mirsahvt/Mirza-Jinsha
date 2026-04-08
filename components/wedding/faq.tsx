"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle, Cross, Sparkles, HeartHandshake } from "lucide-react"

interface FAQProps {
  language: "ES" | "EN"
}

export function FAQ({ language }: FAQProps) {
  const content = {
    EN: {
      title: "Important Information",
      subtitle:
        "A few helpful notes for our beloved guests as you join us in this blessed celebration.",
      faqs: [
        {
          icon: Sparkles,
          question: "What should guests wear?",
          answer:
            "Guests are welcome to wear any elegant color that beautifully complements the Groom. For men, Mundu and Kurta will be especially appreciated.",
        },
        {
          icon: Cross,
          question: "Can children attend?",
          answer:
            "Yes, children are warmly welcome to be part of our celebration. We would be happy to have families join us on this joyful day.",
        },
        {
          icon: HeartHandshake,
          question: "What time should I arrive?",
          answer:
            "We recommend arriving 15 to 30 minutes before the ceremony begins, so you can settle in comfortably and be part of every special moment.",
        },
        {
          icon: HelpCircle,
          question: "Will lunch and reception follow the ceremony?",
          answer:
            "Yes. Betrothal and Wedding celebrations will be followed by lunch and reception as mentioned in the event schedule.",
        },
        {
          icon: Sparkles,
          question: "How can I find the venue easily?",
          answer:
            "You can use the map and directions buttons in the venue section of this invitation to reach each location easily.",
        },
      ],
      blessingTitle: "A Loving Reminder",
      blessingText:
        "Your presence, prayers, and blessings mean so much to us. Thank you for being part of our joy in Christ.",
    },
    ES: {
      title: "Important Information",
      subtitle:
        "A few helpful notes for our beloved guests as you join us in this blessed celebration.",
      faqs: [
        {
          icon: Sparkles,
          question: "What should guests wear?",
          answer:
            "Guests are welcome to wear any elegant color that beautifully complements the Groom. For men, Mundu and Kurta will be especially appreciated.",
        },
        {
          icon: Cross,
          question: "Can children attend?",
          answer:
            "Yes, children are warmly welcome to be part of our celebration. We would be happy to have families join us on this joyful day.",
        },
        {
          icon: HeartHandshake,
          question: "What time should I arrive?",
          answer:
            "We recommend arriving 15 to 30 minutes before the ceremony begins, so you can settle in comfortably and be part of every special moment.",
        },
        {
          icon: HelpCircle,
          question: "Will lunch and reception follow the ceremony?",
          answer:
            "Yes. Betrothal and Wedding celebrations will be followed by lunch and reception as mentioned in the event schedule.",
        },
        {
          icon: Sparkles,
          question: "How can I find the venue easily?",
          answer:
            "You can use the map and directions buttons in the venue section of this invitation to reach each location easily.",
        },
      ],
      blessingTitle: "A Loving Reminder",
      blessingText:
        "Your presence, prayers, and blessings mean so much to us. Thank you for being part of our joy in Christ.",
    },
  }

  const { title, subtitle, faqs, blessingTitle, blessingText } = content[language]

  return (
    <section
      id="faq"
      className="relative overflow-hidden py-24 md:py-28"
      style={{
        background:
          "linear-gradient(180deg, #f8dfe8 0%, #f4d3df 18%, #f1dce2 34%, #4a2a3a 62%, #2d1824 82%, #f3d8e2 100%)",
      }}
    >
      {/* background atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#ffeaf2]/85 via-[#f9dde8]/40 to-transparent" />
        <div className="absolute left-[6%] top-14 h-64 w-64 rounded-full bg-[#ffd7e5]/18 blur-2xl" />
        <div className="absolute right-[8%] top-24 h-72 w-72 rounded-full bg-[#ffc9dc]/14 blur-2xl" />
        <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7f4a65]/10 blur-2xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#ffe3ec]/10 blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_34%)]" />
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
          <motion.div
            className="mb-6 flex justify-center"
            initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-[#edd0dc] bg-[#fff8fb] shadow-[0_12px_28px_rgba(79,44,61,0.10)]">
              <div className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.24),transparent_60%)]" />
              <HelpCircle className="relative h-7 w-7 text-[#5a3347]" />
            </div>
          </motion.div>

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

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* accordion column */}
          <motion.div
            initial={{ opacity: 0, x: -35, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => {
                const Icon = faq.icon

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.75,
                      delay: index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <AccordionItem
                      value={`item-${index}`}
                      className="group overflow-hidden rounded-[1.7rem] border border-white/25 bg-[#fff8fb]/88 px-0 shadow-[0_16px_40px_rgba(79,44,61,0.08)]"
                    >
                      <div className="relative">
                        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#e6bfd0] via-[#b97896] to-[#e6bfd0] opacity-70 transition-opacity duration-300 group-data-[state=open]:opacity-100" />
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(255,255,255,0.03)_35%,transparent_65%)]" />

                        <AccordionTrigger className="relative px-6 py-5 text-left hover:no-underline">
                          <div className="flex w-full items-center gap-4 pr-4">
                            <motion.div
                              className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#edd0dc] bg-[#fff8fb] shadow-[0_10px_24px_rgba(79,44,61,0.06)]"
                              whileHover={{ rotate: 6, scale: 1.04 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(135deg,rgba(255,255,255,0.25),transparent_60%)]" />
                              <Icon className="relative h-5 w-5 text-[#6b4154]" />
                            </motion.div>

                            <span className="text-base font-medium leading-7 text-[#4b2d3d] md:text-[1.02rem]">
                              {faq.question}
                            </span>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent className="relative px-6 pb-6">
                          <div className="ml-16 rounded-[1.2rem] border border-[#f1d7e1] bg-white/75 p-4 shadow-[0_8px_20px_rgba(79,44,61,0.04)]">
                            <p className="text-sm leading-7 text-[#6a5060] md:text-[15px]">
                              {faq.answer}
                            </p>
                          </div>
                        </AccordionContent>
                      </div>
                    </AccordionItem>
                  </motion.div>
                )
              })}
            </Accordion>
          </motion.div>

          {/* side blessing panel */}
          <motion.div
            initial={{ opacity: 0, x: 35, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-[#4f2c3d] p-6 text-white shadow-[0_22px_60px_rgba(25,10,19,0.16)] md:p-8"
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_38%,rgba(255,255,255,0.03)_70%,transparent_100%)]" />
            <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_34%)]" />
            <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full border border-white/10" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.75, delay: 0.08 }}
                  className="mb-8"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                    <HeartHandshake className="h-6 w-6 text-[#f5d7e4]" />
                  </div>

                  <h3
                    className="mb-4 text-[2rem] leading-none md:text-[2.2rem]"
                    style={{ fontFamily: "var(--font-script), cursive" }}
                  >
                    {blessingTitle}
                  </h3>

                  <p className="text-sm leading-8 text-white/84 md:text-[15px]">
                    {blessingText}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, delay: 0.16 }}
                  className="relative overflow-hidden rounded-[1.8rem] border border-white/14 bg-white/10 p-6"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_60%)]" />
                  <div className="relative z-10">
                    <p className="mb-3 text-xs uppercase tracking-[0.24em] text-[#f1cad9]">
                      In Christ, With Joy
                    </p>
                    <p
                      className="text-lg italic leading-8 text-white/92 md:text-[1.25rem]"
                      style={{ fontFamily: '"Cormorant Garamond", serif' }}
                    >
                      “We are grateful for your presence in our lives and in this
                      blessed celebration.”
                    </p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.24 }}
                className="mt-6"
              >
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#efc8d7]/50 to-transparent" />
                  <Sparkles className="h-4 w-4 text-[#efc8d7]" />
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#efc8d7]/50 to-transparent" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}