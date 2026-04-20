// Works page — project list with descriptions, photo stacks, and lightbox

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { PROJECTS } from '@/data'
import { renderFooter } from '@/components/Footer'
import type { Lightbox } from '@/components/Lightbox'

const CRYSTAL_SVG = `
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
       style="width:100%;height:100%;overflow:visible;">
    <defs>
      <filter id="gf">
        <feGaussianBlur stdDeviation="2.5" result="b"/>
        <feComposite in="SourceGraphic" in2="b" operator="over"/>
      </filter>
    </defs>
    <polygon points="50,5 85,36 50,95 15,36"
      fill="none" stroke="rgba(168,196,212,0.65)" stroke-width="1.2" filter="url(#gf)"/>
    <polygon points="50,5 85,36 50,48 15,36"
      fill="rgba(168,196,212,0.06)" stroke="rgba(168,196,212,0.45)" stroke-width="0.9"/>
    <polygon points="50,48 85,36 50,95"
      fill="rgba(168,196,212,0.03)" stroke="rgba(168,196,212,0.28)" stroke-width="0.9"/>
    <polygon points="50,48 15,36 50,95"
      fill="rgba(212,168,184,0.04)" stroke="rgba(212,168,184,0.22)" stroke-width="0.9"/>
    <circle cx="62" cy="22" r="3" fill="rgba(255,255,255,0.45)"/>
  </svg>
`

function renderPhotoStack(images: { src: string; alt: string }[]): string {
  return images.map((img, i) => `
    <div class="stack-photo glass" data-index="${i}" title="${img.alt}">
      ${img.src.startsWith('/') || img.src.startsWith('http')
        ? `<img src="${img.src}" alt="${img.alt}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">`
        : img.src}
    </div>
  `).join('')
}

// 3D pistol viewer — loads real GLB model with drag rotation and inertia
function initPistolViewer(wrap: HTMLElement): void {
  const canvas = wrap.querySelector<HTMLCanvasElement>('canvas')!
  const W = wrap.clientWidth || 320
  const H = wrap.clientHeight || 280

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  renderer.setSize(W, H)
  renderer.setClearColor(0x000000, 0)
  renderer.shadowMap.enabled = true

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(38, W / H, 0.01, 200)
  camera.position.set(0, 0, 3)

  scene.add(new THREE.AmbientLight(0xffffff, 1.2))
  const d1 = new THREE.DirectionalLight(0xfff5e8, 2.0); d1.position.set(4, 6, 5); scene.add(d1)
  const d2 = new THREE.DirectionalLight(0xd0e8ff, 0.8); d2.position.set(-4, -3, 3); scene.add(d2)

  const pivot = new THREE.Group()
  scene.add(pivot)

  let dragging = false, prevX = 0, prevY = 0, velX = 0, velY = 0
  let autoRotate = true, autoTimer = 0

  const resume = () => {
    clearTimeout(autoTimer)
    autoTimer = window.setTimeout(() => { autoRotate = true }, 2200)
  }

  wrap.style.cursor = 'grab'
  wrap.addEventListener('mousedown', e => {
    dragging = true; autoRotate = false; clearTimeout(autoTimer)
    prevX = e.clientX; prevY = e.clientY; velX = 0; velY = 0
    wrap.style.cursor = 'grabbing'
  })
  window.addEventListener('mousemove', e => {
    if (!dragging) return
    velY = (e.clientX - prevX) * 0.007
    velX = (e.clientY - prevY) * 0.007
    pivot.rotation.y += velY
    pivot.rotation.x += velX
    prevX = e.clientX; prevY = e.clientY
  })
  window.addEventListener('mouseup', () => {
    if (!dragging) return
    dragging = false; wrap.style.cursor = 'grab'; resume()
  })
  wrap.addEventListener('touchstart', e => {
    const t = e.touches[0]; dragging = true; autoRotate = false; clearTimeout(autoTimer)
    prevX = t.clientX; prevY = t.clientY
  }, { passive: true })
  wrap.addEventListener('touchmove', e => {
    if (!dragging) return
    const t = e.touches[0]
    pivot.rotation.y += (t.clientX - prevX) * 0.007
    pivot.rotation.x += (t.clientY - prevY) * 0.007
    prevX = t.clientX; prevY = t.clientY
  }, { passive: true })
  wrap.addEventListener('touchend', () => { dragging = false; resume() })

  const loader = new GLTFLoader()
  loader.load('/img/pistol/pistol.glb', gltf => {
    const model = gltf.scene
    // Scale first, then recompute bounding box to center correctly
    const box0 = new THREE.Box3().setFromObject(model)
    const size0 = box0.getSize(new THREE.Vector3())
    const maxDim = Math.max(size0.x, size0.y, size0.z)
    model.scale.setScalar(2.2 / maxDim)
    const box = new THREE.Box3().setFromObject(model)
    const center = box.getCenter(new THREE.Vector3())
    model.position.sub(center)
    pivot.add(model)
    pivot.rotation.y = 0.5
    pivot.rotation.x = -0.15
  })

  let raf = 0
  const loop = () => {
    raf = requestAnimationFrame(loop)
    if (autoRotate) {
      pivot.rotation.y += 0.005
    } else if (!dragging) {
      velX *= 0.93; velY *= 0.93
      pivot.rotation.x += velX
      pivot.rotation.y += velY
    }
    renderer.render(scene, camera)
  }
  loop()

  const ro = new ResizeObserver(() => {
    const w = wrap.clientWidth, h = wrap.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  })
  ro.observe(wrap)
}

export function renderWorksPage(lightbox: Lightbox): HTMLElement {
  const page = document.createElement('div')
  page.id = 'page-works'
  page.className = 'page'

  page.innerHTML = `
    <div class="page-header">
      <div class="page-title">Selected<br><em>Works</em></div>
      <div class="page-count">0${PROJECTS.filter(p => p.id !== 'in-progress').length} projects</div>
      <a href="https://github.com/VeronikaYuzikhub" target="_blank" rel="noopener"
         style="font-family:var(--font-mono);font-size:9px;letter-spacing:.2em;text-transform:uppercase;
                color:var(--text3);text-decoration:none;margin-top:6px;display:block;">
        ↗ github.com/VeronikaYuzikhub
      </a>
    </div>

    ${PROJECTS.map((proj, idx) => `
      <section class="project-section ${idx % 2 === 1 ? 'reversed' : ''}" data-id="${proj.id}">

        <div class="project-info">
          <div class="project-index">${proj.index} · ${proj.role.split('·')[0].trim().toLowerCase()}</div>

          <h2 class="project-title">
            ${proj.title}${proj.titleAccent ? `<em>${proj.titleAccent}</em>` : ''}
          </h2>

          <div class="project-role">${proj.role}</div>

          ${proj.id === 'in-progress' ? `
            <p class="project-short-desc" style="opacity:0.45;font-style:italic;">
              Something new is in the works — details coming soon.
            </p>
            <span style="font-family:var(--font-mono);font-size:9px;letter-spacing:.25em;
                         text-transform:uppercase;color:var(--blue);opacity:0.7;">
              · in progress ·
            </span>
          ` : `
            <p class="project-short-desc">${proj.shortDesc}</p>

            <button class="project-expand-btn" data-proj="${proj.id}"></button>
            <div class="project-full-desc" id="full-${proj.id}">
              ${proj.fullDesc}
            </div>

            <div class="tag-list" style="margin-bottom:28px;">
              ${proj.stack.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>

            ${proj.githubUrl ? `
              <a href="${proj.githubUrl}" class="project-link" target="_blank" rel="noopener">
                View on GitHub
              </a>` : ''}
            ${proj.liveUrl ? `
              <a href="${proj.liveUrl}" class="project-link" target="_blank" rel="noopener"
                 style="margin-left:16px;">
                Live demo
              </a>` : ''}
            ${proj.is3D ? `
              <span class="project-link" style="cursor:default;">
                View in 3D
              </span>` : ''}
          `}
        </div>

        <div class="project-media">
          ${proj.is3D ? `
            <div class="glass model-card">
              <div class="model-crystal">${CRYSTAL_SVG}</div>
              <div class="model-hint">drag · rotate · download stl</div>
            </div>
          ` : proj.id === 'pistol-mod' ? `
            <div class="glass model-card pistol-viewer" id="pistol-viewer">
              <canvas style="display:block;width:100%;height:100%;border-radius:inherit;"></canvas>
              <div class="model-hint">drag · rotate</div>
            </div>
          ` : `
            <div class="photo-stack" data-proj="${proj.id}">
              ${renderPhotoStack(proj.images)}
            </div>
            <div class="stack-view-btn" data-proj="${proj.id}">
              ↗ view all ${proj.images.length} images
            </div>
          `}
        </div>

      </section>
    `).join('')}

    ${renderFooter()}
  `

  page.querySelectorAll<HTMLButtonElement>('.project-expand-btn').forEach(btn => {
    const id = btn.dataset.proj!
    const body = page.querySelector<HTMLElement>(`#full-${id}`)!
    btn.addEventListener('click', () => {
      const isOpen = body.classList.toggle('open')
      btn.classList.toggle('expanded', isOpen)
    })
  })

  page.querySelectorAll<HTMLElement>('.stack-photo').forEach(photo => {
    photo.addEventListener('click', () => {
      const section = photo.closest<HTMLElement>('.project-section')!
      const projId = section.dataset.id!
      const proj = PROJECTS.find(p => p.id === projId)!
      const index = parseInt(photo.dataset.index ?? '0', 10)
      lightbox.open(proj.images, index)
    })
  })

  page.querySelectorAll<HTMLElement>('.stack-view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const projId = btn.dataset.proj!
      const proj = PROJECTS.find(p => p.id === projId)!
      lightbox.open(proj.images, 0)
    })
  })

  const pistolWrap = page.querySelector<HTMLElement>('#pistol-viewer')
  if (pistolWrap) {
    requestAnimationFrame(() => initPistolViewer(pistolWrap))
  }

  return page
}
