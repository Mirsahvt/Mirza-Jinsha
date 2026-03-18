"use client"

import { useEffect, useRef, useState } from "react"

interface EnvelopeProps {
  onOpen: () => void
}

export function Envelope({ onOpen }: EnvelopeProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)
  const [isEnding, setIsEnding] = useState(false)

  const vibrateTap = () => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate([8, 20, 8])
    }
  }

  const startVideo = async () => {
    const video = videoRef.current
    if (!video) return

    try {
      vibrateTap()
      await video.play()
      setStarted(true)
    } catch (err) {
      console.error("Video play failed", err)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => {
      setIsEnding(true)

      setTimeout(() => {
        onOpen()
      }, 900)
    }

    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("ended", handleEnded)
    }
  }, [onOpen])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#f6efe6] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isEnding ? "scale-110 opacity-0" : "scale-100 opacity-100"
      }`}
    >
      <div className="relative h-full w-full overflow-hidden">
        <video
          ref={videoRef}
          className={`h-full w-full object-contain transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            started ? "opacity-95" : "opacity-90"
          } ${isEnding ? "scale-105 opacity-70 blur-[1px]" : "scale-100"}`}
          playsInline
          muted
          preload="auto"
        >
          <source src="/videos/envelope.mp4" type="video/mp4" />
        </video>

        {/* soft luxury overlay */}
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10 transition-opacity duration-700 ${
            isEnding ? "opacity-80" : "opacity-100"
          }`}
        />

        {/* ending white glow */}
        <div
          className={`pointer-events-none absolute inset-0 bg-white transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isEnding ? "opacity-60" : "opacity-0"
          }`}
        />

        {!started && (
          <>
            {/* clickable seal zone */}
            <button
              onClick={startVideo}
              className="absolute left-1/2 top-[40%] h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent"
              aria-label="Open invitation"
            />

            {/* instruction text */}
            <div className="pointer-events-none absolute inset-x-0 bottom-[12%] flex justify-center px-6">
              <div className="rounded-full border border-white/20 bg-black/15 px-5 py-2.5 text-center text-sm tracking-[0.18em] text-white/75 backdrop-blur-md">
                PLEASE TAP THE SEAL
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}