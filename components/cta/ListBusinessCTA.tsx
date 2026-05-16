"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  BadgeCheck,
  TrendingUp,
  Users,
  Zap,
  ArrowRight,
  Star,
} from "lucide-react"

const benefits = [
  {
    icon: BadgeCheck,
    title: "Free to list",
    description: "No setup fees, no hidden charges. Get online instantly for free.",
  },
  {
    icon: Users,
    title: "Reach more customers",
    description: "Get discovered by thousands of customers searching in your area.",
  },
  {
    icon: TrendingUp,
    title: "Grow your revenue",
    description: "Businesses on ListMyIndia report up to 40% increase in new customers.",
  },
  {
    icon: Zap,
    title: "Instant visibility",
    description: "Your listing goes live immediately. Start getting calls the same day.",
  },
]

export default function ListBusinessCTA() {
  return (
    <section className="py-20 bg-[#0a0f2e] relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2947b5]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff6b35]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#ff6b35] text-sm font-semibold uppercase tracking-wider">
              For business owners
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4 leading-tight">
              Put your business on
              <span className="text-[#ff6b35]"> India's map</span>
            </h2>
            <p className="text-white/60 text-base mb-8 leading-relaxed">
              Join lakhs of businesses already growing with ListMyIndia.
              Get found by customers in your pincode and beyond.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#2947b5]/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#ff6b35]" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm mb-0.5">
                        {benefit.title}
                      </p>
                      <p className="text-white/50 text-xs leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                className="bg-[#ff6b35] hover:bg-[#e55a26] text-white px-8 py-3 rounded-xl flex items-center gap-2 font-medium"
              >
                <Link href="/register">
                  List your business free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-xl"
              >
                <Link href="/plans">View plans</Link>
              </Button>
            </div>
          </motion.div>

          {/* Right — social proof card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            {/* Big stat */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <div className="text-6xl font-bold text-white mb-2">
                1.6M<span className="text-[#ff6b35]">+</span>
              </div>
              <p className="text-white/60 text-sm">
                Businesses already listed across India
              </p>
              <div className="flex justify-center gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-[#ff6b35] fill-[#ff6b35]"
                  />
                ))}
              </div>
              <p className="text-white/40 text-xs mt-2">
                Rated 4.8/5 by business owners
              </p>
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-[#ff6b35] mb-1">
                  19,300+
                </div>
                <p className="text-white/50 text-xs">Pincodes covered</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-[#ff6b35] mb-1">
                  500+
                </div>
                <p className="text-white/50 text-xs">Cities across India</p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-around">
              <div className="text-center">
                <BadgeCheck className="w-8 h-8 text-[#2947b5] mx-auto mb-1" />
                <p className="text-white/60 text-xs">Verified listings</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <Zap className="w-8 h-8 text-[#ff6b35] mx-auto mb-1" />
                <p className="text-white/60 text-xs">Instant go-live</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-[#2947b5] mx-auto mb-1" />
                <p className="text-white/60 text-xs">Track performance</p>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}