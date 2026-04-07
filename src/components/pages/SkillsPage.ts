// ─────────────────────────────────────────
//  SKILLS PAGE  —  src/components/pages/SkillsPage.ts
//  Tech stack + human languages
// ─────────────────────────────────────────

import { SKILL_GROUPS } from '@/data'
import { renderFooter } from '@/components/Footer'

function renderDots(level: number): string {
  return Array.from({ length: 5 }, (_, i) => `
    <div class="skill-dot ${i < level ? 'filled' : ''}"></div>
  `).join('')
}

export function renderSkillsPage(): HTMLElement {
  const page = document.createElement('div')
  page.id        = 'page-skills'
  page.className = 'page'

  page.innerHTML = `
    <div class="page-header">
      <div class="page-title">Tech<br><em>Stack</em></div>
    </div>

    <div class="skills-grid">
      ${SKILL_GROUPS.map(group => `
        <div class="skill-group">
          <div class="skill-group-title">${group.category}</div>
          ${group.items.map(item => `
            <div class="skill-row">
              <span class="skill-name">${item.name}</span>
              <div class="skill-dots">
                ${renderDots(item.level)}
              </div>
            </div>
          `).join('')}
        </div>
      `).join('')}
    </div>

    ${renderFooter()}
  `

  return page
}
