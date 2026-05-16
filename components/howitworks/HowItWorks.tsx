"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MapPin, Phone, Building2, Globe, TrendingUp } from "lucide-react"

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
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <span className="text-[#ff6b35] text-sm font-semibold uppercase tracking-wider">
                        Simple process
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
                        How it works
                    </h2>
                    <p className="text-gray-500 mt-3 max-w-xl mx-auto">
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
                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">

                    {/* Connector line — behind cards with z-0 */}
                    <div className="hidden md:flex absolute top-10 left-0 right-0 items-center px-32 pointer-events-none z-0">
                        <div className="flex-1 relative h-0.5 overflow-hidden">
                            <motion.div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: "repeating-linear-gradient(90deg, #2947b5 0px, #2947b5 8px, transparent 8px, transparent 16px)",
                                    backgroundSize: "32px 100%",
                                }}
                                animate={{
                                    backgroundPosition: ["0% 0%", "32px 0%"],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                        </div>

                        <div className="w-20 flex-shrink-0" />

                        <div className="flex-1 relative h-0.5 overflow-hidden">
                            <motion.div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: "repeating-linear-gradient(90deg, #2947b5 0px, #2947b5 8px, transparent 8px, transparent 16px)",
                                    backgroundSize: "32px 100%",
                                }}
                                animate={{
                                    backgroundPosition: ["0% 0%", "32px 0%"],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                        </div>
                    </div>

                    {steps.map((step, index) => {
                        const Icon = step.icon
                        return (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className="flex flex-col items-center text-center relative z-10"
                            >
                                {/* Icon + step number */}
                                <div className="relative mb-6 z-10">
                                    <div className="w-20 h-20 rounded-2xl bg-[#2947b5]/10 flex items-center justify-center">
                                        <Icon className="w-9 h-9 text-[#2947b5]" />
                                    </div>
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
        </section>
    )
}
