"use client"

import { motion } from "framer-motion"
import {
  Phone,
  MessageCircle,
  Share2,
  MapPin,
  Heart,
  Instagram,
} from "lucide-react"

interface ContactProps {
  language: "EN" | "ES"
}

export function Contact({ language }: ContactProps) {

  const phoneNumber = "+971508577054"

  const mapUrl =
    "https://maps.google.com/?q=Sacred+Heart+Church+Angadikadavu"

  const shareMessage = encodeURIComponent(
    "You're warmly invited to Stebin & Jesna's Wedding Celebration 💍"
  )

  const handleShare = async () => {
    const url = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Wedding Invitation",
          text: "With joyful hearts in Christ, we warmly invite you to be part of our special day.Your presence, prayers, and blessings mean so much to us and to our families.Come celebrate love, faith, and togetherness with us.",
          url,
        })
        return
      } catch {}
    }

    window.open(`https://wa.me/?text=${shareMessage}%20${url}`, "_blank")
  }

  const buttons = [
    {
      icon: MapPin,
      label: "Venue Map",
      href: mapUrl,
      style:
        "bg-white/80 text-[#5a3347] border border-white/50",
    },
    {
      icon: Phone,
      label: "Call Family",
      href: `tel:${phoneNumber}`,
      style:
        "bg-white/80 text-[#5a3347] border border-white/50",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: `https://wa.me/${phoneNumber.replace("+", "")}`,
      style:
        "bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30",
    },
    {
      icon: Share2,
      label: "Share Invitation",
      onClick: handleShare,
      style:
        "bg-[#4f2c3d] text-white border border-[#4f2c3d]",
    },
  ]

  return (
    <section
      id="contact"
      className="relative py-24 px-4 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg,#f7dbe5 0%,#f3d3df 25%,#e7c1d0 55%,#7e5165 80%,#3f2433 100%)",
      }}
    >

      <div className="max-w-5xl mx-auto text-center">

        {/* Title */}
        <motion.h2
          className="text-4xl md:text-6xl mb-4"
          style={{
            fontFamily: "var(--font-script), cursive",
            color: "#4b2a3a",
          }}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          With Love, We Await Your Presence
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="max-w-3xl mx-auto text-sm md:text-base leading-7 mb-12 text-[#6a4456]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Your prayers, blessings and presence will make our celebration even
          more meaningful. We would be truly honored to celebrate this sacred
          day with you.
        </motion.p>

        {/* Glass Card */}
        <motion.div
          className="rounded-3xl p-10 backdrop-blur-xl border border-white/40 bg-white/30 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >

          {/* Blessing Title */}
          <p className="uppercase text-xs tracking-[0.3em] mb-4 text-[#7a4a61]">
            A Final Blessing
          </p>

          {/* Quote */}
          <p
            className="italic text-xl md:text-2xl text-[#3f2433]"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            “This is the day that the Lord has made; let us rejoice and be glad in it.”
          </p>

          <p className="text-sm mt-3 text-[#9b6c82] uppercase tracking-[0.2em]">
            Psalm 118:24
          </p>

          <p className="mt-6 text-sm leading-8 text-[#5b3748] max-w-xl mx-auto">
            With joyful hearts in Christ, we warmly welcome you to be part of our
            wedding celebration.
          </p>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-10">

            {buttons.map((btn, i) => {
              const Icon = btn.icon
              const Component = btn.onClick ? "button" : "a"

              return (
                <Component
                  key={i}
                  {...(btn.href ? { href: btn.href, target: "_blank" } : {})}
                  {...(btn.onClick ? { onClick: btn.onClick } : {})}
                  className={`flex flex-col items-center justify-center gap-2 p-6 rounded-xl ${btn.style} hover:scale-105 transition`}
                >
                  <Icon size={22} />
                  <span className="text-sm font-medium">
                    {btn.label}
                  </span>
                </Component>
              )
            })}
          </div>

        </motion.div>

        {/* Footer */}
        <div className="mt-16 text-center">

          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-14 h-px bg-white/40"></div>
            <Heart className="w-4 h-4 text-pink-200 fill-pink-200" />
            <div className="w-14 h-px bg-white/40"></div>
          </div>

          <p
            className="text-lg text-white"
            style={{ fontFamily: "var(--font-script), cursive" }}
          >
            Made with love, prayer and grace
          </p>

          <p
            className="text-3xl text-white mt-2"
            style={{ fontFamily: "var(--font-script), cursive" }}
          >
            Stebin & Jesna
          </p>

          <p className="text-white/70 text-sm mt-2">
            © 2026 InviteScroll
          </p>

          {/* InviteScroll Tag */}
          <div className="mt-6 flex flex-col items-center gap-2">

            <div className="flex items-center gap-3">
              <div className="w-10 h-px bg-white/40"></div>
              <Heart className="w-3 h-3 text-pink-200 fill-pink-200" />
              <div className="w-10 h-px bg-white/40"></div>
            </div>

            <p
              className="text-white text-sm"
              style={{ fontFamily: "var(--font-script), cursive" }}
            >
              InviteScroll
            </p>

            <div className="flex items-center gap-4 text-xs text-white/80">

              <span className="flex items-center gap-1">
                <Phone size={14} />
                050 857 7054
              </span>

              <span className="flex items-center gap-1">
                <Instagram size={14} />
                @invitescroll
              </span>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}