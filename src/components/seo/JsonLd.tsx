import { COMPANY } from "@/lib/constants"

interface JsonLdProps {
  type?: "Organization" | "Product" | "Article" | "BreadcrumbList" | "FAQPage" | "WebSite"
  data?: Record<string, unknown>
}

export default function JsonLd({ type = "Organization", data = {} }: JsonLdProps) {
  const baseUrl = COMPANY.website

  const schemas: Record<string, Record<string, unknown>> = {
    Organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: COMPANY.shortName,
      alternateName: COMPANY.nameZh,
      description: COMPANY.description,
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      foundingDate: "2002",
      address: {
        "@type": "PostalAddress",
        addressCountry: "CN",
        addressRegion: "Guangdong",
        addressLocality: "Foshan",
        streetAddress: "Xin'an Industrial Zone, Danzao Town, Nanhai District",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: COMPANY.phone,
        contactType: "sales",
        email: COMPANY.email,
        availableLanguage: ["English", "Chinese"],
      },
      sameAs: [],
      numberOfEmployees: { "@type": "QuantitativeValue", value: "150" },
      areaServed: "Worldwide",
    },
    WebSite: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: COMPANY.shortName,
      url: baseUrl,
      description: COMPANY.description,
      potentialAction: {
        "@type": "SearchAction",
        target: `${baseUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  }

  const schema = type === "Organization" || type === "WebSite"
    ? schemas[type]
    : { "@context": "https://schema.org", "@type": type, ...data }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  )
}
