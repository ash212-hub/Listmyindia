"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import CategoryCard from "./CategoryCard"
import { categories } from "@/lib/mock-data/categories"

export default function CategoryGrid() {
    const [showAll, setShowAll] = useState(false)
    const visible = showAll ? categories : categories.slice(0, 12)

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-[#ff6b35] text-sm font-semibold uppercase tracking-wider">
                        Browse by category
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
                        What are you looking for?
                    </h2>
                    <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                        From restaurants to doctors, find any business in your area instantly.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {visible.map((category, index) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            index={index}
                        />
                    ))}
                </div>

                {/* Show more */}
                {!showAll && categories.length > 12 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex justify-center mt-10"
                    >
                        <Button
                            variant="outline"
                            onClick={() => setShowAll(true)}
                            className="flex items-center gap-2 border-[#2947b5] text-[#2947b5] hover:bg-[#2947b5] hover:text-white px-8 py-3 rounded-xl"
                        >
                            View all categories
                            <ChevronDown className="w-4 h-4" />
                        </Button>
                    </motion.div>
                )}

            </div>
        </section>
    )
}