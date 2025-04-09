"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Cake, Gift, Heart, PartyPopper, Music } from "lucide-react"

export default function Loader({ name, from }: { name: string; from: string }) {
  // Use client-side only state to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  return (
    <div className="fixed inset-0 bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 flex flex-col items-center justify-center overflow-hidden">
      {/* Animated background shapes - only render on client */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => {
            // Use deterministic values based on index for initial render
            const width = 50 + ((i * 17) % 100)
            const height = 50 + ((i * 23) % 100)
            const top = `${(i * 5) % 100}%`
            const left = `${(i * 7) % 100}%`
            
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{
                  width,
                  height,
                  top,
                  left,
                }}
                animate={{
                  scale: [0, 1, 1.5, 1],
                  opacity: [0, 0.5, 0.2, 0],
                  rotate: [0, 90, 180, 270],
                }}
                transition={{
                  duration: 5 + (i % 5),
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i % 5,
                }}
              />
            )
          })}
        </div>
      )}

      <div className="text-center z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <Cake className="w-24 h-24 text-white mx-auto" />
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white mb-4"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Happy Birthday {name}!
        </motion.h1>

        <motion.p
          className="text-xl text-white/90 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          A special surprise just for you
        </motion.p>

        <motion.p
          className="text-lg text-white/80 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          With love, {from}
        </motion.p>

        <div className="flex justify-center items-center space-x-8 mb-12">
          {['heart', 'gift', 'party', 'music'].map((item, index) => {
            const Icon = index === 0 ? Heart : 
                        index === 1 ? Gift : 
                        index === 2 ? PartyPopper : Music
            
            return (
              <motion.div
                key={item}
                initial={{ y: 50, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  rotate: [0, index % 2 === 0 ? 10 : -5, 0, index % 2 === 0 ? -10 : 5, 0],
                }}
                transition={{
                  delay: 1 + (index * 0.2),
                  duration: 0.5,
                  rotate: {
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2,
                    delay: 1 + (index * 0.2),
                  },
                }}
              >
                <div className="bg-white/20 p-4 rounded-full">
                  <Icon className={`w-12 h-12 text-white ${index === 0 ? 'fill-pink-200' : ''}`} />
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="relative w-64 h-4 bg-white/30 rounded-full overflow-hidden mx-auto">
          <motion.div
            className="absolute top-0 left-0 h-full bg-white rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5 }}
          />
        </div>
      </div>
    </div>
  )
}