"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Building2, MapPin, Globe, Users } from "lucide-react"

const stats = [
  {
    icon: Building2,
    value: 1600000,
    display: "1.6M+",
    label: "Business Listings",
    color: "text-[#2947b5]",
    bg: "bg-[#2947b5]/10",
  },
  {
    icon: MapPin,
    value: 19300,
    display: "19,300+",
    label: "Pincodes Covered",
    color: "text-[#ff6b35]",
    bg: "bg-[#ff6b35]/10",
  },
  {
    icon: Globe,
    value: 500,
    display: "500+",
    label: "Cities",
    color: "text-[#2947b5]",
    bg: "bg-[#2947b5]/10",
  },
  {
    icon: Users,
    value: 1000000,
    display: "10L+",
    label: "Happy Customers",
    color: "text-[#ff6b35]",
    bg: "bg-[#ff6b35]/10",
  },
]

function AnimatedNumber({ display }: { display: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isInView) {
      setTimeout(() => setShow(true), 200)
    }
  }, [isInView])

  return (
    <span ref={ref} className="tabular-nums">
      {show ? display : "0"}
    </span>
  )
}

export default function StatsBar() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div className={`text-3xl sm:text-4xl font-bold ${stat.color} mb-1`}>
                  <AnimatedNumber display={stat.display} />
                </div>
                <div className="text-gray-500 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}