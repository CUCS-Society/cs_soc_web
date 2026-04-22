import { prisma } from "@/lib/prisma"
import LearnDocumentPageClient from "@/app/[lang]/soc_web/docs/[category]/[path]/page-client"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"

interface LearnDocumentPageProps {
    params: Promise<{
    lang: string
    category: string
    path: string
  }>
}

export default async function LearnDocumentPage({ params }: LearnDocumentPageProps) {
    const { category, path } = await params;
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    const files = await prisma.fileNode.findMany({
      where: {
        category,
        path: {
          startsWith: `${path}`,
        },
      },
    })

    if (!files || files.length === 0) {
        return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Document not found</h1>
            <p className="text-muted-foreground">
            The requested document does not exist.
            </p>
        </div>
        )
    }

    return(
      <LearnDocumentPageClient files={files} category={category} currentUserId={session?.user.id ?? null} />
    ) 
}
