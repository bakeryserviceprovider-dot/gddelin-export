// ============================================================
// Types for Delin HVAC&Refrigeration Export Website
// ============================================================

export interface Product {
  slug: string
  title: string
  subtitle: string
  category: string
  description: string
  features: string[]
  applications: string[]
  specifications: SpecItem[]
  images: string[]
  certifications?: string[]
  seo: SEOData
}

export interface SpecItem {
  label: string
  value: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  category: string
  tags: string[]
  coverImage?: string
  readingTime?: number
  seo: SEOData
}

export interface SEOData {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  canonicalUrl?: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  product?: string
  message: string
}

export interface Certification {
  name: string
  description: string
  image: string
}
