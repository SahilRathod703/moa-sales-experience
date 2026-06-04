import { useState } from "react"
import AppShell from "./components/layout/AppShell"
import EventHorizon from "./components/zones/EventHorizon"
import ThePull from "./components/zones/ThePull"
import TheEcosystem from "./components/zones/TheEcosystem"
import TheEnergy from "./components/zones/TheEnergy"
import ThePlatform from "./components/zones/ThePlatform"
import TheRecord from "./components/zones/TheRecord"
import TheDecision from "./components/zones/TheDecision"
import EventsModule from "./components/zones/EventsModule"

export default function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [navVisible, setNavVisible] = useState(false)
  const [showEventsModule, setShowEventsModule] = useState(false)

  const handleIntroComplete = () => {
    setShowIntro(false)
    setNavVisible(true)
  }

  return (
    <>
      {showIntro && <EventHorizon onComplete={handleIntroComplete} />}

      <AppShell navVisible={navVisible}>
        <div
          id="event-horizon"
          className="flex items-center justify-center"
          style={{ minHeight: "100vh", background: "#000000" }}
        >
          <div className="text-center px-6">
            <p className="text-xs tracking-widest uppercase mb-6" style={{ color: "#C9A84C", fontFamily: "'Inter', sans-serif" }}>
              Mall of America
            </p>
            <h1 className="text-5xl md:text-7xl font-light text-white leading-tight mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Where Attention Lives
            </h1>
            <p className="text-sm max-w-md mx-auto" style={{ color: "#ffffff", opacity: 0.35, fontFamily: "'Inter', sans-serif", lineHeight: 1.8 }}>
              The largest retail and entertainment complex in North America.
              40 million visitors. 30 years of earned trust.
            </p>
            <div className="mt-12">
              <div className="w-px h-16 mx-auto" style={{ background: "linear-gradient(to bottom, #C9A84C, transparent)" }} />
            </div>
          </div>
        </div>

        <ThePull />
        <TheEcosystem />
        <TheEnergy />
        <ThePlatform />
        <TheRecord />
        <TheDecision />

        <footer className="py-12 px-6 border-t border-white border-opacity-5" style={{ background: "#000000" }}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs tracking-widest uppercase" style={{ color: "#C9A84C", fontFamily: "'Inter', sans-serif", letterSpacing: "0.3em" }}>
              Mall of America
            </p>
            <p className="text-xs" style={{ color: "#ffffff", opacity: 0.2, fontFamily: "'Inter', sans-serif" }}>
              Bloomington, Minnesota. groupsales@mallofamerica.com. 952.883.8809
            </p>
            <button
              onClick={() => setShowEventsModule(true)}
              className="text-xs tracking-widest uppercase transition-all"
              style={{ color: "#C9A84C", opacity: 0.5, fontFamily: "'Inter', sans-serif" }}
            >
              Events Module
            </button>
          </div>
        </footer>
      </AppShell>

      {showEventsModule && (
        <>
          <div className="fixed inset-0 z-40 bg-black bg-opacity-70" onClick={() => setShowEventsModule(false)} />
          <EventsModule onClose={() => setShowEventsModule(false)} />
        </>
      )}
    </>
  )
}
