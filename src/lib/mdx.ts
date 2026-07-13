// ============================================================
// MDX Utilities for Blog
// ============================================================

import fs from "fs"
import path from "path"
import matter from "gray-matter"

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog")
const PRODUCTS_DIR = path.join(process.cwd(), "src", "content", "products")

export interface MDXMeta {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  tags: string[]
  coverImage?: string
  readingTime?: number
}

export interface MDXDocument {
  slug: string
  meta: MDXMeta
  content: string
}

// --------------- BLOG ---------------

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  const files = fs.readdirSync(BLOG_DIR)
  return files
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => f.replace(/\.(md|mdx)$/, ""))
}

function parseMDXFile(filePath: string, slug: string): MDXDocument {
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  return {
    slug,
    meta: data as MDXMeta,
    content,
  }
}

export function getBlogPost(slug: string): MDXDocument | null {
  const extensions = [".md", ".mdx"]
  for (const ext of extensions) {
    const filePath = path.join(BLOG_DIR, `${slug}${ext}`)
    if (fs.existsSync(filePath)) {
      return parseMDXFile(filePath, slug)
    }
  }
  return null
}

export function getAllBlogPosts(): MDXDocument[] {
  const slugs = getAllBlogSlugs()
  return slugs
    .map((slug) => getBlogPost(slug))
    .filter((post): post is MDXDocument => post !== null)
    .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime())
}

export function getBlogCategories(): string[] {
  const posts = getAllBlogPosts()
  return [...new Set(posts.map((p) => p.meta.category))]
}

export function getBlogTags(): string[] {
  const posts = getAllBlogPosts()
  const tags = new Set<string>()
  posts.forEach((p) => p.meta.tags?.forEach((t) => tags.add(t)))
  return [...tags]
}

// --------------- PRODUCTS ---------------

export function getProductMDX(slug: string): MDXDocument | null {
  const extensions = [".md", ".mdx"]
  for (const ext of extensions) {
    const filePath = path.join(PRODUCTS_DIR, `${slug}${ext}`)
    if (fs.existsSync(filePath)) {
      return parseMDXFile(filePath, slug)
    }
  }
  return null
}
