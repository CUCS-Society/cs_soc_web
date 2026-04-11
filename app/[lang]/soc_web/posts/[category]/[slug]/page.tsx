import { Metadata } from "next"
import { notFound } from "next/navigation"
import { BreadcrumbPlugin } from "@/components/BreadcrumbPlugin"
import { Dictionary } from "@/components/Translation"
import { prisma } from "@/lib/prisma"

interface PostProps {
  params: Promise<{
    lang: string
    category: string
    slug: string
  }>
}

// export async function generateStaticParams() {
//   const posts = await prisma.post.findMany();
//   return posts.map((post) => ({ slug: post.slug }));
// }

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
  })

  if (!post) notFound()

  return (
    <div className="mx-auto w-[90%] max-w-none py-10 lg:w-1/2">
      <BreadcrumbPlugin
        items={[
          { label: t.home, href: `` },
          { label: t.news, href: `/posts/all` },
          {
            label: category === "all" ? t.all : category,
            href: `/posts/${category}`,
          },
          { label: post.title, href: `/posts/${category}/${slug}` },
        ]}
      />

      <article className="prose dark:prose-invert max-w-none">
        <h1 className="mb-3 text-5xl tracking-tighter text-pretty md:mb-4 lg:mb-6 lg:max-w-3xl lg:text-7xl">
          {post.title}
        </h1>
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
