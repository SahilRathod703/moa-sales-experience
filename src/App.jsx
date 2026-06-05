import React, { useEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import * as THREE from "three"

gsap.registerPlugin(ScrollTrigger)

// ============================================================================
// DESIGN — Festival cream / Editorial magazine
// ============================================================================
const C = {
  paper: "#F5EEDF",
  paperWarm: "#EFE3C8",
  paperDeep: "#E5D5B2",
  ink: "#1A1108",
  inkSoft: "#3E2C18",
  marigold: "#D89A3A",
  saffron: "#C97A2E",
  rose: "#C25667",
  blush: "#EFC0AE",
  jade: "#5A8E78",
  cobalt: "#1E3A6F",
  cobaltDeep: "#0E1F40",
  cream: "#FBF5E6",
  ink90: "rgba(26,17,8,0.9)",
  ink70: "rgba(26,17,8,0.7)",
  ink55: "rgba(26,17,8,0.55)",
  ink40: "rgba(26,17,8,0.4)",
  ink25: "rgba(26,17,8,0.25)",
  ink12: "rgba(26,17,8,0.12)",
  ink06: "rgba(26,17,8,0.06)",
}

const F = {
  display: "'Fraunces', 'Cormorant Garamond', serif",
  sans: "'Inter', 'Helvetica Neue', sans-serif",
  mono: "'JetBrains Mono', monospace",
  script: "'Caveat', cursive",
}

const ASSET = {
  HERO: "/assets/images/hero-atmospheric.webp",
  CROWD: "/assets/images/crowd-energy.webp",
  LUXURY: "/assets/images/luxury-retail.webp",
  ATTRACTIONS: "/assets/images/attractions-hero.webp",
  HOLIDAY: "/assets/images/moa-holiday-real.webp",
  EVENTS: "/assets/images/events-activation.webp",
  EXTERIOR: "/assets/images/moa-exterior-real.webp",
  ENTRANCE: "/assets/images/moa-entrance-real.webp",
  INTERIOR: "/assets/images/moa-interior-real.webp",
  WEST: "/assets/images/moa-west-interior-real.webp",
  NICK: "/assets/images/moa-nickelodeon-real.webp",
  SEALIFE: "/assets/images/moa-sealife-real.webp",
  CRAYOLA: "/assets/images/moa-crayola-real.webp",
  LEGO: "/assets/images/moa-legoStore-real.webp",
  DINING: "/assets/images/dining-lifestyle.webp",
  MAP: "/assets/images/regional-map.webp",
  AUDIO: "/assets/audio/ambient.mp3",
}

const CHAPTERS = [
  { id: "hero",      name: "Sunrise" },
  { id: "pull",      name: "The Gathering" },
  { id: "ecosystem", name: "The Promenade" },
  { id: "energy",    name: "The Spectacle" },
  { id: "platform",  name: "The Stage" },
  { id: "record",    name: "The Chronicle" },
  { id: "decision",  name: "The Invitation" },
]

// ============================================================================
// GLOBALS
// ============================================================================
function useGlobals() {
  useEffect(() => {
    const tags = []
    const links = [
      ["preconnect", "https://fonts.googleapis.com"],
      ["preconnect", "https://fonts.gstatic.com", true],
      ["stylesheet", "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,200;0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400;1,9..144,500&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&family=Caveat:wght@500&display=swap"]
    ]
    links.forEach(([rel, href, cross]) => {
      const l = document.createElement("link")
      l.rel = rel; l.href = href
      if (cross) l.crossOrigin = "anonymous"
      document.head.appendChild(l); tags.push(l)
    })

    const style = document.createElement("style")
    style.textContent = `
      *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
      html{scroll-behavior:smooth}
      body{background:${C.paper};color:${C.ink};font-family:${F.sans};
        -webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;
        text-rendering:optimizeLegibility;
        font-feature-settings:'kern' 1,'liga' 1,'calt' 1;
        overflow-x:hidden;cursor:none;
        font-weight:400}
      ::selection{background:${C.marigold};color:${C.ink}}
      ::-webkit-scrollbar{width:0;height:0}
      a,button{color:inherit;cursor:none;font:inherit;text-decoration:none;border:none;background:none}
      img{display:block;max-width:100%}

      .moa-paper{position:fixed;inset:0;z-index:0;pointer-events:none;
        background-color:${C.paper};
        background-image:
          radial-gradient(ellipse 1200px 700px at 75% -10%, rgba(216,154,58,0.20), transparent 60%),
          radial-gradient(ellipse 900px 600px at 10% 110%, rgba(194,86,103,0.10), transparent 60%),
          radial-gradient(ellipse 1000px 800px at 50% 50%, rgba(90,142,120,0.04), transparent 70%)}

      .moa-grain{position:fixed;inset:-150%;z-index:1;pointer-events:none;opacity:0.08;mix-blend-mode:multiply;
        background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='3'/%3E%3CfeColorMatrix values='0 0 0 0 0.3 0 0 0 0 0.2 0 0 0 0 0.08 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        animation:moaG 0.7s steps(3) infinite}
      @keyframes moaG{0%{transform:translate(0,0)}50%{transform:translate(-1.5%,1%)}100%{transform:translate(1%,-1%)}}

      .moa-marquee{display:inline-block;white-space:nowrap;animation:moaM 55s linear infinite}
      @keyframes moaM{from{transform:translateX(0)}to{transform:translateX(-50%)}}

      .moa-cursor{position:fixed;top:0;left:0;width:8px;height:8px;border-radius:50%;
        background:${C.saffron};pointer-events:none;z-index:9999;mix-blend-mode:multiply;
        transform:translate(-50%,-50%);box-shadow:0 0 16px ${C.marigold};
        transition:width .4s,height .4s,background .4s}
      .moa-cursor.lg{width:70px;height:70px;background:rgba(201,122,46,0.18);box-shadow:0 0 40px ${C.saffron}}
      .moa-cursor-ring{position:fixed;top:0;left:0;width:36px;height:36px;border:1px solid ${C.saffron};
        border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);
        transition:width .4s,height .4s,border-color .4s;opacity:0.7}
      .moa-cursor-ring.lg{width:96px;height:96px;border-color:${C.rose};opacity:1;mix-blend-mode:multiply}

      .moa-rise{opacity:0;transform:translateY(36px);transition:opacity 1.4s cubic-bezier(.16,.84,.3,1),transform 1.4s cubic-bezier(.16,.84,.3,1)}
      .moa-rise.in{opacity:1;transform:translateY(0)}

      .moa-fade{opacity:0;transition:opacity 1.8s cubic-bezier(.16,.84,.3,1)}
      .moa-fade.in{opacity:1}

      .moa-scale{opacity:0;transform:scale(1.04);transition:opacity 1.8s cubic-bezier(.16,.84,.3,1),transform 1.8s cubic-bezier(.16,.84,.3,1)}
      .moa-scale.in{opacity:1;transform:scale(1)}

      .moa-img{position:relative;overflow:hidden;background:${C.paperDeep}}
      .moa-img img{width:100%;height:100%;object-fit:cover;transition:transform 8s cubic-bezier(.16,.84,.3,1),filter .8s}
      .moa-img:hover img{transform:scale(1.04)}

      .moa-cap{font-family:${F.mono};font-size:9.5px;font-weight:500;
        letter-spacing:0.32em;text-transform:uppercase;color:${C.ink55}}
      .moa-cap-warm{font-family:${F.mono};font-size:9.5px;font-weight:500;
        letter-spacing:0.32em;text-transform:uppercase;color:${C.saffron}}

      .moa-script{font-family:${F.script};font-weight:500;color:${C.rose}}

      .moa-btn{position:relative;display:inline-flex;align-items:center;gap:18px;
        padding:22px 38px;background:transparent;
        border:1px solid ${C.ink};
        font-family:${F.sans};font-weight:500;font-size:11px;
        letter-spacing:0.32em;text-transform:uppercase;color:${C.ink};
        overflow:hidden;transition:all .6s cubic-bezier(.2,.7,.2,1)}
      .moa-btn::before{content:'';position:absolute;inset:0;background:${C.ink};
        transform:translateY(100%);transition:transform .55s cubic-bezier(.2,.7,.2,1);z-index:0}
      .moa-btn:hover{color:${C.cream}}
      .moa-btn:hover::before{transform:translateY(0)}
      .moa-btn > span{position:relative;z-index:1}

      .moa-line{display:inline-block;height:1px;background:${C.ink25};vertical-align:middle}

      @media (max-width:900px){
        .moa-cursor,.moa-cursor-ring{display:none}
        body{cursor:auto}
      }
    `
    document.head.appendChild(style); tags.push(style)
    return () => tags.forEach(t => t.remove())
  }, [])
}

// ============================================================================
// CURSOR
// ============================================================================
function useCursor() {
  useEffect(() => {
    const dot = document.createElement("div"); dot.className = "moa-cursor"
    const ring = document.createElement("div"); ring.className = "moa-cursor-ring"
    document.body.appendChild(dot); document.body.appendChild(ring)
    let mx = 0, my = 0, rx = 0, ry = 0
    const move = e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + "px"; dot.style.top = my + "px" }
    window.addEventListener("mousemove", move)
    const tick = () => {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18
      ring.style.left = rx + "px"; ring.style.top = ry + "px"
      requestAnimationFrame(tick)
    }
    tick()
    const onOver = e => {
      if (e.target.closest && e.target.closest("[data-mag]")) {
        dot.classList.add("lg"); ring.classList.add("lg")
      }
    }
    const onOut = e => {
      if (e.target.closest && e.target.closest("[data-mag]")) {
        dot.classList.remove("lg"); ring.classList.remove("lg")
      }
    }
    window.addEventListener("mouseover", onOver)
    window.addEventListener("mouseout", onOut)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseover", onOver)
      window.removeEventListener("mouseout", onOut)
      dot.remove(); ring.remove()
    }
  }, [])
}

// ============================================================================
// AUDIO
// ============================================================================
function useAudio() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [armed, setArmed] = useState(false)
  useEffect(() => {
    const a = new Audio(ASSET.AUDIO); a.loop = true; a.volume = 0
    audioRef.current = a
    let started = false
    const start = () => {
      if (started) return; started = true; setArmed(true)
      const p = a.play()
      if (p && p.then) p.then(() => {
        setPlaying(true)
        gsap.to(a, { volume: 0.5, duration: 4, ease: "sine.in" })
      }).catch(() => {})
    }
    window.addEventListener("click", start)
    window.addEventListener("keydown", start)
    window.addEventListener("touchstart", start)
    window.addEventListener("scroll", start, { once: true })
    return () => {
      window.removeEventListener("click", start)
      window.removeEventListener("keydown", start)
      window.removeEventListener("touchstart", start)
      a.pause(); a.src = ""
    }
  }, [])
  const toggle = useCallback(() => {
    const a = audioRef.current; if (!a) return
    if (playing) {
      gsap.to(a, { volume: 0, duration: 0.4, onComplete: () => a.pause() })
      setPlaying(false)
    } else {
      a.play().then(() => {
        gsap.to(a, { volume: 0.5, duration: 0.7 }); setPlaying(true)
      }).catch(() => {})
    }
  }, [playing])
  return { playing, armed, toggle }
}

// ============================================================================
// DAWN FIELD — warm fluid waviness: art, not gimmick. Visible atmosphere.
// ============================================================================
function DawnField() {
  const mountRef = useRef(null)
  const stateRef = useRef({ mx: 0, my: 0, progress: 0 })

  useEffect(() => {
    const mount = mountRef.current; if (!mount) return
    const w = () => window.innerWidth, h = () => window.innerHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" })
    renderer.setPixelRatio(dpr); renderer.setSize(w(), h())
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, w() / h(), 0.1, 1000)
    camera.position.set(0, 0, 20)

    // Warm glow sprites (subtle, no hard edges — just atmosphere)
    function makeGlow(size, color, opacity) {
      const canvas = document.createElement("canvas")
      canvas.width = 256; canvas.height = 256
      const ctx = canvas.getContext("2d")
      const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
      g.addColorStop(0, `rgba(${color},${opacity})`)
      g.addColorStop(0.5, `rgba(${color},${opacity * 0.35})`)
      g.addColorStop(1, `rgba(${color},0)`)
      ctx.fillStyle = g; ctx.fillRect(0, 0, 256, 256)
      const tex = new THREE.CanvasTexture(canvas)
      const mat = new THREE.SpriteMaterial({ map: tex, blending: THREE.NormalBlending, transparent: true, depthWrite: false })
      const sp = new THREE.Sprite(mat); sp.scale.set(size, size, 1); return sp
    }

    // Two soft warm glows that drift slowly
    const glow1 = makeGlow(22, "216,154,58", 0.22)
    glow1.position.set(10, 5, -3)
    scene.add(glow1)
    const glow2 = makeGlow(18, "194,86,103", 0.14)
    glow2.position.set(-8, -4, -5)
    scene.add(glow2)

    // Sunbeam planes — wider, more visible, slow breathing
    function makeBeam(angle, color, opacity, sx, sy) {
      const canvas = document.createElement("canvas")
      canvas.width = 256; canvas.height = 768
      const ctx = canvas.getContext("2d")
      const g = ctx.createLinearGradient(0, 0, 0, 768)
      g.addColorStop(0, `rgba(${color},${opacity})`)
      g.addColorStop(0.4, `rgba(${color},${opacity * 0.6})`)
      g.addColorStop(1, `rgba(${color},0)`)
      ctx.fillStyle = g; ctx.fillRect(0, 0, 256, 768)
      const tex = new THREE.CanvasTexture(canvas)
      const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, blending: THREE.NormalBlending, side: THREE.DoubleSide })
      const geo = new THREE.PlaneGeometry(sx, sy)
      const m = new THREE.Mesh(geo, mat); m.rotation.z = angle; return m
    }
    const beams = [
      { b: makeBeam(0.28, "216,154,58", 0.14, 12, 40), x: 7, y: 3, z: -2, base: 0.28 },
      { b: makeBeam(-0.18, "201,122,46", 0.10, 10, 34), x: 3, y: 0, z: -4, base: -0.18 },
      { b: makeBeam(0.45, "194,86,103", 0.08, 8, 30), x: -5, y: -2, z: -6, base: 0.45 },
      { b: makeBeam(-0.35, "216,154,58", 0.07, 7, 28), x: 12, y: 5, z: -5, base: -0.35 },
    ]
    beams.forEach(b => { b.b.position.set(b.x, b.y, b.z); scene.add(b.b) })

    // Dust motes — 1600, with fluid wave motion
    const dustGeo = new THREE.BufferGeometry()
    const N = 1600
    const pos = new Float32Array(N * 3)
    const col = new Float32Array(N * 3)
    const sizes = new Float32Array(N)
    for (let i = 0; i < N; i++) {
      pos[i*3] = (Math.random() - 0.5) * 70
      pos[i*3+1] = (Math.random() - 0.5) * 46
      pos[i*3+2] = (Math.random() - 0.5) * 34 - 4
      const t = Math.random()
      if (t < 0.6) { col[i*3] = 0.85; col[i*3+1] = 0.65; col[i*3+2] = 0.30 }
      else if (t < 0.8) { col[i*3] = 0.76; col[i*3+1] = 0.34; col[i*3+2] = 0.40 }
      else if (t < 0.94) { col[i*3] = 0.92; col[i*3+1] = 0.82; col[i*3+2] = 0.60 }
      else { col[i*3] = 0.35; col[i*3+1] = 0.55; col[i*3+2] = 0.47 }
      sizes[i] = 0.04 + Math.random() * 0.16
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
    dustGeo.setAttribute("color", new THREE.BufferAttribute(col, 3))
    dustGeo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1))

    const dustMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.NormalBlending,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        attribute float aSize; varying vec3 vCol; varying float vAlpha; uniform float uTime;
        void main(){
          vec3 p = position;
          // Fluid wave motion — particles ride a slow undulating field
          float wave = sin(uTime*0.18 + p.x*0.08 + p.z*0.06) * 1.2
                     + cos(uTime*0.14 + p.y*0.1) * 0.8;
          p.y += wave;
          p.x += cos(uTime*0.12 + p.z*0.15) * 0.6;
          p.z += sin(uTime*0.1 + p.x*0.08) * 0.3;
          vCol = color;
          // Fade particles near edges for softness
          float edge = 1.0 - smoothstep(20.0, 35.0, length(p.xy));
          vAlpha = edge;
          vec4 mv = modelViewMatrix * vec4(p,1.0);
          gl_PointSize = aSize * 260.0 / -mv.z;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying vec3 vCol; varying float vAlpha;
        void main(){
          vec2 c = gl_PointCoord - 0.5;
          float d = length(c);
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vCol, a * 0.75 * vAlpha);
        }`,
      vertexColors: true
    })
    const dust = new THREE.Points(dustGeo, dustMat)
    scene.add(dust)

    const onMove = e => {
      stateRef.current.mx = (e.clientX / w()) * 2 - 1
      stateRef.current.my = (e.clientY / h()) * 2 - 1
    }
    window.addEventListener("mousemove", onMove)
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      stateRef.current.progress = Math.min(1, Math.max(0, window.scrollY / Math.max(1, max)))
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    const onResize = () => {
      renderer.setSize(w(), h())
      camera.aspect = w() / h(); camera.updateProjectionMatrix()
    }
    window.addEventListener("resize", onResize)

    const clock = new THREE.Clock()
    let running = true
    const tick = () => {
      if (!running) return
      const t = clock.getElapsedTime(); const s = stateRef.current
      dustMat.uniforms.uTime.value = t

      // Beams breathe — slow oscillating rotation and opacity pulse
      beams.forEach((b, i) => {
        b.b.rotation.z = b.base + Math.sin(t * 0.06 + i * 1.5) * 0.06
        b.b.material.opacity = 0.6 + Math.sin(t * 0.15 + i * 2.0) * 0.15
      })

      // Glows drift with mouse parallax
      glow1.position.x = 10 + s.mx * 2.0 + Math.sin(t * 0.12) * 1.5
      glow1.position.y = 5 - s.my * 2.0 + Math.cos(t * 0.1) * 1.0
      glow2.position.x = -8 + s.mx * 1.2 + Math.cos(t * 0.1) * 1.2
      glow2.position.y = -4 - s.my * 1.2 + Math.sin(t * 0.14) * 0.8

      // Camera: subtle mouse parallax + gentle scroll drift
      camera.position.x += (s.mx * 0.6 - camera.position.x) * 0.04
      camera.position.y += (-s.my * 0.4 - camera.position.y) * 0.04
      camera.position.z = 20 - s.progress * 2
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
      requestAnimationFrame(tick)
    }
    tick()

    return () => {
      running = false
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      mount.removeChild(renderer.domElement)
      renderer.dispose(); dustGeo.dispose(); dustMat.dispose()
    }
  }, [])

  return <div ref={mountRef} style={{ position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none" }} />
}

// ============================================================================
// HUD — clean, names spelled out, no numeric labels
// ============================================================================
function HUD({ active, audio }) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 80,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "26px 40px", pointerEvents: "none",
      background: "linear-gradient(180deg, rgba(20,12,6,0.70) 0%, rgba(20,12,6,0.35) 60%, transparent 100%)"
    }}>
      <div style={{ pointerEvents: "auto" }}>
        <div style={{
          fontFamily: F.display, fontWeight: 500, fontSize: 18,
          color: C.cream, letterSpacing: "-0.01em", lineHeight: 1,
          textShadow: "0 1px 8px rgba(0,0,0,0.4)"
        }}>
          Mall of <span style={{ fontStyle: "italic", color: C.marigold }}>America</span>
        </div>
        <div style={{
          fontFamily: F.mono, fontSize: 8.5, color: "rgba(251,245,230,0.6)",
          letterSpacing: "0.32em", marginTop: 5, textTransform: "uppercase", fontWeight: 500,
          textShadow: "0 1px 6px rgba(0,0,0,0.3)"
        }}>
          Bloomington — Since 1992
        </div>
      </div>

      <div style={{ pointerEvents: "auto", display: "flex", gap: 28, alignItems: "center" }}>
        {CHAPTERS.map((c, i) => (
          <a key={c.id} href={`#${c.id}`} data-mag style={{
            fontFamily: F.mono, fontSize: 9.5, letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: active === i ? C.marigold : "rgba(251,245,230,0.65)",
            fontWeight: active === i ? 700 : 600,
            transition: "color .5s",
            textShadow: "0 1px 8px rgba(0,0,0,0.5)"
          }}>
            {c.name}
          </a>
        ))}
      </div>

      <button onClick={audio.toggle} data-mag style={{
        pointerEvents: "auto", display: "flex", alignItems: "center", gap: 10,
        fontFamily: F.mono, fontWeight: 600, fontSize: 9.5,
        letterSpacing: "0.3em", textTransform: "uppercase",
        color: audio.playing ? C.marigold : "rgba(251,245,230,0.6)",
        textShadow: "0 1px 8px rgba(0,0,0,0.4)"
      }}>
        {audio.playing && (
          <span style={{ display: "inline-flex", gap: 2, alignItems: "flex-end", height: 14 }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                width: 2, background: C.saffron,
                animation: `moaBar${i} 0.${5 + i}s ease-in-out infinite alternate`,
                height: 4 + i * 2
              }} />
            ))}
          </span>
        )}
        <span>{audio.playing ? "Playing" : "Muted"}</span>
      </button>
      <style>{`
        @keyframes moaBar0 { from { height: 3px } to { height: 12px } }
        @keyframes moaBar1 { from { height: 6px } to { height: 14px } }
        @keyframes moaBar2 { from { height: 4px } to { height: 11px } }
      `}</style>
    </div>
  )
}

function AudioPrompt({ armed }) {
  if (armed) return null
  return (
    <div style={{
      position: "fixed", bottom: 36, left: "50%", transform: "translateX(-50%)",
      zIndex: 75, pointerEvents: "none",
      fontFamily: F.mono, fontWeight: 500, fontSize: 9,
      letterSpacing: "0.42em", textTransform: "uppercase", color: C.ink55
    }}>
      <span style={{
        display: "inline-block", width: 6, height: 6, borderRadius: "50%",
        background: C.saffron, marginRight: 12, verticalAlign: "middle",
        animation: "moaP 2.4s ease-in-out infinite"
      }} />
      Move to begin
      <style>{`@keyframes moaP{0%,100%{opacity:0.5;transform:scale(1)}50%{opacity:1;transform:scale(1.4)}}`}</style>
    </div>
  )
}

// ============================================================================
// ANIMATION HOOK
// ============================================================================
function useReveal(ref) {
  useEffect(() => {
    if (!ref.current) return
    const els = ref.current.querySelectorAll(".moa-rise, .moa-fade, .moa-scale")
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in") })
    }, { threshold: 0.12 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [ref])
}

// ============================================================================
// 1. SUNRISE — Cinematic full-bleed montage hook. Imagery first. Type over.
// ============================================================================
function Hero() {
  const ref = useRef(null)
  const layersRef = useRef([])
  const t1 = useRef(null), t2 = useRef(null), t3 = useRef(null)
  const wmRef = useRef(null), subRef = useRef(null), cueRef = useRef(null)
  const tagRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const layers = layersRef.current.filter(Boolean)
      gsap.set(layers, { opacity: 0, scale: 1.12 })

      const tl = gsap.timeline()

      // Image 1 brightens in
      tl.fromTo(layers[0],
        { opacity: 0, scale: 1.05, filter: "brightness(0.3)" },
        { opacity: 1, scale: 1.14, filter: "brightness(1)", duration: 2.0, ease: "power2.out" }, 0)
      tl.to(layers[0], { scale: 1.2, duration: 10, ease: "none" }, 0)

      // Tag line appears
      tl.fromTo(tagRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" }, 1.0)

      // Beat 1: "Every great story needs a stage."
      tl.fromTo(t1.current,
        { opacity: 0, y: 44, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.6, ease: "power3.out" }, 1.8)
      tl.to(t1.current,
        { opacity: 0, y: -24, filter: "blur(6px)", duration: 1.0 }, "+=2.8")

      // Crossfade to image 2
      tl.to(layers[1], { opacity: 1, duration: 1.4, ease: "power2.inOut" }, "-=0.6")
      tl.fromTo(layers[1], { scale: 1.12 }, { scale: 1.04, duration: 8, ease: "none" }, "<")
      tl.to(layers[0], { opacity: 0, duration: 1.4 }, "<")

      // Beat 2: "Forty million people. One place worth coming for."
      tl.fromTo(t2.current,
        { opacity: 0, y: 44, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.6, ease: "power3.out" }, "-=0.2")
      tl.to(t2.current,
        { opacity: 0, y: -24, filter: "blur(6px)", duration: 1.0 }, "+=2.8")

      // Crossfade to image 3
      tl.to(layers[2], { opacity: 1, duration: 1.4, ease: "power2.inOut" }, "-=0.6")
      tl.fromTo(layers[2], { scale: 1.12 }, { scale: 1.04, duration: 8, ease: "none" }, "<")
      tl.to(layers[1], { opacity: 0, duration: 1.4 }, "<")

      // Beat 3: "Where ordinary days become occasions."
      tl.fromTo(t3.current,
        { opacity: 0, y: 44, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.6, ease: "power3.out" }, "-=0.2")
      tl.to(t3.current,
        { opacity: 0, y: -20, filter: "blur(6px)", duration: 1.2 }, "+=2.4")

      // Crossfade to image 4 — settle
      tl.to(layers[3], { opacity: 1, duration: 1.4, ease: "power2.inOut" }, "-=0.6")
      tl.fromTo(layers[3], { scale: 1.1 }, { scale: 1.04, duration: 8, ease: "none" }, "<")
      tl.to(layers[2], { opacity: 0, duration: 1.4 }, "<")

      // Wordmark resolves
      tl.to(tagRef.current, { opacity: 0, duration: 0.6 }, "-=0.4")
      tl.fromTo(wmRef.current,
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 2.2, ease: "power2.out" }, "-=0.2")
      tl.fromTo(subRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 1.4 }, "-=1.0")
      tl.fromTo(cueRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1.2 }, "+=0.6")
    }, ref)
    return () => ctx.revert()
  }, [])

  const montage = [ASSET.HERO, ASSET.CROWD, ASSET.HOLIDAY, ASSET.LUXURY]

  return (
    <section id="hero" ref={ref} style={{
      position: "relative", height: "100vh", minHeight: 700,
      zIndex: 10, overflow: "hidden"
    }}>
      {/* Full-bleed image layers */}
      {montage.map((src, i) => (
        <div key={i} ref={el => layersRef.current[i] = el} style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${src})`,
          backgroundSize: "cover", backgroundPosition: "center",
          willChange: "transform, opacity"
        }} />
      ))}

      {/* Warm cinematic vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(26,17,8,0.40) 0%, rgba(26,17,8,0.12) 40%, rgba(26,17,8,0.55) 100%)",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 110% 90% at 50% 50%, transparent 50%, rgba(26,17,8,0.50) 100%)",
        pointerEvents: "none"
      }} />

      {/* Tag */}
      <div ref={tagRef} style={{
        position: "absolute", top: "12%", left: "50%", transform: "translateX(-50%)",
        opacity: 0, display: "flex", alignItems: "center", gap: 18,
        fontFamily: F.mono, fontSize: 10, fontWeight: 500,
        letterSpacing: "0.5em", textTransform: "uppercase", color: C.cream
      }}>
        <span style={{ width: 30, height: 1, background: C.cream, opacity: 0.5 }} />
        A Sales Experience
        <span style={{ width: 30, height: 1, background: C.cream, opacity: 0.5 }} />
      </div>

      {/* Type beats — centered over imagery */}
      {[
        { r: t1, text: <>Every great story<br/>needs <span style={{ fontStyle: "italic", color: C.marigold }}>a stage.</span></> },
        { r: t2, text: <><span style={{ fontStyle: "italic", color: C.marigold }}>Forty million</span> people.<br/>One place worth coming for.</> },
        { r: t3, text: <>Where ordinary days<br/><span style={{ color: C.blush }}>become occasions.</span></> },
      ].map((beat, i) => (
        <div key={i} style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: "none", padding: "0 40px"
        }}>
          <h1 ref={beat.r} style={{
            opacity: 0,
            fontFamily: F.display, fontWeight: 300,
            fontSize: i === 0 ? "clamp(3rem, 9vw, 10rem)" : "clamp(2.4rem, 7vw, 8rem)",
            lineHeight: 0.94, letterSpacing: "-0.025em",
            color: C.cream, textAlign: "center", maxWidth: "90vw",
            textShadow: "0 4px 80px rgba(0,0,0,0.6)"
          }}>
            {beat.text}
          </h1>
        </div>
      ))}

      {/* Wordmark — resolves last */}
      <div ref={wmRef} style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        opacity: 0, pointerEvents: "none"
      }}>
        <div className="moa-script" style={{
          fontSize: "clamp(1.4rem, 2vw, 1.8rem)", color: C.blush, marginBottom: 10
        }}>
          welcome to
        </div>
        <div style={{
          fontFamily: F.display, fontWeight: 400,
          fontSize: "clamp(2.6rem, 8vw, 8.4rem)",
          color: C.cream, letterSpacing: "-0.02em", lineHeight: 0.96,
          textAlign: "center",
          textShadow: "0 4px 60px rgba(0,0,0,0.6)"
        }}>
          Mall of <span style={{ fontStyle: "italic", color: C.marigold }}>America</span>
        </div>
      </div>

      <div ref={subRef} style={{
        position: "absolute", bottom: 110, left: "50%", transform: "translateX(-50%)",
        opacity: 0, textAlign: "center",
        fontFamily: F.mono, fontSize: 10, fontWeight: 500,
        letterSpacing: "0.42em", textTransform: "uppercase", color: C.cream
      }}>
        Bloomington, Minnesota — Since 1992
      </div>

      <div ref={cueRef} style={{
        position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
        textAlign: "center", opacity: 0, pointerEvents: "none"
      }}>
        <div style={{
          fontFamily: F.mono, fontSize: 9, fontWeight: 500,
          letterSpacing: "0.46em", textTransform: "uppercase",
          color: C.cream, opacity: 0.7, marginBottom: 14
        }}>
          Scroll to begin
        </div>
        <div style={{
          width: 1, height: 50, margin: "0 auto",
          background: "linear-gradient(to bottom, rgba(251,245,230,0.6), transparent)"
        }} />
      </div>
    </section>
  )
}

// ============================================================================
// 2. THE GATHERING — massive number contained, photo & map composed editorially
// ============================================================================
function ThePull() {
  const ref = useRef(null)
  useReveal(ref)
  const numRef = useRef(null), subRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(numRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 2.0, ease: "power3.out",
          scrollTrigger: { trigger: numRef.current, start: "top 80%" } })
      gsap.fromTo(subRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.4,
          scrollTrigger: { trigger: subRef.current, start: "top 82%" } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="pull" ref={ref} style={{
      position: "relative", padding: "18vh 0 16vh", zIndex: 10
    }}>
      <div style={{ maxWidth: 1600, margin: "0 auto", padding: "0 64px" }}>

        <div className="moa-rise" style={{ marginBottom: 70 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 18 }}>
            <span className="moa-cap-warm">The Gathering</span>
            <span className="moa-line" style={{ width: 80 }} />
            <span style={{ fontFamily: F.display, fontStyle: "italic", color: C.ink55, fontSize: 14 }}>
              how many is many?
            </span>
          </div>
        </div>

        {/* THE NUMBER — properly sized, never overflows */}
        <div style={{ textAlign: "center", marginBottom: 120, padding: "40px 0" }}>
          <div ref={numRef} style={{
            fontFamily: F.display, fontWeight: 300,
            fontSize: "clamp(4rem, 14vw, 13rem)",
            lineHeight: 1, letterSpacing: "-0.04em",
            color: C.ink, opacity: 0,
            whiteSpace: "nowrap", overflow: "hidden"
          }}>
            <span style={{
              background: `linear-gradient(180deg, ${C.ink} 0%, ${C.saffron} 70%, ${C.rose} 110%)`,
              WebkitBackgroundClip: "text", backgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              40,000,000
            </span>
          </div>
          <div ref={subRef} style={{
            marginTop: 28, opacity: 0,
            fontFamily: F.display, fontWeight: 400, fontStyle: "italic",
            fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
            color: C.ink70, maxWidth: 920, margin: "28px auto 0"
          }}>
            More than the population of California. More than any stadium has ever held.
            Every single year — and they come <span style={{ color: C.rose }}>back.</span>
          </div>
        </div>

        {/* Editorial composition: large left text + map photo + small crowd inset */}
        <div className="moa-rise" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 70,
          alignItems: "start"
        }}>
          <div style={{ paddingTop: 40 }}>
            <h3 style={{
              fontFamily: F.display, fontWeight: 300,
              fontSize: "clamp(2.4rem, 5.2vw, 4.8rem)", lineHeight: 1.04,
              color: C.ink, marginBottom: 36, letterSpacing: "-0.025em"
            }}>
              <span style={{ fontStyle: "italic", color: C.saffron, fontWeight: 400 }}>Forty percent</span> travel<br/>
              more than 150 miles<br/>
              just to be here.
            </h3>
            <p style={{
              fontFamily: F.sans, fontWeight: 400, fontSize: 16,
              lineHeight: 1.75, color: C.ink70, maxWidth: 480
            }}>
              This is not a local errand. It is a destination decision — made every day,
              by people from every state, who could go anywhere and choose to come here.
              And keep coming. Year after year, generation after generation. Loyalty you
              cannot manufacture — you have to <em style={{ color: C.rose }}>earn it.</em>
            </p>

            <div style={{
              marginTop: 56, paddingTop: 36, borderTop: `1px solid ${C.ink12}`,
              display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28
            }}>
              {[
                { n: "$162", l: "Avg / visit" },
                { n: "$1.25", l: "Outside per $1 inside" },
                { n: "2.5×", l: "Intl / local spend" },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{
                    fontFamily: F.display, fontWeight: 400,
                    fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)",
                    color: C.saffron, lineHeight: 1
                  }}>{s.n}</div>
                  <div className="moa-cap" style={{ marginTop: 12 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Two-image composition: tall map + small crowd photo offset */}
          <div style={{ position: "relative", paddingLeft: 40 }}>
            <div className="moa-img" style={{
              aspectRatio: "4/5",
              boxShadow: "0 20px 60px rgba(26,17,8,0.16), 0 50px 130px rgba(26,17,8,0.08)"
            }}>
              <img src={ASSET.MAP} alt="Continental reach" style={{ filter: "saturate(1.1)" }} />
            </div>
            <div style={{
              marginTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
              <span className="moa-cap">Fig. 01 — Reach</span>
              <span className="moa-script" style={{ fontSize: 18 }}>they keep coming.</span>
            </div>

            {/* Small inset crowd photo, positioned editorially */}
            <div className="moa-img" style={{
              position: "absolute", left: -10, bottom: -60,
              width: 210, aspectRatio: "3/4",
              boxShadow: "0 18px 50px rgba(26,17,8,0.22)"
            }}>
              <img src={ASSET.CROWD} alt="Crowd energy" />
            </div>
          </div>
        </div>

        {/* Closing line */}
        <div className="moa-rise" style={{
          marginTop: 160, paddingTop: 50, borderTop: `1px solid ${C.ink12}`,
          textAlign: "center"
        }}>
          <div className="moa-script" style={{ fontSize: 24, marginBottom: 14 }}>
            and here, you become
          </div>
          <div style={{
            fontFamily: F.display, fontWeight: 400, fontStyle: "italic",
            fontSize: "clamp(2rem, 4.4vw, 4rem)", color: C.saffron
          }}>
            part of something bigger.
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// 3. THE PROMENADE — editorial magazine spread, no tilts, no plate labels
// ============================================================================
function Ecosystem() {
  const ref = useRef(null)
  useReveal(ref)

  const tenants = [
    "Louis Vuitton", "Cartier", "Saint Laurent", "Tiffany",
    "Coach", "Versace", "Fendi", "Nordstrom",
    "Macy's", "Apple", "Microsoft", "L.L. Bean",
    "Sephora", "Lego", "Nike", "American Girl",
    "Hugo Boss", "Burberry", "Michael Kors", "Lululemon"
  ]

  return (
    <section id="ecosystem" ref={ref} style={{
      position: "relative", padding: "14vh 0 16vh", zIndex: 10
    }}>
      <div style={{ maxWidth: 1600, margin: "0 auto", padding: "0 64px" }}>

        <div className="moa-rise" style={{
          marginBottom: 90,
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "end"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 28 }}>
              <span className="moa-cap-warm">The Promenade</span>
              <span className="moa-line" style={{ width: 80 }} />
              <span style={{ fontFamily: F.display, fontStyle: "italic", color: C.ink55, fontSize: 14 }}>
                a street of legends
              </span>
            </div>
            <h2 style={{
              fontFamily: F.display, fontWeight: 300,
              fontSize: "clamp(3rem, 7vw, 7.4rem)", lineHeight: 0.96,
              color: C.ink, letterSpacing: "-0.025em"
            }}>
              520 brands.<br/>
              <span style={{ fontStyle: "italic", color: C.saffron, fontWeight: 400 }}>One avenue.</span>
            </h2>
          </div>
          <p style={{
            fontFamily: F.sans, fontWeight: 400, fontSize: 17,
            lineHeight: 1.75, color: C.ink70, maxWidth: 500, paddingBottom: 14
          }}>
            From Cartier to Saint Laurent to Tiffany — and a hundred more — every retail
            format finds its rhythm inside the highest-density audience in the Midwest.
            95% occupancy. A waitlist, not a vacancy.
          </p>
        </div>

        {/* EDITORIAL MAGAZINE SPREAD —
            Tall hero left (Cartier corridor) + asymmetric stacked smaller right + pull quote below */}
        <div className="moa-scale" style={{
          display: "grid",
          gridTemplateColumns: "1.35fr 1fr",
          gap: 48, marginBottom: 80
        }}>
          {/* Tall hero — Cartier corridor */}
          <div>
            <div className="moa-img" style={{
              aspectRatio: "4/5",
              boxShadow: "0 30px 80px rgba(26,17,8,0.18), 0 60px 160px rgba(26,17,8,0.10)"
            }}>
              <img src={ASSET.LUXURY} alt="Luxury wing" />
            </div>
            <div style={{
              marginTop: 22, display: "flex", justifyContent: "space-between", alignItems: "baseline"
            }}>
              <div>
                <div style={{
                  fontFamily: F.display, fontWeight: 400, fontStyle: "italic",
                  fontSize: "1.4rem", color: C.ink
                }}>Cartier. Saint Laurent. Tiffany.</div>
                <div className="moa-cap" style={{ marginTop: 6 }}>The Luxury Wing — Level Three</div>
              </div>
              <span className="moa-script" style={{ fontSize: 18 }}>good company.</span>
            </div>
          </div>

          {/* Right column — asymmetric stack: pull quote on top, big arcade photo, small atrium */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div style={{ paddingTop: 20 }}>
              <div style={{
                fontFamily: F.display, fontWeight: 400, fontStyle: "italic",
                fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)",
                lineHeight: 1.18, color: C.ink, marginBottom: 24
              }}>
                "Your brand,<br/>in the company<br/>it deserves."
              </div>
              <div style={{
                paddingTop: 22, borderTop: `1px solid ${C.ink12}`,
                display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16
              }}>
                {[["520+","Brands"],["95%","Occupied"],["5.6M","Sq Ft"]].map(([n,l],i)=>(
                  <div key={i}>
                    <div style={{
                      fontFamily: F.display, fontWeight: 400, fontSize: "1.8rem",
                      color: C.saffron, lineHeight: 1
                    }}>{n}</div>
                    <div className="moa-cap" style={{ marginTop: 6, fontSize: 8.5 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="moa-img" style={{
              aspectRatio: "16/10", flex: 1,
              boxShadow: "0 22px 60px rgba(26,17,8,0.16)"
            }}>
              <img src={ASSET.WEST} alt="West atrium" />
            </div>

            <div style={{ display: "flex", gap: 18, alignItems: "stretch" }}>
              <div className="moa-img" style={{
                flex: 1, aspectRatio: "4/3",
                boxShadow: "0 18px 50px rgba(26,17,8,0.14)"
              }}>
                <img src={ASSET.DINING} alt="Dining experience" />
              </div>
              <div style={{
                flex: 1, paddingTop: 14,
                display: "flex", flexDirection: "column", justifyContent: "space-between"
              }}>
                <div className="moa-cap">The Dining Scene —</div>
                <div style={{
                  fontFamily: F.display, fontWeight: 400, fontStyle: "italic",
                  fontSize: "1.15rem", lineHeight: 1.4, color: C.ink70
                }}>
                  From fine dining to casual favorites — a world of flavors under one roof.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tenant marquee — scrolling tape, glossy transparent feel */}
        <div className="moa-rise" style={{
          marginTop: 100, paddingTop: 36, borderTop: `1px solid ${C.ink12}`
        }}>
          <div className="moa-cap" style={{ marginBottom: 26, padding: "0 64px" }}>In residence</div>
        </div>
      </div>

      {/* Full-width scrolling ticker — single line, cinema reel style */}
      <div className="moa-rise" style={{
        overflow: "hidden", height: 64,
        background: `linear-gradient(180deg, ${C.paperWarm}, ${C.paperDeep} 50%, ${C.paperWarm})`,
        borderTop: `1px solid ${C.ink12}`, borderBottom: `1px solid ${C.ink12}`,
        display: "flex", alignItems: "center"
      }}>
        <div className="moa-marquee" style={{ whiteSpace: "nowrap" }}>
          {[...tenants, ...tenants, ...tenants].map((t, i) => (
            <span key={i} style={{
              display: "inline", padding: "0 28px",
              fontFamily: F.display, fontWeight: 400, fontStyle: "italic",
              fontSize: "1.35rem", color: C.ink70, whiteSpace: "nowrap"
            }}>
              {t} <span style={{ color: C.saffron, margin: "0 12px", opacity: 0.7, fontSize: "0.7em" }}>{"\u2726"}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Editorial break — aerial as cinematic full-width hero moment */}
      <div className="moa-rise" style={{
        position: "relative", margin: "80px 0 0", overflow: "hidden",
        minHeight: 500
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${ASSET.EXTERIOR})`,
          backgroundSize: "cover", backgroundPosition: "center 30%"
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(26,17,8,0.75) 0%, rgba(26,17,8,0.35) 50%, transparent 100%)"
        }} />
        <div style={{
          position: "relative", maxWidth: 1600, margin: "0 auto",
          padding: "100px 64px", display: "flex", flexDirection: "column", justifyContent: "center",
          minHeight: 500
        }}>
          <div className="moa-cap" style={{ color: C.marigold, marginBottom: 18 }}>
            One address. Every reason.
          </div>
          <h3 style={{
            fontFamily: F.display, fontWeight: 300,
            fontSize: "clamp(2.4rem, 5vw, 4.8rem)", lineHeight: 1.02,
            color: C.cream, maxWidth: 540, letterSpacing: "-0.02em", marginBottom: 28
          }}>
            More than a destination.<br/>
            <span style={{ fontStyle: "italic", color: C.marigold, fontWeight: 400 }}>A place that earns its visitors.</span>
          </h3>
          <p style={{
            fontFamily: F.sans, fontWeight: 400, fontSize: 16,
            lineHeight: 1.7, color: "rgba(251,245,230,0.75)", maxWidth: 440
          }}>
            5.6 million square feet. 520 brands. The largest retail and entertainment
            complex in North America — and forty million people choose it, every year.
          </p>
        </div>
      </div>

      {/* Entrance sign — editorial pair below */}
      <div style={{ maxWidth: 1600, margin: "0 auto", padding: "70px 64px 0" }}>
        <div className="moa-rise" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center"
        }}>
          <div className="moa-img" style={{
            aspectRatio: "16/10",
            boxShadow: "0 22px 60px rgba(26,17,8,0.14)"
          }}>
            <img src={ASSET.ENTRANCE} alt="Mall of America entrance sign" />
          </div>
          <div>
            <div className="moa-cap-warm" style={{ marginBottom: 18 }}>At the heart of it all</div>
            <h4 style={{
              fontFamily: F.display, fontWeight: 400,
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)", lineHeight: 1.1,
              color: C.ink, marginBottom: 22, letterSpacing: "-0.01em"
            }}>
              From world-class shopping to unforgettable events —
              <span style={{ fontStyle: "italic", color: C.saffron }}> Mall of America brings
              people together</span> like no other place on earth.
            </h4>
            <div className="moa-script" style={{ fontSize: 20, marginTop: 16 }}>
              thirty-four years and counting.
            </div>
          </div>
        </div>

        <div className="moa-rise" style={{
          marginTop: 100, paddingTop: 50, borderTop: `1px solid ${C.ink12}`,
          textAlign: "center"
        }}>
          <div className="moa-script" style={{ fontSize: 24, marginBottom: 14 }}>
            and here, you become
          </div>
          <div style={{
            fontFamily: F.display, fontWeight: 400, fontStyle: "italic",
            fontSize: "clamp(2rem, 4.4vw, 4rem)", color: C.saffron
          }}>
            a destination, not a location.
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// 4. THE SPECTACLE — asymmetric magazine composition, one hero + smaller punctuation
// ============================================================================
function Energy() {
  const ref = useRef(null)
  useReveal(ref)

  const reels = [
    { id: "FRgCnMKVXHA", title: "The full tour", duration: "04:12" },
    { id: "nbN0nIGiT2g", title: "Nickelodeon Universe", duration: "02:48" },
    { id: "l-rawLEHRZM", title: "SEA LIFE Aquarium", duration: "03:24" },
    { id: "4hf1nz3eBYo", title: "FlyOver America", duration: "01:36" },
    { id: "_F9t5unnyWU", title: "Events & activations", duration: "02:12" },
    { id: "oIoBwLK8JqM", title: "From above", duration: "04:48" },
  ]

  return (
    <section id="energy" ref={ref} style={{
      position: "relative", padding: "14vh 0 16vh", zIndex: 10,
      background: `linear-gradient(180deg, ${C.paper} 0%, ${C.paperWarm} 50%, ${C.paper} 100%)`
    }}>
      <div style={{ maxWidth: 1600, margin: "0 auto", padding: "0 64px" }}>

        <div className="moa-rise" style={{
          marginBottom: 90,
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "end"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 28 }}>
              <span className="moa-cap-warm">The Spectacle</span>
              <span className="moa-line" style={{ width: 80 }} />
              <span style={{ fontFamily: F.display, fontStyle: "italic", color: C.ink55, fontSize: 14 }}>
                color, motion, life
              </span>
            </div>
            <h2 style={{
              fontFamily: F.display, fontWeight: 300,
              fontSize: "clamp(3rem, 7vw, 7.4rem)", lineHeight: 0.96,
              color: C.ink, letterSpacing: "-0.025em"
            }}>
              They didn't come<br/>to shop.<br/>
              <span style={{ fontStyle: "italic", color: C.rose, fontWeight: 400 }}>They came for this.</span>
            </h2>
          </div>
          <p style={{
            fontFamily: F.sans, fontWeight: 400, fontSize: 17,
            lineHeight: 1.75, color: C.ink70, maxWidth: 500, paddingBottom: 14
          }}>
            Seven world-class attractions under one roof. The country's largest indoor
            theme park. A 1.3-million-gallon ocean. Color, chemistry, flight — an entire
            afternoon people remember for years.
          </p>
        </div>

        {/* MAGAZINE COMPOSITION — Hero attraction big & dominant, supporting punctuation */}

        {/* Row 1: Massive Nickelodeon hero + label/quote column */}
        <div className="moa-scale" style={{
          display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 56, marginBottom: 70
        }}>
          <div className="moa-img" style={{
            aspectRatio: "16/10",
            boxShadow: "0 36px 90px rgba(26,17,8,0.20), 0 70px 180px rgba(26,17,8,0.12)"
          }}>
            <img src={ASSET.ATTRACTIONS} alt="Nickelodeon Universe" />
          </div>
          <div style={{
            paddingTop: 30,
            display: "flex", flexDirection: "column", justifyContent: "center"
          }}>
            <span className="moa-cap-warm">No. 01 — The Anchor</span>
            <h3 style={{
              marginTop: 18,
              fontFamily: F.display, fontWeight: 300,
              fontSize: "clamp(2rem, 3.4vw, 3rem)", lineHeight: 1.05,
              color: C.ink, marginBottom: 22, letterSpacing: "-0.02em"
            }}>
              <span style={{ fontStyle: "italic", color: C.saffron, fontWeight: 400 }}>Nickelodeon Universe</span> —
              the largest indoor theme park in America.
            </h3>
            <p style={{
              fontFamily: F.sans, fontWeight: 400, fontSize: 15,
              lineHeight: 1.7, color: C.ink70
            }}>
              Seven acres. Twenty-seven rides. The kind of afternoon you can't have
              anywhere else in the country, indoors or out.
            </p>
            <div style={{
              marginTop: 28, paddingTop: 22, borderTop: `1px solid ${C.ink12}`,
              display: "flex", gap: 40
            }}>
              <div>
                <div style={{ fontFamily: F.display, fontWeight: 400, fontSize: "1.8rem", color: C.saffron, lineHeight: 1 }}>7</div>
                <div className="moa-cap" style={{ marginTop: 8 }}>Acres</div>
              </div>
              <div>
                <div style={{ fontFamily: F.display, fontWeight: 400, fontSize: "1.8rem", color: C.saffron, lineHeight: 1 }}>27</div>
                <div className="moa-cap" style={{ marginTop: 8 }}>Rides</div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Three asymmetric supporting images — SEA LIFE wide, Crayola tall, Lego small */}
        <div className="moa-rise" style={{
          display: "grid", gridTemplateColumns: "2fr 1fr 1.4fr", gap: 32, marginBottom: 90
        }}>
          <div>
            <div className="moa-img" style={{
              aspectRatio: "16/11",
              boxShadow: "0 24px 60px rgba(26,17,8,0.14)"
            }}>
              <img src={ASSET.SEALIFE} alt="SEA LIFE" />
            </div>
            <div style={{ marginTop: 18 }}>
              <div style={{
                fontFamily: F.display, fontWeight: 400, fontStyle: "italic",
                fontSize: "1.3rem", color: C.ink
              }}>SEA LIFE Aquarium</div>
              <div className="moa-cap" style={{ marginTop: 6 }}>1.3M gallons · 10,000 creatures</div>
            </div>
          </div>

          <div>
            <div className="moa-img" style={{
              aspectRatio: "3/4",
              boxShadow: "0 24px 60px rgba(26,17,8,0.14)"
            }}>
              <img src={ASSET.CRAYOLA} alt="Crayola" />
            </div>
            <div style={{ marginTop: 18 }}>
              <div style={{
                fontFamily: F.display, fontWeight: 400, fontStyle: "italic",
                fontSize: "1.3rem", color: C.ink
              }}>Crayola Experience</div>
              <div className="moa-cap" style={{ marginTop: 6 }}>25+ activities · Color lab</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div className="moa-img" style={{
              aspectRatio: "5/4",
              boxShadow: "0 24px 60px rgba(26,17,8,0.14)"
            }}>
              <img src={ASSET.LEGO} alt="Lego" />
            </div>
            <div>
              <div style={{
                fontFamily: F.display, fontWeight: 400, fontStyle: "italic",
                fontSize: "1.3rem", color: C.ink
              }}>LEGO Imagination Center</div>
              <div className="moa-cap" style={{ marginTop: 6 }}>Flagship · 4,500 sq ft</div>
            </div>
            <div style={{ paddingTop: 14, borderTop: `1px solid ${C.ink12}` }}>
              <div className="moa-script" style={{ fontSize: 18 }}>
                an afternoon they remember.
              </div>
            </div>
          </div>
        </div>

        {/* REELS — film-strip presentation, smaller, secondary role, refined */}
        <div className="moa-rise">
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "baseline",
            marginBottom: 28, paddingBottom: 18, borderBottom: `1px solid ${C.ink12}`
          }}>
            <div>
              <span className="moa-cap-warm">Selected Reels</span>
              <div style={{
                marginTop: 6,
                fontFamily: F.display, fontWeight: 400, fontStyle: "italic",
                fontSize: "1.4rem", color: C.ink
              }}>
                Six moments — from the floor.
              </div>
            </div>
            <span className="moa-cap">06 / 06</span>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16
          }}>
            {reels.map((r, i) => (
              <a key={r.id} href={`https://www.youtube.com/watch?v=${r.id}`}
                 target="_blank" rel="noopener noreferrer" data-mag
                 style={{ display: "block" }}>
                <div className="moa-img" style={{
                  aspectRatio: "3/4",
                  boxShadow: "0 16px 40px rgba(26,17,8,0.14)"
                }}>
                  <img src={`https://i.ytimg.com/vi/${r.id}/maxresdefault.jpg`} alt={r.title}
                       style={{ filter: "saturate(0.92)" }} />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(180deg, rgba(26,17,8,0.05) 50%, rgba(26,17,8,0.65) 100%)"
                  }} />
                  <div style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: 44, height: 44, borderRadius: "50%",
                    border: `1px solid ${C.cream}`,
                    background: "rgba(251,245,230,0.18)", backdropFilter: "blur(4px)",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <div style={{
                      width: 0, height: 0,
                      borderLeft: `9px solid ${C.cream}`,
                      borderTop: "6px solid transparent",
                      borderBottom: "6px solid transparent",
                      marginLeft: 3
                    }} />
                  </div>
                  <div style={{
                    position: "absolute", left: 12, bottom: 12, right: 12,
                    fontFamily: F.mono, fontSize: 8, fontWeight: 500,
                    letterSpacing: "0.2em", textTransform: "uppercase",
                    color: C.cream, opacity: 0.9
                  }}>
                    {r.duration}
                  </div>
                </div>
                <div style={{ marginTop: 12 }}>
                  <div style={{
                    fontFamily: F.display, fontWeight: 400, fontStyle: "italic",
                    fontSize: "1.05rem", color: C.ink, lineHeight: 1.25
                  }}>
                    {r.title}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="moa-rise" style={{
          marginTop: 120, paddingTop: 50, borderTop: `1px solid ${C.ink12}`,
          textAlign: "center"
        }}>
          <div className="moa-script" style={{ fontSize: 24, marginBottom: 14 }}>
            and here, you become
          </div>
          <div style={{
            fontFamily: F.display, fontWeight: 400, fontStyle: "italic",
            fontSize: "clamp(2rem, 4.4vw, 4rem)", color: C.rose
          }}>
            the reason they came.
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// 5. THE STAGE — cobalt drop with spotlight (kept, this is the climax you liked)
// ============================================================================
function Platform() {
  const ref = useRef(null)
  useReveal(ref)
  const brandRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic reveal: emerge from below, letters spread, halo blooms
      const tl = gsap.timeline({
        scrollTrigger: { trigger: brandRef.current, start: "top 78%" }
      })
      tl.fromTo(brandRef.current,
        { opacity: 0, y: 80, letterSpacing: "0.04em", filter: "blur(28px)", scale: 0.95 },
        { opacity: 1, y: 0, letterSpacing: "0.32em", filter: "blur(0px)", scale: 1,
          duration: 2.8, ease: "power4.out" })
      // Halo bloom expands
      tl.fromTo("#moa-stage-halo",
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 2.4, ease: "power2.out" }, "-=2.0")
      // Subtitle fades in after brand lands
      tl.fromTo("#moa-stage-sub",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" }, "-=1.0")
    }, ref)
    return () => ctx.revert()
  }, [])

  const partners = ["Pepsi", "Glossier", "Marvel", "Disney", "Nike", "Apple", "Microsoft", "Lego", "Sephora", "American Express"]

  return (
    <section id="platform" ref={ref} style={{
      position: "relative", padding: "16vh 0 16vh", zIndex: 10
    }}>
      <div style={{ maxWidth: 1600, margin: "0 auto", padding: "0 64px" }}>

        <div className="moa-rise" style={{
          marginBottom: 70,
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "end"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 28 }}>
              <span className="moa-cap-warm">The Stage</span>
              <span className="moa-line" style={{ width: 80 }} />
              <span style={{ fontFamily: F.display, fontStyle: "italic", color: C.ink55, fontSize: 14 }}>
                step into the light
              </span>
            </div>
            <h2 style={{
              fontFamily: F.display, fontWeight: 300,
              fontSize: "clamp(3rem, 7vw, 7.4rem)", lineHeight: 0.96,
              color: C.ink, letterSpacing: "-0.025em"
            }}>
              Not a venue<br/>you book.<br/>
              <span style={{ fontStyle: "italic", color: C.saffron, fontWeight: 400 }}>A stage you step onto.</span>
            </h2>
          </div>
          <p style={{
            fontFamily: F.sans, fontWeight: 400, fontSize: 17,
            lineHeight: 1.75, color: C.ink70, maxWidth: 500, paddingBottom: 14
          }}>
            400+ events a year. Concerts, premieres, immersive activations,
            full-park buyouts. The audience is already here.
          </p>
        </div>
      </div>

      {/* THE STAGE — single cinematic full-bleed drop */}
      <div className="moa-fade" style={{
        position: "relative", height: "90vh", minHeight: 700,
        margin: "0 64px", overflow: "hidden",
        background: `linear-gradient(180deg, ${C.cobaltDeep} 0%, #0a1730 50%, ${C.cobaltDeep} 100%)`
      }}>
        <img src={ASSET.EVENTS} alt="Stage" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", opacity: 0.5, mixBlendMode: "screen"
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 38% 100% at 50% -10%, rgba(255,232,200,0.6), transparent 60%)",
          mixBlendMode: "screen"
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 80% at 50% 70%, transparent 0%, rgba(14,31,64,0.62) 100%)"
        }} />

        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "0 32px"
        }}>
          <div style={{
            fontFamily: F.mono, fontSize: 10, fontWeight: 500,
            letterSpacing: "0.5em", textTransform: "uppercase",
            color: C.marigold, marginBottom: 36
          }}>
            — Step into the light —
          </div>
          {/* Halo bloom behind brand */}
          <div id="moa-stage-halo" style={{
            position: "absolute", width: "80%", maxWidth: 900, aspectRatio: "2/1",
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(216,154,58,0.40), rgba(255,232,200,0.12) 50%, transparent 80%)",
            pointerEvents: "none", opacity: 0
          }} />
          <div ref={brandRef} style={{
            opacity: 0,
            fontFamily: F.display, fontWeight: 300,
            fontSize: "clamp(3rem, 9vw, 9.2rem)", lineHeight: 0.94,
            color: C.cream, letterSpacing: "0.32em", textIndent: "0.32em",
            textShadow: `0 0 100px ${C.marigold}, 0 0 240px rgba(255,232,200,0.45)`,
            position: "relative"
          }}>
            YOUR BRAND
          </div>
          <div id="moa-stage-sub" style={{
            marginTop: 44, maxWidth: 820, opacity: 0,
            fontFamily: F.display, fontWeight: 300, fontStyle: "italic",
            fontSize: "clamp(1.3rem, 2.4vw, 2.2rem)", lineHeight: 1.35,
            color: C.blush
          }}>
            On the stage where forty million people are already watching.
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1600, margin: "120px auto 0", padding: "0 64px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 80 }}>
          <div className="moa-rise">
            <span className="moa-cap-warm">Brands that have activated here</span>
            <div style={{
              marginTop: 28, display: "flex", flexDirection: "column", gap: 0
            }}>
              {partners.map((p, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "baseline",
                  padding: "16px 0", borderBottom: i < partners.length - 1 ? `1px solid ${C.ink12}` : "none",
                  fontFamily: F.display, fontWeight: 400, fontStyle: "italic",
                  fontSize: "clamp(1.2rem, 1.6vw, 1.5rem)", color: C.ink
                }}>
                  <span>{p}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 9, fontWeight: 500, color: C.ink40, letterSpacing: "0.2em" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
            <div className="moa-script" style={{ marginTop: 22, fontSize: 20 }}>+ and counting.</div>
          </div>

          <div>
            <h3 className="moa-rise" style={{
              fontFamily: F.display, fontWeight: 300,
              fontSize: "clamp(2rem, 4vw, 3.8rem)", lineHeight: 1.05,
              color: C.ink, marginBottom: 36, letterSpacing: "-0.02em"
            }}>
              When a brand steps onto this stage,<br/>
              <span style={{ fontStyle: "italic", color: C.saffron, fontWeight: 400 }}>it does not get bigger.</span><br/>
              It becomes <em style={{ color: C.rose }}>significant.</em>
            </h3>
            <p className="moa-rise" style={{
              fontFamily: F.sans, fontWeight: 400, fontSize: 16,
              lineHeight: 1.8, color: C.ink70, maxWidth: 680, marginBottom: 50
            }}>
              On-mall signage. Immersive activations. Sampling that reaches a city in a
              weekend. Full-park buyouts. Premieres that trend before they end. Mall of
              America does not lend its audience. It transfers thirty-four years of
              earned attention onto whatever it touches.
            </p>

            <div className="moa-rise" style={{
              paddingTop: 32, borderTop: `1px solid ${C.ink12}`,
              paddingLeft: 32, borderLeft: `2px solid ${C.saffron}`,
              maxWidth: 720
            }}>
              <div style={{
                fontFamily: F.display, fontWeight: 400, fontStyle: "italic",
                fontSize: "clamp(1.3rem, 2vw, 1.9rem)",
                color: C.ink, lineHeight: 1.4, marginBottom: 18
              }}>
                "30% of activated tenants reported their best sales day on record."
              </div>
              <div className="moa-cap">Black Friday 2024 — Industry Report</div>
            </div>
          </div>
        </div>

        <div className="moa-rise" style={{
          marginTop: 130, paddingTop: 50, borderTop: `1px solid ${C.ink12}`,
          textAlign: "center"
        }}>
          <div className="moa-script" style={{ fontSize: 24, marginBottom: 14 }}>
            and here, you become
          </div>
          <div style={{
            fontFamily: F.display, fontWeight: 400, fontStyle: "italic",
            fontSize: "clamp(2.2rem, 4.8vw, 4.4rem)", color: C.saffron
          }}>
            a cultural moment.
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// 6. THE CHRONICLE — editorial typesetting, not card grid.
// One massive primary figure, smaller figures as typographic punctuation
// ============================================================================
function Record() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section id="record" ref={ref} style={{
      position: "relative", padding: "14vh 0 16vh", zIndex: 10,
      background: `linear-gradient(180deg, ${C.paper} 0%, ${C.paperDeep} 100%)`
    }}>
      <div style={{ maxWidth: 1600, margin: "0 auto", padding: "0 64px" }}>

        <div className="moa-rise" style={{
          marginBottom: 100,
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "end"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 28 }}>
              <span className="moa-cap-warm">The Chronicle</span>
              <span className="moa-line" style={{ width: 80 }} />
              <span style={{ fontFamily: F.display, fontStyle: "italic", color: C.ink55, fontSize: 14 }}>
                on the record
              </span>
            </div>
            <h2 style={{
              fontFamily: F.display, fontWeight: 300,
              fontSize: "clamp(2.6rem, 6vw, 6.4rem)", lineHeight: 1.0,
              color: C.ink, letterSpacing: "-0.025em"
            }}>
              The numbers do not argue.<br/>
              <span style={{ fontStyle: "italic", color: C.saffron, fontWeight: 400 }}>They inform.</span>
            </h2>
          </div>
          <p style={{
            fontFamily: F.sans, fontWeight: 400, fontSize: 17,
            lineHeight: 1.8, color: C.ink70, maxWidth: 500
          }}>
            This is not a highlight reel. This is what happens, every day, year after year,
            when a place becomes the center of a continent's attention.
          </p>
        </div>

        {/* TYPOGRAPHIC POSTER COMPOSITION — not boxes */}
        <div className="moa-rise" style={{
          display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 80,
          alignItems: "start", marginBottom: 100
        }}>
          {/* Primary figure — colossal, anchors the page */}
          <div>
            <div className="moa-cap-warm">Record · Black Friday 2024</div>
            <div style={{
              marginTop: 22,
              fontFamily: F.display, fontWeight: 300,
              fontSize: "clamp(5rem, 14vw, 14rem)", lineHeight: 0.88,
              color: C.ink, letterSpacing: "-0.04em"
            }}>
              <span style={{
                background: `linear-gradient(180deg, ${C.ink} 0%, ${C.saffron} 85%)`,
                WebkitBackgroundClip: "text", backgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                230,000
              </span>
            </div>
            <div style={{
              marginTop: 24,
              fontFamily: F.display, fontWeight: 400, fontStyle: "italic",
              fontSize: "clamp(1.4rem, 2.2vw, 2rem)", color: C.ink70, lineHeight: 1.3
            }}>
              visitors in a single day — the largest in our history.
            </div>
          </div>

          {/* Supporting figures — clean editorial column, no boxes */}
          <div style={{ paddingTop: 30 }}>
            {[
              { n: "1B+", l: "Visits since 1992", note: "and counting" },
              { n: "30%", l: "Activated tenants set new sales records", note: "single day" },
              { n: "$162", l: "Average spend per visit", note: "verified" },
              { n: "16M", l: "Out-of-state travelers", note: "annual" },
              { n: "5.6M", l: "Square feet of complex", note: "all of it" },
            ].map((f, i) => (
              <div key={i} style={{
                padding: "26px 0",
                borderBottom: i < 4 ? `1px solid ${C.ink12}` : "none",
                display: "grid", gridTemplateColumns: "auto 1fr", gap: 28, alignItems: "baseline"
              }}>
                <div style={{
                  fontFamily: F.display, fontWeight: 400,
                  fontSize: "clamp(2rem, 3vw, 2.8rem)", lineHeight: 1,
                  color: C.saffron, minWidth: 110
                }}>
                  {f.n}
                </div>
                <div>
                  <div style={{
                    fontFamily: F.display, fontWeight: 400, fontStyle: "italic",
                    fontSize: "1.15rem", color: C.ink, lineHeight: 1.3
                  }}>
                    {f.l}
                  </div>
                  <div className="moa-cap" style={{ marginTop: 6, fontSize: 9 }}>
                    {f.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="moa-rise" style={{
          marginTop: 80, padding: "60px 0", textAlign: "center",
          borderTop: `1px solid ${C.ink12}`, borderBottom: `1px solid ${C.ink12}`
        }}>
          <div style={{
            fontFamily: F.display, fontWeight: 300, fontStyle: "italic",
            fontSize: "clamp(1.8rem, 3.4vw, 3.2rem)", lineHeight: 1.3,
            color: C.ink, maxWidth: 1100, margin: "0 auto", letterSpacing: "-0.015em"
          }}>
            "Brands don't choose Mall of America for the traffic.<br/>
            They choose it because being here <span style={{ color: C.saffron }}>means something.</span>"
          </div>
          <div className="moa-cap" style={{ marginTop: 32 }}>
            Industry observer · 2024
          </div>
        </div>

        <div className="moa-rise" style={{
          marginTop: 100, textAlign: "center"
        }}>
          <div className="moa-script" style={{ fontSize: 24, marginBottom: 14 }}>
            and here, you become
          </div>
          <div style={{
            fontFamily: F.display, fontWeight: 400, fontStyle: "italic",
            fontSize: "clamp(2.2rem, 4.8vw, 4.4rem)", color: C.saffron
          }}>
            inevitable.
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// 7. THE INVITATION — clean, refined, no modal pop, addressed personally
// ============================================================================
function Decision() {
  const ref = useRef(null)
  useReveal(ref)
  const [hover, setHover] = useState(null)
  const closingRef = useRef(null)
  const finalRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Closing line emerges with weight
      gsap.fromTo(closingRef.current,
        { opacity: 0, y: 50, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 2.0, ease: "power3.out",
          scrollTrigger: { trigger: closingRef.current, start: "top 80%" }})
      gsap.fromTo(finalRef.current,
        { opacity: 0, y: 30, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 2.2, ease: "power3.out",
          scrollTrigger: { trigger: finalRef.current, start: "top 82%" }})
    }, ref)
    return () => ctx.revert()
  }, [])

  const paths = [
    {
      key: "store", num: "One", title: "Open a store.",
      body: "Take a place inside the highest-density retail environment in the Midwest. Flagship to pop-up — every format works here.",
      cta: "Begin a conversation",
      to: "leasing@mallofamerica.com",
      tag: "Retail · Luxury"
    },
    {
      key: "campaign", num: "Two", title: "Launch a campaign.",
      body: "Forty million people. Your brand. In the context of America's most visited destination. Every format of activation available.",
      cta: "Explore partnerships",
      to: "brand@mallofamerica.com",
      tag: "Sponsorship · Activation"
    },
    {
      key: "venue", num: "Three", title: "Book the stage.",
      body: "400+ events a year. Concerts. Premieres. Corporate moments. The platform, the audience, the infrastructure — already here.",
      cta: "Inquire about events",
      to: "groupsales@mallofamerica.com",
      tag: "Events · Venues"
    }
  ]

  return (
    <section id="decision" ref={ref} style={{
      position: "relative", padding: "14vh 0 12vh", zIndex: 10
    }}>
      <div style={{ maxWidth: 1600, margin: "0 auto", padding: "0 64px" }}>

        <div className="moa-rise" style={{ textAlign: "center", marginBottom: 90 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginBottom: 28 }}>
            <span className="moa-line" style={{ width: 60 }} />
            <span className="moa-cap-warm">The Invitation</span>
            <span className="moa-line" style={{ width: 60 }} />
          </div>
          <div className="moa-script" style={{ fontSize: 26, marginBottom: 16 }}>
            this letter is for you.
          </div>
          <h2 style={{
            fontFamily: F.display, fontWeight: 300,
            fontSize: "clamp(2.6rem, 7vw, 7.4rem)", lineHeight: 0.98,
            color: C.ink, letterSpacing: "-0.025em",
            maxWidth: 1000, margin: "0 auto"
          }}>
            Thirty-four years of<br/>
            <span style={{ fontStyle: "italic", color: C.saffron, fontWeight: 400 }}>earning this moment.</span>
          </h2>
        </div>

        {/* Three paths — editorial, clean, no card chrome, just typography and lines */}
        <div className="moa-rise" style={{
          display: "grid", gridTemplateColumns: "repeat(3,1fr)",
          gap: 0,
          borderTop: `1px solid ${C.ink25}`,
          borderBottom: `1px solid ${C.ink25}`
        }}>
          {paths.map((p, i) => (
            <a key={p.key} href={`mailto:${p.to}`} data-mag
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{
                position: "relative", padding: "56px 44px 50px",
                borderRight: i < 2 ? `1px solid ${C.ink25}` : "none",
                background: hover === i ? "rgba(216,154,58,0.04)" : "transparent",
                transition: "background .5s",
                display: "flex", flexDirection: "column",
                minHeight: 460
              }}>
              <div style={{
                fontFamily: F.display, fontWeight: 400, fontStyle: "italic",
                fontSize: "1.6rem", color: C.saffron, marginBottom: 32
              }}>
                {p.num}.
              </div>
              <h3 style={{
                fontFamily: F.display, fontWeight: 300,
                fontSize: "clamp(2rem, 3vw, 2.8rem)", lineHeight: 1.05,
                color: C.ink, marginBottom: 26, letterSpacing: "-0.02em"
              }}>
                {p.title}
              </h3>
              <p style={{
                fontFamily: F.sans, fontWeight: 400, fontSize: 15,
                lineHeight: 1.75, color: C.ink70, marginBottom: 40,
                flex: 1
              }}>
                {p.body}
              </p>
              <div style={{
                paddingTop: 22, borderTop: `1px solid ${C.ink12}`
              }}>
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "baseline",
                  marginBottom: 8
                }}>
                  <span style={{
                    fontFamily: F.mono, fontSize: 10, fontWeight: 600,
                    letterSpacing: "0.32em", textTransform: "uppercase", color: C.ink,
                    display: "flex", alignItems: "center", gap: 10
                  }}>
                    {p.cta}
                    <span style={{
                      display: "inline-block",
                      transform: hover === i ? "translateX(6px)" : "translateX(0)",
                      transition: "transform .4s",
                      fontFamily: F.mono
                    }}>
                      {"\u2192"}
                    </span>
                  </span>
                </div>
                <div className="moa-cap" style={{ fontSize: 9 }}>{p.tag}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Final — the emotional landing */}
        <div style={{ marginTop: 130, textAlign: "center" }}>
          <div ref={closingRef} style={{ opacity: 0, marginBottom: 24 }}>
            <div className="moa-script" style={{ fontSize: 26, marginBottom: 18 }}>
              and so the question is not if, but when.
            </div>
            <div style={{
              fontFamily: F.display, fontWeight: 300,
              fontSize: "clamp(2.6rem, 6vw, 6.2rem)", lineHeight: 1.0,
              color: C.ink, letterSpacing: "-0.025em"
            }}>
              Because a place that <span style={{ fontStyle: "italic", color: C.saffron, fontWeight: 400 }}>forty million people</span><br/>
              choose every year is not waiting for you.
            </div>
          </div>

          <div ref={finalRef} style={{
            opacity: 0, marginTop: 50,
            fontFamily: F.display, fontWeight: 400, fontStyle: "italic",
            fontSize: "clamp(3rem, 8vw, 8rem)", color: C.saffron, lineHeight: 1,
            textShadow: `0 0 60px rgba(201,122,46,0.25)`
          }}>
            It is inviting you.
          </div>

          <div style={{
            marginTop: 80, display: "flex", justifyContent: "center", gap: 36,
            flexWrap: "wrap", alignItems: "center"
          }}>
            <a href="mailto:groupsales@mallofamerica.com" data-mag className="moa-btn">
              <span>groupsales@mallofamerica.com</span>
              <span>{"\u2192"}</span>
            </a>
            <span style={{
              fontFamily: F.mono, fontSize: 11, fontWeight: 500,
              letterSpacing: "0.36em", color: C.ink55
            }}>
              952.883.8809
            </span>
          </div>

          <div style={{
            marginTop: 80, paddingTop: 40, borderTop: `1px solid ${C.ink12}`,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 18
          }}>
            <div>
              <div style={{
                fontFamily: F.display, fontWeight: 500, fontSize: 18, color: C.ink
              }}>
                Mall of <span style={{ fontStyle: "italic", color: C.saffron }}>America</span>
              </div>
              <div className="moa-cap" style={{ marginTop: 4 }}>
                Bloomington, Minnesota
              </div>
            </div>
            <div className="moa-script" style={{ fontSize: 22 }}>
              we'll save you a seat.
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="moa-cap">Edition</div>
              <div style={{
                fontFamily: F.display, fontWeight: 400, fontStyle: "italic",
                fontSize: 18, color: C.ink
              }}>
                Volume One · 2026
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// APP
// ============================================================================
export default function App() {
  useGlobals()
  useCursor()
  const audio = useAudio()
  const [active, setActive] = useState(0)

  useEffect(() => {
    const sections = CHAPTERS.map(c => document.getElementById(c.id))
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = sections.indexOf(e.target)
          if (idx > -1) setActive(idx)
        }
      })
    }, { threshold: 0.4 })
    sections.forEach(s => s && io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <div className="moa-paper" />
      <DawnField />
      <div className="moa-grain" />
      <HUD active={active} audio={audio} />
      <AudioPrompt armed={audio.armed} />
      <Hero />
      <ThePull />
      <Ecosystem />
      <Energy />
      <Platform />
      <Record />
      <Decision />
    </>
  )
}
