// SPA-style page switching

import type { PageId } from '@/types'
import { NAV_ITEMS } from '@/data'

type PageChangeCallback = (id: PageId) => void

export class Router {
  private current: PageId = 'home'
  private listeners: PageChangeCallback[] = []

  constructor() {
    window.addEventListener('popstate', () => {
      const id = (location.hash.slice(1) as PageId) || 'home'
      this.navigate(id, false)
    })
  }

  navigate(id: PageId, pushState = true): void {
    this.current = id

    if (pushState) history.pushState(null, '', `#${id}`)

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'))
    document.getElementById(`page-${id}`)?.classList.add('active')

    document.querySelectorAll('.nav-pill').forEach((btn, i) => {
      btn.classList.toggle('active', NAV_ITEMS[i]?.id === id)
    })

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

  init(): void {
    const hash = location.hash.slice(1) as PageId
    const valid = NAV_ITEMS.some(n => n.id === hash)
    this.navigate(valid ? hash : 'home', false)
  }
}
