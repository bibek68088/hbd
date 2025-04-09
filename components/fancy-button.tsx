"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface FancyButtonProps {
  onClick: () => void
  theme?: string
  label: string
  icon?: React.ReactNode
  size?: "small" | "medium" | "large"
  glow?: boolean
}

export default function FancyButton({
  onClick,
  theme = "default",
  label,
  icon,
  size = "medium",
  glow = false,
}: FancyButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; color: string }>>(
    [],
  )

  // Get theme-specific styles
  const getThemeStyles = () => {
    switch (theme) {
      case "cosmic":
        return {
          gradient: "from-violet-500 to-indigo-600",
          hoverGradient: "from-violet-600 to-indigo-700",
          shadow: "shadow-indigo-500/50",
          glow: "0 0 15px rgba(99, 102, 241, 0.8)",
          particleColors: ["#818cf8", "#6366f1", "#4f46e5", "#4338ca"],
        }
      case "nature":
        return {
          gradient: "from-emerald-500 to-teal-600",
          hoverGradient: "from-emerald-600 to-teal-700",
          shadow: "shadow-emerald-500/50",
          glow: "0 0 15px rgba(16, 185, 129, 0.8)",
          particleColors: ["#6ee7b7", "#10b981", "#059669", "#047857"],
        }
      case "golden":
        return {
          gradient: "from-amber-500 to-yellow-600",
          hoverGradient: "from-amber-600 to-yellow-700",
          shadow: "shadow-amber-500/50",
          glow: "0 0 15px rgba(245, 158, 11, 0.8)",
          particleColors: ["#fcd34d", "#f59e0b", "#d97706", "#b45309"],
        }
      case "eternal":
        return {
          gradient: "from-red-500 to-rose-600",
          hoverGradient: "from-red-600 to-rose-700",
          shadow: "shadow-rose-500/50",
          glow: "0 0 15px rgba(244, 63, 94, 0.8)",
          particleColors: ["#fda4af", "#f43f5e", "#e11d48", "#be123c"],
        }
      case "grand":
        return {
          gradient: "from-fuchsia-500 to-pink-600",
          hoverGradient: "from-fuchsia-600 to-pink-700",
          shadow: "shadow-pink-500/50",
          glow: "0 0 15px rgba(219, 39, 119, 0.8)",
          particleColors: ["#f0abfc", "#d946ef", "#c026d3", "#a21caf"],
        }
      default:
        return {
          gradient: "from-rose-500 to-pink-600",
          hoverGradient: "from-rose-600 to-pink-700",
          shadow: "shadow-rose-500/50",
          glow: "0 0 15px rgba(244, 63, 94, 0.8)",
          particleColors: ["#fda4af", "#f43f5e", "#e11d48", "#be123c"],
        }
    }
  }

  const themeStyles = getThemeStyles()

  // Get size-specific styles
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return "px-4 py-2 text-sm"
      case "large":
        return "px-10 py-7 text-xl"
      default:
        return "px-6 py-6 text-lg"
    }
  }

  const sizeStyles = getSizeStyles()

  // Create particles on hover
  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setParticles((prev) => {
          // Remove old particles
          const filtered = prev.filter((p) => p.id > Date.now() - 1000)

          // Add new particles
          const newParticles = [...Array(2)].map(() => ({
            id: Date.now() + Math.random() * 1000,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 6 + 2,
            color: themeStyles.particleColors[Math.floor(Math.random() * themeStyles.particleColors.length)],
          }))

          return [...filtered, ...newParticles]
        })
      }, 100)

      return () => clearInterval(interval)
    } else {
      setParticles([])
    }
  }, [isHovered, themeStyles.particleColors])

  return (
    <div className="relative">
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
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
            }}
            initial={{ opacity: 1, scale: 0 }}
            animate={{
              opacity: [1, 0],
              scale: [0, 1.5],
              x: [0, (Math.random() - 0.5) * 50],
              y: [0, (Math.random() - 0.5) * 50],
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isPressed ? { scale: 0.95 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
      >
        <Button
          onClick={() => {
            setIsPressed(true)
            setTimeout(() => setIsPressed(false), 200)
            onClick()
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            relative overflow-hidden
            bg-gradient-to-r ${themeStyles.gradient} 
            hover:bg-gradient-to-r hover:${themeStyles.hoverGradient}
            text-white ${sizeStyles} rounded-full 
            shadow-lg ${themeStyles.shadow}
            transform transition-all duration-300
            ${glow ? "animate-pulse" : ""}
          `}
          style={{
            boxShadow: isHovered && glow ? themeStyles.glow : "",
          }}
        >
          {/* Ripple effect */}
          {isPressed && (
            <motion.div
              className="absolute inset-0 bg-white rounded-full"
              initial={{ scale: 0, opacity: 0.7 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-white/10 to-transparent" />

          {/* Button content */}
          <div className="relative flex items-center justify-center">
            <span className="font-medium">{label}</span>
            {icon && <span>{icon}</span>}
          </div>
        </Button>
      </motion.div>

      {/* Glow effect */}
      {glow && (
        <motion.div
          className="absolute inset-0 rounded-full -z-10"
          animate={{
            boxShadow: [
              `0 0 10px ${themeStyles.particleColors[0]}`,
              `0 0 20px ${themeStyles.particleColors[1]}`,
              `0 0 10px ${themeStyles.particleColors[0]}`,
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      )}
    </div>
  )
}
