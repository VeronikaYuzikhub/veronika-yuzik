// Shared interfaces and types for the portfolio

export type PageId = 'home' | 'works' | 'roadmap' | 'skills' | 'certificates' | 'about'

export type Theme = 'dark' | 'light'

export interface NavItem {
  id: PageId
  label: string
  index: number
}

export interface ProjectImage {
  src: string
  alt: string
}

export interface Project {
  id: string
  index: string
  title: string
  titleAccent?: string
  role: string
  shortDesc: string
  fullDesc: string
  stack: string[]
  images: ProjectImage[]
  githubUrl?: string
  liveUrl?: string
  is3D?: boolean
}

export interface RoadmapItem {
  year: string
  title: string
  subtitle: string
  active?: boolean
}

export interface SkillItem {
  name: string
  level: number // 1–5
}

export interface SkillGroup {
  category: string
  items: SkillItem[]
}

export interface Certificate {
  id: string
  icon: string
  name: string
  issuer: string
  year: string
  imageUrl?: string
}

export interface GalleryState {
  images: ProjectImage[]
  currentIndex: number
  isOpen: boolean
}

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
