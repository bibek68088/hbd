import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"
import { Cake, Heart, Star, Camera, PartyPopper, Gift, Calendar, Infinity } from "lucide-react"
import Fireworks from "@/components/fireworks"
import GiftBox from "@/components/gift-box"
import Sparkles from "@/components/sparkles"
import ButterfliesEffect from "@/components/butterflies"
import StarsEffect from "@/components/stars"
import InfinitySymbol from "@/components/infinity-symbol"
import FancyButton from "@/components/fancy-button"
import ParticleBackground from "@/components/particle-background"
import PhotoGallery from "@/components/photo-gallery"
import { useInView } from "react-intersection-observer"

export default function FinalCelebration({ name, from }: { name: string; from: string }) {
  const [activeTab, setActiveTab] = useState("wishes")
  const [showFireworks, setShowFireworks] = useState(true)
  const [showConfetti, setShowConfetti] = useState(true)
  const [showGift, setShowGift] = useState(false)
  const [activeEffect, setActiveEffect] = useState<string>("sparkles")
  const [tabTransition, setTabTransition] = useState("fade")
  const { width, height } = useWindowSize()
  const audioRef = useRef<HTMLAudioElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6])
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  useEffect(() => {
    // Cycle through fireworks and confetti
    const interval = setInterval(() => {
      setShowFireworks((prev) => !prev)
    }, 8000)

    // Cycle through background effects
    const effectsInterval = setInterval(() => {
      const effects = ["sparkles", "butterflies", "stars", "infinity"]
      setActiveEffect(effects[Math.floor(Math.random() * effects.length)])
    }, 15000)

    return () => {
      clearInterval(interval)
      clearInterval(effectsInterval)
    }
  }, [])

  const wishes = [
    "May your day be as bright as your smile and as lovely as you are, Aakrity.",
    "Wishing you a day filled with happiness and a year filled with joy. You deserve it all!",
    "Hope your special day brings you all that your heart desires! I'm so lucky to have you.",
    "Here's to another year of laughing together, crying together, and growing together. I cherish every moment.",
    "May the joy that you have spread in the past come back to you on this day. Happy Birthday!",
    "Wishing you a beautiful day with good health and happiness forever. I love you more than words can say.",
    "Count your life by smiles, not tears. Count your age by friends, not years. I'll always be here for you.",
    "May this special day bring you endless joy and tons of precious memories! You mean everything to me.",
  ]

  const memories = [
    { title: "Our First Date", description: "Remember that magical evening when we first went out together?" },
    { title: "Beach Sunset", description: "Watching the sunset together at the beach was unforgettable." },
    { title: "Movie Night", description: "Our cozy movie nights with popcorn and blankets are my favorite." },
    { title: "Surprise Dinner", description: "When I surprised you with dinner at your favorite restaurant." },
    { title: "Road Trip", description: "That spontaneous road trip where we got lost but had the best time." },
    { title: "Stargazing", description: "Looking at the stars and making wishes for our future together." },
  ]

  const quotes = [
    "In your smile, I see something more beautiful than the stars.",
    "Every moment with you is like a dream I never want to wake up from.",
    "You're not just my love, you're my best friend and my whole world.",
    "My favorite place in the world is next to you.",
    "You make every day worth living and every moment worth remembering.",
    "Forever isn't long enough when I'm with you.",
    "Some people search their whole lives to find what I found in you.",
    "I fell in love with you because you loved me when I couldn't love myself.",
  ]

  // Render current background effect
  const renderEffect = () => {
    switch (activeEffect) {
      case "butterflies":
        return <ButterfliesEffect />
      case "stars":
        return <StarsEffect />
      case "infinity":
        return <InfinitySymbol />
      default:
        return <Sparkles />
    }
  }

  // Tab button variants for animation
  const tabVariants = {
    inactive: { scale: 1 },
    active: {
      scale: 1.05,
      boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
      },
    },
    tap: { scale: 0.95 },
  }

  // Handle tab change with transition effect
  const handleTabChange = (tab: string) => {
    // Choose a random transition effect
    const transitions = ["fade", "slide", "zoom", "flip", "rotate", "morph"]
    setTabTransition(transitions[Math.floor(Math.random() * transitions.length)])

    setActiveTab(tab)

    if (tab === "gift") setShowGift(true)
    if (tab === "forever") {
      setShowFireworks(true)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000)
    }
  }

  // Create refs for each section to check if they're in view
  const [wishesRef, wishesInView] = useInView({ threshold: 0.1, triggerOnce: false })
  const [memoriesRef, memoriesInView] = useInView({ threshold: 0.1, triggerOnce: false })
  const [messageRef, messageInView] = useInView({ threshold: 0.1, triggerOnce: false })

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-200 py-12 px-4 relative overflow-hidden"
    >
      {/* Background audio */}
      <audio ref={audioRef} autoPlay loop>
        <source src="/birthday-music.mp3" type="audio/mp3" />
      </audio>

      {/* Background effects */}
      {renderEffect()}
      <ParticleBackground theme="grand" />

      {/* Animated background elements with parallax effect */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          opacity: backgroundOpacity,
          scale: backgroundScale,
        }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              rotate: [0, 180],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0, -5, 0],
              filter: [
                "drop-shadow(0 0 0px rgba(236, 72, 153, 0))",
                "drop-shadow(0 0 10px rgba(236, 72, 153, 0.7))",
                "drop-shadow(0 0 0px rgba(236, 72, 153, 0))",
              ],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 5,
            }}
            className="inline-block mb-6"
          >
            <Cake className="w-24 h-24 text-pink-500 mx-auto" />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            Happy Birthday {name}!
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-purple-700 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Today is all about celebrating the amazing person you are and how much you mean to me!
          </motion.p>

          <motion.div
            className="mt-4 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
                delay: 1,
              }}
            >
              <Infinity className="w-8 h-8 text-pink-500 mx-2" />
            </motion.div>
            <p className="text-lg text-purple-600">Forever yours, {from}</p>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, -5, 0, 5, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
                delay: 1.5,
              }}
            >
              <Infinity className="w-8 h-8 text-pink-500 mx-2" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Navigation tabs - now with smooth scroll snap */}
        <div className="flex justify-center mb-8 gap-2 flex-wrap sticky top-4 z-30 py-2 px-4 backdrop-blur-md bg-white/30 rounded-full shadow-lg">
          {["wishes", "gallery", "memories", "message", "gift", "forever"].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => handleTabChange(tab)}
              variants={tabVariants}
              initial="inactive"
              animate={activeTab === tab ? "active" : "inactive"}
              whileTap="tap"
              whileHover={{ scale: 1.05 }}
              className={`px-6 py-3 rounded-full text-lg font-medium transition-all ${
                activeTab === tab
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-white/50 text-purple-700 hover:bg-white/80"
              }`}
            >
              <motion.span
                animate={
                  activeTab === tab
                    ? {
                        textShadow: [
                          "0px 0px 0px rgba(255,255,255,0)",
                          "0px 0px 5px rgba(255,255,255,0.5)",
                          "0px 0px 0px rgba(255,255,255,0)",
                        ],
                      }
                    : {}
                }
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.span>
            </motion.button>
          ))}
        </div>

        {/* Content area with smooth transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 overflow-hidden"
          >
            {activeTab === "wishes" && (
              <div ref={wishesRef}>
                <motion.h2
                  className="text-3xl font-bold text-purple-700 mb-8 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  Birthday Wishes For You
                </motion.h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {wishes.map((wish, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={wishesInView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                      }}
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.2)",
                        background: "linear-gradient(to right, rgba(243, 232, 255, 1), rgba(254, 215, 243, 1))",
                      }}
                      className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-pink-100 shadow-sm transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <motion.div
                          className="bg-gradient-to-r from-purple-200 to-pink-200 p-3 rounded-full"
                          animate={{
                            rotate: [0, 10, 0, -10, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 3,
                            delay: index * 0.2,
                          }}
                        >
                          <Star className="w-6 h-6 text-purple-500" />
                        </motion.div>
                        <p className="text-lg text-purple-800 italic">{wish}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "gallery" && (
              <div className="overflow-visible">
                <motion.h2
                  className="text-3xl font-bold text-purple-700 mb-8 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  Our Photo Gallery
                </motion.h2>

                {/* Using our enhanced PhotoGallery component */}
                <div className="relative -mx-4 md:-mx-12 mt-4 mb-8">
                  <PhotoGallery />
                </div>

                <div className="mt-12 text-center">
                  <motion.p
                    className="text-lg text-purple-700 italic mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Every picture tells a story of our love...
                  </motion.p>
                  <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <FancyButton
                      onClick={() => setShowFireworks(true)}
                      theme="grand"
                      label="View More Photos"
                      icon={<Camera className="ml-2 h-5 w-5" />}
                    />
                  </motion.div>
                </div>
              </div>
            )}

            {activeTab === "memories" && (
              <div ref={memoriesRef}>
                <motion.h2
                  className="text-3xl font-bold text-purple-700 mb-8 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  Our Special Memories
                </motion.h2>
                <div className="space-y-6">
                  {memories.map((memory, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={memoriesInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                      }}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.2)",
                        x: 5,
                      }}
                      className="flex items-center gap-6 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-pink-100 shadow-sm transition-all duration-300"
                    >
                      <motion.div
                        className="bg-gradient-to-r from-purple-200 to-pink-200 p-4 rounded-full shrink-0"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, 0, -5, 0],
                        }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 3,
                          delay: index * 0.2,
                        }}
                      >
                        <Heart className="w-8 h-8 text-pink-500" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-purple-700">{memory.title}</h3>
                        <p className="text-purple-600">{memory.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <motion.p
                    className="text-lg text-purple-700 italic mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    And many more memories to come...
                  </motion.p>
                  <motion.div
                    className="flex justify-center mt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <FancyButton
                      onClick={() => {
                        setShowFireworks(true)
                        setShowConfetti(true)
                        setTimeout(() => setShowConfetti(false), 5000)
                      }}
                      theme="nature"
                      label="Let's Make More Memories"
                      icon={<Calendar className="ml-2 h-5 w-5" />}
                    />
                  </motion.div>
                </div>
              </div>
            )}

            {activeTab === "message" && (
              <div className="text-center max-w-2xl mx-auto" ref={messageRef}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="mb-8"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      filter: [
                        "drop-shadow(0 0 0px rgba(236, 72, 153, 0))",
                        "drop-shadow(0 0 10px rgba(236, 72, 153, 0.7))",
                        "drop-shadow(0 0 0px rgba(236, 72, 153, 0))",
                      ],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 3,
                    }}
                  >
                    <Heart className="w-20 h-20 text-pink-500 fill-pink-500 mx-auto mb-4" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-purple-700 mb-4">A Special Message For You</h2>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: messageInView ? 1 : 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <motion.p
                    className="text-xl text-purple-700 mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={messageInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                  >
                    My Dearest {name},
                  </motion.p>
                  <motion.p
                    className="text-lg text-purple-600 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={messageInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                  >
                    On your special day, I want you to know how much you mean to me. Your smile, your kindness, and your
                    love make every day brighter and every moment more meaningful.
                  </motion.p>
                  <motion.p
                    className="text-lg text-purple-600 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={messageInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                  >
                    Thank you for being the amazing person you are. I'm so grateful to have you in my life and to
                    celebrate another year of your beautiful journey.
                  </motion.p>
                  <motion.p
                    className="text-lg text-purple-600 mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={messageInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 }}
                  >
                    May this year bring you all the happiness, success, and love you deserve. I promise to be by your
                    side through it all.
                  </motion.p>

                  <motion.div
                    className="my-8 py-6 border-y border-pink-200"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={messageInView ? { opacity: 1, scaleX: 1 } : {}}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <motion.p
                      className="text-xl text-pink-600 italic mb-2"
                      initial={{ opacity: 0 }}
                      animate={messageInView ? { opacity: 1 } : {}}
                      transition={{ delay: 1 }}
                    >
                      "{quotes[Math.floor(Math.random() * quotes.length)]}"
                    </motion.p>
                  </motion.div>

                  <motion.p
                    className="text-xl font-bold text-pink-600 mb-2"
                    initial={{ opacity: 0 }}
                    animate={messageInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.2 }}
                  >
                    Forever yours,
                  </motion.p>
                  <motion.p
                    className="text-2xl font-bold text-purple-700"
                    initial={{ opacity: 0 }}
                    animate={messageInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.3 }}
                  >
                    {from} ❤️
                  </motion.p>
                </motion.div>
              </div>
            )}

            {activeTab === "gift" && (
              <div className="text-center">
                <motion.h2
                  className="text-3xl font-bold text-purple-700 mb-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  A Special Gift For You
                </motion.h2>

                {showGift ? (
                  <GiftBox />
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer mx-auto"
                    onClick={() => setShowGift(true)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 0.5,
                      y: {
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 2,
                      },
                    }}
                  >
                    <motion.div
                      animate={{
                        filter: [
                          "drop-shadow(0 0 0px rgba(236, 72, 153, 0))",
                          "drop-shadow(0 0 20px rgba(236, 72, 153, 0.7))",
                          "drop-shadow(0 0 0px rgba(236, 72, 153, 0))",
                        ],
                      }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 3,
                      }}
                    >
                      <Gift className="w-32 h-32 text-pink-500 mx-auto" />
                    </motion.div>
                    <motion.p
                      className="text-lg text-purple-600 mt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Click to open your gift!
                    </motion.p>
                  </motion.div>
                )}
              </div>
            )}

            {activeTab === "forever" && (
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="mb-8 relative"
                >
                  <motion.div
                    animate={{
                      filter: [
                        "drop-shadow(0 0 0px rgba(236, 72, 153, 0))",
                        "drop-shadow(0 0 20px rgba(236, 72, 153, 0.7))",
                        "drop-shadow(0 0 0px rgba(236, 72, 153, 0))",
                      ],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 3,
                    }}
                  >
                    <Infinity className="w-24 h-24 text-pink-500 mx-auto" />
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 3,
                    }}
                  >
                    <Infinity className="w-32 h-32 text-purple-300 mx-auto" />
                  </motion.div>
                </motion.div>

                <motion.h2
                  className="text-3xl font-bold text-purple-700 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Forever & Always
                </motion.h2>

                <motion.div
                  className="max-w-2xl mx-auto bg-gradient-to-r from-pink-50 to-purple-50 p-8 rounded-xl border border-pink-200 shadow-lg mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{
                    boxShadow: "0 20px 25px -5px rgba(168, 85, 247, 0.3)",
                    y: -5,
                  }}
                >
                  <motion.p
                    className="text-xl text-purple-700 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    My promise to you, {name}, is that my love will last forever.
                  </motion.p>
                  <motion.p
                    className="text-lg text-purple-600 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    Through every sunrise and sunset, through every joy and challenge, my heart belongs to you.
                  </motion.p>
                  <motion.p
                    className="text-lg text-purple-600 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                  >
                    Time may pass, seasons may change, but my love for you will remain constant and true.
                  </motion.p>
                  <motion.p
                    className="text-lg text-purple-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                  >
                    Today on your birthday, I celebrate not just the day you were born, but every moment since that has
                    led you to me.
                  </motion.p>
                </motion.div>

                <motion.div
                  className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  {["Past", "Present", "Future"].map((time, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.1, rotate: 5, zIndex: 10 }}
                      className="bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded-xl border border-pink-200 shadow-md"
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 1.5 + i * 0.2 }}
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
                        <Heart className="w-12 h-12 text-pink-500 fill-pink-500 mx-auto mb-2" />
                      </motion.div>
                      <p className="font-medium text-purple-700">{time}</p>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.p
                  className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  I Love You Today, Tomorrow, and Always
                </motion.p>

                <motion.div
                  className="mt-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2 }}
                >
                  <p className="text-xl font-bold text-pink-600">Forever yours,</p>
                  <p className="text-2xl font-bold text-purple-700">{from} ❤️</p>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Birthday countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <FancyButton
            onClick={() => {
              setShowFireworks(true)
              setShowConfetti(true)
              setTimeout(() => setShowConfetti(false), 5000)
            }}
            theme="grand"
            label="Celebrate Again!"
            icon={<PartyPopper className="ml-2 h-6 w-6" />}
            size="large"
            glow={true}
          />
        </motion.div>
      </div>

      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />}
      {showFireworks && <Fireworks />}
    </div>
  )
}
