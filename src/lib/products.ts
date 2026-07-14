// ============================================================
// Product Data - Loaded from markdown files (editable via CMS)
// ============================================================

import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Product, SpecItem } from "@/types"

const PRODUCTS_DIR = path.join(process.cwd(), "src", "content", "products")
const FALLBACK_DATA = path.join(process.cwd(), "src", "lib", "products-fallback.ts")

interface ProductFrontmatter {
  title: string
  subtitle: string
  category: string
  features: string[]
  applications: string[]
  specifications: { label: string; value: string }[]
  certifications?: string[]
  images?: string[]
}

const SEO_DATA: Record<string, { title: string; description: string; keywords: string[] }> = {
  "seafood-constant-temperature-machine": {
    title: "Seafood Constant Temperature Machine - Factory Direct | Delin",
    description: "Professional seafood constant temperature machine manufacturer in China. 1HP-30HP, ±0.5°C accuracy, titanium heat exchanger, CE/ISO certified.",
    keywords: ["seafood constant temperature machine", "seafood cooling system", "aquaculture chiller"],
  },
  "industrial-water-chiller": {
    title: "Industrial Water Chiller Manufacturer - CE/ISO Certified | Delin",
    description: "Industrial water chiller manufacturer in China. 1HP-60HP air-cooled and water-cooled chillers. Factory price, global shipping.",
    keywords: ["industrial water chiller", "industrial chiller manufacturer", "water cooling chiller"],
  },
  "titanium-evaporator": {
    title: "Pure Titanium Evaporator / Titanium Coil Manufacturer | Delin",
    description: "Pure titanium evaporator manufacturer in China. Grade 1/2 titanium, anti-corrosion, for seawater and chemical applications.",
    keywords: ["titanium evaporator", "titanium coil", "titanium barrel", "titanium heat exchanger"],
  },
  "stainless-steel-heat-exchanger": {
    title: "Stainless Steel Heat Exchanger Manufacturer | Delin",
    description: "Stainless steel heat exchanger manufacturer in China. Shell-and-tube, plate, coaxial types. SS304/316L, CE/ISO certified.",
    keywords: ["stainless steel heat exchanger", "shell and tube heat exchanger", "plate heat exchanger"],
  },
}

function loadProductFromMarkdown(slug: string, filePath: string): Product | null {
  try {
    if (!fs.existsSync(filePath)) return null
    const raw = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(raw)
    const fm = data as unknown as ProductFrontmatter

    return {
      slug,
      title: fm.title || slug,
      subtitle: fm.subtitle || "",
      category: fm.category || "General",
      description: content?.trim() || "",
      features: fm.features || [],
      applications: fm.applications || [],
      specifications: (fm.specifications || []).map((s) => ({ label: s.label, value: s.value })),
      images: fm.images || [],
      certifications: fm.certifications || [],
      seo: SEO_DATA[slug] || {
        title: fm.title || slug,
        description: (content || "").slice(0, 160),
        keywords: [],
      },
    }
  } catch {
    return null
  }
}

// Mapping from slug to filename
const PRODUCT_FILES: Record<string, string> = {
  "seafood-constant-temperature-machine": "seafood-constant-temperature-machine.md",
  "industrial-water-chiller": "industrial-water-chiller.md",
  "titanium-evaporator": "titanium-evaporator.md",
  "stainless-steel-heat-exchanger": "stainless-steel-heat-exchanger.md",
}

export function getAllProducts(): Product[] {
  const products: Product[] = []
  for (const [slug, filename] of Object.entries(PRODUCT_FILES)) {
    const filePath = path.join(PRODUCTS_DIR, filename)
    const product = loadProductFromMarkdown(slug, filePath)
    if (product) products.push(product)
  }
  return products
}

// Re-export for backward compatibility
const _products = getAllProducts()
export const products: Product[] = _products.length > 0 ? _products : getFallbackProducts()

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductCategories(): string[] {
  return [...new Set(products.map((p) => p.category))]
}

export function getRelatedProducts(currentSlug: string, limit = 3): Product[] {
  const current = getProductBySlug(currentSlug)
  if (!current) return []
  return products.filter((p) => p.slug !== currentSlug && p.category === current.category).slice(0, limit)
}

// Fallback data if markdown files are not available (e.g. first build)
function getFallbackProducts(): Product[] {
  return [
    {
      slug: "seafood-constant-temperature-machine",
      title: "Seafood Constant Temperature Machine",
      subtitle: "Precise Temperature Control",
      category: "Refrigeration Equipment",
      description: "Professional seafood constant temperature machine manufacturer. 1HP-30HP.",
      features: ["Precise digital temperature control", "Pure titanium heat exchanger"],
      applications: ["Seafood processing", "Aquaculture"],
      specifications: [{ label: "Cooling Capacity", value: "2.8kW – 85kW" }],
      images: ["/images/products/seafood-machine-1.svg"],
      certifications: ["CE", "ISO 9001"],
      seo: SEO_DATA["seafood-constant-temperature-machine"],
    },
    {
      slug: "industrial-water-chiller",
      title: "Industrial Water Chiller",
      subtitle: "High-Performance Cooling",
      category: "Cooling Equipment",
      description: "Industrial water chiller manufacturer. 1HP-60HP.",
      features: ["High-efficiency heat exchanger", "Industrial-grade compressor"],
      applications: ["Plastic injection molding", "Food processing"],
      specifications: [{ label: "Cooling Capacity", value: "3.5kW – 210kW" }],
      images: ["/images/products/industrial-chiller-1.svg"],
      certifications: ["CE", "ISO 9001"],
      seo: SEO_DATA["industrial-water-chiller"],
    },
    {
      slug: "titanium-evaporator",
      title: "Titanium Evaporator",
      subtitle: "Corrosion-Resistant Heat Exchange",
      category: "Heat Exchanger Components",
      description: "Pure titanium evaporator manufacturer.",
      features: ["Pure titanium Grade 1/2", "Excellent heat transfer"],
      applications: ["Seafood cooling systems", "Heat pumps"],
      specifications: [{ label: "Material", value: "Pure Titanium TA1/TA2" }],
      images: ["/images/products/titanium-evaporator-1.svg"],
      certifications: ["ISO 9001"],
      seo: SEO_DATA["titanium-evaporator"],
    },
    {
      slug: "stainless-steel-heat-exchanger",
      title: "Stainless Steel Heat Exchanger",
      subtitle: "Durable Heat Transfer Solutions",
      category: "Heat Exchanger Components",
      description: "Stainless steel heat exchanger manufacturer.",
      features: ["SS304/316L construction", "High heat transfer efficiency"],
      applications: ["HVAC systems", "Industrial processing"],
      specifications: [{ label: "Material", value: "SS304 / 316L" }],
      images: ["/images/products/heat-exchanger-1.svg"],
      certifications: ["CE", "ISO 9001"],
      seo: SEO_DATA["stainless-steel-heat-exchanger"],
    },
  ]
}
