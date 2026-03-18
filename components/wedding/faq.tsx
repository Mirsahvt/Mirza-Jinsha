"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

interface FAQProps {
  language: "ES" | "EN"
}

export function FAQ({ language }: FAQProps) {
  const content = {
    EN: {
      title: "Important Information",
      subtitle: "Frequently asked questions",
      faqs: [
        {
          question: "Can I drive my own car?",
          answer: "Absolutely! If you prefer to drive, there is ample parking available at the venue. We recommend arriving 30 minutes early to find a good spot."
        },
        {
          question: "Is there parking available?",
          answer: "Yes, the venue has a large, secure parking area that can accommodate all guests. Parking is complimentary."
        },
        {
          question: "Can children attend?",
          answer: "We love little ones! Children are welcome to attend our celebration. Please let us know in your RSVP so we can arrange appropriate seating and meals."
        },
        {
          question: "How do I contact the family?",
          answer: "You can reach us through the contact buttons at the bottom of this invitation. We're available via phone call or WhatsApp for any questions."
        },
        {
          question: "What time should I arrive?",
          answer: "We recommend arriving 15-30 minutes before the event start time. This gives you time to park, find your seat, and settle in comfortably."
        }
      ]
    },
    ES: {
      title: "Información Importante",
      subtitle: "Preguntas frecuentes",
      faqs: [
        {
          question: "¿Puedo ir en mi propio coche?",
          answer: "¡Por supuesto! Si prefiere conducir, hay amplio estacionamiento disponible en el lugar. Recomendamos llegar 30 minutos antes."
        },
        {
          question: "¿Hay estacionamiento disponible?",
          answer: "Sí, el lugar tiene un área de estacionamiento grande y segura que puede acomodar a todos los invitados. El estacionamiento es gratuito."
        },
        {
          question: "¿Pueden asistir los niños?",
          answer: "¡Amamos a los pequeños! Los niños son bienvenidos a nuestra celebración. Por favor, indíquelo en su RSVP para que podamos organizar asientos y comidas apropiadas."
        },
        {
          question: "¿Cómo puedo contactar a la familia?",
          answer: "Puede comunicarse con nosotros a través de los botones de contacto en la parte inferior de esta invitación. Estamos disponibles por teléfono o WhatsApp."
        },
        {
          question: "¿A qué hora debo llegar?",
          answer: "Recomendamos llegar 15-30 minutos antes de la hora de inicio del evento. Esto le da tiempo para estacionar, encontrar su asiento y acomodarse."
        }
      ]
    }
  }

  const { title, subtitle, faqs } = content[language]

  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-sage/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-wine/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="w-14 h-14 mx-auto mb-6 bg-sage/15 rounded-full flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-sage" />
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-3">
            {title}
          </h2>
          <p className="text-foreground/60">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-ivory/80 backdrop-blur-sm border border-champagne/20 rounded-2xl px-6 overflow-hidden shadow-sm data-[state=open]:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left text-foreground hover:no-underline py-5 text-base font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/65 pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
