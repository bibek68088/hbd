"use client"

import { motion } from "framer-motion"

export default function InfinitySymbol() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {[...Array(10)].map((_, i) => (
        <FloatingInfinity
          key={i}
          delay={i * 0.5}
          size={Math.random() * 50 + 30}
          position={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
          }}
        />
      ))}
    </div>
  )
}

function FloatingInfinity({
  delay,
  size,
  position,
}: {
  delay: number
  size: number
  position: {
    top: string
    left: string
  }
}) {
  const colors = [
    "rgba(239, 68, 68, 0.7)", // Red
    "rgba(236, 72, 153, 0.7)", // Pink
    "rgba(217, 70, 239, 0.7)", // Fuchsia
    "rgba(168, 85, 247, 0.7)", // Purple
    "rgba(139, 92, 246, 0.7)", // Violet
  ]

  const color = colors[Math.floor(Math.random() * colors.length)]

  return (
    <motion.div
      className="absolute"
      style={{
        top: position.top,
        left: position.left,
        width: `${size}px`,
        height: `${size * 0.5}px`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
        y: [0, -30, 0, 30, 0],
      }}
      transition={{
        duration: 10,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: Math.random() * 20 + 10,
      }}
    >
      <svg
        viewBox="0 0 100 50"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))" }}
      >
        <motion.path
          d="M30,25 C30,15 40,5 50,5 C60,5 70,15 70,25 C70,35 60,45 50,45 C40,45 30,35 30,25 M70,25 C70,15 80,5 90,5 C100,5 110,15 110,25 C110,35 100,45 90,45 C80,45 70,35 70,25"
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          animate={{
            pathLength: [0, 1],
            pathOffset: [0, 1],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </svg>
    </motion.div>
  )
}
