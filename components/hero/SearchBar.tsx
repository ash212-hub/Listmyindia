"use client"

import { useState } from "react"
import { Search, MapPin, Loader2, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { categories } from "@/lib/mock-data/categories"
import { useGeolocation } from "@/hooks/useGeolocation"
import { SearchParams } from "@/types"

interface SearchBarProps {
    onSearch: (params: SearchParams) => void
    loading?: boolean
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
    const [location, setLocation] = useState("")
    const [category, setCategory] = useState("")
    const { getLocation, city, loading: geoLoading } = useGeolocation()

    const handleDetectLocation = async () => {
        await getLocation()
        if (city) setLocation(city)
    }

    const handleSearch = () => {
        if (!location.trim()) return
        onSearch({ location: location.trim(), category })
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSearch()
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3">

                {/* Location Input */}
                <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                    <input
                        type="text"
                        placeholder="City, area or pincode..."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-transparent pl-9 pr-10 py-3 text-white placeholder:text-white/50 outline-none text-sm"
                    />
                    <button
                        onClick={handleDetectLocation}
                        disabled={geoLoading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                        title="Detect my location"
                    >
                        {geoLoading ? (
                            <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                        ) : (
                            <Navigation className="w-3.5 h-3.5 text-white" />
                        )}
                    </button>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px bg-white/20" />

                {/* Category Select */}
                <div className="relative flex-1">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-transparent py-3 px-3 text-white/80 outline-none text-sm appearance-none cursor-pointer"
                    >
                        <option value="" className="text-gray-900">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.slug} className="text-gray-900">
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Search Button */}
                <Button
                    onClick={handleSearch}
                    disabled={loading || !location.trim()}
                    className="bg-[#ff6b35] hover:bg-[#e55a26] text-white px-6 py-3 rounded-xl flex items-center gap-2 font-medium"
                >
                    {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Search className="w-4 h-4" />
                    )}
                    Search
                </Button>

            </div>

            {/* Quick category pills */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {["Restaurants", "Doctors", "Salons", "Pharmacies", "Hotels", "Gyms"].map(
                    (quick) => (
                        <button
                            key={quick}
                            onClick={() => {
                                setCategory(quick.toLowerCase())
                                if (location) onSearch({ location, category: quick.toLowerCase() })
                            }}
                            className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 text-xs font-medium border border-white/20 transition-colors"
                        >
                            {quick}
                        </button>
                    )
                )}
            </div>
        </div>
    )
}