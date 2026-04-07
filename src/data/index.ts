// ─────────────────────────────────────────
//  DATA  —  src/data/index.ts
//  All portfolio content in one place.
//  Edit this file to update the site.
// ─────────────────────────────────────────

import type {
  NavItem, Project, RoadmapItem,
  SkillGroup, Certificate, LowPolyShapeConfig
} from '@/types'

// ── Navigation ──────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { id: 'home',         label: 'Home',         index: 0 },
  { id: 'works',        label: 'Works',        index: 1 },
  { id: 'roadmap',      label: 'Roadmap',      index: 2 },
  { id: 'skills',       label: 'Skills',       index: 3 },
  { id: 'certificates', label: 'Certificates', index: 4 },
  { id: 'about',        label: 'About',        index: 5 },
]

// ── Projects ────────────────────────────
export const PROJECTS: Project[] = [
  {
    id: 'in-progress',
    index: '001',
    title: 'Next',
    titleAccent: 'Project',
    role: 'In Progress · Coming Soon',
    shortDesc:
      'Something new is being built. Check back soon.',
    fullDesc: '',
    stack: [],
    images: [
      { src: '🧊', alt: 'Model 1' },
      { src: '💠', alt: 'Model 2' },
      { src: '🔷', alt: 'Model 3' },
    ],
    is3D: true,
  },
  {
    id: 'library-app',
    index: '002',
    title: 'Library',
    titleAccent: 'App',
    role: 'Java · JavaFX · Cross-Platform',
    shortDesc:
      'Admin-side library management system with a modern JavaFX UI, two storage modes (PostgreSQL & JSON/XML), and automated email reminders.',
    fullDesc:
      'A solo course project — a cross-platform desktop application for managing a library fund from the admin\'s side. ' +
      'Built with Java and JavaFX, it features four pages: Home (video banner, genre cards), Books, Users, and About. ' +
      'Books page: tile grid with cover images, genre/title search, sorting, add/edit/delete dialogs, ' +
      'JSON/XML import-export with atomic writes. ' +
      'Users page: full CRUD with search, sort, JSON/XML/Excel/CSV export, ' +
      'and a custom SMTP client that sends email return reminders — both manually and via a daily scheduler. ' +
      'Architecture: OOP with Book/User models, repository interfaces (Json/Xml/Db implementations), ' +
      'RepositoryProvider for runtime mode switching, AppPaths for cross-platform file paths. ' +
      'Multithreading: autosave with 800 ms debounce, async import/export, background email sending. ' +
      'Storage modes switchable at runtime: PostgreSQL (JDBC) or local JSON/XML files.',
    stack: ['Java', 'JavaFX', 'PostgreSQL', 'JDBC', 'Maven', 'Gson', 'SMTP/TLS'],
    images: [
      { src: '/img/library/lib_40_10.jpeg', alt: 'Home — video banner, feature cards, genre navigation' },
      { src: '/img/library/lib_47_26.jpeg', alt: 'Add book dialog + live mobile card preview' },
      { src: '/img/library/lib_46_24.jpeg', alt: 'Edit book dialog + delete confirmation' },
      { src: '/img/library/lib_48_29.jpeg', alt: 'Users — CRUD table with user card & return dates' },
      { src: '/img/library/lib_51_40.jpeg', alt: 'Automated SMTP email reminders on phone' },
      { src: '/img/library/lib_50_36.jpeg', alt: 'PostgreSQL mode — pgAdmin, books & users tables' },
    ],
    githubUrl: 'https://github.com/VeronikaYuzikhub',
  },
  {
    id: 'pistol-mod',
    index: '003',
    title: 'Pistol',
    titleAccent: 'Mod',
    role: 'Minecraft Forge · Java · Blender',
    shortDesc:
      'A Minecraft Forge mod adding a fully functional pistol. 3D model hand-crafted in Blender — later merged into the main modpack.',
    fullDesc:
      'A Minecraft mod for Forge 1.21.10 / 60.1.0 adding a pistol weapon with a complete ammo system. ' +
      'The pistol holds a 12-round magazine; reloading via Shift+Right-click consumes bullets from inventory. ' +
      'Firing mechanics: projectiles spawn 0.6 blocks ahead at speed 1.8, deal 10 damage respecting armor, ' +
      'and create smoke particles on impact. Empty mag plays a click sound instead of firing. ' +
      'Custom BulletRenderer orients projectiles based on velocity vectors. ' +
      'Bullet entities recover on block impact for testing. ' +
      'Custom "bullet_smoke" particle system: muzzle discharge (10 particles), flight trail (3/tick), block impact. ' +
      'The 3D pistol model and textures were created by me in Blender, exported to GLTF, then integrated into the mod. ' +
      'After completion the mod was merged into the team\'s main modpack.',
    stack: ['Java', 'Minecraft Forge', 'Blender', 'GLTF', 'Gradle'],
    images: [
      { src: '🔫', alt: 'Pistol model — Blender viewport' },
      { src: '💨', alt: 'Bullet smoke particle system' },
      { src: '⚡', alt: 'Firing & ammo mechanics' },
    ],
    githubUrl: 'https://github.com/VeronikaYuzikhub/Pistol-Mod-forge-1.21.10-60.1.0-mdk',
  },
  {
    id: 'itteam',
    index: '004',
    title: 'WebStudio',
    titleAccent: 'Site',
    role: 'HTML · CSS/Sass · JavaScript',
    shortDesc:
      'First web project — a multi-page agency website built while learning HTML & CSS fundamentals.',
    fullDesc:
      'A multi-page marketing website for a web studio, built as the first serious HTML/CSS project. ' +
      'Includes a hero section with CTA, four feature highlights, three service categories ' +
      '(Desktop, Mobile, Design), a team section with social links, a portfolio grid, ' +
      'client logos, a contact form modal, and a footer. ' +
      'Layout built with Flexbox; styles written in Sass/SCSS with Modern Normalize for cross-browser compatibility. ' +
      'Semantic HTML5 markup, SVG icons, Google Fonts. ' +
      'Pure JavaScript for modal interactions and navigation.',
    stack: ['HTML5', 'CSS3', 'Sass/SCSS', 'JavaScript', 'Flexbox', 'SVG'],
    images: [
      { src: '/img/itteam/itteam_home.png',     alt: 'Hero section — effective solutions for your business' },
      { src: '/img/itteam/itteam_features.png',  alt: 'Features, values and services sections' },
      { src: '/img/itteam/itteam_team.png',      alt: 'Our team section with profiles' },
    ],
    githubUrl: 'https://github.com/VeronikaYuzikhub/itteam',
    liveUrl:   'https://veronikayuzikhub.github.io/itteam/',
  },
]

// ── Roadmap ─────────────────────────────
export const ROADMAP: RoadmapItem[] = [
  {
    year: '2014–2023',
    title: 'Nerubay Academic Lyceum №1',
    subtitle: 'Studied with excellence · Olympiad winner\nPresident of the Lyceum 2021–2023',
  },
  {
    year: '2023',
    title: 'VSP OTFC ONTU',
    subtitle: 'Computer Engineering · Junior Bachelor\nEntrance 200/200 · budget place',
  },
  {
    year: '2025 Jul',
    title: 'Davydov Consulting',
    subtitle: 'Full-stack Developer · Full-time\nGreater London, United Kingdom',
  },
  {
    year: '2025 Oct',
    title: 'Logika School',
    subtitle: 'Python Mentor & Teacher · part-time\nWeekend classes',
  },
  {
    year: '2025 Dec',
    title: 'S-Engineering',
    subtitle: 'Software Engineer (C#) · part-time\nOdessa, Ukraine (international)',
  },
  {
    year: '2026 →',
    title: "What's next",
    subtitle: 'Open to opportunities',
    active: false,
  },
]

// ── Skills ──────────────────────────────
export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Engineering',
    items: [
      { name: 'C#',                    level: 5 },
      { name: 'Python',               level: 4 },
      { name: 'Java · Spring Boot',   level: 4 },
      { name: 'JavaScript · Node.js', level: 3 },
      { name: 'SQL · Databases',      level: 3 },
    ],
  },
  {
    category: 'ML & Data',
    items: [
      { name: 'scikit-learn',    level: 4 },
      { name: 'XGBoost · ONNX', level: 4 },
      { name: 'Pandas · NumPy', level: 4 },
      { name: 'Data pipelines', level: 3 },
    ],
  },
  {
    category: 'Design & Web',
    items: [
      { name: 'Figma · UI Design', level: 4 },
      { name: 'HTML · CSS',        level: 5 },
      { name: 'Three.js · WebGL',  level: 3 },
      { name: 'Blender',           level: 3 },
    ],
  },
  {
    category: 'Languages',
    items: [
      { name: 'Ukrainian',        level: 5 },
      { name: 'Russian',          level: 5 },
      { name: 'English',          level: 4 },
      { name: 'Italian · German', level: 3 },
      { name: 'Croatian',         level: 2 },
    ],
  },
]

// ── Certificates ────────────────────────
export const CERTIFICATES: Certificate[] = [
  { id: 'ioai-ukraine',       icon: '', name: 'IOAI Ukraine — National Selection',  issuer: 'IOAI Ukraine',        year: '2026', imageUrl: '/img/certs/ioai.png'          },
  { id: 'python1-ioai',       icon: '', name: 'Python 1 IOAI Spain',                issuer: 'Leagues of Code',     year: '2026', imageUrl: '/img/certs/python1_ioai.png'  },
  { id: 'python2-ioai',       icon: '', name: 'Python 2 IOAI Spain',                issuer: 'Leagues of Code',     year: '2026', imageUrl: '/img/certs/python2_ioai.png'  },
  { id: 'itvdn-dotnet',        icon: '', name: '.Net Part II',                       issuer: 'ITVDN',               year: '2026', imageUrl: '/img/certs/itvdn_dotnet.png'  },
  { id: 'itvdn-csharp',       icon: '', name: 'Interview questions about C#',        issuer: 'ITVDN',               year: '2026', imageUrl: '/img/certs/itvdn_csharp.png'  },
  { id: 'itvdn-java',         icon: '', name: 'Java Basics',                         issuer: 'ITVDN',               year: '2026', imageUrl: '/img/certs/itvdn_java.png'    },
  { id: 'itvdn-git',          icon: '', name: 'Git Basics',                          issuer: 'ITVDN',               year: '2026', imageUrl: '/img/certs/itvdn_git.png'     },
  { id: 'python-mentor',      icon: '', name: 'Python Mentor & Teacher',             issuer: 'Logika School',       year: '2026', imageUrl: '/img/certs/logika_python.png' },
  { id: 'ms-business-apps',   icon: '', name: 'Dynamics 365 Community',              issuer: 'Microsoft',           year: '2025', imageUrl: '/img/certs/ms_dynamics.png'   },
  { id: 'html-css-goit',      icon: '', name: 'HTML · CSS',                          issuer: 'GoIT',                year: '2024', imageUrl: ''                             },
  { id: 'js-prometheus',      icon: '', name: 'JS + HTML/CSS',                       issuer: 'Prometheus',          year: '2025', imageUrl: '/img/certs/prometheus.png'    },
]

// ── Low-poly 3D Background Shapes ───────
export const BG_SHAPES: LowPolyShapeConfig[] = [
  { type: 'icosahedron', detail: 1, color: 0xb4cede, x:  4.5, y:  0.5, z:  -3, scale: 2.20, opacity: 0.58 }, // hero large
  { type: 'octahedron',  detail: 1, color: 0xd0b4c4, x:  7.8, y: -0.8, z:  -5, scale: 1.65, opacity: 0.54 },
  { type: 'tetrahedron', detail: 2, color: 0xb8d0e4, x: -4.5, y: -1.5, z:  -6, scale: 1.90, opacity: 0.52 },
  { type: 'icosahedron', detail: 0, color: 0xdcc0cc, x:  9.5, y:  3.0, z:  -4, scale: 1.45, opacity: 0.56 },
  { type: 'octahedron',  detail: 0, color: 0xb4c8d8, x: -0.5, y: -3.5, z:  -5, scale: 1.70, opacity: 0.50 },
  { type: 'icosahedron', detail: 1, color: 0xcebcca, x: -9.0, y:  1.0, z:  -8, scale: 2.10, opacity: 0.46 },
  { type: 'tetrahedron', detail: 1, color: 0xb8cce0, x: 11.0, y: -2.5, z:  -7, scale: 1.55, opacity: 0.50 },
  { type: 'icosahedron', detail: 1, color: 0xdcc8d4, x:  2.5, y:  4.2, z:  -3, scale: 1.10, opacity: 0.46 },
  { type: 'octahedron',  detail: 0, color: 0xc4d4e4, x: -5.0, y:  4.8, z:  -4, scale: 1.00, opacity: 0.44 },
  { type: 'tetrahedron', detail: 0, color: 0xe0ccd8, x:  4.8, y:  5.5, z:  -6, scale: 1.20, opacity: 0.42 },
  { type: 'icosahedron', detail: 1, color: 0xd0e0ec, x: -2.5, y: -5.5, z:  -4, scale: 0.95, opacity: 0.40 },
]
