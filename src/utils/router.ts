// ─────────────────────────────────────────
//  ROUTER  —  src/utils/router.ts
//  SPA-style page switching
// ─────────────────────────────────────────

import type { PageId } from '@/types'
import { NAV_ITEMS } from '@/data'

type PageChangeCallback = (id: PageId) => void

export class Router {
  private current: PageId = 'home'
  private listeners: PageChangeCallback[] = []

  constructor() {
    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      const id = (location.hash.slice(1) as PageId) || 'home'
      this.navigate(id, false)
    })
  }

  navigate(id: PageId, pushState = true): void {
    this.current = id

    // Update URL hash (no reload)
    if (pushState) history.pushState(null, '', `#${id}`)

    // Hide all pages, show target
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'))
    document.getElementById(`page-${id}`)?.classList.add('active')

    // Update top nav pills
    document.querySelectorAll('.nav-pill').forEach((btn, i) => {
      btn.classList.toggle('active', NAV_ITEMS[i]?.id === id)
    })

    // Update side menu items
    document.querySelectorAll('.side-nav-item').forEach((item, i) => {
      item.classList.toggle('active', NAV_ITEMS[i]?.id === id)
    })

    window.scrollTo(0, 0)
    this.listeners.forEach(fn => fn(id))
  }

  onChange(fn: PageChangeCallback): void {
    this.listeners.push(fn)
  }

  getCurrent(): PageId { return this.current }

  /** Navigate from initial hash on load */
  init(): void {
    const hash = location.hash.slice(1) as PageId
    const valid = NAV_ITEMS.some(n => n.id === hash)
    this.navigate(valid ? hash : 'home', false)
  }
}
