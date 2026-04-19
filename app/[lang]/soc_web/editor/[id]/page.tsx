import EditPostForm from "@/components/soc_web/EditPostForm"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: RouteParams) {
  const { id } = await params
  const post = await prisma.post.findUnique({ where: { id } })

  if (!post) notFound()

  return <EditPostForm post={post} />
}
