// ─────────────────────────────────────────
//  LIGHTBOX  —  src/components/Lightbox.ts
//  Full-screen gallery viewer
// ─────────────────────────────────────────

import type { ProjectImage } from '@/types'

export class Lightbox {
  private el:      HTMLElement
  private images:  ProjectImage[] = []
  private current  = 0

  constructor() {
    this.el = this.createEl()
    document.body.appendChild(this.el)
    this.bindEvents()
  }

  private createEl(): HTMLElement {
    const div = document.createElement('div')
    div.id = 'lightbox'
    div.innerHTML = `
      <div class="lightbox-box">
        <div class="lightbox-content" id="lb-content"></div>
        <div class="lightbox-caption"  id="lb-caption"></div>
        <div class="lightbox-counter"  id="lb-counter"></div>
        <div class="lightbox-nav">
          <button class="lightbox-btn" id="lb-prev">‹</button>
          <button class="lightbox-btn" id="lb-next">›</button>
        </div>
      </div>
      <div class="lightbox-close" id="lb-close">[ esc · click to close ]</div>
    `
    return div
  }

  private bindEvents(): void {
    document.getElementById('lb-close')?.addEventListener('click', () => this.close())
    document.getElementById('lb-prev')?.addEventListener('click',  () => this.prev())
    document.getElementById('lb-next')?.addEventListener('click',  () => this.next())
    this.el.addEventListener('click', (e) => {
      if (e.target === this.el) this.close()
    })
    document.addEventListener('keydown', (e) => {
      if (!this.el.classList.contains('open')) return
      if (e.key === 'Escape')     this.close()
      if (e.key === 'ArrowLeft')  this.prev()
      if (e.key === 'ArrowRight') this.next()
    })
  }

  open(images: ProjectImage[], startIndex = 0): void {
    this.images  = images
    this.current = startIndex
    this.render()
    this.el.classList.add('open')
  }

  close(): void {
    this.el.classList.remove('open')
  }

  private prev(): void {
    this.current = (this.current - 1 + this.images.length) % this.images.length
    this.render()
  }

  private next(): void {
    this.current = (this.current + 1) % this.images.length
    this.render()
  }

  private render(): void {
    const img     = this.images[this.current]
    const content = document.getElementById('lb-content')!
    const isReal  = img.src.startsWith('/') || img.src.startsWith('http')
    if (isReal) {
      content.innerHTML = `<img src="${img.src}" alt="${img.alt}"
        style="max-width:100%;max-height:70vh;object-fit:contain;border-radius:8px;">`
    } else {
      content.textContent = img.src          // emoji fallback
    }
    document.getElementById('lb-caption')!.textContent = img.alt
    document.getElementById('lb-counter')!.textContent =
      `${this.current + 1} / ${this.images.length}`
  }
}
