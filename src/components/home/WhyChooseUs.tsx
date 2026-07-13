import Container from "@/components/ui/Container"
import SectionTitle from "@/components/ui/SectionTitle"
import ScrollReveal from "@/components/ui/ScrollReveal"
import { WHY_CHOOSE_US } from "@/lib/constants"

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <ScrollReveal>
          <SectionTitle
            label="Why Delin"
            title="Why Choose Delin HVAC?"
            subtitle="We combine decades of manufacturing expertise with modern technology to deliver refrigeration solutions that exceed expectations."
          />
        </ScrollReveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.08}>
              <div className="card-hover rounded-2xl p-8 border border-navy-100 text-center">
                <div className="text-5xl mb-5">{item.icon}</div>
                <h3 className="text-lg font-bold text-navy-900">{item.title}</h3>
                <p className="mt-3 text-sm text-navy-500 leading-relaxed">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
