"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

type Heart = {
  id: number
  size: number
  style: {
    left: string
    rotate: string
  }
  duration: number
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Create initial hearts with deterministic values
    const initialHearts = [...Array(15)].map((_, i) => createDeterministicHeart(i))
    setHearts(initialHearts)

    // Add new hearts periodically - only on client side
    const interval = setInterval(() => {
      setHearts((currentHearts) => {
        // Remove oldest heart and add a new one
        const newHearts = [...currentHearts]
        newHearts.shift()
        
        // Use timestamp for id, but deterministic values for visual properties
        const newHeart = createDeterministicHeart(
          Date.now(), 
          newHearts.length % 5 // Use a cycling pattern for variety
        )
        
        newHearts.push(newHeart)
        return newHearts
      })
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  // Don't render during SSR
  if (!isClient) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "110vh", opacity: 0, rotate: heart.style.rotate }}
          animate={{
            y: "-10vh",
            opacity: [0, 1, 0],
            rotate: heart.style.rotate, // Use predetermined rotation value
          }}
          transition={{
            duration: heart.duration,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            left: heart.style.left,
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

// Create hearts with deterministic values based on an index
function createDeterministicHeart(id: number, seedOffset = 0): Heart {
  const seed = (id + seedOffset) % 100
  
  // Use the seed to generate deterministic values
  const sizeFactor = ((seed * 7) % 20) + 15 // 15-35px
  const leftPosition = `${(seed * 9.7) % 100}%`
  const rotation = `${((seed * 11) % 40) - 20}deg` // -20 to 20 degrees
  const durationBase = 8 + ((seed * 13) % 5) // 8-13s
  
  return {
    id,
    size: sizeFactor,
    style: {
      left: leftPosition,
      rotate: rotation,
    },
    duration: durationBase,
  }
}