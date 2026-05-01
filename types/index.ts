export interface SanityImage {
  asset: { _ref: string }
  alt?: string
}

export interface Project {
  _id: string
  title: string
  slug: { current: string }
  description: string
  image: SanityImage
  techStack: string[]
  githubUrl: string
  liveUrl: string
  featured: boolean
}

export interface About {
  bio: string
  profileImage: SanityImage
  cvUrl?: string
  location: string
}

export interface Skill {
  _id: string
  name: string
  category: 'frontend' | 'backend' | 'tools'
}

export interface Experience {
  _id: string
  role: string
  company: string
  startDate: string
  endDate?: string
  current: boolean
  bullets: string[]
}
