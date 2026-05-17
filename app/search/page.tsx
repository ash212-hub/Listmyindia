"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Search, MapPin, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import BusinessCard from "@/components/businesses/BusinessCard"
import { Business } from "@/types"
import { categories } from "@/lib/mock-data/categories"

function SearchContent() {
    const searchParams = useSearchParams()
    const [results, setResults] = useState<Business[]>([])
    const [loading, setLoading] = useState(false)
    const [location, setLocation] = useState(searchParams.get("location") || "")
    const [category, setCategory] = useState(searchParams.get("category") || "")
    const [hasSearched, setHasSearched] = useState(false)
    const [showFilters, setShowFilters] = useState(false)
    const [sortBy, setSortBy] = useState("rating")

    const handleSearch = async () => {
        if (!location.trim()) return
        setLoading(true)
        setHasSearched(true)

        try {
            const query = new URLSearchParams({
                location: location.trim(),
                ...(category && { category }),
            })
            const res = await fetch(`/api/businesses?${query}`)
            const data = await res.json()

            let sorted = data.businesses || []
            if (sortBy === "rating") {
                sorted = sorted.sort((a: Business, b: Business) => b.rating - a.rating)
            } else if (sortBy === "reviews") {
                sorted = sorted.sort((a: Business, b: Business) => b.reviewCount - a.reviewCount)
            }

            setResults(sorted)
        } catch {
            setResults([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (searchParams.get("location")) {
            handleSearch()
        }
    }, [])

    return (
        <div className="pt-16 min-h-screen bg-gray-50">

            {/* Search Header */}
            <div className="bg-[#0a0f2e] py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-white font-bold text-2xl mb-6">
                        Find local businesses
                    </h1>
                    <div className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3">

                        {/* Location */}
                        <div className="relative flex-1">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                            <input
                                type="text"
                                placeholder="City, area or pincode..."
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                className="w-full bg-transparent pl-9 pr-4 py-3 text-white placeholder:text-white/50 outline-none text-sm"
                            />
                        </div>

                        <div className="hidden sm:block w-px bg-white/20" />

                        {/* Category */}
                        <div className="relative flex-1">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-transparent py-3 px-3 text-white/80 outline-none text-sm appearance-none cursor-pointer"
                            >
                                <option value="" className="text-gray-900">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.slug} className="text-gray-900">
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Search Button */}
                        <Button
                            onClick={handleSearch}
                            disabled={loading || !location.trim()}
                            className="bg-[#ff6b35] hover:bg-[#e55a26] text-white px-6 py-3 rounded-xl flex items-center gap-2"
                        >
                            <Search className="w-4 h-4" />
                            Search
                        </Button>

                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Filters bar */}
                {hasSearched && (
                    <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                        <div>
                            <p className="text-gray-900 font-semibold">
                                {loading ? "Searching..." : `${results.length} businesses found`}
                                {location && (
                                    <span className="text-gray-500 font-normal">
                                        {" "}in {location}
                                    </span>
                                )}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Sort */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none text-gray-700"
                            >
                                <option value="rating">Sort by Rating</option>
                                <option value="reviews">Sort by Reviews</option>
                            </select>

                            {/* Filter toggle */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 hover:border-[#2947b5] transition-colors"
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                Filters
                            </button>
                        </div>
                    </div>
                )}

                {/* Filter panel */}
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl border border-gray-100 p-6 mb-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-900">Filters</h3>
                            <button onClick={() => setShowFilters(false)}>
                                <X className="w-4 h-4 text-gray-400" />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {["Open Now", "Verified Only", "Top Rated", "Most Reviewed"].map((filter) => (
                                <button
                                    key={filter}
                                    className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-[#2947b5] hover:text-[#2947b5] transition-colors"
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse"
                            >
                                <div className="h-4 bg-gray-200 rounded mb-3 w-3/4" />
                                <div className="h-3 bg-gray-100 rounded mb-2 w-1/2" />
                                <div className="h-3 bg-gray-100 rounded mb-2 w-full" />
                                <div className="h-3 bg-gray-100 rounded w-2/3" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Results grid */}
                {!loading && hasSearched && results.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.map((business, index) => (
                            <BusinessCard
                                key={business.id}
                                business={business}
                                index={index}
                            />
                        ))}
                    </div>
                )}

                {/* No results */}
                {!loading && hasSearched && results.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                            <Search className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-gray-900 font-semibold text-xl mb-2">
                            No businesses found
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Try searching a different city or category
                        </p>
                        <Button
                            onClick={() => {
                                setLocation("")
                                setCategory("")
                                setResults([])
                                setHasSearched(false)
                            }}
                            variant="outline"
                            className="border-[#2947b5] text-[#2947b5]"
                        >
                            Clear search
                        </Button>
                    </motion.div>
                )}

                {/* Initial state */}
                {!hasSearched && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <div className="w-20 h-20 rounded-2xl bg-[#2947b5]/10 flex items-center justify-center mx-auto mb-4">
                            <MapPin className="w-10 h-10 text-[#2947b5]" />
                        </div>
                        <h3 className="text-gray-900 font-semibold text-xl mb-2">
                            Search for businesses near you
                        </h3>
                        <p className="text-gray-500">
                            Enter your city, area or pincode above to get started
                        </p>
                    </motion.div>
                )}

            </div>
        </div>
    )
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#2947b5] border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <SearchContent />
        </Suspense>
    )
}