import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"
import { serializeHtml } from "platejs/static"
import { createSlateEditor } from "platejs"
import { BaseEditorKit } from "@/components/editor/editor-base-kit"

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { title, category, description, slug, jsonEditorState, createdAt } =
      body

    if (!title || !category || !slug || !jsonEditorState || !createdAt) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const existingPost = await prisma.post.findUnique({
      where: { slug },
    })

    if (existingPost) {
      return NextResponse.json(
        { error: "Post with this slug already exists" },
        { status: 409 }
      )
    }

    const editor = createSlateEditor({
      plugins: BaseEditorKit,
      value: JSON.parse(jsonEditorState),
    })

    const htmlContent = await serializeHtml(editor)

    const post = await prisma.post.create({
      data: {
        title: title,
        category: category,
        description: description,
        slug: slug,
        htmlContent: htmlContent,
        jsonEditorState: jsonEditorState,
        authorId: session.user.id,
        createdAt: new Date(createdAt),
      },
    })

    return NextResponse.json(
      { message: "Post created successfully", post },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
