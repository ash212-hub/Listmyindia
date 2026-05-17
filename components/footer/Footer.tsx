"use client"

import Link from "next/link"
import { MapPin, Phone, Mail, Globe } from "lucide-react"
import { SOCIAL_LINKS, CONTACT } from "@/lib/constants"
import Image from "next/image"
import { FaWhatsapp, FaInstagram, FaXTwitter, FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa6"

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
        icon: <FaWhatsapp className="w-4 h-4" />,
    },
    {
        name: "Instagram",
        href: SOCIAL_LINKS.instagram,
        hover: "hover:bg-[#E1306C]",
        icon: <FaInstagram className="w-4 h-4" />,
    },
    {
        name: "Twitter/X",
        href: SOCIAL_LINKS.twitter,
        hover: "hover:bg-black",
        icon: <FaXTwitter className="w-4 h-4" />,
    },
    {
        name: "Facebook",
        href: SOCIAL_LINKS.facebook,
        hover: "hover:bg-[#1877F2]",
        icon: <FaFacebook className="w-4 h-4" />,
    },
    {
        name: "YouTube",
        href: SOCIAL_LINKS.youtube,
        hover: "hover:bg-[#FF0000]",
        icon: <FaYoutube className="w-4 h-4" />,
    },
    {
        name: "LinkedIn",
        href: SOCIAL_LINKS.linkedin,
        hover: "hover:bg-[#0A66C2]",
        icon: <FaLinkedin className="w-4 h-4" />,
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


                            <span className="font-bold text-lg">

                                <Image
                                    src="/listmyindialogo.png"
                                    alt="Verified"
                                    width={150}
                                    height={30}
                                />
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
                                <Link
                                    key={s.name}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={s.name}
                                    className={`w-9 h-9 rounded-lg bg-white/10 ${s.hover} flex items-center justify-center text-white/60 hover:text-white transition-all duration-200`}
                                >
                                    {s.icon}
                                </Link>
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

        </footer >
    )
}