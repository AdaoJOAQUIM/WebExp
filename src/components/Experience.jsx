import { useState, useEffect } from 'react'

const Experience = () => {
  const [experience, setExperience] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/profile.json')
      .then((res) => res.json())
      .then((data) => {
        setExperience(data.experience)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error loading experience:', error)
        setLoading(false)
      })
  }, [])

  const ExperienceCard = ({ exp, index }) => (
    <div className="relative pl-8 pb-12 last:pb-0">
      <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-primary-600 border-4 border-white dark:border-gray-900"></div>
      <div className="absolute left-2 top-4 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700"></div>

      <div className="card ml-4">
        <div className="flex flex-wrap justify-between items-start mb-2">
          <h3 className="text-2xl font-bold">{exp.title}</h3>
          <span className="text-sm text-primary-600 font-medium">
            {exp.period}
          </span>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 font-medium mb-2">
          {exp.company}
        </p>
        <p className="text-gray-600 dark:text-gray-400">{exp.description}</p>
      </div>
    </div>
  )

  if (loading) {
    return (
      <section id="experience" className="section">
        <div className="container text-center">
          <div className="text-4xl">⏳</div>
          <p>Chargement de l'expérience...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Mon <span className="gradient-text">Expérience</span>
        </h2>

        <div className="max-w-4xl mx-auto">
          {experience.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
