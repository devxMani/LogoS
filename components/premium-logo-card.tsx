"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useSpring as useReactSpring, animated, config } from "@react-spring/web"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"

interface PremiumLogoCardProps {
  name: string
  path: string
  description: string
  color: string
  icon: string
  animationType: string
  index: number
}

export function PremiumLogoCard({ 
  name, 
  path, 
  description, 
  color, 
  icon, 
  animationType,
  index 
}: PremiumLogoCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]))
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]))
  
  // React Spring for smooth animations
  const [springs, api] = useReactSpring(() => ({
    scale: 1,
    rotateZ: 0,
    y: 0,
    config: config.wobbly,
  }))

  // Handle mouse move for 3D tilt effect
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const x = (event.clientX - centerX) / (rect.width / 2)
    const y = (event.clientY - centerY) / (rect.height / 2)
    
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    api.start({
      scale: 1.05,
      y: -8,
      rotateZ: Math.random() * 4 - 2,
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
    api.start({
      scale: 1,
      y: 0,
      rotateZ: 0,
    })
  }

  // Animation variants for the card
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8,
      rotateX: 30
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  }

  // Icon animation variants
  const iconVariants = {
    rest: { 
      scale: 1,
      rotate: 0,
      filter: "blur(0px)"
    },
    hover: { 
      scale: 1.2,
      rotate: [0, -10, 10, 0],
      filter: "blur(0px) drop-shadow(0 0 20px rgba(255,255,255,0.5))",
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  }

  // Floating particles animation
  const generateParticles = () => {
    return Array.from({ length: 8 }, (_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white/30 rounded-full"
        initial={{ 
          x: Math.random() * 200 - 100, 
          y: Math.random() * 200 - 100,
          opacity: 0
        }}
        animate={isHovered ? {
          x: (Math.random() - 0.5) * 300,
          y: (Math.random() - 0.5) * 300,
          opacity: [0, 1, 0],
          scale: [0, 1.5, 0]
        } : {}}
        transition={{
          duration: 2,
          delay: i * 0.1,
          repeat: isHovered ? Infinity : 0,
          repeatType: "loop"
        }}
        style={{
          left: '50%',
          top: '50%'
        }}
      />
    ))
  }

  return (
    <Link href={`/logos/minimalist${path}`} className="block">
      <animated.div style={springs}>
        <motion.div
          ref={cardRef}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="relative group cursor-pointer"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Main Card */}
          <div className="relative overflow-hidden rounded-3xl backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 border border-white/20 shadow-2xl transition-all duration-700 group-hover:border-white/40">
            
            {/* Animated Background Gradient */}
            <motion.div 
              className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 transition-opacity duration-700`}
              animate={{ 
                opacity: isHovered ? 0.15 : 0.05 
              }}
            />
            
            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {generateParticles()}
            </div>
            
            {/* Glass Reflection Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Animated Border Glow */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: `linear-gradient(45deg, ${color.split(' ')[1]}, ${color.split(' ')[3]})`,
                opacity: 0,
                filter: "blur(20px)",
                transform: "scale(1.1)"
              }}
              animate={{
                opacity: isHovered ? 0.3 : 0
              }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Content */}
            <div className="relative z-10 p-8 text-center space-y-6 transform-gpu">
              
              {/* Icon with Advanced Animation */}
              <motion.div
                variants={iconVariants}
                initial="rest"
                animate={isHovered ? "hover" : "rest"}
                className="mx-auto"
              >
                <div className="relative">
                  <motion.div 
                    className="w-20 h-20 mx-auto rounded-2xl bg-white/10 flex items-center justify-center text-3xl backdrop-blur-xl border border-white/30 shadow-lg"
                    whileHover={{ 
                      boxShadow: "0 20px 40px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)"
                    }}
                  >
                    <motion.span
                      animate={isHovered ? {
                        textShadow: "0 0 20px rgba(255,255,255,0.8)"
                      } : {}}
                    >
                      {icon}
                    </motion.span>
                  </motion.div>
                  
                  {/* Pulsing Ring */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-white/20"
                    animate={isHovered ? {
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5]
                    } : {}}
                    transition={{ 
                      duration: 2, 
                      repeat: isHovered ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </motion.div>
              
              {/* Title with Typing Effect */}
              <motion.h3 
                className="text-white text-xl font-bold tracking-wide"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {name}
              </motion.h3>
              
              {/* Description */}
              <motion.p 
                className="text-white/70 text-sm leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {description}
              </motion.p>
              
              {/* Animation Type Badge with Pulse */}
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium backdrop-blur-xl shadow-lg"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.15)"
                }}
              >
                <motion.div 
                  className="w-2 h-2 rounded-full bg-current"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                {animationType}
              </motion.div>
              
              {/* CTA with Magnetic Effect */}
              <motion.div 
                className="flex items-center justify-center gap-2 text-white/80 text-sm pt-2 transition-colors"
                whileHover={{ 
                  color: "rgba(255,255,255,1)",
                  scale: 1.05
                }}
              >
                <span>Experience Magic</span>
                <motion.div
                  animate={isHovered ? {
                    x: [0, 5, 0],
                    rotate: [0, 15, 0]
                  } : {}}
                  transition={{ 
                    duration: 0.8,
                    repeat: isHovered ? Infinity : 0
                  }}
                >
                  ✨
                </motion.div>
              </motion.div>
            </div>
            
            {/* Advanced Shine Effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              initial={false}
              animate={isHovered ? {
                background: [
                  "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                  "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)",
                  "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)"
                ]
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            
            {/* Morphing Border */}
            <motion.div
              className="absolute inset-0 rounded-3xl border border-white/0"
              animate={isHovered ? {
                borderColor: "rgba(255,255,255,0.4)",
                borderWidth: [1, 3, 1],
              } : {}}
              transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
            />
          </div>
        </motion.div>
      </animated.div>
    </Link>
  )
}