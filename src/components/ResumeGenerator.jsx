import { useState } from 'react'

const ResumeGenerator = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [format, setFormat] = useState('pdf')
  const [template, setTemplate] = useState('modern')

  const generateResume = () => {
    const resumeData = {
      name: 'Votre Nom',
      title: 'Full Stack Developer',
      email: 'contact@example.com',
      phone: '+33 6 12 34 56 78',
      location: 'Paris, France',
      summary:
        'Développeur Full Stack passionné avec plus de 5 ans d\'expérience dans la création d\'applications web modernes et performantes.',
      skills: {
        frontend: ['React', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Next.js'],
        backend: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB'],
        tools: ['Git', 'Docker', 'AWS', 'CI/CD', 'Figma'],
      },
      experience: [
        {
          title: 'Senior Full Stack Developer',
          company: 'Tech Company Inc.',
          period: '2022 - Présent',
          description:
            'Développement d\'applications web complexes et gestion d\'équipe technique',
        },
        {
          title: 'Full Stack Developer',
          company: 'Startup Innovation',
          period: '2020 - 2022',
          description:
            'Création de MVP et développement de nouvelles fonctionnalités',
        },
      ],
      projects: [
        {
          name: 'E-Commerce Platform',
          description:
            'Plateforme e-commerce complète avec panier, paiement et gestion des commandes',
          technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        },
        {
          name: 'Task Management App',
          description:
            'Application de gestion de tâches collaborative en temps réel',
          technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
        },
      ],
    }

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(resumeData, null, 2)], {
        type: 'application/json',
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'resume.json'
      a.click()
    } else if (format === 'txt') {
      const textContent = `
${resumeData.name}
${resumeData.title}
${resumeData.email} | ${resumeData.phone} | ${resumeData.location}

RÉSUMÉ
${resumeData.summary}

COMPÉTENCES
Frontend: ${resumeData.skills.frontend.join(', ')}
Backend: ${resumeData.skills.backend.join(', ')}
Outils: ${resumeData.skills.tools.join(', ')}

EXPÉRIENCE
${resumeData.experience
  .map(
    (exp) => `
${exp.title} - ${exp.company}
${exp.period}
${exp.description}
`
  )
  .join('\n')}

PROJETS
${resumeData.projects
  .map(
    (proj) => `
${proj.name}
${proj.description}
Technologies: ${proj.technologies.join(', ')}
`
  )
  .join('\n')}
      `.trim()

      const blob = new Blob([textContent], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'resume.txt'
      a.click()
    } else if (format === 'html') {
      const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${resumeData.name} - CV</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
    h1 { color: #0ea5e9; margin-bottom: 5px; }
    h2 { color: #333; border-bottom: 2px solid #0ea5e9; padding-bottom: 5px; }
    .contact { color: #666; margin-bottom: 20px; }
    .section { margin-bottom: 30px; }
    .experience, .project { margin-bottom: 20px; }
    .skills { display: flex; gap: 20px; }
    .skill-category { flex: 1; }
  </style>
</head>
<body>
  <h1>${resumeData.name}</h1>
  <div class="contact">${resumeData.title} | ${resumeData.email} | ${resumeData.phone} | ${resumeData.location}</div>

  <div class="section">
    <h2>Résumé</h2>
    <p>${resumeData.summary}</p>
  </div>

  <div class="section">
    <h2>Compétences</h2>
    <div class="skills">
      <div class="skill-category">
        <strong>Frontend:</strong> ${resumeData.skills.frontend.join(', ')}
      </div>
      <div class="skill-category">
        <strong>Backend:</strong> ${resumeData.skills.backend.join(', ')}
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Expérience</h2>
    ${resumeData.experience
      .map(
        (exp) => `
      <div class="experience">
        <h3>${exp.title} - ${exp.company}</h3>
        <p><em>${exp.period}</em></p>
        <p>${exp.description}</p>
      </div>
    `
      )
      .join('')}
  </div>

  <div class="section">
    <h2>Projets</h2>
    ${resumeData.projects
      .map(
        (proj) => `
      <div class="project">
        <h3>${proj.name}</h3>
        <p>${proj.description}</p>
        <p><strong>Technologies:</strong> ${proj.technologies.join(', ')}</p>
      </div>
    `
      )
      .join('')}
  </div>
</body>
</html>
      `.trim()

      const blob = new Blob([htmlContent], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'resume.html'
      a.click()
    } else {
      alert('🎉 CV généré! (PDF nécessite une librairie supplémentaire)')
    }

    setTimeout(() => setIsOpen(false), 1000)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-64 left-6 z-40 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
      >
        <span className="text-lg">📄</span>
        <span className="text-sm font-medium">CV Export</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4">
            <h2 className="text-2xl font-bold mb-6 gradient-text">
              📄 Générer mon CV
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">
                Format d'export:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setFormat('pdf')}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    format === 'pdf'
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
                  }`}
                >
                  <div className="text-3xl mb-2">📕</div>
                  <div className="font-medium">PDF</div>
                </button>
                <button
                  onClick={() => setFormat('html')}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    format === 'html'
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
                  }`}
                >
                  <div className="text-3xl mb-2">🌐</div>
                  <div className="font-medium">HTML</div>
                </button>
                <button
                  onClick={() => setFormat('json')}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    format === 'json'
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
                  }`}
                >
                  <div className="text-3xl mb-2">📋</div>
                  <div className="font-medium">JSON</div>
                </button>
                <button
                  onClick={() => setFormat('txt')}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    format === 'txt'
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
                  }`}
                >
                  <div className="text-3xl mb-2">📝</div>
                  <div className="font-medium">TXT</div>
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">
                Template:
              </label>
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600"
              >
                <option value="modern">🎨 Moderne</option>
                <option value="classic">📋 Classique</option>
                <option value="minimal">✨ Minimaliste</option>
                <option value="creative">🎭 Créatif</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={generateResume}
                className="flex-1 btn-primary"
              >
                Générer le CV
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 btn-secondary"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ResumeGenerator
