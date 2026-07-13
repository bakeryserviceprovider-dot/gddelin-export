import Link from "next/link"
import Container from "@/components/ui/Container"
import { COMPANY } from "@/lib/constants"

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-primary-900">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary-600/5 blur-3xl" />
      </div>

      <Container className="relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm text-white/80">
              <span className="flex h-2 w-2 rounded-full bg-accent-400 animate-pulse" />
              {COMPANY.shortName} — {COMPANY.slogan}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white text-balance">
              Professional Refrigeration &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-green-300">
                Heat Exchange Solutions
              </span>{" "}
              for Global Industries
            </h1>

            <p className="text-lg text-navy-200 leading-relaxed max-w-xl">
              {COMPANY.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-white">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Explore Products
              </Link>
              <Link href="/contact" className="btn-outline-white">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Request Quote
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-navy-300 text-sm">
                <svg className="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                CE Certified
              </div>
              <div className="flex items-center gap-2 text-navy-300 text-sm">
                <svg className="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                ISO 9001
              </div>
              <div className="flex items-center gap-2 text-navy-300 text-sm">
                <svg className="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                20+ Years Experience
              </div>
              <div className="flex items-center gap-2 text-navy-300 text-sm">
                <svg className="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Factory Direct Price
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              <div className="w-96 h-96 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <div className="text-center space-y-6 p-8">
                  <div className="text-7xl">❄️</div>
                  <div className="text-white/80 text-lg font-medium">
                    Precision Cooling Solutions
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="text-2xl font-bold text-white">{COMPANY.annualOutput}</div>
                      <div className="text-xs text-navy-300">Annual Output</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="text-2xl font-bold text-white">{COMPANY.exportCountries}</div>
                      <div className="text-xs text-navy-300">Countries Exported</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating decorators */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent-500/20 rounded-full blur-xl animate-pulse-slow" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary-500/20 rounded-full blur-xl animate-pulse-slow" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
