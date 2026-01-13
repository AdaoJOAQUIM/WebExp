import { useState, useEffect } from 'react'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetch('/data/projects.json')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error loading projects:', error)
        setLoading(false)
      })
  }, [])

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.featured === (filter === 'featured'))

  const ProjectCard = ({ project }) => (
    <div className="card group">
      <div className="relative overflow-hidden rounded-lg mb-4 h-48 bg-gradient-to-br from-primary-400 to-purple-600">
        <div className="absolute inset-0 flex items-center justify-center text-6xl">
          🚀
        </div>
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
      </div>

      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-sm font-medium"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-4">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-2 px-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors duration-300"
        >
          💻 Code
        </a>
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-2 px-4 gradient-bg text-white rounded-lg transition-all duration-300 hover:shadow-lg"
        >
          🌐 Demo
        </a>
      </div>
    </div>
  )

  if (loading) {
    return (
      <section id="projects" className="section bg-gray-50 dark:bg-gray-800/50">
        <div className="container text-center">
          <div className="text-4xl">⏳</div>
          <p>Chargement des projets...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="section bg-gray-50 dark:bg-gray-800/50">
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Mes <span className="gradient-text">Projets</span>
        </h2>

        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
              filter === 'all'
                ? 'gradient-bg text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Tous
          </button>
          <button
            onClick={() => setFilter('featured')}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
              filter === 'featured'
                ? 'gradient-bg text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            ⭐ En vedette
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
