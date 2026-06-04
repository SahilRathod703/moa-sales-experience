import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const tenants = [
  "Nordstrom", "Macys", "LL Bean", "Coach",
  "Nike", "Under Armour", "Lego", "Zara",
  "H and M", "Sephora", "Bath and Body Works", "Gap",
  "Victoria Secret", "Microsoft", "American Girl", "Build A Bear"
]

export default function TheEcosystem() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const tenantsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headlineRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: headlineRef.current, start: "top 80%" } })

      gsap.fromTo(leftRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: leftRef.current, start: "top 75%" } })

      gsap.fromTo(rightRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: rightRef.current, start: "top 75%" } })

      gsap.fromTo(tenantsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: tenantsRef.current, start: "top 80%" } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="the-ecosystem"
      className="relative py-32 px-6"
      style={{ background: "#0D1117", minHeight: "100vh" }}
    >
      <div className="max-w-7xl mx-auto">

        <p className="text-xs tracking-widest uppercase mb-6" style={{ color: "#C9A84C", fontFamily: "'Inter', sans-serif" }}>
          Retail and Luxury
        </p>

        <div ref={headlineRef} style={{ opacity: 0 }}>
          <h2 className="text-4xl md:text-6xl font-light text-white leading-tight mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            520 world-class brands.
            <br />
            <span style={{ color: "#C9A84C" }}>One address.</span>
          </h2>
          <p className="text-lg font-light max-w-2xl mb-16" style={{ color: "#ffffff", opacity: 0.5, fontFamily: "'Inter', sans-serif", lineHeight: 1.8 }}>
            The retail environment at MOA is not a directory.
            It is a curated ecosystem where the right brands
            define the experience for 40 million people.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mb-16">
          <div ref={leftRef} className="relative overflow-hidden" style={{ opacity: 0, minHeight: "500px" }}>
            <img
              src="/assets/images/moa-west-interior-real.webp"
              alt="MOA Retail Interior"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 0.4 }}
              loading="lazy"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0D1117 30%, transparent)" }} />
            <div className="absolute bottom-0 left-0 p-8">
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#C9A84C", fontFamily: "'Inter', sans-serif" }}>
                The Retail Floor
              </p>
              <h3 className="text-3xl font-light text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                A destination,
                <br />not a location.
              </h3>
              <p className="text-sm max-w-xs" style={{ color: "#ffffff", opacity: 0.6, fontFamily: "'Inter', sans-serif", lineHeight: 1.8 }}>
                From flagship formats to experiential pop-ups,
                MOA offers every retail category a proven path
                to the highest-density audience in the Midwest.
              </p>
              <div className="mt-6 flex gap-8">
                <div>
                  <p className="text-2xl font-light" style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif" }}>520+</p>
                  <p className="text-xs tracking-widest uppercase mt-1" style={{ color: "#ffffff", opacity: 0.4, fontFamily: "'Inter', sans-serif" }}>Stores</p>
                </div>
                <div>
                  <p className="text-2xl font-light" style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif" }}>95%</p>
                  <p className="text-xs tracking-widest uppercase mt-1" style={{ color: "#ffffff", opacity: 0.4, fontFamily: "'Inter', sans-serif" }}>Occupancy</p>
                </div>
              </div>
            </div>
          </div>

          <div ref={rightRef} className="relative overflow-hidden" style={{ opacity: 0, minHeight: "500px" }}>
            <img
              src="/assets/images/luxury-retail.webp"
              alt="Luxury Retail"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 0.5 }}
              loading="lazy"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0D1117 30%, transparent)" }} />
            <div className="absolute bottom-0 left-0 p-8">
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#C9A84C", fontFamily: "'Inter', sans-serif" }}>
                The Elevated Tier
              </p>
              <h3 className="text-3xl font-light text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Your brand in the
                <br />company it deserves.
              </h3>
              <p className="text-sm max-w-xs" style={{ color: "#ffffff", opacity: 0.6, fontFamily: "'Inter', sans-serif", lineHeight: 1.8 }}>
                Premium positioning. Editorial environment.
                The brands here are not just stores.
                They are statements.
              </p>
            </div>
          </div>
        </div>

        <div ref={tenantsRef} style={{ opacity: 0 }}>
          <p className="text-xs tracking-widest uppercase mb-8 text-center" style={{ color: "#ffffff", opacity: 0.3, fontFamily: "'Inter', sans-serif" }}>
            Who is Already Here
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {tenants.map((tenant, i) => (
              <span
                key={i}
                className="text-sm tracking-wider uppercase px-4 py-2 border border-white border-opacity-10"
                style={{ color: "#ffffff", opacity: 0.5, fontFamily: "'Inter', sans-serif" }}
              >
                {tenant}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm mb-4" style={{ color: "#ffffff", opacity: 0.4, fontFamily: "'Inter', sans-serif" }}>
            Ready to find your space?
          </p>
          <a
            href="mailto:groupsales@mallofamerica.com"
            className="inline-block text-xs tracking-widest uppercase px-8 py-4 border transition-all duration-300"
            style={{ color: "#C9A84C", borderColor: "#C9A84C", fontFamily: "'Inter', sans-serif" }}
          >
            Explore Leasing Opportunities
          </a>
        </div>

      </div>
    </section>
  )
}
