"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

type Star = {
  id: number
  size: number
  color: string
  style: {
    top: string
    left: string
    opacity: number
    rotate: number
  }
}

export default function StarsEffect() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    // Create initial stars
    const initialStars = [...Array(30)].map((_, i) => createStar(i))
    setStars(initialStars)

    // Add new stars periodically
    const interval = setInterval(() => {
      setStars((currentStars) => {
        // Remove oldest star and add a new one
        const newStars = [...currentStars]
        newStars.shift()
        newStars.push(createStar(Date.now()))
        return newStars
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ scale: 0, opacity: 0, rotate: star.style.rotate }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, star.style.opacity, 0],
            rotate: star.style.rotate + 180,
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: star.style.top,
            left: star.style.left,
          }}
        >
          <svg viewBox="0 0 24 24" fill={star.color} xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

function createStar(id: number): Star {
  const colors = [
    "#FFD700", // Gold
    "#FFDF00", // Golden Yellow
    "#FFC000", // Amber
    "#FFBF00", // Amber
    "#FFB000", // Selective Yellow
  ]

  return {
    id,
    size: Math.random() * 20 + 10, // 10-30px
    color: colors[Math.floor(Math.random() * colors.length)],
    style: {
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.5 + 0.5, // 0.5-1
      rotate: Math.random() * 360,
    },
  }
}
