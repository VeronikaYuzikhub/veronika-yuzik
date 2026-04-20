// Roadmap page — personal journey / career timeline

import { ROADMAP } from '@/data'
import { renderFooter } from '@/components/Footer'

export function renderRoadmapPage(): HTMLElement {
  const page = document.createElement('div')
  page.id = 'page-roadmap'
  page.className = 'page'

  page.innerHTML = `
    <div class="page-header">
      <div class="page-title">My<br><em>Roadmap</em></div>
    </div>

    <div class="roadmap-wrap">
      ${ROADMAP.map((item, i) => `
        <div class="timeline-item" style="${!item.active && item.active !== undefined ? 'opacity:0.35;' : ''}">

          <div class="timeline-spine">
            <div class="timeline-dot"></div>
            ${i < ROADMAP.length - 1 ? '<div class="timeline-line"></div>' : ''}
          </div>

          <div class="timeline-content">
            <div class="timeline-year">${item.year}</div>
            <div class="timeline-title">${item.title}</div>
            <div class="timeline-subtitle">${item.subtitle}</div>
          </div>

        </div>
      `).join('')}
    </div>

    ${renderFooter()}
  `

  return page
}
