"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Butterfly = {
  id: number;
  size: number;
  color: string;
  style: {
    top: string;
    left: string;
    zIndex: number;
  };
  delay: number;
  duration: number;
  direction: 1 | -1;
};

export default function ButterfliesEffect() {
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);

  useEffect(() => {
    // Create initial butterflies
    const initialButterflies = [...Array(15)].map((_, i) => createButterfly(i));
    setButterflies(initialButterflies);

    // Add new butterflies periodically
    const interval = setInterval(() => {
      setButterflies((current) => {
        // Remove oldest butterfly and add a new one
        const newButterflies = [...current];
        newButterflies.shift();
        newButterflies.push(createButterfly(Date.now()));
        return newButterflies;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {butterflies.map((butterfly) => (
        <motion.div
          key={butterfly.id}
          initial={{
            opacity: 0,
            x: butterfly.direction > 0 ? -100 : 100,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            x:
              butterfly.direction > 0
                ? [
                    0,
                    window.innerWidth * 0.3,
                    window.innerWidth * 0.6,
                    window.innerWidth,
                  ]
                : [
                    0,
                    -window.innerWidth * 0.3,
                    -window.innerWidth * 0.6,
                    -window.innerWidth,
                  ],
            y: [
              butterfly.style.top,
              `calc(${butterfly.style.top} - 50px)`,
              `calc(${butterfly.style.top} + 50px)`,
              butterfly.style.top,
            ],
          }}
          transition={{
            duration: butterfly.duration,
            delay: butterfly.delay,
            ease: "easeInOut",
            y: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "easeInOut",
            },
          }}
          style={{
            position: "absolute",
            width: `${butterfly.size}px`,
            height: `${butterfly.size}px`,
            ...butterfly.style,
          }}
        >
          <ButterflyShape
            color={butterfly.color}
            direction={butterfly.direction}
          />
        </motion.div>
      ))}
    </div>
  );
}

function createButterfly(id: number): Butterfly {
  const colors = [
    "#8B5CF6", // Purple
    "#EC4899", // Pink
    "#3B82F6", // Blue
    "#10B981", // Green
    "#F59E0B", // Amber
  ];

  return {
    id,
    size: Math.random() * 30 + 20, // 20-50px
    color: colors[Math.floor(Math.random() * colors.length)],
    style: {
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
      zIndex: 0,
    },
    delay: Math.random() * 2,
    duration: Math.random() * 15 + 10, // 10-25s
    direction: Math.random() > 0.5 ? 1 : -1, // Left to right or right to left
  };
}

function ButterflyShape({
  color,
  direction,
}: {
  color: string;
  direction: 1 | -1;
}) {
  return (
    <div className="relative">
      <motion.div
        animate={{
          rotateY: [0, 40, 0, -40, 0],
          rotateZ: [0, 5, 0, -5, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 2,
          ease: "easeInOut",
        }}
        style={{
          transformStyle: "preserve-3d",
          scaleX: direction,
        }}
      >
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M25 5C20 5 10 15 10 25C10 35 20 45 25 45C30 45 40 35 40 25C40 15 30 5 25 5Z"
            fill={color}
            opacity="0.8"
          />
          <path
            d="M23 5C23 5 15 15 15 25C15 35 23 45 23 45C27 45 35 35 35 25C35 15 27 5 23 5Z"
            fill={color}
            opacity="0.6"
          />
          <path d="M25 25L25 45" stroke="#333" strokeWidth="1" />
          <circle cx="25" cy="25" r="2" fill="#333" />
        </svg>
      </motion.div>
    </div>
  );
}
