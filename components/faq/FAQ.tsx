"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import FAQItem from "./FAQItem"

const faqs = [
  {
    question: "How do I find businesses in my area?",
    answer:
      "Simply enter your city, area, or pincode in the search bar or allow location detection. Then search for the type of business or service you need. We'll show you all verified businesses in your area instantly.",
  },
  {
    question: "Is it free to list my business?",
    answer:
      "Yes! Basic listing is completely free with no setup fees. We also offer premium plans with additional features like priority placement, analytics dashboard, and promotional tools for businesses that want more visibility.",
  },
  {
    question: "How does the verification process work?",
    answer:
      "All businesses go through our verification process where we check contact details, business registration, and physical location. Verified businesses get a blue badge which builds trust with customers.",
  },
  {
    question: "Can I update my business information anytime?",
    answer:
      "Absolutely! Business owners can log in to their dashboard and update information, add photos, manage reviews, update timings, and track their performance metrics anytime.",
  },
  {
    question: "How long does it take for my listing to go live?",
    answer:
      "Your listing goes live instantly after registration. The verification badge may take 24-48 hours after our team reviews your business details.",
  },
  {
    question: "Which cities and pincodes are covered?",
    answer:
      "ListMyIndia covers 19,300+ pincodes across 500+ cities all over India — from metros like Mumbai, Delhi, and Bangalore to smaller towns and tier-2 cities. We're expanding every day.",
  },
  {
    question: "How do customers contact my business?",
    answer:
      "Customers can call you directly using the phone number on your listing, visit your website, get directions via maps, or send you a message through the platform.",
  },
  {
    question: "What is the difference between free and premium listing?",
    answer:
      "Free listings include basic business info, contact details, and location. Premium listings add priority placement in search results, photo galleries, analytics, promotional banners, and dedicated support.",
  },
]

export default function FAQ() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#ff6b35] text-sm font-semibold uppercase tracking-wider">
            Got questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
            Frequently asked questions
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Everything you need to know about ListMyIndia. Can't find the answer?
            Reach out to our team.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm mb-4">
            Still have questions? We're here to help.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[#2947b5] font-medium text-sm hover:underline"
          >
            Contact our support team
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}