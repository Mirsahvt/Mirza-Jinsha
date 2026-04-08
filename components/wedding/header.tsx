"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

interface HeaderProps {
  language: "ES" | "EN"
  onLanguageChange: (lang: "ES" | "EN") => void
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 text-[#f3c8d8]"
      fill="currentColor"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showHeader, setShowHeader] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 80)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = {
    EN: [
      { label: "Home", href: "#home" },
      { label: "Our Story", href: "#our-story" },
      { label: "Events", href: "#events" },
      { label: "Venue", href: "#venue" },
      { label: "Program", href: "#program" },
      { label: "RSVP", href: "#rsvp" },
    ],
    ES: [
      { label: "Inicio", href: "#home" },
      { label: "Nuestra Historia", href: "#our-story" },
      { label: "Eventos", href: "#events" },
      { label: "Lugar", href: "#venue" },
      { label: "Programa", href: "#program" },
      { label: "RSVP", href: "#rsvp" },
    ],
  }

  const items = menuItems[language]

  return (
    <>
      <AnimatePresence>
        {showHeader && (
          <motion.header
            className="fixed inset-x-0 top-0 z-50"
            initial={{ y: -120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -120, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto max-w-7xl px-3 pt-3 md:px-5 md:pt-4">
              <div
                className="relative overflow-hidden rounded-[1.35rem] border border-white/28 bg-white/18 shadow-[0_18px_50px_rgba(63,36,51,0.18)]"
                style={{
                  WebkitBackdropFilter: "blur(18px) saturate(145%)",
                  backdropFilter: "blur(18px) saturate(145%)",
                }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.04)_35%,transparent_70%)]" />
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                <div className="absolute -left-8 top-1/2 h-16 w-16 -translate-y-1/2 rounded-full bg-[#ffdbe8]/22 blur-2xl" />
                <div className="absolute -right-8 top-1/2 h-16 w-16 -translate-y-1/2 rounded-full bg-[#f0bfd2]/16 blur-2xl" />

                <div className="relative flex items-center justify-between px-4 py-3 md:px-5">
                  {/* Brand */}
                  <a
                    href="#home"
                    className="flex items-center gap-2.5"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex h-10 min-w-[82px] items-center justify-center gap-2 rounded-full border border-white/38 bg-white/18 px-3">
                      <span className="text-sm font-medium tracking-[0.16em] text-[#fff8fb]">
                        S
                      </span>
                      <HeartIcon />
                      <span className="text-sm font-medium tracking-[0.16em] text-[#fff8fb]">
                        J
                      </span>
                    </div>
                  </a>

                  {/* Right controls */}
                  <div className="flex items-center gap-2.5 md:gap-3">
                    <div className="flex items-center rounded-full border border-white/26 bg-white/12 p-1">
                      <button
                        onClick={() => onLanguageChange("EN")}
                        className={`rounded-full px-3 py-1.5 text-[11px] font-medium tracking-[0.16em] transition-all duration-300 ${
                          language === "EN"
                            ? "bg-white/82 text-[#5b3347] shadow-[0_6px_18px_rgba(91,51,71,0.10)]"
                            : "text-white/72 hover:text-white"
                        }`}
                      >
                        EN
                      </button>
                      <button
                        onClick={() => onLanguageChange("ES")}
                        className={`rounded-full px-3 py-1.5 text-[11px] font-medium tracking-[0.16em] transition-all duration-300 ${
                          language === "ES"
                            ? "bg-white/82 text-[#5b3347] shadow-[0_6px_18px_rgba(91,51,71,0.10)]"
                            : "text-white/72 hover:text-white"
                        }`}
                      >
                        ES
                      </button>
                    </div>

                    <motion.button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      aria-label="Toggle menu"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/26 bg-white/12 text-white shadow-[0_8px_18px_rgba(91,51,71,0.08)]"
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),transparent_60%)]" />
                      {isMenuOpen ? (
                        <X className="relative h-4.5 w-4.5" />
                      ) : (
                        <Menu className="relative h-4.5 w-4.5" />
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(248,223,232,0.96) 0%, rgba(242,210,221,0.95) 22%, rgba(98,59,77,0.94) 68%, rgba(42,24,34,0.96) 100%)",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_36%)]" />
            <div className="absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-[#ffd8e6]/18 blur-3xl" />
            <div className="absolute right-[8%] bottom-[16%] h-80 w-80 rounded-full bg-[#ffcfe0]/14 blur-3xl" />

            <nav className="relative flex h-full flex-col items-center justify-center px-4">
              <div className="mb-10 flex items-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-white/45 to-transparent" />
                <div className="flex items-center gap-2 rounded-full border border-white/28 bg-white/12 px-4 py-2">
                  <span className="text-sm tracking-[0.16em] text-white">S</span>
                  <HeartIcon />
                  <span className="text-sm tracking-[0.16em] text-white">J</span>
                </div>
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-white/45 to-transparent" />
              </div>

              <ul className="space-y-5 text-center md:space-y-6">
                {items.map((item, index) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
                    transition={{
                      delay: 0.08 + index * 0.07,
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="group relative inline-block text-[2rem] text-white md:text-[2.6rem]"
                      style={{ fontFamily: "var(--font-script), cursive" }}
                    >
                      <span className="relative z-10 transition-all duration-300 group-hover:text-[#ffe5ee]">
                        {item.label}
                      </span>
                      <span className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-400 group-hover:w-full" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}