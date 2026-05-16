 "use client"

import { useEffect, useRef } from "react"
import { useGlobe } from "@/hooks/useGlobe"

interface GlobeAnimationProps {
  flyToLocation?: {
    lat: number
    lng: number
    label: string
    category?: string
  } | null
}

export default function GlobeAnimation({ flyToLocation }: GlobeAnimationProps) {
  const { flyTo, resetGlobe } = useGlobe({ containerId: "globe-container" })
  const prevLocationRef = useRef<string | null>(null)

  useEffect(() => {
    if (!flyToLocation) {
      resetGlobe()
      prevLocationRef.current = null
      return
    }

    const key = `${flyToLocation.lat}-${flyToLocation.lng}`
    if (prevLocationRef.current === key) return
    prevLocationRef.current = key

    flyTo(
      flyToLocation.lat,
      flyToLocation.lng,
      flyToLocation.label,
      flyToLocation.category
    )
  }, [flyToLocation, flyTo, resetGlobe])

  return (
    <div className="relative w-full h-full">
      <div
        id="globe-container"
        className="w-full h-full"
        style={{ background: "transparent" }}
      />
      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0f2e] to-transparent pointer-events-none" />
    </div>
  )
}