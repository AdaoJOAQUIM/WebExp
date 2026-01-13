import { useEffect, useState } from 'react'

const Hero = () => {
  const [displayText, setDisplayText] = useState('')
  const fullText = 'Full Stack Developer'
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[index])
        setIndex((prev) => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [index])

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="blob absolute top-20 left-20 w-72 h-72"></div>
        <div className="blob absolute bottom-20 right-20 w-96 h-96 animation-delay-2000"></div>
        <div className="blob absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="animate-float">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Bonjour, je suis{' '}
            <span className="gradient-text">Développeur</span>
          </h1>
          <p className="text-2xl md:text-4xl text-gray-600 dark:text-gray-400 mb-8 min-h-[3rem]">
            {displayText}
            <span className="animate-glow">|</span>
          </p>
        </div>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Passionné par la création d'applications web modernes et performantes.
          Spécialisé en React, Node.js et architecture cloud.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#projects" className="btn-primary">
            Voir mes projets
          </a>
          <a href="#contact" className="btn-secondary">
            Me contacter
          </a>
        </div>

        <div className="mt-16 flex justify-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 transform hover:scale-110"
          >
            💻
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 transform hover:scale-110"
          >
            💼
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 transform hover:scale-110"
          >
            🐦
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-4xl">
          ⬇️
        </a>
      </div>
    </section>
  )
}

export default Hero
