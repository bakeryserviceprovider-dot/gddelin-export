import Link from "next/link"
import Container from "@/components/ui/Container"
import SectionTitle from "@/components/ui/SectionTitle"
import ScrollReveal from "@/components/ui/ScrollReveal"
import { products } from "@/lib/products"

const icons: Record<string, string> = {
  "seafood-constant-temperature-machine": "🐟",
  "industrial-water-chiller": "❄️",
  "titanium-evaporator": "🔄",
  "stainless-steel-heat-exchanger": "⚡",
}

export default function FeaturedProducts() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <ScrollReveal>
          <SectionTitle
            label="Our Products"
            title="Premium Refrigeration & Heat Exchange Equipment"
            subtitle="From seafood temperature control to industrial process cooling, our comprehensive product line serves diverse global industries."
          />
        </ScrollReveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <ScrollReveal key={product.slug} delay={i * 0.1}>
              <Link
                href={`/products/${product.slug}`}
                className="group card-hover rounded-2xl p-6 border border-navy-100 flex flex-col"
              >
                <div className="text-4xl mb-4">{icons[product.slug] || "🔧"}</div>
                <h3 className="text-lg font-bold text-navy-900 group-hover:text-primary-600 transition-colors">
                  {product.title}
                </h3>
                <p className="mt-2 text-sm text-navy-500 leading-relaxed flex-1">
                  {product.subtitle}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.certifications?.map((cert) => (
                    <span key={cert} className="text-xs bg-navy-50 text-navy-600 px-2 py-1 rounded">
                      {cert}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center text-sm font-medium text-primary-600 group-hover:text-primary-700">
                  Learn more
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center">
            <Link href="/products" className="btn-secondary">
              View All Products
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}
