const About = () => {
  return (
    <section id="about" className="section bg-gray-50 dark:bg-gray-800/50">
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          À <span className="gradient-text">Propos</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Développeur Full Stack passionné avec plus de{' '}
              <span className="font-bold text-primary-600">5 ans d'expérience</span>{' '}
              dans la création d'applications web modernes et performantes.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Je suis spécialisé dans les technologies{' '}
              <span className="font-bold text-primary-600">React</span>,{' '}
              <span className="font-bold text-primary-600">Node.js</span>, et
              l'architecture cloud. Mon objectif est de créer des solutions
              innovantes qui résolvent des problèmes réels.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              J'aime apprendre de nouvelles technologies et partager mes
              connaissances avec la communauté des développeurs.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                <div className="text-3xl font-bold text-primary-600">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Projets réalisés
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                <div className="text-3xl font-bold text-primary-600">5+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Années d'expérience
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                <div className="text-3xl font-bold text-primary-600">30+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Clients satisfaits
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-400 to-purple-600 opacity-20 animate-float"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-9xl">👨‍💻</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
