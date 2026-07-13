export const COMPANY = {
  name: "Foshan Delin Cooling & Heating Equipment Industrial Co., Ltd.",
  shortName: "Delin HVAC",
  nameZh: "佛山市德霖冷暖设备实业有限公司",
  slogan: "Professional Refrigeration & Heat Exchange Solutions Since 2002",
  description:
    "Delin is a leading manufacturer of seafood constant temperature machines, industrial water chillers, titanium evaporators, and stainless steel heat exchangers in China. With over 20 years of experience, we serve clients across seafood processing, industrial cooling, aquaculture, and HVAC industries worldwide.",
  since: 2002,
  employees: "150+",
  factoryArea: "8,000㎡",
  annualOutput: "50,000+ units",
  exportCountries: "30+",
  address:
    "Xin'an Industrial Zone, Danzao Town, Nanhai District, Foshan City, Guangdong Province, China",
  phone: "+86-757-82122021",
  email: "info@gddelin.cn",
  website: "https://aquachilltech.com",
  whatsapp: "+86-757-82122021",
  workingHours: "Mon-Fri 8:30-17:30 (GMT+8)",
} as const

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Seafood Constant Temp Machine", href: "/products/seafood-constant-temperature-machine" },
      { label: "Industrial Water Chiller", href: "/products/industrial-water-chiller" },
      { label: "Titanium Evaporator", href: "/products/titanium-evaporator" },
      { label: "Stainless Steel Heat Exchanger", href: "/products/stainless-steel-heat-exchanger" },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const

export const WHY_CHOOSE_US = [
  {
    title: "20+ Years of Expertise",
    description:
      "With over two decades of specialized experience in refrigeration and heat exchange manufacturing, we deliver proven quality and reliability.",
    icon: "🏭",
  },
  {
    title: "Factory Direct Pricing",
    description:
      "As a direct manufacturer with 8,000㎡ facility, we offer competitive pricing without middlemen markups.",
    icon: "💰",
  },
  {
    title: "Custom OEM/ODM Service",
    description:
      "We provide tailored solutions including custom specifications, OEM branding, and ODM product development to meet your exact requirements.",
    icon: "⚙️",
  },
  {
    title: "Quality Guaranteed",
    description:
      "All products undergo rigorous testing with CE, ISO 9001, and SGS certifications ensuring international quality standards.",
    icon: "✅",
  },
  {
    title: "Global Export Experience",
    description:
      "Exporting to 30+ countries across Southeast Asia, Middle East, Africa, Europe, and South America.",
    icon: "🌍",
  },
  {
    title: "Professional Technical Support",
    description:
      "Our experienced engineering team provides comprehensive technical support, installation guidance, and after-sales service.",
    icon: "🔧",
  },
] as const

export const SOCIAL_LINKS = {
  whatsapp: "https://wa.me/8675782122021",
  email: "mailto:info@gddelin.cn",
}

export const SITE_CONFIG = {
  url: "https://aquachilltech.com",
  title: "Delin HVAC - Professional Refrigeration & Heat Exchange Manufacturer",
  defaultDescription:
    "Delin is a leading manufacturer of seafood constant temperature machines, industrial water chillers, titanium evaporators, and stainless steel heat exchangers. Factory direct, CE/ISO certified, 20+ years experience.",
  defaultKeywords: [
    "seafood constant temperature machine",
    "industrial water chiller",
    "titanium evaporator",
    "titanium coil",
    "stainless steel heat exchanger",
    "refrigeration manufacturer China",
    "HVAC manufacturer",
    "Foshan Delin",
    "aquaculture cooling system",
  ],
}
