import Link from "next/link"
import Image from "next/image"
import Container from "@/components/ui/Container"
import { COMPANY } from "@/lib/constants"

const products = [
  { name: "Seafood Constant Temp Machine", slug: "seafood-constant-temperature-machine", img: "/images/products/seafood-machine-1.svg" },
  { name: "Industrial Water Chiller", slug: "industrial-water-chiller", img: "/images/products/industrial-chiller-1.svg" },
  { name: "Titanium Evaporator", slug: "titanium-evaporator", img: "/images/products/titanium-evaporator-1.svg" },
  { name: "SS Heat Exchanger", slug: "stainless-steel-heat-exchanger", img: "/images/products/heat-exchanger-1.svg" },
]

export default function Hero() {
  return (
    <>
      {/* ===== HERO TOP ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-navy-900 to-primary-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-primary-500/10 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px]" />

        <Container className="relative z-10 pt-32 pb-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT: Copy */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-2 text-sm text-white/80">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                China Factory Direct · CE/ISO Certified · Since 2002
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-white">
                OEM/ODM Refrigeration{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-emerald-300">
                  Equipment Manufacturer
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-xl">
                <strong className="text-white">20+ years</strong> manufacturing seafood constant temperature machines, industrial chillers, titanium evaporators &amp; heat exchangers. <strong className="text-white">Factory-direct</strong>, CE/ISO certified, shipped worldwide.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                {[
                  { v: "20+", l: "Years" }, { v: "8,000㎡", l: "Factory" },
                  { v: "50,000+", l: "Units/Year" }, { v: "30+", l: "Countries" },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <div className="text-2xl font-bold text-white">{s.v}</div>
                    <div className="text-xs text-slate-400">{s.l}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/contact" className="inline-flex items-center gap-2.5 rounded-xl bg-emerald-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-600/30 transition-all duration-300 hover:bg-emerald-700 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Get Factory Price
                </Link>
                <Link href="/products" className="inline-flex items-center gap-2.5 rounded-xl border-2 border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/30">
                  View All Products →
                </Link>
              </div>
            </div>

            {/* RIGHT: Product images showcase */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Main product display card */}
                <div className="relative rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 p-6 overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl" />

                  {/* Product grid with IMAGES */}
                  <div className="relative z-10 grid grid-cols-2 gap-4">
                    {products.slice(0, 4).map((p) => (
                      <Link key={p.slug} href={`/products/${p.slug}`} className="group block rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 overflow-hidden hover:bg-white/15 transition-all hover:-translate-y-1">
                        <div className="aspect-[4/3] relative bg-gradient-to-br from-white/5 to-white/0 flex items-center justify-center p-3">
                          <Image src={p.img} alt={p.name} width={200} height={150} className="w-full h-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-3 text-center">
                          <div className="text-white text-xs font-medium leading-tight">{p.name}</div>
                          <div className="text-emerald-300 text-[10px] mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">View Details →</div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Certification badges */}
                  <div className="relative z-10 mt-5 flex justify-center gap-4">
                    {["CE Certified", "ISO 9001", "SGS Verified"].map((b) => (
                      <span key={b} className="text-[10px] bg-white/10 text-white/60 rounded-full px-2.5 py-1">{b}</span>
                    ))}
                  </div>
                </div>

                {/* Floating factory-direct badge */}
                <div className="absolute -bottom-4 -left-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-5 py-3 shadow-xl shadow-emerald-600/30">
                  <div className="text-white text-sm font-bold">🏭 Factory Direct</div>
                  <div className="text-emerald-200 text-xs">No middleman markups</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== PRODUCT SHOWCASE STRIP ===== */}
      <section className="relative -mt-16 z-20">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((p, i) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="group relative bg-white rounded-2xl shadow-xl shadow-navy-900/10 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                {/* Product image */}
                <div className="aspect-[4/3] bg-gradient-to-br from-navy-50 to-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-transparent to-navy-50/30" />
                  <Image
                    src={p.img}
                    alt={p.name}
                    width={240}
                    height={180}
                    className="w-full h-full object-contain relative z-10 drop-shadow-md group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {/* Info bar */}
                <div className="p-3 sm:p-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-navy-800 leading-tight">{p.name}</div>
                    <div className="text-[10px] sm:text-xs text-navy-400 mt-0.5">Click to view specs →</div>
                  </div>
                  <div className="text-navy-300 group-hover:text-primary-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
