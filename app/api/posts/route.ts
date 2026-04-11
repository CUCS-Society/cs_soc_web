import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"
import { convertEditorStateToHtml } from "@/lib/editor-utils"
import { create } from "lodash"

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    console.log("Session data:", session)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { title, category, description, slug, jsonEditorState, createdAt } =
      body

    console.log("Received post data:", body)

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

    const htmlContent = await convertEditorStateToHtml(jsonEditorState)

    // Create the post
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
