import { useState, useEffect } from 'react'

const Skills = () => {
  const [skills, setSkills] = useState({ frontend: [], backend: [], tools: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/skills.json')
      .then((res) => res.json())
      .then((data) => {
        setSkills(data.skills)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error loading skills:', error)
        setLoading(false)
      })
  }, [])

  const SkillBar = ({ skill }) => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-medium flex items-center gap-2">
          <span className="text-2xl">{skill.icon}</span>
          {skill.name}
        </span>
        <span className="text-primary-600 font-bold">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className="h-full gradient-bg animate-gradient transition-all duration-1000 ease-out"
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <section id="skills" className="section">
        <div className="container text-center">
          <div className="text-4xl">⏳</div>
          <p>Chargement des compétences...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Mes <span className="gradient-text">Compétences</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="card">
            <h3 className="text-2xl font-bold mb-6 text-center">
              🎨 Frontend
            </h3>
            {skills.frontend.map((skill) => (
              <SkillBar key={skill.name} skill={skill} />
            ))}
          </div>

          <div className="card">
            <h3 className="text-2xl font-bold mb-6 text-center">
              ⚙️ Backend
            </h3>
            {skills.backend.map((skill) => (
              <SkillBar key={skill.name} skill={skill} />
            ))}
          </div>

          <div className="card">
            <h3 className="text-2xl font-bold mb-6 text-center">
              🛠️ Outils
            </h3>
            {skills.tools.map((skill) => (
              <SkillBar key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
