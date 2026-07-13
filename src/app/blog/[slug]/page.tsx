import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import Container from "@/components/ui/Container"
import JsonLd from "@/components/seo/JsonLd"
import { getBlogPost, getAllBlogSlugs } from "@/lib/mdx"
import { COMPANY } from "@/lib/constants"
import { JSX } from "react"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    keywords: post.meta.tags,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      type: "article",
      publishedTime: post.meta.date,
      authors: [post.meta.author],
      tags: post.meta.tags,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <JsonLd
        type="Article"
        data={{
          headline: post.meta.title,
          description: post.meta.excerpt,
          author: { "@type": "Person", name: post.meta.author },
          datePublished: post.meta.date,
          publisher: {
            "@type": "Organization",
            name: COMPANY.shortName,
          },
        }}
      />
      <JsonLd
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${COMPANY.website}/` },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${COMPANY.website}/blog` },
            { "@type": "ListItem", position: 3, name: post.meta.title, item: `${COMPANY.website}/blog/${slug}` },
          ],
        }}
      />

      {/* Breadcrumb */}
      <section className="bg-navy-50 pt-28 pb-4">
        <Container>
          <nav className="flex items-center gap-2 text-sm text-navy-500">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary-600">Blog</Link>
            <span>/</span>
            <span className="text-navy-800 font-medium truncate max-w-[200px]">{post.meta.title}</span>
          </nav>
        </Container>
      </section>

      {/* Article */}
      <article className="section-padding bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-navy-500 mb-6">
              <span className="badge-primary">{post.meta.category}</span>
              <span>{post.meta.date}</span>
              <span>·</span>
              <span>{post.meta.author}</span>
              {(post.meta.readingTime as number) > 0 && (
                <>
                  <span>·</span>
                  <span>{(post.meta.readingTime as number)} min read</span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 leading-tight">
              {post.meta.title}
            </h1>
            <p className="mt-4 text-lg text-navy-500 leading-relaxed">
              {post.meta.excerpt}
            </p>

            {/* Tags */}
            {post.meta.tags && post.meta.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.meta.tags.map((tag: string) => (
                  <span key={tag} className="text-xs bg-navy-50 text-navy-600 px-3 py-1.5 rounded-full border border-navy-100">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Divider */}
            <hr className="my-8 border-navy-100" />

            {/* MDX Content */}
            <div className="prose prose-lg max-w-none prose-headings:text-navy-900 prose-p:text-navy-600 prose-li:text-navy-600 prose-strong:text-navy-800 prose-table:text-sm">
              <MDXRemote
                source={post.content}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
              />
            </div>

            {/* Share / Navigate */}
            <div className="mt-12 pt-8 border-t border-navy-100">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <Link href="/blog" className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Back to Blog
                </Link>
                <Link href="/contact" className="text-accent-600 hover:text-accent-700 font-medium inline-flex items-center gap-2">
                  Have questions? Contact us
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </article>
    </>
  )
}
