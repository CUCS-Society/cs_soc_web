import { notFound } from "next/navigation"
import { Dictionary } from "@/components/Translation"
import { prisma } from "@/lib/prisma"
import EditPostForm from "@/components/EditPostForm"

interface PostProps {
  params: Promise<{
    lang: string
    id: string
  }>
}

export default async function Page({ params }: PostProps) {
  const { lang, id } = await params
  const t = Dictionary[lang]

  const post = await prisma.post.findUnique({
    where: { id },
  })

  if (!post) notFound()

  return (
    <div className="mx-auto w-[90%] max-w-none py-10">
      <EditPostForm post={post} />
    </div>
  )
}
