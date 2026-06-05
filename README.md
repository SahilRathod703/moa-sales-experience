# Mall of America — Interactive Sales Experience

> **A cinematic, scroll-driven sales deck** for Mall of America, built as a single-page React application with Three.js atmospheric rendering, GSAP scroll choreography, and AI-generated assets.

**[Live Demo](https://moa-sales-experience.vercel.app)** · **[GitHub](https://github.com/SahilRathod703/moa-sales-experience)**

---

## Overview

This project reimagines the traditional retail sales deck as an immersive digital experience. Instead of slides and bullet points, the visitor scrolls through a cinematic narrative — seven chapters that unfold the scale, luxury, energy, and commercial power of America's largest retail and entertainment complex.

The experience opens with a full-bleed image montage set to ambient scoring, transitions through editorial photography compositions, and climaxes with a cobalt-lit stage reveal. Every detail — from the custom cursor to the Three.js dust motes drifting in warm light — is designed to make the viewer *feel* what it means to be part of Mall of America before they read a single statistic.

## Tech Stack

- **React 19** — Single-file component architecture (App.jsx)
- **Three.js** — Custom WebGL sunrise field with shader-driven particle system (1,600 dust motes, 4 volumetric light beams, parallax camera)
- **GSAP + ScrollTrigger** — Scroll-linked animations, cinematic timeline sequences, blur/scale/opacity choreography
- **Vite** — Build tooling with HMR
- **Vercel** — Deployment and hosting

## Features

### Visual Design
- **Cream paper base** with warm radial color gradients (saffron, rose, jade) — a festival palette inspired by golden-hour light
- **Editorial magazine layouts** — asymmetric photo compositions where each image earns its scale based on narrative role
- **Fraunces display serif** + Inter + JetBrains Mono + Caveat handwritten accents — four-font typographic system
- **Paper grain texture** with multiply-blend noise overlay for tactile feel

### Interaction
- **Custom cursor** — saffron dot with lagging ring, swells on interactive elements
- **Ambient audio engine** — loops on first user gesture, toggleable with live visualizer bars in the HUD
- **Image montage hero** — four-shot auto-crossfade with Ken Burns zoom and cinematic vignette
- **YOUR BRAND reveal** — scroll-triggered emergence with letter-spacing expansion, blur-to-sharp, and golden halo bloom
- **Invitation paths** — three mailto: cards with hover-warm backgrounds and arrow animations

### AI Integration
- **AI-generated imagery** — select photographic assets created and enhanced using AI tools
- **AI-assisted development** — entire codebase developed collaboratively with Claude (Anthropic), from creative direction through implementation
- **AI-powered ambient scoring** — background audio generated with AI composition tools

### Content Architecture
Seven narrative chapters, each with a recurring "and here, you become..." refrain:

| Chapter | Theme | Closing Line |
|---------|-------|-------------|
| Sunrise | The cinematic hook | — |
| The Gathering | Scale (40M visitors) | *Part of something bigger* |
| The Promenade | Luxury & retail (520 brands) | *A destination, not a location* |
| The Spectacle | Attractions & energy | *The reason they came* |
| The Stage | Brand transformation (climax) | *A cultural moment* |
| The Chronicle | Proof & data | *Inevitable* |
| The Invitation | Three paths forward | *It is inviting you* |

### Performance
- Responsive across desktop and tablet viewports
- Lazy-loaded images with Ken Burns hover animations
- Paper grain + fiber textures at minimal GPU cost
- Three.js particle system optimized with shader materials and reduced draw calls

## Running Locally

```bash
git clone https://github.com/SahilRathod703/moa-sales-experience.git
cd moa-sales-experience
npm install
npm run dev
```

Open `http://localhost:5173` — click anywhere to start the ambient audio.

## Project Structure

```
src/
  App.jsx          — Complete application (single-file architecture)
public/
  assets/
    images/        — 16 .webp photographs (AI-generated + reference)
    audio/
      ambient.mp3  — Ambient scoring track
index.html         — Entry point
```

## Data Integrity

All statistics cited in the experience are verified against public sources:
- 40M+ annual visitors, 40% travel 150+ miles
- 5.6M sq ft, 520+ stores, 95% occupancy
- $162 average spend per visit
- Black Friday 2024: 230,000 attendance (industry reports)
- Confirmed partners: Pepsi, Glossier

## Author

**Sahil Rathod**
- GitHub: [SahilRathod703](https://github.com/SahilRathod703)
- LinkedIn: [sahil-rathod-7570ba225](https://linkedin.com/in/sahil-rathod-7570ba225)

Built for the **liat.ai Senior Frontend Engineer** interview assessment — June 2026.

## License

This project is a portfolio piece created for interview purposes. All Mall of America trademarks and brand references are property of their respective owners.
