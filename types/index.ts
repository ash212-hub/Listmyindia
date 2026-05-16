export interface Business {
  id: string
  name: string
  category: string
  subcategory?: string
  description: string
  address: string
  city: string
  state: string
  pincode: string
  phone: string
  email?: string
  website?: string
  rating: number
  reviewCount: number
  isVerified: boolean
  isFeatured: boolean
  images: string[]
  lat: number
  lng: number
  openNow?: boolean
  timings?: string
}

export interface Category {
  id: string
  name: string
  icon: string
  count: number
  slug: string
}

export interface City {
  id: string
  name: string
  state: string
  pincode: string
  lat: number
  lng: number
}

export interface Testimonial {
  id: string
  name: string
  business: string
  city: string
  quote: string
  rating: number
  avatar: string
}

export interface SearchParams {
  location: string
  category: string
  pincode?: string
}