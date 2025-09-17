'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { GradientBackground } from '@/components/gradient-background'
import { ArrowLeft } from 'lucide-react'

export default function ParticlesPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to logos page after a short delay
    const timer = setTimeout(() => {
      router.push('/logos')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GradientBackground />
      <div className="absolute inset-0 -z-10 bg-black/20" />
      
      {/* Navigation */}
      <div className="absolute top-6 left-6 z-10">
        <Link 
          href="/" 
          className="glass-button flex items-center gap-2 px-4 py-2 text-white text-sm hover:scale-105 transition-transform"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-8">
          Loading Gallery...
        </h1>
        <p className="text-white/80 text-lg mb-8">
          Redirecting you to the logo gallery
        </p>
        
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        
        <Link href="/logos">
          <button className="glass-button relative overflow-hidden rounded-full bg-white/10 px-8 py-3 text-white transition-all duration-300 hover:bg-white/20 hover:scale-105">
            <span className="relative z-10 text-sm font-medium">
              Go to Gallery Now
            </span>
          </button>
        </Link>
      </div>
    </main>
  )
}