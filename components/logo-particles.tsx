'use client'

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'

interface LogoParticlesProps {
  logoName: string
  logoPath: string
  logoColor: string
  logoDescription: string
}

export default function LogoParticles({ logoName, logoPath, logoColor, logoDescription }: LogoParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isTouchingRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      setIsMobile(window.innerWidth < 768)
    }

    updateCanvasSize()

    let particles: {
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      color: string
      scatteredColor: string
      life: number
    }[] = []

    let textImageData: ImageData | null = null

    function createTextImage() {
      if (!ctx || !canvas) return 0

      ctx.fillStyle = 'white'
      ctx.save()
      
      const fontSize = isMobile ? 60 : 120
      ctx.font = `bold ${fontSize}px Arial`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      const text = logoName
      const x = canvas.width / 2
      const y = canvas.height / 2
      
      ctx.fillText(text, x, y)
      
      const textMetrics = ctx.measureText(text)
      const textWidth = textMetrics.width
      const textHeight = fontSize
      
      const imageData = ctx.getImageData(
        x - textWidth / 2 - 10,
        y - textHeight / 2 - 10,
        textWidth + 20,
        textHeight + 20
      )
      
      ctx.restore()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      return imageData
    }

    function initializeParticles() {
      if (!textImageData) return

      particles = []
      const { data, width, height } = textImageData
      const gap = isMobile ? 4 : 3

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (y * width + x) * 4
          const alpha = data[index + 3]

          if (alpha > 128) {
            const baseX = x + (canvas.width / 2 - textImageData.width / 2)
            const baseY = y + (canvas.height / 2 - textImageData.height / 2)

            particles.push({
              x: baseX + Math.random() * 1000 - 500,
              y: baseY + Math.random() * 1000 - 500,
              baseX,
              baseY,
              size: Math.random() * 2 + 1,
              color: logoColor,
              scatteredColor: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
              life: Math.random() * 20 + 40
            })
          }
        }
      }
    }

    function animate() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mouse = mousePositionRef.current
      const isTouch = isTouchingRef.current

      particles.forEach((particle) => {
        const distance = Math.sqrt(
          Math.pow(mouse.x - particle.x, 2) + Math.pow(mouse.y - particle.y, 2)
        )

        let targetX = particle.baseX
        let targetY = particle.baseY
        let currentColor = particle.color

        if (distance < 100 && isTouch) {
          const force = (100 - distance) / 100
          const angle = Math.atan2(particle.y - mouse.y, particle.x - mouse.x)
          targetX = particle.x + Math.cos(angle) * force * 50
          targetY = particle.y + Math.sin(angle) * force * 50
          currentColor = particle.scatteredColor
        }

        particle.x += (targetX - particle.x) * 0.05
        particle.y += (targetY - particle.y) * 0.05

        ctx.fillStyle = currentColor
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect()
      mousePositionRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    function handleTouchMove(e: TouchEvent) {
      e.preventDefault()
      const rect = canvas.getBoundingClientRect()
      const touch = e.touches[0]
      mousePositionRef.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      }
    }

    function handleMouseEnter() {
      isTouchingRef.current = true
    }

    function handleMouseLeave() {
      isTouchingRef.current = false
    }

    function handleTouchStart() {
      isTouchingRef.current = true
    }

    function handleTouchEnd() {
      isTouchingRef.current = false
    }

    // Initialize
    textImageData = createTextImage()
    initializeParticles()
    animate()

    // Event listeners
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    canvas.addEventListener('mouseenter', handleMouseEnter)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('touchstart', handleTouchStart)
    canvas.addEventListener('touchend', handleTouchEnd)
    window.addEventListener('resize', updateCanvasSize)

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('mouseenter', handleMouseEnter)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [logoName, logoColor, isMobile])

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair"
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)' }}
      />
      
      {/* Navigation */}
      <div className="absolute top-6 left-6 z-10 flex gap-4">
        <Link 
          href="/logos" 
          className="glass-button flex items-center gap-2 px-4 py-2 text-white text-sm hover:scale-105 transition-transform"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
        
        <Link 
          href="/" 
          className="glass-button flex items-center gap-2 px-4 py-2 text-white text-sm hover:scale-105 transition-transform"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </Link>
      </div>
      
      {/* Logo Info */}
      <div className="absolute bottom-6 left-6 z-10 text-white">
        <h1 className="text-2xl font-bold mb-2">{logoName}</h1>
        <p className="text-white/70 text-sm">{logoDescription}</p>
        <p className="text-white/50 text-xs mt-2">
          Hover or touch to interact with particles
        </p>
      </div>
    </div>
  )
}