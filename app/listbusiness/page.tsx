"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import {
    Building2,
    MapPin,
    Phone,
    CheckCircle,
    ChevronRight,
    ChevronLeft,
    Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { categories } from "@/lib/mock-data/categories"
import { popularCities } from "@/lib/mock-data/cities"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import { createBusiness } from "@/lib/database"
const steps = [
    { id: 1, title: "Basic Info", icon: Building2 },
    { id: 2, title: "Location", icon: MapPin },
    { id: 3, title: "Contact", icon: Phone },
    { id: 4, title: "Done", icon: CheckCircle },
]

interface FormData {
    // Step 1
    businessName: string
    category: string
    subcategory: string
    description: string
    // Step 2
    address: string
    city: string
    state: string
    pincode: string
    // Step 3
    phone: string
    email: string
    website: string
    timings: string
}

function ListBusinessContent() {
    const { user } = useAuth()
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)
    const [submitting, setSubmitting] = useState(false)
    const [form, setForm] = useState<FormData>({
        businessName: "",
        category: "",
        subcategory: "",
        description: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
        email: user?.email || "",
        website: "",
        timings: "",
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const isStep1Valid = form.businessName && form.category && form.description
    const isStep2Valid = form.address && form.city && form.state && form.pincode
    const isStep3Valid = form.phone

    const handleNext = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1)
    }

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1)
    }

    const handleSubmit = async () => {
        if (!user) return
        setSubmitting(true)

        try {
            const { id, error } = await createBusiness({
                userId: user.uid,
                businessName: form.businessName,
                category: form.category,
                subcategory: form.subcategory,
                description: form.description,
                address: form.address,
                city: form.city,
                state: form.state,
                pincode: form.pincode,
                phone: form.phone,
                email: form.email,
                website: form.website,
                timings: form.timings,
            })

            if (error) {
                console.error("Error saving business:", error)
                setSubmitting(false)
                return
            }

            console.log("Business saved with ID:", id)
            setCurrentStep(4)
        } catch (err) {
            console.error("Submit failed:", err)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="pt-16 min-h-screen bg-gray-50">

            {/* Header */}
            <div className="bg-[#0a0f2e] py-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#2947b5]/20 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="text-[#ff6b35] text-sm font-semibold uppercase tracking-wider">
                        Free listing
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-2">
                        List your business
                    </h1>
                    <p className="text-white/60 text-sm">
                        Get discovered by thousands of customers in your area
                    </p>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Step indicators */}
                {currentStep < 4 && (
                    <div className="flex items-center justify-center mb-10">
                        {steps.slice(0, 3).map((step, index) => {
                            const Icon = step.icon
                            const isCompleted = currentStep > step.id
                            const isActive = currentStep === step.id
                            return (
                                <div key={step.id} className="flex items-center">
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isCompleted
                                                ? "bg-green-500"
                                                : isActive
                                                    ? "bg-[#2947b5]"
                                                    : "bg-gray-200"
                                                }`}
                                        >
                                            {isCompleted ? (
                                                <CheckCircle className="w-5 h-5 text-white" />
                                            ) : (
                                                <Icon
                                                    className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"
                                                        }`}
                                                />
                                            )}
                                        </div>
                                        <span
                                            className={`text-xs mt-1.5 font-medium ${isActive ? "text-[#2947b5]" : "text-gray-400"
                                                }`}
                                        >
                                            {step.title}
                                        </span>
                                    </div>
                                    {index < 2 && (
                                        <div
                                            className={`w-16 sm:w-24 h-0.5 mx-2 mb-5 transition-colors ${currentStep > step.id ? "bg-green-400" : "bg-gray-200"
                                                }`}
                                        />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* Form card */}
                <AnimatePresence mode="wait">

                    {/* Step 1 — Basic Info */}
                    {currentStep === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white rounded-2xl border border-gray-100 p-8"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-6">
                                Basic Information
                            </h2>

                            <div className="flex flex-col gap-5">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                                        Business Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="businessName"
                                        value={form.businessName}
                                        onChange={handleChange}
                                        placeholder="e.g. Sharma Electronics"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2947b5] transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                                        Category *
                                    </label>
                                    <select
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2947b5] transition-colors appearance-none bg-white"
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.name}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                                        Subcategory
                                    </label>
                                    <input
                                        type="text"
                                        name="subcategory"
                                        value={form.subcategory}
                                        onChange={handleChange}
                                        placeholder="e.g. Mobile Phones, Laptops"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2947b5] transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                                        Description *
                                    </label>
                                    <textarea
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        placeholder="Describe your business, products and services..."
                                        rows={4}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2947b5] transition-colors resize-none"
                                    />
                                    <p className="text-gray-400 text-xs mt-1">
                                        {form.description.length}/500 characters
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-end mt-8">
                                <Button
                                    onClick={handleNext}
                                    disabled={!isStep1Valid}
                                    className="bg-[#2947b5] hover:bg-[#1e3a9e] text-white px-8 py-3 rounded-xl flex items-center gap-2"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2 — Location */}
                    {currentStep === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white rounded-2xl border border-gray-100 p-8"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-6">
                                Business Location
                            </h2>

                            <div className="flex flex-col gap-5">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                                        Street Address *
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        placeholder="Shop No, Street, Area"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2947b5] transition-colors"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                                            City *
                                        </label>
                                        <select
                                            name="city"
                                            value={form.city}
                                            onChange={(e) => {
                                                const selected = popularCities.find(
                                                    (c) => c.name === e.target.value
                                                )
                                                setForm({
                                                    ...form,
                                                    city: e.target.value,
                                                    state: selected?.state || form.state,
                                                })
                                            }}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2947b5] transition-colors appearance-none bg-white"
                                        >
                                            <option value="">Select city</option>
                                            {popularCities.map((city) => (
                                                <option key={city.id} value={city.name}>
                                                    {city.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                                            State *
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={form.state}
                                            onChange={handleChange}
                                            placeholder="State"
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2947b5] transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                                        Pincode *
                                    </label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={form.pincode}
                                        onChange={handleChange}
                                        placeholder="e.g. 500034"
                                        maxLength={6}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2947b5] transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between mt-8">
                                <Button
                                    onClick={handleBack}
                                    variant="outline"
                                    className="border-gray-200 text-gray-600 px-8 py-3 rounded-xl flex items-center gap-2"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Back
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    disabled={!isStep2Valid}
                                    className="bg-[#2947b5] hover:bg-[#1e3a9e] text-white px-8 py-3 rounded-xl flex items-center gap-2"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3 — Contact */}
                    {currentStep === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white rounded-2xl border border-gray-100 p-8"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-6">
                                Contact Details
                            </h2>

                            <div className="flex flex-col gap-5">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2947b5] transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="business@example.com"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2947b5] transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                                        Website
                                    </label>
                                    <input
                                        type="text"
                                        name="website"
                                        value={form.website}
                                        onChange={handleChange}
                                        placeholder="www.yourbusiness.com"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2947b5] transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                                        Business Timings
                                    </label>
                                    <input
                                        type="text"
                                        name="timings"
                                        value={form.timings}
                                        onChange={handleChange}
                                        placeholder="e.g. Mon-Sat 9:00 AM - 8:00 PM"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2947b5] transition-colors"
                                    />
                                </div>

                                {/* Summary */}
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                        Summary
                                    </p>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500 text-sm">Business</span>
                                            <span className="text-gray-900 text-sm font-medium">{form.businessName}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500 text-sm">Category</span>
                                            <span className="text-gray-900 text-sm font-medium">{form.category}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500 text-sm">Location</span>
                                            <span className="text-gray-900 text-sm font-medium">{form.city}, {form.state}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between mt-8">
                                <Button
                                    onClick={handleBack}
                                    variant="outline"
                                    className="border-gray-200 text-gray-600 px-8 py-3 rounded-xl flex items-center gap-2"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Back
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={submitting || !isStep3Valid}
                                    className="bg-[#ff6b35] hover:bg-[#e55a26] text-white px-8 py-3 rounded-xl flex items-center gap-2"
                                >
                                    {submitting ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <>
                                            Submit Listing
                                            <ChevronRight className="w-4 h-4" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 4 — Success */}
                    {currentStep === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-2xl border border-gray-100 p-8 text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6"
                            >
                                <CheckCircle className="w-10 h-10 text-green-500" />
                            </motion.div>

                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                🎉 Business Listed!
                            </h2>
                            <p className="text-gray-500 mb-2">
                                <span className="font-semibold text-gray-900">
                                    {form.businessName}
                                </span>{" "}
                                has been submitted successfully.
                            </p>
                            <p className="text-gray-400 text-sm mb-8">
                                Our team will review and verify your listing within 24-48 hours.
                                You'll receive a confirmation on{" "}
                                <span className="text-[#2947b5]">{user?.email}</span>
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    asChild
                                    className="bg-[#2947b5] hover:bg-[#1e3a9e] text-white px-8 py-3 rounded-xl"
                                >
                                    <a href="/dashboard">Go to Dashboard</a>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="border-gray-200 text-gray-600 px-8 py-3 rounded-xl"
                                >
                                    <a href="/search">Browse Listings</a>
                                </Button>
                            </div>

                            {/* What happens next */}
                            <div className="mt-8 bg-gray-50 rounded-xl p-5 text-left">
                                <p className="text-sm font-semibold text-gray-700 mb-3">
                                    What happens next?
                                </p>
                                <div className="flex flex-col gap-2">
                                    {[
                                        "Our team reviews your submission",
                                        "Verification call may be made to confirm details",
                                        "Listing goes live within 24-48 hours",
                                        "You'll receive email confirmation",
                                    ].map((step, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className="w-5 h-5 rounded-full bg-[#2947b5]/10 flex items-center justify-center flex-shrink-0">
                                                <span className="text-[#2947b5] text-xs font-bold">
                                                    {i + 1}
                                                </span>
                                            </div>
                                            <p className="text-gray-500 text-sm">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    )
}

export default function ListBusinessPage() {
    return (
        <ProtectedRoute>
            <ListBusinessContent />
        </ProtectedRoute>
    )
}