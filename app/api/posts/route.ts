import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"
import { convertEditorStateToHtml } from "@/lib/editor-utils"

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth.api.getSession({
      headers: await headers()
    })

    console.log("Session data:", session)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, category, description, slug, jsonEditorState } = body

    console.log("Received post data:", { title, category, description, slug, jsonEditorState })

    // Validate required fields
    if (!title || !category || !slug || !jsonEditorState) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existingPost = await prisma.post.findUnique({
      where: { slug }
    })

    if (existingPost) {
      return NextResponse.json(
        { error: "Post with this slug already exists" },
        { status: 409 }
      )
    }

    // Convert editor state to HTML
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