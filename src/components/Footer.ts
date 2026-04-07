// ─────────────────────────────────────────
//  FOOTER  —  src/components/Footer.ts
// ─────────────────────────────────────────

export function renderFooter(): string {
  return `
    <footer class="page-footer">
      <div class="footer-logo">Veronika Yuzik</div>
      <span>handcrafted by me · TypeScript · Three.js</span>
      <span>© ${new Date().getFullYear()}</span>
    </footer>
  `
}
