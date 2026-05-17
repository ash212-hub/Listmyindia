 "use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Menu, MapPin, LogOut, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NAV_LINKS } from "@/lib/constants"
import { useAuth } from "@/hooks/useAuth"
import MobileMenu from "./MobileMenu"
import { usePathname } from "next/navigation"

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const { user, logout } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleLogout = async () => {
        await logout()
        setIsDropdownOpen(false)
        router.push("/")
    }

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
                    : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex items-center justify-center  bg-[#2947b5] rounded-lg p-2">
                                <Image
                                    src="/listmyindialogo.png"
                                    alt="ListMyIndia"
                                    width={90}
                                    height={70}
                                    className="text-white"
                                />
                            </div>



                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-8">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-sm font-medium transition-colors hover:text-[#2947b5] ${isScrolled || pathname !== "/"
                                        ? "text-gray-600"
                                        : "text-white/90"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Right side */}
                        <div className="flex items-center gap-3">

                            {user ? (
                                // Logged in — show user dropdown
                                <div className="hidden md:block relative">
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors ${isScrolled
                                            ? "hover:bg-gray-100"
                                            : "hover:bg-white/10"
                                            }`}
                                    >
                                        {user.photoURL ? (
                                            <Image
                                                src={user.photoURL}
                                                alt={user.displayName || "User"}
                                                width={28}
                                                height={28}
                                                className="rounded-full"
                                            />
                                        ) : (
                                            <div className="w-7 h-7 rounded-full bg-[#2947b5] flex items-center justify-center">
                                                <span className="text-white text-xs font-bold">
                                                    {user.displayName?.[0] || user.email?.[0] || "U"}
                                                </span>
                                            </div>
                                        )}
                                        <span
                                            className={`text-sm font-medium transition-colors ${isScrolled ? "text-gray-700" : "text-white"
                                                }`}
                                        >
                                            {user.displayName?.split(" ")[0] || "Account"}
                                        </span>
                                        <ChevronDown
                                            className={`w-4 h-4 transition-colors ${isScrolled ? "text-gray-500" : "text-white/70"
                                                }`}
                                        />
                                    </button>

                                    {/* Dropdown */}
                                    {isDropdownOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 z-50">
                                            <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                                <p className="text-gray-900 font-medium text-sm truncate">
                                                    {user.displayName || "User"}
                                                </p>
                                                <p className="text-gray-400 text-xs truncate">
                                                    {user.email}
                                                </p>
                                            </div>
                                            <Link
                                                href="/dashboard"
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                            >
                                                <User className="w-4 h-4" />
                                                Dashboard
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Sign out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // Not logged in — show login + list free
                                <div className="hidden md:flex items-center gap-3">
                                    <Link
                                        href="/login"
                                        className={`text-sm font-medium transition-colors hover:text-[#2947b5] ${isScrolled ? "text-gray-600" : "text-white/90"
                                            }`}
                                    >
                                        Sign in
                                    </Link>
                                    <Button
                                        asChild
                                        className="bg-[#ff6b35] hover:bg-[#e55a26] text-white text-sm px-4 py-2 rounded-lg"
                                    >
                                        <Link href="/register">List Free</Link>
                                    </Button>
                                </div>
                            )}

                            {/* Mobile toggle */}
                            <button
                                onClick={() => setIsMobileOpen(true)}
                                className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled ? "text-gray-700" : "text-white"
                                    }`}
                            >
                                <Menu className="w-5 h-5" />
                            </button>

                        </div>
                    </div>
                </div >
            </header >

            <MobileMenu
                isOpen={isMobileOpen}
                onClose={() => setIsMobileOpen(false)}
                user={user}
                onLogout={handleLogout}
            />
        </>
    )
}