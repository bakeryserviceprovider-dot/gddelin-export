import Link from "next/link"
import Container from "@/components/ui/Container"
import { COMPANY } from "@/lib/constants"

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-navy-900 to-primary-900">
      {/* Background pattern - subtle grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-primary-500/10 blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px]" />

      <Container className="relative z-10 pt-28 pb-16">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* ======== LEFT: Content ======== */}
          <div className="lg:col-span-7 space-y-7">

            {/* Trusted badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-2 text-sm text-white/80">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              China Factory · Exported to 30+ Countries · Since 2002
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-white">
              OEM/ODM Refrigeration{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-emerald-300">
                Equipment Manufacturer
              </span>
            </h1>

            {/* Sub-headline - addresses buyer pain points */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
              <strong className="text-white">20+ years</strong> manufacturing seafood constant temperature machines, industrial chillers, titanium evaporators &amp; heat exchangers.{" "}
              <strong className="text-white">Factory-direct pricing</strong>, CE/ISO certified, global shipping.
            </p>

            {/* Key selling points in bullet format */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {[
                { icon: "🏭", text: "8,000㎡ manufacturing facility" },
                { icon: "🔧", text: "Custom OEM/ODM accepted" },
                { icon: "✅", text: "CE, ISO 9001, SGS certified" },
                { icon: "🚢", text: "Export to 30+ countries" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2.5 text-slate-300 text-sm">
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 rounded-xl bg-emerald-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-600/30 transition-all duration-300 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/40 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Get Factory Price Now
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2.5 rounded-xl border-2 border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/30"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Browse Products
              </Link>
            </div>

            {/* Social proof - quick stats row */}
            <div className="flex flex-wrap items-center gap-8 pt-6 border-t border-white/10">
              {[
                { value: "20+", label: "Years Experience" },
                { value: "8,000㎡", label: "Factory Area" },
                { value: "50,000+", label: "Units/Year" },
                { value: "30+", label: "Export Countries" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ======== RIGHT: Product showcase visual ======== */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative">
              {/* Main product card */}
              <div className="relative rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 p-8 overflow-hidden">
                {/* Inner glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl" />

                {/* Product icons grid */}
                <div className="relative z-10 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-white/10 backdrop-blur-sm p-5 text-center border border-white/10 hover:bg-white/15 transition-colors">
                    <div className="text-4xl mb-2">🐟</div>
                    <div className="text-white text-sm font-medium">Seafood Temp Machine</div>
                    <div className="text-emerald-300 text-xs mt-1">1–30 HP</div>
                  </div>
                  <div className="rounded-xl bg-white/10 backdrop-blur-sm p-5 text-center border border-white/10 hover:bg-white/15 transition-colors">
                    <div className="text-4xl mb-2">❄️</div>
                    <div className="text-white text-sm font-medium">Industrial Chiller</div>
                    <div className="text-emerald-300 text-xs mt-1">1–60 HP</div>
                  </div>
                  <div className="rounded-xl bg-white/10 backdrop-blur-sm p-5 text-center border border-white/10 hover:bg-white/15 transition-colors">
                    <div className="text-4xl mb-2">🔄</div>
                    <div className="text-white text-sm font-medium">Titanium Evaporator</div>
                    <div className="text-emerald-300 text-xs mt-1">Grade 1/2 Ti</div>
                  </div>
                  <div className="rounded-xl bg-white/10 backdrop-blur-sm p-5 text-center border border-white/10 hover:bg-white/15 transition-colors">
                    <div className="text-4xl mb-2">⚡</div>
                    <div className="text-white text-sm font-medium">SS Heat Exchanger</div>
                    <div className="text-emerald-300 text-xs mt-1">304/316L</div>
                  </div>
                </div>

                {/* Certificate badges */}
                <div className="relative z-10 mt-6 flex justify-center gap-6">
                  <div className="flex items-center gap-2 bg-white/10 rounded-full px-3.5 py-1.5 text-xs text-white/70">
                    <span className="text-emerald-400 font-semibold">CE</span> Certified
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-full px-3.5 py-1.5 text-xs text-white/70">
                    <span className="text-emerald-400 font-semibold">ISO 9001</span> Certified
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-3 -left-3 rounded-xl bg-emerald-600 px-5 py-3 shadow-lg shadow-emerald-600/30">
                <div className="text-white text-xs font-semibold">⚡ Factory Direct</div>
                <div className="text-emerald-200 text-[10px]">No middleman markup</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
