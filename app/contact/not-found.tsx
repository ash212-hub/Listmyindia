"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, Home, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0a0f2e] flex items-center justify-center px-4 relative overflow-hidden">

            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#2947b5]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff6b35]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center relative z-10 max-w-lg mx-auto">

                {/* 404 number */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative mb-6"
                >
                    <div className="text-[160px] font-bold text-white/5 leading-none select-none">
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-2xl bg-[#2947b5]/20 border border-[#2947b5]/30 flex items-center justify-center">
                            <MapPin className="w-12 h-12 text-[#ff6b35]" />
                        </div>
                    </div>
                </motion.div>

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                        Location not found
                    </h1>
                    <p className="text-white/50 text-base mb-10 leading-relaxed">
                        Looks like this page wandered off the map. Let's get you back on track.
                    </p>
                </motion.div>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Button
                        asChild
                        className="bg-[#ff6b35] hover:bg-[#e55a26] text-white px-8 py-3 rounded-xl flex items-center gap-2"
                    >
                        <Link href="/">
                            <Home className="w-4 h-4" />
                            Go Home
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-xl flex items-center gap-2"
                    >
                        <Link href="/search">
                            <Search className="w-4 h-4" />
                            Search Businesses
                        </Link>
                    </Button>
                </motion.div>

                {/* Back link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-8"
                >
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go back to previous page
                    </button>
                </motion.div>

            </div>
        </div>
    )
}