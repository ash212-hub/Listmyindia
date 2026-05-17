"use client"

import { useEffect } from "react"
import Link from "next/link"
import { X, MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { NAV_LINKS } from "@/lib/constants"

interface MobileMenuProps {
    isOpen: boolean
    onClose: () => void
}

export default function MobileMenu({
    isOpen,
    onClose,
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

    return (
        <AnimatePresence>

            {isOpen && (

                <div className="fixed inset-0 z-50 md:hidden">

                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Menu Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 25,
                        }}
                        className="absolute right-0 top-0 bottom-0 w-72 bg-white flex flex-col shadow-2xl"
                    >

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">

                            <div className="flex items-center gap-2">

                                <div className="flex items-center justify-center w-8 h-8 bg-[#2947b5] rounded-lg">
                                    <MapPin className="w-4 h-4 text-white" />
                                </div>

                                <span className="font-semibold text-gray-900">
                                    ListMyIndia
                                </span>

                            </div>

                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                        </div>

                        {/* Links */}
                        <nav className="flex flex-col px-4 py-6 gap-1 flex-1">

                            {NAV_LINKS.map((link, index) => (

                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: index * 0.06,
                                    }}
                                >

                                    <Link
                                        href={link.href}
                                        onClick={onClose}
                                        className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:text-[#2947b5] transition-colors"
                                    >
                                        {link.label}
                                    </Link>

                                </motion.div>

                            ))}

                        </nav>

                        {/* Bottom CTA */}
                        <div className="px-6 py-6 border-t border-gray-100">

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >

                                <Button
                                    asChild
                                    className="w-full bg-[#ff6b35] hover:bg-[#e55a26] text-white"
                                >
                                    <Link href="/register" onClick={onClose}>
                                        List Your Business Free
                                    </Link>
                                </Button>

                            </motion.div>

                        </div>

                    </motion.div>

                </div>

            )}

        </AnimatePresence>
    )
}