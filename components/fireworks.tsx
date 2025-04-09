"use client"

import { motion } from "framer-motion"

export default function Fireworks() {
  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {[...Array(20)].map((_, i) => (
        <Firework key={i} delay={i * 0.2} />
      ))}
    </div>
  )
}

function Firework({ delay }: { delay: number }) {
  const x = Math.random() * 100
  const y = Math.random() * 50 + 20
  const particleCount = Math.floor(Math.random() * 20) + 20

  const colors = [
    "#FF5E5E", // Red
    "#5E8BFF", // Blue
    "#FFDE5E", // Yellow
    "#5EFFB1", // Green
    "#FF5EE9", // Pink
    "#FFB15E", // Orange
  ]

  const color = colors[Math.floor(Math.random() * colors.length)]

  return (
    <>
      {/* Rocket trail */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-white"
        style={{ left: `${x}%`, bottom: "0%" }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0],
          y: ["0vh", `${-y}vh`],
        }}
        transition={{
          duration: 1,
          delay,
          ease: "easeOut",
        }}
      />

      {/* Explosion */}
      {[...Array(particleCount)].map((_, i) => {
        const angle = (i / particleCount) * 360
        const distance = Math.random() * 100 + 50

        return (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: `${x}%`,
              bottom: `${y}%`,
              backgroundColor: color,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, Math.cos(angle * (Math.PI / 180)) * distance],
              y: [0, Math.sin(angle * (Math.PI / 180)) * distance],
            }}
            transition={{
              duration: 1.5,
              delay: delay + 1,
              ease: "easeOut",
            }}
          />
        )
      })}
    </>
  )
}
