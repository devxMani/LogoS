'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '../components/ui/button'
import { Instrument_Serif } from 'next/font/google'
import './landing.css'

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

export default function LandingPage() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-slate-900 to-blue-900"></div>
      
      {/* Noise overlay for texture */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      ></div>
      
      {/* Blue gradient blobs similar to reference image */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-40 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0.3) 40%, transparent 70%)',
            left: '-200px',
            bottom: '-200px',
          }}
        ></div>
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(147, 197, 253, 0.5) 0%, rgba(147, 197, 253, 0.2) 50%, transparent 70%)',
            right: '-150px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        ></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className={`${instrumentSerif.className} fade-in text-5xl md:text-7xl lg:text-8xl text-white font-normal tracking-wide leading-tight`}>
          imagination is limit
        </h1>
      </div>
      
      {/* Navigation button - positioned subtly */}
      <Link href="/particles" passHref>
        <Button 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-300 px-8 py-3 rounded-full button-minimal"
        >
          Explore Logos
        </Button>
      </Link>
    </div>
  )
}