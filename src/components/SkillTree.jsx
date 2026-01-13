import { useState } from 'react'

const SkillTree = () => {
  const [showTree, setShowTree] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState(null)

  const skillTree = {
    frontend: {
      name: 'Frontend',
      icon: '🎨',
      color: 'from-blue-500 to-cyan-500',
      skills: [
        {
          id: 'html',
          name: 'HTML5',
          level: 5,
          unlocked: true,
          children: ['css', 'react'],
        },
        {
          id: 'css',
          name: 'CSS3 / Tailwind',
          level: 5,
          unlocked: true,
          children: ['react', 'animations'],
        },
        {
          id: 'javascript',
          name: 'JavaScript',
          level: 5,
          unlocked: true,
          children: ['typescript', 'react'],
        },
        {
          id: 'typescript',
          name: 'TypeScript',
          level: 4,
          unlocked: true,
          children: ['react', 'next'],
        },
        {
          id: 'react',
          name: 'React',
          level: 5,
          unlocked: true,
          children: ['next', 'redux'],
        },
        {
          id: 'next',
          name: 'Next.js',
          level: 4,
          unlocked: true,
          children: [],
        },
        {
          id: 'redux',
          name: 'Redux',
          level: 4,
          unlocked: true,
          children: [],
        },
        {
          id: 'animations',
          name: 'Animations',
          level: 4,
          unlocked: true,
          children: [],
        },
      ],
    },
    backend: {
      name: 'Backend',
      icon: '⚙️',
      color: 'from-green-500 to-emerald-500',
      skills: [
        {
          id: 'nodejs',
          name: 'Node.js',
          level: 5,
          unlocked: true,
          children: ['express', 'nestjs'],
        },
        {
          id: 'express',
          name: 'Express',
          level: 5,
          unlocked: true,
          children: ['api', 'auth'],
        },
        {
          id: 'python',
          name: 'Python',
          level: 4,
          unlocked: true,
          children: ['django', 'fastapi'],
        },
        {
          id: 'django',
          name: 'Django',
          level: 4,
          unlocked: true,
          children: [],
        },
        {
          id: 'api',
          name: 'REST API',
          level: 5,
          unlocked: true,
          children: ['graphql'],
        },
        {
          id: 'graphql',
          name: 'GraphQL',
          level: 3,
          unlocked: true,
          children: [],
        },
        {
          id: 'auth',
          name: 'Authentication',
          level: 4,
          unlocked: true,
          children: [],
        },
      ],
    },
    database: {
      name: 'Database',
      icon: '🗄️',
      color: 'from-purple-500 to-pink-500',
      skills: [
        {
          id: 'sql',
          name: 'SQL',
          level: 4,
          unlocked: true,
          children: ['postgresql', 'mysql'],
        },
        {
          id: 'postgresql',
          name: 'PostgreSQL',
          level: 4,
          unlocked: true,
          children: [],
        },
        {
          id: 'mongodb',
          name: 'MongoDB',
          level: 4,
          unlocked: true,
          children: ['mongoose'],
        },
        {
          id: 'redis',
          name: 'Redis',
          level: 3,
          unlocked: true,
          children: [],
        },
      ],
    },
    devops: {
      name: 'DevOps',
      icon: '🚀',
      color: 'from-orange-500 to-red-500',
      skills: [
        {
          id: 'git',
          name: 'Git',
          level: 5,
          unlocked: true,
          children: ['github', 'cicd'],
        },
        {
          id: 'docker',
          name: 'Docker',
          level: 4,
          unlocked: true,
          children: ['kubernetes'],
        },
        {
          id: 'aws',
          name: 'AWS',
          level: 3,
          unlocked: true,
          children: [],
        },
        {
          id: 'cicd',
          name: 'CI/CD',
          level: 4,
          unlocked: true,
          children: [],
        },
      ],
    },
  }

  const renderSkillLevel = (level) => {
    return '⭐'.repeat(level) + '☆'.repeat(5 - level)
  }

  const SkillNode = ({ skill, category }) => (
    <div
      onClick={() => setSelectedSkill({ ...skill, category })}
      className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        skill.unlocked
          ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-green-500 shadow-lg hover:shadow-xl'
          : 'bg-gray-100 dark:bg-gray-800 border-gray-400 opacity-50'
      }`}
    >
      <div className="text-center">
        <div className="text-2xl mb-2">{skill.unlocked ? '✅' : '🔒'}</div>
        <div className="font-bold text-sm mb-1">{skill.name}</div>
        <div className="text-xs">{renderSkillLevel(skill.level)}</div>
      </div>
    </div>
  )

  return (
    <>
      <button
        onClick={() => setShowTree(!showTree)}
        className="fixed top-36 right-6 z-40 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
      >
        <span className="text-lg">🌳</span>
        <span className="text-sm font-medium">Skill Tree</span>
      </button>

      {showTree && (
        <div className="fixed inset-4 z-50 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  🌳 Arbre des Compétences
                </h2>
                <p className="text-white/90">
                  Explorez toutes mes compétences techniques
                </p>
              </div>
              <button
                onClick={() => setShowTree(false)}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors duration-300"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(100vh-150px)]">
            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(skillTree).map(([key, category]) => (
                <div key={key} className="mb-6">
                  <div
                    className={`bg-gradient-to-r ${category.color} p-4 rounded-xl mb-4 shadow-lg`}
                  >
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                      <span className="text-3xl">{category.icon}</span>
                      {category.name}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {category.skills.map((skill) => (
                      <SkillNode
                        key={skill.id}
                        skill={skill}
                        category={category.name}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedSkill && (
            <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">
                    {selectedSkill.unlocked ? '✅' : '🔒'}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{selectedSkill.name}</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Catégorie: {selectedSkill.category}
                  </div>
                  <div className="text-3xl mb-4">
                    {renderSkillLevel(selectedSkill.level)}
                  </div>
                  <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    Niveau {selectedSkill.level}/5
                  </div>
                </div>

                <div className="mb-6">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                      style={{ width: `${(selectedSkill.level / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {selectedSkill.children && selectedSkill.children.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-bold mb-2">🔓 Débloquer:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkill.children.map((child) => (
                        <span
                          key={child}
                          className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm"
                        >
                          {child}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setSelectedSkill(null)}
                  className="w-full btn-primary"
                >
                  Fermer
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default SkillTree
