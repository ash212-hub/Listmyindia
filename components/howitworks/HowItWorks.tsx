"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
    Search,
    MapPin,
    Phone,
    Building2,
    Globe,
    TrendingUp,
} from "lucide-react"

const customerSteps = [
    {
        icon: MapPin,
        step: "01",
        title: "Enter your location",
        description:
            "Type your city, area, or pincode. Or let us detect your location automatically.",
    },
    {
        icon: Search,
        step: "02",
        title: "Search any business",
        description:
            "Browse by category or search directly. Find restaurants, doctors, salons and more near you.",
    },
    {
        icon: Phone,
        step: "03",
        title: "Connect instantly",
        description:
            "Get verified contact details, directions, timings and reviews. Connect with the business directly.",
    },
]

const businessSteps = [
    {
        icon: Building2,
        step: "01",
        title: "Register your business",
        description:
            "Sign up for free and add your business details, photos, timings and contact information.",
    },
    {
        icon: Globe,
        step: "02",
        title: "Get online visibility",
        description:
            "Your business appears in search results for customers in your area looking for your services.",
    },
    {
        icon: TrendingUp,
        step: "03",
        title: "Grow your customer base",
        description:
            "Receive calls, messages and walk-ins from new customers. Track your performance on the dashboard.",
    },
]

export default function HowItWorks() {
    const [active, setActive] = useState<"customer" | "business">("customer")
    const steps = active === "customer" ? customerSteps : businessSteps

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <span className="text-[#ff6b35] text-sm font-semibold uppercase tracking-wider">
                        Simple process
                    </span>
                    <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
                        How it works
                    </h2>
                    <p className="mt-3 text-gray-500 max-w-xl mx-auto">
                        Whether you're finding a business or listing one, it takes less than 2 minutes.
                    </p>
                </motion.div>

                {/* Toggle */}
                <div className="flex justify-center mb-12">
                    <div className="flex bg-gray-100 rounded-xl p-1">
                        <button
                            onClick={() => setActive("customer")}
                            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${active === "customer"
                                ? "bg-[#2947b5] text-white shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            For Customers
                        </button>
                        <button
                            onClick={() => setActive("business")}
                            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${active === "business"
                                ? "bg-[#2947b5] text-white shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            For Businesses
                        </button>
                    </div>
                </div>

                {/* Steps */}
                <div className="relative isolate">

                    {/* Animated connector — new glowing sweep */}
                    {/* Animated connector */}
                    <div className="hidden md:block absolute top-10 left-0 right-0 z-0 px-[calc(16.666%+40px)]">
                        <div className="flex items-center">

                            {/* Left line */}
                            <div className="flex-1 relative h-[2px] overflow-hidden">
                                <motion.div
                                    className="absolute top-0 left-0 h-full"
                                    style={{
                                        width: "200%",
                                        backgroundImage:
                                            "repeating-linear-gradient(90deg, #2947b5 0px, #2947b5 8px, transparent 8px, transparent 18px)",
                                        backgroundSize: "26px 100%",
                                    }}
                                    animate={{
                                        x: ["-50%", "0%"],
                                    }}
                                    transition={{
                                        duration: 1.2,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                />
                            </div>

                            {/* Gap for middle card */}
                            <div className="w-[33.333%] flex-shrink-0" />

                            {/* Right line */}
                            <div className="flex-1 relative h-[2px] overflow-hidden">
                                <motion.div
                                    className="absolute top-0 left-0 h-full"
                                    style={{
                                        width: "200%",
                                        backgroundImage:
                                            "repeating-linear-gradient(90deg, #2947b5 0px, #2947b5 8px, transparent 8px, transparent 18px)",
                                        backgroundSize: "26px 100%",
                                    }}
                                    animate={{
                                        x: ["-50%", "0%"],
                                    }}
                                    transition={{
                                        duration: 1.2,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                />
                            </div>

                        </div>
                    </div>

                    {/* Cards — old sizes */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        {steps.map((step, index) => {
                            const Icon = step.icon
                            return (
                                <motion.div
                                    key={step.step}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.15 }}
                                    whileHover={{ y: -8 }}
                                    className="flex flex-col items-center text-center"
                                >
                                    {/* Icon box — old size */}
                                    <div className="relative mb-6">
                                        <div className="w-20 h-20 rounded-2xl bg-[#2947b5]/10 flex items-center justify-center">
                                            <Icon className="w-9 h-9 text-[#2947b5]" />
                                        </div>
                                        {/* Step badge — old size */}
                                        <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#ff6b35] flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">
                                                {step.step}
                                            </span>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </section>
    )
}