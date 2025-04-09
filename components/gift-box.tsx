"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Gift, Infinity } from "lucide-react"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"

export default function GiftBox() {
  const [isOpen, setIsOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const { width, height } = useWindowSize()

  const handleOpen = () => {
    setIsOpen(true)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 5000)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {!isOpen ? (
        <motion.div
          className="relative cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpen}
        >
          <motion.div
            className="w-64 h-64 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl shadow-2xl flex items-center justify-center"
            animate={{
              scale: [1, 1.02, 1],
              rotate: [0, 1, 0, -1, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 3,
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-t-2xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Gift className="w-32 h-32 text-white" />
            </div>
            <div className="absolute w-12 h-full bg-gradient-to-r from-pink-500 to-purple-600 left-1/2 -translate-x-1/2" />
            <div className="absolute w-full h-12 bg-gradient-to-r from-pink-500 to-purple-600 top-1/2 -translate-y-1/2" />
          </motion.div>
          <motion.div
            className="absolute -top-8 -right-8"
            animate={{
              rotate: [0, 10, 0, -10, 0],
              y: [0, -5, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
            }}
          >
            <div className="w-24 h-24 bg-gradient-to-r from-pink-300 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
              <p className="text-white font-bold">Click Me!</p>
            </div>
          </motion.div>
          <p className="text-lg text-purple-700 mt-6">Click to open your special gift!</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, 0, -10, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 3,
            }}
            className="mb-8"
          >
            <div className="relative">
              <Heart className="w-32 h-32 text-pink-500 fill-pink-500 mx-auto" />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 3,
                }}
              >
                <Infinity className="w-16 h-16 text-white mx-auto" />
              </motion.div>
            </div>
          </motion.div>

          <h3 className="text-3xl font-bold text-purple-700 mb-4">My Heart Is Yours Forever</h3>

          <div className="max-w-md mx-auto bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl border border-pink-200 shadow-lg mb-8">
            <p className="text-lg text-purple-700 mb-4">
              This gift represents my heart, which belongs to you completely. No matter where life takes us, my love for
              you will never fade.
            </p>
            <p className="text-lg text-purple-700">
              I promise to cherish every moment with you and make each day special, not just your birthday.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded-xl border border-pink-200 shadow-md"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2 + i,
                    delay: i * 0.5,
                  }}
                >
                  <Heart className="w-12 h-12 text-pink-500 fill-pink-500 mx-auto" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          <p className="text-xl font-bold text-pink-600">Forever yours,</p>
          <p className="text-2xl font-bold text-purple-700">Bibek ❤️</p>
        </motion.div>
      )}

      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={300} />}
    </div>
  )
}
