import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import {
  getAbout,
  getProjects,
  getSkills,
  getExperience,
} from '@/lib/sanity.queries'

export default async function Home() {
  const [about, projects, skills, experience] = await Promise.all([
    getAbout(),
    getProjects(),
    getSkills(),
    getExperience(),
  ])

  return (
    <main>
      <Hero />
      <About data={about} />
      <Projects data={projects} />
      <Skills data={skills} />
      <Experience data={experience} />
      <Contact />
      <Footer />
    </main>
  )
}
