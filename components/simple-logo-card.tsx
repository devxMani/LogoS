"use client"

import { Instrument_Serif } from "next/font/google"
import Link from "next/link"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

interface SimpleLogoCardProps {
  name: string
  path: string
  description: string
  color: string
  index: number
}

export function SimpleLogoCard({ 
  name, 
  path, 
  description, 
  color,
  index 
}: SimpleLogoCardProps) {
  return (
    <Link href={`/logos/minimalist${path}`} className="block">
      <div className="group relative cursor-pointer">
        <div className="simple-glass-card relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:scale-102 hover:-translate-y-1">
          
          {/* Subtle Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 transition-opacity duration-300 group-hover:opacity-10`} />
          
          {/* Content */}
          <div className="relative z-10 text-center space-y-4">
            
            {/* Logo Text */}
            <div className="space-y-2">
              <h3 className={`${instrumentSerif.className} text-white text-2xl font-normal tracking-wide`}>
                {name}
              </h3>
              <div className="w-12 h-px bg-white/30 mx-auto transition-all duration-300 group-hover:w-16 group-hover:bg-white/50" />
            </div>
            
            {/* Description */}
            <p className="text-white/60 text-sm leading-relaxed font-light">
              {description}
            </p>
            
            {/* CTA */}
            <div className="flex items-center justify-center gap-2 text-white/50 text-xs pt-2 transition-colors duration-300 group-hover:text-white/70">
              <span className="font-medium">View Logo</span>
            </div>
          </div>
          
          {/* Simple border highlight */}
          <div className="absolute inset-0 rounded-2xl border border-white/10 transition-colors duration-300 group-hover:border-white/20" />
        </div>
      </div>
    </Link>
  )
}