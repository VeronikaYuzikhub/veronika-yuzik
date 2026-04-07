// ─────────────────────────────────────────
//  THEME  —  src/utils/theme.ts
//  Light / dark toggle with localStorage
// ─────────────────────────────────────────

import type { Theme } from '@/types'

const STORAGE_KEY = 'portfolio-theme'

export class ThemeManager {
  private current: Theme

  constructor() {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
    this.current = saved ?? 'dark'
    this.apply(this.current)

    document.getElementById('theme-toggle')
      ?.addEventListener('click', () => this.toggle())
  }

  private apply(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme)
  }

  toggle(): void {
    this.current = this.current === 'dark' ? 'light' : 'dark'
    this.apply(this.current)
    localStorage.setItem(STORAGE_KEY, this.current)
  }

  get(): Theme { return this.current }
}
