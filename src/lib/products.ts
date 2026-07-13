// ============================================================
// Product Data (can be swapped for a Headless CMS later)
// ============================================================

import { Product } from "@/types"

export const products: Product[] = [
  {
    slug: "seafood-constant-temperature-machine",
    title: "Seafood Constant Temperature Machine",
    subtitle: "Precise Temperature Control for Seafood Preservation & Aquaculture",
    category: "Refrigeration Equipment",
    description: `Our seafood constant temperature machine is specifically designed for seafood processing,
aquaculture farms, fish markets, and restaurants requiring precise water temperature control.
Using advanced compressor technology and titanium heat exchangers, it maintains optimal water
temperature year-round to keep seafood fresh and alive. Available in various capacities from
1HP to 30HP to suit different application scales.`,
    features: [
      "Precise digital temperature control (±0.5°C accuracy)",
      "Pure titanium heat exchanger for corrosion resistance in seawater",
      "Energy-efficient Copeland/Emerson compressors",
      "Microcomputer intelligent control system with auto-diagnosis",
      "Low noise operation (< 55dB)",
      "Anti-corrosion casing suitable for humid environments",
      "Automatic start/stop and alarm functions",
      "R410A environmentally friendly refrigerant",
    ],
    applications: [
      "Seafood processing plants",
      "Aquaculture farms and hatcheries",
      "Seafood restaurants and supermarkets",
      "Fish markets and live seafood storage",
      "Marine research institutions",
      "Ocean parks and aquariums",
    ],
    specifications: [
      { label: "Cooling Capacity", value: "2.8kW – 85kW (1HP – 30HP)" },
      { label: "Temperature Range", value: "+5°C – +35°C" },
      { label: "Control Accuracy", value: "±0.5°C" },
      { label: "Compressor", value: "Copeland / Emersond / Panasonic" },
      { label: "Heat Exchanger", value: "Pure Titanium (Grade 2)" },
      { label: "Refrigerant", value: "R410A / R22" },
      { label: "Power Supply", value: "220V/50Hz/1Ph or 380V/50Hz/3Ph" },
      { label: "Material", value: "Stainless Steel 304 / Galvanized Steel" },
    ],
    images: ["/images/products/seafood-machine-1.svg"],
    certifications: ["CE", "ISO 9001"],
    seo: {
      title: "Seafood Constant Temperature Machine - Factory Direct | Delin",
      description:
        "Professional seafood constant temperature machine manufacturer in China. 1HP-30HP, ±0.5°C accuracy, titanium heat exchanger, CE/ISO certified. Factory direct price.",
      keywords: [
        "seafood constant temperature machine",
        "seafood cooling system",
        "aquaculture chiller",
        "fish tank temperature controller",
        "seafood preservation equipment",
      ],
    },
  },
  {
    slug: "industrial-water-chiller",
    title: "Industrial Water Chiller",
    subtitle: "High-Performance Cooling Solutions for Industrial Applications",
    category: "Cooling Equipment",
    description: `Our industrial water chillers provide reliable and efficient cooling for a wide range of
industrial processes. From plastic injection molding to food processing, laser cutting to
chemical reactors — our chillers deliver consistent cooling performance with energy-saving
operation. Available in air-cooled and water-cooled configurations.`,
    features: [
      "High-efficiency shell-and-tube or plate heat exchanger",
      "Industrial-grade Copeland compressor for long service life",
      "Intelligent PLC control system with touch screen",
      "Multiple protection functions: overload, phase sequence, high/low pressure",
      "Energy-saving design with up to 30% power reduction",
      "Compact footprint for easy installation",
      "Low maintenance requirements",
      "Customizable temperature ranges available",
    ],
    applications: [
      "Plastic injection molding cooling",
      "Food & beverage processing",
      "Laser cutting and welding equipment",
      "Chemical and pharmaceutical reactors",
      "Industrial printing and packaging",
      "Data center cooling",
      "Ultrasonic cleaning equipment",
    ],
    specifications: [
      { label: "Cooling Capacity", value: "3.5kW – 210kW (1HP – 60HP)" },
      { label: "Temperature Range", value: "-5°C – +40°C" },
      { label: "Control Accuracy", value: "±1°C (standard) / ±0.5°C (premium)" },
      { label: "Compressor", value: "Copeland / Hanbell" },
      { label: "Condenser Type", value: "Air-cooled or Water-cooled" },
      { label: "Refrigerant", value: "R410A / R134a / R407C" },
      { label: "Power Supply", value: "380V/50Hz/3Ph (customizable)" },
      { label: "Protection Class", value: "IP54 (control panel)" },
    ],
    images: ["/images/products/industrial-chiller-1.svg"],
    certifications: ["CE", "ISO 9001", "SGS"],
    seo: {
      title: "Industrial Water Chiller Manufacturer - CE/ISO Certified | Delin",
      description:
        "Industrial water chiller manufacturer in China. 1HP-60HP air-cooled and water-cooled chillers for plastic, food, laser, chemical industries. Factory price, global shipping.",
      keywords: [
        "industrial water chiller",
        "industrial chiller manufacturer",
        "water cooling chiller",
        "air cooled chiller",
        "process cooling chiller",
        "China chiller factory",
      ],
    },
  },
  {
    slug: "titanium-evaporator",
    title: "Titanium Evaporator (Titanium Coil/Titanium Barrel)",
    subtitle: "Corrosion-Resistant Heat Exchange for Seawater & Chemical Applications",
    category: "Heat Exchanger Components",
    description: `Our pure titanium evaporators (also known as titanium coils or titanium barrels) are
engineered for maximum corrosion resistance in seawater, brine, and chemical environments.
Made from Grade 1 and Grade 2 pure titanium, they offer exceptional heat transfer efficiency
and longevity. Widely used in seafood cooling systems, heat pumps, and chemical processing.`,
    features: [
      "Pure titanium Grade 1/2 construction — zero corrosion in seawater",
      "Excellent heat transfer coefficient",
      "Compact and lightweight design",
      "Customizable coil diameter, length, and tube count",
      "Resistance to chlorine, bromide, and acidic solutions",
      "Working pressure up to 1.0MPa (customizable to 1.6MPa)",
      "Extended service life (10+ years in normal operation)",
      "TIG welded joints for leak-proof reliability",
    ],
    applications: [
      "Seafood constant temperature machines",
      "Heat pump water heaters",
      "Swimming pool heat exchangers",
      "Chemical processing equipment",
      "Electroplating industry cooling",
      "Marine HVAC systems",
    ],
    specifications: [
      { label: "Material", value: "Pure Titanium TA1/TA2 (Grade 1/2)" },
      { label: "Tube Diameter", value: "Φ9.52mm – Φ19.05mm" },
      { label: "Design Pressure", value: "≤ 1.0MPa (custom ≤ 1.6MPa)" },
      { label: "Design Temperature", value: "-20°C – +120°C" },
      { label: "Connection Type", value: "Thread / Flange / Copper flare" },
      { label: "Surface Treatment", value: "Pickling / Polishing" },
      { label: "Standard Sizes", value: "2HP – 30HP matching" },
      { label: "Customization", value: "OEM sizes and configurations available" },
    ],
    images: ["/images/products/titanium-evaporator-1.svg"],
    certifications: ["ISO 9001", "SGS"],
    seo: {
      title: "Pure Titanium Evaporator / Titanium Coil Manufacturer | Delin",
      description:
        "Pure titanium evaporator (titanium coil/barrel) manufacturer in China. Grade 1/2 titanium, anti-corrosion, for seawater and chemical applications. Custom sizes available. Factory direct.",
      keywords: [
        "titanium evaporator",
        "titanium coil",
        "titanium barrel",
        "titanium heat exchanger",
        "titanium coil for chiller",
        "seawater heat exchanger",
      ],
    },
  },
  {
    slug: "stainless-steel-heat-exchanger",
    title: "Stainless Steel Heat Exchanger",
    subtitle: "Durable and Efficient Heat Transfer for HVAC & Industrial Systems",
    category: "Heat Exchanger Components",
    description: `Our stainless steel heat exchangers are designed for efficient heat transfer in HVAC,
refrigeration, and industrial processing systems. Available in shell-and-tube, plate, and
coaxial configurations, they offer excellent thermal performance, durability, and
corrosion resistance in demanding environments.`,
    features: [
      "High-quality stainless steel 304/316L construction",
      "High heat transfer efficiency with optimized flow design",
      "Shell-and-tube, plate, and coaxial types available",
      "Excellent resistance to oxidation and corrosion",
      "Compact design saving installation space",
      "Easy maintenance with replaceable tube bundles (shell-and-tube type)",
      "High working pressure capability",
      "Wide temperature range suitability",
    ],
    applications: [
      "HVAC systems and central air conditioning",
      "Refrigeration and cold storage",
      "Industrial process heating/cooling",
      "Waste heat recovery systems",
      "Food and beverage processing",
      "Pharmaceutical and biotech equipment",
    ],
    specifications: [
      { label: "Material", value: "Stainless Steel 304 / 316L" },
      { label: "Type", value: "Shell-and-Tube / Plate / Coaxial" },
      { label: "Design Pressure", value: "≤ 2.0MPa (custom ≤ 4.0MPa)" },
      { label: "Design Temperature", value: "-30°C – +200°C" },
      { label: "Connection Size", value: "1/2\" – 6\" (custom available)" },
      { label: "Surface Finish", value: "Natural / Pickling / Polishing" },
      { label: "Welding Standard", value: "TIG/Argon arc, ASME IX compliant" },
      { label: "Testing", value: "Hydrostatic test 100% before delivery" },
    ],
    images: ["/images/products/heat-exchanger-1.svg"],
    certifications: ["CE", "ISO 9001"],
    seo: {
      title: "Stainless Steel Heat Exchanger Manufacturer | Delin",
      description:
        "Stainless steel heat exchanger manufacturer in China. Shell-and-tube, plate, coaxial types. SS304/316L, CE/ISO certified. For HVAC, refrigeration, industrial processing. Factory direct.",
      keywords: [
        "stainless steel heat exchanger",
        "shell and tube heat exchanger",
        "plate heat exchanger",
        "coaxial heat exchanger",
        "heat exchanger manufacturer China",
        "HVAC heat exchanger",
      ],
    },
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductCategories(): string[] {
  return [...new Set(products.map((p) => p.category))]
}

export function getRelatedProducts(currentSlug: string, limit = 3): Product[] {
  const current = getProductBySlug(currentSlug)
  if (!current) return []
  return products
    .filter((p) => p.slug !== currentSlug && p.category === current.category)
    .slice(0, limit)
}
