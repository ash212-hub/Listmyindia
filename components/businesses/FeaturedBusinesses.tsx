"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import BusinessCard from "./BusinessCard"
import { featuredBusinesses } from "@/lib/mock-data/businesses"

export default function FeaturedBusinesses() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="text-[#ff6b35] text-sm font-semibold uppercase tracking-wider">
              Featured listings
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              Popular businesses
            </h2>
            <p className="text-gray-500 mt-2">
              Verified and trusted businesses across India
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-[#2947b5] text-[#2947b5] hover:bg-[#2947b5] hover:text-white flex items-center gap-2 self-start sm:self-auto"
          >
            <Link href="/search">
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBusinesses.map((business, index) => (
            <BusinessCard
              key={business.id}
              business={business}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  )
}