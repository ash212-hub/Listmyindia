"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NAV_LINKS } from "@/lib/constants"
import MobileMenu from "./MobileMenu"

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

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
                            <div className="flex items-center justify-center w-8 h-8 bg-[#2947b5] rounded-lg">
                                <MapPin className="w-4 h-4 text-white" />
                            </div>
                            <span
                                className={`font-semibold text-lg transition-colors ${isScrolled ? "text-gray-900" : "text-white"
                                    }`}
                            >
                                ListMyIndia
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-8">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-sm font-medium transition-colors hover:text-[#2947b5] ${isScrolled ? "text-gray-600" : "text-white/90"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* CTA + Mobile Toggle */}
                        <div className="flex items-center gap-3">
                            <Button
                                asChild
                                className="hidden md:flex bg-[#ff6b35] hover:bg-[#e55a26] text-white text-sm px-4 py-2 rounded-lg"
                            >
                                <Link href="/register">List Free</Link>
                            </Button>

                            <button
                                onClick={() => setIsMobileOpen(true)}
                                className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled ? "text-gray-700" : "text-white"
                                    }`}
                            >
                                <Menu className="w-5 h-5" />
                            </button>
                        </div>

                    </div>
                </div>
            </header>

            <MobileMenu
                isOpen={isMobileOpen}
                onClose={() => setIsMobileOpen(false)}
            />
        </>
    )
}