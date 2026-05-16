export interface GeoLocation {
  lat: number
  lng: number
  city: string
  state: string
}

export async function geocodeCity(input: string): Promise<GeoLocation | null> {
  try {
    const query = encodeURIComponent(`${input}, India`)
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1&countrycodes=in`,
      {
        headers: {
          "User-Agent": "ListMyIndia/1.0"
        }
      }
    )
    const data = await res.json()

    if (!data || data.length === 0) return null

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
      city: input,
      state: data[0].display_name.split(",").slice(-2)[0].trim(),
    }
  } catch (error) {
    console.error("Geocoding failed:", error)
    return null
  }
}