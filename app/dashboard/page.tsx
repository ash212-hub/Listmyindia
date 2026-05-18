"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
    Building2,
    Plus,
    Star,
    Eye,
    Phone,
    MapPin,
    Settings,
    LogOut,
    ChevronRight,
    TrendingUp,
    Users,
    Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import { getUserBusinesses, deleteBusiness } from "@/lib/database"
import { useEffect } from "react"



const quickActions = [
    { icon: Plus, label: "Add Business", href: "/listbusiness", color: "bg-[#2947b5]" },
    { icon: MapPin, label: "Browse Listings", href: "/search", color: "bg-[#ff6b35]" },
    { icon: TrendingUp, label: "View Analytics", href: "/dashboard/analytics", color: "bg-green-600" },
    { icon: Users, label: "Referrals", href: "/dashboard/referrals", color: "bg-purple-600" },
]




function DashboardContent() {
    const { user, logout } = useAuth()
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<"listings" | "reviews" | "profile">("listings")
    const [businesses, setBusinesses] = useState<any[]>([])
    const [loadingBusinesses, setLoadingBusinesses] = useState(true)

    // ← Move here so it can access businesses.length
    const quickStats = [
        { icon: Building2, label: "My Listings", value: businesses.length.toString(), color: "text-[#2947b5]", bg: "bg-[#2947b5]/10" },
        { icon: Eye, label: "Total Views", value: "0", color: "text-[#ff6b35]", bg: "bg-[#ff6b35]/10" },
        { icon: Phone, label: "Calls Received", value: "0", color: "text-green-600", bg: "bg-green-50" },
        { icon: Star, label: "Avg Rating", value: "—", color: "text-yellow-500", bg: "bg-yellow-50" },
    ]


    const handleLogout = async () => {
        await logout()
        router.push("/")
    }

    useEffect(() => {
        if (!user) return
        const fetchBusinesses = async () => {
            setLoadingBusinesses(true)
            const { businesses } = await getUserBusinesses(user.uid)
            setBusinesses(businesses)
            setLoadingBusinesses(false)
        }
        fetchBusinesses()
    }, [user])

    return (
        <div className="pt-16 min-h-screen bg-gray-50">

            {/* Header */}
            <div className="bg-[#0a0f2e] py-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#2947b5]/20 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">

                        {/* User info */}
                        <div className="flex items-center gap-4">
                            {user?.photoURL ? (
                                <Image
                                    src={user.photoURL}
                                    alt={user.displayName || "User"}
                                    width={56}
                                    height={56}
                                    className="rounded-2xl border-2 border-white/20"
                                />
                            ) : (
                                <div className="w-14 h-14 rounded-2xl bg-[#2947b5] flex items-center justify-center border-2 border-white/20">
                                    <span className="text-white text-xl font-bold">
                                        {user?.displayName?.[0] || user?.email?.[0] || "U"}
                                    </span>
                                </div>
                            )}
                            <div>
                                <p className="text-white/60 text-sm">Welcome back</p>
                                <h1 className="text-2xl font-bold text-white">
                                    {user?.displayName || "User"} 👋
                                </h1>
                                <p className="text-white/50 text-xs mt-0.5">
                                    {user?.email}
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <Button
                                asChild
                                className="bg-[#ff6b35] hover:bg-[#e55a26] text-white flex items-center gap-2 rounded-xl"
                            >
                                <Link href="/listbusiness">
                                    <Plus className="w-4 h-4" />
                                    Add Business
                                </Link>
                            </Button>
                            <button
                                onClick={handleLogout}
                                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                                title="Sign out"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {quickStats.map((stat, index) => {
                        const Icon = stat.icon
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="bg-white rounded-2xl border border-gray-100 p-5"
                            >
                                <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                                    <Icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                                <div className={`text-2xl font-bold ${stat.color} mb-0.5`}>
                                    {stat.value}
                                </div>
                                <div className="text-gray-500 text-xs">{stat.label}</div>
                            </motion.div>
                        )
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main content */}
                    <div className="lg:col-span-2 flex flex-col gap-6">

                        {/* Tabs */}
                        <div className="bg-white rounded-2xl border border-gray-100">
                            <div className="flex border-b border-gray-100">
                                {(["listings", "reviews", "profile"] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-1 py-4 text-sm font-medium capitalize transition-colors ${activeTab === tab
                                            ? "text-[#2947b5] border-b-2 border-[#2947b5]"
                                            : "text-gray-500 hover:text-gray-700"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <div className="p-6">
                                {activeTab === "listings" && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        {loadingBusinesses ? (
                                            <div className="flex items-center justify-center py-12">
                                                <Loader2 className="w-8 h-8 text-[#2947b5] animate-spin" />
                                            </div>
                                        ) : businesses.length === 0 ? (
                                            <div className="text-center py-12">
                                                <div className="w-16 h-16 rounded-2xl bg-[#2947b5]/10 flex items-center justify-center mx-auto mb-4">
                                                    <Building2 className="w-8 h-8 text-[#2947b5]" />
                                                </div>
                                                <h3 className="text-gray-900 font-semibold text-lg mb-2">
                                                    No listings yet
                                                </h3>
                                                <p className="text-gray-500 text-sm mb-6">
                                                    Add your first business to start getting discovered by customers.
                                                </p>
                                                <Button
                                                    asChild
                                                    className="bg-[#2947b5] hover:bg-[#1e3a9e] text-white px-6 py-2.5 rounded-xl flex items-center gap-2 mx-auto w-fit"
                                                >
                                                    <Link href="/listbusiness">
                                                        <Plus className="w-4 h-4" />
                                                        Add your first business
                                                    </Link>
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col gap-4">
                                                {businesses.map((business) => (
                                                    <div
                                                        key={business.id}
                                                        className="border border-gray-100 rounded-2xl p-5 hover:border-[#2947b5]/30 transition-colors"
                                                    >
                                                        <div className="flex items-start justify-between gap-4">
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <h3 className="font-semibold text-gray-900">
                                                                        {business.businessName}
                                                                    </h3>
                                                                    <span
                                                                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${business.status === "verified"
                                                                            ? "bg-green-50 text-green-600"
                                                                            : "bg-yellow-50 text-yellow-600"
                                                                            }`}
                                                                    >
                                                                        {business.status === "verified" ? "Verified" : "Pending"}
                                                                    </span>
                                                                </div>
                                                                <p className="text-gray-500 text-sm mb-2">
                                                                    {business.category} · {business.city}, {business.state}
                                                                </p>
                                                                <p className="text-gray-400 text-xs">
                                                                    {business.phone} · {business.email}
                                                                </p>
                                                            </div>
                                                            <button
                                                                onClick={async () => {
                                                                    if (confirm("Delete this listing?")) {
                                                                        await deleteBusiness(business.id)
                                                                        setBusinesses(businesses.filter((b) => b.id !== business.id))
                                                                    }
                                                                }}
                                                                className="text-red-400 hover:text-red-600 text-xs font-medium transition-colors"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                                <Button
                                                    asChild
                                                    className="bg-[#2947b5] hover:bg-[#1e3a9e] text-white px-6 py-2.5 rounded-xl flex items-center gap-2 w-fit"
                                                >
                                                    <Link href="/listbusiness">
                                                        <Plus className="w-4 h-4" />
                                                        Add another business
                                                    </Link>
                                                </Button>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {activeTab === "reviews" && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-12"
                                    >
                                        <div className="w-16 h-16 rounded-2xl bg-yellow-50 flex items-center justify-center mx-auto mb-4">
                                            <Star className="w-8 h-8 text-yellow-500" />
                                        </div>
                                        <h3 className="text-gray-900 font-semibold text-lg mb-2">
                                            No reviews yet
                                        </h3>
                                        <p className="text-gray-500 text-sm">
                                            Reviews will appear here once customers start rating your business.
                                        </p>
                                    </motion.div>
                                )}

                                {activeTab === "profile" && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col gap-4"
                                    >
                                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                            {user?.photoURL ? (
                                                <Image
                                                    src={user.photoURL}
                                                    alt="Profile"
                                                    width={48}
                                                    height={48}
                                                    className="rounded-xl"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-xl bg-[#2947b5] flex items-center justify-center">
                                                    <span className="text-white font-bold">
                                                        {user?.displayName?.[0] || "U"}
                                                    </span>
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    {user?.displayName || "User"}
                                                </p>
                                                <p className="text-gray-500 text-sm">{user?.email}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-3">
                                            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                                                <div>
                                                    <p className="text-gray-500 text-xs">Display Name</p>
                                                    <p className="text-gray-900 font-medium text-sm">
                                                        {user?.displayName || "Not set"}
                                                    </p>
                                                </div>
                                                <button className="text-[#2947b5] text-xs font-medium hover:underline">
                                                    Edit
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                                                <div>
                                                    <p className="text-gray-500 text-xs">Email</p>
                                                    <p className="text-gray-900 font-medium text-sm">
                                                        {user?.email}
                                                    </p>
                                                </div>
                                                <span className="text-green-600 text-xs font-medium bg-green-50 px-2 py-0.5 rounded-full">
                                                    Verified
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                                                <div>
                                                    <p className="text-gray-500 text-xs">Account type</p>
                                                    <p className="text-gray-900 font-medium text-sm">
                                                        Free plan
                                                    </p>
                                                </div>
                                                <Link
                                                    href="/plans"
                                                    className="text-[#ff6b35] text-xs font-medium hover:underline"
                                                >
                                                    Upgrade
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Sidebar */}
                    <div className="flex flex-col gap-4">

                        {/* Quick actions */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-2xl border border-gray-100 p-6"
                        >
                            <h3 className="font-semibold text-gray-900 mb-4">
                                Quick Actions
                            </h3>
                            <div className="flex flex-col gap-2">
                                {quickActions.map((action) => {
                                    const Icon = action.icon
                                    return (
                                        <Link
                                            key={action.label}
                                            href={action.href}
                                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                                <Icon className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-gray-700 text-sm font-medium group-hover:text-[#2947b5] transition-colors">
                                                {action.label}
                                            </span>
                                            <ChevronRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-[#2947b5] transition-colors" />
                                        </Link>
                                    )
                                })}
                            </div>
                        </motion.div>

                        {/* Account settings */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl border border-gray-100 p-6"
                        >
                            <h3 className="font-semibold text-gray-900 mb-4">
                                Account
                            </h3>
                            <div className="flex flex-col gap-2">
                                <Link
                                    href="/dashboard/settings"
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                                >
                                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Settings className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <span className="text-gray-700 text-sm font-medium">
                                        Settings
                                    </span>
                                    <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors group w-full"
                                >
                                    <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                                        <LogOut className="w-4 h-4 text-red-500" />
                                    </div>
                                    <span className="text-red-500 text-sm font-medium">
                                        Sign out
                                    </span>
                                </button>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <DashboardContent />
        </ProtectedRoute>
    )
}