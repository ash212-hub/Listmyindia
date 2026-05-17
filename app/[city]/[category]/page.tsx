"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, ArrowLeft, Building2, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import BusinessCard from "@/components/businesses/BusinessCard"
import { Business } from "@/types"
import { categories } from "@/lib/mock-data/categories"

export default function CityategoryPage() {
    const { city, category } = useParams()

    const cityName = typeof city === "string"
        ? city.charAt(0).toUpperCase() + city.slice(1)
        : ""

    const categoryName = categories.find(
        (c) => c.slug === category
    )?.name || (typeof category === "string"
        ? category.charAt(0).toUpperCase() + category.slice(1)
        : "")

    const [businesses, setBusinesses] = useState<Business[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBusinesses = async () => {
            setLoading(true)
            try {
                const res = await fetch(
                    `/api/businesses?location=${cityName}&category=${category}`
                )
                const data = await res.json()
                setBusinesses(data.businesses || [])
            } catch {
                setBusinesses([])
            } finally {
                setLoading(false)
            }
        }
        if (cityName && category) fetchBusinesses()
    }, [cityName, category])

    return (
        <div className="pt-16 min-h-screen bg-gray-50">

            {/* Header */}
            <div className="bg-[#0a0f2e] py-14 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#2947b5]/20 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-white/50 text-sm mb-6">
                        <Link href="/" className="hover:text-white transition-colors">
                            Home
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <Link
                            href={`/${city}`}
                            className="hover:text-white transition-colors"
                        >
                            {cityName}
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-white/80">{categoryName}</span>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-[#ff6b35]/20 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-[#ff6b35]" />
                        </div>
                        <span className="text-white/60 text-sm font-medium uppercase tracking-wider">
                            {cityName}
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
                        {categoryName}
                    </h1>
                    <p className="text-white/60 text-base">
                        Find the best {categoryName.toLowerCase()} in {cityName}
                    </p>
                </div>
            </div>

            {/* Category pills */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex gap-3 overflow-x-auto pb-1">
                        <Link
                            href={`/${city}`}
                            className="flex-shrink-0 px-4 py-2 rounded-full border border-gray-200 text-gray-600 text-sm font-medium hover:border-[#2947b5] hover:text-[#2947b5] transition-colors"
                        >
                            All
                        </Link>
                        {categories.slice(0, 10).map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/${city}/${cat.slug}`}
                                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${cat.slug === category
                                        ? "bg-[#2947b5] text-white"
                                        : "border border-gray-200 text-gray-600 hover:border-[#2947b5] hover:text-[#2947b5]"
                                    }`}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Count + back */}
                {!loading && (
                    <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                        <p className="text-gray-600 font-medium">
                            <span className="text-gray-900 font-semibold">
                                {businesses.length}
                            </span>{" "}
                            {categoryName.toLowerCase()} found in {cityName}
                        </p>
                        <Link
                            href={`/${city}`}
                            className="inline-flex items-center gap-1.5 text-[#2947b5] text-sm font-medium hover:underline"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            All businesses in {cityName}
                        </Link>
                    </div>
                )}

                {/* Loading skeleton */}
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

                {/* Businesses grid */}
                {!loading && businesses.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {businesses.map((business, index) => (
                            <BusinessCard
                                key={business.id}
                                business={business}
                                index={index}
                            />
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && businesses.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                            <Building2 className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-gray-900 font-semibold text-xl mb-2">
                            No {categoryName.toLowerCase()} found in {cityName}
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Be the first to list your {categoryName.toLowerCase()} here!
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <Button
                                asChild
                                className="bg-[#ff6b35] hover:bg-[#e55a26] text-white px-8 py-3 rounded-xl"
                            >
                                <Link href="/register">List your business</Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="border-[#2947b5] text-[#2947b5] px-8 py-3 rounded-xl"
                            >
                                <Link href={`/${city}`}>
                                    Browse all in {cityName}
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                )}

            </div>
        </div>
    )
}