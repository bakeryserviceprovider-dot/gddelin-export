import Link from "next/link"
import Container from "@/components/ui/Container"
import SectionTitle from "@/components/ui/SectionTitle"
import ScrollReveal from "@/components/ui/ScrollReveal"
import { COMPANY } from "@/lib/constants"

export default function AboutPreview() {
  return (
    <section className="section-padding bg-navy-50">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div>
              <SectionTitle
                align="left"
                label="About Delin"
                title="Your Trusted Partner in Refrigeration Manufacturing"
                subtitle="With over 20 years of specialized experience, Delin has grown from a small workshop into a leading refrigeration equipment manufacturer serving clients worldwide."
              />

              <div className="mt-10 grid grid-cols-2 gap-6">
                {[
                  { value: COMPANY.since, label: "Founded", suffix: "" },
                  { value: COMPANY.employees, label: "Employees", suffix: "+" },
                  { value: COMPANY.factoryArea, label: "Factory Area", suffix: "" },
                  { value: COMPANY.exportCountries, label: "Export Countries", suffix: "+" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl p-5 border border-navy-100">
                    <div className="text-2xl font-bold text-primary-600">
                      {stat.value}
                      {stat.suffix}
                    </div>
                    <div className="text-sm text-navy-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/about" className="btn-primary">
                  Learn More About Us
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div className="space-y-6">
              {[
                {
                  title: "Manufacturing Excellence",
                  desc: "8,000㎡ modern facility with advanced CNC machining, automated welding, and precision testing equipment.",
                },
                {
                  title: "Quality Control",
                  desc: "Every unit undergoes 100% hydrostatic testing, performance verification, and multi-point quality inspection before shipping.",
                },
                {
                  title: "R&D Capability",
                  desc: "In-house engineering team with 15+ years of experience in refrigeration system design and optimization.",
                },
                {
                  title: "Global Logistics",
                  desc: "Established shipping partnerships with major freight carriers ensure timely delivery to any port worldwide.",
                },
              ].map((item, i) => (
                <div key={item.title} className="flex gap-4 bg-white rounded-xl p-5 border border-navy-100">
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                    {item.title[0]}
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900">{item.title}</h4>
                    <p className="text-sm text-navy-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  )
}
