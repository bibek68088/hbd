"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

type Heart = {
  id: number
  size: number
  style: {
    top: string
    left: string
    animationDuration: string
    rotate: string
  }
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    // Create initial hearts
    const initialHearts = [...Array(15)].map((_, i) => createHeart(i))
    setHearts(initialHearts)

    // Add new hearts periodically
    const interval = setInterval(() => {
      setHearts((currentHearts) => {
        // Remove oldest heart and add a new one
        const newHearts = [...currentHearts]
        newHearts.shift()
        newHearts.push(createHeart(Date.now()))
        return newHearts
      })
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "110vh", opacity: 0, rotate: heart.style.rotate }}
          animate={{
            y: "-10vh",
            opacity: [0, 1, 0],
            rotate: `calc(${heart.style.rotate} + ${Math.random() > 0.5 ? "20deg" : "-20deg"})`,
          }}
          transition={{
            duration: Number.parseInt(heart.style.animationDuration),
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            ...heart.style,
          }}
          className="text-rose-500"
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

function createHeart(id: number): Heart {
  const colors = ["text-rose-500", "text-pink-500", "text-red-500", "text-purple-400"]
  const size = Math.random() * 20 + 15 // 15-35px

  return {
    id,
    size,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 20 + 100}%`, // Start below the viewport
      animationDuration: `${Math.random() * 5 + 8}s`, // 8-13s
      rotate: `${Math.random() * 40 - 20}deg`, // -20 to 20 degrees
    },
  }
}
