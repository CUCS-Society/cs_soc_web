"use server"
import { CarouselPlugin } from "@/components/CarouselPlugin"
import { PostPreviewList } from "@/components/PostPreview"
import { Translations } from "@/components/Translation"
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
    <main className="flex min-h-screen flex-col">
      <CarouselPlugin />
      <div className="mx-auto w-[90%] max-w-none py-10 lg:w-1/2">
        <PostPreviewList header={t.headers} posts={posts}/>
      </div>
    </main>
  )
}
