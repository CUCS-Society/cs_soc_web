import { Header } from '@/components/Header'
import { Footer } from "@/components/Footer"
import { CarouselPlugin } from "@/components/CarouselPlugin"
import { Post } from "@/lib/PostType"
import { PostPreviewList } from '@/components/PostPreview'
import { posts } from '@/lib/seed'

export default function Page() {
  return (
      <main className="flex flex-col min-h-screen">
            <Header />
            <CarouselPlugin />
            <PostPreviewList header="Latest News" posts={posts} />
            <Footer />
      </main>
  )
}
