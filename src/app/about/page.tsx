import type { Metadata } from "next"
import Link from "next/link"
import Container from "@/components/ui/Container"
import SectionTitle from "@/components/ui/SectionTitle"
import JsonLd from "@/components/seo/JsonLd"
import { COMPANY, WHY_CHOOSE_US } from "@/lib/constants"

export const metadata: Metadata = {
  title: "About Us - Delin HVAC Refrigeration Manufacturer",
  description:
    "Learn about Delin's 20+ year history, 8,000㎡ factory, 150+ employees, and commitment to quality refrigeration manufacturing. CE/ISO certified, exporting to 30+ countries.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Delin HVAC - Refrigeration Manufacturing Excellence",
    description: "20+ years of refrigeration manufacturing expertise in Foshan, China.",
  },
}

export default function AboutPage() {
  return (
    <>
      <JsonLd
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${COMPANY.website}/` },
            { "@type": "ListItem", position: 2, name: "About Us", item: `${COMPANY.website}/about` },
          ],
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-800 pt-32 pb-20">
        <Container>
          <div className="max-w-3xl">
            <span className="badge-primary bg-white/10 text-white border border-white/10 mb-4 inline-block">
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              China&apos;s Trusted Refrigeration Equipment Manufacturer
            </h1>
            <p className="mt-4 text-lg text-navy-200 leading-relaxed">
              From a small workshop in Foshan to a global exporter serving 30+ countries — our journey of quality and innovation.
            </p>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTitle
                align="left"
                label="Our Story"
                title="Two Decades of Refrigeration Excellence"
              />
              <div className="mt-8 space-y-4 text-navy-600 leading-relaxed">
                <p>
                  Founded in 2002, Foshan Delin Cooling & Heating Equipment Industrial Co., Ltd. started
                  with a simple mission: to provide reliable, high-quality refrigeration solutions at factory-direct prices.
                </p>
                <p>
                  Over the past two decades, we have grown from a small team into a modern manufacturing facility
                  spanning 8,000 square meters, equipped with advanced CNC machining centers, automated welding
                  production lines, and comprehensive testing laboratories.
                </p>
                <p>
                  Today, Delin employs over 150 skilled workers and engineers, producing more than 50,000 units
                  annually. Our products are exported to Southeast Asia, the Middle East, Africa, Europe, and
                  South America, serving industries from seafood processing to industrial manufacturing.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "2002", label: "Founded" },
                { value: "8,000㎡", label: "Factory Area" },
                { value: "150+", label: "Employees" },
                { value: "50,000+", label: "Annual Output" },
                { value: "30+", label: "Export Countries" },
                { value: "20+", label: "Years Experience" },
              ].map((stat) => (
                <div key={stat.label} className="card rounded-2xl p-6 text-center border border-navy-100">
                  <div className="text-2xl sm:text-3xl font-bold text-primary-600">{stat.value}</div>
                  <div className="text-sm text-navy-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Factory & Quality */}
      <section className="section-padding bg-navy-50">
        <Container>
          <SectionTitle
            label="Manufacturing"
            title="Our Factory & Quality Control"
            subtitle="Modern facilities and rigorous quality management ensure every product meets international standards."
          />

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Advanced Equipment",
                desc: "CNC machining centers, automatic welding robots, and precision testing instruments ensure manufacturing accuracy.",
                icon: "🏗️",
              },
              {
                title: "Quality Testing",
                desc: "100% hydrostatic pressure testing, performance verification, and multi-point inspection before shipping.",
                icon: "🔬",
              },
              {
                title: "Certifications",
                desc: "CE, ISO 9001, and SGS certified. Our quality management system meets international standards.",
                icon: "📜",
              },
            ].map((item) => (
              <div key={item.title} className="card-hover rounded-2xl p-8 border border-navy-100 text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-navy-900">{item.title}</h3>
                <p className="mt-3 text-sm text-navy-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <Container>
          <SectionTitle
            label="Advantages"
            title="Why Global Clients Choose Delin"
          />
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_CHOOSE_US.map((item) => (
              <div key={item.title} className="card-hover rounded-2xl p-8 border border-navy-100 text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-navy-900">{item.title}</h3>
                <p className="mt-3 text-sm text-navy-500">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary-700 to-accent-700 py-20">
        <Container className="text-center">
          <h2 className="text-3xl font-bold text-white">Partner with Delin Today</h2>
          <p className="mt-4 text-white/80 max-w-xl mx-auto">
            Experience quality manufacturing, competitive pricing, and professional service. Contact us for your next project.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-white">
              Contact Us
            </Link>
            <Link href="/products" className="btn-outline-white">
              View Products
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
