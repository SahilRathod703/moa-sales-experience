import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  {
    number: "40M+",
    label: "Annual Visitors",
    observation: "40 million people walk through these doors every year.",
    implication: "More than the entire population of California.",
    outcome: "Your brand does not find the audience. The audience is already here."
  },
  {
    number: "40%",
    label: "Travel 150+ Miles",
    observation: "4 in 10 visitors travel specifically to come here.",
    implication: "This is not a local shopping trip. It is a destination decision.",
    outcome: "Your store becomes worth traveling for."
  },
  {
    number: "$162",
    label: "Avg Spend Per Visit",
    observation: "Every visitor spends 162 dollars inside MOA per visit.",
    implication: "These are not window shoppers.",
    outcome: "Your revenue potential per visitor is quantifiable from day one."
  },
  {
    number: "1B+",
    label: "Total Visits Since 1992",
    observation: "More than one billion people have visited since opening.",
    implication: "This is not a trend. It is a permanent institution.",
    outcome: "You align your brand with 30 years of earned trust."
  }
]

export default function ThePull() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const videoRef = useRef(null)
  const statsRef = useRef([])
  const whyNowRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headlineRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: headlineRef.current, start: "top 80%" } })

      gsap.fromTo(videoRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out",
          scrollTrigger: { trigger: videoRef.current, start: "top 75%" } })

      statsRef.current.forEach((stat, i) => {
        gsap.fromTo(stat,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: i * 0.15,
            scrollTrigger: { trigger: stat, start: "top 85%" } })
      })

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
      id="the-pull"
      className="relative py-32 px-6"
      style={{ background: "#0A0A0A", minHeight: "100vh" }}
    >
      <div className="max-w-7xl mx-auto">

        <p className="text-xs tracking-widest uppercase mb-6" style={{ color: "#C9A84C", fontFamily: "'Inter', sans-serif" }}>
          Why This Property
        </p>

        <div ref={headlineRef} style={{ opacity: 0 }}>
          <h2 className="text-4xl md:text-6xl font-light text-white leading-tight mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            More people walk through
            <br />
            these doors than live in
            <br />
            <span style={{ color: "#C9A84C" }}>the state of California.</span>
          </h2>
          <p className="text-lg font-light max-w-2xl" style={{ color: "#ffffff", opacity: 0.5, fontFamily: "'Inter', sans-serif", lineHeight: 1.8 }}>
            The largest retail and entertainment complex in North America.
            Located at the center of everything.
          </p>
        </div>

        <div ref={videoRef} className="mt-16 overflow-hidden" style={{ opacity: 0, aspectRatio: "16/9", maxHeight: "500px" }}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/oIoBwLK8JqM?autoplay=1&mute=1&loop=1&playlist=oIoBwLK8JqM&controls=0&showinfo=0&rel=0&modestbranding=1"
            title="Mall of America"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
          {stats.map((stat, i) => (
            <div
              key={i}
              ref={el => statsRef.current[i] = el}
              className="p-8 border border-white border-opacity-5 transition-all duration-500"
              style={{ opacity: 0, background: "rgba(255,255,255,0.02)" }}
            >
              <p className="text-5xl font-light mb-2" style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif" }}>
                {stat.number}
              </p>
              <p className="text-xs tracking-widest uppercase mb-6" style={{ color: "#ffffff", opacity: 0.4, fontFamily: "'Inter', sans-serif" }}>
                {stat.label}
              </p>
              <p className="text-sm mb-2" style={{ color: "#ffffff", opacity: 0.7, fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}>
                {stat.observation}
              </p>
              <p className="text-sm mb-4" style={{ color: "#C9A84C", opacity: 0.8, fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}>
                {stat.implication}
              </p>
              <p className="text-sm font-medium" style={{ color: "#ffffff", fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}>
                {stat.outcome}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 relative">
          <img
            src="/assets/images/regional-map.webp"
            alt="MOA Regional Reach"
            className="w-full max-w-3xl mx-auto block"
            style={{ opacity: 0.85 }}
            loading="lazy"
          />
          <div className="text-center mt-6">
            <p className="text-xs tracking-widest uppercase" style={{ color: "#C9A84C", fontFamily: "'Inter', sans-serif" }}>
              The Reach
            </p>
            <p className="text-sm mt-2" style={{ color: "#ffffff", opacity: 0.4, fontFamily: "'Inter', sans-serif" }}>
              40 percent of visitors travel 150 plus miles. Every US state. Every week.
            </p>
          </div>
        </div>

        <div ref={whyNowRef} className="mt-20 p-8 border-l-2" style={{ opacity: 0, borderColor: "#C9A84C", background: "rgba(201,168,76,0.03)" }}>
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#C9A84C", fontFamily: "'Inter', sans-serif" }}>
            Why Now
          </p>
          <h3 className="text-2xl font-light text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            The window is open.
          </h3>
          <p className="text-sm" style={{ color: "#ffffff", opacity: 0.6, fontFamily: "'Inter', sans-serif", lineHeight: 1.8 }}>
            2024 marked the strongest visitor growth since reopening.
            Black Friday 2024 set an all-time attendance record.
            New experiential brands are joining the ecosystem now.
            The momentum is real. The opportunity is current.
          </p>
        </div>
      </div>
    </section>
  )
}
