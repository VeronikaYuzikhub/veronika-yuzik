// Certificates page

import { CERTIFICATES } from '@/data'
import { renderFooter } from '@/components/Footer'
import type { Lightbox } from '@/components/Lightbox'

export function renderCertificatesPage(lightbox: Lightbox): HTMLElement {
  const page = document.createElement('div')
  page.id = 'page-certificates'
  page.className = 'page'

  page.innerHTML = `
    <div class="page-header">
      <div class="page-title">Certificates &<br><em>Achievements</em></div>
    </div>

    <div class="certs-layout">

      <div style="padding:52px 48px;border-right:1px solid var(--border);
                  display:flex;flex-direction:column;justify-content:center;align-items:center;
                  gap:24px;">
        <div style="font-family:var(--font-mono);font-size:9px;letter-spacing:0.3em;
                    text-transform:uppercase;color:var(--text4);text-align:center;">
          earned credentials
        </div>
        <div style="width:120px;height:120px;animation:crystalFloat 6s ease-in-out infinite;">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
               style="width:100%;height:100%;overflow:visible;">
            <defs>
              <filter id="gf-cert">
                <feGaussianBlur stdDeviation="3" result="b"/>
                <feComposite in="SourceGraphic" in2="b" operator="over"/>
              </filter>
            </defs>
            <polygon points="50,5 85,36 50,95 15,36"
              fill="none" stroke="rgba(212,168,184,0.6)" stroke-width="1.4" filter="url(#gf-cert)"/>
            <polygon points="50,5 85,36 50,48 15,36"
              fill="rgba(212,168,184,0.06)" stroke="rgba(212,168,184,0.4)" stroke-width="1"/>
            <polygon points="50,48 85,36 50,95"
              fill="rgba(168,196,212,0.04)" stroke="rgba(168,196,212,0.25)" stroke-width="1"/>
            <polygon points="50,48 15,36 50,95"
              fill="rgba(212,168,184,0.05)" stroke="rgba(212,168,184,0.2)" stroke-width="1"/>
            <circle cx="62" cy="22" r="3.5" fill="rgba(255,255,255,0.5)"/>
          </svg>
        </div>
        <div style="font-family:var(--font-serif);font-size:13px;font-weight:300;
                    font-style:italic;color:var(--text3);text-align:center;letter-spacing:0.04em;">
          click a card<br>to view
        </div>
      </div>

      <div class="certs-grid-panel">
        <div class="section-label">Certificates & Achievements</div>
        <div class="certs-grid" style="margin-top:24px;" id="certs-grid">
          ${CERTIFICATES.map(cert => `
            <div class="glass cert-card${cert.imageUrl ? ' cert-has-image' : ''}" data-cert="${cert.id}">
              ${cert.imageUrl
                ? `<div class="cert-thumb"><img src="${cert.imageUrl}" alt="${cert.name}" style="width:100%;height:100%;object-fit:cover;border-radius:6px;"></div>`
                : `<div class="cert-thumb cert-thumb-empty"><span style="font-family:var(--font-mono);font-size:8px;letter-spacing:.15em;color:var(--text4);text-transform:uppercase;">cert</span></div>`
              }
              <div class="cert-name">${cert.name}</div>
              <div class="cert-issuer">${cert.issuer} · ${cert.year}</div>
              <div class="cert-arrow">→</div>
            </div>
          `).join('')}

          <div class="cert-add-placeholder">
            <span style="font-size:20px;opacity:0.4">+</span>
            <span>Add certificate</span>
          </div>
        </div>
      </div>

    </div>

    ${renderFooter()}
  `

  const certsWithImages = CERTIFICATES
    .filter(c => c.imageUrl)
    .map(c => ({ src: c.imageUrl!, alt: `${c.name} — ${c.issuer} ${c.year}` }))

  page.querySelectorAll<HTMLElement>('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.cert!
      const cert = CERTIFICATES.find(c => c.id === id)!
      if (!cert.imageUrl) return
      const startIdx = certsWithImages.findIndex(i => i.src === cert.imageUrl)
      lightbox.open(certsWithImages, startIdx >= 0 ? startIdx : 0)
    })
  })

  return page
}
