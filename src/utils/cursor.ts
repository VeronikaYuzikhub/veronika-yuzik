// Custom cursor with lagging ring

export class Cursor {
  private dot: HTMLElement
  private ring: HTMLElement
  private mx = 0
  private my = 0
  private rx = 0
  private ry = 0
  private raf = 0

  constructor() {
    this.dot = document.getElementById('cursor-dot')!
    this.ring = document.getElementById('cursor-ring')!
    this.bindEvents()
    this.animate()
  }

  private bindEvents(): void {
    document.addEventListener('mousemove', (e) => {
      this.mx = e.clientX
      this.my = e.clientY
      this.dot.style.left = this.mx + 'px'
      this.dot.style.top = this.my + 'px'
    })
  }

  private animate = (): void => {
    this.rx += (this.mx - this.rx) * 0.11
    this.ry += (this.my - this.ry) * 0.11
    this.ring.style.left = this.rx + 'px'
    this.ring.style.top = this.ry + 'px'
    this.raf = requestAnimationFrame(this.animate)
  }

  registerHoverTargets(selector: string): void {
    document.querySelectorAll<HTMLElement>(selector).forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'))
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'))
    })
  }

  destroy(): void {
    cancelAnimationFrame(this.raf)
  }
}
