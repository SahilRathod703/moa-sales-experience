import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export default function EventHorizon({ onComplete }) {
  const containerRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const statsRef = useRef(null)
  const wordmarkRef = useRef(null)
  const scrollRef = useRef(null)
  const [showSkip, setShowSkip] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const introSeen = sessionStorage.getItem("introSeen")
    if (introSeen) {
      onComplete()
      return
    }

    const skipTimer = setTimeout(() => setShowSkip(true), 3000)
    const tl = gsap.timeline()

    tl.fromTo(line1Ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }, 1.5)

    tl.fromTo(line2Ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }, 4)

    tl.to([line1Ref.current, line2Ref.current],
      { opacity: 0, y: -20, duration: 1, ease: "power2.in" }, 7.5)

    tl.fromTo(statsRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" }, 9.5)

    tl.fromTo(wordmarkRef.current,
      { opacity: 0, letterSpacing: "0.2em" },
      { opacity: 1, letterSpacing: "0.6em", duration: 2.5, ease: "power2.out" }, 12)

    tl.fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }, 15)

    tl.call(() => {
      sessionStorage.setItem("introSeen", "true")
      setTimeout(() => onComplete(), 2500)
    }, [], 17)

    return () => {
      tl.kill()
      clearTimeout(skipTimer)
    }
  }, [])

  const handleSkip = () => {
    gsap.killTweensOf("*")
    sessionStorage.setItem("introSeen", "true")
    if (audioRef.current) audioRef.current.pause()
    gsap.to(containerRef.current, { opacity: 0, duration: 0.6, onComplete: onComplete })
  }

  const toggleAudio = () => {
    if (!audioRef.current) return
    if (audioEnabled) {
      audioRef.current.pause()
      setAudioEnabled(false)
    } else {
      audioRef.current.play().catch(() => {})
      setAudioEnabled(true)
    }
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: "#000000" }}
    >
      <audio ref={audioRef} src="/assets/audio/ambient.mp3" loop />

      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, #0a0a0a 0%, #000000 70%)" }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

        <div ref={line1Ref} style={{ opacity: 0 }}>
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-light text-white leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            What happens when 40 million people
            <br />
            <span style={{ color: "#C9A84C" }}>
              decide what is worth their attention?
            </span>
          </h1>
        </div>

        <div ref={line2Ref} className="mt-8" style={{ opacity: 0 }}>
          <p
            className="text-xl md:text-2xl font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#ffffff", opacity: 0.75, lineHeight: 1.8 }}
          >
            The most powerful destinations do not compete for attention.
            <br />
            <em>They become where it gathers.</em>
          </p>
        </div>

        <div ref={statsRef} className="mt-16" style={{ opacity: 0 }}>
          <div className="flex flex-wrap gap-8 md:gap-16 justify-center mb-12">
            {[
              { number: "40M+", label: "Annual Visitors" },
              { number: "520+", label: "Stores" },
              { number: "30", label: "Years" },
              { number: "1B+", label: "Memories" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p
                  className="text-3xl md:text-4xl font-light"
                  style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {stat.number}
                </p>
                <p
                  className="text-xs tracking-widest uppercase mt-2"
                  style={{ color: "#ffffff", opacity: 0.4, fontFamily: "'Inter', sans-serif" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div ref={wordmarkRef} style={{ opacity: 0 }}>
            <p
              className="text-xs md:text-sm uppercase"
              style={{ color: "#C9A84C", fontFamily: "'Inter', sans-serif", letterSpacing: "0.6em" }}
            >
              Mall of America
            </p>
          </div>
        </div>

        <div ref={scrollRef} className="mt-16" style={{ opacity: 0 }}>
          <p
            className="text-xs tracking-widest uppercase"
            style={{ color: "#ffffff", opacity: 0.3, fontFamily: "'Inter', sans-serif" }}
          >
            Scroll to explore
          </p>
          <div
            className="w-px h-12 mx-auto mt-3"
            style={{ background: "linear-gradient(to bottom, #C9A84C, transparent)" }}
          />
        </div>
      </div>

      {showSkip && (
        <button
          onClick={handleSkip}
          className="absolute bottom-8 right-8 text-xs tracking-widest uppercase transition-all duration-500"
          style={{ color: "#ffffff", opacity: 0.35, fontFamily: "'Inter', sans-serif" }}
        >
          Skip Intro
        </button>
      )}

      <button
        onClick={toggleAudio}
        className="absolute bottom-8 left-8 text-xs tracking-widest uppercase transition-all duration-300"
        style={{ color: "#ffffff", opacity: 0.35, fontFamily: "'Inter', sans-serif" }}
      >
        {audioEnabled ? "Sound On" : "Sound Off"}
      </button>
    </div>
  )
}
