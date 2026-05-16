"use client"

import { useState, useCallback } from "react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import SearchBar from "./SearchBar"
import { useSearch } from "@/hooks/useSearch"
import { SearchParams } from "@/types"

const GlobeAnimation = dynamic(() => import("./GlobeAnimation"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-[#2947b5] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

export default function Hero() {
  const { search, loading, lat, lng, location, category } = useSearch()
  const [flyTo, setFlyTo] = useState<{
    lat: number
    lng: number
    label: string
    category?: string
  } | null>(null)

  const handleSearch = useCallback(
    async (params: SearchParams) => {
      await search(params)
      if (lat && lng) {
        setFlyTo({
          lat,
          lng,
          label: params.location,
          category: params.category,
        })
      }
    },
    [search, lat, lng]
  )

  return (
    <section className="relative min-h-screen bg-[#0a0f2e] overflow-hidden flex flex-col">

      {/* Globe Background */}
      <div className="absolute inset-0 z-0">
        <GlobeAnimation flyToLocation={flyTo} />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0a0f2e]/40 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center flex-1 px-4 pt-24 pb-16 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6"
        >
          <span className="w-2 h-2 bg-[#ff6b35] rounded-full animate-pulse" />
          <span className="text-white/80 text-xs font-medium">
            India's fastest growing business directory
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
        >
          Your City.
          <br />
          <span className="text-[#ff6b35]">Your Businesses.</span>
          <br />
          Found Instantly.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/60 text-base sm:text-lg mb-10 max-w-xl"
        >
          Discover verified local businesses across India's
          19,300+ pincodes. From your neighborhood to any city.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full"
        >
          <SearchBar onSearch={handleSearch} loading={loading} />
        </motion.div>

      </div>

      {/* Bottom scroll indicator */}
      <div className="relative z-20 flex justify-center pb-8">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </div>

    </section>
  )
}