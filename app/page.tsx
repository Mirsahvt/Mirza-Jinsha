"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Envelope } from "@/components/wedding/envelope"
import { Header } from "@/components/wedding/header"
import { Hero } from "@/components/wedding/hero"
import { DateReveal } from "@/components/wedding/date-reveal"
import { Countdown } from "@/components/wedding/countdown"
import { OurStory } from "@/components/wedding/our-story"
import { PhotoGallery } from "@/components/wedding/photo-gallery"
import { Events } from "@/components/wedding/events"
import { Venue } from "@/components/wedding/venue"
import { Timeline } from "@/components/wedding/timeline"
import { DressCode } from "@/components/wedding/dress-code"
import { FAQ } from "@/components/wedding/faq"
import { RSVP } from "@/components/wedding/rsvp"
import { Contact } from "@/components/wedding/contact"

export default function WeddingInvitation() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false)
  const [language, setLanguage] = useState<"ES" | "EN">("EN")

  const handleEnvelopeOpen = () => {
    setIsEnvelopeOpened(true)
    // Smooth scroll to top when invitation opens
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
      <main className="min-h-screen bg-gradient-to-b from-ivory via-cream to-sage/10">
      <AnimatePresence mode="wait">
        {!isEnvelopeOpened ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Envelope onOpen={handleEnvelopeOpen} />
          </motion.div>
        ) : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <Header language={language} onLanguageChange={setLanguage} />
            <Hero language={language} />
<DateReveal language={language} />
<Countdown language={language} />
            <OurStory language={language} />
            <PhotoGallery language={language} />
            <Events language={language} />
            <Venue language={language} />
            
            <DressCode language={language} />
            <FAQ language={language} />
            
            <Contact language={language} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
