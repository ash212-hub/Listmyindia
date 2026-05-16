"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Category } from "@/types"
import * as Icons from "lucide-react"

interface CategoryCardProps {
  category: Category
  index: number
}

export default function CategoryCard({ category, index }: CategoryCardProps) {
  const iconName = category.icon
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("") as keyof typeof Icons

  const Icon = (Icons[iconName] as React.ElementType) || Icons.Grid

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        href={`/search?category=${category.slug}`}
        className="group flex flex-col items-center gap-3 p-4 rounded-2xl border border-gray-100 bg-white hover:border-[#2947b5]/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
      >
        <div className="w-12 h-12 rounded-xl bg-[#2947b5]/10 group-hover:bg-[#2947b5] flex items-center justify-center transition-colors duration-300">
          <Icon className="w-6 h-6 text-[#2947b5] group-hover:text-white transition-colors duration-300" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-800 group-hover:text-[#2947b5] transition-colors leading-tight">
            {category.name}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {category.count.toLocaleString()}+
          </p>
        </div>
      </Link>
    </motion.div>
  )
}