"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Phone, Star, Clock, BadgeCheck } from "lucide-react"
import { Business } from "@/types"
import { Badge } from "@/components/ui/badge"

interface BusinessCardProps {
  business: Business
  index: number
}

export default function BusinessCard({ business, index }: BusinessCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        href={`/business/${business.id}`}
        className="group block bg-white rounded-2xl border border-gray-100 hover:border-[#2947b5]/30 hover:shadow-lg transition-all duration-300 overflow-hidden"
      >
        {/* Top color bar */}
        <div className="h-2 bg-gradient-to-r from-[#2947b5] to-[#ff6b35]" />

        <div className="p-5">

          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <h3 className="font-semibold text-gray-900 text-base truncate group-hover:text-[#2947b5] transition-colors">
                  {business.name}
                </h3>
                {business.isVerified && (
                  <BadgeCheck className="w-4 h-4 text-[#2947b5] flex-shrink-0" />
                )}
              </div>
              <Badge
                variant="secondary"
                className="text-xs bg-[#2947b5]/10 text-[#2947b5] border-0"
              >
                {business.category}
              </Badge>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg flex-shrink-0 ml-2">
              <Star className="w-3.5 h-3.5 text-green-600 fill-green-600" />
              <span className="text-green-700 text-sm font-semibold">
                {business.rating}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
            {business.description}
          </p>

          {/* Details */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <MapPin className="w-3.5 h-3.5 text-[#ff6b35] flex-shrink-0" />
              <span className="truncate">
                {business.address}, {business.city}
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Phone className="w-3.5 h-3.5 text-[#2947b5] flex-shrink-0" />
              <span>{business.phone}</span>
            </div>

            {business.timings && (
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <span>{business.timings}</span>
                <span
                  className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full ${
                    business.openNow
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-500"
                  }`}
                >
                  {business.openNow ? "Open Now" : "Closed"}
                </span>
              </div>
            )}
          </div>

          {/* Review count */}
          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              {business.reviewCount} reviews
            </span>
            <span className="text-xs font-medium text-[#2947b5] group-hover:underline">
              View details →
            </span>
          </div>

        </div>
      </Link>
    </motion.div>
  )
}