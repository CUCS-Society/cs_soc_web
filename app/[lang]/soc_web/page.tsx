"use server"
import { CarouselPlugin } from "@/components/soc_web/CarouselPlugin"
import { PostPreviewList } from "@/components/soc_web/PostPreview"
import { Translations } from "@/components/soc_web/Translation"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"

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
  const posts = await prisma.post.findMany()

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <div className="justify-center items-center flex">
      <main className="flex min-h-screen flex-col lg:w-1/2">
        <CarouselPlugin />
        <PostPreviewList header={t.headers} posts={posts} />
      </main>
    </div>
  )
}
