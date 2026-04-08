import { CarouselPlugin } from "@/components/CarouselPlugin"
import { PostPreviewList } from "@/components/PostPreview"
import { posts } from "@/lib/seed"
import { Translations } from "@/components/Translation"

const translations: Translations = {
  "en-US": {
    headers: "Latest News",
  },
  "zh-HK": {
    headers: "最新消息",
  },
}

interface PageProps {
  params: Promise<{
    lang: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params
  const t = translations[lang as keyof Translations]

  return (
    <main className="flex min-h-screen flex-col">
      <CarouselPlugin />
      <PostPreviewList header={t.headers} posts={posts} />
    </main>
  )
}
