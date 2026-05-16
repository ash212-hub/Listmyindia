 import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: "ListMyIndia - Find Local Businesses, Restaurants & Services",
  description:
    "Discover the best local businesses, restaurants, and services across India. Browse by pincode, category, and get contact information, reviews, and directions.",
  keywords:
    "local businesses, restaurants, services, pincode directory, India, business listings",
  openGraph: {
    title: "ListMyIndia - Find Local Businesses, Restaurants & Services",
    description:
      "Discover the best local businesses across India's 19,300+ pincodes.",
    url: "https://listmyindia.com",
    siteName: "ListMyIndia",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ListMyIndia - Find Local Businesses, Restaurants & Services",
    description:
      "Discover the best local businesses across India's 19,300+ pincodes.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geist.variable} font-sans antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}