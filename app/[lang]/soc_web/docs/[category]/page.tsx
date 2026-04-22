import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import LearningPageClient from "@/app/[lang]/soc_web/docs/[category]/page-client";

interface LearningPageProps {
  params: Promise<{
    lang: string
    category: string
  }>
}

export default async function LearningPage({ params }: LearningPageProps) {
  const { category } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const documents = await prisma.fileNode.findMany({
    where: { 
      category,
      parentId: null, 
    },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <LearningPageClient
      documents={documents}
      category={category}
      isLoggedIn={Boolean(session?.user?.id)}
    />
  );
}
