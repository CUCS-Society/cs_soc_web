import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const node = await prisma.fileNode.findUnique({
      where: { id },
      select: { id: true, authorId: true },
    })

    if (!node) {
      return NextResponse.json(
        { error: "Node not found" },
        { status: 404 }
      )
    }

    if (node.authorId !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized to delete this node" },
        { status: 403 }
      )
    }

    await prisma.fileNode.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Node deleted successfully" })
  } catch (error) {
    console.error("Error deleting document node:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, slug, href } = body

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Name is required and must be a string" },
        { status: 400 }
      )
    }

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { error: "Slug is required and must be a string" },
        { status: 400 }
      )
    }

    const node = await prisma.fileNode.findUnique({
      where: { id },
      select: { id: true, authorId: true, path: true, parentId: true },
    })

    if (!node) {
      return NextResponse.json(
        { error: "Node not found" },
        { status: 404 }
      )
    }

    if (node.authorId !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized to edit this node" },
        { status: 403 }
      )
    }

    const parentPath = node.parentId
      ? (await prisma.fileNode.findUnique({
          where: { id: node.parentId },
          select: { path: true },
        }))?.path || ""
      : ""

    const newPath = parentPath ? `${parentPath}/${slug}` : slug

    const existing = await prisma.fileNode.findUnique({
      where: { path: newPath },
    })
    if (existing && existing.id !== id) {
      return NextResponse.json(
        { error: "A file or folder with that path already exists" },
        { status: 409 }
      )
    }

    const updated = await prisma.fileNode.update({
      where: { id },
      data: {
        name: name.trim(),
        slug: slug.trim(),
        path: newPath,
        href,
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("Error updating document node:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}