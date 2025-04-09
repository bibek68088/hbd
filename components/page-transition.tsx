"use client"

import type React from "react"

import { motion } from "framer-motion"

interface PageTransitionProps {
  children: React.ReactNode
  type?: "fade" | "slide" | "zoom" | "flip" | "rotate" | "morph"
  direction?: number // -1 for backward, 1 for forward
}

export default function PageTransition({ children, type = "fade", direction = 1 }: PageTransitionProps) {
  // Define different transition variants
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.5 },
    },
    slide: {
      initial: { x: direction * 100, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: direction * -100, opacity: 0 },
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    zoom: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 1.2, opacity: 0 },
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    flip: {
      initial: { rotateY: direction * 90, opacity: 0 },
      animate: { rotateY: 0, opacity: 1 },
      exit: { rotateY: direction * -90, opacity: 0 },
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    rotate: {
      initial: { rotate: direction * 15, opacity: 0, scale: 0.9 },
      animate: { rotate: 0, opacity: 1, scale: 1 },
      exit: { rotate: direction * -15, opacity: 0, scale: 0.9 },
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    morph: {
      initial: {
        borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
        scale: 0.8,
        opacity: 0,
      },
      animate: {
        borderRadius: "0% 0% 0% 0% / 0% 0% 0% 0%",
        scale: 1,
        opacity: 1,
      },
      exit: {
        borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%",
        scale: 0.8,
        opacity: 0,
      },
      transition: { duration: 0.7 },
    },
  }

  // Select the appropriate variant
  const selectedVariant = variants[type]

  return (
    <motion.div
      initial={selectedVariant.initial}
      animate={selectedVariant.animate}
      exit={selectedVariant.exit}
      transition={selectedVariant.transition}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  )
}
