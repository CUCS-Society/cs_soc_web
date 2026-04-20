import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, slug, isFolder, parentId, href, category } = body

    if(!category || typeof category !== "string") {
      return NextResponse.json(
        { error: "Category is required and must be a string" },
        { status: 400 }
      )
    }

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Name is required and must be a string" },
        { status: 400 }
      )
    }

    if (typeof isFolder !== "boolean") {
      return NextResponse.json(
        { error: "isFolder must be a boolean" },
        { status: 400 }
      )
    }

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { error: "Slug is required and must be a string" },
        { status: 400 }
      )
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.trim())) {
        throw new Error("Slug must be lowercase, alphanumeric, and can include hyphens")
    }


    if (!name) {
      return NextResponse.json(
        { error: "Name must not be empty" },
        { status: 400 }
      )
    }

    let parent: { id: string; path: string } | null = null
    if (parentId) {
      parent = await prisma.fileNode.findUnique({
        where: { id: parentId },
        select: { id: true, path: true },
      })

      if (!parent) {
        return NextResponse.json(
          { error: "Parent folder not found" },
          { status: 404 }
        )
      }
    }

    const path = parent ? `${parent.path}/${slug}` : slug

    const existing = await prisma.fileNode.findUnique({
      where: { path },
    })
    if (existing) {
      return NextResponse.json(
        { error: "A file or folder with that path already exists" },
        { status: 409 }
      )
    }

    const created = await prisma.fileNode.create({
      data: {
        name: name.trim(),
        slug: slug.trim(),
        path,
        isFolder,
        parentId: parent?.id,
        authorId: session.user.id,
        href,
        category,
      },
    })

    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error("Error creating document node:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
