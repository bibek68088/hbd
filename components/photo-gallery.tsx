import { useState, useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { useWindowSize } from "react-use"

interface Photo {
  id: number
  src: string
  alt: string
  width: number
  height: number
  rotation: number
  delay: number
  zIndex: number
  position: {
    x: number
    y: number
  }
  frameColor: string
  frameStyle: number
}

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const { width: windowWidth } = useWindowSize()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  useEffect(() => {
    // Generate random photos with different sizes, rotations, and positions
    const generatePhotos = () => {
      const newPhotos: Photo[] = []
      const containerWidth = containerRef.current?.offsetWidth || 1000
      const containerHeight = containerRef.current?.offsetHeight || 800

      // Frame colors and styles
      const frameColors = [
        "from-amber-100 to-amber-200", // Wooden
        "from-gray-100 to-gray-200", // Silver
        "from-yellow-100 to-yellow-200", // Gold
        "from-white to-gray-50", // White
        "from-rose-100 to-pink-100", // Pink
      ]

      // Create a grid of positions but with randomness
      const cols = windowWidth < 768 ? 2 : 3
      const rows = 4
      const cellWidth = containerWidth / cols
      const cellHeight = containerHeight / rows

      for (let i = 0; i < 12; i++) {
        // Calculate base position in grid
        const col = i % cols
        const row = Math.floor(i / cols)

        // Add randomness to position within cell
        const baseX = col * cellWidth
        const baseY = row * cellHeight
        const randomX = baseX + (Math.random() * 0.5 + 0.25) * cellWidth
        const randomY = baseY + (Math.random() * 0.5 + 0.25) * cellHeight

        // Randomize photo dimensions for variety
        const isPortrait = Math.random() > 0.5
        const width = isPortrait ? 300 : 400
        const height = isPortrait ? 400 : 300

        // Random frame style (0-2)
        const frameStyle = Math.floor(Math.random() * 3)

        newPhotos.push({
          id: i,
          src: `/placeholder.svg?height=${height}&width=${width}&text=Memory ${i + 1}`,
          alt: `Memory ${i + 1}`,
          width,
          height,
          rotation: Math.random() * 24 - 12, // -12 to 12 degrees
          delay: i * 0.1,
          zIndex: Math.floor(Math.random() * 10),
          position: {
            x: randomX,
            y: randomY,
          },
          frameColor: frameColors[Math.floor(Math.random() * frameColors.length)],
          frameStyle,
        })
      }

      setPhotos(newPhotos)
    }

    // Wait for container to be available
    if (containerRef.current) {
      generatePhotos()
    }

    // Regenerate on window resize
    window.addEventListener("resize", generatePhotos)
    return () => window.removeEventListener("resize", generatePhotos)
  }, [windowWidth])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const photoVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: (photo: Photo) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: photo.rotation,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: photo.delay,
      },
    }),
  }

  // Render a realistic pin
  const Pin = ({ color = "red" }: { color?: string }) => (
    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20 w-6 h-6">
      {/* Pin head */}
      <div
        className={`w-6 h-6 rounded-full bg-gradient-to-br ${
          color === "red"
            ? "from-red-500 to-red-700"
            : color === "blue"
              ? "from-blue-500 to-blue-700"
              : color === "green"
                ? "from-green-500 to-green-700"
                : "from-yellow-500 to-yellow-700"
        } shadow-lg`}
        style={{
          boxShadow:
            "0 2px 4px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.2), inset 0 2px 2px rgba(255,255,255,0.3)",
        }}
      >
        {/* Pin highlight */}
        <div className="absolute top-1 left-1 w-2 h-2 bg-white/40 rounded-full"></div>
      </div>

      {/* Pin shadow on photo */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-black/20 rounded-full blur-sm"></div>
    </div>
  )

  // Render a decorative tape piece
  const TapePiece = ({ rotation = 0, position = "top-left" }: { rotation?: number; position: string }) => {
    let positionClass = ""

    switch (position) {
      case "top-left":
        positionClass = "top-2 left-2 rotate-[-20deg]"
        break
      case "top-right":
        positionClass = "top-2 right-2 rotate-[20deg]"
        break
      case "bottom-left":
        positionClass = "bottom-2 left-2 rotate-[20deg]"
        break
      case "bottom-right":
        positionClass = "bottom-2 right-2 rotate-[-20deg]"
        break
    }

    return (
      <div
        className={`absolute w-12 h-5 bg-gradient-to-r from-yellow-100/90 to-yellow-200/90 ${positionClass}`}
        style={{
          transform: `rotate(${rotation}deg)`,
          boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
        }}
      ></div>
    )
  }

  // Render a photo frame
  const PhotoFrame = ({ photo }: { photo: Photo }) => {
    // Different frame styles
    const getFrameStyle = () => {
      switch (photo.frameStyle) {
        case 0: // Simple frame
          return (
            <div className={`p-3 bg-gradient-to-br ${photo.frameColor} rounded-sm shadow-lg`}>
              <div className="relative w-full h-full overflow-hidden border-2 border-white">
                <Image
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 40vw"
                />

                {/* Photo caption */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                >
                  {photo.alt}
                </motion.div>
              </div>
            </div>
          )

        case 1: // Polaroid style
          return (
            <div className="bg-white p-3 pb-12 shadow-lg">
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 40vw"
                />
              </div>
              <p className="absolute bottom-3 left-0 right-0 text-center text-sm font-handwriting text-gray-700">
                {photo.alt}
              </p>
            </div>
          )

        case 2: // Fancy frame
          return (
            <div
              className={`p-4 bg-gradient-to-br ${photo.frameColor} rounded-sm shadow-lg border border-white/50`}
              style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15), inset 0 0 2px rgba(255,255,255,0.5)" }}
            >
              <div className="relative w-full h-full overflow-hidden border-2 border-white/80">
                <Image
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 40vw"
                />

                {/* Photo caption */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                >
                  {photo.alt}
                </motion.div>
              </div>
            </div>
          )

        default:
          return null
      }
    }

    return getFrameStyle()
  }

  return (
    <motion.div
      ref={ref}
      className="relative w-full min-h-[600px] md:min-h-[800px] overflow-hidden py-8 px-4"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {/* Cork board background */}
      <div
        ref={containerRef}
        className="absolute inset-0 bg-gradient-to-br from-amber-200 to-amber-300 rounded-xl shadow-inner"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d97706' fillOpacity='0.1' fillRule='evenodd'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='30' cy='10' r='1'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='70' cy='10' r='1'/%3E%3Ccircle cx='90' cy='10' r='1'/%3E%3Ccircle cx='10' cy='30' r='1'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3Ccircle cx='50' cy='30' r='1'/%3E%3Ccircle cx='70' cy='30' r='1'/%3E%3Ccircle cx='90' cy='30' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3Ccircle cx='30' cy='50' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3Ccircle cx='70' cy='50' r='1'/%3E%3Ccircle cx='90' cy='50' r='1'/%3E%3Ccircle cx='10' cy='70' r='1'/%3E%3Ccircle cx='30' cy='70' r='1'/%3E%3Ccircle cx='50' cy='70' r='1'/%3E%3Ccircle cx='70' cy='70' r='1'/%3E%3Ccircle cx='90' cy='70' r='1'/%3E%3Ccircle cx='10' cy='90' r='1'/%3E%3Ccircle cx='30' cy='90' r='1'/%3E%3Ccircle cx='50' cy='90' r='1'/%3E%3Ccircle cx='70' cy='90' r='1'/%3E%3Ccircle cx='90' cy='90' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          boxShadow: "inset 0 0 20px rgba(0,0,0,0.2)",
        }}
      />

      {/* Photos */}
      {photos.map((photo) => (
        <motion.div
          key={photo.id}
          custom={photo}
          variants={photoVariants}
          className="absolute"
          style={{
            left: `${photo.position.x}px`,
            top: `${photo.position.y}px`,
            zIndex: photo.zIndex + 10,
            width: `${photo.width / 4}px`,
            height: `${photo.height / 4}px`,
            transformOrigin: "center center",
          }}
          whileHover={{
            scale: 1.15,
            rotate: 0,
            zIndex: 30,
            transition: { type: "spring", stiffness: 300, damping: 15 },
          }}
        >
          {/* Pin with random color */}
          <Pin color={["red", "blue", "green", "yellow"][Math.floor(Math.random() * 4)]} />

          {/* Photo with frame */}
          <PhotoFrame photo={photo} />

          {/* Decorative tape pieces - only on some photos */}
          {photo.id % 3 === 0 && (
            <>
              <TapePiece position="top-left" />
              <TapePiece position="bottom-right" />
            </>
          )}

          {photo.id % 4 === 0 && <TapePiece position="top-right" />}
        </motion.div>
      ))}

      {/* Decorative elements */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`deco-${i}`}
          className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-pink-300 to-purple-300"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
            opacity: 0.6,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3 + i,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  )
}
