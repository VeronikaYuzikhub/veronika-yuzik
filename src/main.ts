// Entry point — imports styles, boots all modules, renders pages into #app

import '@/styles/global.css'
import '@/styles/components.css'

import { Cursor } from '@/utils/cursor'
import { ThemeManager } from '@/utils/theme'
import { Router } from '@/utils/router'
import { FlowerLoader } from '@/scenes/loading'
import { BackgroundScene } from '@/scenes/background'
import { Nav } from '@/components/Nav'
import { Lightbox } from '@/components/Lightbox'
import { renderHomePage } from '@/components/pages/HomePage'
import { renderWorksPage } from '@/components/pages/WorksPage'
import { renderRoadmapPage } from '@/components/pages/RoadmapPage'
import { renderSkillsPage } from '@/components/pages/SkillsPage'
import { renderCertificatesPage } from '@/components/pages/CertificatesPage'
import { renderAboutPage } from '@/components/pages/AboutPage'

function bootApp(): void {
  const cursor = new Cursor()
  const theme = new ThemeManager()
  const router = new Router()
  const lightbox = new Lightbox()

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

  const nav = new Nav(router)
  router.init()

  const bgCanvas = document.getElementById('bg-canvas') as HTMLCanvasElement
  const bg = new BackgroundScene(bgCanvas)
  bg.start()

  cursor.registerHoverTargets(
    'a, button, .glass, .stack-photo, .cert-card, ' +
    '.skill-row, .project-link, .nav-pill, .side-nav-item, ' +
    '.side-contact-link, .preview-card, .lightbox-btn, ' +
    '.lightbox-close, #nav-logo, #hamburger, #theme-toggle'
  )

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') nav.closeSide()
  })

  void theme
}

window.addEventListener('DOMContentLoaded', () => {
  const flowerCanvas = document.getElementById('flower-canvas') as HTMLCanvasElement

  const loader = new FlowerLoader(flowerCanvas, () => {
    document.getElementById('loading-screen')?.remove()
    bootApp()
  })

  loader.start()
})
