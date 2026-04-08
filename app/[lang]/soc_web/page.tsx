import { CarouselPlugin } from "@/components/CarouselPlugin"
import { PostPreviewList } from '@/components/PostPreview'
import { posts } from '@/lib/seed'
import { Translations } from '@/components/Translation'
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

const translations: Translations = {
  'en-US': {
      headers: "Latest News"
  },
  'zh-HK': {
    headers: "最新消息"
  }
}

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const t = translations[lang as keyof Translations];
  
  const session = await auth.api.getSession({
      headers: await headers()
  })

  console.log(session);

  return (
      <main className="flex flex-col min-h-screen">
            <CarouselPlugin />
            <PostPreviewList header={t.headers} posts={posts} />
      </main>
  )
}
