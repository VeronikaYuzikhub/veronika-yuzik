// ─────────────────────────────────────────
//  MAIN  —  src/main.ts
//  Entry point — imports styles, boots all
//  modules, renders pages into #app
// ─────────────────────────────────────────

// ── Styles ────────────────────────────────
import '@/styles/global.css'
import '@/styles/components.css'

// ── Utilities ─────────────────────────────
import { Cursor }       from '@/utils/cursor'
import { ThemeManager } from '@/utils/theme'
import { Router }       from '@/utils/router'

// ── Scenes ────────────────────────────────
import { FlowerLoader }    from '@/scenes/loading'
import { BackgroundScene } from '@/scenes/background'

// ── Components ────────────────────────────
import { Nav }      from '@/components/Nav'
import { Lightbox } from '@/components/Lightbox'

// ── Pages ─────────────────────────────────
import { renderHomePage }         from '@/components/pages/HomePage'
import { renderWorksPage }        from '@/components/pages/WorksPage'
import { renderRoadmapPage }      from '@/components/pages/RoadmapPage'
import { renderSkillsPage }       from '@/components/pages/SkillsPage'
import { renderCertificatesPage } from '@/components/pages/CertificatesPage'
import { renderAboutPage }        from '@/components/pages/AboutPage'

// ─────────────────────────────────────────
//  BOOT SEQUENCE
//  1. Cursor starts immediately
//  2. Flower loading animation plays
//  3. On complete: Three.js bg + nav + pages
// ─────────────────────────────────────────

function bootApp(): void {
  // ── Core utilities ─────────────────────
  const cursor  = new Cursor()
  const theme   = new ThemeManager()
  const router  = new Router()
  const lightbox = new Lightbox()

  // ── Build all pages ────────────────────
  const app = document.getElementById('app')!

  const pages = [
    renderHomePage(router),
    renderWorksPage(lightbox),
    renderRoadmapPage(),
    renderSkillsPage(),
    renderCertificatesPage(lightbox),
    renderAboutPage(router),
  ]
  pages.forEach(p => app.appendChild(p))

  // ── Navigation ─────────────────────────
  const nav = new Nav(router)
  router.init()

  // ── Three.js background ────────────────
  const bgCanvas = document.getElementById('bg-canvas') as HTMLCanvasElement
  const bg = new BackgroundScene(bgCanvas)
  bg.start()

  // ── Register hover targets for cursor ──
  cursor.registerHoverTargets(
    'a, button, .glass, .stack-photo, .cert-card, ' +
    '.skill-row, .project-link, .nav-pill, .side-nav-item, ' +
    '.side-contact-link, .preview-card, .lightbox-btn, ' +
    '.lightbox-close, #nav-logo, #hamburger, #theme-toggle'
  )

  // ── Keyboard shortcut: Escape = close side menu ──
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') nav.closeSide()
  })

  // Suppress TS "unused" warnings — these are used for side effects
  void theme
}

// ─────────────────────────────────────────
//  LOADING ANIMATION → then boot
// ─────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  const flowerCanvas = document.getElementById('flower-canvas') as HTMLCanvasElement

  const loader = new FlowerLoader(flowerCanvas, () => {
    // Remove loading screen from DOM after fade
    document.getElementById('loading-screen')?.remove()
    // Boot the actual app
    bootApp()
  })

  loader.start()
})
