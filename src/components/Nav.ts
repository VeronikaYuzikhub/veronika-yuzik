// ─────────────────────────────────────────
//  NAV  —  src/components/Nav.ts
//  Renders top nav pills + side menu
// ─────────────────────────────────────────

import { NAV_ITEMS } from '@/data'
import type { Router } from '@/utils/router'

export class Nav {
  private router:  Router
  private sideOpen = false

  constructor(router: Router) {
    this.router = router
    this.renderPills()
    this.renderSideMenu()
    this.bindHamburger()

    // Logo click → home
    document.getElementById('nav-logo')
      ?.addEventListener('click', () => this.router.navigate('home'))
  }

  // ── Top pill nav ─────────────────────────
  private renderPills(): void {
    const container = document.getElementById('nav-pills')!
    container.innerHTML = NAV_ITEMS.map(item => `
      <button
        class="nav-pill"
        data-page="${item.id}"
        aria-label="Go to ${item.label}"
      >${item.label}</button>
    `).join('')

    container.querySelectorAll<HTMLButtonElement>('.nav-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        this.router.navigate(btn.dataset.page as any)
      })
    })
  }

  // ── Side menu ────────────────────────────
  private renderSideMenu(): void {
    const navContainer = document.getElementById('side-nav-items')!
    navContainer.innerHTML = NAV_ITEMS.map((item, i) => `
      <div class="side-nav-item" data-page="${item.id}">
        <span class="side-item-num">0${i + 1}</span>
        <span class="side-item-label">${item.label}</span>
      </div>
    `).join('')

    navContainer.querySelectorAll<HTMLElement>('.side-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        this.router.navigate(item.dataset.page as any)
        this.closeSide()
      })
    })

    // Contacts
    document.getElementById('side-contacts')!.innerHTML = `
      <a href="https://github.com/VeronikaYuzikhub"                      class="side-contact-link" target="_blank" rel="noopener">GitHub</a>
      <a href="https://www.linkedin.com/in/veronikayuzik-9292b735b"       class="side-contact-link" target="_blank" rel="noopener">LinkedIn</a>
      <a href="https://t.me/ccccuddlies"                                  class="side-contact-link" target="_blank" rel="noopener">Telegram</a>
      <a href="mailto:veronikauzik479@gmail.com"                          class="side-contact-link">Email</a>
    `

    // Close on overlay click
    document.getElementById('side-overlay')
      ?.addEventListener('click', () => this.closeSide())
  }

  private bindHamburger(): void {
    document.getElementById('hamburger')
      ?.addEventListener('click', () => this.toggleSide())
  }

  toggleSide(): void {
    this.sideOpen ? this.closeSide() : this.openSide()
  }

  openSide(): void {
    this.sideOpen = true
    document.getElementById('side-menu')?.classList.add('open')
    document.getElementById('side-overlay')?.classList.add('visible')
    document.getElementById('hamburger')?.classList.add('open')
  }

  closeSide(): void {
    this.sideOpen = false
    document.getElementById('side-menu')?.classList.remove('open')
    document.getElementById('side-overlay')?.classList.remove('visible')
    document.getElementById('hamburger')?.classList.remove('open')
  }
}
