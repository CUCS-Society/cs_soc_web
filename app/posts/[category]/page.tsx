import { BreadcrumbPlugin } from "@/components/BreadcrumbPlugin"
import { PostPreviewList } from "@/components/PostPreview"
import { posts } from "@/lib/seed"
import { Dictionary } from "@/components/Translation"

interface PostProps {
  params: Promise<{
    lang: string
    category: string
  }>
}

export default async function Page({ params }: PostProps) {
  const { lang, category } = await params
  const t = Dictionary[lang]
  const filteredPosts = posts.filter(
    (post) => category === "all" || post.category == category
  )
  return (
    <div className="mx-auto w-[90%] max-w-none py-10 lg:w-1/2">
      <BreadcrumbPlugin
        items={[
          { label: t.home, href: `./..` },
          { label: t.news, href: `./all` },
          { label: t[category], href: `.` },
        ]}
      />
      <PostPreviewList header={t[category]} posts={filteredPosts} />
    </div>
  )
}
