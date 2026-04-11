import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"
import { convertEditorStateToHtml } from "@/lib/editor-utils"

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    // Check authentication

    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { title, category, description, slug, jsonEditorState, createdAt } =
      body

    // Check if post exists and user has permission
    const existingPost = await prisma.post.findUnique({
      where: { id },
    })

    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    // Check if user is the author (you might want different permission logic)
    if (existingPost.authorId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Check if new slug conflicts with another post
    if (slug !== existingPost.slug) {
      const slugConflict = await prisma.post.findUnique({
        where: { slug },
      })

      if (slugConflict) {
        return NextResponse.json(
          { error: "Post with this slug already exists" },
          { status: 409 }
        )
      }
    }

    // Convert editor state to HTML
    const htmlContent = await convertEditorStateToHtml(jsonEditorState)

    // Update the post
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        category,
        description,
        slug,
        htmlContent,
        jsonEditorState,
        updatedAt: new Date(),
        createdAt: new Date(createdAt),
      },
    })

    return NextResponse.json({
      message: "Post updated successfully",
      post: updatedPost,
    })
  } catch (error) {
    console.error("Error updating post:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
