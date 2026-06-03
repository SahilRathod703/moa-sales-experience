import { useState, useEffect } from "react"
import { ZONES, BUSINESS_PATHS } from "../../utils/constants"

export default function DualNav({ visible = true }) {
  const [activeZone, setActiveZone] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const zones = ZONES.map(z => document.getElementById(z.id))

      const current = zones.findIndex(zone => {
        if (!zone) return false

        const rect = zone.getBoundingClientRect()

        return rect.top <= 100 && rect.bottom >= 100
      })

      if (current !== -1) {
        setActiveZone(ZONES[current].id)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!visible) return null

  return (
    <nav className="fixed top-0 right-0 z-40 p-6">
      {/* Desktop Nav */}
      <div className="hidden md:flex flex-col items-end gap-6">

        {/* Story Path */}
        <div className="flex flex-col items-end gap-2">
          <p
            className="text-xs tracking-widest uppercase"
            style={{
              color: '#C9A84C',
              opacity: 0.6
            }}
          >
            The Story
          </p>

          {ZONES.map(zone => (
            <button
              key={zone.id}
              onClick={() => {
                const el = document.getElementById(zone.id)

                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className={`
                story-link
                text-xs
                tracking-wider
                uppercase
                transition-all
                duration-300
                hover:text-[#C9A84C]
                hover:opacity-100
                ${
                  activeZone === zone.id
                    ? 'text-[#C9A84C] opacity-100'
                    : 'text-white opacity-40'
                }
              `}
              style={{
                fontFamily: "'Inter', sans-serif"
              }}
            >
              {zone.label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div
          className="w-px h-8"
          style={{
            background: '#C9A84C',
            opacity: 0.3
          }}
        />

        {/* Business Path */}
        <div className="flex flex-col items-end gap-2">
          <p
            className="text-xs tracking-widest uppercase"
            style={{
              color: '#C9A84C',
              opacity: 0.6
            }}
          >
            Business
          </p>

          {BUSINESS_PATHS.map(path => (
            <button
              key={path.id}
              onClick={() => {
                let targetId = 'the-platform'

                if (path.id === 'retail') {
                  targetId = 'the-ecosystem'
                }

                const el = document.getElementById(targetId)

                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' })
                }

                setMenuOpen(false)
              }}
              className="
                business-link
                text-xs
                tracking-wider
                uppercase
                text-white
                opacity-60
                hover:text-[#C9A84C]
                hover:opacity-100
                transition-all
                duration-300
              "
              style={{
                fontFamily: "'Inter', sans-serif"
              }}
            >
              {path.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span
          className="w-6 h-px block"
          style={{ background: '#C9A84C' }}
        />

        <span
          className="w-4 h-px block"
          style={{ background: '#C9A84C' }}
        />

        <span
          className="w-6 h-px block"
          style={{ background: '#C9A84C' }}
        />
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-95 flex flex-col items-center justify-center gap-6 z-50">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-white opacity-60"
          >
            ✕
          </button>

          {ZONES.map(zone => (
            <button
              key={zone.id}
              onClick={() => {
                const el = document.getElementById(zone.id)

                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' })
                }

                setMenuOpen(false)
              }}
              className="text-xl tracking-widest uppercase text-white opacity-60 hover:text-[#C9A84C] hover:opacity-100 transition-all duration-300"
            >
              {zone.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}