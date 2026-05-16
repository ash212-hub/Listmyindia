import Hero from "@/components/hero/Hero"
import StatsBar from "@/components/stats/StatsBar"
import CategoryGrid from "@/components/categories/CategoryGrid"
import FeaturedBusinesses from "@/components/businesses/FeaturedBusinesses"
import ListBusinessCTA from "@/components/cta/ListBusinessCTA"
import Testimonials from "@/components/testimonials/Testimonials"
import FAQ from "@/components/faq/FAQ"
import HowItWorks from "@/components/howitworks/HowItWorks"

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <CategoryGrid />
      <HowItWorks />
      <FeaturedBusinesses />
      <ListBusinessCTA />
      <Testimonials />
      <FAQ />
    </>
  )
}