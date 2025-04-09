"use client"

import { motion } from "framer-motion"

export default function Balloons() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {[...Array(15)].map((_, i) => (
        <Balloon key={i} delay={i * 0.3} />
      ))}
    </div>
  )
}

function Balloon({ delay }: { delay: number }) {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-orange-500",
  ]

  const color = colors[Math.floor(Math.random() * colors.length)]
  const size = Math.random() * 30 + 40 // 40-70px
  const x = Math.random() * 90 + 5 // 5-95%

  return (
    <motion.div
      className="absolute bottom-0"
      style={{ left: `${x}%` }}
      initial={{ y: "110vh" }}
      animate={{
        y: "-20vh",
        x: [0, Math.random() * 100 - 50],
      }}
      transition={{
        duration: Math.random() * 10 + 15, // 15-25s
        delay,
        ease: "linear",
      }}
    >
      <motion.div
        className={`${color} relative rounded-full`}
        style={{
          width: `${size}px`,
          height: `${size * 1.2}px`,
        }}
        animate={{
          x: [0, 10, -10, 10, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: Math.random() * 3 + 2,
          ease: "easeInOut",
        }}
      >
        {/* Balloon highlight */}
        <div
          className="absolute rounded-full bg-white/30"
          style={{
            width: `${size * 0.3}px`,
            height: `${size * 0.3}px`,
            top: `${size * 0.2}px`,
            left: `${size * 0.2}px`,
          }}
        />

        {/* Balloon string */}
        <div
          className="absolute bg-gray-300 w-0.5"
          style={{
            height: `${size * 1.5}px`,
            bottom: `-${size * 1.5}px`,
            left: `${size / 2}px`,
          }}
        />
      </motion.div>
    </motion.div>
  )
}
