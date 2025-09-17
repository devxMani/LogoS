import { GradientBackground } from "@/components/gradient-background"
import { Instrument_Serif } from "next/font/google"
import Link from "next/link"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

export default function Page() {
  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      <GradientBackground />
      <div className="absolute inset-0 -z-10 bg-black/20" />

      <section className="flex-1 px-6 text-center flex flex-col items-center justify-center">
        <h1
          className={`${instrumentSerif.className} text-white text-center text-balance font-normal tracking-tight text-7xl mb-16`}
        >
          imagination is limit
        </h1>
        
        {/* Glassmorphism Button */}
        <Link href="/logos">
          <button className="glass-button group relative overflow-hidden rounded-full bg-white/10 px-10 py-4 text-white transition-all duration-300 hover:bg-white/20 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/20">
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10 text-sm font-medium tracking-wide">
              Explore Logos
            </span>
          </button>
        </Link>
      </section>

      {/* Made by Mani */}
      <footer className="px-6 pb-8 text-center">
        <p className={`${instrumentSerif.className} text-white/60 text-lg font-normal tracking-wide`}>
          Made by Mani
        </p>
      </footer>
    </main>
  )
}