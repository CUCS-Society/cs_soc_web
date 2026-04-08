import { Metadata } from "next"
import { notFound } from "next/navigation"
import { format, parseISO } from "date-fns"
import { readFile } from "fs/promises"
import path from "path"
import { BreadcrumbPlugin } from "@/components/BreadcrumbPlugin"
import { posts } from "@/lib/seed"
import { Dictionary } from "@/components/Translation"
import { Post } from "@/lib/PostType"

interface PostProps {
  params: Promise<{
    lang: string
    category: string
    slug: string
  }>
}

async function getPostFromParams(params: PostProps["params"]): Promise<Post> {
  const { category, slug } = await params

  const post = posts.find((post) => {
    if (post.slug !== slug) {
      return false
    }

    if (category === "all") {
      return true
    }

    return post.category === category
  })

  if (!post) {
    return null
  }

  return post
}

async function getPostContent(
  category: string,
  slug: string
): Promise<string | null> {
  console.log(category, slug)
  const filePath = path.join(
    process.cwd(),
    "public",
    `html/posts/${category}`,
    `${slug}.html`
  )

  try {
    return await readFile(filePath, "utf8")
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post?.author?.name }],
    keywords: post.tags,
  }
}

export default async function PostPage({ params }: PostProps) {
  const { lang, slug, category } = await params
  const t = Dictionary[lang]
  const post = await getPostFromParams(
    Promise.resolve({ lang, slug, category })
  )
  const content = await getPostContent(post.category, post.slug)

  if (!post || !content) {
    notFound()
  }

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
        <h1 className="mb-2">{post.title}</h1>
        <p className="text-sm text-muted-foreground">
          <time dateTime={post.publishedDate}>
            {format(parseISO(post.publishedDate), "LLLL d, yyyy")}
          </time>
        </p>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </div>
  )
}
