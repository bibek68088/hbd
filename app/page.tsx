"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"
import Loader from "@/components/loader"
import BirthdayMessage from "@/components/birthday-message"
import Sparkles from "@/components/sparkles"
import FloatingHearts from "@/components/floating-hearts"
import Fireworks from "@/components/fireworks"
import Balloons from "@/components/balloons"
import FinalCelebration from "@/components/final-celebration"
import { ChevronRight } from "lucide-react"
import useSound from "use-sound"
import ButterfliesEffect from "@/components/butterflies"
import StarsEffect from "@/components/stars"
import InfinitySymbol from "@/components/infinity-symbol"
import FancyButton from "@/components/fancy-button"
import PageTransition from "@/components/page-transition"
import ParticleBackground from "@/components/particle-background"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [direction, setDirection] = useState(0) // -1 for backward, 1 for forward
  const [transitionType, setTransitionType] = useState("fade")
  const { width, height } = useWindowSize()
  const audioRef = useRef<HTMLAudioElement>(null)

  // Sound effects
  const [playPop] = useSound("/pop.mp3", { volume: 0.5 })
  const [playSuccess] = useSound("/success.mp3", { volume: 0.5 })
  const [playMagic] = useSound("/magic.mp3", { volume: 0.5 })
  const [playChime] = useSound("/chime.mp3", { volume: 0.5 })
  const [playWhoosh] = useSound("/whoosh.mp3", { volume: 0.4 })
  const [playTwinkle] = useSound("/twinkle.mp3", { volume: 0.4 })

  const messages = [
    {
      title: "Hey Aakrity!",
      message: "Today is your special day, and I wanted to make it unforgettable for you! 🎂",
      emoji: "🎉",
      animation: "fadeUp",
      bgColor: "from-rose-400 to-pink-500",
      effect: "sparkle",
      theme: "celebration",
      transition: "fade",
    },
    {
      title: "You're My Everything",
      message:
        "Your smile, your laugh, your presence in my life makes everything better. You deserve the world and more.",
      emoji: "✨",
      animation: "slideIn",
      bgColor: "from-purple-400 to-indigo-500",
      effect: "hearts",
      theme: "cosmic",
      transition: "slide",
    },
    {
      title: "Our Journey Together",
      message:
        "Every moment with you is precious - from our first meeting to today. Each memory we've created together is a treasure I hold close.",
      emoji: "💫",
      animation: "scale",
      bgColor: "from-blue-400 to-cyan-500",
      effect: "butterflies",
      theme: "nature",
      transition: "flip",
    },
    {
      title: "You Light Up My World",
      message:
        "Your kindness, your strength, and your beautiful soul inspire me every day. You make me want to be a better person.",
      emoji: "🌟",
      animation: "rotate",
      bgColor: "from-amber-400 to-yellow-500",
      effect: "stars",
      theme: "golden",
      transition: "zoom",
    },
    {
      title: "Forever & Always",
      message:
        "Some things are meant to last forever - like my feelings for you. Today, tomorrow, and for all the days to come.",
      emoji: "∞",
      animation: "bounce",
      bgColor: "from-red-400 to-rose-500",
      effect: "infinity",
      theme: "eternal",
      transition: "rotate",
    },
    {
      title: "Happy Birthday Aakrity!",
      message:
        "May this year bring you endless joy, success, and all the love your heart can hold. I'm so blessed to be part of your journey.",
      emoji: "🎁",
      animation: "pulse",
      bgColor: "from-fuchsia-400 to-pink-500",
      effect: "fireworks",
      theme: "grand",
      transition: "morph",
      final: true,
    },
  ]

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
      // Start background music when loaded
      if (audioRef.current) {
        audioRef.current.volume = 0.3
        audioRef.current.play().catch((e) => console.log("Audio autoplay prevented:", e))
      }
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleNext = () => {
    if (currentStep < messages.length - 1) {
      // Set direction for animation
      setDirection(1)

      // Set transition type based on the next message
      setTransitionType(messages[currentStep + 1].transition || "fade")

      // Play different sound effects for different steps
      if (currentStep === 0) {
        playPop()
        playWhoosh()
      } else if (currentStep === 2) {
        playMagic()
        playWhoosh()
      } else if (currentStep === 4) {
        playChime()
        setTimeout(() => playSuccess(), 500)
      } else {
        playTwinkle()
        playWhoosh()
      }

      setCurrentStep(currentStep + 1)

      // Show special effects based on the next message
      if (messages[currentStep + 1].effect === "fireworks") {
        setShowFireworks(true)
        setTimeout(() => setShowFireworks(false), 5000)
      }

      if (currentStep === messages.length - 2) {
        setShowConfetti(true)
        setTimeout(() => {
          setCompleted(true)
          setShowConfetti(false)
        }, 8000)
      }
    }
  }

  // Get current theme based on message
  const currentTheme = messages[currentStep].theme

  // Define theme-specific background styles
  const getThemeBackground = () => {
    switch (currentTheme) {
      case "celebration":
        return "bg-gradient-to-b from-rose-100 to-purple-200"
      case "cosmic":
        return "bg-gradient-to-b from-indigo-900 to-purple-700"
      case "nature":
        return "bg-gradient-to-b from-emerald-100 to-teal-200"
      case "golden":
        return "bg-gradient-to-b from-amber-100 to-yellow-200"
      case "eternal":
        return "bg-gradient-to-b from-pink-100 to-red-200"
      case "grand":
        return "bg-gradient-to-b from-fuchsia-100 to-pink-200"
      default:
        return "bg-gradient-to-b from-rose-100 to-purple-200"
    }
  }

  // Get current effect component
  const getCurrentEffect = () => {
    switch (messages[currentStep].effect) {
      case "hearts":
        return <FloatingHearts />
      case "sparkle":
        return <Sparkles />
      case "butterflies":
        return <ButterfliesEffect />
      case "stars":
        return <StarsEffect />
      case "infinity":
        return <InfinitySymbol />
      case "balloons":
        return <Balloons />
      default:
        return <Sparkles />
    }
  }

  // Get button style based on current theme
  const getButtonStyle = () => {
    switch (currentTheme) {
      case "cosmic":
        return {
          from: "from-violet-500",
          to: "to-indigo-600",
          hoverFrom: "hover:from-violet-600",
          hoverTo: "hover:to-indigo-700",
          shadow: "shadow-indigo-500/50",
          text: "text-white",
          icon: "text-indigo-200",
        }
      case "nature":
        return {
          from: "from-emerald-500",
          to: "to-teal-600",
          hoverFrom: "hover:from-emerald-600",
          hoverTo: "hover:to-teal-700",
          shadow: "shadow-emerald-500/50",
          text: "text-white",
          icon: "text-emerald-200",
        }
      case "golden":
        return {
          from: "from-amber-500",
          to: "to-yellow-600",
          hoverFrom: "hover:from-amber-600",
          hoverTo: "hover:to-yellow-700",
          shadow: "shadow-amber-500/50",
          text: "text-white",
          icon: "text-amber-200",
        }
      case "eternal":
        return {
          from: "from-red-500",
          to: "to-rose-600",
          hoverFrom: "hover:from-red-600",
          hoverTo: "hover:to-rose-700",
          shadow: "shadow-rose-500/50",
          text: "text-white",
          icon: "text-rose-200",
        }
      case "grand":
        return {
          from: "from-fuchsia-500",
          to: "to-pink-600",
          hoverFrom: "hover:from-fuchsia-600",
          hoverTo: "hover:to-pink-700",
          shadow: "shadow-pink-500/50",
          text: "text-white",
          icon: "text-pink-200",
        }
      default:
        return {
          from: "from-rose-500",
          to: "to-pink-600",
          hoverFrom: "hover:from-rose-600",
          hoverTo: "hover:to-pink-700",
          shadow: "shadow-rose-500/50",
          text: "text-white",
          icon: "text-rose-200",
        }
    }
  }

  const buttonStyle = getButtonStyle()

  return (
    <main className={`min-h-screen ${getThemeBackground()} relative overflow-hidden transition-colors duration-1000`}>
      {/* Background audio */}
      <audio ref={audioRef} loop>
        <source src="/birthday-music.mp3" type="audio/mp3" />
      </audio>

      {/* Particle background */}
      <ParticleBackground theme={currentTheme} />

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50">
            <Loader name="Aakrity" from="Bibek" />
          </motion.div>
        ) : completed ? (
          <PageTransition key="final" type="morph">
            <FinalCelebration name="Aakrity" from="Bibek" />
          </PageTransition>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto px-4 py-12 relative z-10 min-h-screen flex flex-col items-center justify-center"
          >
            {getCurrentEffect()}

            <PageTransition key={currentStep} type={transitionType} direction={direction}>
              <div className="w-full max-w-2xl">
                <BirthdayMessage
                  title={messages[currentStep].title}
                  message={messages[currentStep].message}
                  emoji={messages[currentStep].emoji}
                  animation={messages[currentStep].animation}
                  bgColor={messages[currentStep].bgColor}
                  isFinal={messages[currentStep].final}
                  from="Bibek"
                  theme={messages[currentStep].theme}
                  hideSignature={currentStep < messages.length - 1}
                />

                {!messages[currentStep].final && (
                  <motion.div
                    className="flex justify-center mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <FancyButton
                      onClick={handleNext}
                      theme={currentTheme}
                      label="Continue"
                      icon={<ChevronRight className={`ml-2 h-5 w-5 ${buttonStyle.icon}`} />}
                    />
                  </motion.div>
                )}

                {messages[currentStep].final && (
                  <motion.div
                    className="flex justify-center mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <FancyButton
                      onClick={() => setCompleted(true)}
                      theme="grand"
                      label="See Your Surprise!"
                      size="large"
                      glow={true}
                    />
                  </motion.div>
                )}
              </div>
            </PageTransition>
          </motion.div>
        )}
      </AnimatePresence>

      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />}
      {showFireworks && <Fireworks />}
    </main>
  )
}
