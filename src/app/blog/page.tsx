import Link from "next/link"
import type { Metadata } from "next"
import Container from "@/components/ui/Container"
import { getAllBlogPosts } from "@/lib/mdx"
import JsonLd from "@/components/seo/JsonLd"
import { COMPANY } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Blog - Refrigeration Industry Insights & Guides",
  description:
    "Expert guides, maintenance tips, and industry insights about seafood cooling, industrial chillers, heat exchangers, and refrigeration technology from Delin HVAC.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog - Delin HVAC Industry Insights",
    description: "Expert refrigeration guides and industry knowledge.",
  },
}

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <>
      <JsonLd
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${COMPANY.website}/` },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${COMPANY.website}/blog` },
          ],
        }}
      />

      {/* Header */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-800 pt-32 pb-20">
        <Container>
          <div className="max-w-3xl">
            <span className="badge-primary bg-white/10 text-white border border-white/10 mb-4 inline-block">
              Blog
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Industry Insights & Guides
            </h1>
            <p className="mt-4 text-lg text-navy-200">
              Expert knowledge, maintenance tips, and industry trends from our engineering team with 20+ years of refrigeration experience.
            </p>
          </div>
        </Container>
      </section>

      {/* Blog Posts */}
      <section className="section-padding bg-white">
        <Container>
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📝</div>
              <h2 className="text-2xl font-bold text-navy-900">Blog Posts Coming Soon</h2>
              <p className="mt-2 text-navy-500">
                We&apos;re preparing in-depth guides about refrigeration technology, maintenance tips, and industry insights. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group card-hover rounded-2xl border border-navy-100 overflow-hidden flex flex-col"
                >
                  {/* Image placeholder */}
                  <div className="aspect-[16/9] bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center text-4xl">
                    📖
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-navy-400 mb-3">
                      <span className="badge-primary text-xs">{post.meta.category}</span>
                      <span>{post.meta.date}</span>
                      {post.meta.readingTime && <span>· {post.meta.readingTime} min read</span>}
                    </div>

                    <h2 className="text-lg font-bold text-navy-900 group-hover:text-primary-600 transition-colors">
                      {post.meta.title}
                    </h2>

                    <p className="mt-2 text-sm text-navy-500 leading-relaxed flex-1">
                      {post.meta.excerpt}
                    </p>

                    <div className="mt-4 flex items-center text-sm font-medium text-primary-600">
                      Read More
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
