"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Cake, Gift, Heart, PartyPopper, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const wishes = [
  "May your day be as bright as your smile and as lovely as you.",
  "Wishing you a day filled with happiness and a year filled with joy.",
  "Hope your special day brings you all that your heart desires!",
  "Here's to another year of laughing together, crying together, and growing together.",
  "May the joy that you have spread in the past come back to you on this day.",
  "Wishing you a beautiful day with good health and happiness forever.",
  "Count your life by smiles, not tears. Count your age by friends, not years.",
  "May this special day bring you endless joy and tons of precious memories!",
]

export default function BirthdayCard() {
  const [currentWishIndex, setCurrentWishIndex] = useState(0)
  const [showFireworks, setShowFireworks] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWishIndex((prev) => (prev + 1) % wishes.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const triggerFireworks = () => {
    setShowFireworks(true)
    setTimeout(() => setShowFireworks(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-pink-400 to-purple-500" />
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-300 rounded-full opacity-30" />
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-pink-300 rounded-full opacity-30" />

        {/* Card content */}
        <div className="relative pt-24 px-6 pb-12 md:px-12 md:pb-16 text-center">
          <motion.div
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5 }}
            className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <Cake className="w-24 h-24 text-white drop-shadow-lg" />
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold text-purple-800 mb-6">Happy Birthday!</h1>

          <div className="flex justify-center space-x-4 mb-8">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 10, 0, -10, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                  delay: i * 0.2,
                }}
              >
                <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
              </motion.div>
            ))}
          </div>

          <div className="relative h-32 mb-8 flex items-center justify-center">
            <AnimatedWish wish={wishes[currentWishIndex]} />
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <BirthdayBadge icon={<Cake className="w-5 h-5" />} text="Make a Wish" />
            <BirthdayBadge icon={<Gift className="w-5 h-5" />} text="Open Gifts" />
            <BirthdayBadge icon={<PartyPopper className="w-5 h-5" />} text="Celebrate" />
            <BirthdayBadge icon={<Heart className="w-5 h-5" />} text="Feel Loved" />
          </div>

          <Button
            onClick={triggerFireworks}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-6 text-xl rounded-full"
          >
            Celebrate! 🎉
          </Button>
        </div>
      </motion.div>

      {showFireworks && <Fireworks />}
    </div>
  )
}

function AnimatedWish({ wish }: { wish: string }) {
  return (
    <motion.div
      key={wish}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-xl md:text-2xl text-purple-700 italic"
    >
      "{wish}"
    </motion.div>
  )
}

function BirthdayBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-2 bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 rounded-full border border-pink-200"
    >
      <span className="text-purple-600">{icon}</span>
      <span className="text-purple-800 font-medium">{text}</span>
    </motion.div>
  )
}

function Fireworks() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            delay: Math.random() * 0.5,
            ease: "easeOut",
          }}
          className="absolute w-16 h-16 rounded-full"
          style={{
            background: `radial-gradient(circle, ${
              ["#FF5E5E", "#5E8BFF", "#FFDE5E", "#5EFFB1", "#FF5EE9"][Math.floor(Math.random() * 5)]
            } 0%, transparent 70%)`,
          }}
        />
      ))}
    </div>
  )
}
