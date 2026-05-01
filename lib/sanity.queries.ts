import { client } from './sanity.client'
import type { Project, About, Skill, Experience } from '@/types'

const revalidate = { next: { revalidate: 60 } }

export async function getProjects(): Promise<Project[]> {
  return client.fetch(
    `*[_type == "project"] | order(order asc) {
      _id, title, slug, description, image, techStack, githubUrl, liveUrl, featured
    }`,
    {},
    revalidate,
  )
}

export async function getAbout(): Promise<About | null> {
  return client.fetch(
    `*[_type == "about"][0] { bio, profileImage, cvUrl, location }`,
    {},
    revalidate,
  )
}

export async function getSkills(): Promise<Skill[]> {
  return client.fetch(
    `*[_type == "skill"] | order(order asc) { _id, name, category }`,
    {},
    revalidate,
  )
}

export async function getExperience(): Promise<Experience[]> {
  return client.fetch(
    `*[_type == "experience"] | order(order asc) {
      _id, role, company, startDate, endDate, current, bullets
    }`,
    {},
    revalidate,
  )
}
