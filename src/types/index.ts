// ─────────────────────────────────────────
//  TYPES  —  src/types/index.ts
//  All shared interfaces for the portfolio
// ─────────────────────────────────────────

export type PageId = 'home' | 'works' | 'roadmap' | 'skills' | 'certificates' | 'about'

export type Theme = 'dark' | 'light'

// ── Navigation ──────────────────────────
export interface NavItem {
  id: PageId
  label: string
  index: number
}

// ── Projects ────────────────────────────
export interface ProjectImage {
  /** Path to image or placeholder emoji for mockup */
  src: string
  alt: string
}

export interface Project {
  id: string
  index: string          // "001", "002"...
  title: string
  titleAccent?: string   // italic/accent part of the title
  role: string
  shortDesc: string      // shown in card (collapsed)
  fullDesc: string       // shown when "expand" is clicked
  stack: string[]
  images: ProjectImage[]
  githubUrl?: string
  liveUrl?: string
  is3D?: boolean         // show 3D crystal viewer instead of gallery
}

// ── Roadmap ─────────────────────────────
export interface RoadmapItem {
  year: string
  title: string
  subtitle: string
  active?: boolean
}

// ── Skills ──────────────────────────────
export interface SkillItem {
  name: string
  level: number   // 1–5
}

export interface SkillGroup {
  category: string
  items: SkillItem[]
}

// ── Certificates ────────────────────────
export interface Certificate {
  id: string
  icon: string
  name: string
  issuer: string
  year: string
  imageUrl?: string
}

// ── Gallery / Lightbox ──────────────────
export interface GalleryState {
  images: ProjectImage[]
  currentIndex: number
  isOpen: boolean
}

// ── Low-poly 3D shape config ─────────────
export interface LowPolyShapeConfig {
  type: 'icosahedron' | 'octahedron' | 'tetrahedron'
  detail: number
  color: number
  x: number
  y: number
  z: number
  scale: number
  opacity: number
}
