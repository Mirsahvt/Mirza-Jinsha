"use client"

import { useEffect, useRef, useState } from "react"

interface EnvelopeProps {
  onOpen: () => void
}

export function Envelope({ onOpen }: EnvelopeProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)
  const [isEnding, setIsEnding] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

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
      video.currentTime = 0
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

    const handleCanPlay = () => {
      setVideoReady(true)
    }

    video.load()
    video.addEventListener("ended", handleEnded)
    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("loadeddata", handleCanPlay)

    return () => {
      video.removeEventListener("ended", handleEnded)
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("loadeddata", handleCanPlay)
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
          className={`h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            started ? "opacity-100" : "opacity-95"
          } ${isEnding ? "scale-105 opacity-70 blur-[1px]" : "scale-100"}`}
          playsInline
          muted
          preload="auto"
          poster="/images/envelope-poster.png"
        >
          <source src="/videos/envelope.mp4" type="video/mp4" />
        </video>

        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10 transition-opacity duration-700 ${
            isEnding ? "opacity-80" : "opacity-100"
          }`}
        />

        <div
          className={`pointer-events-none absolute inset-0 bg-white transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isEnding ? "opacity-60" : "opacity-0"
          }`}
        />

        {!started && (
          <>
            <button
              onClick={startVideo}
              className="absolute inset-0 z-10"
              aria-label="Open invitation"
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-[12%] flex justify-center px-6">
              <div className="rounded-full border border-white/20 bg-black/15 px-5 py-2.5 text-center text-sm tracking-[0.18em] text-white/75 backdrop-blur-md">
                {videoReady ? "PLEASE TAP THE SEAL" : "LOADING INVITATION"}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}