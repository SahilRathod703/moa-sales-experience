import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const attractions = [
  {
    name: "Nickelodeon Universe",
    tag: "Americas Largest Indoor Theme Park",
    stat: "7 acres, 27 rides",
    body: "The nations largest indoor theme park built around the most recognized childrens entertainment brand.",
    image: "/assets/images/moa-nickelodeon-real.webp"
  },
  {
    name: "SEA LIFE Minnesota Aquarium",
    tag: "10,000+ Sea Creatures",
    stat: "1.3 million gallon tank",
    body: "One of the most visited aquariums in the country. Nose to nose with sharks and sea turtles.",
    image: "/assets/images/moa-sealife-real.webp"
  },
  {
    name: "Crayola Experience",
    tag: "25+ Hands-On Activities",
    stat: "60,000 sq ft of imagination",
    body: "Where color, chemistry and technology combine. One of only five locations in the country.",
    image: "/assets/images/moa-crayola-real.webp"
  },
  {
    name: "FlyOver America",
    tag: "Aerial Flight Simulation",
    stat: "A national landmark in 8 minutes",
    body: "A breathtaking aerial tour of Americas greatest landscapes. Unlike anything else in retail.",
    image: "/assets/images/attractions-hero.webp"
  }
]

export default function TheEnergy() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const cardsRef = useRef([])
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headlineRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: headlineRef.current, start: "top 80%" } })

      gsap.fromTo(heroRef.current,
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out",
          scrollTrigger: { trigger: heroRef.current, start: "top 75%" } })

      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: i * 0.1,
            scrollTrigger: { trigger: card, start: "top 85%" } })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="the-energy"
      className="relative py-32 px-6"
      style={{ background: "#000000", minHeight: "100vh" }}
    >
      <div className="max-w-7xl mx-auto">

        <p className="text-xs tracking-widest uppercase mb-6" style={{ color: "#C9A84C", fontFamily: "'Inter', sans-serif" }}>
          Attractions and Entertainment
        </p>

        <div ref={headlineRef} style={{ opacity: 0 }}>
          <h2 className="text-4xl md:text-6xl font-light text-white leading-tight mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            They do not just come to shop.
            <br />
            <span style={{ color: "#C9A84C" }}>
              They come because nothing
              <br />else compares to this.
            </span>
          </h2>
          <p className="text-lg font-light max-w-2xl mb-16" style={{ color: "#ffffff", opacity: 0.5, fontFamily: "'Inter', sans-serif", lineHeight: 1.8 }}>
            Seven world-class attractions under one roof.
            The single greatest concentration of family
            entertainment in the United States.
          </p>
        </div>

        <div ref={heroRef} className="mb-16 relative overflow-hidden" style={{ opacity: 0, height: "500px" }}>
          <img
            src="/assets/images/crowd-energy.webp"
            alt="MOA Energy"
            className="w-full h-full object-cover"
            style={{ opacity: 0.7 }}
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-end p-8" style={{ background: "linear-gradient(to top, #000000 20%, transparent)" }}>
            <p className="text-sm" style={{ color: "#ffffff", opacity: 0.5, fontFamily: "'Inter', sans-serif" }}>
              The reason they came in the first place.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {attractions.map((attraction, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="group relative overflow-hidden border border-white border-opacity-5 transition-all duration-500"
              style={{ opacity: 0 }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={attraction.image}
                  alt={attraction.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ opacity: 0.6 }}
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #000 40%, transparent)" }} />
              </div>
              <div className="p-6">
                <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "#C9A84C", fontFamily: "'Inter', sans-serif" }}>
                  {attraction.tag}
                </p>
                <h3 className="text-2xl font-light text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {attraction.name}
                </h3>
                <p className="text-xs tracking-wide mb-4" style={{ color: "#C9A84C", opacity: 0.7, fontFamily: "'Inter', sans-serif" }}>
                  {attraction.stat}
                </p>
                <p className="text-sm" style={{ color: "#ffffff", opacity: 0.5, fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}>
                  {attraction.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/nbN0nIGiT2g?mute=1&controls=0&showinfo=0&rel=0&modestbranding=1"
              title="Nickelodeon Universe"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ width: "100%", height: "100%" }}
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
