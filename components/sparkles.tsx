"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

type Sparkle = {
  id: number
  size: number
  color: string
  style: {
    top: string
    left: string
    zIndex: number
  }
}

export default function Sparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    // Create initial sparkles
    const initialSparkles = [...Array(20)].map((_, i) => createSparkle(i))
    setSparkles(initialSparkles)

    // Add new sparkles periodically
    const interval = setInterval(() => {
      setSparkles((currentSparkles) => {
        // Remove oldest sparkle and add a new one
        const newSparkles = [...currentSparkles]
        newSparkles.shift()
        newSparkles.push(createSparkle(Date.now()))
        return newSparkles
      })
    }, 800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          initial={{ scale: 0, rotate: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            ...sparkle.style,
          }}
        >
          <svg
            width={sparkle.size}
            height={sparkle.size}
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
              fill={sparkle.color}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

function createSparkle(id: number): Sparkle {
  const colors = [
    "#FFD700", // Gold
    "#FF6B6B", // Pink
    "#FF1493", // Deep Pink
    "#9F7AEA", // Purple
    "#F6AD55", // Orange
    "#4FD1C5", // Teal
  ]

  return {
    id,
    size: Math.random() * 20 + 10, // 10-30px
    color: colors[Math.floor(Math.random() * colors.length)],
    style: {
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      zIndex: 0,
    },
  }
}
