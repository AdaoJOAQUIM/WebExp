import { useEffect, useRef } from 'react'

const ThreeBackground = () => {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class Particle {
      constructor() {
        this.reset()
        this.y = Math.random() * canvas.height
        this.opacity = Math.random() * 0.5 + 0.2
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = -10
        this.speed = Math.random() * 2 + 1
        this.size = Math.random() * 3 + 1
        this.color = `hsl(${Math.random() * 60 + 180}, 70%, 60%)`
        this.vx = Math.random() * 0.5 - 0.25
      }

      update() {
        this.y += this.speed
        this.x += this.vx

        const dx = mouseRef.current.x - this.x
        const dy = mouseRef.current.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const angle = Math.atan2(dy, dx)
          this.x -= Math.cos(angle) * 2
          this.y -= Math.sin(angle) * 2
        }

        if (this.y > canvas.height) {
          this.reset()
        }

        if (this.x < 0 || this.x > canvas.width) {
          this.x = Math.random() * canvas.width
        }
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.opacity
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    const particleCount = 100
    particlesRef.current = []
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle())
    }

    const drawConnections = () => {
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(96, 165, 250, ${
              (1 - distance / 150) * 0.2
            })`
            ctx.lineWidth = 0.5
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })
    }

    let animationFrameId

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      drawConnections()

      particlesRef.current.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}

export default ThreeBackground
