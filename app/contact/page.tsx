"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CONTACT, SOCIAL_LINKS } from "@/lib/constants"

const contactInfo = [
    {
        icon: Phone,
        label: "Phone",
        value: "+91 94038 91828",
        href: "tel:+919403891828",
    },
    {
        icon: Mail,
        label: "Email",
        value: "partner@listmyindia.com",
        href: "mailto:partner@listmyindia.com",
    },
    {
        icon: MapPin,
        label: "Address",
        value: "A-1105, Officer City-1, Rajnagar Extension, Ghaziabad, UP 201017",
        href: null,
    },
    {
        icon: Clock,
        label: "Working Hours",
        value: "Monday - Saturday, 9:00 AM - 6:00 PM",
        href: null,
    },
]

export default function ContactPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    })
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault()
        if (!form.name || !form.email || !form.message) return
        setLoading(true)
        await new Promise((res) => setTimeout(res, 1500))
        setLoading(false)
        setSubmitted(true)
    }

    return (
        <div className="pt-16">

            {/* Hero */}
            <section className="bg-[#0a0f2e] py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#2947b5]/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff6b35]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-[#ff6b35] text-sm font-semibold uppercase tracking-wider">
                            Get in touch
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
                            Contact Us
                        </h1>
                        <p className="text-white/60 text-lg max-w-xl mx-auto">
                            Have a question or want to list your business? We're here to help.
                            Reach out and we'll get back to you within 24 hours.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main content */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                        {/* Contact info */}
                        <div className="flex flex-col gap-6">
                            {contactInfo.map((item, index) => {
                                const Icon = item.icon
                                return (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-4"
                                    >
                                        <div className="w-11 h-11 rounded-xl bg-[#2947b5]/10 flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-5 h-5 text-[#2947b5]" />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                                                {item.label}
                                            </p>
                                            {item.href ? (
                                                <a
                                                    href={item.href}
                                                    className="text-gray-900 font-medium text-sm hover:text-[#2947b5] transition-colors"
                                                >
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <p className="text-gray-900 font-medium text-sm leading-relaxed">
                                                    {item.value}
                                                </p>
                                            )}
                                        </div>
                                    </motion.div>
                                )
                            })}

                            {/* Social */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                                className="bg-[#0a0f2e] rounded-2xl p-6"
                            >
                                <h3 className="text-white font-semibold mb-2">
                                    Follow us
                                </h3>
                                <p className="text-white/50 text-sm mb-4">
                                    Stay updated with latest news and opportunities
                                </p>
                                <div className="flex gap-3 flex-wrap">
                                    {[
                                        { name: "WA", href: SOCIAL_LINKS.whatsapp, color: "hover:bg-[#25D366]" },
                                        { name: "IG", href: SOCIAL_LINKS.instagram, color: "hover:bg-[#E1306C]" },
                                        { name: "TW", href: SOCIAL_LINKS.twitter, color: "hover:bg-black" },
                                        { name: "FB", href: SOCIAL_LINKS.facebook, color: "hover:bg-[#1877F2]" },
                                        { name: "YT", href: SOCIAL_LINKS.youtube, color: "hover:bg-[#FF0000]" },
                                        { name: "LI", href: SOCIAL_LINKS.linkedin, color: "hover:bg-[#0A66C2]" },
                                    ].map((s) => (
                                        <a
                                            key={s.name}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`w-9 h-9 rounded-lg bg-white/10 ${s.color} flex items-center justify-center text-white/60 hover:text-white transition-all text-xs font-bold`}
                                        >
                                            {s.name}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Contact form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-8"
                        >
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center h-full py-16 text-center"
                                >
                                    <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-4">
                                        <CheckCircle className="w-10 h-10 text-green-500" />
                                    </div>
                                    <h3 className="text-gray-900 font-bold text-2xl mb-2">
                                        Message sent!
                                    </h3>
                                    <p className="text-gray-500 mb-6">
                                        We'll get back to you within 24 hours.
                                    </p>
                                    <Button
                                        onClick={() => {
                                            setSubmitted(false)
                                            setForm({
                                                name: "",
                                                email: "",
                                                phone: "",
                                                subject: "",
                                                message: "",
                                            })
                                        }}
                                        variant="outline"
                                        className="border-[#2947b5] text-[#2947b5]"
                                    >
                                        Send another message
                                    </Button>
                                </motion.div>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                        Send us a message
                                    </h2>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                placeholder="Rahul Sharma"
                                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2947b5] transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="rahul@example.com"
                                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2947b5] transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                                                Phone
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
                                                Subject
                                            </label>
                                            <select
                                                name="subject"
                                                value={form.subject}
                                                onChange={handleChange}
                                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2947b5] transition-colors appearance-none bg-white"
                                            >
                                                <option value="">Select subject</option>
                                                <option value="list-business">List my business</option>
                                                <option value="partnership">Partnership inquiry</option>
                                                <option value="support">Technical support</option>
                                                <option value="feedback">Feedback</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                                            Message *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="Tell us how we can help you..."
                                            rows={5}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2947b5] transition-colors resize-none"
                                        />
                                    </div>

                                    <Button
                                        onClick={handleSubmit}
                                        disabled={loading || !form.name || !form.email || !form.message}
                                        className="w-full bg-[#2947b5] hover:bg-[#1e3a9e] text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium"
                                    >
                                        {loading ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

        </div>
    )
}