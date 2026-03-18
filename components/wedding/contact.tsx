"use client"

import { motion } from "framer-motion"
import { Phone, MessageCircle, Share2, MapPin, Heart } from "lucide-react"

interface ContactProps {
  language: "ES" | "EN"
}

export function Contact({ language }: ContactProps) {
  const content = {
    EN: {
      title: "Get in Touch",
      subtitle: "We would love to hear from you",
      openMap: "Open Map",
      callFamily: "Call Family",
      whatsappFamily: "WhatsApp",
      shareInvitation: "Share Invitation",
      footer: "Made with love",
      copyright: "Mirza & Jinsha"
    },
    ES: {
      title: "Contáctanos",
      subtitle: "Nos encantaría saber de ti",
      openMap: "Abrir Mapa",
      callFamily: "Llamar",
      whatsappFamily: "WhatsApp",
      shareInvitation: "Compartir",
      footer: "Hecho con amor",
      copyright: "Mirza & Jinsha"
    }
  }

  const { title, subtitle, openMap, callFamily, whatsappFamily, shareInvitation, footer, copyright } = content[language]

  const phoneNumber = "+911234567890"
  const mapUrl = "https://maps.google.com/?q=Rainbow+Convention+Centre+Keeramkundu+Malappuram+Kerala"
  const whatsappMessage = encodeURIComponent(
    language === "EN" 
      ? "Hello! I'm reaching out about Mirza & Jinsha's wedding." 
      : "¡Hola! Me comunico sobre la boda de Mirza y Jinsha."
  )
  const shareMessage = encodeURIComponent(
    language === "EN"
      ? "You're invited to Mirza & Jinsha's Wedding! April 25 & 26, 2026. Check out our invitation: "
      : "¡Estás invitado a la boda de Mirza y Jinsha! 25 y 26 de Abril, 2026. Mira nuestra invitación: "
  )

  const handleShare = async () => {
    const shareUrl = window.location.href
    
    // Try native share first
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Mirza & Jinsha Wedding Invitation",
          text: language === "EN" 
            ? "You're invited to our wedding! April 25 & 26, 2026"
            : "¡Estás invitado a nuestra boda! 25 y 26 de Abril, 2026",
          url: shareUrl
        })
        return
      } catch {
        // Fall back to WhatsApp share
      }
    }
    
    const whatsappShareUrl = `https://wa.me/?text=${shareMessage}${encodeURIComponent(shareUrl)}`
    window.open(whatsappShareUrl, "_blank")
  }

  const buttons = [
    {
      icon: MapPin,
      label: openMap,
      href: mapUrl,
      className: "bg-sage/15 border-sage/30 text-sage hover:bg-sage/25",
      iconClassName: "text-sage"
    },
    {
      icon: Phone,
      label: callFamily,
      href: `tel:${phoneNumber}`,
      className: "bg-ivory border-champagne/30 text-foreground hover:bg-cream",
      iconClassName: "text-wine"
    },
    {
      icon: MessageCircle,
      label: whatsappFamily,
      href: `https://wa.me/${phoneNumber.replace("+", "")}?text=${whatsappMessage}`,
      className: "bg-[#25D366]/10 border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20",
      iconClassName: "text-[#25D366]"
    },
    {
      icon: Share2,
      label: shareInvitation,
      onClick: handleShare,
      className: "bg-wine/10 border-wine/30 text-wine hover:bg-wine/20",
      iconClassName: "text-wine"
    }
  ]

  return (
    <section id="contact" className="py-24 bg-cream relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-champagne/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-3">
            {title}
          </h2>
          <p className="text-foreground/60">
            {subtitle}
          </p>
        </motion.div>

        {/* Action Buttons Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {buttons.map((button, index) => {
            const Icon = button.icon
            const Component = button.onClick ? 'button' : 'a'
            
            return (
              <motion.div
                key={button.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Component
                  {...(button.href ? { href: button.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                  {...(button.onClick ? { onClick: button.onClick } : {})}
                  className={`flex flex-col items-center justify-center gap-3 w-full aspect-square border rounded-2xl transition-all ${button.className}`}
                >
                  <Icon className={`w-6 h-6 ${button.iconClassName}`} />
                  <span className="text-sm font-medium">{button.label}</span>
                </Component>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-champagne/40" />
            <Heart className="w-4 h-4 text-wine/50 fill-wine/30" />
            <div className="w-16 h-px bg-champagne/40" />
          </div>
          
          <p 
            className="text-lg text-foreground/70 mb-2"
            style={{ fontFamily: "var(--font-script), cursive" }}
          >
            {footer}
          </p>
          <p 
            className="text-2xl text-foreground mb-4"
            style={{ fontFamily: "var(--font-script), cursive" }}
          >
            {copyright}
          </p>
          <p className="text-foreground/40 text-sm">
            © 2026
          </p>
        </motion.footer>
      </div>
    </section>
  )
}
