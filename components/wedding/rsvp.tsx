"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Check, Send, Heart } from "lucide-react"

interface RSVPProps {
  language: "ES" | "EN"
}

export function RSVP({ language }: RSVPProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    guests: "",
    attendance: "",
    message: ""
  })

  const content = {
    EN: {
      title: "RSVP",
      subtitle: "Confirm your attendance",
      nameLabel: "Full Name",
      namePlaceholder: "Enter your full name",
      guestsLabel: "Number of Guests",
      guestsPlaceholder: "How many will attend?",
      attendanceLabel: "Will you attend?",
      attendancePlaceholder: "Select your response",
      messageLabel: "Message for the Couple",
      messagePlaceholder: "Write a special message or wishes...",
      submit: "Confirm Attendance",
      success: "Thank you!",
      successSubtitle: "Your response has been recorded",
      successMessage: "We can't wait to celebrate with you.",
      attendanceOptions: ["Yes, I will attend", "Sorry, I cannot attend", "Not sure yet"]
    },
    ES: {
      title: "RSVP",
      subtitle: "Confirma tu asistencia",
      nameLabel: "Nombre Completo",
      namePlaceholder: "Ingresa tu nombre completo",
      guestsLabel: "Número de Invitados",
      guestsPlaceholder: "¿Cuántos asistirán?",
      attendanceLabel: "¿Asistirás?",
      attendancePlaceholder: "Selecciona tu respuesta",
      messageLabel: "Mensaje para la Pareja",
      messagePlaceholder: "Escribe un mensaje especial o deseos...",
      submit: "Confirmar Asistencia",
      success: "¡Gracias!",
      successSubtitle: "Tu respuesta ha sido registrada",
      successMessage: "No podemos esperar para celebrar contigo.",
      attendanceOptions: ["Sí, asistiré", "Lo siento, no puedo asistir", "Aún no estoy seguro"]
    }
  }

  const { 
    title, 
    subtitle,
    nameLabel, 
    namePlaceholder, 
    guestsLabel, 
    guestsPlaceholder,
    attendanceLabel,
    attendancePlaceholder,
    messageLabel, 
    messagePlaceholder, 
    submit,
    success,
    successSubtitle,
    successMessage,
    attendanceOptions
  } = content[language]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log("RSVP submitted:", formData)
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section id="rsvp" className="py-24 bg-ivory relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-sage/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-wine/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              className="max-w-lg mx-auto text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div 
                className="w-24 h-24 mx-auto mb-8 bg-sage/15 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-ivory" />
                </div>
              </motion.div>
              
              <motion.h2 
                className="text-4xl font-light text-foreground mb-3"
                style={{ fontFamily: "var(--font-script), cursive" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {success}
              </motion.h2>
              
              <motion.p
                className="text-foreground/70 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {successSubtitle}
              </motion.p>
              
              <motion.p 
                className="text-foreground/50 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {successMessage}
              </motion.p>

              {/* Decorative hearts */}
              <motion.div 
                className="flex justify-center gap-4 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    <Heart className={`w-4 h-4 ${i === 1 ? 'text-wine fill-wine' : 'text-champagne/50 fill-champagne/30'}`} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 
                  className="text-4xl md:text-5xl font-light text-foreground mb-3"
                  style={{ fontFamily: "var(--font-script), cursive" }}
                >
                  {title}
                </h2>
                <p className="text-foreground/60">
                  {subtitle}
                </p>
              </motion.div>

              <motion.div
                className="max-w-lg mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-foreground">
                      {nameLabel}
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder={namePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-12 bg-cream/50 border-champagne/30 rounded-xl focus:border-sage focus:ring-sage text-base"
                    />
                  </div>

                  {/* Two columns for guests and attendance */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Number of Guests */}
                    <div className="space-y-2">
                      <label htmlFor="guests" className="block text-sm font-medium text-foreground">
                        {guestsLabel}
                      </label>
                      <Select
                        value={formData.guests}
                        onValueChange={(value) => setFormData({ ...formData, guests: value })}
                      >
                        <SelectTrigger className="h-12 bg-cream/50 border-champagne/30 rounded-xl focus:border-sage focus:ring-sage">
                          <SelectValue placeholder={guestsPlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6].map((num) => (
                            <SelectItem key={num} value={String(num)}>
                              {num} {num === 1 ? (language === 'EN' ? 'Guest' : 'Invitado') : (language === 'EN' ? 'Guests' : 'Invitados')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Attendance Confirmation */}
                    <div className="space-y-2">
                      <label htmlFor="attendance" className="block text-sm font-medium text-foreground">
                        {attendanceLabel}
                      </label>
                      <Select
                        value={formData.attendance}
                        onValueChange={(value) => setFormData({ ...formData, attendance: value })}
                      >
                        <SelectTrigger className="h-12 bg-cream/50 border-champagne/30 rounded-xl focus:border-sage focus:ring-sage">
                          <SelectValue placeholder={attendancePlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {attendanceOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-foreground">
                      {messageLabel}
                    </label>
                    <Textarea
                      id="message"
                      placeholder={messagePlaceholder}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="bg-cream/50 border-champagne/30 rounded-xl focus:border-sage focus:ring-sage resize-none text-base"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-wine hover:bg-wine/90 text-ivory text-lg rounded-full transition-all shadow-lg disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <motion.div
                          className="w-5 h-5 border-2 border-ivory/30 border-t-ivory rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <span className="flex items-center gap-2">
                          {submit}
                          <Send className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
