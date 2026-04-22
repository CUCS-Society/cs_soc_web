import { Metadata } from "next"
import { notFound } from "next/navigation"
import { BreadcrumbPlugin } from "@/components/soc_web/BreadcrumbPlugin"
import { Dictionary } from "@/components/soc_web/Translation"
import { prisma } from "@/lib/prisma"

interface PostProps {
  params: Promise<{
    lang: string
    category: string
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const { lang, slug, category } = await params
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: true,
    },
  })

  if (!post) return {}

  return {
    title: post.title,
    description: post?.description,
    authors: [{ name: post.author?.name }],
  }
}

export default async function PostPage({ params }: PostProps) {
  const { lang, slug, category } = await params
  const t = Dictionary[lang]

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: true,
    }
  })

  if (!post) notFound()

  return (
    <div className="p-10">
      <BreadcrumbPlugin
        items={[
          { label: t.home, href: `` },
          { label: t.news, href: `/news/all` },
          {
            label: category === "all" ? t.all : category,
            href: `/news/${category}`,
          },
          { label: post.title, href: `/news/${category}/${slug}` },
        ]}
      />

      <article className="prose dark:prose-invert max-w-none">
        <h1 className="text-2xl tracking-tighter text-pretty lg:text-5xl p-5 text-center w-1/2 justify-self-center mx-auto">
          {post.title}
        </h1>

        <p className="text-sm text-muted-foreground">
          Written by {post.author?.name}
        </p>
        <p className="text-sm text-muted-foreground">
          <time dateTime={post.createdAt.toDateString()}>
            {post.createdAt.toDateString()}
          </time>
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
      </article>
    </div>
  )
}
