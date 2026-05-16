"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Testimonial } from "@/types"

interface TestimonialCardProps {
  testimonial: Testimonial
  index: number
}

export default function TestimonialCard({
  testimonial,
  index,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* Quote icon */}
      <div className="w-10 h-10 rounded-xl bg-[#2947b5]/10 flex items-center justify-center mb-4">
        <Quote className="w-5 h-5 text-[#2947b5]" />
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 text-[#ff6b35] fill-[#ff6b35]"
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-6">
        "{testimonial.quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
        <div className="w-10 h-10 rounded-full bg-[#2947b5] flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-bold">
            {testimonial.avatar}
          </span>
        </div>
        <div>
          <p className="text-gray-900 font-semibold text-sm">
            {testimonial.name}
          </p>
          <p className="text-gray-400 text-xs">
            {testimonial.business} · {testimonial.city}
          </p>
        </div>
      </div>
    </motion.div>
  )
}