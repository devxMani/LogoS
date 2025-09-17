import { GradientBackground } from "@/components/gradient-background"
import { Instrument_Serif } from "next/font/google"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import React from "react"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

// Logo data organized by categories
const logoCategories = [
  {
    title: "Tech Giants",
    logos: [
      {
        name: "AWS",
        path: "/aws",
        description: "Amazon Web Services",
        color: "from-orange-500 to-yellow-500",
        animationType: "geometric" as const,
        icon: "🚀"
      },
      {
        name: "Vercel",
        path: "/vercel", 
        description: "Frontend Cloud Platform",
        color: "from-black to-gray-800",
        animationType: "morphing" as const,
        icon: "▲"
      },
      {
        name: "Google",
        path: "/google",
        description: "Search Engine Giant",
        color: "from-blue-500 to-green-500",
        animationType: "morphing" as const,
        icon: "🔍"
      },
      {
        name: "Microsoft",
        path: "/microsoft",
        description: "Technology Corporation",
        color: "from-blue-600 to-cyan-500",
        animationType: "geometric" as const,
        icon: "⊞"
      }
    ]
  },
  {
    title: "Social Media",
    logos: [
      {
        name: "Facebook",
        path: "/facebook",
        description: "Social Network",
        color: "from-blue-600 to-blue-800",
        animationType: "wave" as const,
        icon: "👥"
      },
      {
        name: "Instagram",
        path: "/instagram",
        description: "Photo Sharing",
        color: "from-purple-500 to-pink-500",
        animationType: "grid" as const,
        icon: "📸"
      },
      {
        name: "Twitter",
        path: "/twitter",
        description: "Microblogging Platform",
        color: "from-blue-400 to-blue-600",
        animationType: "fluid" as const,
        icon: "🐦"
      },
      {
        name: "LinkedIn",
        path: "/linkedin",
        description: "Professional Network",
        color: "from-blue-700 to-blue-900",
        animationType: "wave" as const,
        icon: "💼"
      }
    ]
  },
  {
    title: "Design & Creative",
    logos: [
      {
        name: "Adobe",
        path: "/adobe",
        description: "Creative Software",
        color: "from-red-600 to-red-800",
        animationType: "morphing" as const,
        icon: "🎨"
      },
      {
        name: "Figma",
        path: "/figma",
        description: "Design Collaboration",
        color: "from-purple-500 to-indigo-600",
        animationType: "grid" as const,
        icon: "✏️"
      },
      {
        name: "Dribbble",
        path: "/dribbble",
        description: "Design Community",
        color: "from-pink-500 to-rose-600",
        animationType: "fluid" as const,
        icon: "🏀"
      },
      {
        name: "Behance",
        path: "/behance",
        description: "Creative Showcase",
        color: "from-blue-500 to-purple-600",
        animationType: "geometric" as const,
        icon: "🎭"
      }
    ]
  }
]

export default function LogosPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <GradientBackground />
      <div className="absolute inset-0 -z-10 bg-black/20" />
      
      {/* Header */}
      <header className="relative z-10 pt-8 pb-4">
        <div className="container mx-auto px-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span className="text-sm">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 pb-12">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className={`${instrumentSerif.className} text-white text-5xl md:text-6xl font-normal tracking-tight mb-4`}>
            Logo Gallery
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Explore interactive logo designs across different categories
          </p>
        </div>

        {/* Logo Categories */}
        <div className="space-y-16">
          {logoCategories.map((category, categoryIndex) => (
            <section key={category.title} className="space-y-8">
              <h2 className="text-white text-2xl md:text-3xl font-medium text-center">
                {category.title}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {category.logos.map((logo, logoIndex) => (
                  <Link 
                    key={logo.name}
                    href={`/logos/minimalist${logo.path}`}
                    className="group relative block"
                  >
                    <div className="glass-card-premium relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:-translate-y-3">
                      {/* Animated Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${logo.color} opacity-10 transition-opacity duration-500 group-hover:opacity-20`} />
                      
                      {/* Content */}
                      <div className="relative z-10 text-center space-y-6">
                        {/* Icon */}
                        <div className="mx-auto">
                          <div className="w-20 h-20 mx-auto rounded-2xl bg-white/10 flex items-center justify-center text-3xl backdrop-blur-sm border border-white/20 group-hover:bg-white/15 transition-all duration-300">
                            {logo.icon}
                          </div>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-white text-xl font-bold tracking-wide">
                          {logo.name}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-white/70 text-sm leading-relaxed">
                          {logo.description}
                        </p>
                        
                        {/* Animation Type Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium">
                          <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                          {logo.animationType}
                        </div>
                        
                        {/* CTA */}
                        <div className="flex items-center justify-center gap-2 text-white/80 text-sm pt-2 group-hover:text-white transition-colors">
                          <span>Experience Animation</span>
                          <ArrowLeft className="w-3 h-3 rotate-180 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                      
                      {/* Hover Shine Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <p className="text-white/60 text-sm mb-8">
            More logos and interactive experiences coming soon
          </p>
          <Link href="/particles">
            <button className="glass-button relative overflow-hidden rounded-full bg-white/10 px-10 py-4 text-white transition-all duration-300 hover:bg-white/20 hover:scale-105 active:scale-95">
              <span className="relative z-10 text-sm font-medium tracking-wide">
                View All Animations
              </span>
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}