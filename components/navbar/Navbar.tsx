 "use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, MapPin, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NAV_LINKS } from "@/lib/constants"
import { User as FirebaseUser } from "firebase/auth"

interface MobileMenuProps {
    isOpen: boolean
    onClose: () => void
    user: FirebaseUser | null
    onLogout: () => void
}

export default function MobileMenu({
    isOpen,
    onClose,
    user,
    onLogout,
}: MobileMenuProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-white flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 bg-[#2947b5] rounded-lg">
                            <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-gray-900">ListMyIndia</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* User info if logged in */}
                {user && (
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                        {user.photoURL ? (
                            <Image
                                src={user.photoURL}
                                alt={user.displayName || "User"}
                                width={36}
                                height={36}
                                className="rounded-full"
                            />
                        ) : (
                            <div className="w-9 h-9 rounded-full bg-[#2947b5] flex items-center justify-center">
                                <span className="text-white text-sm font-bold">
                                    {user.displayName?.[0] || user.email?.[0] || "U"}
                                </span>
                            </div>
                        )}
                        <div>
                            <p className="text-gray-900 font-medium text-sm">
                                {user.displayName || "User"}
                            </p>
                            <p className="text-gray-400 text-xs truncate">{user.email}</p>
                        </div>
                    </div>
                )}

                {/* Nav links */}
                <nav className="flex flex-col px-4 py-6 gap-1 flex-1">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onClose}
                            className="px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:text-[#2947b5] transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}

                    {user && (
                        <Link
                            href="/dashboard"
                            onClick={onClose}
                            className="px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:text-[#2947b5] transition-colors flex items-center gap-2"
                        >
                            <User className="w-4 h-4" />
                            Dashboard
                        </Link>
                    )}
                </nav>

                {/* Bottom */}
                <div className="px-6 py-6 border-t border-gray-100 flex flex-col gap-3">
                    {user ? (
                        <button
                            onClick={() => { onLogout(); onClose() }}
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-colors text-sm font-medium"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign out
                        </button>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                onClick={onClose}
                                className="w-full flex items-center justify-center py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
                            >
                                Sign in
                            </Link>
                            <Button
                                asChild
                                className="w-full bg-[#ff6b35] hover:bg-[#e55a26] text-white"
                            >
                                <Link href="/register" onClick={onClose}>
                                    List Your Business Free
                                </Link>
                            </Button>
                        </>
                    )}
                </div>

            </div>
        </div>
    )
}