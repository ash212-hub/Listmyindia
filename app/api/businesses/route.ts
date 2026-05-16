import { NextRequest, NextResponse } from "next/server"
import { featuredBusinesses } from "@/lib/mock-data/businesses"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const location = searchParams.get("location")?.toLowerCase() || ""
  const category = searchParams.get("category")?.toLowerCase() || ""
  const pincode = searchParams.get("pincode") || ""

  let results = [...featuredBusinesses]

  // filter by location
  if (location) {
    results = results.filter(
      (b) =>
        b.city.toLowerCase().includes(location) ||
        b.address.toLowerCase().includes(location) ||
        b.pincode.includes(location)
    )
  }

  // filter by pincode
  if (pincode) {
    results = results.filter((b) => b.pincode.includes(pincode))
  }

  // filter by category
  if (category) {
    results = results.filter(
      (b) =>
        b.category.toLowerCase().includes(category) ||
        b.subcategory?.toLowerCase().includes(category)
    )
  }

  // if no filters return all featured
  if (!location && !category && !pincode) {
    results = featuredBusinesses
  }

  return NextResponse.json({
    businesses: results,
    total: results.length,
    location,
    category,
  })
}