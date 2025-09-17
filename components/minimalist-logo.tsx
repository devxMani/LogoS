'use client'

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Home, Download, Copy, Share2 } from 'lucide-react'

interface MinimalistLogoProps {
  logoName: string
  logoPath: string
  logoColor: string
  logoDescription: string
  animationType: 'morphing' | 'geometric' | 'fluid' | 'grid' | 'wave'
}

export default function MinimalistLogo({ 
  logoName, 
  logoPath, 
  logoColor, 
  logoDescription, 
  animationType 
}: MinimalistLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [isExporting, setIsExporting] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateCanvasSize()

    let time = 0
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    const animate = () => {
      time += 0.02
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set logo color
      ctx.fillStyle = logoColor
      ctx.strokeStyle = logoColor
      ctx.lineWidth = 3

      switch (animationType) {
        case 'morphing':
          drawMorphingLogo(ctx, centerX, centerY, time, logoName)
          break
        case 'geometric':
          drawGeometricLogo(ctx, centerX, centerY, time, logoName)
          break
        case 'fluid':
          drawFluidLogo(ctx, centerX, centerY, time, logoName)
          break
        case 'grid':
          drawGridLogo(ctx, centerX, centerY, time, logoName)
          break
        case 'wave':
          drawWaveLogo(ctx, centerX, centerY, time, logoName)
          break
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()
    window.addEventListener('resize', updateCanvasSize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [logoName, logoColor, animationType])

  // Animation functions
  const drawMorphingLogo = (ctx: CanvasRenderingContext2D, x: number, y: number, time: number, name: string) => {
    const size = 80
    const morphFactor = Math.sin(time) * 0.3

    ctx.save()
    ctx.translate(x, y)
    
    // Create morphing shapes based on logo name
    if (name.includes('Google')) {
      // Morphing circles that transform between G shape
      const radius = size + morphFactor * 20
      ctx.beginPath()
      ctx.arc(0, 0, radius, 0, Math.PI * 1.5 + morphFactor * 0.5)
      ctx.stroke()
      
      // Inner morphing elements
      ctx.beginPath()
      ctx.arc(radius * 0.3, 0, 10 + morphFactor * 5, 0, Math.PI * 2)
      ctx.fill()
    } else if (name.includes('Adobe')) {
      // Morphing A shape
      const height = size * 1.5
      const width = size + morphFactor * 30
      
      ctx.beginPath()
      ctx.moveTo(-width/2, height/2)
      ctx.lineTo(0, -height/2 + morphFactor * 10)
      ctx.lineTo(width/2, height/2)
      ctx.lineTo(width/3, height/4)
      ctx.lineTo(-width/3, height/4)
      ctx.closePath()
      ctx.fill()
    } else {
      // Generic morphing circle for other logos
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2
        const radius = size + Math.sin(time + i) * 15
        const pointX = Math.cos(angle) * radius
        const pointY = Math.sin(angle) * radius
        
        if (i === 0) {
          ctx.beginPath()
          ctx.moveTo(pointX, pointY)
        } else {
          ctx.lineTo(pointX, pointY)
        }
      }
      ctx.closePath()
      ctx.fill()
    }
    
    ctx.restore()
  }

  const drawGeometricLogo = (ctx: CanvasRenderingContext2D, x: number, y: number, time: number, name: string) => {
    const size = 60
    
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(time * 0.5)
    
    if (name.includes('Microsoft')) {
      // Four squares rotating
      const colors = ['#F25022', '#7FBA00', '#00A4EF', '#FFB900']
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = colors[i]
        const offsetX = (i % 2) * size - size/2
        const offsetY = Math.floor(i / 2) * size - size/2
        
        ctx.save()
        ctx.translate(offsetX, offsetY)
        ctx.rotate(Math.sin(time + i) * 0.2)
        ctx.fillRect(-size/4, -size/4, size/2, size/2)
        ctx.restore()
      }
    } else if (name.includes('AWS')) {
      // Geometric arrow/cloud shape
      ctx.fillStyle = logoColor
      ctx.beginPath()
      
      // Create geometric AWS-like shape
      const points = 6
      for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2
        const radius = size + Math.sin(time * 2 + i * 0.5) * 10
        const pointX = Math.cos(angle) * radius
        const pointY = Math.sin(angle) * radius * 0.6
        
        if (i === 0) {
          ctx.moveTo(pointX, pointY)
        } else {
          ctx.lineTo(pointX, pointY)
        }
      }
      ctx.closePath()
      ctx.fill()
    } else {
      // Generic geometric pattern
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2
        const radius = size
        
        ctx.save()
        ctx.rotate(angle + time)
        ctx.fillRect(radius - 5, -3, 30, 6)
        ctx.restore()
      }
    }
    
    ctx.restore()
  }

  const drawFluidLogo = (ctx: CanvasRenderingContext2D, x: number, y: number, time: number, name: string) => {
    const size = 80
    
    ctx.save()
    ctx.translate(x, y)
    
    // Create fluid, liquid-like animations
    ctx.beginPath()
    
    const points = 20
    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * Math.PI * 2
      const baseRadius = size
      const waveRadius = baseRadius + Math.sin(time * 3 + angle * 4) * 15 + Math.cos(time * 2 + angle * 2) * 8
      
      const pointX = Math.cos(angle) * waveRadius
      const pointY = Math.sin(angle) * waveRadius
      
      if (i === 0) {
        ctx.moveTo(pointX, pointY)
      } else {
        ctx.lineTo(pointX, pointY)
      }
    }
    
    ctx.closePath()
    ctx.fill()
    
    // Add inner fluid elements
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      const innerRadius = 20 + i * 15
      const offsetAngle = time + i * Math.PI / 3
      const centerX = Math.cos(offsetAngle) * 15
      const centerY = Math.sin(offsetAngle) * 15
      
      ctx.arc(centerX, centerY, innerRadius + Math.sin(time * 4 + i) * 5, 0, Math.PI * 2)
      ctx.fill()
    }
    
    ctx.restore()
  }

  const drawGridLogo = (ctx: CanvasRenderingContext2D, x: number, y: number, time: number, name: string) => {
    const gridSize = 8
    const cellSize = 12
    const totalSize = gridSize * cellSize
    
    ctx.save()
    ctx.translate(x - totalSize/2, y - totalSize/2)
    
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const cellX = col * cellSize
        const cellY = row * cellSize
        
        // Create pattern based on logo name
        let shouldFill = false
        
        if (name.includes('Figma')) {
          // Create F-like pattern
          shouldFill = (col === 0) || 
                      (row === 0 && col < 4) || 
                      (row === 3 && col < 3) ||
                      (row === 6 && col < 3)
        } else if (name.includes('Instagram')) {
          // Create camera-like pattern
          const centerRow = gridSize / 2
          const centerCol = gridSize / 2
          const distance = Math.sqrt((row - centerRow) ** 2 + (col - centerCol) ** 2)
          shouldFill = distance < 3 || (distance > 2 && distance < 4)
        } else {
          // Generic pattern with wave effect
          shouldFill = Math.sin(time + row * 0.5 + col * 0.5) > 0
        }
        
        if (shouldFill) {
          const opacity = 0.5 + Math.sin(time * 2 + row + col) * 0.5
          ctx.fillStyle = logoColor + Math.floor(opacity * 255).toString(16).padStart(2, '0')
          ctx.fillRect(cellX, cellY, cellSize - 1, cellSize - 1)
        }
      }
    }
    
    ctx.restore()
  }

  const drawWaveLogo = (ctx: CanvasRenderingContext2D, x: number, y: number, time: number, name: string) => {
    const size = 100
    
    ctx.save()
    ctx.translate(x, y)
    
    // Create wave-based animations
    ctx.lineWidth = 4
    ctx.strokeStyle = logoColor
    
    for (let wave = 0; wave < 3; wave++) {
      ctx.beginPath()
      
      const waveHeight = 30 - wave * 8
      const frequency = 0.02 + wave * 0.01
      const phase = time + wave * Math.PI / 3
      
      for (let x = -size; x <= size; x += 2) {
        const y = Math.sin(x * frequency + phase) * waveHeight
        
        if (x === -size) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      
      ctx.stroke()
    }
    
    // Add logo text with wave effect
    ctx.fillStyle = logoColor
    ctx.font = 'bold 24px Arial'
    ctx.textAlign = 'center'
    
    const letters = logoName.split('')
    letters.forEach((letter, index) => {
      const letterX = (index - letters.length / 2) * 25
      const letterY = Math.sin(time * 3 + index * 0.5) * 10 + 60
      ctx.fillText(letter, letterX, letterY)
    })
    
    ctx.restore()
  }

  const exportLogo = async (format: 'png' | 'svg' | 'pdf') => {
    setIsExporting(true)
    
    try {
      const canvas = canvasRef.current
      if (!canvas) return

      if (format === 'png') {
        const link = document.createElement('a')
        link.download = `${logoName.toLowerCase()}-logo.png`
        link.href = canvas.toDataURL('image/png')
        link.click()
      } else if (format === 'svg') {
        // Create SVG version
        const svgContent = createSVGVersion()
        const blob = new Blob([svgContent], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.download = `${logoName.toLowerCase()}-logo.svg`
        link.href = url
        link.click()
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
      setShowExportMenu(false)
    }
  }

  const createSVGVersion = () => {
    return `
      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${logoColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${logoColor};stop-opacity:0.8" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="100" fill="url(#logoGradient)" />
        <text x="200" y="210" text-anchor="middle" fill="white" font-family="Arial" font-size="24" font-weight="bold">
          ${logoName}
        </text>
      </svg>
    `
  }

  const copyToClipboard = async () => {
    try {
      const canvas = canvasRef.current
      if (!canvas) return

      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ])
        }
      })
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black" />
      
      {/* Animated Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-default"
      />
      
      {/* Navigation */}
      <div className="absolute top-6 left-6 z-10 flex gap-4">
        <Link 
          href="/logos" 
          className="glass-button flex items-center gap-2 px-4 py-2 text-white text-sm hover:scale-105 transition-transform"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Gallery</span>
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
      <div className="absolute bottom-6 left-6 z-10 text-white max-w-md">
        <h1 className="text-3xl font-bold mb-2">{logoName}</h1>
        <p className="text-white/70 text-sm mb-2">{logoDescription}</p>
        <p className="text-white/50 text-xs">
          Animation: {animationType.charAt(0).toUpperCase() + animationType.slice(1)}
        </p>
      </div>

      {/* Export Menu */}
      <div className="absolute bottom-6 right-6 z-10">
        <div className="relative">
          {showExportMenu && (
            <div className="absolute bottom-16 right-0 glass-card p-4 rounded-xl min-w-48 space-y-3">
              <div className="text-white text-sm font-medium mb-3">Export Options</div>
              
              <button
                onClick={() => exportLogo('png')}
                className="w-full flex items-center gap-3 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>PNG Image</span>
              </button>
              
              <button
                onClick={() => exportLogo('svg')}
                className="w-full flex items-center gap-3 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>SVG Vector</span>
              </button>
              
              <button
                onClick={copyToClipboard}
                className="w-full flex items-center gap-3 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <Copy className="w-4 h-4" />
                <span>Copy to Clipboard</span>
              </button>
            </div>
          )}
          
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="glass-button flex items-center gap-2 px-6 py-3 text-white hover:scale-105 transition-transform"
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Export Logo</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}