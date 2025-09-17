"use client"

import { GradientBackground } from "@/components/gradient-background"
import { SimpleLogoCard } from "@/components/simple-logo-card"
import { Instrument_Serif } from "next/font/google"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import React from "react"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

// Simple minimalistic logo data
const logoCategories = [
  {
    title: "Cloud & Infrastructure",
    subtitle: "Enterprise platforms",
    logos: [
      {
        name: "Amazon Web Services",
        path: "/aws",
        description: "Cloud Computing Platform",
        color: "from-orange-400 to-yellow-500"
      },
      {
        name: "Vercel",
        path: "/vercel", 
        description: "Frontend Cloud Platform",
        color: "from-gray-600 to-gray-800"
      },
      {
        name: "Google Cloud",
        path: "/google",
        description: "Google Cloud Platform",
        color: "from-blue-500 to-green-500"
      },
      {
        name: "Microsoft Azure",
        path: "/microsoft",
        description: "Microsoft Cloud Services",
        color: "from-blue-600 to-cyan-500"
      }
    ]
  },
  {
    title: "Social Platforms",
    subtitle: "Connect worldwide",
    logos: [
      {
        name: "Meta",
        path: "/facebook",
        description: "Social Media Platform",
        color: "from-blue-600 to-purple-600"
      },
      {
        name: "Instagram",
        path: "/instagram",
        description: "Photo Sharing Platform",
        color: "from-purple-500 to-pink-500"
      },
      {
        name: "Twitter",
        path: "/twitter",
        description: "Microblogging Platform",
        color: "from-blue-400 to-blue-600"
      },
      {
        name: "LinkedIn",
        path: "/linkedin",
        description: "Professional Network",
        color: "from-blue-700 to-blue-900"
      }
    ]
  },
  {
    title: "Design & Creative",
    subtitle: "Creative tools",
    logos: [
      {
        name: "Adobe Creative Suite",
        path: "/adobe",
        description: "Creative Software Platform",
        color: "from-red-600 to-pink-600"
      },
      {
        name: "Figma",
        path: "/figma",
        description: "Collaborative Design Tool",
        color: "from-purple-500 to-indigo-500"
      },
      {
        name: "Dribbble",
        path: "/dribbble",
        description: "Design Community",
        color: "from-pink-500 to-rose-500"
      },
      {
        name: "Behance",
        path: "/behance",
        description: "Creative Portfolio Platform",
        color: "from-blue-500 to-purple-500"
      }
    ]
  }
]

export default function LogosPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <GradientBackground />
      <div className="absolute inset-0 -z-10 bg-black/30" />
      
      {/* Header */}
      <header className="relative z-10 pt-8 pb-4">
        <div className="container mx-auto px-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 group backdrop-blur-sm rounded-full px-4 py-2 bg-white/5 border border-white/10"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 pb-12">
        {/* Title Section */}
        <div className="text-center mb-20">
          <h1 className={`${instrumentSerif.className} text-white text-6xl md:text-7xl font-normal tracking-tight mb-6`}>
            Logo Gallery
          </h1>
          <p className="text-white/70 text-xl max-w-3xl mx-auto leading-relaxed">
            Minimalistic logo collection featuring clean typography and elegant design
          </p>
        </div>

        {/* Logo Categories */}
        <div className="space-y-20">
          {logoCategories.map((category, categoryIndex) => (
            <section key={category.title} className="space-y-12">
              {/* Category Header */}
              <div className="text-center space-y-3">
                <h2 className="text-white text-3xl md:text-4xl font-light tracking-wide">
                  {category.title}
                </h2>
                <p className="text-white/60 text-lg">
                  {category.subtitle}
                </p>
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto" />
              </div>
              
              {/* Logo Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {category.logos.map((logo, logoIndex) => (
                  <SimpleLogoCard
                    key={logo.name}
                    name={logo.name}
                    path={logo.path}
                    description={logo.description}
                    color={logo.color}
                    index={logoIndex}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-32">
          <div className="relative max-w-md mx-auto">
            <div className="relative backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-8 space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
              <h3 className="text-white text-xl font-medium">More Logos Coming Soon</h3>
              <p className="text-white/70 text-sm">Building a comprehensive collection of minimalistic brand logos</p>
            </div>
          </div>
        </div>

        {/* Made by Mani */}
        <div className="text-center mt-20 mb-8">
          <p className={`${instrumentSerif.className} text-white/60 text-lg font-normal tracking-wide`}>
            Made by Mani
          </p>
        </div>
      </div>
    </main>
  )
}