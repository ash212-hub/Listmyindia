"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
    MapPin,
    Phone,
    Mail,
    Users,
    Target,
    TrendingUp,
    HandshakeIcon,
    Building2,
    ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const stats = [
    { value: "19,000+", label: "Pin Codes" },
    { value: "1M+", label: "Businesses" },
    { value: "1000+", label: "Partners" },
    { value: "₹50L+", label: "Revenue Generated" },
]

const team = [
    {
        initials: "SK",
        name: "Sanjeev Kumar",
        role: "Founder",
        description:
            "Empowering Small-Scale Entrepreneurs | Vocal for Local Advocate | Bhaiya, Listed ho kya?",
        linkedin: "https://www.linkedin.com/in/sanjeevroy4u/",
        avatar: "https://media.licdn.com/dms/image/v2/D5603AQEodP3fbKAfkw/profile-displayphoto-crop_800_800/B56ZyfZDXQHQAI-/0/1772200672335?e=1780531200&v=beta&t=-19gjrf6MZJ-AXsRAH_o-7Y8pgiyC3CzX1glwSzMu18",
    },
    {
        initials: "SC",
        name: "Sonal Chandra",
        role: "Co-Founder",
        description:
            "List My India | Empowering Small-Scale Entrepreneurs | Vocal for Local Advocate",
        linkedin: "https://www.linkedin.com/in/sonal-chandra-29411093/",
        avatar: "https://media.licdn.com/dms/image/v2/D5603AQF1qVbtLz345Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1719556125593?e=1780531200&v=beta&t=2-jdSfAb9C1qNA0Lj4r8uil-Klx5QydKnjBkpGvZXAs"

    },
    {
        initials: "SS",
        name: "Samad Shaikh",
        role: "Business Development",
        description:
            "Founder @ ListMyBusiness | Business Visibility, Partnerships",
        linkedin: "https://www.linkedin.com/in/samad-shaikh-13b12b237/",
        avatar: "https://media.licdn.com/dms/image/v2/D4D03AQHfCR6nng3QEQ/profile-displayphoto-crop_800_800/B4DZmfrb0HGwAI-/0/1759320590389?e=1780531200&v=beta&t=OLMF2OOX86mzJD5-KrQFVp2Zqn1NgMszta2l4JiHLbM"
    },
]

const whyPartner = [
    "Proven business model",
    "Comprehensive training & support",
    "Exclusive territory rights",
    "Recurring revenue streams",
]

export default function AboutPage() {
    return (
        <div className="pt-16">

            {/* Hero */}
            <section className="bg-[#0a0f2e] py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#2947b5]/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff6b35]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
                            <span className="text-[#ff6b35] text-xs font-medium">
                                🇮🇳 Vocal for Local
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                            About{" "}
                            <span className="text-[#ff6b35]">ListMyIndia™</span>
                        </h1>
                        <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
                            Empowering Small-Scale Entrepreneurs across India. India's trusted
                            local business directory connecting verified service providers in
                            your area based on pincode.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-3xl sm:text-4xl font-bold text-[#2947b5] mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-gray-500 text-sm">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-[#ff6b35] text-sm font-semibold uppercase tracking-wider">
                                Our Mission
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-6">
                                Connecting India's local economy
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Welcome to <strong>List My India</strong> [BizReach India LLP],
                                an innovative online business listing platform dedicated to
                                promoting and supporting small businesses, home-based ventures,
                                unregistered businesses, pushcart vendors, and roadside vendors
                                across India.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                At ListMyIndia, we are passionate about strengthening the{" "}
                                <strong>Vocal for Local</strong> initiative by providing a
                                platform for these often overlooked but vital contributors to
                                the Indian economy.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Our platform aims to empower small-scale entrepreneurs by giving
                                them visibility and accessibility in the digital realm — from
                                the smallest pushcart vendor to established local businesses.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {[
                                {
                                    icon: Target,
                                    title: "Our Vision",
                                    desc: "India's largest hyperlocal business directory covering every pincode.",
                                },
                                {
                                    icon: Users,
                                    title: "For Everyone",
                                    desc: "From roadside vendors to established businesses — everyone gets visibility.",
                                },
                                {
                                    icon: TrendingUp,
                                    title: "Growth First",
                                    desc: "We measure success by how much our listed businesses grow.",
                                },
                                {
                                    icon: Building2,
                                    title: "Nationwide",
                                    desc: "Building a network across all 19,300+ pincodes in India.",
                                },
                            ].map((item, index) => {
                                const Icon = item.icon
                                return (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        className="bg-white rounded-2xl border border-gray-100 p-5"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-[#2947b5]/10 flex items-center justify-center mb-3">
                                            <Icon className="w-5 h-5 text-[#2947b5]" />
                                        </div>
                                        <h3 className="font-semibold text-gray-900 text-sm mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-500 text-xs leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </motion.div>
                                )
                            })}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Video */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-[#ff6b35] text-sm font-semibold uppercase tracking-wider">
                            Our Story
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
                            Watch how we're changing local business
                        </h2>
                        <p className="text-gray-500 mb-10">
                            Learn more about our vision and how we're revolutionizing local
                            business discovery in India.
                        </p>
                        <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-lg aspect-video">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/Mgx5Kg6zg8M"
                                title="ListMyIndia Story"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Franchise */}
            <section className="py-20 bg-[#0a0f2e] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#2947b5]/20 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-[#ff6b35] text-sm font-semibold uppercase tracking-wider">
                                Franchise Model
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
                                Partnership opportunities
                            </h2>
                            <p className="text-white/60 leading-relaxed mb-8">
                                Operating on a franchise model, we invite partners from across
                                the country to join us in our mission. With our franchise
                                partners, we aim to establish a nationwide network that connects
                                local businesses with consumers, fostering economic growth and
                                community development.
                            </p>
                            <div className="flex flex-col gap-3 mb-8">
                                {whyPartner.map((point, index) => (
                                    <motion.div
                                        key={point}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-5 h-5 rounded-full bg-[#ff6b35] flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-xs">✓</span>
                                        </div>
                                        <span className="text-white/80 text-sm">{point}</span>
                                    </motion.div>
                                ))}
                            </div>
                            <Button
                                asChild
                                className="bg-[#ff6b35] hover:bg-[#e55a26] text-white px-8 py-3 rounded-xl flex items-center gap-2 w-fit"
                            >
                                <Link href="/growth-partner">
                                    Become a Partner
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-8"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-[#2947b5]/30 flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-[#ff6b35]" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">
                                        Growth & Impact
                                    </h3>
                                    <p className="text-white/50 text-xs">Validated & proven</p>
                                </div>
                            </div>
                            <p className="text-white/60 text-sm leading-relaxed mb-6">
                                Drawing confidence after successfully validating our idea in our
                                locality, we are crafting a user-friendly and comprehensive
                                platform that showcases the diversity and richness of India's
                                local businesses.
                            </p>
                            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">
                                    Successfully validated in
                                </p>
                                <p className="text-white font-medium text-sm">
                                    Rajnagar Extension, Ghaziabad
                                </p>
                                <p className="text-white/50 text-xs mt-1">
                                    Proving the effectiveness of our hyperlocal approach
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-[#ff6b35] text-sm font-semibold uppercase tracking-wider">
                            Leadership
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
                            Meet the team
                        </h2>
                        <p className="text-gray-500 mt-3">
                            The visionaries behind ListMyIndia
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="bg-gray-50 rounded-2xl border border-gray-100 p-6 text-center hover:shadow-md transition-all duration-300"
                            >
                                <div className="w-16 h-16 rounded-full bg-[#2947b5] flex items-center justify-center mx-auto mb-4">
                                    <Image
                                        src={member.avatar}
                                        alt={member.name}
                                        width={80}
                                        height={80}
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <h3 className="font-semibold text-gray-900 text-lg mb-0.5">
                                    {member.name}
                                </h3>
                                <p className="text-[#ff6b35] text-sm font-medium mb-3">
                                    {member.role}
                                </p>
                                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                                    {member.description}
                                </p>

                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-[#2947b5] text-sm font-medium hover:underline"
                                >
                                    LinkedIn Profile
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-[#ff6b35] text-sm font-semibold uppercase tracking-wider">
                            Get in touch
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
                            Contact us
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl border border-gray-100 p-6 text-center"
                        >
                            <div className="w-12 h-12 rounded-xl bg-[#2947b5]/10 flex items-center justify-center mx-auto mb-3">
                                <Phone className="w-6 h-6 text-[#2947b5]" />
                            </div>
                            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                                Phone
                            </p>

                            <a
                                href="tel:+919403891828"
                                className="text-gray-900 font-medium text-sm hover:text-[#2947b5] transition-colors"
                            >
                                +91 94038 91828
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl border border-gray-100 p-6 text-center"
                        >
                            <div className="w-12 h-12 rounded-xl bg-[#2947b5]/10 flex items-center justify-center mx-auto mb-3">
                                <Mail className="w-6 h-6 text-[#2947b5]" />
                            </div>
                            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                                Email
                            </p>

                            <a
                                href="mailto:partner@listmyindia.com"
                                className="text-gray-900 font-medium text-sm hover:text-[#2947b5] transition-colors"
                            >
                                partner@listmyindia.com
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl border border-gray-100 p-6 text-center"
                        >
                            <div className="w-12 h-12 rounded-xl bg-[#2947b5]/10 flex items-center justify-center mx-auto mb-3">
                                <MapPin className="w-6 h-6 text-[#2947b5]" />
                            </div>
                            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                                Address
                            </p>
                            <p className="text-gray-900 font-medium text-sm leading-relaxed">
                                A-1105, Officer City-1, Rajnagar Extension, Ghaziabad, UP 201017
                            </p>
                        </motion.div>
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#0a0f2e] rounded-2xl p-8 text-center"
                    >
                        <h3 className="text-white font-bold text-xl mb-2">
                            Ready to join us?
                        </h3>
                        <p className="text-white/60 text-sm mb-6">
                            For more information on how you can be a part of this exciting
                            initiative, please reach out to us directly.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Button
                                asChild
                                className="bg-[#ff6b35] hover:bg-[#e55a26] text-white px-6 py-2.5 rounded-xl"
                            >
                                <Link href="/register">Register Now</Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="border-white/20 hover:text-white text-black hover:bg-white/10 px-6 py-2.5 rounded-xl"
                            >
                                <Link href="/growth-partner">Become a Partner</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    )
}