import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function TheRecord() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const heroStatRef = useRef(null)
  const stat2Ref = useRef(null)
  const whyNowRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headlineRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: headlineRef.current, start: "top 80%" } })

      gsap.fromTo(heroStatRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: heroStatRef.current, start: "top 80%" } })

      gsap.fromTo(stat2Ref.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2,
          scrollTrigger: { trigger: stat2Ref.current, start: "top 80%" } })

      gsap.fromTo(whyNowRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: whyNowRef.current, start: "top 80%" } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="the-record"
      className="relative py-32 px-6"
      style={{ background: "#050505", minHeight: "100vh" }}
    >
      <div className="max-w-7xl mx-auto">

        <p className="text-xs tracking-widest uppercase mb-6" style={{ color: "#C9A84C", fontFamily: "'Inter', sans-serif" }}>
          The Record
        </p>

        <div ref={headlineRef} style={{ opacity: 0 }}>
          <h2 className="text-4xl md:text-6xl font-light text-white leading-tight mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            The numbers do not argue.
            <br />
            <span style={{ color: "#C9A84C" }}>They inform.</span>
          </h2>
          <p className="text-lg font-light max-w-2xl mb-20" style={{ color: "#ffffff", opacity: 0.5, fontFamily: "'Inter', sans-serif", lineHeight: 1.8 }}>
            This is not a highlight reel. This is what actually happens
            when a brand, event, or partner enters this orbit.
          </p>
        </div>

        <div ref={heroStatRef} className="mb-8 p-12 border border-white border-opacity-5" style={{ opacity: 0, background: "rgba(201,168,76,0.03)" }}>
          <p className="text-8xl md:text-9xl font-light mb-4" style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif" }}>
            230,000
          </p>
          <p className="text-xl font-light text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            People. One Day.
          </p>
          <p className="text-sm max-w-2xl" style={{ color: "#ffffff", opacity: 0.5, fontFamily: "'Inter', sans-serif", lineHeight: 1.8 }}>
            On Black Friday 2024, an estimated 230,000 people walked through
            these doors. The highest single-day attendance since MOA began
            tracking in 2011, according to retail industry reports.
          </p>
        </div>

        <div ref={stat2Ref} className="mb-20 p-12 border border-white border-opacity-5" style={{ opacity: 0, background: "rgba(255,255,255,0.01)" }}>
          <p className="text-8xl md:text-9xl font-light mb-4" style={{ color: "#ffffff", opacity: 0.15, fontFamily: "'Cormorant Garamond', serif" }}>
            30%
          </p>
          <p className="text-xl font-light text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Of tenants reported their best sales day.
          </p>
          <p className="text-sm max-w-2xl" style={{ color: "#ffffff", opacity: 0.5, fontFamily: "'Inter', sans-serif", lineHeight: 1.8 }}>
            Not their best day at MOA. Their best day across every location
            they operate. Anywhere. That is what association with this
            destination does to a brands commercial performance.
            Source: retail industry reports, Black Friday 2024.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { n: "40M+", l: "Annual Visitors" },
            { n: "$162", l: "Avg Spend Per Visit" },
            { n: "$1.25", l: "Spent Outside Per Dollar Inside" },
            { n: "2.5x", l: "International vs Local Spend" }
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-light" style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif" }}>
                {s.n}
              </p>
              <p className="text-xs tracking-widest uppercase mt-2" style={{ color: "#ffffff", opacity: 0.35, fontFamily: "'Inter', sans-serif" }}>
                {s.l}
              </p>
            </div>
          ))}
        </div>

        <div ref={whyNowRef} className="p-8 border-l-2" style={{ opacity: 0, borderColor: "#C9A84C", background: "rgba(201,168,76,0.03)" }}>
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#C9A84C", fontFamily: "'Inter', sans-serif" }}>
            Why 2024. Why Now.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              {[
                "Strongest visitor growth since reopening",
                "Black Friday 2024 all-time attendance record",
                "New experiential brands joining the ecosystem",
                "Current leasing and sponsorship opportunities available"
              ].map((point, i) => (
                <p key={i} className="text-sm mb-3" style={{ color: "#ffffff", opacity: 0.6, fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}>
                  {point}
                </p>
              ))}
            </div>
            <div>
              <p className="text-2xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif", lineHeight: 1.6 }}>
                The opportunity is not coming.
                <br />
                <span style={{ color: "#C9A84C" }}>It is already here.</span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
