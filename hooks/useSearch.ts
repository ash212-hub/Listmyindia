import { useState } from "react"
import { Business, SearchParams } from "@/types"
import { geocodeCity } from "@/lib/geocode"

interface SearchState {
  results: Business[]
  loading: boolean
  error: string | null
  location: string
  category: string
  lat: number | null
  lng: number | null
  hasSearched: boolean
}

export function useSearch() {
  const [state, setState] = useState<SearchState>({
    results: [],
    loading: false,
    error: null,
    location: "",
    category: "",
    lat: null,
    lng: null,
    hasSearched: false,
  })

  const search = async (params: SearchParams) => {
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
      location: params.location,
      category: params.category,
    }))

    try {
      // geocode the city for globe animation
      const geo = await geocodeCity(params.location)

      // fetch from our api route
      const query = new URLSearchParams({
        location: params.location,
        category: params.category,
        ...(params.pincode && { pincode: params.pincode }),
      })

      const res = await fetch(`/api/businesses?${query}`)
      const data = await res.json()

      setState((prev) => ({
        ...prev,
        results: data.businesses || [],
        loading: false,
        hasSearched: true,
        lat: geo?.lat || null,
        lng: geo?.lng || null,
      }))
    } catch {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Something went wrong. Please try again.",
        hasSearched: true,
      }))
    }
  }

  const reset = () => {
    setState({
      results: [],
      loading: false,
      error: null,
      location: "",
      category: "",
      lat: null,
      lng: null,
      hasSearched: false,
    })
  }

  return { ...state, search, reset }
}