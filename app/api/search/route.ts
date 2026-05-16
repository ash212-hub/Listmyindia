import { NextRequest, NextResponse } from "next/server"
import { featuredBusinesses } from "@/lib/mock-data/businesses"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get("q")?.toLowerCase() || ""

  if (!q) {
    return NextResponse.json({ businesses: [], total: 0 })
  }

  const results = featuredBusinesses.filter(
    (b) =>
      b.name.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.city.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.pincode.includes(q)
  )

  return NextResponse.json({
    businesses: results,
    total: results.length,
    query: q,
  })
}