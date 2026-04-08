"use client"

import { useEffect, useRef, useState } from "react"
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
import { DressCode } from "@/components/wedding/dress-code"
import { FAQ } from "@/components/wedding/faq"
import { Contact } from "@/components/wedding/contact"

export default function WeddingInvitation() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false)
  const [language, setLanguage] = useState<"ES" | "EN">("EN")
  const [isMuted, setIsMuted] = useState(true)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleEnvelopeOpen = async () => {
    setIsEnvelopeOpened(true)
    window.scrollTo({ top: 0, behavior: "smooth" })

    const audio = audioRef.current
    if (!audio) return

    try {
      audio.volume = 0.3
      audio.loop = true
      await audio.play()
      setIsMuted(false)
    } catch (error) {
      console.error("Audio autoplay blocked:", error)
    }
  }

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isMuted) {
        audio.volume = 0.3
        await audio.play()
        setIsMuted(false)
      } else {
        audio.pause()
        setIsMuted(true)
      }
    } catch (error) {
      console.error("Audio play failed:", error)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.3
    audio.loop = true
  }, [])

  return (
    <main className="min-h-screen bg-ivory">
      <audio ref={audioRef} preload="auto">
        <source src="/audio/wedding-music.mp3" type="audio/mpeg" />
      </audio>

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
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <Header language={language} onLanguageChange={setLanguage} />
            <Hero
              language={language}
              isMuted={isMuted}
              onToggleMusic={toggleMusic}
            />
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