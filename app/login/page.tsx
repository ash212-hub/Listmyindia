"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MapPin, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"

export default function LoginPage() {
    const router = useRouter()
    const { signInWithGoogle, signInWithEmail, loading, error } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [formLoading, setFormLoading] = useState(false)
    const [formError, setFormError] = useState<string | null>(null)

    const handleGoogleSignIn = async () => {
        try {
            setFormError(null)

            const user = await signInWithGoogle()


            const isNewUser =
                user.metadata.creationTime ===
                user.metadata.lastSignInTime

            if (isNewUser) {
                await fetch("/api/send-welcome", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: user.email,
                        name: user.displayName || "User",
                    }),
                })
            }

            router.push("/dashboard")
        } catch {
            setFormError("Google sign in failed. Please try again.")
        }
    }

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !password) return

        setFormLoading(true)
        setFormError(null)

        try {
            const user = await signInWithEmail(email, password)

            const isNewUser =
                user.metadata.creationTime ===
                user.metadata.lastSignInTime

            if (isNewUser) {
                await fetch("/api/send-welcome", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: user.email,
                        name: user.displayName || "User",
                    }),
                })
            }

            router.push("/dashboard")
        } catch (err: any) {
            if (err.code === "auth/invalid-credential") {
                setFormError("Invalid email or password.")
            } else if (err.code === "auth/too-many-requests") {
                setFormError("Too many attempts. Please try again later.")
            } else {
                setFormError("Sign in failed. Please try again.")
            }
        } finally {
            setFormLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#0a0f2e] flex items-center justify-center px-4 py-20 relative overflow-hidden">

            {/* Background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#2947b5]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff6b35]/10 rounded-full blur-3xl pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Card */}
                <div className="bg-white rounded-3xl p-8 shadow-2xl">

                    {/* Logo */}
                    {/* <div className="flex justify-center mb-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-[#2947b5] rounded-xl flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-xl text-gray-900">
                                ListMyIndia
                            </span>
                        </Link>
                    </div> */}

                    <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">
                        Welcome back
                    </h1>
                    <p className="text-gray-500 text-sm text-center mb-8">
                        Sign in to your account
                    </p>

                    {/* Google button */}
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 px-4 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors mb-6"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-gray-400 text-xs font-medium">
                            or sign in with email
                        </span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    {/* Error */}
                    {formError && (
                        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
                            <p className="text-red-600 text-sm">{formError}</p>
                        </div>
                    )}

                    {/* Email form */}
                    <form onSubmit={handleEmailSignIn} className="flex flex-col gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#2947b5] transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <Link
                                    href="/forgot-password"
                                    className="text-xs text-[#2947b5] hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full border border-gray-200 rounded-xl pl-10 pr-10 py-3 text-sm outline-none focus:border-[#2947b5] transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={formLoading || !email || !password}
                            className="w-full bg-[#2947b5] hover:bg-[#1e3a9e] text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
                        >
                            {formLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>

                    {/* Register link */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Don't have an account?{" "}
                        <Link
                            href="/register"
                            className="text-[#2947b5] font-medium hover:underline"
                        >
                            Create one free
                        </Link>
                    </p>

                </div>
            </motion.div>
        </div>
    )
}