import { NextResponse } from "next/server"
import { categories, allCategories } from "@/lib/mock-data/categories"

export async function GET() {
  return NextResponse.json({
    featured: categories,
    all: allCategories,
    total: allCategories.length,
  })
}