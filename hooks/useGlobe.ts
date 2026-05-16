 "use client"

import { useRef, useEffect, useCallback } from "react"

interface GlobePoint {
  lat: number
  lng: number
  label: string
  category?: string
}

interface UseGlobeProps {
  containerId: string
}

export function useGlobe({ containerId }: UseGlobeProps) {
  const globeRef = useRef<any>(null)
  const pointsRef = useRef<GlobePoint[]>([])

  const initGlobe = useCallback(async () => {
    if (typeof window === "undefined") return
    if (globeRef.current) return

    const container = document.getElementById(containerId)
    if (!container) return

    const GlobeModule = await import("globe.gl")
    const Globe = GlobeModule.default || GlobeModule
    const globe = new (Globe as any)(container)
      .globeImageUrl(
        "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      )
      .bumpImageUrl(
        "//unpkg.com/three-globe/example/img/earth-topology.png"
      )
      .backgroundImageUrl(
        "//unpkg.com/three-globe/example/img/night-sky.png"
      )
      .showAtmosphere(true)
      .atmosphereColor("#3a86ff")
      .atmosphereAltitude(0.25)
      .pointsData([])
      .pointLat("lat")
      .pointLng("lng")
      .pointColor(() => "#ff6b35")
      .pointAltitude(0.01)
      .pointRadius(0.5)
      .ringsData([])
      .ringLat("lat")
      .ringLng("lng")
      .ringColor(() => () => "#ff6b35")
      .ringMaxRadius(5)
      .ringPropagationSpeed(3)
      .ringRepeatPeriod(800)
      .labelsData([])
      .labelLat("lat")
      .labelLng("lng")
      .labelText("label")
      .labelSize(1.2)
      .labelColor(() => "#ffffff")
      .labelDotRadius(0.4)

    globe.controls().autoRotate = true
    globe.controls().autoRotateSpeed = 0.5
    globe.controls().enableZoom = false
    globe.pointOfView({ lat: 20.5937, lng: 78.9629, altitude: 2.5 }, 0)

    globeRef.current = globe

    const handleResize = () => {
      if (container) {
        globe.width(container.clientWidth)
        globe.height(container.clientHeight)
      }
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [containerId])

  const flyTo = useCallback(
    (lat: number, lng: number, label: string, category?: string) => {
      if (!globeRef.current) return

      globeRef.current.controls().autoRotate = false

      globeRef.current.pointOfView(
        { lat, lng, altitude: 1.2 },
        1500
      )

      const point: GlobePoint = { lat, lng, label, category }
      pointsRef.current = [point]

      globeRef.current.pointsData([point])
      globeRef.current.ringsData([point])
      globeRef.current.labelsData([point])
    },
    []
  )

  const resetGlobe = useCallback(() => {
    if (!globeRef.current) return

    globeRef.current.pointsData([])
    globeRef.current.ringsData([])
    globeRef.current.labelsData([])
    globeRef.current.pointOfView(
      { lat: 20.5937, lng: 78.9629, altitude: 2.5 },
      1000
    )
    globeRef.current.controls().autoRotate = true
  }, [])

  useEffect(() => {
    initGlobe()
  }, [initGlobe])

  return { flyTo, resetGlobe, globeRef }
}