// Footer component

export function renderFooter(): string {
  return `
    <footer class="page-footer">
      <div class="footer-logo">Veronika Yuzik</div>
      <span>made by me <span style="color:var(--pink)">♥</span></span>
      <span>© ${new Date().getFullYear()}</span>
    </footer>
  `
}
