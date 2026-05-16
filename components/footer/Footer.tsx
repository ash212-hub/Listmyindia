"use client"

import Link from "next/link"
import { MapPin, Phone, Mail, Globe } from "lucide-react"
import { SOCIAL_LINKS, CONTACT } from "@/lib/constants"

const footerLinks = {
    forBusinesses: [
        { label: "List Your Business", href: "/register" },
        { label: "Plans & Pricing", href: "/plans" },
        { label: "Advertise", href: "/advertise" },
        { label: "Become a Partner", href: "/growth-partner" },
        { label: "Free Listing", href: "/free-listing" },
    ],

    forCustomers: [
        { label: "Find Businesses", href: "/" },
        { label: "Browse Categories", href: "/categories" },
        { label: "Browse by Pincode", href: "/pincodes" },
        { label: "Search", href: "/search" },
        { label: "Blog", href: "/blog" },
    ],

    company: [
        { label: "About Us", href: "/about" },
        { label: "Success Stories", href: "/success-stories" },
        { label: "Contact Us", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
    ],
}

const socials = [
    {
        name: "WhatsApp",
        href: SOCIAL_LINKS.whatsapp,
        hover: "hover:bg-[#25D366]",
        svg: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.127 1.535 5.864L.057 23.882l6.19-1.623A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.933a9.914 9.914 0 01-5.058-1.383l-.361-.214-3.754.984.999-3.648-.235-.374A9.918 9.918 0 012.067 12C2.067 6.512 6.512 2.067 12 2.067S21.933 6.512 21.933 12 17.488 21.933 12 21.933z" />
            </svg>
        ),
    },

    {
        name: "Instagram",
        href: SOCIAL_LINKS.instagram,
        hover: "hover:bg-[#E1306C]",
        svg: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
            </svg>
        ),
    },

    {
        name: "LinkedIn",
        href: SOCIAL_LINKS.linkedin,
        hover: "hover:bg-[#0A66C2]",
        svg: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z" />
            </svg>
        ),
    },
]

export default function Footer() {
    return (
        <footer className="bg-[#0a0f2e] text-white">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

                    {/* Brand */}
                    <div className="lg:col-span-2">

                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-[#2947b5] rounded-lg flex items-center justify-center">
                                <MapPin className="w-4 h-4 text-white" />
                            </div>

                            <span className="font-bold text-lg">
                                ListMyIndia
                            </span>
                        </Link>

                        <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
                            India's fastest-growing local business directory.
                            Connecting customers with verified businesses
                            across 19,300+ pincodes.
                        </p>

                        {/* Contact */}
                        <div className="flex flex-col gap-3 mb-6">

                            <a
                                href={`tel:${CONTACT.phone}`}
                                className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors"
                            >
                                <Phone className="w-4 h-4 text-[#ff6b35]" />
                                {CONTACT.phone}
                            </a>

                            <a
                                href={`mailto:${CONTACT.email}`}
                                className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors"
                            >
                                <Mail className="w-4 h-4 text-[#ff6b35]" />
                                {CONTACT.email}
                            </a>

                            <div className="flex items-center gap-2 text-white/50 text-sm">
                                <Globe className="w-4 h-4 text-[#ff6b35]" />
                                {CONTACT.website}
                            </div>

                        </div>

                        {/* Socials */}
                        <div className="flex gap-3 flex-wrap">

                            {socials.map((s) => (
                                <a
                                    key={s.name}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={s.name}
                                    className={`w-9 h-9 rounded-lg bg-white/10 ${s.hover} flex items-center justify-center text-white/60 hover:text-white transition-all duration-200`}
                                >
                                    {s.svg}
                                </a>
                            ))}

                        </div>

                    </div>

                    {/* For Businesses */}
                    <div>
                        <h4 className="font-semibold text-sm mb-5">
                            For Businesses
                        </h4>

                        <ul className="flex flex-col gap-3">
                            {footerLinks.forBusinesses.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/50 hover:text-white text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* For Customers */}
                    <div>
                        <h4 className="font-semibold text-sm mb-5">
                            For Customers
                        </h4>

                        <ul className="flex flex-col gap-3">
                            {footerLinks.forCustomers.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/50 hover:text-white text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-semibold text-sm mb-5">
                            Company
                        </h4>

                        <ul className="flex flex-col gap-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/50 hover:text-white text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

            </div>

            {/* Bottom */}
            <div className="border-t border-white/10">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">

                    <p className="text-white/40 text-xs">
                        © 2025 ListMyIndia. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">

                        <Link
                            href="/privacy"
                            className="text-white/40 hover:text-white text-xs transition-colors"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms"
                            className="text-white/40 hover:text-white text-xs transition-colors"
                        >
                            Terms of Service
                        </Link>

                        <Link
                            href="/contact"
                            className="text-white/40 hover:text-white text-xs transition-colors"
                        >
                            Contact
                        </Link>

                    </div>

                </div>

            </div>

        </footer>
    )
}