import type { Metadata } from "next"
import Container from "@/components/ui/Container"
import JsonLd from "@/components/seo/JsonLd"
import { COMPANY } from "@/lib/constants"
import ContactForm from "./ContactForm"

export const metadata: Metadata = {
  title: "Contact Us - Get a Free Quote | Delin HVAC",
  description:
    "Contact Delin HVAC for product inquiries, custom manufacturing requests, and partnership opportunities. Factory-direct pricing, fast response within 24 hours.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Delin HVAC - Refrigeration Equipment Quotes",
    description: "Get factory-direct pricing and professional support for your refrigeration needs.",
  },
}

export default function ContactPage() {
  return (
    <>
      <JsonLd
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${COMPANY.website}/` },
            { "@type": "ListItem", position: 2, name: "Contact", item: `${COMPANY.website}/contact` },
          ],
        }}
      />

      {/* Header */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-800 pt-32 pb-20">
        <Container>
          <div className="max-w-3xl">
            <span className="badge-primary bg-white/10 text-white border border-white/10 mb-4 inline-block">
              Contact
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Get in Touch with Delin HVAC
            </h1>
            <p className="mt-4 text-lg text-navy-200 leading-relaxed">
              Ready to discuss your project? Fill out the form below and our team will get back to you within 24 hours with a free consultation and quote.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <Container>
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Send Us an Inquiry</h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <div className="card rounded-2xl p-8 border border-navy-100 space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-navy-900 mb-4">Contact Information</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-navy-900">Email</div>
                        <a href={`mailto:${COMPANY.email}`} className="text-sm text-primary-600 hover:text-primary-700">
                          {COMPANY.email}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-navy-900">Phone / WhatsApp</div>
                        <a href={`tel:${COMPANY.phone}`} className="text-sm text-primary-600 hover:text-primary-700 block">
                          {COMPANY.phone}
                        </a>
                        <a
                          href={`https://wa.me/${COMPANY.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-accent-600 hover:text-accent-700"
                        >
                          WhatsApp Us
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-navy-900">Address</div>
                        <p className="text-sm text-navy-500">{COMPANY.address}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-navy-900">Working Hours</div>
                        <p className="text-sm text-navy-500">{COMPANY.workingHours}</p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Quick CTA */}
                <div className="rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 p-6 border border-primary-100">
                  <h4 className="font-bold text-navy-900">Need a Quick Response?</h4>
                  <p className="mt-2 text-sm text-navy-500">
                    Message us on WhatsApp for the fastest response. We typically reply within 1-2 hours during business hours.
                  </p>
                  <a
                    href={`https://wa.me/${COMPANY.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-accent mt-4 inline-flex text-sm"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
