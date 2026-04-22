"use server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"

export async function createDocument(formData: FormData) {
  const name = formData.get("name") as string
  const category = formData.get("category") as string
  const slug = formData.get("slug") as string

  if (!name || name.trim() === "") {
    throw new Error("Document name is required")
  }

  if (!slug || slug.trim() === "") {
    throw new Error("Document slug is required")
  }

   if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.trim())) {
    throw new Error("Slug must be lowercase, alphanumeric, and can include hyphens")
  }

  if (!category || category.trim() === "") {
    throw new Error("Document category is required")
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  await prisma.fileNode.create({
    data: {
      name: name.trim(),
      slug: slug.trim(),
      path: `${slug.trim()}`,
      isFolder: true,
      category: category.trim(),
      authorId: session.user.id,
    },
  })

  revalidatePath(`/[lang]/soc_web/docs/${category.trim()}`)
}
