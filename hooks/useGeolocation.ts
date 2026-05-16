import { useState, useEffect } from "react"

interface GeolocationState {
  lat: number | null
  lng: number | null
  city: string | null
  error: string | null
  loading: boolean
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    lat: null,
    lng: null,
    city: null,
    error: null,
    loading: false,
  })

  const getLocation = () => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        error: "Geolocation is not supported by your browser",
      }))
      return
    }

    setState((prev) => ({ ...prev, loading: true }))

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            {
              headers: { "User-Agent": "ListMyIndia/1.0" },
            }
          )
          const data = await res.json()
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            "Your Location"

          setState({
            lat: latitude,
            lng: longitude,
            city,
            error: null,
            loading: false,
          })
        } catch {
          setState({
            lat: latitude,
            lng: longitude,
            city: "Your Location",
            error: null,
            loading: false,
          })
        }
      },
      (error) => {
        setState({
          lat: null,
          lng: null,
          city: null,
          error: error.message,
          loading: false,
        })
      }
    )
  }

  return { ...state, getLocation }
}