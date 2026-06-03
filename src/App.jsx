import { useState } from "react"
import AppShell from "./components/layout/AppShell"

export default function App() {
  const [navVisible, setNavVisible] = useState(false)
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <AppShell navVisible={navVisible}>
      <div
        id="event-horizon"
        className="min-h-screen bg-black flex items-center 
        justify-center"
      >
        <div className="text-center">
          <p
            className="text-sm tracking-widest uppercase mb-4"
            style={{ color: '#C9A84C' }}
          >
            Mall of America
          </p>
          <h1
            className="text-6xl font-light text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Where Attention Lives
          </h1>
         {!introComplete && (
  <button
    className="mt-12 text-xs tracking-widest uppercase 
    opacity-60 hover:opacity-100 transition-all 
    duration-300 text-white border border-white 
    border-opacity-20 px-8 py-3"
    onClick={() => {
      setNavVisible(true)
      setIntroComplete(true)
      const el = document.getElementById('the-pull')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }}
  >
    Enter Experience ↓
  </button>
)}
        </div>
      </div>

      <div
        id="the-pull"
        className="min-h-screen flex items-center 
        justify-center"
        style={{ background: '#0A0A0A' }}
      >
        <h2
          className="text-4xl font-light text-white"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          The Pull
        </h2>
      </div>

      <div
        id="the-ecosystem"
        className="min-h-screen flex items-center 
        justify-center"
        style={{ background: '#0D1117' }}
      >
        <h2
          className="text-4xl font-light text-white"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          The Ecosystem
        </h2>
      </div>

      <div
        id="the-energy"
        className="min-h-screen flex items-center 
        justify-center bg-black"
      >
        <h2
          className="text-4xl font-light text-white"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          The Energy
        </h2>
      </div>

      <div
        id="the-platform"
        className="min-h-screen flex items-center 
        justify-center"
        style={{ background: '#0A0A0A' }}
      >
        <h2
          className="text-4xl font-light text-white"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          The Platform
        </h2>
      </div>

      <div
        id="the-record"
        className="min-h-screen flex items-center 
        justify-center"
        style={{ background: '#0D1117' }}
      >
        <h2
          className="text-4xl font-light text-white"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          The Record
        </h2>
      </div>

      <div
        id="the-decision"
        className="min-h-screen flex items-center 
        justify-center bg-black"
      >
        <h2
          className="text-4xl font-light text-white"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          The Decision
        </h2>
      </div>
    </AppShell>
  )
}