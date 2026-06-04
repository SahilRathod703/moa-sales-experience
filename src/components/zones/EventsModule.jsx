export default function EventsModule({ onClose }) {
  const venues = [
    {
      name: "The Rotunda",
      capacity: "Up to 5,000",
      type: "Brand Activations, Product Launches, Concerts",
      description: "The iconic centerpiece of MOA. Maximum visibility. Maximum impact."
    },
    {
      name: "Common Areas",
      capacity: "Flexible",
      type: "Pop-ups, Sampling, Interactive Displays",
      description: "High-footfall corridors throughout the 5.6M sq ft complex."
    },
    {
      name: "Nickelodeon Universe",
      capacity: "Full Park",
      type: "Private Events, Corporate Buyouts, Premieres",
      description: "Americas largest indoor theme park available for private hire."
    },
    {
      name: "Conference Facilities",
      capacity: "10-500 guests",
      type: "Corporate, Meetings, Presentations",
      description: "Professional meeting spaces with full AV and catering support."
    }
  ]

  return (
    <div
      className="fixed inset-y-0 right-0 z-50 w-full md:w-1/2 lg:w-2/5 overflow-y-auto"
      style={{ background: "#0A0A0A" }}
    >
      <div
        className="sticky top-0 z-10 flex justify-between items-center p-8 border-b border-white border-opacity-5"
        style={{ background: "#0A0A0A" }}
      >
        <div>
          <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#C9A84C", fontFamily: "'Inter', sans-serif" }}>
            Events and Venues
          </p>
          <h2 className="text-2xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Host Your Event Here
          </h2>
        </div>
        <button onClick={onClose} className="text-white text-2xl" style={{ opacity: 0.4 }}>
          x
        </button>
      </div>

      <div className="p-8">
        <div className="mb-8 p-6 border-l-2" style={{ borderColor: "#C9A84C", background: "rgba(201,168,76,0.03)" }}>
          <p className="text-5xl font-light mb-2" style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif" }}>
            400+
          </p>
          <p className="text-sm" style={{ color: "#ffffff", opacity: 0.6, fontFamily: "'Inter', sans-serif", lineHeight: 1.8 }}>
            Events hosted every year. Celebrity appearances, musical performances,
            product launches, book signings and movie premieres.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {venues.map((venue, i) => (
            <div key={i} className="p-6 border border-white border-opacity-5" style={{ background: "rgba(255,255,255,0.01)" }}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-light text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {venue.name}
                </h3>
                <span className="text-xs" style={{ color: "#C9A84C", fontFamily: "'Inter', sans-serif" }}>
                  {venue.capacity}
                </span>
              </div>
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#ffffff", opacity: 0.3, fontFamily: "'Inter', sans-serif" }}>
                {venue.type}
              </p>
              <p className="text-sm" style={{ color: "#ffffff", opacity: 0.5, fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}>
                {venue.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-8" style={{ aspectRatio: "16/9" }}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/_F9t5unnyWU?mute=1&controls=1&rel=0&modestbranding=1"
            title="MOA Events"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div className="p-6 text-center border border-white border-opacity-5">
          <p className="text-sm mb-4" style={{ color: "#ffffff", opacity: 0.5, fontFamily: "'Inter', sans-serif" }}>
            Ready to make your event matter?
          </p>
          <a
            href="mailto:groupsales@mallofamerica.com"
            className="inline-block text-xs tracking-widest uppercase px-8 py-4 border w-full text-center mb-3"
            style={{ color: "#C9A84C", borderColor: "#C9A84C", fontFamily: "'Inter', sans-serif" }}
          >
            groupsales@mallofamerica.com
          </a>
          <p className="text-xs" style={{ color: "#ffffff", opacity: 0.3, fontFamily: "'Inter', sans-serif" }}>
            952.883.8809
          </p>
        </div>
      </div>
    </div>
  )
}
