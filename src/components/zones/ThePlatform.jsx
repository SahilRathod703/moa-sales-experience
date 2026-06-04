import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const eventTypes = [
  "Concert and Performance",
  "Brand Activation",
  "Product Launch",
  "Celebrity Appearance",
  "Film Premiere",
  "Corporate Event",
  "Holiday Programming",
  "Charitable Initiative"
]

export default function ThePlatform() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const videoRef = useRef(null)
  const gridRef = useRef(null)
  const sponsorRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headlineRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: headlineRef.current, start: "top 80%" } })

      gsap.fromTo(videoRef.current,
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out",
          scrollTrigger: { trigger: videoRef.current, start: "top 75%" } })

      gsap.fromTo(gridRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" } })

      gsap.fromTo(sponsorRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sponsorRef.current, start: "top 80%" } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="the-platform"
      className="relative py-32 px-6"
      style={{ background: "#0A0A0A", minHeight: "100vh" }}
    >
      <div className="max-w-7xl mx-auto">

        <p className="text-xs tracking-widest uppercase mb-6" style={{ color: "#C9A84C", fontFamily: "'Inter', sans-serif" }}>
          Events and Partnerships
        </p>

        <div ref={headlineRef} style={{ opacity: 0 }}>
          <h2 className="text-4xl md:text-6xl font-light text-white leading-tight mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            400 events per year.
            <br />
            <span style={{ color: "#C9A84C" }}>One stage. Unlimited reach.</span>
          </h2>
          <p className="text-lg font-light max-w-2xl mb-16" style={{ color: "#ffffff", opacity: 0.5, fontFamily: "'Inter', sans-serif", lineHeight: 1.8 }}>
            Mall of America is not a venue you book.
            It is a platform you activate.
            The difference is what happens to your brand afterward.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-1 mb-16">
          <div className="relative overflow-hidden" style={{ height: "400px" }}>
            <img
              src="/assets/images/moa-holiday-real.webp"
              alt="MOA Holiday Events"
              className="w-full h-full object-cover"
              style={{ opacity: 0.6 }}
              loading="lazy"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0A0A0A 20%, transparent)" }} />
            <div className="absolute bottom-0 left-0 p-6">
              <p className="text-sm text-white" style={{ opacity: 0.7, fontFamily: "'Playfair Display', serif" }}>
                Holiday Programming
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden" style={{ height: "400px" }}>
            <img
              src="/assets/images/events-activation.webp"
              alt="Brand Activation"
              className="w-full h-full object-cover"
              style={{ opacity: 0.5 }}
              loading="lazy"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0A0A0A 20%, transparent)" }} />
            <div className="absolute bottom-0 left-0 p-6">
              <p className="text-sm text-white" style={{ opacity: 0.7, fontFamily: "'Playfair Display', serif" }}>
                Brand Activation
              </p>
            </div>
          </div>
        </div>

        <div ref={gridRef} style={{ opacity: 0 }}>
          <p className="text-xs tracking-widest uppercase mb-6" style={{ color: "#ffffff", opacity: 0.3, fontFamily: "'Inter', sans-serif" }}>
            Event Formats
          </p>
          <div className="flex flex-wrap gap-3 mb-16">
            {eventTypes.map((type, i) => (
              <span
                key={i}
                className="text-xs tracking-wider uppercase px-4 py-2 border border-white border-opacity-10"
                style={{ color: "#ffffff", opacity: 0.6, fontFamily: "'Inter', sans-serif" }}
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        <div ref={videoRef} className="mb-16" style={{ opacity: 0, aspectRatio: "16/9" }}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/_F9t5unnyWU?mute=1&controls=0&showinfo=0&rel=0&modestbranding=1"
            title="MOA Events"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ width: "100%", height: "100%" }}
            loading="lazy"
          />
        </div>

        <div ref={sponsorRef} className="grid grid-cols-1 md:grid-cols-2 gap-1" style={{ opacity: 0 }}>
          <div className="p-8" style={{ background: "rgba(201,168,76,0.05)", borderLeft: "2px solid #C9A84C" }}>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#C9A84C", fontFamily: "'Inter', sans-serif" }}>
              Sponsorship and Brand Partnerships
            </p>
            <h3 className="text-2xl font-light text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Your brand. 40 million people.
              In the context they trust.
            </h3>
            <p className="text-sm mb-6" style={{ color: "#ffffff", opacity: 0.5, fontFamily: "'Inter', sans-serif", lineHeight: 1.8 }}>
              On-mall signage, product sampling, experiential activations,
              digital integration. Every format available.
              Partners include Pepsi, Glossier, and leading brands.
            </p>
            <a
              href="https://www.mallofamerica.com/partnership-opportunities"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase"
              style={{ color: "#C9A84C", fontFamily: "'Inter', sans-serif" }}
            >
              Explore Partnership Opportunities
            </a>
          </div>

          <div className="p-8" style={{ background: "rgba(255,255,255,0.02)", borderLeft: "2px solid rgba(255,255,255,0.1)" }}>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#ffffff", opacity: 0.4, fontFamily: "'Inter', sans-serif" }}>
              Host Your Event Here
            </p>
            <h3 className="text-2xl font-light text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              A cultural moment,
              not a booking.
            </h3>
            <p className="text-sm mb-6" style={{ color: "#ffffff", opacity: 0.5, fontFamily: "'Inter', sans-serif", lineHeight: 1.8 }}>
              Celebrity appearances. Musical performances.
              Product launches. Movie premieres.
              MOA has the platform, the audience, and the infrastructure.
            </p>
            <a
              href="mailto:groupsales@mallofamerica.com"
              className="text-xs tracking-widest uppercase"
              style={{ color: "#ffffff", opacity: 0.6, fontFamily: "'Inter', sans-serif" }}
            >
              Inquire About Event Booking
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
