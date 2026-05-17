"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import {
    MapPin,
    Phone,
    Mail,
    Globe,
    Clock,
    Star,
    BadgeCheck,
    ArrowLeft,
    Share2,
    Heart,
    ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Business } from "@/types"
import { featuredBusinesses } from "@/lib/mock-data/businesses"

export default function BusinessDetailPage() {
    const { id } = useParams()
    const [business, setBusiness] = useState<Business | null>(null)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        const found = featuredBusinesses.find((b) => b.id === id)
        setBusiness(found || null)
    }, [id])

    if (!business) {
        return (
            <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-8 h-8 text-gray-300" />
                    </div>
                    <h2 className="text-gray-900 font-semibold text-xl mb-2">
                        Business not found
                    </h2>
                    <p className="text-gray-500 mb-6">
                        This business may have been removed or does not exist.
                    </p>
                    <Button asChild variant="outline" className="border-[#2947b5] text-[#2947b5]">
                        <Link href="/search">Back to search</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="pt-16 min-h-screen bg-gray-50">

            {/* Header */}
            <div className="bg-[#0a0f2e] py-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#2947b5]/20 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                    <Link
                        href="/search"
                        className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to search
                    </Link>

                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                                    {business.name}
                                </h1>
                                {business.isVerified && (
                                    <BadgeCheck className="w-7 h-7 text-[#2947b5] flex-shrink-0" />
                                )}
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <Badge className="bg-[#2947b5]/30 text-white border-0 text-sm">
                                    {business.category}
                                </Badge>
                                {business.subcategory && (
                                    <Badge className="bg-white/10 text-white/70 border-0 text-sm">
                                        {business.subcategory}
                                    </Badge>
                                )}
                                <span
                                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${business.openNow
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-red-500/20 text-red-400"
                                        }`}
                                >
                                    {business.openNow ? "Open Now" : "Closed"}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-white/60 text-sm">
                                <MapPin className="w-4 h-4 text-[#ff6b35]" />
                                {business.address}, {business.city}, {business.state} — {business.pincode}
                            </div>
                        </div>

                        <div className="flex flex-col items-center bg-white/10 border border-white/20 rounded-2xl px-6 py-4 flex-shrink-0">
                            <div className="flex items-center gap-1 mb-1">
                                <Star className="w-5 h-5 text-[#ff6b35] fill-[#ff6b35]" />
                                <span className="text-white font-bold text-2xl">
                                    {business.rating}
                                </span>
                            </div>
                            <span className="text-white/50 text-xs">
                                {business.reviewCount} reviews
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left */}
                    <div className="lg:col-span-2 flex flex-col gap-6">

                        {/* About */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl border border-gray-100 p-6"
                        >
                            <h2 className="font-semibold text-gray-900 text-lg mb-3">
                                About this business
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {business.description}
                            </p>
                        </motion.div>

                        {/* Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl border border-gray-100 p-6"
                        >
                            <h2 className="font-semibold text-gray-900 text-lg mb-4">
                                Business details
                            </h2>
                            <div className="flex flex-col gap-4">

                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-[#2947b5]/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-4 h-4 text-[#2947b5]" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs">Address</p>
                                        <p className="text-gray-900 text-sm font-medium">
                                            {business.address}, {business.city}, {business.state} {business.pincode}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-[#2947b5]/10 flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-4 h-4 text-[#2947b5]" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs">Phone</p>
                                        <a href={`tel:${business.phone}`} className="text-gray-900 text-sm font-medium hover:text-[#2947b5] transition-colors">
                                            {business.phone}
                                        </a>
                                    </div>
                                </div>

                                {business.email && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-[#2947b5]/10 flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-4 h-4 text-[#2947b5]" />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs">Email</p>
                                            <a href={`mailto:${business.email}`} className="text-gray-900 text-sm font-medium hover:text-[#2947b5] transition-colors">
                                                {business.email}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {business.website && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-[#2947b5]/10 flex items-center justify-center flex-shrink-0">
                                            <Globe className="w-4 h-4 text-[#2947b5]" />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs">Website</p>
                                            <a href={`https://${business.website}`} target="_blank" rel="noopener noreferrer" className="text-gray-900 text-sm font-medium hover:text-[#2947b5] transition-colors flex items-center gap-1">
                                                {business.website}
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {business.timings && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-[#2947b5]/10 flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-4 h-4 text-[#2947b5]" />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs">Timings</p>
                                            <p className="text-gray-900 text-sm font-medium">
                                                {business.timings}
                                            </p>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </motion.div>

                        {/* Map */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl border border-gray-100 p-6"
                        >
                            <h2 className="font-semibold text-gray-900 text-lg mb-4">
                                Location
                            </h2>
                            <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center">
                                <div className="text-center">
                                    <MapPin className="w-8 h-8 text-[#2947b5] mx-auto mb-2" />
                                    <p className="text-gray-500 text-sm">
                                        {business.city}, {business.state}
                                    </p>
                                    <a href={`https://maps.google.com/?q=${business.lat},${business.lng}`} target="_blank" rel="noopener noreferrer" className="text-[#2947b5] text-xs font-medium hover:underline mt-1 inline-block">
                                        Open in Google Maps →
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                    </div>

                    {/* Right */}
                    <div className="flex flex-col gap-4">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < Math.floor(business.rating)
                                                    ? "text-[#ff6b35] fill-[#ff6b35]"
                                                    : "text-gray-200 fill-gray-200"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-gray-500 text-sm">
                                    {business.rating} ({business.reviewCount})
                                </span>
                            </div>

                            <a href={`tel:${business.phone}`} className="w-full bg-[#2947b5] hover:bg-[#1e3a9e] text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium text-sm transition-colors mb-3">
                                <Phone className="w-4 h-4" />
                                Call Now
                            </a>

                            {business.email && (
                                <a href={`mailto:${business.email}`} className="w-full bg-gray-50 hover:bg-gray-100 text-gray-900 py-3 rounded-xl flex items-center justify-center gap-2 font-medium text-sm transition-colors mb-3 border border-gray-200">
                                    <Mail className="w-4 h-4" />
                                    Send Email
                                </a>
                            )}

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setSaved(!saved)}
                                    className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium border transition-colors ${saved
                                            ? "bg-red-50 border-red-200 text-red-500"
                                            : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    <Heart className={`w-4 h-4 ${saved ? "fill-red-500 text-red-500" : ""}`} />
                                    {saved ? "Saved" : "Save"}
                                </button>
                                <button
                                    onClick={() => navigator.share?.({ title: business.name, url: window.location.href })}
                                    className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                    <Share2 className="w-4 h-4" />
                                    Share
                                </button>
                            </div>

                            {business.isVerified && (
                                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2 text-green-600">
                                    <BadgeCheck className="w-4 h-4" />
                                    <span className="text-xs font-medium">Verified business</span>
                                </div>
                            )}

                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    )
}