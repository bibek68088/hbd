"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  speed: number
  direction: number
}

interface ParticleBackgroundProps {
  theme: string
}

export default function ParticleBackground({ theme }: ParticleBackgroundProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  // Get theme-specific colors
  const getThemeColors = () => {
    switch (theme) {
      case "cosmic":
        return ["#c4b5fd", "#a78bfa", "#8b5cf6", "#7c3aed", "#6d28d9"]
      case "nature":
        return ["#a7f3d0", "#6ee7b7", "#34d399", "#10b981", "#059669"]
      case "golden":
        return ["#fde68a", "#fcd34d", "#fbbf24", "#f59e0b", "#d97706"]
      case "eternal":
        return ["#fecdd3", "#fda4af", "#fb7185", "#f43f5e", "#e11d48"]
      case "grand":
        return ["#f5d0fe", "#f0abfc", "#e879f9", "#d946ef", "#c026d3"]
      default:
        return ["#fecdd3", "#fda4af", "#fb7185", "#f43f5e", "#e11d48"]
    }
  }

  useEffect(() => {
    const colors = getThemeColors()

    // Create initial particles
    const initialParticles = [...Array(30)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 0.2 + 0.1,
      direction: Math.random() > 0.5 ? 1 : -1,
    }))

    setParticles(initialParticles)

    // Animation loop
    const interval = setInterval(() => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          // Move particles
          let newY = particle.y - particle.speed

          // Reset position if out of bounds
          if (newY < -5) {
            newY = 105
          }

          return {
            ...particle,
            y: newY,
            x: particle.x + Math.sin(newY * 0.05) * 0.2 * particle.direction,
          }
        }),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [theme])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: 0.6,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
