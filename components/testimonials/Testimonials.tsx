"use client"

import { motion } from "framer-motion"
import TestimonialCard from "./TestimonialCard"
import { testimonials } from "@/lib/mock-data/testimonials"

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#ff6b35] text-sm font-semibold uppercase tracking-wider">
            Success stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
            Businesses that grew with us
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Real stories from real business owners across India who found new
            customers through ListMyIndia.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Bottom stat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 bg-gray-50 rounded-2xl p-8 text-center"
        >
          <div className="flex flex-wrap justify-center gap-12">
            <div>
              <div className="text-3xl font-bold text-[#2947b5]">4.8/5</div>
              <div className="text-gray-500 text-sm mt-1">
                Average business rating
              </div>
            </div>
            <div className="w-px bg-gray-200 hidden sm:block" />
            <div>
              <div className="text-3xl font-bold text-[#2947b5]">40%</div>
              <div className="text-gray-500 text-sm mt-1">
                Average revenue increase
              </div>
            </div>
            <div className="w-px bg-gray-200 hidden sm:block" />
            <div>
              <div className="text-3xl font-bold text-[#2947b5]">2 min</div>
              <div className="text-gray-500 text-sm mt-1">
                To list your business
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}