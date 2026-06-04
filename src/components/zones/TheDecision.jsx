import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const paths = [
  {
    trigger: "Open a store.",
    headline: "Become a destination.",
    body: "Join 520 world-class brands in the highest-traffic retail environment in the Midwest. Luxury flagship to experiential pop-up. Every format has a proven path here.",
    cta: "Explore Leasing",
    href: "mailto:groupsales@mallofamerica.com",
    answer: "A destination, not a location."
  },
  {
    trigger: "Launch a campaign.",
    headline: "Become part of the conversation.",
    body: "40 million people. Your brand. In the context of Americas most visited destination. On-mall, digital, experiential. Every activation format available.",
    cta: "Explore Partnerships",
    href: "https://www.mallofamerica.com/partnership-opportunities",
    answer: "Part of the conversation."
  },
  {
    trigger: "Book a venue.",
    headline: "Become a cultural moment.",
    body: "400 plus events per year. Celebrity appearances, product launches, corporate activations, and more. MOA has the platform, the audience, and the infrastructure.",
    cta: "Inquire About Events",
    href: "mailto:groupsales@mallofamerica.com",
    answer: "A cultural moment, not a booking."
  }
]

export default function TheDecision() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const cardsRef = useRef([])
  const closingRef = useRef(null)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headlineRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: headlineRef.current, start: "top 80%" } })

      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: i * 0.15,
            scrollTrigger: { trigger: card, start: "top 85%" } })
      })

      gsap.fromTo(closingRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out",
          scrollTrigger: { trigger: closingRef.current, start: "top 85%" } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="the-decision"
      className="relative py-32 px-6"
      style={{ background: "#000000", minHeight: "100vh" }}
    >
      <div className="max-w-5xl mx-auto">

        <div ref={headlineRef} className="text-center mb-20" style={{ opacity: 0 }}>
          <p className="text-xs tracking-widest uppercase mb-6" style={{ color: "#C9A84C", fontFamily: "'Inter', sans-serif" }}>
            Your Next Move
          </p>
          <h2 className="text-4xl md:text-6xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            What do you become
            <br />
            <span style={{ color: "#C9A84C" }}>by being here?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 mb-20">
          {paths.map((path, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="border border-white border-opacity-5 transition-all duration-500 cursor-pointer"
              style={{ opacity: 0, background: expanded === i ? "rgba(201,168,76,0.05)" : "rgba(255,255,255,0.01)" }}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="p-8">
                <p className="text-2xl font-light text-white mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {path.trigger}
                </p>
                {expanded === i && (
                  <div>
                    <h3 className="text-lg font-light mb-4" style={{ color: "#C9A84C", fontFamily: "'Playfair Display', serif" }}>
                      {path.headline}
                    </h3>
                    <p className="text-sm mb-6" style={{ color: "#ffffff", opacity: 0.6, fontFamily: "'Inter', sans-serif", lineHeight: 1.8 }}>
                      {path.body}
                    </p>
                    <a
                      href={path.href}
                      target={path.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="inline-block text-xs tracking-widest uppercase px-6 py-3 border"
                      style={{ color: "#C9A84C", borderColor: "#C9A84C", fontFamily: "'Inter', sans-serif" }}
                      onClick={e => e.stopPropagation()}
                    >
                      {path.cta}
                    </a>
                  </div>
                )}
                {expanded !== i && (
                  <p className="text-xs tracking-widest uppercase" style={{ color: "#C9A84C", opacity: 0.5, fontFamily: "'Inter', sans-serif" }}>
                    {path.answer}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div ref={closingRef} className="text-center" style={{ opacity: 0 }}>
          <div className="w-px h-16 mx-auto mb-8" style={{ background: "linear-gradient(to bottom, #C9A84C, transparent)" }} />
          <p className="text-lg font-light" style={{ color: "#ffffff", opacity: 0.4, fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.8 }}>
            Mall of America does not sell space.
            <br />
            It transfers 30 years of earned attention
            <br />
            onto everything inside it.
          </p>
          <div className="mt-12 flex gap-8 justify-center flex-wrap">
            <a href="mailto:groupsales@mallofamerica.com" className="text-xs tracking-widest uppercase" style={{ color: "#C9A84C", fontFamily: "'Inter', sans-serif" }}>
              groupsales@mallofamerica.com
            </a>
            <a href="tel:9528838809" className="text-xs tracking-widest uppercase" style={{ color: "#ffffff", opacity: 0.4, fontFamily: "'Inter', sans-serif" }}>
              952.883.8809
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
