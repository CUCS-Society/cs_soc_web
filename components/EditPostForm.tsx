"use client"

import { useState, useEffect } from "react"
import { Editor } from "@/components/Editor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type SerializedEditorState } from "lexical"

interface Post {
  id: string
  title: string
  category: string
  description: string
  slug: string
  jsonEditorState: string
}

interface EditPostFormProps {
  postId: string
}

export default function EditPostForm({ postId }: EditPostFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    slug: "",
  })

  const [editorState, setEditorState] = useState<SerializedEditorState | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load existing post data
  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}`)
        if (response.ok) {
          const post: Post = await response.json()

          setFormData({
            title: post.title,
            category: post.category,
            description: post.description || "",
            slug: post.slug,
          })

          // Parse and set the editor state
          if (post.jsonEditorState) {
            try {
              const parsedState = JSON.parse(post.jsonEditorState) as SerializedEditorState
              setEditorState(parsedState)
            } catch (error) {
              console.error("Error parsing editor state:", error)
            }
          }
        }
      } catch (error) {
        console.error("Error loading post:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPost()
  }, [postId])

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    // Auto-generate slug from title
    if (field === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
      setFormData(prev => ({ ...prev, slug }))
    }
  }

  const handleEditorChange = (serializedState: SerializedEditorState) => {
    setEditorState(serializedState)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const updateData = {
        ...formData,
        jsonEditorState: editorState ? JSON.stringify(editorState) : "",
      }

      const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })

      if (response.ok) {
        console.log("Post updated successfully!")
      } else {
        console.error("Failed to update post")
      }
    } catch (error) {
      console.error("Error updating post:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading post...</div>
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter post title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange("category", value!)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="notice">Notice</SelectItem>
                    <SelectItem value="college">College</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleInputChange("slug", e.target.value)}
                placeholder="url-friendly-slug"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Brief description of the post"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <div className="border rounded-lg">
                <Editor
                  onSerializedChange={handleEditorChange}
                  editorSerializedState={editorState ?? undefined}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !formData.title || !formData.category}
              className="w-full"
            >
              {isSubmitting ? "Updating..." : "Update Post"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}