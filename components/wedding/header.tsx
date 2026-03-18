"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

interface HeaderProps {
  language: "ES" | "EN"
  onLanguageChange: (lang: "ES" | "EN") => void
}

// Cupid/Heart icon as elegant SVG
function CupidIcon() {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className="w-5 h-5 text-wine"
      fill="currentColor"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  )
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = {
    EN: [
      { label: "Home", href: "#home" },
      { label: "Our Story", href: "#our-story" },
      { label: "Events", href: "#events" },
      { label: "Venue", href: "#venue" },
      { label: "Program", href: "#program" },
      { label: "RSVP", href: "#rsvp" }
    ],
    ES: [
      { label: "Inicio", href: "#home" },
      { label: "Nuestra Historia", href: "#our-story" },
      { label: "Eventos", href: "#events" },
      { label: "Lugar", href: "#venue" },
      { label: "Programa", href: "#program" },
      { label: "RSVP", href: "#rsvp" }
    ]
  }

  const items = menuItems[language]

  return (
    <>
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-ivory/95 backdrop-blur-md border-b border-champagne/20 shadow-sm' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo - Elegant cupid/heart icon */}
          <motion.div 
            className="flex items-center gap-2.5"
            whileHover={{ scale: 1.02 }}
          >
            <CupidIcon />
            <span 
              className="text-foreground/80 text-sm tracking-[0.15em] uppercase font-light"
            >
              M & J
            </span>
          </motion.div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <div className="flex items-center bg-cream/50 backdrop-blur-sm rounded-full p-1 border border-champagne/20">
              <button
                onClick={() => onLanguageChange("EN")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all duration-200 ${
                  language === "EN" 
                    ? "bg-ivory text-wine shadow-sm" 
                    : "text-foreground/50 hover:text-foreground"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange("ES")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all duration-200 ${
                  language === "ES" 
                    ? "bg-ivory text-wine shadow-sm" 
                    : "text-foreground/50 hover:text-foreground"
                }`}
              >
                ES
              </button>
            </div>

            {/* Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-cream/50 backdrop-blur-sm border border-champagne/20 text-foreground/70 hover:text-wine hover:border-wine/30 transition-all"
              aria-label="Toggle menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-ivory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 -left-20 w-80 h-80 bg-sage/10 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-champagne/10 rounded-full blur-3xl" />
            </div>

            <nav className="relative h-full flex flex-col items-center justify-center px-4">
              <ul className="space-y-6 text-center">
                {items.map((item, index) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                  >
                    <a
                      href={item.href}
                      className="text-3xl md:text-4xl font-light text-foreground hover:text-wine transition-colors relative group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-wine transition-all duration-300 group-hover:w-full" />
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* Decorative element at bottom */}
              <motion.div 
                className="absolute bottom-12 flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-12 h-px bg-champagne/40" />
                <CupidIcon />
                <div className="w-12 h-px bg-champagne/40" />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
