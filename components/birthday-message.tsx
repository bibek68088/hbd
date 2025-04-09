"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Heart, Star, Cake, Gift, Infinity } from "lucide-react"
import Image from "next/image"

interface BirthdayMessageProps {
  title: string
  message: string
  emoji: string
  animation?: "fadeUp" | "slideIn" | "scale" | "rotate" | "bounce" | "pulse"
  bgColor?: string
  isFinal?: boolean
  from?: string
  theme?: string
  hideSignature?: boolean
}

export default function BirthdayMessage({
  title,
  message,
  emoji,
  animation = "fadeUp",
  bgColor = "from-rose-400 to-purple-500",
  isFinal = false,
  from = "Bibek",
  theme = "celebration",
  hideSignature = false,
}: BirthdayMessageProps) {
  // Define animation variants based on the animation prop
  const containerVariants = {
    fadeUp: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    },
    slideIn: {
      initial: { opacity: 0, x: -100 },
      animate: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
    },
    rotate: {
      initial: { opacity: 0, rotate: -10 },
      animate: { opacity: 1, rotate: 0, transition: { duration: 0.6 } },
    },
    bounce: {
      initial: { opacity: 0, y: -50 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 15,
        },
      },
    },
    pulse: {
      initial: { opacity: 0, scale: 0.9 },
      animate: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5 },
      },
    },
  }

  const selectedVariant = containerVariants[animation]

  // Get theme-specific styles
  const getThemeStyles = () => {
    switch (theme) {
      case "cosmic":
        return {
          cardBg: "bg-indigo-900/80 backdrop-blur-md border border-indigo-500/50",
          textColor: "text-white",
          headingColor: "text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-200",
          iconBg: "bg-indigo-800",
        }
      case "nature":
        return {
          cardBg: "bg-white/90 backdrop-blur-md border border-emerald-300",
          textColor: "text-emerald-800",
          headingColor: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500",
          iconBg: "bg-emerald-100",
        }
      case "golden":
        return {
          cardBg: "bg-white/90 backdrop-blur-md border border-amber-300",
          textColor: "text-amber-800",
          headingColor: "text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500",
          iconBg: "bg-amber-100",
        }
      case "eternal":
        return {
          cardBg: "bg-white/90 backdrop-blur-md border border-red-300",
          textColor: "text-red-800",
          headingColor: "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500",
          iconBg: "bg-red-100",
        }
      case "grand":
        return {
          cardBg: "bg-white/90 backdrop-blur-md border border-fuchsia-300",
          textColor: "text-fuchsia-800",
          headingColor: "text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-pink-500",
          iconBg: "bg-fuchsia-100",
        }
      default:
        return {
          cardBg: "bg-white/90 backdrop-blur-md",
          textColor: "text-gray-700",
          headingColor: "text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600",
          iconBg: "bg-white",
        }
    }
  }

  const themeStyles = getThemeStyles()

  // Staggered animation for content elements
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  return (
    <motion.div
      className={`rounded-3xl shadow-xl overflow-hidden ${themeStyles.cardBg} ${
        isFinal ? "border-4 border-rose-400" : ""
      }`}
      initial={selectedVariant.initial}
      animate={selectedVariant.animate}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Decorative elements */}
      <div className={`absolute top-0 left-0 w-full h-24 bg-gradient-to-r ${bgColor}`} />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: Math.random() * 60 + 20,
              height: Math.random() * 60 + 20,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0, -10, 0],
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Message content */}
      <div className="relative pt-28 px-6 pb-10 md:px-10 md:pb-12 text-center">
        <motion.div
          className={`absolute top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${themeStyles.iconBg} rounded-full p-4 shadow-lg`}
          animate={
            isFinal
              ? {
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0, -5, 0],
                  boxShadow: [
                    "0px 0px 0px rgba(0,0,0,0.2)",
                    "0px 0px 20px rgba(255,255,255,0.5)",
                    "0px 0px 0px rgba(0,0,0,0.2)",
                  ],
                }
              : {
                  y: [0, -10, 0],
                  rotate: [0, 5, 0, -5, 0],
                }
          }
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: isFinal ? 2 : 3,
          }}
        >
          <span className="text-5xl">{emoji}</span>
        </motion.div>

        <motion.div variants={contentVariants} initial="hidden" animate="visible">
          <motion.h2
            variants={itemVariants}
            className={`text-3xl md:text-4xl font-bold ${themeStyles.headingColor} mb-6`}
          >
            {title}
          </motion.h2>

          <motion.p variants={itemVariants} className={`text-xl md:text-2xl ${themeStyles.textColor} mb-8`}>
            {message}
          </motion.p>

          {isFinal && <FinalBirthdayContent from={from} theme={theme} />}

          {!hideSignature && (
            <motion.div
              variants={itemVariants}
              className={`mt-6 text-sm ${theme === "cosmic" ? "text-indigo-300" : "text-gray-500"} italic`}
            >
              Forever yours, {from}
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

function FinalBirthdayContent({ from, theme }: { from: string; theme?: string }) {
  // Get theme-specific styles
  const getThemeStyles = () => {
    switch (theme) {
      case "cosmic":
        return {
          cardBg: "from-indigo-50 to-purple-50 border-indigo-200",
          textColor: "text-indigo-800",
          iconColor: "text-indigo-500",
        }
      case "nature":
        return {
          cardBg: "from-emerald-50 to-teal-50 border-emerald-200",
          textColor: "text-emerald-800",
          iconColor: "text-emerald-500",
        }
      case "golden":
        return {
          cardBg: "from-amber-50 to-yellow-50 border-amber-200",
          textColor: "text-amber-800",
          iconColor: "text-amber-500",
        }
      case "eternal":
        return {
          cardBg: "from-red-50 to-rose-50 border-red-200",
          textColor: "text-red-800",
          iconColor: "text-red-500",
        }
      default:
        return {
          cardBg: "from-rose-50 to-purple-50 border-rose-200",
          textColor: "text-rose-800",
          iconColor: "text-rose-500",
        }
    }
  }

  const themeStyles = getThemeStyles()

  // Staggered animation for content elements
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  return (
    <motion.div className="mt-8" variants={contentVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants} className="flex justify-center space-x-4 mb-8">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 10, 0, -10, 0],
              scale: [1, 1.2, 1],
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
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <IconCard icon={<Cake className="w-6 h-6" />} text="Make a Wish" theme={theme} />
        <IconCard icon={<Gift className="w-6 h-6" />} text="Lots of Gifts" theme={theme} />
        <IconCard icon={<Heart className="w-6 h-6" />} text="Endless Love" theme={theme} />
        <IconCard icon={<Infinity className="w-6 h-6" />} text="Forever Together" theme={theme} />
      </motion.div>

      <motion.div variants={itemVariants} className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8 shadow-xl">
        <Image src="/placeholder.svg?height=400&width=800" alt="Birthday Celebration" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-6">
          <p className="text-white text-xl font-medium">Celebrating You Today & Always</p>
        </div>
      </motion.div>

      <motion.p
        variants={itemVariants}
        className={`text-2xl md:text-3xl font-bold ${
          theme === "cosmic"
            ? "text-white"
            : "text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600"
        } mb-4`}
      >
        I Love You, Aakrity! ❤️
      </motion.p>

      <motion.p
        variants={itemVariants}
        className={theme === "cosmic" ? "text-lg text-indigo-300 italic" : "text-lg text-gray-600 italic"}
      >
        Here's to forever together!
      </motion.p>

      <motion.div variants={itemVariants} className="mt-6 text-center">
        <p className={`text-xl font-bold ${theme === "cosmic" ? "text-pink-300" : "text-pink-600"}`}>Forever yours,</p>
        <p className={`text-2xl font-bold ${theme === "cosmic" ? "text-indigo-200" : "text-purple-700"}`}>{from} ❤️</p>
      </motion.div>
    </motion.div>
  )
}

function IconCard({ icon, text, theme }: { icon: React.ReactNode; text: string; theme?: string }) {
  // Get theme-specific styles
  const getThemeStyles = () => {
    switch (theme) {
      case "cosmic":
        return "bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-indigo-500/50 text-indigo-200"
      case "nature":
        return "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 text-emerald-700"
      case "golden":
        return "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200 text-amber-700"
      case "eternal":
        return "bg-gradient-to-r from-red-50 to-rose-50 border-red-200 text-red-700"
      default:
        return "bg-gradient-to-r from-rose-50 to-purple-50 border-rose-200 text-rose-700"
    }
  }

  const themeClass = getThemeStyles()

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 3 }}
      whileTap={{ scale: 0.95 }}
      className={`flex flex-col items-center gap-2 ${themeClass} p-4 rounded-xl border shadow-md`}
    >
      <motion.span
        className={theme === "cosmic" ? "text-indigo-300" : "text-rose-500"}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, 0, -10, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 3,
          delay: Math.random() * 2,
        }}
      >
        {icon}
      </motion.span>
      <span className="font-medium text-sm md:text-base">{text}</span>
    </motion.div>
  )
}
