"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Search } from "lucide-react"
import { allCategories } from "@/lib/mock-data/categories"

export default function CategoriesPage() {
    const [search, setSearch] = useState("")

    const filtered = allCategories.filter((cat) =>
        cat.name.toLowerCase().includes(search.toLowerCase())
    )

    // Group by first letter
    const grouped = filtered.reduce((acc, cat) => {
        const letter = cat.name[0].toUpperCase()
        if (!acc[letter]) acc[letter] = []
        acc[letter].push(cat)
        return acc
    }, {} as Record<string, typeof allCategories>)

    const sortedLetters = Object.keys(grouped).sort()

    return (
        <div className="pt-16 min-h-screen bg-gray-50">

            {/* Header */}
            <div className="bg-[#0a0f2e] py-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#2947b5]/20 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-[#ff6b35] text-sm font-semibold uppercase tracking-wider">
                            Browse all
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2 mb-4">
                            All Categories
                        </h1>
                        <p className="text-white/60 mb-8">
                            {allCategories.length}+ business categories across India
                        </p>

                        {/* Search */}
                        <div className="relative max-w-md mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                            <input
                                type="text"
                                placeholder="Search categories..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white/10 border border-white/20 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/40 transition-colors text-sm"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Categories */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {filtered.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500">No categories found for "{search}"</p>
                    </div>
                )}

                {sortedLetters.map((letter) => (
                    <motion.div
                        key={letter}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-10"
                    >
                        {/* Letter heading */}
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-[#2947b5] flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold">{letter}</span>
                            </div>
                            <div className="flex-1 h-px bg-gray-200" />
                        </div>

                        {/* Category cards */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {grouped[letter].map((cat, index) => (
                                <motion.div
                                    key={cat.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.03 }}
                                >
                                    <Link
                                        href={`/search?category=${cat.slug}`}
                                        className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-gray-100 bg-white hover:border-[#2947b5]/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-[#2947b5]/10 group-hover:bg-[#2947b5] flex items-center justify-center transition-colors duration-300">
                                            <span className="text-lg">
                                                {getCategoryEmoji(cat.slug)}
                                            </span>
                                        </div>
                                        <p className="text-xs font-medium text-gray-700 group-hover:text-[#2947b5] transition-colors leading-tight">
                                            {cat.name}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {cat.count.toLocaleString()}+
                                        </p>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

function getCategoryEmoji(slug: string): string {
    const map: Record<string, string> = {
        "restaurants": "🍽️",
        "food-beverage": "🍱",
        "healthcare": "🏥",
        "pharmacy": "💊",
        "beauty-wellness": "💄",
        "beauty-salon": "✂️",
        "automotive-services": "🚗",
        "education-training": "🎓",
        "electrical-services": "⚡",
        "real-estate": "🏠",
        "financial-services": "💰",
        "grocery-store": "🛒",
        "fitness-recreation": "💪",
        "it-services": "💻",
        "travel-agency": "✈️",
        "wedding-planning": "💒",
        "catering-services": "🍴",
        "construction": "🏗️",
        "courier-logistics": "📦",
        "digital-marketing": "📱",
        "accommodation-services": "🏨",
        "accounting-financial": "📊",
        "agriculture-farming": "🌾",
        "ac-refrigeration": "❄️",
        "apparel-fashion": "👕",
        "arts-crafts": "🎨",
        "astrology-spiritual": "🔮",
        "ayurveda-wellness": "🌿",
        "business-consulting": "💼",
        "computer-repair": "🖥️",
        "dairy-products": "🥛",
        "driving-school": "🚘",
        "electronics-retail": "📱",
        "event-planning": "🎉",
        "furniture-retail": "🪑",
        "government-services": "🏛️",
        "hardware-store": "🔧",
        "home-services": "🏠",
        "hospitality": "🏨",
        "insurance": "🛡️",
        "interior-design": "🎨",
        "jewelry": "💎",
        "massage-therapy": "💆",
        "mobile-repair": "📱",
        "music-education": "🎵",
        "optical-services": "👓",
        "pest-control": "🐛",
        "pet-services": "🐾",
        "photography": "📸",
        "printing-services": "🖨️",
        "retail": "🛍️",
        "telecommunications": "📞",
        "transportation": "🚚",
        "web-development": "💻",
        "wholesale-retail": "🏪",
    }
    return map[slug] || "🏢"
}